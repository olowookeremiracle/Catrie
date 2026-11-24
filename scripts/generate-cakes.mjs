/**
 * Generate editorial cake photography with Pollinations/FLUX.
 *
 *   node scripts/generate-cakes.mjs [cakeKey ...]
 *
 * For each cake it generates four distinct views (hero, overhead, detail,
 * lower angle), crops off the service watermark, and writes:
 *   public/images/cakes/<key>/1..4.webp   960×1200, ≤115 KB
 *   public/images/cakes/<key>/cover.webp  640×800,  ≤58 KB
 * plus a preview strip at public/images/_gen/<key>/preview.png.
 *
 * Resumable: existing webp files are skipped unless --force is passed.
 */
import sharp from 'sharp'
import { mkdirSync, writeFileSync, existsSync, readFileSync } from 'node:fs'
import { join, resolve } from 'node:path'

const ROOT = resolve(import.meta.dirname, '..')

function localKey() {
  try {
    const text = readFileSync(join(ROOT, '.env.local'), 'utf8')
    const line = text.split(/\r?\n/).find((l) => l.startsWith('POLLINATIONS_KEY='))
    return line ? line.slice('POLLINATIONS_KEY='.length).trim() : ''
  } catch {
    return ''
  }
}

const KEY = process.env.POLLINATIONS_KEY || localKey()
const RAW = join(ROOT, 'public', 'images', '_gen')
const OUT = join(ROOT, 'public', 'images', 'cakes')
const FORCE = process.argv.includes('--force')

const CAKES = [
  {
    key: 'anniversary-layer',
    noun: 'cake',
    subject:
      'a three-tier celebration cake with smooth cream buttercream, delicate gold leaf accents and fresh cream roses',
  },
  {
    key: 'chocolate-midnight',
    noun: 'cake',
    subject:
      'a three-tier dark chocolate cake with a glossy ganache drip, scattered chocolate curls and a deep cocoa finish',
  },
  {
    key: 'graduation-arch',
    noun: 'cake',
    subject:
      'a single tier graduation celebration cake with smooth vanilla buttercream, a neat border of piped pearls and a simple arched cake topper in muted gold',
  },
  {
    key: 'lemon-poppy-seed',
    noun: 'cake',
    subject:
      'a round lemon and poppy seed cake finished with a thin white glaze, dusted with poppy seeds and curled lemon zest',
  },
  {
    key: 'two-tier-blush',
    noun: 'cake',
    subject:
      'a two tier blush pink wedding cake with fine piped ruffle detail and small fresh cream and pink flowers',
  },
  {
    key: 'three-tier-ivory',
    noun: 'cake',
    subject:
      'a classic three tier ivory wedding cake with smooth buttercream and a subtle lace pattern',
  },
  {
    key: 'rustic-forest',
    noun: 'cake',
    subject:
      'a two tier half naked wedding cake with exposed sponge layers, fresh berries, small edible flowers and a light cocoa dusting',
  },
  {
    key: 'vanilla-bean-dozen',
    noun: 'cupcakes',
    subject:
      'a tray of vanilla bean cupcakes with soft buttercream swirls, a few vanilla pods resting beside them',
  },
  {
    key: 'assorted-flavour-box',
    noun: 'cupcakes',
    subject:
      'a mixed box of decorated cupcakes in vanilla, chocolate, lemon and raspberry, neatly arranged together',
  },
  {
    key: 'chocolate-truffle-triptych',
    noun: 'cupcakes',
    subject:
      'chocolate truffle cupcakes with a glossy ganache top and delicate chocolate shavings',
  },
  {
    key: 'strawberry-drip-mini',
    noun: 'cake',
    subject:
      'a small round strawberry drip cake with a pink glaze drip and fresh whole strawberries on top',
  },
  {
    key: 'the-sketch',
    noun: 'cake',
    subject:
      'a modern hand painted buttercream cake with soft abstract brush strokes in warm cream and muted orange',
  },
  {
    key: 'the-monogram',
    noun: 'cake',
    subject:
      'an elegant minimal ivory cake with fine gold leaf accents and clean buttercream edges',
  },
  {
    key: 'the-heirloom',
    noun: 'cake',
    subject:
      'a sculptural modern celebration cake with textured buttercream ridges and dried flowers',
  },
  {
    key: 'the-first-issue',
    noun: 'cake',
    subject:
      'a bold modern statement cake with clean colour block buttercream panels in cream, muted orange and dark chocolate',
  },
  {
    key: 'the-garden',
    noun: 'cake',
    subject:
      'a celebration cake dressed with fresh garden flowers, soft greenery and a natural rustic finish',
  },
]

const STYLE =
  'professional editorial food photography, on a cream ceramic cake stand, warm cream and beige background, soft natural window light from the left, shallow depth of field, premium bakery, photorealistic, vertical 4:5 composition, no text, no lettering, no people, no hands, no watermarks'

const VIEWS = [
  (c) => `front three-quarter view of ${c.subject}, entire ${c.noun} centred, ${STYLE}`,
  (c) => `overhead top-down view of ${c.subject}, styled flat lay, ${STYLE}`,
  (c) => `close-up detail of the texture and decoration on ${c.subject}, macro food photography, ${STYLE}`,
  (c) => `lower side angle of ${c.subject} showing height and the cake stand, ${STYLE}`,
]

const sleep = (ms) => new Promise((r) => setTimeout(r, ms))

/**
 * writeFileSync that tolerates Windows file locks on the served directory.
 * Retries a few times when the file is transiently unavailable.
 */
async function safeWrite(file, data) {
  for (let i = 0; i < 10; i += 1) {
    try {
      writeFileSync(file, data)
      return
    } catch (e) {
      if (i === 9 || !['UNKNOWN', 'EBUSY', 'EACCES', 'EPERM'].includes(e.code)) throw e
      await sleep(1_500 * (i + 1))
    }
  }
}

function seedFor(key, view) {
  let h = 2166136261
  const s = `${key}:${view}`
  for (let i = 0; i < s.length; i += 1) {
    h ^= s.charCodeAt(i)
    h = Math.imul(h, 16777619)
  }
  return Math.abs(h) % 2147483647
}

/**
 * Pollinations rate-limits free/keyed requests at 1 image per 45s per IP.
 * A simple in-process queue keeps everything under that.
 */
const queue = []
let running = false
let lastGen = 0

function pump() {
  if (running || queue.length === 0) return
  running = true
  ;(async () => {
    while (queue.length > 0) {
      const job = queue.shift()
      const wait = Math.max(0, lastGen + 45_000 - Date.now())
      if (wait > 0) await sleep(wait)
      lastGen = Date.now()
      console.log(`  · generating ${job.label}…`)
      await job.run()
    }
    running = false
  })()
}

function queueJob(label, run) {
  queue.push({ label, run })
  pump()
}

async function generateTo(prompt, seed, outPath, label) {
  queueJob(label, async () => {
    const url =
      `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}` +
      `?width=1280&height=1600&model=flux&seed=${seed}&nologo=true&private=true&token=${encodeURIComponent(KEY)}`
    // The free tier caps us at 1 image / 45s. Retry with a long backoff until it lands.
    for (let attempt = 1; attempt <= 12; attempt += 1) {
      try {
        const res = await fetch(url, {
          headers: { 'User-Agent': 'Catrie-demo/1.0' },
          signal: AbortSignal.timeout(240_000),
        })
        if (res.ok && (res.headers.get('content-type') || '').startsWith('image/')) {
          await safeWrite(outPath, Buffer.from(await res.arrayBuffer()))
          return
        }
        const body = (await res.text()).slice(0, 160)
        console.log(`    ${label}: attempt ${attempt} -> ${res.status} ${body}`)
      } catch (e) {
        console.log(`    ${label}: attempt ${attempt} error ${e.message}`)
      }
      // Wait for the 45s free-tier window to reset (plus buffer).
      await sleep(47_000)
    }
    throw new Error(`generation failed for ${label}`)
  })
}

async function toWebp(buf, width, height, budgetKB, startQ) {
  // Crop away the bottom-right service watermark, then fit the 4:5 frame.
  const meta = await sharp(buf).metadata()
  const w = meta.width || 1280
  const h = meta.height || 1600
  const safe = await sharp(buf)
    .extract({
      left: 0,
      top: 0,
      width: Math.max(1, w - Math.round(w * 0.14)),
      height: Math.max(1, h - Math.round(h * 0.055)),
    })
    .toBuffer()

  let q = startQ
  let out = await sharp(safe)
    .resize({ width, height, fit: 'cover', position: sharp.strategy.attention })
    .webp({ quality: q, effort: 6 })
    .toBuffer()
  while (out.length / 1024 > budgetKB && q > 30) {
    q -= 6
    out = await sharp(safe)
      .resize({ width, height, fit: 'cover', position: sharp.strategy.attention })
      .webp({ quality: q, effort: 6 })
      .toBuffer()
  }
  return { buf: out, q, kb: out.length / 1024 }
}

const wanted = process.argv.slice(2).filter((a) => !a.startsWith('--'))
const list = wanted.length ? CAKES.filter((c) => wanted.includes(c.key)) : CAKES

if (!KEY) {
  console.error('No POLLINATIONS_KEY set (env or .env.local). Aborting before touching any files.')
  process.exit(1)
}

for (const cake of list) {
  const outDir = join(OUT, cake.key)
  const rawDir = join(RAW, cake.key)

  const done = [1, 2, 3, 4].every((n) => existsSync(join(outDir, `${n}.webp`)))
  if (done && !FORCE) {
    console.log(`✓ ${cake.key} — already generated, skipping`)
    continue
  }

  // Only create folders once we are actually going to generate something new.
  mkdirSync(outDir, { recursive: true })
  mkdirSync(rawDir, { recursive: true })

  console.log(`\n▶ ${cake.key}`)

  const pending = []
  for (let i = 0; i < 4; i += 1) {
    const n = i + 1
    const rawFile = join(rawDir, `${n}.jpg`)
    if (existsSync(rawFile) && existsSync(join(outDir, `${n}.webp`)) && !FORCE) continue
    const prompt = VIEWS[i](cake)
    pending.push(n)
    generateTo(prompt, seedFor(cake.key, n), rawFile, `${cake.key} view ${n}`)
  }

  if (pending.length > 0) {
    // Wait for the queued generations of this cake to finish.
    await new Promise((resolveAll) => {
      const check = () => {
        const remaining = pending.filter((n) => !existsSync(join(rawDir, `${n}.jpg`)))
        if (remaining.length === 0) return resolveAll()
        setTimeout(check, 2_000)
      }
      check()
    })
  }

  const missing = pending.filter((n) => !existsSync(join(rawDir, `${n}.jpg`)))
  if (missing.length > 0) {
    console.warn(`  missing views for ${cake.key}: ${missing.join(', ')} — skipping this cake, re-run later`)
    continue
  }

  const report = []
  for (let n = 1; n <= 4; n += 1) {
    const raw = readFileSync(join(rawDir, `${n}.jpg`))
    const { buf, q, kb } = await toWebp(raw, 960, 1200, 115, 82)
    await safeWrite(join(outDir, `${n}.webp`), buf)
    report.push({ photo: n, kb: `${kb.toFixed(0)}KB`, q })
    if (n === 1) {
      const cover = await toWebp(raw, 640, 800, 58, 80)
      await safeWrite(join(outDir, 'cover.webp'), cover.buf)
      report[report.length - 1].cover = `${cover.kb.toFixed(0)}KB q${cover.q}`
    }
  }

  const TILE_W = 260
  const TILE_H = 325
  const PAD = 12
  await sharp({
    create: { width: 4 * TILE_W + 5 * PAD, height: TILE_H + 2 * PAD, channels: 3, background: '#fff7ec' },
  })
    .composite(
      await Promise.all(
        [1, 2, 3, 4].map(async (n, i) => ({
          input: await sharp(join(outDir, `${n}.webp`))
            .resize(TILE_W, TILE_H, { fit: 'cover' })
            .toBuffer(),
          left: PAD + i * (TILE_W + PAD),
          top: PAD,
        })),
      ),
    )
    .png()
    .toFile(join(rawDir, 'preview.png'))

  console.table(report)
  console.log(`  preview: public/images/_gen/${cake.key}/preview.png`)
}

console.log('\nDone.')
process.exit(0)
