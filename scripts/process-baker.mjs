/**
 * Crop + compress the baker portrait (public/images/baker.jpg) into a 3:5 WebP
 * under public/images/baker.webp, centered on the subject.
 *
 *   node scripts/process-baker.mjs
 */
import sharp from 'sharp'
import { statSync } from 'node:fs'
import { join, resolve } from 'node:path'

const ROOT = resolve(import.meta.dirname, '..')
const SRC = join(ROOT, 'public', 'images', 'baker.jpg')
const OUT = join(ROOT, 'public', 'images', 'baker.webp')

// 3:5 portrait. 750×1250 is plenty for the About two-column layout.
const WIDTH = 750
const HEIGHT = 1250

let q = 82
let buf = await sharp(SRC)
  .resize({ width: WIDTH, height: HEIGHT, fit: 'cover', position: sharp.strategy.attention })
  .webp({ quality: q, effort: 6 })
  .toBuffer()

const BUDGET_KB = 90
while (buf.length / 1024 > BUDGET_KB && q > 30) {
  q -= 6
  buf = await sharp(SRC)
    .resize({ width: WIDTH, height: HEIGHT, fit: 'cover', position: sharp.strategy.attention })
    .webp({ quality: q, effort: 6 })
    .toBuffer()
}

const { writeFileSync } = await import('node:fs')
writeFileSync(OUT, buf)
console.log(`Wrote ${OUT}`)
console.log(`  source: ${(statSync(SRC).size / 1024).toFixed(0)}KB -> webp ${(buf.length / 1024).toFixed(0)}KB (q${q})`)
process.exit(0)
