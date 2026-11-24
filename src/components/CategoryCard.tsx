import { Link } from 'react-router-dom'
import type { Category } from '../data/categories'
import { cn } from '../lib/cn'

type CategoryCardProps = {
  category: Category
  count: number
  index?: number
  className?: string
}

export function CategoryCard({ category, count, index = 0, className }: CategoryCardProps) {
  return (
    <Link
      to={`/cakes?category=${category.slug}`}
      className={cn(
        'group relative block h-full overflow-hidden rounded-lg border border-line transition-transform duration-300 hover:-translate-y-0.5',
        className,
      )}
    >
      {/* Background photo + subtle dark layer */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(/images/cat-webp/${category.slug}.webp)` }}
      />
      <div aria-hidden="true" className="absolute inset-0 bg-chocolate-deep/45 transition-colors duration-300 group-hover:bg-chocolate-deep/85" />

      {/* Content */}
      <div className="relative flex h-full min-h-[300px] flex-col justify-between p-8 md:p-10">
        <div className="flex items-start justify-between">
          <span className="text-[11px] uppercase tracking-[0.18em] text-cream/70">
            0{index + 1}
          </span>
          <span
            aria-hidden="true"
            className="text-cream/70 transition-transform duration-300 group-hover:-rotate-45 group-hover:text-orange"
          >
            →
          </span>
        </div>

        <div>
          <div className="flex items-baseline gap-3">
            <h2 className="font-display text-[clamp(26px,2.4vw,34px)] leading-tight text-cream transition-colors duration-300 group-hover:text-orange">
              {category.name}
            </h2>
            <span className="text-[13px] text-cream/60">{count} cakes</span>
          </div>
          <p className="mt-3 max-w-[34ch] text-[14px] leading-[1.7] text-cream/80">
            {category.blurb}
          </p>
        </div>
      </div>
    </Link>
  )
}
