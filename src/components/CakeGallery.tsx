import { useEffect, useState } from 'react'
import { cn } from '../lib/cn'
import { cakePhoto, cakePhotoCount } from '../data/cakePhotos'

type CakeGalleryProps = {
  cakeKey: string
  name: string
}

/**
 * Detail-page gallery: one large photo with animated swaps, a row of
 * clickable thumbnails, and a dark full-screen lightbox with arrow-key
 * navigation.
 */
export function CakeGallery({ cakeKey, name }: CakeGalleryProps) {
  const count = cakePhotoCount(cakeKey)
  // Keep a local "confirmed" list so a missing photo never shows a broken tile.
  const [available, setAvailable] = useState<Set<number>>(() => new Set(Array.from({ length: count }, (_, i) => i)))
  const [active, setActive] = useState(0)
  const photos = Array.from({ length: count }, (_, i) => cakePhoto(cakeKey, i + 1)).filter((_, i) => available.has(i))
  // Keep the active index pointing at a real, loaded photo.
  const safeActive = Math.min(active, Math.max(0, photos.length - 1))
  const total = Math.max(1, photos.length)
  const [lightbox, setLightbox] = useState(false)

  const next = () => setActive((i) => (i + 1) % total)
  const prev = () => setActive((i) => (i - 1 + total) % total)
  const markBroken = (index: number) => {
    setAvailable((prevSet) => {
      if (!prevSet.has(index)) return prevSet
      const copy = new Set(prevSet)
      copy.delete(index)
      return copy
    })
    setActive((current) =>
      index <= current
        ? Math.max(0, current - 1) // the photo before this slot just disappeared
        : current,
    )
  }

  useEffect(() => {
    setActive(0)
    setAvailable(new Set(Array.from({ length: cakePhotoCount(cakeKey) }, (_, i) => i)))
    setLightbox(false)
  }, [cakeKey])

  useEffect(() => {
    if (!lightbox) return
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setLightbox(false)
      if (event.key === 'ArrowRight') setActive((i) => (i + 1) % total)
      if (event.key === 'ArrowLeft') setActive((i) => (i - 1 + total) % total)
    }
    window.addEventListener('keydown', onKey)
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = previous
    }
  }, [lightbox, total])

  return (
    <div>
      <button
        type="button"
        onClick={() => setLightbox(true)}
        className="group relative block w-full cursor-zoom-in overflow-hidden rounded-lg border border-line"
        aria-label={`View ${name} larger`}
      >
        <div className="relative aspect-[4/5] overflow-hidden bg-cream-soft">
          <img
            key={safeActive}
            src={photos[safeActive]}
            alt={`${name} — photo ${safeActive + 1}`}
            loading="eager"
            decoding="async"
            onError={() => markBroken(safeActive)}
            className="gallery-photo h-full w-full object-cover transition-transform duration-700 ease-out-expo group-hover:scale-[1.03]"
          />
        </div>
        <span className="pointer-events-none absolute right-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-chocolate-deep/75 px-3 py-1.5 text-[11px] font-medium tracking-wide text-cream opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="size-3.5" aria-hidden="true">
            <path d="M9 4H4v5M15 4h5v5M9 20H4v-5M15 20h5v-5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          View larger
        </span>
      </button>

      <div className="mt-4 flex flex-wrap gap-2" role="list" aria-label={`${name} photos`}>
        {photos.map((src, i) => (
          <button
            key={src}
            type="button"
            onClick={() => setActive(i)}
            aria-label={`Show photo ${i + 1} of ${total}`}
            aria-current={i === safeActive}
            className={cn(
              'group relative w-[60px] shrink-0 cursor-pointer overflow-hidden rounded-md border-2 transition-all duration-300 sm:w-[72px]',
              i === safeActive
                ? 'border-orange shadow-[0_10px_20px_-12px_rgba(232,106,23,0.9)]'
                : 'border-transparent opacity-65 hover:opacity-100',
            )}
          >
            <span className="block aspect-square overflow-hidden bg-cream-soft">
              <img
                src={src}
                alt=""
                loading="lazy"
                decoding="async"
                onError={() => markBroken(i)}
                className={cn(
                  'h-full w-full object-cover transition-transform duration-500 ease-out-expo',
                  i === safeActive ? 'scale-105' : 'group-hover:scale-105',
                )}
              />
            </span>
          </button>
        ))}
      </div>

      <p className="mt-3 text-[11px] uppercase tracking-[0.16em] text-sage">
        Tap a photo to enlarge · every cake is finished by hand
      </p>

      {lightbox && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`${name} — enlarged photo`}
          className="fixed inset-0 z-[90] flex flex-col bg-chocolate-deep/95 backdrop-blur-md"
          onClick={() => setLightbox(false)}
        >
          <div className="flex items-center justify-between gap-4 px-5 py-4 text-cream">
            <p className="font-display text-[18px] font-light">{name}</p>
            <button
              type="button"
              onClick={() => setLightbox(false)}
              aria-label="Close enlarged photo"
              className="grid size-10 place-items-center rounded-full border border-cream/25 text-[20px] leading-none text-cream transition-colors hover:bg-cream/10"
            >
              ×
            </button>
          </div>

          <div
            className="flex flex-1 items-center justify-center overflow-hidden px-4"
            onClick={(event) => event.stopPropagation()}
          >
            <img
              key={safeActive}
              src={photos[safeActive]}
              alt={`${name} — enlarged photo ${safeActive + 1}`}
              onError={() => markBroken(safeActive)}
              className="gallery-photo max-h-[76vh] w-auto max-w-full rounded-md object-contain shadow-[0_30px_90px_-30px_rgba(0,0,0,0.9)]"
            />
          </div>

          <div
            className="flex items-center justify-center gap-4 pb-6 pt-4"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              onClick={prev}
              aria-label="Previous photo"
              className="grid size-10 place-items-center rounded-full border border-cream/25 text-cream transition-all hover:-translate-x-0.5 hover:bg-cream/10"
            >
              ←
            </button>
            <span className="min-w-16 text-center text-[12px] uppercase tracking-[0.18em] text-cream/60">
              {safeActive + 1} / {total}
            </span>
            <button
              type="button"
              onClick={next}
              aria-label="Next photo"
              className="grid size-10 place-items-center rounded-full border border-cream/25 text-cream transition-all hover:translate-x-0.5 hover:bg-cream/10"
            >
              →
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
