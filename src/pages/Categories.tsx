import { PageShell } from '../components/PageShell'
import { Reveal } from '../components/Reveal'
import { CategoryCard } from '../components/CategoryCard'
import { categoryCounts } from '../data/cakes'
import { useDocumentTitle } from '../hooks/useDocumentTitle'

export function Categories() {
  useDocumentTitle('Categories')
  return (
    <PageShell
      eyebrow="The collection"
      title="Four ways to choose"
      intro="Start with the occasion. Every cake is made to order, so the details are yours to set."
    >
      <div className="mt-14 grid gap-5 sm:grid-cols-2">
        {categoryCounts.map((category, index) => (
          <Reveal key={category.slug} delay={index * 80}>
            <CategoryCard category={category} count={category.count} index={index} />
          </Reveal>
        ))}
      </div>
    </PageShell>
  )
}
