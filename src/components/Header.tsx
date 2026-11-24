import { useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { useScrolled } from '../hooks/useScrolled'
import { cn } from '../lib/cn'
import { useBooking } from '../context/BookingContext'
import { Logo } from './Logo'
import { MenuOverlay } from './MenuOverlay'

const navItems = [
  { label: 'Home', to: '/' },
  { label: 'Cakes', to: '/cakes' },
  { label: 'Categories', to: '/categories' },
  { label: 'About', to: '/about' },
  { label: 'Contact', to: '/contact' },
]

export function Header() {
  const scrolled = useScrolled(24)
  const { pathname } = useLocation()
  const [menuOpen, setMenuOpen] = useState(false)
  const { openBooking } = useBooking()

  const solid = scrolled || pathname !== '/'

  return (
    <>
      <header
        className={cn(
          'fixed inset-x-0 top-0 z-40 border-b transition-colors duration-300',
          solid
            ? 'border-line bg-cream/92 backdrop-blur-md'
            : 'border-transparent bg-transparent',
        )}
      >
        <div className="container-content flex h-[88px] items-center justify-between gap-8">
          <Logo className="h-[30px] md:h-[34px]" />

          <nav aria-label="Primary" className="hidden items-center gap-9 lg:flex">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  cn(
                    'relative text-[13px] font-medium tracking-[0.04em] transition-colors duration-200 hover:text-orange',
                    isActive ? 'text-orange' : 'text-chocolate',
                  )
                }
              >
                {({ isActive }) => (
                  <>
                    {item.label}
                    <span
                      aria-hidden="true"
                      className={cn(
                        'absolute -bottom-1.5 left-0 h-px w-full origin-left bg-orange transition-transform duration-300 ease-out-expo',
                        isActive ? 'scale-x-100' : 'scale-x-0',
                      )}
                    />
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => openBooking()}
              className="hidden h-11 items-center rounded-full bg-orange px-5 text-[13px] font-medium text-cream shadow-[0_10px_22px_-12px_rgba(232,106,23,0.75)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-orange-deep hover:shadow-[0_16px_28px_-12px_rgba(232,106,23,0.85)] active:translate-y-0 active:scale-[0.97] sm:inline-flex"
            >
              Book a cake
            </button>

            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
              className="group inline-flex items-center gap-2.5 text-[12px] font-medium uppercase tracking-[0.16em]"
            >
              <span aria-hidden="true" className="grid gap-[5px]">
                <span className="h-px w-5 bg-current transition-transform duration-200 group-hover:translate-x-0.5" />
                <span className="h-px w-5 bg-current transition-transform duration-200 group-hover:-translate-x-0.5" />
              </span>
              <span className="hidden sm:inline">Menu</span>
            </button>
          </div>
        </div>
      </header>

      <MenuOverlay open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  )
}
