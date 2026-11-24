import { cn } from '../lib/cn'

type MarqueeProps = {
  items: string[]
  className?: string
}

/**
 * An editorial running strip. Pure CSS marquee — the row is duplicated and
 * translated; it pauses for users who prefer reduced motion.
 */
export function Marquee({ items, className }: MarqueeProps) {
  const row = items.join('  ·  ')

  return (
    <div
      className={cn(
        'relative overflow-hidden border-y border-line py-5',
        className,
      )}
      aria-hidden="true"
    >
      <div className="marquee-track flex w-max gap-0 whitespace-nowrap">
        <span className="marquee-segment pr-8 font-display text-[clamp(20px,3vw,34px)] font-light tracking-[-0.01em] text-chocolate/80">
          {row}
        </span>
        <span className="marquee-segment pr-8 font-display text-[clamp(20px,3vw,34px)] font-light tracking-[-0.01em] text-chocolate/80">
          {row}
        </span>
      </div>
    </div>
  )
}
