const MIME_RE = /^([^/]+)\/([^;]+)/

// Score RFC facets (see https://tools.ietf.org/html/rfc6838#section-3)
const FACET_SCORES: Record<string, number> = {
  'prs.': 100,
  'x-': 200,
  'x.': 300,
  'vnd.': 400,
  default: 900,
}

// Score mime source (Logic originally from `jshttp/mime-types` module)
const SOURCE_SCORES: Record<string, number> = {
  nginx: 10,
  apache: 20,
  iana: 40,
  default: 30, // definitions added by `jsttp/mime-db` project?
}

const TYPE_SCORES: Record<string, number> = {
  // prefer application/xml over text/xml
  // prefer application/rtf over text/rtf
  application: 1,

  // prefer font/woff over application/font-woff
  font: 2,

  default: 0,
}

/**
 * Get each component of the score for a mime type.  The sum of these is the
 * total score.  The higher the score, the more "official" the type.
 *
 * @param {String} mimeType The mime type. E.g. "image/bmp"
 * @param {String} [source] Organization that defines the type
 *
 * @return {MimeScore}
 */
const breakdown = function (mimeType: string, source: string | undefined): number {
  const matches = mimeType.match(MIME_RE)

  if (!matches) return 0

  const type = matches[1]
  const subtype = matches[2]
  const facetMatch = subtype.match(/^([a-z]+\.|x-)/)
  const facet = (facetMatch && facetMatch[0]) || undefined

  const facetScore = facet ? FACET_SCORES[facet] || FACET_SCORES.default : FACET_SCORES.default // RFC facet score (sets 100's digit)
  const sourceScore = source
    ? SOURCE_SCORES[source] || SOURCE_SCORES.default
    : SOURCE_SCORES.default // source score (sets 10's digit)
  const typeScore = TYPE_SCORES[type] || TYPE_SCORES.default // RFC type (sets 1's digit)

  // All other things being equal, prefer shorter types
  const lengthScore = 1 - mimeType.length / 100 // Length score (sets fraction, shorter = higher score)

  return facetScore + sourceScore + typeScore + lengthScore
}

export default breakdown
