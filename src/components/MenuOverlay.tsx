import { useEffect, useRef, useState } from 'react'
import type { CSSProperties, FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { site } from '../config/site'
import { useBooking } from '../context/BookingContext'
import { Logo } from './Logo'
import { CakeTile } from './CakeTile'

type MenuOverlayProps = {
  open: boolean
  onClose: () => void
}

const shopLinks = [
  { label: 'All cakes', to: '/cakes' },
  { label: 'Celebration', to: '/cakes?category=celebration' },
  { label: 'Wedding', to: '/cakes?category=wedding' },
  { label: 'Cupcakes', to: '/cakes?category=cupcakes' },
  { label: 'Custom', to: '/cakes?category=custom' },
]

const exploreLinks = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Contact', to: '/contact' },
  { label: 'Policies', to: '/policies' },
]

export function MenuOverlay({ open, onClose }: MenuOverlayProps) {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const [query, setQuery] = useState('')
  const navigate = useNavigate()
  const { openBooking } = useBooking()

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return
    if (open && !dialog.open) dialog.showModal()
    if (!open && dialog.open) dialog.close()
  }, [open])

  useEffect(() => {
    if (!open) return
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = previous
    }
  }, [open])

  const submitSearch = (event: FormEvent) => {
    event.preventDefault()
    const term = query.trim()
    onClose()
    navigate(term ? `/cakes?q=${encodeURIComponent(term)}` : '/cakes')
  }

  return (
    <dialog
      ref={dialogRef}
      onClose={onClose}
      onCancel={onClose}
      onClick={(event) => {
        if (event.target === dialogRef.current) onClose()
      }}
      aria-label="Menu"
      className="menu-dialog fixed inset-0 m-0 h-dvh max-h-none w-full max-w-none border-0 bg-transparent p-0 text-chocolate"
    >
      <div className="menu-panel flex min-h-dvh w-full flex-col bg-cream">
        <div className="container-content flex h-20 items-center justify-between gap-6 border-b border-line">
          <button
            type="button"
            onClick={onClose}
            className="group inline-flex items-center gap-3 text-[12px] font-medium uppercase tracking-[0.18em]"
          >
            <span className="relative grid size-5 place-items-center">
              <span className="absolute h-px w-4 rotate-45 bg-current transition-transform duration-200 group-hover:rotate-[135deg]" />
              <span className="absolute h-px w-4 -rotate-45 bg-current transition-transform duration-200 group-hover:rotate-45" />
            </span>
            Close
          </button>

          <form onSubmit={submitSearch} className="hidden flex-1 justify-center md:flex">
            <label className="w-full max-w-[420px]">
              <span className="sr-only">Search cakes</span>
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search cakes"
                className="h-11 w-full rounded-full border border-line bg-cream-soft/70 px-5 text-[14px] outline-none transition-colors placeholder:text-sage focus:border-sage/60"
              />
            </label>
          </form>

          <button
            type="button"
            onClick={() => {
              onClose()
              openBooking()
            }}
            className="inline-flex h-11 items-center rounded-full bg-orange px-5 text-[13px] font-medium text-cream shadow-[0_10px_22px_-12px_rgba(232,106,23,0.75)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-orange-deep hover:shadow-[0_16px_28px_-12px_rgba(232,106,23,0.85)] active:translate-y-0 active:scale-[0.97]"
          >
            Book a cake
          </button>
        </div>

        <div className="container-content py-6 md:hidden">
          <form onSubmit={submitSearch}>
            <label>
              <span className="sr-only">Search cakes</span>
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search cakes"
                className="h-11 w-full rounded-full border border-line bg-cream-soft/70 px-5 text-[14px] outline-none transition-colors placeholder:text-sage focus:border-sage/60"
              />
            </label>
          </form>
        </div>

        <div className="container-content grid flex-1 gap-12 py-10 md:py-14 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <nav aria-label="Site menu" className="space-y-10">
              <div>
                <p className="label">Shop</p>
                <ul className="mt-5 space-y-1">
                  {shopLinks.map((link, index) => (
                    <li
                      key={link.to}
                      className="menu-item"
                      style={{ '--i': index } as CSSProperties}
                    >
                      <Link
                        to={link.to}
                        onClick={onClose}
                        className="group flex w-full items-center justify-between gap-4 border-b border-line py-3"
                      >
                        <span className="font-display text-[clamp(26px,3vw,38px)] font-normal leading-none transition-colors group-hover:text-orange">
                          {link.label}
                        </span>
                        <span
                          aria-hidden="true"
                          className="text-sage transition-all duration-200 group-hover:translate-x-1 group-hover:text-orange"
                        >
                          →
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <p className="label">Explore</p>
                <ul className="mt-5 space-y-1">
                  {exploreLinks.map((link, index) => (
                    <li
                      key={link.to}
                      className="menu-item"
                      style={{ '--i': index + shopLinks.length } as CSSProperties}
                    >
                      <Link
                        to={link.to}
                        onClick={onClose}
                        className="group flex w-full items-center justify-between gap-4 border-b border-line py-3"
                      >
                        <span className="text-[16px] transition-colors group-hover:text-orange">
                          {link.label}
                        </span>
                        <span
                          aria-hidden="true"
                          className="text-sage transition-all duration-200 group-hover:translate-x-1 group-hover:text-orange"
                        >
                          →
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </nav>
          </div>

          <div className="grid gap-5 lg:col-span-5 lg:grid-cols-1">
            <Link
              to="/cakes"
              onClick={onClose}
              className="menu-card group relative h-full overflow-hidden rounded-md border border-line"
              style={{ '--i': 0 } as CSSProperties}
            >
              <div className="absolute inset-0 h-full w-full">
                <CakeTile cakeKey="anniversary-layer" alt="Signature cakes" aspect="4:5" photo={1} className="h-full w-full" />
                <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-chocolate-deep/75 via-chocolate-deep/20 to-transparent" />
                <div className="absolute inset-0 flex flex-col justify-between p-6 text-cream">
                  <span className="text-[11px] uppercase tracking-[0.18em] text-cream/70">Best of</span>
                  <span>
                    <span className="block font-display text-2xl leading-tight">
                      Signature cakes
                    </span>
                    <span className="mt-2 inline-block border-b border-cream/40 pb-0.5 text-[11px] uppercase tracking-[0.18em] transition-colors group-hover:border-orange group-hover:text-orange">
                      Discover
                    </span>
                  </span>
                </div>
              </div>
            </Link>
          </div>
        </div>

        <div className="border-t border-line">
          <div className="container-content flex flex-col items-center justify-between gap-4 py-5 text-[12px] text-ink-muted sm:flex-row">
            <Logo className="h-[22px]" />
            <a href={`mailto:${site.email}`} className="break-all hover:text-orange">
              {site.email}
            </a>
          </div>
        </div>
      </div>
    </dialog>
  )
}
