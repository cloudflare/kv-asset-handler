import { mime } from './mime'
import {
  AssetManifestType,
  CacheControl,
  Evt,
  MethodNotAllowedError,
  NotFoundError,
  InternalError,
  Options,
} from './types'
import standardMimeTypes from './standardMimeTypes'

// Lets make this action explicit as parsing the JSON files has a (small) cost and may be unecessary for the simplest html+img sites
// Adjust this option (at build time? some sort of wrangler intergration?) by swapping for a personalised list which might be more performant
mime.loadMimeTypes(standardMimeTypes)

declare global {
  var __STATIC_CONTENT: KVNamespace, __STATIC_CONTENT_MANIFEST: string
}

const defaultCacheControl: CacheControl = {
  browserTTL: null,
  edgeTTL: 2 * 60 * 60 * 24, // 2 days
  bypassCache: false, // do not bypass Cloudflare's cache
}

const parseStringAsObject = (maybeString: string | undefined): AssetManifestType => {
  try {
    typeof maybeString === 'string' ? JSON.parse(maybeString) : {}
  } catch (e) {
    return {}
  }
}

const getAssetFromKVDefaultOptions: Options = {
  ASSET_NAMESPACE: typeof __STATIC_CONTENT !== 'undefined' ? __STATIC_CONTENT : undefined,
  ASSET_MANIFEST:
    typeof __STATIC_CONTENT_MANIFEST !== 'undefined'
      ? parseStringAsObject(__STATIC_CONTENT_MANIFEST)
      : {},
  cacheControl: defaultCacheControl,
  defaultMimeType: 'text/plain',
  defaultDocument: 'index.html',
  pathIsEncoded: false,
}

function assignOptions(options?: Partial<Options>): Options {
  // Assign any missing options passed in to the default
  // options.mapRequestToAsset is handled manually later
  return Object.assign({}, getAssetFromKVDefaultOptions, options)
}

/**
 * maps the path of incoming request to the request pathKey to look up
 * in bucket and in cache
 * e.g.  for a path '/' returns '/index.html' which serves
 * the content of bucket/index.html
 * @param {Request} request incoming request
 * @param {string} [options.defaultDocument] a default document, e.g. default.html to use (fallback is index.html)
 */
const mapRequestToAsset = (request: Request, options?: Partial<Options>): Request => {
  const defaultDocument = options?.defaultDocument
    ? options.defaultDocument
    : getAssetFromKVDefaultOptions.defaultDocument
  const parsedUrl = new URL(request.url)
  let pathname = parsedUrl.pathname

  if (pathname.endsWith('/')) {
    // If path looks like a directory append defaultDocument
    // e.g. If path is /about/ -> /about/index.html
    pathname = pathname.concat(defaultDocument)
  } else if (!mime.getType(pathname)) {
    // If path doesn't look like valid content
    //  e.g. /about.me ->  /about.me/index.html
    pathname = pathname.concat('/' + defaultDocument)
  }

  parsedUrl.pathname = pathname
  return new Request(parsedUrl.toString(), request)
}

/**
 * maps the path of incoming request to /index.html if it evaluates to
 * any HTML file.
 * @param {Request} request incoming request
 * @param {string} [options.defaultDocument] a default document, e.g. default.html to use (fallback is index.html)
 */
function serveSinglePageApp(request: Request, options?: Partial<Options>): Request {
  const defaultDocument = options?.defaultDocument
    ? options.defaultDocument
    : getAssetFromKVDefaultOptions.defaultDocument

  // First apply the default handler, which already has logic to detect
  // paths that should map to HTML files.
  request = mapRequestToAsset(request, options)

  const parsedUrl = new URL(request.url)

  // Detect if the default handler decided to map to
  // a HTML file in some specific directory.
  if (parsedUrl.pathname.endsWith('.html')) {
    // If expected HTML file was missing, just return the root index.html (or options.defaultDocument)
    return new Request(`${parsedUrl.origin}/${defaultDocument}`, request)
  } else {
    // The default handler decided this is not an HTML page. It's probably
    // an image, CSS, or JS file. Leave it as-is.
    return request
  }
}

/**
 * takes the path of the incoming request, gathers the appropriate content from KV, and returns
 * the response
 *
 * @param {FetchEvent} event the fetch event of the triggered request
 * @param {{mapRequestToAsset: (string: Request) => Request, cacheControl: {bypassCache: boolean, edgeTTL: number, browserTTL: number}, ASSET_NAMESPACE: KVNamespace, ASSET_MANIFEST: string | AssetManifestType, defaultMimeType: string, defaultDocument: string, pathIsEncoded: boolean }} [options] configurable options
 * @param {CacheControl} [options.cacheControl] determine how to cache on Cloudflare and the browser
 * @param {(string: Request) => Request} [options.mapRequestToAsset]  maps the path of incoming request to the request pathKey to look up
 * @param {KVNamespace} [options.ASSET_NAMESPACE] the binding to the namespace that script references
 * @param {string | AssetManifestType} [options.ASSET_MANIFEST] either text blob (JSON formatted) or Record<string, string> mapping kv keys (url paths) to values (file data)
 * @param {string} [options.defaultMimeType] a default mime type to use
 * @param {string} [options.defaultDocument] a default document, e.g. default.html to use (fallback is index.html)
 * @param {boolean} [options.pathIsEncoded] set to true if the url path is encoded
 * */

const getAssetFromKV = async (event: Evt, options?: Partial<Options>): Promise<Response> => {
  /**
   * At this stage the options.ASSET_MANIFEST can either be:
   *  - undefined (this would mainly be due to using classic Worker setup where __STATIC_CONTENT_MANIFEST is a global var)
   *  - A string (ideally a JSON formatted text blob which would parse into the same as above)
   *  - An already parsed object (aka Record<string, string> in TS) - this is the newer ESmodule workflow
   * */
  let optionsWithDefaults = assignOptions(options)
  if (typeof optionsWithDefaults.ASSET_NAMESPACE === 'undefined')
    throw new InternalError(`there is no KV namespace bound to the script`)
  /**
   * After the assignOptions call above, options.ASSET_MANIFEST can now be:
   *  - __STATIC_CONTENT_MANIFEST
   *  - A string - this is what we should try and parse again below
   *  - An already parsed object
   *  - An empty object {}
   * */
  if (typeof optionsWithDefaults.ASSET_MANIFEST === 'string')
    optionsWithDefaults.ASSET_MANIFEST = parseStringAsObject(optionsWithDefaults.ASSET_MANIFEST)

  const request = event.request
  const rawPathKey = new URL(request.url).pathname.replace(/^\/+/, '') // strip any preceding /'s

  let requestKey
  /*
  	if options.mapRequestToAsset is explicitly passed in, always use it and assume user has own intentions
 	otherwise handle request as normal, with default mapRequestToAsset below
 
	Note there is an edge case issue where passing in the default mapRequestToAsset as an option param
	will cause requests to foo/ to be concatenated with the default document (e.g foo/index.html), but
	relying on the branch logic (while using effectively the same mapRequestToAsset as a default
	will result in the code below will check for 'foo/' first in the ASSET_MANIFEST. 
  */
  if (optionsWithDefaults.mapRequestToAsset) {
    requestKey = optionsWithDefaults.mapRequestToAsset(request)
  } else if (optionsWithDefaults.ASSET_MANIFEST[rawPathKey]) {
    requestKey = request
  } else if (optionsWithDefaults.ASSET_MANIFEST[decodeURIComponent(rawPathKey)]) {
    optionsWithDefaults.pathIsEncoded = true
    requestKey = request
  } else {
    // Fix edge case - options.defaultDocument supplied, but there is also a valid file for the getAssetFromKVDefaultOptions.defaultDocument - below will therefore not use options.defaultDocument

    const mappedRequest = mapRequestToAsset(request, optionsWithDefaults)
    const mappedRawPathKey = new URL(mappedRequest.url).pathname.replace(/^\/+/, '')
    if (optionsWithDefaults.ASSET_MANIFEST[decodeURIComponent(mappedRawPathKey)]) {
      optionsWithDefaults.pathIsEncoded = true
    }
    requestKey = mappedRequest
  }

  const SUPPORTED_METHODS = ['GET', 'HEAD']
  if (!SUPPORTED_METHODS.includes(requestKey.method)) {
    throw new MethodNotAllowedError(`${requestKey.method} is not a valid request method`)
  }

  const parsedUrl = new URL(requestKey.url)
  const pathname = optionsWithDefaults.pathIsEncoded
    ? decodeURIComponent(parsedUrl.pathname)
    : parsedUrl.pathname // decode percentage encoded path only when necessary

  // pathKey is the file path to look up in the manifest
  let pathKey = pathname.replace(/^\/+/, '') // remove prepended /
  const cache = caches.default
  let mimeType = mime.getType(pathKey) || optionsWithDefaults.defaultMimeType
  if (mimeType.startsWith('text') || mimeType === 'application/javascript') {
    mimeType += '; charset=utf-8'
  }

  let shouldEdgeCache = false // false if storing in KV by raw file path i.e. no hash
  // check manifest for map from file path to hash
  if (optionsWithDefaults.ASSET_MANIFEST[pathKey]) {
    pathKey = optionsWithDefaults.ASSET_MANIFEST[pathKey]
    // if path key is in asset manifest, we can assume it contains a content hash and can be cached
    shouldEdgeCache = true
  }

  // TODO this excludes search params from cache, investigate ideal behavior
  let cacheKeyRequest = new Request(`${parsedUrl.origin}/${pathKey}`, request)

  // if argument passed in for cacheControl is a function then
  // evaluate that function. otherwise return the Object passed in
  // or default Object
  const evalCacheOpts = (() => {
    switch (typeof optionsWithDefaults.cacheControl) {
      case 'function':
        return optionsWithDefaults.cacheControl(request)
      case 'object':
        return optionsWithDefaults.cacheControl
      default:
        return defaultCacheControl
    }
  })()

  // formats the etag depending on the response context. if the entityId
  // is invalid, returns an empty string (instead of null) to prevent the
  // the potentially disastrous scenario where the value of the Etag resp
  // header is "null". Could be modified in future to base64 encode etc
  const formatETag = (entityId: any = pathKey, validatorType: string = 'strong') => {
    if (!entityId) {
      return ''
    }
    switch (validatorType) {
      case 'weak':
        if (!entityId.startsWith('W/')) {
          return `W/${entityId}`
        }
        return entityId
      case 'strong':
        if (entityId.startsWith(`W/"`)) {
          entityId = entityId.replace('W/', '')
        }
        if (!entityId.endsWith(`"`)) {
          entityId = `"${entityId}"`
        }
        return entityId
      default:
        return ''
    }
  }

  optionsWithDefaults.cacheControl = Object.assign({}, defaultCacheControl, evalCacheOpts)

  // override shouldEdgeCache if options say to bypassCache
  if (
    optionsWithDefaults.cacheControl.bypassCache ||
    optionsWithDefaults.cacheControl.edgeTTL === null ||
    request.method == 'HEAD'
  ) {
    shouldEdgeCache = false
  }
  // only set max-age if explicitly passed in a number as an arg
  const shouldSetBrowserCache = typeof optionsWithDefaults.cacheControl.browserTTL === 'number'

  let response = null
  if (shouldEdgeCache) {
    response = await cache.match(cacheKeyRequest)
  }

  if (response) {
    if (response.status > 300 && response.status < 400) {
      if (response.body && 'cancel' in Object.getPrototypeOf(response.body)) {
        // Body exists and environment supports readable streams
        response.body.cancel()
      } else {
        // Environment doesnt support readable streams, or null response body. Nothing to do
      }
      response = new Response(null, response)
    } else {
      // fixes #165
      let opts = {
        headers: new Headers(response.headers),
        status: 0,
        statusText: '',
      }

      opts.headers.set('cf-cache-status', 'HIT')

      if (response.status) {
        opts.status = response.status
        opts.statusText = response.statusText
      } else if (opts.headers.has('Content-Range')) {
        opts.status = 206
        opts.statusText = 'Partial Content'
      } else {
        opts.status = 200
        opts.statusText = 'OK'
      }
      response = new Response(response.body, opts)
    }
  } else {
    const body = await optionsWithDefaults.ASSET_NAMESPACE.get(pathKey, 'arrayBuffer')
    if (body === null) {
      throw new NotFoundError(`could not find ${pathKey} in your content namespace`)
    }
    response = new Response(body)

    if (shouldEdgeCache) {
      response.headers.set('accept-ranges', 'bytes')
      response.headers.set('content-length', String(body.byteLength))
      // set etag before cache insertion
      if (!response.headers.has('etag')) {
        response.headers.set('etag', formatETag(pathKey, 'strong'))
      }
      // determine Cloudflare cache behavior
      response.headers.set('cache-control', `max-age=${optionsWithDefaults.cacheControl.edgeTTL}`)
      event.waitUntil(cache.put(cacheKeyRequest, response.clone()))
      response.headers.set('cf-cache-status', 'MISS')
    }
  }
  response.headers.set('content-type', mimeType)

  if (response.status === 304) {
    let etag = formatETag(response.headers.get('etag'), 'strong')
    let ifNoneMatch = cacheKeyRequest.headers.get('if-none-match')
    let proxyCacheStatus = response.headers.get('cf-cache-status')
    if (etag) {
      if (ifNoneMatch && ifNoneMatch === etag && proxyCacheStatus === 'MISS') {
        response.headers.set('cf-cache-status', 'EXPIRED')
      } else {
        response.headers.set('cf-cache-status', 'REVALIDATED')
      }
      response.headers.set('etag', formatETag(etag, 'weak'))
    }
  }
  if (shouldSetBrowserCache) {
    response.headers.set('cache-control', `max-age=${optionsWithDefaults.cacheControl.browserTTL}`)
  } else {
    response.headers.delete('cache-control')
  }
  return response
}

export { getAssetFromKV, mapRequestToAsset, serveSinglePageApp }
export { Options, CacheControl, MethodNotAllowedError, NotFoundError, InternalError }
