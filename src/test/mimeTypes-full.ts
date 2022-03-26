import test from 'ava'
import { mime } from '../mime'
import * as referenceMime from 'mime'
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

test('mime instance returns same values as reference implementation (full DB)', (t) => {
  t.truthy(
    standardMimeTypeseEntryCount + otherMimeTypesEntryCount >=
      referenceStandardMimeTypesEntryCount + referenceotherMimeTypesEntryCount,
    'mime instance contains at least as many entries as reference implementation',
  )

  mime.loadMimeTypes()

  const incorrectSet = new Set<string>()
  const updatedSet = new Set<string>()
  let matchCount = 0

  for (const [type, entry] of Object.entries(mimedb)) {
    if (!entry.extensions) continue

    for (const extension of entry.extensions) {
      const referenceResult = referenceMime.getType(extension)
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
    'reference (fullDB) implementation has',
    referenceStandardMimeTypesEntryCount + referenceotherMimeTypesEntryCount,
    'entries',
  )
  console.log(
    'local (fullDB) implementation has',
    standardMimeTypeseEntryCount + otherMimeTypesEntryCount,
    'entries',
  )
  console.log('Matched (fullDB) extension count is', matchCount)

  if (incorrectSet.size > 0) {
    t.fail('Non matching extensions found:')
    for (const errorEntry of incorrectSet.values()) {
      console.log(
        errorEntry,
        'mime result:',
        mime.getType(errorEntry),
        'reference mime result:',
        referenceMime.getType(errorEntry),
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
      referenceMime.getType(updatedEntry),
    )
  }

  t.pass()
})
