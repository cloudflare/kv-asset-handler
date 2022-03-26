declare module '__STATIC_CONTENT_MANIFEST' {
  const manifest: string
  export default manifest
}

interface Environment {
  __STATIC_CONTENT: KVNamespace
}
