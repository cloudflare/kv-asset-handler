import type * as kvah from '../../types/tests'

import getCFStyleXXHash from '../get-cf-hash'

const runTests = async function (): Promise<kvah.TestResult[]> {
  const testResults: kvah.TestResult[] = []

  // Test #1

  const defaultDocumentResult: kvah.TestResult = {
    description: 'getAssetFromKV return correct val from KV and default caching',
    testFacets: [],
  }

  const defaultPageTest = await fetch('/', { method: 'GET' })
  if (defaultPageTest.ok) {
    const contentHash = await getCFStyleXXHash(await defaultPageTest.blob())
    if (contentHash === '482060b178') {
      defaultDocumentResult.testFacets.push({ description: 'index.html served', result: true })
    } else {
      defaultDocumentResult.testFacets.push({ description: 'incorrect file served', result: false })
    }
  } else {
    defaultDocumentResult.testFacets.push({ description: 'index.html not served', result: false })
  }
  testResults.push(defaultDocumentResult)

  // Test #2
  const extenstionlessWithSlashResponse = await fetch('test-files/client/', { method: 'GET' })
  const extensionlessWithSlashResult: kvah.TestResult = {
    description:
      'getAssetFromKV evaluated the file matching the extensionless path first /client/ -> client',
    testFacets: [],
  }
  if (extenstionlessWithSlashResponse.ok) {
    const contentHash = await getCFStyleXXHash(await extenstionlessWithSlashResponse.blob())
    if (contentHash === 'e24b5b69a5') {
      extensionlessWithSlashResult.testFacets.push({
        description: '/client/index.html served',
        result: true,
      })
    } else {
      extensionlessWithSlashResult.testFacets.push({
        description: 'incorrect file served',
        result: false,
      })
    }
  } else {
    extensionlessWithSlashResult.testFacets.push({
      description: '/client/index.html not served',
      result: false,
    })
  }
  testResults.push(extensionlessWithSlashResult)

  // Test #3
  const extensionLessResponse = await fetch('test-files/client', { method: 'GET' })
  const extensionlessResult: kvah.TestResult = {
    description:
      'getAssetFromKV evaluated the file matching the extensionless path first /client -> client',
    testFacets: [],
  }
  if (extensionLessResponse.ok) {
    const contentHash = await getCFStyleXXHash(await extensionLessResponse.blob())
    if (contentHash === 'e24b5b69a5') {
      extensionlessResult.testFacets.push({
        description: '/client/index.html served',
        result: true,
      })
    } else {
      extensionlessResult.testFacets.push({ description: 'incorrect file served', result: false })
    }
  } else {
    extensionlessResult.testFacets.push({
      description: '/client/index.html not served',
      result: false,
    })
  }
  testResults.push(extensionlessResult)

  // MapRequestToAsset Test #4
  const customDefaultDocumentResponse = await fetch('test-files/client', {
    method: 'GET',
    headers: { 'x-cf-test-custom-default': 'true' },
  })
  const customDefaultDocumentResult: kvah.TestResult = {
    description:
      'mapRequestToAsset() correctly changes /test-files/client -> /test-files/client/default.html',
    testFacets: [],
  }
  if (customDefaultDocumentResponse.ok) {
    const contentHash = await getCFStyleXXHash(await customDefaultDocumentResponse.blob())
    if (contentHash === '797d07d691') {
      customDefaultDocumentResult.testFacets.push({
        description: '/test-files/client/default.html served',
        result: true,
      })
    } else {
      customDefaultDocumentResult.testFacets.push({
        description: 'incorrect file served',
        result: false,
      })
    }
  } else {
    customDefaultDocumentResult.testFacets.push({
      description: '/test-files/client/default.html not served',
      result: false,
    })
  }
  testResults.push(customDefaultDocumentResult)

  // Test #4
  const notInManifestResponse = await fetch('/no-hash.txt', { method: 'GET' })
  const notInManifestResult: kvah.TestResult = {
    description: 'getAssetFromKV if not in asset manifest still returns nohash.txt',
    testFacets: [],
  }
  if (notInManifestResponse.ok) {
    const content = await notInManifestResponse.text()
    if (content === 'test not in manifest') {
      notInManifestResult.testFacets.push({ description: 'correct file served', result: true })
    } else {
      notInManifestResult.testFacets.push({ description: 'incorrect file served', result: false })
    }
  } else {
    notInManifestResult.testFacets.push({ description: 'file not served', result: false })
  }
  testResults.push(notInManifestResult)

  // Test #5
  const defaultNoManifestResponse = await fetch('/test-files/client/index.html', {
    method: 'GET',
    headers: { 'x-cf-test-no-manifest': 'true' },
  })
  const defaultNoManifestResult: kvah.TestResult = {
    description: 'getAssetFromKV if no asset manifest /client -> client fails',
    testFacets: [],
  }
  if (!defaultNoManifestResponse.ok) {
    defaultNoManifestResult.testFacets.push({ description: 'no file served', result: true })
    if (defaultNoManifestResponse.status === 404) {
      defaultNoManifestResult.testFacets.push({
        description: 'response status code 404',
        result: true,
      })
    } else {
      defaultNoManifestResult.testFacets.push({
        description: `incorrect response status code (${defaultNoManifestResponse.status}) should be 404`,
        result: false,
      })
    }
  } else {
    defaultNoManifestResult.testFacets.push({ description: 'file not served', result: false })
  }
  testResults.push(defaultNoManifestResult)

  // Test #6
  const defaultToIndexHtmlResponse = await fetch('test-files/sub/', { method: 'GET' })
  const defaultToIndexHtmlResult: kvah.TestResult = {
    description: 'getAssetFromKV if sub/ -> sub/index.html served',
    testFacets: [],
  }
  if (defaultToIndexHtmlResponse.ok) {
    const contentHash = await getCFStyleXXHash(await defaultToIndexHtmlResponse.blob())
    const contentType = defaultToIndexHtmlResponse.headers.get('content-type')
    if (contentHash === '5c7311b943') {
      defaultToIndexHtmlResult.testFacets.push({
        description: '/sub/index.html served',
        result: true,
      })
    } else {
      defaultToIndexHtmlResult.testFacets.push({
        description: 'incorrect file served',
        result: false,
      })
    }
    if (contentType === 'text/html; charset=utf-8') {
      defaultToIndexHtmlResult.testFacets.push({ description: 'correct mime type', result: true })
    } else {
      defaultToIndexHtmlResult.testFacets.push({
        description: `incorrect mime type (${contentType}) should be text/html; charset=utf-8`,
        result: false,
      })
    }
  } else {
    defaultToIndexHtmlResult.testFacets.push({
      description: '/sub/index.html not served',
      result: false,
    })
  }
  testResults.push(defaultToIndexHtmlResult)

  const test19Result: kvah.TestResult = {
    description: 'getAssetFromKV with no trailing slash on root',
    testFacets: [],
  }

  const noTrailingSlashPageTest = await fetch('', { method: 'GET' })
  if (noTrailingSlashPageTest.ok) {
    const contentHash = await getCFStyleXXHash(await noTrailingSlashPageTest.blob())
    if (contentHash === '482060b178') {
      test19Result.testFacets.push({ description: 'index.html served', result: true })
    } else {
      test19Result.testFacets.push({ description: 'incorrect file served', result: false })
    }
  } else {
    test19Result.testFacets.push({ description: 'index.html not served', result: false })
  }
  testResults.push(test19Result)

  // Test #21
  const doesNotExistResponse = await fetch('/does-not-exist', { method: 'GET' })
  const doesNotExistResult: kvah.TestResult = {
    description: 'getAssetFromKV no result throws an error',
    testFacets: [],
  }
  if (!doesNotExistResponse.ok) {
    doesNotExistResult.testFacets.push({ description: 'no file served', result: true })
    if (doesNotExistResponse.status === 404) {
      doesNotExistResult.testFacets.push({ description: 'response status code 404', result: true })
    } else {
      doesNotExistResult.testFacets.push({
        description: `incorrect response status code (${doesNotExistResponse.status}) should be 404`,
        result: false,
      })
    }
    if ((await doesNotExistResponse.text()) === 'NotFoundError thrown') {
      doesNotExistResult.testFacets.push({ description: 'NotFoundError thrown', result: true })
    } else {
      doesNotExistResult.testFacets.push({ description: 'NotFoundError not thrown', result: false })
    }
  } else {
    doesNotExistResult.testFacets.push({ description: 'file not served', result: false })
  }
  testResults.push(doesNotExistResult)

  // Test #25
  const noBoundNamespaceResponse = await fetch('test-files/client/', {
    method: 'GET',
    headers: { 'x-cf-test-no-namespace': 'true' },
  })
  const noBoundNamespaceResult: kvah.TestResult = {
    description: 'getAssetFromKV when namespace not bound fails',
    testFacets: [],
  }
  if (!noBoundNamespaceResponse.ok) {
    noBoundNamespaceResult.testFacets.push({ description: 'file not served', result: true })
    if (noBoundNamespaceResponse.status === 500) {
      noBoundNamespaceResult.testFacets.push({
        description: 'correct response status code (500)',
        result: true,
      })
    } else {
      noBoundNamespaceResult.testFacets.push({
        description: `incorrect response status code (${noBoundNamespaceResponse.status}) should be 500`,
        result: false,
      })
    }
  } else {
    noBoundNamespaceResult.testFacets.push({ description: 'file not served', result: false })
  }
  testResults.push(noBoundNamespaceResult)

  return testResults
}

export default runTests
