import { Link, useSearchParams } from 'react-router-dom'
import { CakeStand } from './illustrations'

export function EmptyState() {
  const [params, setParams] = useSearchParams()
  const term = params.get('q')
  const category = params.get('category')

  return (
    <div className="flex flex-col items-center rounded-lg border border-line bg-cream-soft/50 px-6 py-20 text-center md:py-28">
      <CakeStand className="w-24 text-sage/50 md:w-28" />
      <h2 className="mt-8 font-display text-[clamp(22px,2.6vw,30px)] font-light leading-tight">
        Nothing on the counter matches that.
      </h2>
      <p className="mt-3 max-w-[42ch] text-[14px] leading-[1.7] text-ink-muted">
        {term ? (
          <>
            No cakes for &ldquo;{term}&rdquo;
            {category ? ' in this category' : ''}. Try a different word, or tell us
            exactly what you need.
          </>
        ) : (
          'Try a different filter, or tell us exactly what you need and we will bake it.'
        )}
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <button
          type="button"
          onClick={() => setParams({}, { replace: true })}
          className="btn-primary"
        >
          Clear filters
        </button>
        <Link to="/contact" className="btn-secondary">
          Tell us what you need
        </Link>
      </div>
    </div>
  )
}
