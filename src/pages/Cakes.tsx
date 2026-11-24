import { useSearchParams } from 'react-router-dom'
import { PageShell } from '../components/PageShell'
import { Reveal } from '../components/Reveal'
import { FilterBar } from '../components/FilterBar'
import { CakeCard } from '../components/CakeCard'
import { EmptyState } from '../components/EmptyState'
import { parseCatalogQuery, filterCakes } from '../lib/catalog'
import { categoryForCakesPage } from '../lib/catalog'
import { useDocumentTitle } from '../hooks/useDocumentTitle'

export function Cakes() {
  const [params] = useSearchParams()
  const query = parseCatalogQuery(params)
  const results = filterCakes(query)
  const activeCategory = query.category ? categoryForCakesPage(query.category) : undefined
  useDocumentTitle(activeCategory ? `${activeCategory.name} cakes` : 'Cakes')

  const title = activeCategory
    ? `${activeCategory.name} cakes`
    : 'The full counter'

  const intro = activeCategory
    ? activeCategory.blurb
    : 'Every cake is baked to order. Filter by category, search by name or flavor, and sort by price — or just tell us what you are dreaming of.'

  return (
    <PageShell eyebrow="All cakes" title={title} intro={intro}>
      <Reveal className="mt-12">
        <FilterBar />
      </Reveal>

      <div className="mt-10">
        {results.length > 0 ? (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {results.map((cake, index) => (
              <Reveal key={cake.slug} delay={Math.min(index, 5) * 70}>
                <CakeCard cake={cake} />
              </Reveal>
            ))}
          </div>
        ) : (
          <EmptyState />
        )}
      </div>

      {results.length > 0 && (
        <p className="mt-8 text-[13px] text-ink-muted">
          Showing {results.length} {results.length === 1 ? 'cake' : 'cakes'}
          {activeCategory ? ` in ${activeCategory.name.toLowerCase()}` : ''}.
        </p>
      )}
    </PageShell>
  )
}
