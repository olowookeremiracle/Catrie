# Catrie — Build Plan

Four phases, start to finish. Each phase ends with a screenshot review and your approval before the next begins.

Read alongside: `docs/scope.md` (what), `docs/DESIGN.md` (values), `AGENT.md` (taste rules).

---

## Phase 1 — Foundation & shell ✅

**Goal:** a navigable, token-driven skeleton that already feels like Catrie.

- Scaffold Vite + React + Tailwind; React Router; SPA rewrites for Vercel
- Self-hosted fonts wired (Kaushan, Fraunces, Poppins); Tailwind tokens for color, type, radius, easing
- Global styles: cream canvas, paper grain, selection color, focus ring, scroll behavior
- **Header** — 90px, transparent → cream on scroll, logo, nav, Book pill, mobile trigger
- **Menu overlay** — Byredo pattern adapted: cream takeover, search, grouped links, promo cards, stagger, focus trap
- **Footer** — chocolate, 4 columns, socials, policy links
- **WhatsApp FAB** — mobile, after scroll
- Route shells for all 9 pages + error boundary
- **403 / 404** pages built to final quality

**Done when:** every route is reachable, overlay opens/closes correctly from keyboard and mouse, tokens are the only source of style values, and screenshots at 1440/768/390 look right.

---

## Phase 2 — Catalog & discovery ✅

**Goal:** the browsing experience, with real imagery.

- Data model: `categories.js` (4), `cakes.js` (12–16), `testimonials.js`
- **Image sourcing:** download curated cake photography, optimise, store locally, record credits
- **Home** — split hero with synchronized copy/image swap, marquee, category row, signature cakes, story split, testimonials, CTA band
- **Categories** — full-bleed statement hero, 2×2 editorial tiles
- **Cakes** — chips, search, sort, 3-col grid, empty state, URL-synced filters
- Reusable **CakeCard**, **CategoryCard**, **Marquee**, **SectionHeading**

**Done when:** filters/search/sort survive reload and back-button, hero swap stays in sync, every image fills its slot without distortion, and no section repeats the same rhythm back-to-back.

---

## Phase 3 — Conversion & content ✅

**Goal:** the pages that turn browsing into a booking.

- **Cake detail** — gallery + thumbnails, sticky info, size/flavor selectors, related cakes
- **Booking modal** — prefill from any entry point, validation (48h rule), focus trap, loading, success, demo hint + reference
- **Contact** — details, hours, directions, demo form, WhatsApp
- **About** — story, process, values
- **Policies** — anchored sections, sticky nav, deep links
- Wire `bookingService` and `contactService` (demo, API-ready)

**Done when:** booking opened from a card carries the cake/size/flavor, invalid dates are blocked inline, success state reads clearly, and no route can be reached in a broken state.

---

## Phase 4 — Polish, QA & ship ✅

**Goal:** make it feel expensive, then prove it works.

- Motion pass: reveals, hero choreography, menu, marquee, hover states; reduced-motion fallbacks
- Responsive QA at 1440 / 768 / 390; crop and focal-point review on every image
- Accessibility: keyboard pass, contrast, labels, focus restoration, dialog semantics
- Performance: image sizes/formats, lazy loading, no layout shift
- SEO: titles, descriptions, OG image, favicon from the mark
- Vercel config, README, deploy preview
- Final run through the `AGENT.md` 10-second test and definition of done

**Done when:** Lighthouse accessibility ≥ 95, no console errors, no layout shift, every image aligned, and the whole site passes the smell test.

---

## Images

**Sourcing**
- Per-cake editorial product photography (Gemini), dropped into
  `public/images/uploads/<key>/` as `1.jpg … N.jpg`
- Compressed + wired with `scripts/process-upload.mjs` (or `add-photo.mjs`
  for a single extra shot)
- Gallery cuts `public/images/cakes/<key>/1.webp … N.webp` (960×1200, ≤115 KB)
- Card cover `public/images/cakes/<key>/cover.webp` (640×800, ≤58 KB)
- Photo counts per cake live in `src/data/cakePhotos.ts`

**Alignment (non-negotiable)**
- Every slot has a fixed aspect ratio: hero `4:5`, cards `4:5` or `1:1` (compact), gallery `4:5`
- Always `object-fit: cover`; never stretch, never use arbitrary heights
- Focal crop uses `strategy.attention` so the cake stays centred in every cut
- Same visual grade across the set: warm highlights, chocolate shadows, soft daylight
- Check each image at 390 / 768 / 1440 before sign-off
- Fallback tile in `cream-soft` with a sage glyph if an image fails

## Illustrations

- Hand-built inline SVG only — no emoji, no CSS-drawn cakes, no fake product art
- Palette-bound (`currentColor` + cream/orange/chocolate/sage)
- Use for: 403/404, empty states, loading, and one or two quiet decorative accents (whisk, cake stand, leaf)
- Also acts as the offline fallback tile inside `CakeTile`
- Thin strokes (1.5–2px), generous negative space, never busy
- Stored in `src/components/illustrations.tsx` and reused, not redrawn per page
- Illustrations support the design; photography carries the product
