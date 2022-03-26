import type * as kvah from '../types'

import { getAssetFromKV, NotFoundError, serveSinglePageApp } from '../index'

import manifest from '__STATIC_CONTENT_MANIFEST'

// This could be an empty file if using miniflare
let assetManifest: kvah.AssetManifestType = {}
try {
  const parsedManifest = JSON.parse(manifest)
  assetManifest = parsedManifest
} catch (e) {}

export default {
  async fetch(request: Request, env: Environment, ctx: ExecutionContext): Promise<Response> {
    const url = new URL(request.url)

    let assetManifestOption: undefined | kvah.AssetManifestType
    let mapRequestToAssetOption: undefined | ((req: Request) => Request)
    let nameSpaceOption: undefined | KVNamespace
    let cacheControlOption: kvah.CacheControl = {
      browserTTL: null,
      edgeTTL: 20, // 20s for tests
      bypassCache: false, // do not bypass Cloudflare's cache
    }

    // Clone the Request so we can modify headers

    let req = new Request(request)

    if (url.pathname === '/manifest')
      return new Response(JSON.stringify(assetManifest), {
        headers: { 'content-type': 'application/json;charset=UTF-8' },
      })

    // This is one of the tests, we need to add it to the KV namespace but not the manifest
    if (url.pathname === '/no-hash.txt')
      await env.__STATIC_CONTENT.put('no-hash.txt', 'test not in manifest')

    if (req.headers.get('x-cf-test-no-manifest') === null) {
      assetManifestOption = assetManifest
    } else {
      assetManifestOption = {}
      req.headers.delete('x-cf-test-no-manifest')
    }
    if (req.headers.get('x-cf-test-no-namespace') === null) {
      nameSpaceOption = env.__STATIC_CONTENT
    } else {
      req.headers.delete('x-cf-test-no-namespace')
    }
    if (req.headers.get('x-cf-test-browser-ttl')) {
      if (req.headers.get('x-cf-test-browser-ttl') === 'null') {
        cacheControlOption.browserTTL = null
      } else {
        cacheControlOption.browserTTL = parseInt(req.headers.get('x-cf-test-browser-ttl'), 10)
      }
      req.headers.delete('x-cf-test-browser-ttl')
    }
    if (req.headers.get('x-cf-test-edge-ttl')) {
      if (req.headers.get('x-cf-test-edge-ttl') === 'null') {
        cacheControlOption.edgeTTL = null
      } else {
        cacheControlOption.edgeTTL = parseInt(req.headers.get('x-cf-test-edge-ttl'), 10)
        console.log('cacheControlOption', JSON.stringify(cacheControlOption))
      }
      req.headers.delete('x-cf-test-edge-ttl')
    }
    if (req.headers.get('x-cf-test-bypass-cache')) {
      cacheControlOption.bypassCache = Boolean(req.headers.get('x-cf-test-bypass-cache'))
      req.headers.delete('x-cf-test-bypass-cache')
    }
    if (req.headers.get('x-cf-test-single-page-app')) {
      mapRequestToAssetOption = serveSinglePageApp
    }

    if (url.pathname === '/custom_map_request_to_asset') {
      mapRequestToAssetOption = (request: Request): Request => {
        let url = req.url
        url = url.replace('/custom_map_request_to_asset', '/test-files/custom_mrto.txt')
        return new Request(url, req)
      }
    }

    try {
      let options: Partial<kvah.Options> = {
        ASSET_NAMESPACE: nameSpaceOption,
        ASSET_MANIFEST: assetManifestOption,
        cacheControl: cacheControlOption,
      }
      if (mapRequestToAssetOption) options.mapRequestToAsset = mapRequestToAssetOption
      if (req.headers.get('x-cf-test-custom-default')) options.defaultDocument = 'default.html'
      const response = await getAssetFromKV(
        {
          request: req,
          waitUntil(promise) {
            return ctx.waitUntil(promise)
          },
        },
        options,
      )
      if (
        response.headers.get('cache-control') === null &&
        request.headers.get('x-cf-test-browser-ttl') === null &&
        request.headers.get('x-cf-test-bypass-cache') === null
      ) {
        response.headers.set('cache-control', 'no-store, must-revalidate') // Tell the browser never to cache if we never explicitly set any cache headers on the request so we can test only the CF caching impact
      }

      return response
    } catch (e) {
      if (e instanceof NotFoundError) return new Response('NotFoundError thrown', { status: 404 })
      return new Response('An unexpected error occurred', { status: 500 })
    }
  },
}
