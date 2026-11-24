import { useState } from 'react'
import { cn } from '../lib/cn'
import { cakeIllustrations } from './illustrations'
import { cakeCover, cakePhoto } from '../data/cakePhotos'

type Aspect = '4:5' | '5:4' | '3:4' | '1:1' | '16:9'

const aspectClass: Record<Aspect, string> = {
  '4:5': 'aspect-[4/5]',
  '5:4': 'aspect-[5/4]',
  '3:4': 'aspect-[3/4]',
  '1:1': 'aspect-square',
  '16:9': 'aspect-video',
}

type CakeTileProps = {
  /** Cake image key — matches a folder in public/images/cakes/. */
  cakeKey: string
  alt: string
  aspect?: Aspect
  className?: string
  /** 1-based gallery photo. Omit to use the compressed card cover. */
  photo?: number
  eager?: boolean
}

/**
 * Cake photo slot. Renders the real photograph and falls back to the
 * palette-bound illustration only if the image fails to load, so the catalog
 * never shows a broken tile.
 */
export function CakeTile({
  cakeKey,
  alt,
  aspect = '4:5',
  className,
  photo,
  eager = false,
}: CakeTileProps) {
  const [errored, setErrored] = useState(false)
  const Illustration = cakeIllustrations[cakeKey] ?? cakeIllustrations['the-sketch']
  const src = photo ? cakePhoto(cakeKey, photo) : cakeCover(cakeKey)

  return (
    <div
      className={cn('relative overflow-hidden bg-cream-soft', aspectClass[aspect], className)}
      role="img"
      aria-label={alt}
    >
      {!errored ? (
        <img
          src={src}
          alt=""
          loading={eager ? 'eager' : 'lazy'}
          decoding="async"
          onError={() => setErrored(true)}
          className="h-full w-full object-cover transition-transform duration-700 ease-out-expo group-hover:scale-[1.04]"
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center bg-cream-soft">
          <Illustration className="w-2/5 max-w-[150px] text-chocolate/60" />
        </div>
      )}
    </div>
  )
}
