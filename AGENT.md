# AGENT.md — Design Guardrails

> **Read this before writing any UI code for Catrie.**
> `docs/scope.md` defines what exists. `docs/DESIGN.md` defines the values (colors, type, spacing, motion). This file defines **how to think and what not to do**, so the result never looks like generic AI-generated design.

If a rule here conflicts with `DESIGN.md`, the token values in `DESIGN.md` win — but the taste rules here still apply.

---

## 1. The one-line brief

Catrie should look like a **small luxury patisserie with an art director**, not like a SaaS landing page that sells cake.

If a screen could be mistaken for a template, it is wrong.

---

## 2. Non-negotiables

1. **Cream, chocolate, orange, sage.** Nothing else. No black, no white, no blue, no purple.
2. **Fraunces for display, Poppins for UI, Kaushan for the logo only.**
3. **One orange accent per viewport.** Not one per component — one per screen.
4. **Asymmetry over symmetry.** 7/5, 8/4, 5/7 — avoid 50/50 unless the content demands it.
5. **Whitespace is the product.** When in doubt, remove an element, not add one.
6. **Images are the hero.** Type supports the photo; it never competes with it.
7. **Motion is slow and once.** 400–900ms, `ease-out`, no bounce, no looping except the marquee.
8. **Every screen must pass the 10-second test** (section 14).
9. **No hardcoded hex values, font sizes, or radii.** Use the Tailwind tokens.
10. **No new fonts, colors, icons, or libraries without asking.**

---

## 3. Generic AI tells — banned

These are the fastest ways to make the site look machine-made. Do not ship any of them.

### Visual
- ❌ Purple/blue gradient hero, gradient text, glowing blobs
- ❌ Glassmorphism cards (`backdrop-blur` + white/10)
- ❌ Centered hero + two identical pill buttons + floating dashboard mockup
- ❌ Three identical feature cards with line icons in rounded squares
- ❌ Emoji used as icons
- ❌ `rounded-3xl` on everything; every card floating with `shadow-2xl`
- ❌ Neon accents, dark-mode toggle with no user need
- ❌ Blurry background shapes, "aurora" meshes, animated gradients
- ❌ Stock photos of people pointing at laptops / smiling at salads
- ❌ Section = eyebrow + centered heading + 3 cards, repeated five times
- ❌ Icon + heading + paragraph trio used more than once on a page
- ❌ Everything fading up on scroll, including body text
- ❌ Auto-rotating carousels with no pause control
- ❌ Decorative dividers, sparkle icons, "✨" anywhere
- ❌ Lorem ipsum or placeholder copy in any review build

### Copy
- ❌ "Elevate your…", "Unlock…", "Seamless…", "Transform your…", "Experience the…"
- ❌ "Indulge in a symphony of flavors" (purple prose)
- ❌ "We're passionate about…" (every brand says this)
- ❌ Exclamation marks in headings
- ❌ Title Case Headings Everywhere
- ❌ Generic CTAs: "Get Started", "Learn More", "Submit"
- ❌ Fake urgency: "Order now before it's gone!"
- ❌ More than one adjective per noun

### Behaviour
- ❌ Hamburger menu on desktop
- ❌ Hover effects that move layout
- ❌ Animations longer than 1s on scroll
- ❌ Scroll-jacking, custom cursors, page-load preloaders
- ❌ Popups on page load (booking opens only on intent)
- ❌ Disabling zoom, hiding focus rings, `outline: none` without a replacement

---

## 4. Approved patterns

Use these instead.

- ✅ Editorial split: oversized serif line left, image right, caption in small caps
- ✅ Full-bleed image with one large centered line and a single CTA
- ✅ Off-grid image that breaks the container by 8–12%
- ✅ Hairline rules and generous vertical rhythm instead of cards
- ✅ A single italic Fraunces word in orange inside a heading
- ✅ Small caps labels with wide tracking above sections
- ✅ Numbered editorial lists (01, 02, 03) in sage
- ✅ Image hover: slow 1.03 scale + caption shift, nothing else
- ✅ Marquee strip as a rhythm break, once per page maximum
- ✅ Quiet two-column testimonial, no stars, no avatars unless real
- ✅ Text links with animated underlines instead of extra buttons

---

## 5. Composition rules

- **One idea per viewport.** If a section carries two messages, split it.
- **Vary section rhythm.** Never two consecutive sections with the same width, alignment, and density.
- **Break the grid once per page.** An image that bleeds, a quote that hangs left, a number that overlaps.
- **Left-align by default.** Center only for statement heroes and error pages.
- **Limit card grids to 3 items** on desktop (4 for categories). More becomes a catalog wall — use editorial rows instead.
- **Max 2 buttons visible per viewport.** One primary, one text link.
- **Section padding:** `clamp(72px, 10vw, 140px)`. Do not compress to fit more in.
- **Text width:** 62ch max for body, 18ch for display.

---

## 6. Typography discipline

- Headlines are **sentence case**, weight 300–400, tracking −0.02em to −0.03em.
- Never set Fraunces below 22px.
- Never set Poppins above 20px except navigation or buttons.
- Labels are the only uppercase type: 11–12px, `0.18em` tracking, sage.
- One italic word per heading maximum, and only if it earns emphasis.
- Prices: tabular numerals, Poppins 500, no currency animation.
- No text shadows, no outlined text, no gradient text.

**Test:** squint at the page. The headline should be the only thing that dominates; everything else should recede.

---

## 7. Color discipline

- Orange is for: primary CTA, one accent word, price emphasis, focus ring, active chip.
- Sage is for: labels, tags, icons, quiet backgrounds. Never large surfaces.
- Chocolate is for: text, dark sections, footer.
- Cream is the canvas. When unsure, add cream, not color.
- Dark sections: chocolate background, cream text, orange only on the CTA.
- Hairlines: `rgba(59,36,21,.12)`. Never pure grey.
- No more than **3 colors** in any single component.

---

## 8. Motion discipline

- Reveal: `opacity 0→1`, `translateY(24px→0)`, 700ms, stagger 80ms, once.
- Hover: 200–300ms. Image zoom 700ms. Nothing springs.
- Hero swap: 5s cycle, text blur/translate out, image crossfade with 1.04→1 scale.
- Every animation must have a `prefers-reduced-motion` fallback.
- Animate only `transform`, `opacity`, `filter`. Never `height`, `width`, `top`, `left`.
- If an animation is there to "add life" with no purpose, delete it.

**Test:** record a 10-second screen capture. If it feels busy, slow it down and remove half.

---

## 9. Imagery

- Warm grade, cream highlights, chocolate shadows, soft daylight.
- One subject per image, negative space reserved for type.
- Aspect ratios: hero 4:5 / 3:4, cards 4:5, category 3:4, gallery 1:1.
- Hover: scale only. No duotone, no filters, no borders thicker than a hairline.
- Fallback: `cream-soft` tile + sage glyph + cake name. Never a broken image.
- Do not invent photography in code (no CSS "cake" illustrations, no emoji).

---

## 10. Copy voice

Warm, specific, confident. Short sentences. Concrete nouns. No hype.

| Instead of | Write |
|---|---|
| "Elevate your celebration" | "Cakes for the days you'll remember" |
| "Indulge in a symphony of flavors" | "Pistachio, raspberry, brown butter" |
| "Get Started" | "Book a cake" |
| "Learn More" | "See the cakes" |
| "We're passionate about baking" | "We bake in small batches, to order" |
| "Submit" | "Send request" |
| "Oops! Something went wrong!" | "That page isn't on the menu." |

- Never promise what the site cannot do (no real order is placed in demo mode).
- One exclamation mark in the entire site, maximum zero.
- Prices and lead times are facts — state them plainly.

---

## 11. Component contracts

Follow `DESIGN.md` exactly for:

- Buttons (pill primary, bordered secondary, underlined text link)
- Header (90px, transparent → cream on scroll)
- Menu overlay (Byredo pattern, adapted)
- Cake card, category card, chips, search, sort
- Booking modal and success state
- Footer and WhatsApp FAB

Additional rules:

- The **Book** action is always the primary pill; never a ghost button.
- The booking modal never opens automatically.
- The WhatsApp FAB appears only after scroll on mobile, and never overlaps the modal.
- Forms never use placeholder text as a label.
- Every destructive/blocked state explains itself in one sentence.

---

## 12. Accessibility & performance

- Keyboard: everything reachable, visible focus ring, logical order.
- Contrast: AA at the rendered size (orange only for large text/UI).
- Touch targets ≥ 44px.
- Modal: focus trap, Esc, restore focus.
- Images: width/height set, lazy below the fold, descriptive alt.
- No layout shift on font load (`font-display: swap` + matched metrics where possible).
- No animation library for something CSS can do.

---

## 13. Workflow for every change

1. Read `docs/scope.md` and `docs/DESIGN.md` for the area you're touching.
2. Reuse an existing component before creating a new one.
3. Build desktop first, then verify at **1440 / 768 / 390**.
4. Screenshot the result and compare against section 14.
5. Check keyboard + reduced motion.
6. Only then call it done.

### If you must add something new

- New color → no. Use the tokens.
- New font → ask first.
- New animation → must justify itself in one sentence.
- New component → must appear at least twice, or be page-specific and documented.
- New copy → must pass the voice table above.

---

## 14. The 10-second test

Look at a screenshot for ten seconds. Answer honestly:

1. Is there **one** clear focal point?
2. Does it look expensive without looking loud?
3. Could this be any other bakery? If yes, make it more Catrie.
4. Is anything centered that shouldn't be?
5. Are there more than two buttons competing?
6. Does any element look like a default Tailwind demo?
7. Would removing one element improve it? Remove it.

If any answer is wrong, revise before shipping.

### Generic smell test

Run this list against the screenshot. **Two or more hits = redo the section.**

- [ ] Purple/blue anywhere
- [ ] Glass or glow
- [ ] Three identical cards
- [ ] Emoji or sparkles
- [ ] Gradient text
- [ ] Centered everything
- [ ] Shadow on every card
- [ ] Icon-in-rounded-square row
- [ ] Same section rhythm repeated
- [ ] Placeholder or hype copy

---

## 15. Definition of done

A section/page is done only when:

- [ ] Uses only approved tokens (no hardcoded values)
- [ ] Passes the 10-second test and the smell test
- [ ] Responsive at 1440 / 768 / 390 without layout breaks
- [ ] Keyboard navigable with visible focus
- [ ] Reduced-motion fallback present
- [ ] No console errors, no layout shift
- [ ] Copy passes the voice table
- [ ] Reuses existing components
- [ ] Screenshot reviewed before handoff

---

## 16. Quick reference

```
Colors   cream #FFF7EC · orange #E86A17 · chocolate #3B2415 · sage #7C8A6B
Type     Fraunces (display) · Poppins (UI) · Kaushan Script (logo only)
Radii    12 / 20 / 28 / pill
Motion   200ms hover · 700ms reveal · 900ms hero · ease-out
Grid     1280px · 12 col · 24px gap
Rule     when in doubt: less color, more space, slower motion
```
