import type * as kvah from '../../types/tests'

import getCFStyleXXHash from '../get-cf-hash'

const runTests = async function (): Promise<kvah.TestResult[]> {
  const testResults: kvah.TestResult[] = []

  // Test #11
  const userDecodedResponse = await fetch('test-files/%E4%BD%A0%E5%A5%BD/', { method: 'GET' })
  const standardResponse = await fetch('test-files/你好/', { method: 'GET' }) // This seems to send encoded rather than plain text
  const userDecodedResult: kvah.TestResult = {
    description: 'getAssetFromKV Support for user decode url path',
    testFacets: [],
  }
  const contentHash11a = await getCFStyleXXHash(await userDecodedResponse.blob())
  const contentHash11b = await getCFStyleXXHash(await standardResponse.blob())
  if (userDecodedResponse.ok && standardResponse.ok) {
    if (contentHash11a === contentHash11b) {
      userDecodedResult.testFacets.push({ description: 'same files returned', result: true })
    } else {
      userDecodedResult.testFacets.push({ description: 'different files returned', result: false })
    }
  } else {
    userDecodedResult.testFacets.push({ description: 'files not served', result: false })
  }
  testResults.push(userDecodedResult)

  // MapRequestToAsset Test #3
  const aboutMeDocumentResponse = await fetch('test-files/about.me/', { method: 'GET' })
  const aboutMeDocumentResult: kvah.TestResult = {
    description:
      'mapRequestToAsset() correctly changes test-files/about.me/ -> test-files/about.me/index.html',
    testFacets: [],
  }
  if (aboutMeDocumentResponse.ok) {
    const contentHash = await getCFStyleXXHash(await aboutMeDocumentResponse.blob())
    if (contentHash === 'f9e78fb64c') {
      aboutMeDocumentResult.testFacets.push({ description: 'correct file served', result: true })
    } else {
      aboutMeDocumentResult.testFacets.push({ description: 'incorrect file served', result: false })
    }
  } else {
    aboutMeDocumentResult.testFacets.push({
      description: '/test-files/client/index.html not served',
      result: false,
    })
  }
  testResults.push(aboutMeDocumentResult)

  return testResults
}

export default runTests
