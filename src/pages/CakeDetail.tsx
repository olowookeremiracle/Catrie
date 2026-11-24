import { useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { PageShell } from '../components/PageShell'
import { Reveal } from '../components/Reveal'
import { CakeCard } from '../components/CakeCard'
import { CakeGallery } from '../components/CakeGallery'
import { WhatsAppIcon } from '../components/WhatsAppIcon'
import { useBooking } from '../context/BookingContext'
import { formatPrice, whatsappLink } from '../config/site'
import { categoryBySlug } from '../data/categories'
import { cakeBySlug, priceForSize } from '../data/cakes'
import { relatedCakes } from '../lib/catalog'
import { cn } from '../lib/cn'
import { useDocumentTitle } from '../hooks/useDocumentTitle'

const accordionItems = [
  {
    id: 'ingredients',
    title: 'Ingredients',
    body: 'Real butter, fresh eggs, single-origin cocoa and measured sugar. Flavour is always confirmed with you before anything goes in the oven, and we can leave an ingredient out where the build allows.',
  },
  {
    id: 'allergens',
    title: 'Allergens',
    body: 'Made in a kitchen that handles wheat, eggs, dairy, nuts and soy. We can adapt a flavour, but we cannot promise an allergen-free environment. Tell us about allergies when you book and we will talk you through it.',
  },
  {
    id: 'lead-time',
    title: 'Lead time',
    body: 'Two days minimum notice. The cake is baked the day before and finished by hand, so it is at its best when it reaches your table. Date changes are free while we have space.',
  },
]

export function CakeDetail() {
  const { slug } = useParams()
  const cake = slug ? cakeBySlug.get(slug) : undefined
  const { openBooking } = useBooking()
  useDocumentTitle(cake ? cake.name : 'Cake not found')

  const [sizeIndex, setSizeIndex] = useState(0)
  const [flavor, setFlavor] = useState(() => cake?.flavors[0] ?? '')
  const [open, setOpen] = useState(accordionItems[0]?.id ?? '')

  const related = useMemo(() => (slug ? relatedCakes(slug, 3) : []), [slug])
  const category = cake ? categoryBySlug.get(cake.category) : undefined

  // Unknown slug → 404, not a broken page.
  if (!cake) {
    return (
      <PageShell
        eyebrow="Cake"
        title="This cake isn’t on the menu"
        intro={`There’s no page for “${slug}”. It may have moved, or the link is old.`}
      >
        <div className="mt-10 flex flex-wrap gap-3">
          <Link to="/cakes" className="btn-primary">
            Back to all cakes
          </Link>
          <Link to="/contact" className="btn-secondary">
            Ask us about it
          </Link>
        </div>
      </PageShell>
    )
  }

  const price = priceForSize(cake, sizeIndex)

  return (
    <>
      <div className="pb-24 pt-[120px] md:pb-32 md:pt-[144px]">
        <div className="container-content">
          <nav aria-label="Breadcrumb" className="text-[12px] uppercase tracking-[0.16em] text-sage">
            <Link to="/cakes" className="transition-colors hover:text-orange">
              Cakes
            </Link>
            <span className="mx-2 text-sage/40">/</span>
            <span>{category?.name}</span>
          </nav>

          <div className="mt-8 grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
            {/* Gallery */}
            <div>
              <CakeGallery cakeKey={cake.image} name={cake.name} />
            </div>

            {/* Info */}
            <Reveal delay={100}>
              <div className="lg:sticky lg:top-28">
                <p className="label">{category?.name}</p>
                <h1 className="mt-4 text-[clamp(34px,4.5vw,56px)] font-light leading-[1.02] tracking-[-0.02em]">
                  {cake.name}
                </h1>
                <p className="mt-4 text-[16px] leading-[1.7] text-ink-muted">
                  {cake.summary}
                </p>

                <div className="mt-6 flex items-baseline gap-2">
                  <span className="text-[13px] uppercase tracking-[0.16em] text-sage">From</span>
                  <span className="font-display text-[28px] text-orange">{formatPrice(price)}</span>
                </div>

                {/* Size */}
                <fieldset className="mt-8">
                  <legend className="label mb-3">Size</legend>
                  <div className="flex flex-wrap gap-2">
                    {cake.sizes.map((size, i) => (
                      <button
                        key={size.label}
                        type="button"
                        onClick={() => setSizeIndex(i)}
                        aria-pressed={i === sizeIndex}
                        className={cn(
                          'rounded-full border px-4 py-2 text-[13px] font-medium transition-all duration-200',
                          i === sizeIndex
                            ? 'border-chocolate bg-chocolate text-cream shadow-[0_8px_18px_-10px_rgba(59,36,21,0.55)]'
                            : 'border-line text-ink-muted hover:-translate-y-0.5 hover:border-chocolate/30 hover:text-chocolate',
                        )}
                      >
                        {size.label}
                      </button>
                    ))}
                  </div>
                </fieldset>

                {/* Flavor */}
                <fieldset className="mt-6">
                  <legend className="label mb-3">Flavor</legend>
                  <div className="flex flex-wrap gap-2">
                    {cake.flavors.map((f) => (
                      <button
                        key={f}
                        type="button"
                        onClick={() => setFlavor(f)}
                        aria-pressed={f === flavor}
                        className={cn(
                          'rounded-full border px-4 py-2 text-[13px] font-medium transition-all duration-200',
                          f === flavor
                            ? 'border-orange bg-orange text-cream shadow-[0_8px_18px_-10px_rgba(232,106,23,0.6)]'
                            : 'border-line text-ink-muted hover:-translate-y-0.5 hover:border-chocolate/30 hover:text-chocolate',
                        )}
                      >
                        {f}
                      </button>
                    ))}
                  </div>
                </fieldset>

                <div className="mt-8 flex flex-wrap gap-3">
                  <button
                    type="button"
                    onClick={() => openBooking(cake.slug)}
                    className="btn-primary"
                  >
                    Book this cake
                  </button>
                  <a
                    href={whatsappLink(
                      `Hello Catrie, I'd like to ask about ${cake.name} (${cake.sizes[sizeIndex].label}, ${flavor}).`,
                    )}
                    target="_blank"
                    rel="noreferrer"
                    className="btn-secondary"
                  >
                    <WhatsAppIcon className="size-4" />
                    Ask on WhatsApp
                  </a>
                </div>

                <p className="mt-4 text-[13px] text-ink-muted">
                  {formatPrice(price)} · {cake.sizes[sizeIndex].label} · {flavor} · 2 days notice
                </p>

                <div className="mt-4 space-y-4 text-[14px] leading-[1.7] text-ink-muted">
                  <p>{cake.description}</p>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Accordion */}
          <div className="mx-auto mt-20 max-w-3xl">
            <h2 className="font-display text-[26px] font-light">Good to know</h2>
            <div className="mt-6 divide-y divide-line border-y border-line">
              {accordionItems.map((item) => (
                <div key={item.id}>
                  <button
                    type="button"
                    onClick={() => setOpen(open === item.id ? '' : item.id)}
                    aria-expanded={open === item.id}
                    className="flex w-full items-center justify-between py-5 text-left"
                  >
                    <span className="font-display text-[18px]">{item.title}</span>
                    <span
                      aria-hidden="true"
                      className={cn(
                        'text-orange transition-transform duration-300',
                        open === item.id ? 'rotate-45' : '',
                      )}
                    >
                      +
                    </span>
                  </button>
                  {open === item.id && (
                    <p className="pb-5 text-[14px] leading-[1.7] text-ink-muted">{item.body}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Related */}
      {related.length > 0 && (
        <section className="bg-cream-soft py-16 md:py-20">
          <div className="container-content">
            <Reveal className="flex items-end justify-between">
              <h2 className="font-display text-[clamp(24px,3vw,34px)] font-light">
                You may also like
              </h2>
              <Link to="/cakes" className="link-underline">
                See all →
              </Link>
            </Reveal>
            <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((c) => (
                <CakeCard key={c.slug} cake={c} compact />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  )
}
