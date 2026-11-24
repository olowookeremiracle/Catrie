/**
 * Builds outlined brand SVGs from the Kaushan Script TTF.
 * Font is never shipped — only the resulting paths.
 *
 *   node scripts/build-logo.mjs
 */
import { copyFileSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, join, resolve } from 'node:path'
import opentype from 'opentype.js'

const FONT = resolve('brand/fonts/KaushanScript-Regular.ttf')
const BRAND = resolve('brand')
const PUBLIC = resolve('public')

const COLORS = {
  cream: '#FFF7EC',
  orange: '#E86A17',
  chocolate: '#3B2415',
  line: '#E6D8C4',
}

const buffer = readFileSync(FONT)
const font = opentype.parse(
  buffer.buffer.slice(buffer.byteOffset, buffer.byteOffset + buffer.byteLength),
)

const round = (value, precision = 1) => {
  const factor = 10 ** precision
  return Math.round(value * factor) / factor
}

const unionBox = (boxes) =>
  boxes.reduce(
    (acc, box) => ({
      x1: Math.min(acc.x1, box.x1),
      y1: Math.min(acc.y1, box.y1),
      x2: Math.max(acc.x2, box.x2),
      y2: Math.max(acc.y2, box.y2),
    }),
    { x1: Infinity, y1: Infinity, x2: -Infinity, y2: -Infinity },
  )

const padBox = (box, pad) => ({
  x1: box.x1 - pad,
  y1: box.y1 - pad,
  x2: box.x2 + pad,
  y2: box.y2 + pad,
})

const svgDoc = ({ width, height, viewBox, body, label }) =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${viewBox}" width="${width}" height="${height}" role="img" aria-label="${label}">
${body}
</svg>
`

const write = (relativePath, contents) => {
  const target = join(BRAND, relativePath)
  mkdirSync(dirname(target), { recursive: true })
  writeFileSync(target, contents)
  console.log(
    `  ${relativePath.padEnd(28)} ${(Buffer.byteLength(contents) / 1024).toFixed(1)} KB`,
  )
}

/* -------------------------------------------------------------------------- */
/* Wordmark                                                                    */
/* -------------------------------------------------------------------------- */

const WORD_SIZE = 160
const WORD_PAD = 10

function buildWordmark(trieFill) {
  const caAdvance = font.getAdvanceWidth('Ca', WORD_SIZE)

  const caPath = font.getPath('Ca', 0, 0, WORD_SIZE)
  const triePath = font.getPath('trie', caAdvance, 0, WORD_SIZE)

  const box = padBox(
    unionBox([caPath.getBoundingBox(), triePath.getBoundingBox()]),
    WORD_PAD,
  )

  const width = round(box.x2 - box.x1)
  const height = round(box.y2 - box.y1)
  const tx = round(-box.x1)
  const ty = round(-box.y1)

  const body = `  <g transform="translate(${tx} ${ty})">
    <path fill="${COLORS.orange}" d="${caPath.toPathData(1)}" />
    <path fill="${trieFill}" d="${triePath.toPathData(1)}" />
  </g>`

  return svgDoc({
    width,
    height,
    viewBox: `0 0 ${width} ${height}`,
    body,
    label: 'Catrie',
  })
}

/* -------------------------------------------------------------------------- */
/* Mark                                                                        */
/* -------------------------------------------------------------------------- */

const MARK_SIZE = 512
const MARK_RADIUS = 133

function buildMark({ background, letter, ring = false }) {
  const letterPath = font.getPath('C', 0, 0, 368)
  const box = letterPath.getBoundingBox()

  const tx = round(MARK_SIZE / 2 - (box.x1 + box.x2) / 2)
  const ty = round(MARK_SIZE / 2 - (box.y1 + box.y2) / 2)

  const rect = ring
    ? `<rect width="${MARK_SIZE}" height="${MARK_SIZE}" rx="${MARK_RADIUS}" fill="${background}" stroke="${COLORS.line}" stroke-width="8" />`
    : `<rect width="${MARK_SIZE}" height="${MARK_SIZE}" rx="${MARK_RADIUS}" fill="${background}" />`

  const body = `  ${rect}
  <g transform="translate(${tx} ${ty})">
    <path fill="${letter}" d="${letterPath.toPathData(1)}" />
  </g>`

  return svgDoc({
    width: MARK_SIZE,
    height: MARK_SIZE,
    viewBox: `0 0 ${MARK_SIZE} ${MARK_SIZE}`,
    body,
    label: 'Catrie',
  })
}

/* -------------------------------------------------------------------------- */

console.log('Building outlined brand assets from Kaushan Script:')

write('catrie-logo.svg', buildWordmark(COLORS.chocolate))
write('catrie-logo-dark.svg', buildWordmark(COLORS.cream))
write('catrie-mark.svg', buildMark({ background: COLORS.orange, letter: COLORS.cream }))
write(
  'catrie-mark-reverse.svg',
  buildMark({ background: COLORS.cream, letter: COLORS.orange, ring: true }),
)

const mark = readFileSync(join(BRAND, 'catrie-mark.svg'), 'utf8')
writeFileSync(join(PUBLIC, 'favicon.svg'), mark)
console.log(`  public/favicon.svg`.padEnd(31) + `${(Buffer.byteLength(mark) / 1024).toFixed(1)} KB`)

mkdirSync(join(PUBLIC, 'brand'), { recursive: true })
for (const file of [
  'catrie-logo.svg',
  'catrie-logo-dark.svg',
  'catrie-mark.svg',
  'catrie-mark-reverse.svg',
]) {
  const contents = readFileSync(join(BRAND, file), 'utf8')
  writeFileSync(join(PUBLIC, 'brand', file), contents)
  console.log(`  public/brand/${file}`.padEnd(31) + `${(Buffer.byteLength(contents) / 1024).toFixed(1)} KB`)
}

console.log('Done.')
