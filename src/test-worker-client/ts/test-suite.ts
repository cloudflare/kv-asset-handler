import type * as kvah from '../types/tests'

import getCFStyleXXHash from './get-cf-hash'

import runStandardTests from './tests/standard'
import runNonStandardTests from './tests/non-standard'
import runEtagTests from './tests/etag'
import runCacheTests from './tests/caches'
import runSinglePageAppTests from './tests/single-page-app'

interface ManifestEntry {
  fileName: string
  filePath: string
  contentType: string | null
  cfHash: string | null
  xHash: string | null
  cacheStatus: string | null
}

const sortedManifestArr: ManifestEntry[] = []

const cfHash = /[a-zA-Z0-9]{10}/
const headers = ['filename', 'path', 'contentType', 'cfHash', 'xHash64', 'cf-cache-status']
const tableClasses = ['border-collapse', 'table-auto', 'w-full', 'text-xs', 'mt-4']
const thClasses = ['pl-4', 'pb-2']
const tHeadClasses = [
  'bg-gray-50',
  'text-sm',
  'text-gray-400',
  'border-b',
  'border-gray-200',
  'font-medium',
  'pl-4',
  'text-left',
]
const rowClasses = ['border-b', 'border-gray-200']
const tdClasses = ['pl-4', 'py-2', 'bg-white']
const infoElClasses = ['flex', 'flex-row', 'ml-6', 'items-center', 'my-1']

const checkSvg =
  '<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" /></svg>'
const crossSvg =
  '<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>'
const infoSvg =
  '<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>'

/*
	Tests incorporated from existing:

	1. getAssetFromKV return correct val from KV and default caching
		- Test with actual or test files

	2. getAssetFromKV evaluated the file matching the extensionless path first /client/ -> client
		- In the context of a wrangler publish, this (combined with #3) is impossible as it would require both a file and a dir of the same name
		- Code actually resolves to /client/index.html - default page is effectively the same test

	3. getAssetFromKV evaluated the file matching the extensionless path first /client -> client
		- In the context of a wrangler publish, this (combined with #2) is impossible as it would require both a file and a dir of the same name

	4. getAssetFromKV if not in asset manifest still returns nohash.txt
		- In the context of a wrangler publish, this is impossible as every file would be hashed.

	5. getAssetFromKV if no asset manifest /client -> client fails

	6. getAssetFromKV if sub/ -> sub/index.html served

	7. getAssetFromKV gets index.html by default for / requests
		- Tested by default with main page

	8. getAssetFromKV non ASCII path support (测试.html)
		- Tested by actual file

	9. getAssetFromKV supports browser percent encoded URLs
		- Tested by actual file (request URL will need to be encoded)

	10. getAssetFromKV only decode URL when necessary
		- Tested by actual file

	11. getAssetFromKV Support for user decode url path

	12. getAssetFromKV custom key modifier
		- This is somewhat user implementation specific

	13. getAssetFromKV request override with existing manifest file
		- This is somewhat user implementation specific, but tested with #14

	14. getAssetFromKV when setting browser caching

	15. getAssetFromKV when setting custom cache setting

	16. getAssetFromKV caches on two sequential requests
		- Combined with #15
		- Can the browser settings (e.g. disable cache in Chrome impact this?)

	17. getAssetFromKV does not store max-age on two sequential requests

	18. getAssetFromKV does not cache on Cloudflare when bypass cache set
		- Tested by #15/#16

	19. getAssetFromKV with no trailing slash on root
		- Tested by this page with default static file structure

	20. getAssetFromKV with no trailing slash on a subdirectory
		- Tested by multiple other tests

	21. getAssetFromKV no result throws an error

	22. getAssetFromKV TTls set to null should not cache on browser or edge 

	23. getAssetFromKV passing in a custom NAMESPACE serves correct asset
		- Is the model with module workers - implictly tested

	24. getAssetFromKV when custom namespace without the asset should fail
		- As above

	25. getAssetFromKV when namespace not bound fails

	26. getAssetFromKV when if-none-match === active resource version, should revalidate
		- Tested by #15/#16

	27. getAssetFromKV when if-none-match equals etag of stale resource then should bypass cache
		- Merge with #15/#16 (but should return HIT rather than MISS)

	28. getAssetFromKV when resource in cache, etag should be weakened before returned to eyeball
		- Merge with #15/#16

	29. getAssetFromKV if-none-match not sent but resource in cache, should return cache hit 200 OK
		- Merge with #15/#16

	30. getAssetFromKV if range request submitted and resource in cache, request fulfilled


	// Changes

	28: Should return HIT rather than miss
	
*/

const addInfoElemenToStatus = (text: string): void => {
  const statusEl = document.getElementById('status')

  const infoEl = document.createElement('div')
  const infoIcon = document.createElement('div')
  infoIcon.innerHTML = infoSvg
  infoEl.classList.add(...infoElClasses)
  const infoElDescription = document.createElement('div')
  infoElDescription.textContent = text
  infoEl.appendChild(infoIcon)
  infoEl.appendChild(infoElDescription)
  statusEl.appendChild(infoEl)
}

const displayReferenceTestResults = (referenceTestResults: kvah.TestResult[]): void => {
  const resultEl = document.getElementById('result')

  for (const result of referenceTestResults) {
    const testEl = document.createElement('div')
    const testName = document.createElement('div')
    testName.textContent = result.description
    testName.classList.add(...['mt-2', 'ml-2', 'mb-1', 'text-gray-900'])
    testEl.appendChild(testName)
    for (const facet of result.testFacets) {
      const facetEl = document.createElement('div')
      facetEl.classList.add(...['flex', 'flex-row', 'ml-2', 'items-center'])
      const facetDescription = document.createElement('div')
      const facetOutcome = document.createElement('div')
      facetDescription.textContent = facet.description
      if (facet.result) {
        facetOutcome.innerHTML = checkSvg
        facetOutcome.classList.add(...['text-green-600', 'ml-2'])
      } else {
        facetOutcome.innerHTML = crossSvg
        facetOutcome.classList.add(...['text-red-600', 'ml-2'])
      }
      facetEl.appendChild(facetOutcome)
      facetEl.appendChild(facetDescription)
      testEl.appendChild(facetEl)
    }
    resultEl.appendChild(testEl)
  }

  return
}

const disableButtons = () => {
  const runReferenceTestsBtn = document.getElementById(
    'run_reference_tests_button',
  ) as HTMLButtonElement
  const downloadManifestBtn = document.getElementById('download_manifest_btn') as HTMLButtonElement
  const downloadManifestFilesBtn = document.getElementById(
    'download_manifest_files_btn',
  ) as HTMLButtonElement
  if (runReferenceTestsBtn) runReferenceTestsBtn.disabled = true
  if (downloadManifestBtn) downloadManifestBtn.disabled = true
  if (downloadManifestFilesBtn) downloadManifestFilesBtn.disabled = true
}

const enableButtons = () => {
  const runReferenceTestsBtn = document.getElementById(
    'run_reference_tests_button',
  ) as HTMLButtonElement
  const downloadManifestBtn = document.getElementById('download_manifest_btn') as HTMLButtonElement
  const downloadManifestFilesBtn = document.getElementById(
    'download_manifest_files_btn',
  ) as HTMLButtonElement
  if (runReferenceTestsBtn) runReferenceTestsBtn.disabled = false
  if (downloadManifestBtn) downloadManifestBtn.disabled = false
  if (downloadManifestFilesBtn) downloadManifestFilesBtn.disabled = false
}

const runReferenceTests = async (): Promise<void> => {
  const testResults = []

  const statusEl = document.getElementById('status')
  statusEl.innerHTML = ''

  disableButtons()

  addInfoElemenToStatus('running reference tests')
  addInfoElemenToStatus(
    'note that cache tests can be impacted by the state of the cache at test time and browser nuances',
  )

  testResults.push(...(await runStandardTests()))
  testResults.push(...(await runNonStandardTests()))
  if (/workers\.dev/.test(window.location.hostname)) {
    addInfoElemenToStatus('cache tests will not run on workers.dev domain')
  } else {
    testResults.push(...(await runEtagTests()))
    testResults.push(...(await runCacheTests()))
  }
  testResults.push(...(await runSinglePageAppTests()))

  const resultEl = document.getElementById('result')
  resultEl.replaceChildren()
  resultEl.classList.remove(...resultEl.classList)
  resultEl.classList.add(
    ...['my-2', 'pt-2', 'border', 'border-grey-100', 'rounded-xl', 'text-sm', 'flex', 'flex-col'],
  )

  statusEl.removeChild(statusEl.children[0])
  displayReferenceTestResults(testResults)
  enableButtons()
}

const loadManifestFiles = async (): Promise<void> => {
  if (sortedManifestArr.length === 0) return

  const manifestTable = document.getElementById('manifest_table')
  if (!manifestTable) return

  const statusEl = document.getElementById('status')
  statusEl.innerHTML = ''

  disableButtons()

  addInfoElemenToStatus('downloading static files')

  const filterEl = document.getElementById('file_filter_regex') as HTMLInputElement
  let filterRegex: null | RegExp = null
  if (filterEl.value !== '') filterRegex = new RegExp(filterEl.value)

  for (const entry of sortedManifestArr) {
    if (entry.xHash) continue

    if (filterRegex && !filterRegex.test(entry.filePath)) continue

    const row = document.getElementById(entry.filePath)
    if (!row) continue

    const fileResponse = await fetch(encodeURI(entry.filePath), {
      method: 'GET',
    })

    if (fileResponse.ok) {
      if (entry.cfHash) {
        const hashSubStr = await getCFStyleXXHash(await fileResponse.blob())
        entry.xHash = hashSubStr
      }

      entry.contentType = fileResponse.headers.get('content-type')
      entry.cacheStatus = fileResponse.headers.get('cf-cache-status')

      Object.entries(entry).forEach((en, ind) => {
        const el = row.children[ind]
        if (en[0] === 'xHash') {
          el.innerHTML = en[1]
          entry.xHash === entry.cfHash
            ? el.classList.add('text-green-400')
            : el.classList.add('text-red-400')
        } else if (en[0] === 'cacheStatus') {
          if (en[1]) el.innerHTML = en[1]
        } else if (en[0] === 'contentType') {
          if (en[1]) el.innerHTML = en[1]
        }
      })
    } else {
      row.classList.add('text-red-400')
    }
  }

  statusEl.removeChild(statusEl.children[0])
  addInfoElemenToStatus('download completed')
  enableButtons()
}

const loadManifest = async (): Promise<void> => {
  const resultEl = document.getElementById('result')

  try {
    const statusEl = document.getElementById('status')
    statusEl.innerHTML = ''
    addInfoElemenToStatus('downloading manifest')
    disableButtons()

    const response = await fetch('/manifest', {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
      },
    })

    if (response.ok) {
      sortedManifestArr.length = 0
      resultEl.innerHTML = ''

      const manifest = (await response.json()) as Record<string, string>

      for (const [fileNameAndPath, kvpath] of Object.entries(manifest)) {
        const parts = fileNameAndPath.split('/')
        // There is probably a clever regex way to do this, but this may be more robust to strange names and multiple hash scenarios
        const kvPathParts = kvpath.split('.').reverse()
        let cfHashMatch: null | string = null

        for (const part of kvPathParts) {
          // One edge case exception (ten char word suffix), there may be more!
          if (part === 'webmanifest') continue
          if (cfHash.test(part)) {
            cfHashMatch = part
            break
          }
        }

        const manifestEntry: ManifestEntry = {
          fileName: parts[parts.length - 1],
          filePath: fileNameAndPath,
          contentType: null,
          cfHash: cfHashMatch,
          xHash: null,
          cacheStatus: null,
        }
        sortedManifestArr.push(manifestEntry)
      }
      sortedManifestArr.sort((a, b) => String(a.fileName).localeCompare(b.fileName))

      const manifestTable = document.createElement('table')
      manifestTable.setAttribute('id', 'manifest_table')

      for (const entry of sortedManifestArr) {
        const row = manifestTable.insertRow(-1)
        row.setAttribute('id', entry.filePath)
        row.classList.add(...rowClasses)
        Object.entries(entry).forEach((en, ind) => {
          const cell = row.insertCell(-1)
          cell.classList.add(...tdClasses)
          if (en[0] === 'fileName') {
            const a = document.createElement('a')
            a.setAttribute('href', encodeURI(entry.filePath))
            a.innerHTML = en[1]
            cell.appendChild(a)
            cell.classList.add('hover:text-gray-900')
          } else {
            if (en[1]) cell.innerHTML = en[1]
          }
        })
      }

      const header = manifestTable.createTHead()
      manifestTable.classList.add(...tableClasses)
      const headerRow = header.insertRow(0)
      headerRow.classList.add(...tHeadClasses)
      for (const header of headers) {
        const el = document.createElement('th')
        el.innerHTML = header
        el.classList.add(...thClasses)
        headerRow.appendChild(el)
      }
      resultEl.appendChild(manifestTable)

      const downloadFilesBtn = document.getElementById('download_manifest_files_btn')
      if (downloadFilesBtn) downloadFilesBtn.removeAttribute('disabled')
      statusEl.removeChild(statusEl.children[0])
    } else {
      // TODO: reconnect?
      statusEl.removeChild(statusEl.children[0])
      addInfoElemenToStatus('unable to download manifest')
    }
  } catch (e) {
    console.log(e)
  } finally {
    enableButtons()
  }
}

const updateFilter = function (): void {
  if (sortedManifestArr.length === 0) return

  const filterEl = document.getElementById('file_filter_regex') as HTMLInputElement
  if (!filterEl) return

  try {
    const filterRegex = new RegExp(filterEl.value)

    for (const entry of sortedManifestArr) {
      const row = document.getElementById(entry.filePath)
      if (!row) continue

      if (filterRegex.test(entry.filePath)) {
        row.classList.remove('hidden')
      } else {
        row.classList.add('hidden')
      }
    }
  } catch (e) {
    // TODO: surface likely regex error in UI rather than console
    console.log(e)
  }
}

export { loadManifest, loadManifestFiles, updateFilter, runReferenceTests }
