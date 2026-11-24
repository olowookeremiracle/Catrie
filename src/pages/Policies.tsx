import { PageShell } from '../components/PageShell'
import { useDocumentTitle } from '../hooks/useDocumentTitle'

const sections = [
  {
    id: 'privacy',
    title: 'Privacy',
    body: 'We keep only what we need to make and deliver your order: your name, phone number, email if you share it, the cake details and the delivery address. Nothing is sold, and nothing is shared beyond what delivery requires. You can ask us to delete your details at any time by emailing us.',
  },
  {
    id: 'terms',
    title: 'Terms',
    body: 'Quotes are valid for seven days. An order is confirmed once the date and deposit are agreed. Because everything is baked to order, the design may vary slightly from a photograph — proportions, finish and seasonal ingredients can differ. We will always tell you before anything changes.',
  },
  {
    id: 'cancellation',
    title: 'Booking & cancellation',
    body: 'Orders need at least two days notice. Cancellations more than 48 hours before collection or delivery are refunded in full; inside 48 hours, the deposit covers ingredients already bought. Date changes are free when we have space.',
  },
  {
    id: 'allergens',
    title: 'Allergens',
    body: 'Our cakes are made in a kitchen that handles wheat, eggs, dairy, nuts and soy. We can leave an ingredient out, but we cannot promise an allergen-free environment. Tell us about allergies when you order and we will talk you through what is possible.',
  },
]

export function Policies() {
  useDocumentTitle('Policies')
  return (
    <PageShell
      eyebrow="Policies"
      title="The small print"
      intro="Plain answers about privacy, orders, cancellations and allergens."
    >
      <div className="mt-14 grid gap-12 lg:grid-cols-12">
        <nav aria-label="Policy sections" className="lg:col-span-3">
          <ul className="sticky top-28 space-y-3 text-[13px]">
            {sections.map((section) => (
              <li key={section.id}>
                <a
                  href={`#${section.id}`}
                  className="text-ink-muted transition-colors hover:text-orange"
                >
                  {section.title}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="lg:col-span-8 lg:col-start-5">
          <div className="space-y-12">
            {sections.map((section) => (
              <section key={section.id} id={section.id} className="scroll-mt-28">
                <h2 className="font-display text-[clamp(24px,2.6vw,32px)] font-light leading-tight">
                  {section.title}
                </h2>
                <p className="mt-4 max-w-[64ch] text-[15px] leading-[1.8] text-ink-muted">
                  {section.body}
                </p>
              </section>
            ))}
          </div>

          <p className="mt-14 border-t border-line pt-6 text-[12px] text-sage">
            Last updated: November 2026
          </p>
        </div>
      </div>
    </PageShell>
  )
}
