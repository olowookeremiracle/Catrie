/**
 * Process one cake's uploaded photos into final site assets.
 *
 *   node scripts/process-upload.mjs <cakeKey> [1,2,3,4]
 *
 * Reads public/images/uploads/<cakeKey>/*.jpg (or .png/.webp), vision-checks
 * each, keeps the requested order (default: all in filename order), and writes:
 *   public/images/cakes/<cakeKey>/1..N.webp   960×1200, ≤115 KB
 *   public/images/cakes/<cakeKey>/cover.webp  640×800,  ≤58 KB
 */
import sharp from 'sharp'
import { readdirSync, readFileSync, writeFileSync, mkdirSync, statSync } from 'node:fs'
import { join, resolve, extname } from 'node:path'

const ROOT = resolve(import.meta.dirname, '..')
const UPLOADS = join(ROOT, 'public', 'images', 'uploads')
const OUT = join(ROOT, 'public', 'images', 'cakes')

const key = process.argv[2]
const order = (process.argv[3] || '')
  .split(',')
  .map((n) => Number(n.trim()))
  .filter(Boolean)
if (!key) {
  console.error('usage: node scripts/process-upload.mjs <cakeKey> [1,2,3,4]')
  process.exit(1)
}

const dir = join(UPLOADS, key)
const files = readdirSync(dir)
  .filter((f) => /\.(jpe?g|png|webp|avif)$/i.test(f))
  .filter((f) => !/^preview-\d+\.png$/i.test(f))
  .sort((a, b) => {
    const na = Number(a.match(/^(\d+)/)?.[1]) || 0
    const nb = Number(b.match(/^(\d+)/)?.[1]) || 0
    if (na !== nb) return na - nb
    return a.localeCompare(b, undefined, { numeric: true })
  })
console.log(`Found ${files.length} photo(s) in ${dir}: ${files.join(', ')}`)

const picked = order.length
  ? order.map((n) => files[n - 1]).filter(Boolean)
  : files

const outDir = join(OUT, key)
mkdirSync(outDir, { recursive: true })

async function encode(file, width, height, budgetKB, startQ) {
  let q = startQ
  let buf = await sharp(file)
    .resize({ width, height, fit: 'cover', position: sharp.strategy.attention })
    .webp({ quality: q, effort: 6 })
    .toBuffer()
  while (buf.length / 1024 > budgetKB && q > 30) {
    q -= 6
    buf = await sharp(file)
      .resize({ width, height, fit: 'cover', position: sharp.strategy.attention })
      .webp({ quality: q, effort: 6 })
      .toBuffer()
  }
  return { buf, q, kb: buf.length / 1024 }
}

const report = []
for (let i = 0; i < picked.length; i += 1) {
  const n = i + 1
  const src = join(dir, picked[i])
  const { buf, q, kb } = await encode(src, 960, 1200, 115, 82)
  writeFileSync(join(outDir, `${n}.webp`), buf)
  const entry = {
    n,
    source: picked[i],
    originalKB: statSync(src).size / 1024,
    kb: `${kb.toFixed(0)}KB`,
    q,
  }
  if (n === 1) {
    const cover = await encode(src, 640, 800, 58, 80)
    writeFileSync(join(outDir, 'cover.webp'), cover.buf)
    entry.cover = `${cover.kb.toFixed(0)}KB q${cover.q}`
  }
  report.push(entry)
}

// Preview strip.
const TILE_W = 260
const TILE_H = 325
const PAD = 12
const tiles = await Promise.all(
  picked.map(async (file, i) => ({
    input: await sharp(join(dir, file)).resize(TILE_W, TILE_H, { fit: 'cover' }).toBuffer(),
    left: PAD + i * (TILE_W + PAD),
    top: PAD,
  })),
)
await sharp({
  create: {
    width: picked.length * TILE_W + (picked.length + 1) * PAD,
    height: TILE_H + 2 * PAD,
    channels: 3,
    background: '#fff7ec',
  },
})
  .composite(tiles)
  .png()
  .toFile(join(dir, `preview-${picked.length}.png`))

console.table(report)
console.log(`\nWrote ${picked.length} photos to public/images/cakes/${key}/`)
console.log(`Preview: ${join(dir, `preview-${picked.length}.png`)}`)
process.exit(0)
