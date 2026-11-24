/**
 * Add one uploaded photo to the end of an existing cake gallery.
 *
 *   node scripts/add-photo.mjs <cakeKey> <uploadFileName>
 *
 * Appends the photo as the next number (N+1) in public/images/cakes/<key>/,
 * writes the final 960×1200 webp, and updates the preview strip.
 */
import sharp from 'sharp'
import { readdirSync, writeFileSync, statSync } from 'node:fs'
import { join, resolve } from 'node:path'

const ROOT = resolve(import.meta.dirname, '..')
const UPLOADS = join(ROOT, 'public', 'images', 'uploads')
const OUT = join(ROOT, 'public', 'images', 'cakes')

const key = process.argv[2]
const uploadFile = process.argv[3]
if (!key || !uploadFile) {
  console.error('usage: node scripts/add-photo.mjs <cakeKey> <uploadFileName>')
  process.exit(1)
}

const src = join(UPLOADS, key, uploadFile)
const outDir = join(OUT, key)
const existing = readdirSync(outDir)
  .filter((f) => /^\d+\.webp$/.test(f))
  .map((f) => Number(f.replace('.webp', '')))
  .filter(Boolean)
const nextN = existing.length ? Math.max(...existing) + 1 : 1

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

const { buf, q, kb } = await encode(src, 960, 1200, 115, 82)
writeFileSync(join(outDir, `${nextN}.webp`), buf)
console.log(`Added photo ${nextN} to ${key}: ${uploadFile} -> ${nextN}.webp (${kb.toFixed(0)}KB q${q})`)

// Rebuild the preview strip.
const all = readdirSync(outDir).filter((f) => /^\d+\.webp$/.test(f)).sort((a, b) => Number(a.replace('.webp', '')) - Number(b.replace('.webp', '')))
const TILE_W = 260
const TILE_H = 325
const PAD = 12
const tiles = await Promise.all(
  all.map(async (f, i) => ({
    input: await sharp(join(outDir, f)).resize(TILE_W, TILE_H, { fit: 'cover' }).toBuffer(),
    left: PAD + i * (TILE_W + PAD),
    top: PAD,
  })),
)
await sharp({
  create: { width: all.length * TILE_W + (all.length + 1) * PAD, height: TILE_H + 2 * PAD, channels: 3, background: '#fff7ec' },
})
  .composite(tiles)
  .png()
  .toFile(join(UPLOADS, key, `preview-${all.length}.png`))
console.log(`Preview: ${join(UPLOADS, key, `preview-${all.length}.png`)}`)
process.exit(0)
