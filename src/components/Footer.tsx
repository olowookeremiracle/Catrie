import { Link } from 'react-router-dom'
import { site, whatsappLink } from '../config/site'
import { Logo } from './Logo'
import { WhatsAppIcon } from './WhatsAppIcon'

const shopLinks = [
  { label: 'All cakes', to: '/cakes' },
  { label: 'Celebration', to: '/cakes?category=celebration' },
  { label: 'Wedding', to: '/cakes?category=wedding' },
  { label: 'Cupcakes', to: '/cakes?category=cupcakes' },
  { label: 'Custom', to: '/cakes?category=custom' },
]

const exploreLinks = [
  { label: 'About', to: '/about' },
  { label: 'Contact', to: '/contact' },
  { label: 'Policies', to: '/policies' },
]

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-chocolate text-cream">
      <div className="container-content py-16 md:py-20">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Logo dark className="h-[38px]" />
            <p className="mt-5 max-w-[36ch] text-[14px] leading-[1.7] text-cream/65">
              Celebration, wedding, cupcake and custom cakes — baked to order in
              small batches.
            </p>
            <a
              href={whatsappLink()}
              target="_blank"
              rel="noreferrer"
              className="mt-7 inline-flex items-center gap-2 border-b border-cream/30 pb-1 text-[13px] font-medium transition-colors hover:border-orange hover:text-orange"
            >
              <WhatsAppIcon className="size-4" />
              Chat on WhatsApp
              <span aria-hidden="true">→</span>
            </a>
          </div>

          <nav aria-label="Shop" className="lg:col-span-3">
            <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-cream/45">
              Shop
            </p>
            <ul className="mt-5 space-y-3 text-[14px] text-cream/80">
              {shopLinks.map((link) => (
                <li key={link.to}>
                  <Link to={link.to} className="transition-colors hover:text-orange">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Explore" className="lg:col-span-2">
            <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-cream/45">
              Explore
            </p>
            <ul className="mt-5 space-y-3 text-[14px] text-cream/80">
              {exploreLinks.map((link) => (
                <li key={link.to}>
                  <Link to={link.to} className="transition-colors hover:text-orange">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="lg:col-span-2">
            <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-cream/45">
              Contact
            </p>
            <ul className="mt-5 space-y-3 text-[14px] text-cream/80">
              <li>
                <a
                  href={whatsappLink()}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 transition-colors hover:text-orange"
                >
                  <WhatsAppIcon className="size-3.5" />
                  WhatsApp
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${site.email}`}
                  className="break-words transition-colors hover:text-orange"
                >
                  {site.email}
                </a>
              </li>
              <li>{site.address}</li>
              <li className="text-cream/50">{site.hours}</li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-cream/15 pt-6 text-[12px] text-cream/45 md:flex-row md:items-center md:justify-between">
          <p>© {year} Catrie. Baked to order in Osun State.</p>
          <div className="flex flex-wrap gap-6">
            <Link to="/policies#privacy" className="hover:text-cream">
              Privacy
            </Link>
            <Link to="/policies#terms" className="hover:text-cream">
              Terms
            </Link>
            <Link to="/policies#cancellation" className="hover:text-cream">
              Cancellation
            </Link>
            <Link to="/policies#allergens" className="hover:text-cream">
              Allergens
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
