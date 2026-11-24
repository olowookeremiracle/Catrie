/**
 * Review the 4-photo preview for a finished cake.
 *
 *   node scripts/review-cake.mjs <cakeKey>
 *
 * Writes public/images/_gen/<key>/review.json with a "pass"/"flag" verdict and
 * notes, so you can see at a glance which cakes need re-generating.
 */
import { existsSync, readFileSync, writeFileSync } from 'node:fs'
import { join, resolve } from 'node:path'

const key = process.argv[2]
if (!key) {
  console.error('usage: node scripts/review-cake.mjs <cakeKey>')
  process.exit(1)
}

const ROOT = resolve(import.meta.dirname, '..')
const dir = join(ROOT, 'public', 'images', '_gen', key)
const preview = join(dir, 'preview.png')
if (!existsSync(preview)) {
  console.error(`no preview yet for ${key} — run generate-cakes.mjs first`)
  process.exit(1)
}

// Minimal prompt; the deepseek-vision MCP tool reads this file.
const prompt = `This is a 4-photo gallery (positions 1-4, left to right) for one cake on a premium bakery website. For each position: is the image a clean, appetising, plausible product photo (no obvious AI artifacts, no visible text or people, consistent lighting)? Reply with a one-line verdict per position, then JSON {"pass": true|false, "flagged": [positions], "notes": "..."}`

const out = {
  key,
  prompt,
  preview: 'public/images/_gen/' + key + '/preview.png',
  verdict: null,
  reviewedAt: new Date().toISOString(),
}

writeFileSync(join(dir, 'review.json'), JSON.stringify(out, null, 2))
console.log(`Wrote ${join(dir, 'review.json')} — pass it to the vision tool and update "verdict".`)
console.log('PROMPT:', prompt)
process.exit(0)
