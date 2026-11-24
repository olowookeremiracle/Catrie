import { copyFileSync, mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { join, resolve } from 'node:path'

const SRC = resolve('brand/fonts')
const OUT = resolve('public/fonts')
const NEEDED = new Set(['Fraunces', 'Poppins'])

const css = readFileSync(join(SRC, 'fonts.css'), 'utf8')
const blocks = css.split('}').map((block) => block.trim()).filter(Boolean)

rmSync(OUT, { recursive: true, force: true })
mkdirSync(OUT, { recursive: true })

const kept = []

for (const block of blocks) {
  const family = block.match(/font-family:\s*'([^']+)'/)?.[1]
  if (!family || !NEEDED.has(family)) continue
  // Latin only — the site copy is English.
  if (!/U\+0000-00FF/.test(block)) continue

  const url = block.match(/url\((\.\/[^)]+)\)/)?.[1]
  if (!url) continue

  const file = url.replace('./', '')
  copyFileSync(join(SRC, file), join(OUT, file))
  kept.push(`${block}}`)
}

writeFileSync(join(OUT, 'fonts.css'), `${kept.join('\n\n')}\n`)
console.log(`prepared ${kept.length} @font-face rules in public/fonts`)
