import { PageShell } from '../components/PageShell'
import { Reveal } from '../components/Reveal'
import { ContactForm } from '../components/ContactForm'
import { WhatsAppIcon } from '../components/WhatsAppIcon'
import { site, whatsappLink } from '../config/site'
import { useDocumentTitle } from '../hooks/useDocumentTitle'

export function Contact() {
  useDocumentTitle('Contact')
  return (
    <PageShell
      eyebrow="Contact"
      title="Tell us about the cake"
      intro="The quickest reply is on WhatsApp. Email works too — send the date, the occasion and any inspiration."
    >
      <div className="mt-14 grid gap-10 lg:grid-cols-12">
        <Reveal className="lg:col-span-5">
          <dl className="divide-y divide-line border-y border-line">
            <div className="flex items-baseline justify-between gap-8 py-5">
              <dt className="text-[11px] uppercase tracking-[0.18em] text-sage">
                WhatsApp
              </dt>
              <dd>
                <a
                  href={whatsappLink()}
                  target="_blank"
                  rel="noreferrer"
                  className="link-underline"
                >
                  <WhatsAppIcon className="size-3.5 text-orange" />
                  {site.whatsapp}
                </a>
              </dd>
            </div>
            <div className="flex items-baseline justify-between gap-8 py-5">
              <dt className="text-[11px] uppercase tracking-[0.18em] text-sage">
                Email
              </dt>
              <dd>
                <a href={`mailto:${site.email}`} className="link-underline">
                  {site.email}
                </a>
              </dd>
            </div>
            <div className="flex items-baseline justify-between gap-8 py-5">
              <dt className="text-[11px] uppercase tracking-[0.18em] text-sage">
                Writes to
              </dt>
              <dd className="text-right">{site.address}</dd>
            </div>
            <div className="flex items-baseline justify-between gap-8 py-5">
              <dt className="text-[11px] uppercase tracking-[0.18em] text-sage">
                Hours
              </dt>
              <dd className="text-right">{site.hours}</dd>
            </div>
            <div className="flex items-baseline justify-between gap-8 py-5">
              <dt className="text-[11px] uppercase tracking-[0.18em] text-sage">
                Lead time
              </dt>
              <dd className="text-right">{site.leadTimeDays} days minimum</dd>
            </div>
          </dl>

          <div className="mt-8 rounded-md bg-chocolate p-7 text-cream">
            <p className="text-[11px] uppercase tracking-[0.18em] text-cream/45">
              Fastest
            </p>
            <h2 className="mt-3 font-display text-[22px] font-light leading-tight">
              Message us on WhatsApp
            </h2>
            <p className="mt-2 text-[13px] leading-[1.7] text-cream/65">
              Send the date, how many people you&rsquo;re feeding, and a photo if
              you have one. We&rsquo;ll reply with options and a price.
            </p>
            <a
              href={whatsappLink()}
              target="_blank"
              rel="noreferrer"
              className="mt-5 inline-flex h-11 items-center gap-2.5 rounded-full bg-orange px-5 text-[13px] font-medium text-cream shadow-[0_10px_22px_-12px_rgba(232,106,23,0.75)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-orange-deep hover:shadow-[0_16px_28px_-12px_rgba(232,106,23,0.85)] active:translate-y-0 active:scale-[0.97]"
            >
              <WhatsAppIcon className="size-4" />
              Open WhatsApp
            </a>
          </div>
        </Reveal>

        <Reveal delay={120} className="lg:col-span-6 lg:col-start-7">
          <ContactForm />
        </Reveal>
      </div>
    </PageShell>
  )
}
