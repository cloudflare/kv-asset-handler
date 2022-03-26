import type * as kvah from '../../types/tests'

import getCFStyleXXHash from '../get-cf-hash'

const runTests = async function (): Promise<kvah.TestResult[]> {
  const testResults: kvah.TestResult[] = []

  // Test #1

  const defaultDocumentResult: kvah.TestResult = {
    description: 'serveSinglePageApp returns root asset path when request path ends in .html',
    testFacets: [],
  }

  const defaultPageTest = await fetch('/thing.html', {
    method: 'GET',
    headers: { 'x-cf-test-single-page-app': 'true' },
  })
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

  const noExtensionDocumentResult: kvah.TestResult = {
    description:
      'serveSinglePageApp returns root asset path when request path does not have extension',
    testFacets: [],
  }

  const noExtensionPageTest = await fetch('/thing', {
    method: 'GET',
    headers: { 'x-cf-test-single-page-app': 'true' },
  })
  if (noExtensionPageTest.ok) {
    const contentHash = await getCFStyleXXHash(await noExtensionPageTest.blob())
    if (contentHash === '482060b178') {
      noExtensionDocumentResult.testFacets.push({ description: 'index.html served', result: true })
    } else {
      noExtensionDocumentResult.testFacets.push({
        description: 'incorrect file served',
        result: false,
      })
    }
  } else {
    noExtensionDocumentResult.testFacets.push({
      description: 'index.html not served',
      result: false,
    })
  }
  testResults.push(noExtensionDocumentResult)

  // Test #2

  const nonHTHMLExtensionDocumentResult: kvah.TestResult = {
    description:
      'serveSinglePageApp returns requested asset when request path has non-html extension',
    testFacets: [],
  }

  const nonHTHMLExtensionPageTest = await fetch('/test-files/empty.txt', {
    method: 'GET',
    headers: { 'x-cf-test-single-page-app': 'true' },
  })
  if (nonHTHMLExtensionPageTest.ok) {
    const contentHash = await getCFStyleXXHash(await nonHTHMLExtensionPageTest.blob())
    if (contentHash === 'ef46db3751') {
      nonHTHMLExtensionDocumentResult.testFacets.push({
        description: 'correct file served',
        result: true,
      })
    } else {
      nonHTHMLExtensionDocumentResult.testFacets.push({
        description: 'incorrect file served',
        result: false,
      })
    }
  } else {
    nonHTHMLExtensionDocumentResult.testFacets.push({
      description: 'file not served',
      result: false,
    })
  }
  testResults.push(nonHTHMLExtensionDocumentResult)

  return testResults
}

export default runTests
