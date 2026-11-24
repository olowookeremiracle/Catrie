import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Reveal } from '../components/Reveal'
import { Marquee } from '../components/Marquee'
import { CategoryCard } from '../components/CategoryCard'
import { CakeCard } from '../components/CakeCard'
import { SectionHeading } from '../components/SectionHeading'
import { CakeTile } from '../components/CakeTile'
import { useBooking } from '../context/BookingContext'
import { categoryCounts, featuredCakes } from '../data/cakes'
import { testimonials } from '../data/testimonials'
import { cn } from '../lib/cn'
import { useDocumentTitle } from '../hooks/useDocumentTitle'

const heroSlides = [
  {
    key: 'anniversary-layer',
    name: 'The Anniversary Layer',
    caption: 'Three tiers of vanilla bean and salted caramel.',
  },
  {
    key: 'three-tier-ivory',
    name: 'The Three-Tier Ivory',
    caption: 'A quiet centrepiece, finished in smooth ivory.',
  },
  {
    key: 'the-sketch',
    name: 'The Sketch',
    caption: 'Something drawn on paper first, then baked.',
  },
  {
    key: 'two-tier-blush',
    name: 'The Two-Tier Blush',
    caption: 'A soft, layered centrepiece in blush tones.',
  },
  {
    key: 'chocolate-midnight',
    name: 'Chocolate Midnight',
    caption: 'Deep cocoa layers with a glossy dark ganache drip.',
  },
]

const flavorWords = [
  'Vanilla bean',
  'Salted caramel',
  'Dark chocolate',
  'Lemon curd',
  'Raspberry',
  'Hazelnut praline',
  'Strawberry',
  'Almond',
]

export function Home() {
  const [active, setActive] = useState(0)
  const { openBooking } = useBooking()
  useDocumentTitle()

  useEffect(() => {
    const id = setInterval(() => setActive((i) => (i + 1) % heroSlides.length), 5200)
    return () => clearInterval(id)
  }, [])

  const slide = heroSlides[active]

  return (
    <>
      <section className="pb-16 pt-[132px] md:pb-24 md:pt-[168px]">
        <div className="container-content grid items-center gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20">
          <div key={slide.key} className="hero-swap">
            <p className="label">Cakery · Osun State</p>
            <h1 className="mt-6 text-[clamp(42px,6.6vw,92px)] font-light leading-[0.98] tracking-[-0.03em]">
              Cakes for the days you&rsquo;ll{' '}
              <em className="italic text-orange">remember</em>.
            </h1>
            <p className="mt-7 max-w-[46ch] text-[16px] leading-[1.7] text-ink-muted md:text-[17px]">
              {slide.caption} Celebration, wedding, cupcake and custom cakes —
              baked to order in small batches, in Osun State.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-x-7 gap-y-4">
              <Link to="/cakes" className="btn-primary">
                See the cakes
              </Link>
              <button
                type="button"
                onClick={() => openBooking()}
                className="link-underline"
              >
                Book a cake
              </button>
            </div>

            <div className="mt-10 flex items-center gap-2">
              {heroSlides.map((s, index) => (
                <button
                  key={s.key}
                  type="button"
                  onClick={() => setActive(index)}
                  aria-label={`Show ${s.name}`}
                  className={cn(
                    'h-1 rounded-full transition-all duration-500',
                    index === active ? 'w-7 bg-orange' : 'w-4 bg-chocolate/20 hover:bg-chocolate/40',
                  )}
                />
              ))}
            </div>
          </div>

          <figure className="relative">
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-lg border border-line bg-cream-soft">
              {heroSlides.map((s, index) => (
                <div key={s.key} className="h-full w-full">
                  <div
                    className={cn(
                      'absolute inset-0 h-full w-full transition-opacity duration-[900ms] ease-out-expo',
                      index === active ? 'opacity-100' : 'pointer-events-none opacity-0',
                    )}
                  >
                    <CakeTile cakeKey={s.key} alt={s.name} aspect="4:5" photo={1} />
                  </div>
                </div>
              ))}
            </div>
            <figcaption className="mt-4 flex items-center justify-between text-[11px] uppercase tracking-[0.18em] text-sage">
              <span>{slide.name}</span>
              <span>
                {String(active + 1).padStart(2, '0')} /{' '}
                {String(heroSlides.length).padStart(2, '0')}
              </span>
            </figcaption>
          </figure>
        </div>
      </section>

      <Marquee items={flavorWords} />

      <section className="py-20 md:py-28">
        <div className="container-content">
          <SectionHeading
            eyebrow="Browse by occasion"
            title="Pick a category, start the conversation"
            intro="Four families of cake, each made to order. Choose the one that matches the day."
          />
          <div className="mt-12 grid gap-5 sm:grid-cols-2">
            {categoryCounts.map((category, index) => (
              <Reveal key={category.slug} delay={index * 70}>
                <CategoryCard category={category} count={category.count} index={index} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-cream-soft py-20 md:py-28">
        <div className="container-content">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeading
              eyebrow="Signature"
              title="The cakes people ask for by name"
              className="max-w-[30ch]"
            />
            <Reveal delay={120}>
              <Link to="/cakes" className="link-underline">
                See all cakes →
              </Link>
            </Reveal>
          </div>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {featuredCakes.slice(0, 4).map((cake, index) => (
              <Reveal key={cake.slug} delay={index * 70}>
                <CakeCard cake={cake} compact />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28">
        <div className="container-content grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <Reveal>
            <CakeTile cakeKey="the-heirloom" alt="The Heirloom, a sculptural centrepiece" aspect="4:5" photo={1} />
          </Reveal>
          <Reveal delay={100}>
            <SectionHeading
              eyebrow="Our way"
              title="Baked slowly, on purpose"
              intro="A cake should taste like it was made for the person receiving it."
            />
            <div className="mt-6 space-y-5 text-[15px] leading-[1.8] text-ink-muted">
              <p>
                That means real butter, measured sugar, and flavours chosen for
                the occasion rather than the shelf life. Every order starts with
                a conversation: the date, the guests, the table it will sit on.
              </p>
              <p>
                Then we bake in small batches, finish by hand, and time the work
                so the cake is at its best the moment it arrives.
              </p>
            </div>
            <Link to="/about" className="link-underline mt-7">
              Read our story
            </Link>
          </Reveal>
        </div>
      </section>

      <section className="bg-chocolate py-20 text-cream md:py-28">
        <div className="container-content">
          <Reveal>
            <p className="text-[11px] uppercase tracking-[0.18em] text-cream/45">
              From the table
            </p>
          </Reveal>
          <div className="mt-10 grid gap-8 md:grid-cols-2">
            {testimonials.map((item, index) => (
              <Reveal key={item.name} delay={index * 80}>
                <blockquote className="border-l-2 border-orange/60 pl-6">
                  <p className="font-display text-[clamp(18px,2vw,24px)] font-light leading-[1.5]">
                    &ldquo;{item.quote}&rdquo;
                  </p>
                  <footer className="mt-5 text-[13px] text-cream/55">
                    {item.name}
                    <span className="mx-2 text-cream/30">·</span>
                    {item.detail}
                  </footer>
                </blockquote>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28">
        <div className="container-content">
          <Reveal className="mx-auto flex max-w-2xl flex-col items-center text-center">
            <p className="label">Ready when you are</p>
            <h2 className="mt-4 text-[clamp(32px,4.4vw,56px)] font-light leading-[1.02] tracking-[-0.02em]">
              Tell us the day. We will bring the cake.
            </h2>
            <p className="mt-5 max-w-[46ch] text-[15px] leading-[1.7] text-ink-muted">
              Two days notice is all we need. Send the occasion, the date and the
              headcount, and we will reply with options and a price.
            </p>
            <div className="mt-9 flex flex-wrap justify-center gap-3">
              <Link to="/contact" className="btn-primary">
                Book a cake
              </Link>
              <Link to="/cakes" className="btn-secondary">
                Browse the collection
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}
