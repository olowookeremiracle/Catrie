import { Link } from 'react-router-dom'
import { CakeStand } from '../components/illustrations'
import { useDocumentTitle } from '../hooks/useDocumentTitle'

export function NotFound() {
  useDocumentTitle('Not found')
  return (
    <div className="flex min-h-dvh items-center justify-center bg-cream px-6 pb-16 pt-[88px] text-center">
      <div className="max-w-lg">
        <CakeStand className="mx-auto w-24 text-sage/60" />
        <p className="label mt-8">404 · Not found</p>
        <h1 className="mt-5 font-display text-[clamp(34px,5vw,56px)] font-light leading-[1.02] tracking-[-0.02em]">
          This page isn&rsquo;t on the menu.
        </h1>
        <p className="mx-auto mt-5 max-w-[44ch] text-[15px] leading-[1.7] text-ink-muted">
          The link may be old, or the cake may have moved. Either way, there is
          plenty to see.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link to="/" className="btn-primary">
            Back home
          </Link>
          <Link to="/cakes" className="btn-secondary">
            See the cakes
          </Link>
        </div>
      </div>
    </div>
  )
}
