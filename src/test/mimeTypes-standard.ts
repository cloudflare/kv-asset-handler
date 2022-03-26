import test from 'ava'
import { mime } from '../mime'
import * as referenceMimeLite from 'mime/lite'
import mimedb = require('mime-db')
import standardMimeTypes from '../standardMimeTypes'
import otherMimeTypes from '../otherMimeTypes'

//@ts-ignore
import referenceStandardMimeTypes from 'mime/types/standard'
//@ts-ignore
import referenceOtherMimeTypes from 'mime/types/other'

const standardMimeTypeseEntryCount = Object.keys(standardMimeTypes).length
const otherMimeTypesEntryCount = Object.keys(otherMimeTypes).length

const referenceStandardMimeTypesEntryCount = Object.keys(referenceStandardMimeTypes).length
const referenceotherMimeTypesEntryCount = Object.keys(referenceOtherMimeTypes).length

test('mime instance returns same values as reference implementation (standard DB)', (t) => {
  t.truthy(
    standardMimeTypeseEntryCount >= referenceStandardMimeTypesEntryCount,
    'mime instance contains at least as many entries as reference implementation',
  )

  mime.resetTypes()
  mime.loadMimeTypes(standardMimeTypes)

  const incorrectSet = new Set<string>()
  const updatedSet = new Set<string>()
  let matchCount = 0

  for (const [type, entry] of Object.entries(mimedb)) {
    if (!entry.extensions) continue

    for (const extension of entry.extensions) {
      const referenceResult = referenceMimeLite.getType(extension)
      const newResult = mime.getType(extension)
      if (referenceResult === newResult) {
        matchCount += 1
      } else if (referenceResult === null) {
        updatedSet.add(extension)
      } else {
        incorrectSet.add(extension)
      }
    }
  }

  console.log(
    'reference (standardDB) implementation has',
    referenceStandardMimeTypesEntryCount,
    'entries',
  )
  console.log('local (standardDB) implementation has', standardMimeTypeseEntryCount, 'entries')
  console.log('Matched (standardDB) extension count is', matchCount)

  if (incorrectSet.size > 0) {
    t.fail('Non matching extensions found:')
    for (const errorEntry of incorrectSet.values()) {
      console.log(
        errorEntry,
        'mime result:',
        mime.getType(errorEntry),
        'reference mime result:',
        referenceMimeLite.getType(errorEntry),
      )
    }
  }

  if (updatedSet.size > 0)
    console.log('Note: mime instance includes additional types compared to reference')
  for (const updatedEntry of updatedSet.values()) {
    console.log(
      updatedEntry,
      'mime result:',
      mime.getType(updatedEntry),
      'reference mime result:',
      referenceMimeLite.getType(updatedEntry),
    )
  }

  t.pass()
})
