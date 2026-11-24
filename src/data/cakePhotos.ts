/**
 * Photo manifest for the catalog.
 *
 * Each cake has its own folder:
 *   public/images/cakes/<imageKey>/cover.webp   card cut (640×800)
 *   public/images/cakes/<imageKey>/1..N.webp    gallery cuts (960×1200)
 *
 * The counts are updated as photos are generated for each cake.
 */
export const cakePhotoCounts: Record<string, number> = {
  'anniversary-layer': 4,
  'chocolate-midnight': 3,
  'graduation-arch': 4,
  'lemon-poppy-seed': 3,
  'two-tier-blush': 4,
  'three-tier-ivory': 4,
  'rustic-forest': 4,
  'vanilla-bean-dozen': 4,
  'assorted-flavour-box': 4,
  'chocolate-truffle-triptych': 4,
  'strawberry-drip-mini': 4,
  'the-sketch': 4,
  'the-monogram': 4,
  'the-heirloom': 4,
  'the-first-issue': 4,
  'the-garden': 4,
}

// Cakes whose photo count was explicitly confirmed by the uploader.
export const cakePhotoOverrides: Record<string, number> = {
  'chocolate-midnight': 3,
  'lemon-poppy-seed': 3,
  'the-heirloom': 3,
  'the-first-issue': 3,
}

export function cakePhotoCount(imageKey: string): number {
  return cakePhotoOverrides[imageKey] ?? (cakePhotoCounts[imageKey] ?? 4)
}

export function cakeCover(imageKey: string): string {
  return `/images/cakes/${imageKey}/cover.webp`
}

/** 1-based gallery photo. */
export function cakePhoto(imageKey: string, index: number): string {
  const count = cakePhotoCount(imageKey)
  const n = Math.min(Math.max(1, index), count)
  return `/images/cakes/${imageKey}/${n}.webp`
}
