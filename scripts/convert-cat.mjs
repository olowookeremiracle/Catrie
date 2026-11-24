/**
 * Convert the category background images (public/images/cat/*.jpg) into
 * compressed WebP files under public/images/cat-webp/.
 *
 *   node scripts/convert-cat.mjs
 *
 * Budget: ~80 KB per image, 1200×800 (3:2) — enough for the category card
 * backgrounds at 2× retina without bloating the catalog page.
 */
import sharp from 'sharp'
import { readdirSync, writeFileSync, mkdirSync, statSync } from 'node:fs'
import { join, resolve } from 'node:path'

const ROOT = resolve(import.meta.dirname, '..')
const SRC = join(ROOT, 'public', 'images', 'cat')
const OUT = join(ROOT, 'public', 'images', 'cat-webp')
mkdirSync(OUT, { recursive: true })

const BUDGET_KB = 80
const DIMS = { width: 1200, height: 800 }

async function convert(file) {
  const srcPath = join(SRC, file)
  let q = 80
  let buf = await sharp(srcPath)
    .resize({ ...DIMS, fit: 'cover', position: 'centre' })
    .webp({ quality: q, effort: 6 })
    .toBuffer()
  while (buf.length / 1024 > BUDGET_KB && q > 30) {
    q -= 6
    buf = await sharp(srcPath)
      .resize({ ...DIMS, fit: 'cover', position: 'centre' })
      .webp({ quality: q, effort: 6 })
      .toBuffer()
  }
  const outName = file.replace(/\.(jpe?g|png|webp|avif)$/i, '.webp')
  writeFileSync(join(OUT, outName), buf)
  const meta = await sharp(srcPath).metadata()
  return { file, originalKB: statSync(srcPath).size / 1024, outKB: buf.length / 1024, q, w: meta.width, h: meta.height }
}

const files = readdirSync(SRC).filter((f) => /\.(jpe?g|png|webp|avif)$/i.test(f))
const report = []
for (const file of files) {
  report.push(await convert(file))
}
console.table(report)
console.log(`Wrote ${report.length} WebP files to public/images/cat-webp/`)
process.exit(0)
