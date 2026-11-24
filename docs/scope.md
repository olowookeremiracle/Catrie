# Catrie — Project Scope

> Frontend-only cakery showcase and booking site. React + Tailwind, deployed as a static SPA on Vercel from GitHub.
> This document is the source of truth for scope until we start building. Update it as decisions change.

---

## 1. Product

**Catrie** is a premium cakery brand site whose MVP is:

- Showcase cakes by category
- Let visitors book directly from the site via a popup form (demo submission)
- Direct messaging via WhatsApp and social links

No backend, no accounts, no payments, no database. All data lives in local files, and all mutations are simulated.

### Goals

- Feel premium, warm, hand-crafted — a patisserie, not a bakery template
- Make browsing effortless and booking reachable from anywhere
- Ship as a clean, maintainable codebase a backend can be wired into later

### Non-goals (MVP)

- Real order submission, payments, cart, checkout
- Authentication, user accounts, order history
- Admin dashboard or CMS
- Reviews submission, wishlists, loyalty

---

## 2. Stack & deployment

| Concern | Choice |
|---|---|
| Framework | React + Vite |
| Styling | Tailwind CSS (theme tokens, no ad-hoc hex values in components) |
| Routing | React Router |
| Animation | CSS + a lightweight library (e.g. Framer Motion) with shared easing |
| Data | Local JS/JSON modules (`src/data/cakes.js`, `src/data/categories.js`) |
| Deploy | GitHub → Vercel, SPA rewrites via `vercel.json` |
| Backend | None. Booking/contact isolated behind a service layer |

---

## 3. Brand

> Full visual system — type scale, spacing, components, motion, page compositions — lives in `docs/DESIGN.md`.

### Logo

Wordmark only: **Catrie**, Kaushan Script, `Ca` orange + `trie` chocolate, connected baseline. No swash, no tagline.

Assets in `brand/`:

| File | Use |
|---|---|
| `catrie-logo.svg` | Primary (chocolate) |
| `catrie-logo-dark.svg` | On chocolate backgrounds (cream `trie`) |
| `catrie-mark.svg` | Orange square "C" — favicon / social |
| `catrie-mark-reverse.svg` | Cream square, orange C |
| `fonts/` | Self-hosted Kaushan Script + Fraunces + Poppins |

SVGs are self-contained (fonts embedded). Print-ready outlined paths can be generated later.

### Palette

| Token | Hex | Role |
|---|---|---|
| `cream` | `#FFF7EC` | Backgrounds, cards |
| `orange` | `#E86A17` | CTAs, prices, logo accent |
| `chocolate` | `#3B2415` | Headings, body, footer |
| `sage` | `#7C8A6B` | Tags, icons, secondary UI, focus states |

Rules:
- Orange is the only "loud" color; sage is an accent, never a background for large areas.
- No pure black anywhere.
- Headings may use a deeper chocolate (`#2A1810`) for contrast.

### Type

- Display / logo: Kaushan Script
- UI / body: Poppins (400 / 500 / 600)
- Body copy stays Poppins; never use the script face for paragraphs.

---

## 4. Routes

**9 total** — 7 content pages + 2 error pages.

| # | Route | Page | Guard |
|---|---|---|---|
| 1 | `/` | Home | public |
| 2 | `/categories` | Category hub | public |
| 3 | `/cakes` | Showcase (filter / search / sort) | public |
| 4 | `/cakes/:slug` | Cake detail | public — unknown slug → 404 |
| 5 | `/about` | Story & process | public |
| 6 | `/contact` | Contact (WhatsApp, phone, socials, demo form) | public |
| 7 | `/policies` | Privacy · Terms · Booking & Cancellation · Allergens | public |
| 8 | `/403` | Access Restricted | — |
| 9 | `*` | 404 Not Found | — |

Modals/overlays (not routes): booking form, cake quick-view, success confirmation, mobile nav drawer.

---

## 5. User actions

### Global

- Sticky header: logo, nav, persistent orange **Book a cake** CTA
- Mobile drawer navigation
- Floating WhatsApp button → `wa.me` deep link
- Footer: socials, contact, policy links, hours
- Scroll-reveal animations (disabled under `prefers-reduced-motion`)

### Home

- Hero CTAs: **Explore cakes** → `/cakes`, **Book a cake** → modal
- Category cards → `/cakes?category=…`
- Featured cake cards → detail page
- Testimonials slider (arrows, dots, swipe)
- Closing CTA → modal

### Categories

- Category card → filtered catalog
- Cake count per category

### Cakes

- Category filter chips → `?category=…` (shareable, back-button friendly)
- Search by name / flavor
- Sort (e.g. featured, price low→high, price high→low)
- Card click → detail
- Card **Book** → modal pre-filled
- Empty state when no matches

### Cake detail

- Image gallery / thumbnails
- Size + flavor options (carried into booking)
- **Book this cake** → modal pre-filled with cake, size, flavor
- Related cakes

### About

- Story, process, values → CTA to book

### Contact

- WhatsApp, `tel:`, `mailto:`, social links
- Hours, location, "Get directions"
- Demo contact form → validation → success message
- CTA to booking modal

### Policies

- Anchored sections: Privacy, Terms, Booking & Cancellation, Allergens
- Deep links (`/policies#cancellation`)
- Back to top

---

## 6. Booking modal

Entry points: header CTA, hero CTA, cake card Book, cake detail, footer CTA, mobile sticky CTA.

### Fields

| Field | Required | Notes |
|---|---|---|
| Name | yes | |
| Phone / WhatsApp | yes | format validated |
| Email | no | format validated if filled |
| Cake | yes | pre-filled when opened from a cake |
| Size | yes | from cake options |
| Flavor | yes | from cake options |
| Quantity | yes | min 1 |
| Needed-by date | yes | must be ≥ 48h ahead |
| Notes / allergies | no | max length enforced |

### Behaviour

- Focus trap, Esc and backdrop close, body scroll lock, focus restored to trigger
- Inline validation; no page navigation on invalid input
- Submit → brief loading → success state (nothing is sent)
- Success: confirmation + secondary "Message us on WhatsApp"
- Demo mode: small "demo" hint + optional fake reference (`CAT-4821`) — toggled by a single config flag so it can be switched off when a real API exists

---

## 7. Error & restricted behaviour

| Situation | Result |
|---|---|
| Unknown route | 404 — "This page isn't on the menu" |
| Unknown cake slug | 404 |
| Known route, action not allowed | 403 — "That action isn't available" |
| Tampered/invalid booking state | Blocked inline; direct URL access → 403 |
| Attempted script injection / tampering at the client boundary | Best-effort detection → 403 |
| Runtime error | Error boundary → friendly recovery page (not 404) |

### Security note (important)

This is a static frontend. **Client-side guards are UX, not security.** Anyone can bypass them with devtools; a 403 page and a `<RequireAccess>` wrapper only control presentation. Real enforcement of "unauthorized actions" requires a backend. We still:

- Sanitise and validate all input
- Never use `dangerouslySetInnerHTML` with user content
- Ship a CSP and security headers on Vercel where possible
- Structure guards so a real role check can replace the placeholder

Blocked actions should normally be hidden/disabled with an inline reason. Redirecting to 403 is the fallback for direct URL access, not normal clicking.

---

## 8. Motion guidelines

- Purposeful, slow, premium: 400–700ms, ease-out
- Reveal on scroll (translate + fade), staggered by section
- Image hover: subtle scale (≤1.04), no bounce
- Modal: fade + slight rise; backdrop blur optional
- Never animate layout-affecting properties; no jank on mobile
- Always honour `prefers-reduced-motion`
- No animation that blocks reading or breaks the UI

---

## 9. Accessibility

- Semantic landmarks and heading order
- Visible focus states (sage or orange ring)
- All interactive elements keyboard reachable
- Modal: `role="dialog"`, `aria-modal`, labelled title, focus trap
- Form labels tied to inputs, errors announced
- Alt text for all cake images
- Colour contrast: body text on cream and cream on chocolate both AA

---

## 10. Architecture for a future backend

- `src/data/*` — catalog content
- `src/services/bookingService.js` — `submitBooking(payload)`; today resolves after a delay, later calls an API
- `src/services/contactService.js` — `submitMessage(payload)`; same pattern
- `src/lib/validation.js` — shared rules
- `src/components/` — UI, no fetch logic
- Environment flag `VITE_DEMO_MODE` controls demo hints
- Swapping to a real API should touch the service layer only

---

## 11. Decisions locked

- Palette: cream / orange / chocolate / sage (no black)
- Logo: Kaushan Script wordmark, orange `Ca`, chocolate `trie`; no swash or tagline
- Pages: Home, Categories, Cakes, Cake detail, About, Contact, Policies, 403, 404
- Catalog: filters + search + sort
- Contact: WhatsApp/phone/socials/map + demo form
- Booking: demo submission, success message, demo hint + fake reference
- Restricted actions → `/403`, unknown routes → 404

---

## 12. Open items

- Category list and cake catalog data (names, prices, sizes, flavors, images)
- WhatsApp number, phone, email, address, hours
- Social handles (Instagram, TikTok, Facebook, …)
- Policy copy (privacy, terms, cancellation, allergens)
- Testimonials content
- Real photography or placeholder strategy
