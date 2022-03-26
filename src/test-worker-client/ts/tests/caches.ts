import type * as kvah from '../../types/tests'

import getCFStyleXXHash from '../get-cf-hash'

const wait = (ms: number) => new Promise((res) => setTimeout(res, ms))

const runTests = async function (): Promise<kvah.TestResult[]> {
  const testResults: kvah.TestResult[] = []

  // Test #14
  const browserTTLTestResponse = await fetch('/test-files/test', {
    method: 'GET',
    headers: { 'x-cf-test-browser-ttl': '22' },
  })
  const browaerTTLTestResult: kvah.TestResult = {
    description: 'getAssetFromKV when setting browser caching',
    testFacets: [],
  }
  if (browserTTLTestResponse.ok) {
    const contentHash = await getCFStyleXXHash(await browserTTLTestResponse.blob())
    const contentType = browserTTLTestResponse.headers.get('content-type')
    if (contentHash === 'b2f42f032f') {
      browaerTTLTestResult.testFacets.push({ description: 'correct file served', result: true })
    } else {
      browaerTTLTestResult.testFacets.push({ description: 'correct file served', result: false })
    }
    if (browserTTLTestResponse.headers.get('cache-control') === 'max-age=22') {
      browaerTTLTestResult.testFacets.push({ description: 'correct browserTTL set', result: true })
    } else {
      browaerTTLTestResult.testFacets.push({ description: 'correct browserTTL set', result: false })
    }
    if (contentType === 'text/plain; charset=utf-8') {
      browaerTTLTestResult.testFacets.push({ description: 'correct mime type', result: true })
    } else {
      browaerTTLTestResult.testFacets.push({ description: 'correct mime type', result: false })
    }
  } else {
    browaerTTLTestResult.testFacets.push({ description: 'file not served', result: false })
  }

  testResults.push(browaerTTLTestResult)

  // Test #15

  const pngRequest = await fetch('/test-files/cf-logo-h-rgb-rev.png', {
    method: 'GET',
    headers: { 'x-cf-test-browser-ttl': '1', 'x-cf-test-edge-ttl': '60', 'if-none-match': '' },
  }) // null if-none-match to stop Safari sending real one and impacting lower tests
  const jpgRequest = await fetch('/test-files/sub/cf-logo-v-rgb.jpg', {
    method: 'GET',
    headers: { 'x-cf-test-bypass-cache': 'true' },
  })
  const customCacheSettingResult: kvah.TestResult = {
    description: 'getAssetFromKV when setting custom cache setting',
    testFacets: [],
  }
  const pngContentType = pngRequest.headers.get('content-type')
  const pngContentHash = await getCFStyleXXHash(await pngRequest.blob())
  const jpgContentType = jpgRequest.headers.get('content-type')
  const jpgContentHash = await getCFStyleXXHash(await jpgRequest.blob())
  if (pngRequest.ok && jpgRequest.ok) {
    if (jpgContentHash === '53b5d46203') {
      customCacheSettingResult.testFacets.push({
        description: 'correct jpg file served',
        result: true,
      })
    } else {
      customCacheSettingResult.testFacets.push({
        description: 'incorrect jpg file served',
        result: false,
      })
    }
    if (jpgRequest.headers.get('cache-control') === null) {
      customCacheSettingResult.testFacets.push({
        description: 'correct (no) browserTTL set on jpg response',
        result: true,
      })
    } else {
      customCacheSettingResult.testFacets.push({
        description: 'incorrect browserTTL set on jpg response',
        result: false,
      })
    }
    if (jpgRequest.headers.get('cf-cache-status') === null) {
      customCacheSettingResult.testFacets.push({
        description: 'correct (no) cf-cache-status set on jpg response',
        result: true,
      })
    } else {
      customCacheSettingResult.testFacets.push({
        description: 'incorrect cf-cache-status set on jpg response',
        result: false,
      })
    }
    if (jpgContentType === 'image/jpeg') {
      customCacheSettingResult.testFacets.push({
        description: 'correct jpg mime type',
        result: true,
      })
    } else {
      customCacheSettingResult.testFacets.push({
        description: 'correct jpg mime type',
        result: false,
      })
    }
    if (pngContentHash === '5d350150a9') {
      customCacheSettingResult.testFacets.push({
        description: 'correct png file served',
        result: true,
      })
    } else {
      customCacheSettingResult.testFacets.push({
        description: 'incorrect png file served',
        result: false,
      })
    }
    if (pngRequest.headers.get('cache-control') === 'max-age=1') {
      customCacheSettingResult.testFacets.push({
        description: 'correct browserTTL set on png response',
        result: true,
      })
    } else {
      customCacheSettingResult.testFacets.push({
        description: 'incorrect browserTTL set on png response',
        result: false,
      })
    }
    if (pngRequest.headers.get('cf-cache-status') === 'MISS') {
      customCacheSettingResult.testFacets.push({
        description: 'correct (MISS) cf-cache-status set on png response',
        result: true,
      })
    } else {
      customCacheSettingResult.testFacets.push({
        description: 'incorrect cf-cache-status set on png response',
        result: false,
      })
    }
    if (pngRequest.headers.get('content-length') === '9050') {
      customCacheSettingResult.testFacets.push({
        description: `correct content-length header (${pngRequest.headers.get(
          'content-length',
        )}) set on png response`,
        result: true,
      })
    } else {
      customCacheSettingResult.testFacets.push({
        description: `incorrect content-length header (${pngRequest.headers.get(
          'content-length',
        )}) set on png response`,
        result: false,
      })
    }
    if (pngContentType === 'image/png') {
      customCacheSettingResult.testFacets.push({
        description: 'correct png mime type',
        result: true,
      })
    } else {
      customCacheSettingResult.testFacets.push({
        description: 'correct png mime type',
        result: false,
      })
    }
  } else {
    customCacheSettingResult.testFacets.push({ description: 'files not served', result: false })
  }

  testResults.push(customCacheSettingResult)

  await wait(1100)
  const pngRequestCacheTest = await fetch('/test-files/cf-logo-h-rgb-rev.png', {
    method: 'GET',
    headers: { 'if-none-match': pngRequest.headers.get('etag') },
  })
  const jpgRequestCacheTest = await fetch('/test-files/sub/cf-logo-v-rgb.jpg', {
    method: 'GET',
    headers: { 'x-cf-test-bypass-cache': 'true' },
  })
  const sequentialRequestTestResult: kvah.TestResult = {
    description: 'getAssetFromKV caches on two sequential requests',
    testFacets: [],
  }
  const pngCacheTestContentType = pngRequestCacheTest.headers.get('content-type')
  const jpgCacheTestContentType = jpgRequestCacheTest.headers.get('content-type')
  const jpgCacheTestContentHash = await getCFStyleXXHash(await jpgRequestCacheTest.blob())
  if (pngRequestCacheTest.status === 304 && jpgRequestCacheTest.ok) {
    if (jpgCacheTestContentHash === '53b5d46203') {
      sequentialRequestTestResult.testFacets.push({
        description: 'correct jpg file served',
        result: true,
      })
    } else {
      sequentialRequestTestResult.testFacets.push({
        description: 'incorrect jpg file served',
        result: false,
      })
    }
    if (jpgRequestCacheTest.headers.get('cache-control') === null) {
      sequentialRequestTestResult.testFacets.push({
        description: 'correct (no) browserTTL set on jpg response',
        result: true,
      })
    } else {
      sequentialRequestTestResult.testFacets.push({
        description: 'incorrect browserTTL set on jpg response',
        result: false,
      })
    }
    if (jpgRequestCacheTest.headers.get('cf-cache-status') === null) {
      sequentialRequestTestResult.testFacets.push({
        description: 'correct (no) cf-cache-status set on jpg response',
        result: true,
      })
    } else {
      sequentialRequestTestResult.testFacets.push({
        description: 'incorrect cf-cache-status set on jpg response',
        result: false,
      })
    }
    if (jpgCacheTestContentType === 'image/jpeg') {
      sequentialRequestTestResult.testFacets.push({
        description: 'correct jpg mime type',
        result: true,
      })
    } else {
      sequentialRequestTestResult.testFacets.push({
        description: 'correct jpg mime type',
        result: false,
      })
    }
    if (jpgRequestCacheTest.status === 200) {
      sequentialRequestTestResult.testFacets.push({
        description: 'correct jpg response status code (200)',
        result: true,
      })
    } else {
      sequentialRequestTestResult.testFacets.push({
        description: 'incorrect jpg response status code ',
        result: false,
      })
    }
    if (pngRequestCacheTest.headers.get('cf-cache-status') === 'REVALIDATED') {
      sequentialRequestTestResult.testFacets.push({
        description: 'correct (REVALIDATED) cf-cache-status set on second png response',
        result: true,
      })
    } else {
      sequentialRequestTestResult.testFacets.push({
        description: 'incorrect cf-cache-status set on second png response',
        result: false,
      })
    }
    if (pngCacheTestContentType === 'image/png') {
      sequentialRequestTestResult.testFacets.push({
        description: 'correct png mime type',
        result: true,
      })
    } else {
      sequentialRequestTestResult.testFacets.push({
        description: 'correct png mime type',
        result: false,
      })
    }
    if (pngRequestCacheTest.status === 304) {
      sequentialRequestTestResult.testFacets.push({
        description: 'correct png response status code (304)',
        result: true,
      })
    } else {
      sequentialRequestTestResult.testFacets.push({
        description: 'incorrect png response status code ',
        result: false,
      })
    }
  } else {
    sequentialRequestTestResult.testFacets.push({ description: 'files not served', result: false })
  }

  testResults.push(sequentialRequestTestResult)

  // Test #29

  wait(200)
  const thirdResponse = await fetch('/test-files/cf-logo-h-rgb-rev.png', { method: 'GET' })

  const noIfNoneMatchResult: kvah.TestResult = {
    description:
      'getAssetFromKV if-none-match not sent but resource in cache, should return cache hit 200 OK',
    testFacets: [],
  }

  if (thirdResponse.ok) {
    const fourthContentHash = await getCFStyleXXHash(await thirdResponse.blob())
    if (fourthContentHash === '5d350150a9' && thirdResponse.status === 200) {
      noIfNoneMatchResult.testFacets.push({
        description: 'correct file/status code served',
        result: true,
      })
    } else {
      noIfNoneMatchResult.testFacets.push({
        description: 'incorrect file or status code served',
        result: false,
      })
    }
    if (thirdResponse.headers.get('cf-cache-status') === 'HIT') {
      noIfNoneMatchResult.testFacets.push({
        description: 'correct (HIT) cf-cache-status set on response',
        result: true,
      })
    } else {
      noIfNoneMatchResult.testFacets.push({
        description: 'incorrect cf-cache-status set on response',
        result: false,
      })
    }
  } else {
    noIfNoneMatchResult.testFacets.push({ description: 'file not served', result: false })
  }

  testResults.push(noIfNoneMatchResult)

  const noNaxAgeOnSequentialResult: kvah.TestResult = {
    description: 'getAssetFromKV does not store max-age on two sequential requests',
    testFacets: [],
  }

  if (pngRequest.ok && pngRequestCacheTest.status === 304) {
    if (
      pngRequest.headers.get('cache-control') === 'max-age=1' &&
      pngRequestCacheTest.headers.get('cache-control') === 'no-store, must-revalidate'
    ) {
      noNaxAgeOnSequentialResult.testFacets.push({
        description: 'correct (no) browserTTL set on png requests',
        result: true,
      })
    } else {
      noNaxAgeOnSequentialResult.testFacets.push({
        description: 'incorrect browserTTL set on at least one png response',
        result: false,
      })
    }
    if (pngRequest.headers.get('cf-cache-status') === 'MISS') {
      noNaxAgeOnSequentialResult.testFacets.push({
        description: 'correct (MISS) cf-cache-status set on png response',
        result: true,
      })
    } else {
      noNaxAgeOnSequentialResult.testFacets.push({
        description: 'incorrect cf-cache-status set on png response',
        result: false,
      })
    }
    if (pngRequestCacheTest.headers.get('cf-cache-status') === 'REVALIDATED') {
      noNaxAgeOnSequentialResult.testFacets.push({
        description: 'correct (REVALIDATED) cf-cache-status set on second png response',
        result: true,
      })
    } else {
      noNaxAgeOnSequentialResult.testFacets.push({
        description: 'incorrect cf-cache-status set on second png response',
        result: false,
      })
    }
    if (pngContentType === 'image/png' && pngCacheTestContentType === 'image/png') {
      noNaxAgeOnSequentialResult.testFacets.push({
        description: 'correct png mime types',
        result: true,
      })
    } else {
      noNaxAgeOnSequentialResult.testFacets.push({
        description: 'incorrect png mime types',
        result: false,
      })
    }
  } else {
    noNaxAgeOnSequentialResult.testFacets.push({ description: 'files not served', result: false })
  }

  testResults.push(noNaxAgeOnSequentialResult)

  const bypassCFCacheTestResult: kvah.TestResult = {
    description: 'getAssetFromKV does not cache on Cloudflare when bypass cache set',
    testFacets: [],
  }

  if (jpgRequestCacheTest.ok) {
    if (jpgCacheTestContentHash === '53b5d46203') {
      bypassCFCacheTestResult.testFacets.push({
        description: 'correct jpg file served',
        result: true,
      })
    } else {
      bypassCFCacheTestResult.testFacets.push({
        description: 'incorrect jpg file served',
        result: false,
      })
    }
    if (jpgRequestCacheTest.headers.get('cache-control') === null) {
      bypassCFCacheTestResult.testFacets.push({
        description: 'correct (no) browserTTL set on jpg response',
        result: true,
      })
    } else {
      bypassCFCacheTestResult.testFacets.push({
        description: 'incorrect browserTTL set on jpg response',
        result: false,
      })
    }
    if (jpgRequestCacheTest.headers.get('cf-cache-status') === null) {
      bypassCFCacheTestResult.testFacets.push({
        description: 'correct (no) cf-cache-status set on jpg response',
        result: true,
      })
    } else {
      bypassCFCacheTestResult.testFacets.push({
        description: 'incorrect cf-cache-status set on jpg response',
        result: false,
      })
    }
    if (jpgCacheTestContentType === 'image/jpeg') {
      bypassCFCacheTestResult.testFacets.push({
        description: 'correct jpg mime type',
        result: true,
      })
    } else {
      bypassCFCacheTestResult.testFacets.push({
        description: 'correct jpg mime type',
        result: false,
      })
    }
    if (jpgRequestCacheTest.status === 200) {
      bypassCFCacheTestResult.testFacets.push({
        description: 'correct jpg response status code (200)',
        result: true,
      })
    } else {
      bypassCFCacheTestResult.testFacets.push({
        description: 'incorrect jpg response status code ',
        result: false,
      })
    }
  } else {
    bypassCFCacheTestResult.testFacets.push({ description: 'files not served', result: false })
  }

  testResults.push(bypassCFCacheTestResult)

  // Test #22

  const nullCacheTest = await fetch('/test-files/client/index.html', {
    method: 'GET',
    headers: { 'x-cf-test-edge-ttl': 'null', 'x-cf-test-browser-ttl': 'null' },
  })
  await wait(200)
  const secondNullCacheTest = await fetch('/test-files/client/index.html', {
    method: 'GET',
    headers: { 'x-cf-test-edge-ttl': 'null', 'x-cf-test-browser-ttl': 'null' },
  })
  const nullTTLsTestResult: kvah.TestResult = {
    description: 'getAssetFromKV TTls set to null should not cache on browser or edge',
    testFacets: [],
  }
  if (nullCacheTest.ok && secondNullCacheTest.ok) {
    const nullTestContentContentHash = await getCFStyleXXHash(await nullCacheTest.blob())
    const secondNullTestContentHash = await getCFStyleXXHash(await secondNullCacheTest.blob())
    if (
      nullTestContentContentHash === 'e24b5b69a5' &&
      nullTestContentContentHash === secondNullTestContentHash
    ) {
      nullTTLsTestResult.testFacets.push({ description: 'correct files served', result: true })
    } else {
      nullTTLsTestResult.testFacets.push({ description: 'incorrect files served', result: false })
    }
    if (
      nullCacheTest.headers.get('cache-control') === null &&
      secondNullCacheTest.headers.get('cache-control') === null
    ) {
      nullTTLsTestResult.testFacets.push({
        description: 'correct (no) browserTTL set on responses',
        result: true,
      })
    } else {
      nullTTLsTestResult.testFacets.push({
        description: 'incorrect browserTTL set on one or more response',
        result: false,
      })
    }
    if (
      secondNullCacheTest.headers.get('cf-cache-status') === null &&
      secondNullCacheTest.headers.get('cf-cache-status') === null
    ) {
      nullTTLsTestResult.testFacets.push({
        description: 'correct (no) cf-cache-status set on jpg response',
        result: true,
      })
    } else {
      nullTTLsTestResult.testFacets.push({
        description: 'incorrect cf-cache-status set on jpg response',
        result: false,
      })
    }
    if (secondNullCacheTest.status === 200 && nullCacheTest.status === 200) {
      nullTTLsTestResult.testFacets.push({
        description: 'correct response status code (200)',
        result: true,
      })
    } else {
      nullTTLsTestResult.testFacets.push({
        description: 'incorrect response status code on one or both files',
        result: false,
      })
    }
  } else {
    nullTTLsTestResult.testFacets.push({ description: 'files not served', result: false })
  }

  testResults.push(nullTTLsTestResult)

  // Test #30

  const rangeHTMLRequest = await fetch('/test-files/sub/index.html', { method: 'GET' })
  await wait(200)
  const rangeHTMLRequestCacheTest = await fetch('/test-files/sub/index.html', {
    method: 'GET',
    headers: { range: 'bytes=0-10' },
  })
  const rangeHTMLCacheTestContentType = rangeHTMLRequestCacheTest.headers.get('content-type')
  const rangeHTMLRequestTestResult: kvah.TestResult = {
    description:
      'getAssetFromKV if range request submitted and resource in cache, request fulfilled',
    testFacets: [],
  }
  if (rangeHTMLRequestCacheTest.ok) {
    const contentHash = await getCFStyleXXHash(await rangeHTMLRequest.blob())
    if (contentHash === '5c7311b943') {
      rangeHTMLRequestTestResult.testFacets.push({
        description: 'correct file served',
        result: true,
      })
    } else {
      rangeHTMLRequestTestResult.testFacets.push({
        description: 'incorrect file served',
        result: false,
      })
    }
    if (rangeHTMLCacheTestContentType === 'text/html; charset=utf-8') {
      rangeHTMLRequestTestResult.testFacets.push({ description: 'correct mime type', result: true })
    } else {
      rangeHTMLRequestTestResult.testFacets.push({
        description: 'incorrect mime type',
        result: false,
      })
    }
    if (rangeHTMLRequestCacheTest.status === 206) {
      rangeHTMLRequestTestResult.testFacets.push({
        description: 'correct status code (' + rangeHTMLRequestCacheTest.status + ') on response',
        result: true,
      })
    } else {
      rangeHTMLRequestTestResult.testFacets.push({
        description: 'incorrect status code (' + rangeHTMLRequestCacheTest.status + ') on response',
        result: false,
      })
    }
    if (rangeHTMLRequestCacheTest.headers.get('content-range') !== null) {
      rangeHTMLRequestTestResult.testFacets.push({
        description: 'content range header on response',
        result: true,
      })
    } else {
      rangeHTMLRequestTestResult.testFacets.push({
        description: 'no content range header on response',
        result: false,
      })
    }
    if (rangeHTMLRequestCacheTest.headers.get('cf-cache-status') === 'HIT') {
      rangeHTMLRequestTestResult.testFacets.push({
        description: 'correct (HIT) cf-cache-status set on response',
        result: true,
      })
    } else {
      rangeHTMLRequestTestResult.testFacets.push({
        description: 'incorrect cf-cache-status set on response',
        result: false,
      })
    }
  } else {
    rangeHTMLRequestTestResult.testFacets.push({ description: 'file not served', result: false })
  }
  testResults.push(rangeHTMLRequestTestResult)

  return testResults
}

export default runTests
