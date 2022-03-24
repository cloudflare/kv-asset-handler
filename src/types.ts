export type CacheControl = {
	browserTTL: number
	bypassCache: boolean
	edgeTTL: number
  }
  
  export type AssetManifestType = Record<string, string>
  
  export type Evt = {
	request: Request
	waitUntil: (promise: Promise<any>) => void
  }
  
  export type Options = {
	ASSET_NAMESPACE: KVNamespace
	ASSET_MANIFEST: AssetManifestType | string
	cacheControl: ((req: Request) => Partial<CacheControl>) | Partial<CacheControl>
	defaultMimeType: string
	defaultDocument: string
	mapRequestToAsset?: (req: Request, options?: Partial<Options>) => Request
	pathIsEncoded: boolean
  }
  
  export class KVError extends Error {
	constructor(message?: string, status: number = 500) {
	  super(message)
	  // see: typescriptlang.org/docs/handbook/release-notes/typescript-2-2.html
	  Object.setPrototypeOf(this, new.target.prototype) // restore prototype chain
	  this.name = KVError.name // stack traces display correctly now
	  this.status = status
	}
	status: number
  }
  
  export class MethodNotAllowedError extends KVError {
	constructor(message: string = `Not a valid request method`, status: number = 405) {
	  super(message, status)
	}
  }
  
  export class NotFoundError extends KVError {
	constructor(message: string = `Not Found`, status: number = 404) {
	  super(message, status)
	}
  }
  
  export class InternalError extends KVError {
	constructor(message: string = `Internal Error in KV Asset Handler`, status: number = 500) {
	  super(message, status)
	}
  }  