import type * as kvah from '../../types/tests'

import getCFStyleXXHash from '../get-cf-hash'

const wait = (ms: number) => new Promise((res) => setTimeout(res, ms))

const runTests = async function (): Promise<kvah.TestResult[]> {
  const testResults: kvah.TestResult[] = []

  const firstResponse = await fetch('test-files/etag.txt', {
    method: 'GET',
    headers: { 'x-cf-test-edge-ttl': '720', 'if-none-match': 'test-files/etag.2f7262e5aa.txt' },
  })
  wait(200)
  const secondResponse = await fetch('test-files/etag.txt', {
    method: 'GET',
    headers: { 'if-none-match': firstResponse.headers.get('etag') },
  })
  wait(200)
  const thirdResponse = await fetch('test-files/etag.txt', {
    method: 'GET',
    headers: { 'if-none-match': `"${firstResponse.headers.get('etag')}-another-version"` },
  })

  // Test #27

  const staleEtagTestResult: kvah.TestResult = {
    description:
      'getAssetFromKV when if-none-match equals etag of stale resource then should bypass cache',
    testFacets: [],
  }

  let firstContentHash: string | undefined

  if (firstResponse.ok && secondResponse.status === 304 && thirdResponse.ok) {
    firstContentHash = await getCFStyleXXHash(await firstResponse.blob())
    const thirdContentHash = await getCFStyleXXHash(await thirdResponse.blob())
    if (firstContentHash === '2f7262e5aa' && firstContentHash === thirdContentHash) {
      staleEtagTestResult.testFacets.push({ description: 'correct files served', result: true })
    } else {
      staleEtagTestResult.testFacets.push({ description: 'incorrect files served', result: false })
    }
    if (firstResponse.headers.get('cf-cache-status') === 'MISS') {
      staleEtagTestResult.testFacets.push({
        description: 'correct (MISS) cf-cache-status set on first response',
        result: true,
      })
    } else {
      staleEtagTestResult.testFacets.push({
        description: 'incorrect cf-cache-status set on first response',
        result: false,
      })
    }
    if (secondResponse.headers.get('cf-cache-status') === 'REVALIDATED') {
      staleEtagTestResult.testFacets.push({
        description: 'correct (REVALIDATED) cf-cache-status set on second response',
        result: true,
      })
    } else {
      staleEtagTestResult.testFacets.push({
        description: 'incorrect cf-cache-status set on second response',
        result: false,
      })
    }
    if (thirdResponse.headers.get('cf-cache-status') === 'HIT') {
      staleEtagTestResult.testFacets.push({
        description: 'correct (HIT) cf-cache-status set on third (stale etag) response',
        result: true,
      })
    } else {
      staleEtagTestResult.testFacets.push({
        description: 'incorrect cf-cache-status set on third (stale etag)  response',
        result: false,
      })
    }
  } else {
    staleEtagTestResult.testFacets.push({ description: 'files not served', result: false })
  }
  testResults.push(staleEtagTestResult)

  // Test #28

  const weakendEtagResult: kvah.TestResult = {
    description:
      'getAssetFromKV when resource in cache, etag should be weakened before returned to eyeball',
    testFacets: [],
  }

  if (secondResponse.status === 304) {
    weakendEtagResult.testFacets.push({ description: 'correct response status', result: true })
    if (secondResponse.headers.get('cf-cache-status') === 'REVALIDATED') {
      weakendEtagResult.testFacets.push({
        description: 'correct (REVALIDATED) cf-cache-status set on response',
        result: true,
      })
    } else {
      weakendEtagResult.testFacets.push({
        description: 'incorrect cf-cache-status set on response',
        result: false,
      })
    }
    if (secondResponse.headers.get('etag') === 'W/"test-files/etag.2f7262e5aa.txt"') {
      weakendEtagResult.testFacets.push({
        description: 'correct (weakened) etag header on response',
        result: true,
      })
    } else {
      weakendEtagResult.testFacets.push({
        description: 'incorrect (weakened) etag header on response',
        result: false,
      })
    }
  } else {
    weakendEtagResult.testFacets.push({ description: 'file not served', result: false })
  }

  testResults.push(weakendEtagResult)

  return testResults
}

export default runTests
