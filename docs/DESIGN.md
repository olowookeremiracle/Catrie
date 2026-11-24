# Catrie — Design System v1

> How Catrie looks, moves, and feels. Derived from three live references, then pushed further with our own premium layer.
> Brand assets live in `brand/`. Scope and routes live in `docs/scope.md`.

---

## 1. Art direction

**Warm editorial luxury.** Think a fashion house that happens to bake: cream paper, deep chocolate ink, a single burnt-orange accent, generous silence, and photography treated like product art. Nothing shouts. Everything is deliberate.

Three words: **quiet · warm · crafted**.

- No gradients-as-decoration, no glassmorphism, no neon, no pure black.
- Type does the heavy lifting; imagery does the seduction; motion does the polish.
- Every screen should feel like it costs more than it does.

---

## 2. Reference DNA (what we actually take)

We do **not** clone these sites. We extract specific behaviours.

| Reference | What we take | What we ignore |
|---|---|---|
| **Oura** (ouraring.com) | Split hero with synchronized copy + image swapping; 90px sticky transparent header; pill CTAs; serif display at ~72px / weight 300 / −0.05em tracking; warm grey ink | Blue brand color, product UI, app screenshots |
| **Bang & Olufsen** (bang-olufsen.com) | Full-bleed cinematic hero with oversized centered type; cream-on-dark palette logic; restrained sans (BeoSupreme); serif accents (BeoLogue); script annotations (Fastpen) | Green brand color, product catalog patterns |
| **Byredo** (byredo.com) | **Menu overlay only** — full-screen cream takeover, grouped links, centered search, editorial promo cards | Everything else |

### Measured tokens (from live sites)

- Oura: body `16/24` sans; h1 `72/79.2`, weight `300`, tracking `−3.6px`; header `90px`, sticky.
- B&O: body `16/18.4`; h2 `26/40`, tracking `−0.5px`; cream `#FCFAEE` on dark; text-only buttons.
- Byredo: cream overlay, black type, ~11px uppercase group labels, large nav items, promo cards on the right.

### Our premium layer (beyond the references)

1. **Fraunces display serif** with optical sizing — warmer and more distinctive than a neutral sans headline.
2. **Kaushan Script reserved for the logo only** — the script never becomes UI type.
3. **Subtle paper grain** over cream surfaces (3–4% opacity) for tactility.
4. **Choreographed hero** — text and image swap together on a slow 5s cycle with blur/translate, not a hard cut.
5. **Underline and arrow micro-motions** instead of scale-bounce buttons.
6. **Editorial marquee** strip between sections (flavours / occasions) as a rhythm break.

---

## 3. Color

### Tokens

| Token | Hex | Role |
|---|---|---|
| `cream` | `#FFF7EC` | Page background, cards |
| `cream-soft` | `#FBF0DF` | Alternating section bands |
| `cream-deep` | `#F3E4CF` | Borders on dark, subtle fills |
| `orange` | `#E86A17` | Primary CTA, prices, accent word, focus |
| `orange-deep` | `#C9550F` | Hover / pressed |
| `chocolate` | `#3B2415` | Body text, dark sections |
| `chocolate-deep` | `#2A1810` | Headings, footer base |
| `sage` | `#7C8A6B` | Labels, tags, secondary icons |
| `sage-soft` | `#E8EBE1` | Chip backgrounds, quiet highlights |
| `ink-muted` | `rgba(59,36,21,.64)` | Secondary copy |
| `line` | `rgba(59,36,21,.12)` | Hairlines, card borders |

### Rules

- Ratio roughly **70% cream / 20% chocolate / 8% orange / 2% sage**.
- Orange never covers a large area — buttons, links, one word, one badge.
- Dark sections are `chocolate`, never black. Text on dark is `cream`.
- Sage is supporting only: labels, icons, tags, focus rings.
- No pure white cards on cream — use `#FFFDF9` at most.
- Gradients only as image scrims (chocolate → transparent), never as decoration.

### Contrast

- `chocolate` on `cream` ≈ 12:1 — safe for body.
- `cream` on `chocolate` ≈ 12:1 — safe.
- `orange` on `cream` ≈ 3.4:1 — **large text and UI only**, never small body copy.
- `sage` on `cream` ≈ 3.1:1 — labels 12px+ with weight 500 minimum; never paragraphs.

---

## 4. Typography

### Families

| Role | Family | Notes |
|---|---|---|
| Logo | **Kaushan Script** | Wordmark only, never UI |
| Display | **Fraunces** (variable, opsz 9–144, 300–700) | Headlines, pull quotes, big numbers |
| UI / body | **Poppins** (400/500/600) | Navigation, buttons, forms, paragraphs |

All three self-hosted in `brand/fonts/` (`fonts.css`).

### Scale (desktop values, fluid via `clamp`)

| Token | Size / line-height | Family · weight | Tracking |
|---|---|---|---|
| `display-xl` | `clamp(56px, 8vw, 120px)` / `0.95` | Fraunces 300 | `−0.03em` |
| `display` | `clamp(40px, 5vw, 72px)` / `1.02` | Fraunces 300 | `−0.02em` |
| `h2` | `clamp(32px, 3.5vw, 48px)` / `1.1` | Fraunces 400 | `−0.02em` |
| `h3` | `clamp(22px, 2vw, 28px)` / `1.25` | Fraunces 400 | `−0.01em` |
| `body-lg` | `18px` / `1.7` | Poppins 400 | `0` |
| `body` | `16px` / `1.7` | Poppins 400 | `0` |
| `small` | `14px` / `1.6` | Poppins 400 | `0` |
| `label` | `11–12px` / `1` | Poppins 500 | `0.18em`, uppercase |
| `price` | `15px` | Poppins 500 | `0.02em` |

### Rules

- Headlines are **sentence case**, not Title Case. All-caps is reserved for `label`.
- Max line length: 62ch body, 18ch for display.
- Italic Fraunces is allowed for one emphasised word — use sparingly, in orange.
- Poppins is geometric and wide: keep paragraphs at 16–18px with `1.7` line-height, and never letterspace body copy. Its roundness carries the friendliness; Fraunces carries the luxury.
- Numbers (prices, dates) use `font-variant-numeric: tabular-nums`.
- Never letterspace the script logo.
- Minimum body size 16px; never 14px for paragraphs on mobile.

---

## 5. Layout

| Token | Value |
|---|---|
| Content max width | `1280px` |
| Wide / full-bleed | `100vw`, content aligned to the 1280 grid |
| Grid | 12 columns, `24px` gap |
| Gutters | `24px` mobile · `48px` tablet · `80px` desktop |
| Section padding | `clamp(72px, 10vw, 140px)` vertical |
| Stack rhythm | 8 / 12 / 16 / 24 / 32 / 48 / 64 / 96 |
| Radius | `12` sm · `20` md · `28` lg · `999` pill |
| Hairline | `1px solid rgba(59,36,21,.12)` |
| Soft shadow | `0 30px 60px -40px rgba(59,36,21,.45)` |
| Grain | 3–4% noise overlay on cream sections |

- Text blocks sit left; imagery can break the grid.
- Asymmetry is welcome (7/5 or 8/4 splits), never chaotic.
- One idea per viewport. If a section needs two messages, it needs two sections.

---

## 6. Components

### Buttons

| Variant | Spec | Hover |
|---|---|---|
| Primary | Orange pill, cream text, Poppins 500 15px, `14px 28px` | `orange-deep`, arrow shifts 2px right, 240ms |
| Secondary | Transparent, 1px chocolate border, pill | Fills chocolate, text cream |
| Text link | Chocolate, 1px underline offset 4px | Underline turns orange, 240ms |
| On dark | Cream pill with chocolate text | Orange fill, cream text |

- No drop shadows on buttons. No bounce. Press = `scale(.98)`.
- Icon + label gap 10px; icons 18px, stroke 1.5.

### Header

- 88–90px, sticky, transparent over hero → `cream` with hairline + slight blur after 40px scroll.
- Left: logo (30–34px wordmark). Center: nav links (Poppins 500, 13px, `0.04em`). Right: **Book a cake** pill.
- Nav link hover: orange underline grows from left, 240ms.
- Mobile: logo + hamburger; menu opens the Byredo-style overlay.

### Menu overlay (the Byredo piece)

- Full-screen `cream`, fixed, `z-50`; page scroll locked.
- Top bar (80px): `X + MENU` left · centered search (max 420px, pill, sage placeholder) · **Book a cake** right.
- Body: 12-col grid → links occupy 7 cols, promo cards 5 cols.
- Link groups, each with a `label` (sage, uppercase, `0.24em`):
  - **Shop** — All cakes · Celebration · Wedding · Cupcakes · Custom (chevron for sub-items)
  - **Explore** — About · Contact · Policies
- Link type: Fraunces 32–40px, chocolate; hover → orange + arrow slides in.
- Promo cards: 4:5 image, chocolate scrim, caption + **Discover** underline.
- Open: backdrop fades 300ms, links stagger up 40ms each (600ms each). Close reverses.
- Esc, X, and backdrop close; focus trapped; focus returns to trigger.
- Mobile: single column — links first, promo cards stacked below.

### Cake card

- Image 4:5, radius 20, `object-cover`, hover `scale(1.03)` over 700ms.
- Overlay on hover: bottom gradient + **Book** pill rising 8px.
- Below image: category label (sage, uppercase 11px) · name (Fraunces 22px) · price (Poppins 500).
- Whole card is a link to detail; the Book button stops propagation.

### Category card

- Tall editorial tile (3:4 or 4:5), image + chocolate scrim.
- Fraunces 32–40px title bottom-left, cake count in small caps, arrow circle top-right on hover.
- Hover: image scale 1.04, arrow rotates −45°.

### Filters / search / sort

- Chips: pill, 1px line; active = chocolate fill + cream text.
- Search: pill input with sage icon, 44px height.
- Sort: text button + chevron, opens a small cream popover with hairline shadow.
- Filter changes animate the grid with a 250ms fade/translate — never a layout jump.

### Forms

- Labels: `label` style above the field, 8px gap.
- Inputs: 48px, cream `#FFFDF9`, 1px line, radius 12; focus = 2px orange ring, no glow.
- Errors: orange text 13px below field; border turns orange; `aria-invalid`.
- Submit: full-width primary pill; loading state swaps label for a 3-dot pulse.

### Modal (booking)

- Max 560px, cream, radius 28, soft shadow; backdrop `rgba(42,24,16,.55)` + 4px blur.
- Header: Fraunces 32px title + close X; optional cake thumbnail (64px, radius 12).
- Body scrolls; footer submit is sticky on mobile.
- Enter: fade + 16px rise, 400ms; exit 250ms.
- Success: orange check in a sage-soft circle, Fraunces 28px "Request received", secondary WhatsApp link, single **Done** button.

### Footer

- Chocolate background, cream text, 4 columns: brand + blurb · Shop · Explore · Contact.
- Logo at 40px; socials as 20px icons with 1px circles.
- Hairline `rgba(255,247,236,.15)`; policy links in a bottom row, `small`.
- WhatsApp FAB sits 24px above the footer edge on mobile.

### Floating WhatsApp

- 56px circle, chocolate background, cream glyph; hover → orange.
- Shadow soft, never glowing. Appears after 300px scroll on mobile only.

---

## 7. Page compositions

**Home**
1. Split hero — rotating copy left, swapping cake image right
2. Marquee strip (flavours / occasions)
3. Category row — 4 editorial tiles
4. Signature cakes — 3 cards, "View all" text link
5. Story split — image left, text right, signature detail
6. Testimonials — 2-up quiet quotes, sage labels
7. CTA band — chocolate background, cream Fraunces line, orange pill
8. Footer

**Categories**
1. Full-bleed hero — oversized centered statement over cake imagery
2. Intro line (max 62ch)
3. 4 large category tiles in a 2×2 editorial grid
4. CTA band → booking

**Cakes**
1. Compact page header (Fraunces + one-line intro)
2. Sticky toolbar: chips · search · sort
3. 3-column grid (2 tablet, 1 mobile)
4. Empty state with illustration-free typographic message + reset
5. CTA band

**Cake detail**
1. Two-column: gallery left (main + thumbnails), sticky info right
2. Info: category label, Fraunces name, price, short description, size + flavor selectors
3. **Book this cake** primary pill, WhatsApp secondary
4. Detail accordion (ingredients, allergens, lead time)
5. Related cakes — 3 cards

**About**
1. Editorial hero — Fraunces statement, portrait image
2. Story — 2 columns, generous leading
3. Process — 3 numbered steps with sage numerals
4. Values — 3 short blocks
5. CTA band

**Contact**
1. Split: contact details left (WhatsApp, phone, email, hours, address), demo form right
2. Map / directions strip
3. CTA band

**Policies**
1. Header + last-updated line
2. Sticky anchor nav (left, 3 cols) + content (9 cols)
3. Sections: Privacy · Terms · Booking & Cancellation · Allergens

**403 / 404**
- Centered, `display` Fraunces line, one sentence, two links (Home, Cakes). No illustration.

---

## 8. Motion system

### Tokens

| Token | Value |
|---|---|
| `ease-out` | `cubic-bezier(.16, 1, .3, 1)` |
| `ease-in-out` | `cubic-bezier(.65, 0, .35, 1)` |
| `fast` | `200ms` |
| `base` | `400ms` |
| `slow` | `700ms` |
| `hero` | `900ms` |

### Rules

- Animate only `transform` and `opacity` (plus `filter: blur` sparingly).
- Reveal on scroll: `opacity 0→1`, `translateY(24px→0)`, 700ms, stagger 80ms, trigger at 15% visibility, once.
- Images: hover `scale(1.03)`, 700ms `ease-out`; never on touch.
- Underlines: `scaleX(0→1)` from left, 240ms.
- Arrows: `translateX(2–4px)` on hover.
- No parallax on text. Image parallax max 40px.
- Never animate height, width, top, or left.
- Modal and menu use opacity + small transform only.

### Hero A — synchronized swap (Home)

- Left: eyebrow · H1 with 3 rotating lines · body · CTAs · progress dots.
- Right: stack of 3–4 cake images (4:5), rounded 28, inside a cream frame.
- Cycle 5s. On change:
  - Outgoing line: opacity → 0, `translateY(-12px)`, `blur(6px)`, 500ms.
  - Incoming line: `translateY(16px)` → 0, `blur(6px)` → 0, opacity → 1, 700ms, 80ms delay.
  - Images crossfade 800ms with `scale(1.04 → 1)`.
  - Dots fill left→right over the cycle.
- Pause on hover and on focus within. Manual dots always work.
- Reduced motion: no rotation, static first slide, no blur.

### Hero B — full-bleed statement (Categories)

- Height `min(100vh, 860px)`, image `object-cover`, chocolate scrim bottom 60%.
- Centered `display-xl` in cream, eyebrow above, one CTA below.
- Slow ken-burns `scale(1 → 1.06)` over 24s, `ease-in-out`, alternate.
- On scroll: image `translateY(0 → 40px)`, text `translateY(0 → -20px)`, capped.
- Reduced motion: no ken-burns, no parallax.

### Menu overlay

- Backdrop `opacity 0→1` 300ms.
- Links: `translateY(20px) + opacity 0` → in, 600ms, stagger 40ms.
- Promo cards: `translateY(24px)`, 700ms, 120ms after links.
- Close: reverse at 60% duration.

### Marquee

- Continuous horizontal scroll, 40s linear, duplicated track, pauses on hover.
- Text: Fraunces italic 20–24px, sage separators (·).

---

## 9. Imagery

- Aspect ratios: hero `4:5` or `3:4`, cards `4:5`, categories `3:4`, gallery `1:1`.
- Warm grade: cream highlights, chocolate shadows, no cool blue cast.
- Consistent soft daylight; avoid hard flash and cluttered backgrounds.
- One hero subject per image; negative space allowed to carry type.
- Grain overlay 3–4% on cream sections; none on photos.
- Hover scale only; no filters or duotones.
- Fallback tile: `cream-soft` + sage cake glyph + name in Fraunces — never a broken image.

---

## 10. Accessibility

- Focus ring: `2px solid orange`, `2px` offset, always visible on keyboard.
- All text meets WCAG AA at its size (see contrast rules).
- Hit targets ≥ 44px.
- Motion respects `prefers-reduced-motion: reduce` — disable transforms, keep ≤150ms fades.
- Modals: `role="dialog"`, `aria-modal="true"`, labelled, focus trapped, Esc closes, focus restored.
- Forms: persistent labels, inline errors, `aria-describedby`, no placeholder-only labels.
- Carousels: pause control, keyboard dots, no autoplay under reduced motion.
- Images: descriptive alt text; decorative images `alt=""`.

---

## 11. Do / Don't

**Do**
- Let cream breathe; whitespace is the luxury.
- Use one orange accent per view.
- Use Fraunces for emotion, Poppins for information.
- Animate slowly and once.
- Keep corners soft and consistent.

**Don't**
- Don't use the script font outside the logo.
- Don't use black, pure white, or cool greys.
- Don't stack multiple accent colors in one component.
- Don't bounce, spin, or over-animate.
- Don't put text over busy imagery without a scrim.
- Don't use stock "smiling baker" clichés.

---

## 12. Tailwind mapping

```js
// tailwind.config.js (excerpt)
theme: {
  extend: {
    colors: {
      cream: { DEFAULT: '#FFF7EC', soft: '#FBF0DF', deep: '#F3E4CF' },
      orange: { DEFAULT: '#E86A17', deep: '#C9550F' },
      chocolate: { DEFAULT: '#3B2415', deep: '#2A1810' },
      sage: { DEFAULT: '#7C8A6B', soft: '#E8EBE1' },
      line: 'rgba(59,36,21,0.12)',
    },
    fontFamily: {
      display: ['Fraunces', 'serif'],
      sans: ['Poppins', 'sans-serif'],
      logo: ['"Kaushan Script"', 'cursive'],
    },
    borderRadius: { sm: '12px', md: '20px', lg: '28px' },
    transitionTimingFunction: {
      out: 'cubic-bezier(.16,1,.3,1)',
      inout: 'cubic-bezier(.65,0,.35,1)',
    },
    maxWidth: { content: '1280px' },
  },
}
```

### File structure (planned)

```
src/
  components/      # Button, Header, MenuOverlay, CakeCard, BookingModal...
  sections/        # HeroSplit, HeroFullBleed, CategoryGrid, Marquee, CTA...
  pages/           # Home, Categories, Cakes, CakeDetail, About, Contact, Policies, Forbidden, NotFound
  data/            # categories.js, cakes.js, testimonials.js
  services/        # bookingService.js, contactService.js
  lib/             # validation.js, motion.js
  styles/          # tokens.css, fonts.css, globals.css
```

---

## 13. Open design items

- Final cake photography or placeholder treatment
- Testimonial copy and attribution style
- Policy typography density (legal pages can run denser than marketing pages)
- Whether to keep the marquee on mobile (recommended: yes, slower)
- Real WhatsApp number / social handles for footer and FAB
