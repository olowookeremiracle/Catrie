import { PageShell } from '../components/PageShell'
import { Reveal } from '../components/Reveal'
import { useDocumentTitle } from '../hooks/useDocumentTitle'

const steps = [
  { n: '01', title: 'Choose or describe', text: 'Pick a cake from the collection, or bring us a sketch, a colour and a date.' },
  { n: '02', title: 'We confirm the details', text: 'Size, flavour, finish and timing — agreed before anything goes in the oven.' },
  { n: '03', title: 'Baked to order', text: 'Made in small batches the day before, then finished by hand.' },
]

export function About() {
  useDocumentTitle('About')
  return (
    <PageShell
      eyebrow="About Catrie"
      title="Baked slowly, on purpose"
      intro="A small cakery in Osun State, working to order rather than to a shelf."
    >
      {/* Owner profile */}
      <div className="mt-14 grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
        <Reveal className="lg:col-span-4">
          <div className="group relative overflow-hidden rounded-lg border border-line">
            <img
              src="/images/baker.webp"
              alt="Amara Okafor, founder and head baker at Catrie"
              className="h-full w-full object-cover transition-transform duration-700 ease-out-expo group-hover:scale-[1.03]"
            />
          </div>
        </Reveal>

        <Reveal delay={120} className="lg:col-span-7 lg:col-start-6">
          <p className="label">The baker</p>
          <h2 className="mt-4 font-display text-[clamp(28px,3.4vw,44px)] font-light leading-[1.04] tracking-[-0.02em]">
            Amara Okafor
          </h2>
          <p className="mt-2 text-[14px] uppercase tracking-[0.16em] text-sage">
            Founder &amp; head baker
          </p>
          <div className="mt-6 space-y-5 text-[16px] leading-[1.8] text-ink-muted">
            <p>
              Amara learned to bake at her grandmother&rsquo;s stove in Osun State,
              where every family occasion came with a cake. After studying pastry
              in London and working in small-batch ateliers for six years, she
              returned home to open Catrie — a kitchen built around the same
              unhurried standard.
            </p>
            <p>
              She still tastes every sponge the morning it is baked, and the
              finishing touches on each cake are done by her own hand, never
              before the day it reaches your table.
            </p>
          </div>
          <p className="mt-6 font-display text-[20px] italic text-chocolate">
            &ldquo;A cake should taste like it was made for the person
            receiving it.&rdquo;
          </p>
        </Reveal>
      </div>

      <div className="mt-20 grid gap-12 lg:grid-cols-12">
        <Reveal className="lg:col-span-7">
          <div className="space-y-6 text-[16px] leading-[1.8] text-ink-muted">
            <p>
              Catrie is built around a simple idea: a cake should taste like it
              was made for the person receiving it. That means real butter,
              measured sugar, and flavours chosen for the occasion rather than
              the shelf life.
            </p>
            <p>
              Every order starts with a conversation. We ask about the date, the
              number of guests, the table it will sit on, and the flavours the
              room will actually enjoy. Then we bake in small batches, finish by
              hand, and time the work so the cake is at its best when it arrives.
            </p>
            <p>
              We keep the collection small on purpose. Four categories, each one
              made to order, so nothing sits waiting and nothing is rushed.
            </p>
          </div>
        </Reveal>

        <Reveal delay={120} className="lg:col-span-4 lg:col-start-9">
          <div className="rounded-md border border-line bg-cream-soft/60 p-7">
            <p className="label">How it works</p>
            <ol className="mt-6 space-y-6">
              {steps.map((step) => (
                <li key={step.n}>
                  <span className="font-display text-[13px] text-sage">{step.n}</span>
                  <h2 className="mt-1 font-display text-[18px] leading-tight">
                    {step.title}
                  </h2>
                  <p className="mt-2 text-[13px] leading-[1.7] text-ink-muted">
                    {step.text}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </Reveal>
      </div>
    </PageShell>
  )
}
