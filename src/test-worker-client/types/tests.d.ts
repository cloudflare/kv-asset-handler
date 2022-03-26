interface TestResult {
  description: string
  testFacets: TestFacet[]
}

interface TestFacet {
  description: string
  result: boolean
}

export interface KVAHTest {
  run: () => Promise<TestResult>
}
