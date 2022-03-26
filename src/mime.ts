import standardMimeTypes from './standardMimeTypes'
import otherMimeTypes from './otherMimeTypes'

interface MimeChecker {
  getType: (path: any) => string | null
  loadMimeTypes: (mimeTypes?: MimeTypes) => void
  resetTypes: () => void
}

interface MimeTypes {
  [key: string]: string[]
}

let types: Map<string, string> = new Map()

const resetTypes = (): void => {
  types.clear()
}

const loadMimeTypes = (mimeTypes?: MimeTypes): void => {
  mimeTypes = mimeTypes || Object.assign(standardMimeTypes, otherMimeTypes)

  for (let type in mimeTypes) {
    let typeExtensions = mimeTypes[type].map((t) => t.toLowerCase())
    type = type.toLowerCase()

    for (let i = 0; i < typeExtensions.length; i++) {
      let ext = typeExtensions[i]

      // '*' prefix = not the preferred type for this extension.  So fixup the extension, and skip it.
      if (ext[0] === '*') continue

      if (types.has(ext)) {
        throw new Error(
          'Attempt to change mapping for "' +
            ext +
            '" extension from "' +
            types.get(ext) +
            '" to "' +
            type +
            '". Pass `force=true` to allow this, otherwise remove "' +
            ext +
            '" from the list of extensions for "' +
            type +
            '".',
        )
      }

      types.set(ext, type)
    }
  }
}

const getType = (path: any): string | null => {
  path = String(path)
  let last = path.replace(/^.*[/\\]/, '').toLowerCase()
  let ext = last.replace(/^.*\./, '').toLowerCase()

  let hasPath = last.length < path.length
  let hasDot = ext.length < last.length - 1

  return ((hasDot || !hasPath) && types.get(ext)) || null
}

export const mime: MimeChecker = {
  getType,
  loadMimeTypes,
  resetTypes,
}
