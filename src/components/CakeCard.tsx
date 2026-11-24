import { Link } from 'react-router-dom'
import { formatPrice } from '../config/site'
import type { Cake } from '../data/cakes'
import { cn } from '../lib/cn'
import { useBooking } from '../context/BookingContext'
import { CakeTile } from './CakeTile'

type CakeCardProps = {
  cake: Cake
  /** Compact card used in grid layouts. */
  compact?: boolean
  className?: string
}

export function CakeCard({ cake, compact = false, className }: CakeCardProps) {
  const detail = `/cakes/${cake.slug}`
  const { openBooking } = useBooking()

  return (
    <article
      className={cn(
        'group relative flex h-full flex-col overflow-hidden rounded-lg border border-line bg-cream transition-colors duration-300 hover:border-chocolate/25',
        className,
      )}
    >
      <Link to={detail} className="relative block" aria-label={cake.name}>
        <CakeTile cakeKey={cake.image} alt={cake.name} aspect={compact ? '1:1' : '5:4'} />
        {cake.featured && (
          <span className="absolute left-4 top-4 rounded-full bg-cream/90 px-3 py-1 text-[10px] font-medium uppercase tracking-[0.18em] text-orange backdrop-blur-sm">
            Featured
          </span>
        )}
      </Link>

      <div className={cn('flex flex-1 flex-col p-5', compact && 'p-4')}>
        <h3 className="font-display text-[20px] font-normal leading-tight">
          <Link to={detail} className="transition-colors group-hover:text-orange">
            {cake.name}
          </Link>
        </h3>
        <p className="mt-2 line-clamp-2 text-[13px] leading-[1.6] text-ink-muted">
          {cake.summary}
        </p>

        <div className="mt-auto flex items-end justify-between gap-3 pt-4">
          <div>
            <p className="text-[11px] uppercase tracking-[0.16em] text-sage">From</p>
            <p className="font-display text-[18px] text-orange">{formatPrice(cake.basePrice)}</p>
          </div>
          <div className="flex items-center gap-3">
            <Link
              to={detail}
              className="text-[12px] font-medium text-ink-muted transition-colors hover:text-orange"
            >
              Details →
            </Link>
            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation()
                openBooking(cake.slug)
              }}
              className="inline-flex h-9 items-center rounded-full bg-orange px-4 text-[12px] font-medium text-cream shadow-[0_8px_18px_-10px_rgba(232,106,23,0.7)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-orange-deep hover:shadow-[0_12px_24px_-10px_rgba(232,106,23,0.8)] active:translate-y-0 active:scale-[0.96]"
            >
              Book
            </button>
          </div>
        </div>
      </div>
    </article>
  )
}
