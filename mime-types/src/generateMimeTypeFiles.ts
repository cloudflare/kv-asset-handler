import * as fs from 'fs'
import path from 'path'
import mimeScore from './mimeScore'
import mimedb from 'mime-db'
import chalk from 'chalk'

const STANDARD_FACET_SCORE = 900

interface ExtendedMimeEntry extends mimedb.MimeEntry {
  type: string
  mimeScore: number
}

interface TypeRecord {
  [key: string]: readonly string[]
}

let entriesByExtension: Map<string, ExtendedMimeEntry[]> = new Map()
let typeMap: Map<string, { mappedExtensions: string[]; mimeScore: number }> = new Map()

// Locate any conflict extensions in mime-db by looping through and grouping by extension

for (const [type, entry] of Object.entries(mimedb)) {
  if (!entry.extensions) continue

  typeMap.set(type, {
    mappedExtensions: [...entry.extensions],
    mimeScore: mimeScore(type, entry.source),
  })

  const extendedEntry: ExtendedMimeEntry = Object.assign({}, entry, {
    type: type,
    mimeScore: mimeScore(type, entry.source),
  })

  for (const ext of entry.extensions) {
    if (entriesByExtension.has(ext)) {
      let extensionTypes = entriesByExtension.get(ext)
      if (extensionTypes) {
        extensionTypes.push(extendedEntry)
        entriesByExtension.set(ext, extensionTypes)
      }
    } else {
      entriesByExtension.set(ext, [extendedEntry])
    }
  }
}

// Loop through this Map and log/maks the adjustments we will make to extensions based on mimeScore

for (const [extension, extensionTypes] of entriesByExtension) {
  if (extensionTypes.length > 1) {
    // Is there a single maximum mimeScore or multiple (this should only be 3gpp)?
    const maxMimeScore = extensionTypes.reduce(
      (val, item) => (item.mimeScore > val ? item.mimeScore : val),
      0,
    )
    const itemsWithMaxMimeScore = extensionTypes.reduce((arr: ExtendedMimeEntry[], tE) => {
      if (tE.mimeScore === maxMimeScore) arr.push(tE)
      return arr
    }, [])
    let lastItemWithMaxScore: ExtendedMimeEntry

    if (itemsWithMaxMimeScore.length > 1) {
      // TODO: Why do we choose the later one in the list?
      lastItemWithMaxScore = itemsWithMaxMimeScore[itemsWithMaxMimeScore.length - 1]
      console.log(
        `${extension} has multiple types with the same score (${itemsWithMaxMimeScore
          .map((iwmms) => chalk.red(iwmms.type) + ' (' + iwmms.mimeScore + ')')
          .join(' / ')}), choosing ${chalk.green(lastItemWithMaxScore.type)}`,
      )
    } else {
      extensionTypes.sort((a, b) => b.mimeScore - a.mimeScore)

      if (extensionTypes[0].mimeScore > extensionTypes[1].mimeScore) {
        lastItemWithMaxScore = extensionTypes[0]

        const lowerScoreTypes = extensionTypes.reduce((arr: ExtendedMimeEntry[], tE) => {
          if (tE.mimeScore < lastItemWithMaxScore.mimeScore) arr.push(tE)
          return arr
        }, [])

        console.log(
          `${extension} has multiple types. Preferring ${chalk.green(lastItemWithMaxScore.type)} (${
            lastItemWithMaxScore.mimeScore
          }) over ${lowerScoreTypes
            .map((lst) => chalk.red(lst.type) + ' (' + lst.mimeScore + ')')
            .join(' / ')}`,
        )
      } else {
        throw new Error('extension types sorting has generated an incorrect order')
      }
    }

    extensionTypes.forEach((tE) => {
      if (tE.type !== lastItemWithMaxScore.type) {
        let typeDetails = typeMap.get(tE.type)
        if (typeDetails) {
          typeDetails.mappedExtensions = typeDetails.mappedExtensions.map((e) => {
            return e === extension ? '*' + e : e
          })
          typeMap.set(tE.type, typeDetails)
        }
      }
    })
  }
}

// Segregate into standard and non-standard types based on facet per
// https://tools.ietf.org/html/rfc6838#section-3.1
let standardTypes: TypeRecord = {}
let otherTypes: TypeRecord = {}

typeMap.forEach((typeDetails, typeName) => {
  if (typeDetails.mimeScore >= STANDARD_FACET_SCORE) {
    standardTypes[typeName] = typeDetails.mappedExtensions
  } else {
    otherTypes[typeName] = typeDetails.mappedExtensions
  }
})

const formattedStandardTypes = JSON.stringify(standardTypes)
  .replace(/^{/, '{\n\t')
  .replace(/"/g, "'")
  .replace(/\],'/g, "],\n\t'")
  .replace(/}$/g, ',\n}')

const formattedOtherTypes = JSON.stringify(otherTypes)
  .replace(/^{/, '{\n\t')
  .replace(/"/g, "'")
  .replace(/\],'/g, "],\n\t'")
  .replace(/}$/g, ',\n}')

fs.writeFileSync(
  path.join(process.cwd(), '/src/standardMimeTypes.ts'),
  'export default ' + formattedStandardTypes + ';',
)
fs.writeFileSync(
  path.join(process.cwd(), '/src/otherMimeTypes.ts'),
  'export default ' + formattedOtherTypes + ';',
)
