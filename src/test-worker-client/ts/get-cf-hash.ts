import xxhash from 'xxhash-wasm'

const base64FromBlob = async (data: Blob): Promise<string> => {
  const base64url: string | ArrayBuffer = await new Promise((r) => {
    const reader = new FileReader()
    reader.onload = () => r(reader.result)
    reader.readAsDataURL(data)
  })

  return String(base64url).split(',', 2)[1]
}

const getCFStyleXXHash = async (rawContent: Blob): Promise<string> => {
  const { h64ToString, h64Raw } = await xxhash()
  let hash: null | string

  // An empty file will not work with base64FromBlob
  if (rawContent.size === 0) {
    const arrBuffer = await new Response(rawContent).arrayBuffer()
    const hash64 = h64Raw(new Uint8Array(arrBuffer))
    hash = hash64.toString(16).padStart(16, '0')
    //TODO test
  } else {
    const base64Data = await base64FromBlob(rawContent)
    hash = h64ToString(base64Data)
  }
  // Wrangler removes the leading 0 from the hash (need to work out why/where)
  let hashSubStr = hash.replace(/^0+/, '').substring(0, 10)

  return hashSubStr
}

export default getCFStyleXXHash
