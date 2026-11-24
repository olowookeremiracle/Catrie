import { useSearchParams } from 'react-router-dom'
import { categories } from '../data/categories'
import { sortOptions } from '../lib/catalog'
import type { SortKey } from '../lib/catalog'
import { cn } from '../lib/cn'

type FilterBarProps = {
  /** When true, the category chips drive the filter. */
  showCategories?: boolean
}

export function FilterBar({ showCategories = true }: FilterBarProps) {
  const [params, setParams] = useSearchParams()
  const activeCategory = params.get('category') || undefined
  const sort = (params.get('sort') as SortKey) || 'featured'

  const setCategory = (slug: string | undefined) => {
    const next = new URLSearchParams(params)
    if (slug) next.set('category', slug)
    else next.delete('category')
    setParams(next, { replace: true })
  }

  const setSort = (value: SortKey) => {
    const next = new URLSearchParams(params)
    if (value === 'featured') next.delete('sort')
    else next.set('sort', value)
    setParams(next, { replace: true })
  }

  const setSearch = (value: string) => {
    const q = value.trim()
    const next = new URLSearchParams(params)
    if (q) next.set('q', q)
    else next.delete('q')
    setParams(next, { replace: true })
  }

  const searchTerm = params.get('q') || ''

  return (
    <div className="space-y-5">
      {showCategories && (
        <div className="-mx-5 flex items-center gap-2 overflow-x-auto px-5 sm:mx-0 sm:px-0">
          <button
            type="button"
            onClick={() => setCategory(undefined)}
            aria-pressed={!activeCategory}
            className={cn(
              'shrink-0 rounded-full border px-4 py-2 text-[13px] font-medium transition-all duration-200',
              activeCategory
                ? 'border-line text-ink-muted hover:-translate-y-0.5 hover:border-chocolate/30 hover:text-chocolate'
                : 'border-chocolate bg-chocolate text-cream shadow-[0_8px_18px_-10px_rgba(59,36,21,0.6)] hover:-translate-y-0.5 hover:shadow-[0_12px_24px_-10px_rgba(59,36,21,0.7)]',
            )}
          >
            All
          </button>
          {categories.map((category) => (
            <button
              key={category.slug}
              type="button"
              onClick={() => setCategory(category.slug)}
              aria-pressed={activeCategory === category.slug}
              className={cn(
                'shrink-0 rounded-full border px-4 py-2 text-[13px] font-medium transition-all duration-200',
                activeCategory === category.slug
                  ? 'border-chocolate bg-chocolate text-cream shadow-[0_8px_18px_-10px_rgba(59,36,21,0.6)]'
                  : 'border-line text-ink-muted hover:-translate-y-0.5 hover:border-chocolate/30 hover:text-chocolate',
              )}
            >
              {category.name}
            </button>
          ))}
        </div>
      )}

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-1 items-center gap-3 sm:max-w-sm">
          <label className="relative flex-1">
            <span className="sr-only">Search cakes</span>
            <input
              name="q"
              value={searchTerm}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search by name or flavor"
              className="h-11 w-full rounded-full border border-line bg-cream px-5 pr-10 text-[14px] outline-none transition-colors placeholder:text-sage focus:border-sage/60"
            />
            <span aria-hidden="true" className="absolute right-4 top-1/2 -translate-y-1/2 text-sage">
              ⌕
            </span>
          </label>
          {searchTerm && (
            <button
              type="button"
              onClick={() => setSearch('')}
              aria-label="Clear search"
              className="rounded-full border border-line px-3 py-1 text-[13px] text-sage transition-all duration-200 hover:-translate-y-0.5 hover:border-chocolate/30 hover:text-chocolate"
            >
              Clear
            </button>
          )}
        </div>

        <div className="flex items-center gap-3">
          <label className="text-[12px] uppercase tracking-[0.16em] text-sage" htmlFor="sort">
            Sort
          </label>
          <select
            id="sort"
            value={sort}
            onChange={(event) => setSort(event.target.value as SortKey)}
            className="h-10 rounded-full border border-line bg-cream px-4 text-[13px] font-medium text-chocolate outline-none transition-colors focus:border-sage/60"
          >
            {sortOptions.map((option) => (
              <option key={option.key} value={option.key}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  )
}
