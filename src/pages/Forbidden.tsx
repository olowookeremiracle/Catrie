import { Link } from 'react-router-dom'
import { CakeSlice } from '../components/illustrations'
import { useDocumentTitle } from '../hooks/useDocumentTitle'

export function Forbidden() {
  useDocumentTitle('Access restricted')
  return (
    <div className="flex min-h-dvh items-center justify-center bg-cream px-6 pb-16 pt-[88px] text-center">
      <div className="max-w-lg">
        <CakeSlice className="mx-auto w-16 text-sage/60" />
        <p className="label mt-8">403 · Access restricted</p>
        <h1 className="mt-5 font-display text-[clamp(34px,5vw,56px)] font-light leading-[1.02] tracking-[-0.02em]">
          That action isn&rsquo;t available.
        </h1>
        <p className="mx-auto mt-5 max-w-[44ch] text-[15px] leading-[1.7] text-ink-muted">
          The page exists, but this route is closed. If you followed a link,
          it may have expired.
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
