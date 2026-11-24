/**
 * Composes a 1200x630 OG image (SVG) from the brand wordmark paths.
 * Ships to public/og-image.svg. Run: node scripts/build-og.mjs
 */
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs'
import { resolve } from 'node:path'

const ROOT = resolve('.')
const LOGO = resolve('brand/catrie-logo.svg')

// Extract the two wordmark paths (Ca + trie) from the logo SVG.
const logoSvg = readFileSync(LOGO, 'utf8')
const pathRe = /<path fill="(#[0-9A-Fa-f]{6})" d="([^"]+)"/g
const paths = []
let m
while ((m = pathRe.exec(logoSvg))) {
  paths.push({ fill: m[1], d: m[2] })
}
if (paths.length < 2) {
  console.error('Could not extract wordmark paths from logo SVG')
  process.exit(1)
}

// The logo viewBox is "0 0 400.5 150.6" with a translate(-12.7 128.1).
// We reuse that inner group, scaled up for the OG canvas.
const innerGroup = logoSvg.match(/<g[^>]*>[\s\S]*?<\/g>/)?.[0]
if (!innerGroup) throw new Error('no <g> found in logo')

// Scale the 400.5-wide wordmark to fit ~560px wide, centered.
const scale = 560 / 400.5
const targetW = 400.5 * scale
const targetH = 150.6 * scale
const cx = (1200 - targetW) / 2
// Vertically place the wordmark a bit above center
const cy = 315 - targetH / 2

const ogSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="#FFF7EC"/>
  <g opacity="0.5" stroke="#7C8A6B" stroke-width="1.5" fill="none" transform="translate(930 300)" opacity="0.14">
    <circle cx="0" cy="0" r="140"/>
    <circle cx="0" cy="0" r="180"/>
  </g>
  <g transform="translate(${cx.toFixed(1)} ${cy.toFixed(1)}) scale(${scale.toFixed(3)})">
    <g transform="translate(-12.7 128.1)">
      ${paths.map((p) => `<path fill="${p.fill}" d="${p.d}"/>`).join('\n      ')}
    </g>
  </g>
  <text x="600" y="560" text-anchor="middle" font-family="'Poppins', ui-sans-serif, sans-serif" font-size="22" letter-spacing="6" fill="#7C8A6B">CAKERY · OSUN STATE, NIGERIA</text>
</svg>
`

mkdirSync(resolve('public'), { recursive: true })
writeFileSync(resolve('public/og-image.svg'), ogSvg)
console.log(`wrote public/og-image.svg (${(Buffer.byteLength(ogSvg) / 1024).toFixed(1)} KB)`)
