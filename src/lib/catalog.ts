import { cakes, cakeBySlug } from '../data/cakes'
import { categories, categoryBySlug } from '../data/categories'

export type SortKey = 'featured' | 'price-asc' | 'price-desc'

export const sortOptions: Array<{ key: SortKey; label: string }> = [
  { key: 'featured', label: 'Featured' },
  { key: 'price-asc', label: 'Price: low to high' },
  { key: 'price-desc', label: 'Price: high to low' },
]

export type CatalogQuery = {
  /** Category slug, or undefined for all. */
  category?: string
  /** Search term. */
  query?: string
  sort?: SortKey
}

export function parseCatalogQuery(params: URLSearchParams): CatalogQuery {
  return {
    category: normalizeCategory(params.get('category')),
    query: params.get('q')?.trim() || undefined,
    sort: isSortKey(params.get('sort')) ? params.get('sort') as SortKey : undefined,
  }
}

function normalizeCategory(value: string | null | undefined): string | undefined {
  if (!value) return undefined
  return categoryBySlug.has(value) ? value : undefined
}

export function isSortKey(value: string | null | undefined): value is SortKey {
  return value === 'featured' || value === 'price-asc' || value === 'price-desc'
}

export function catalogQueryToParams(query: CatalogQuery): URLSearchParams {
  const params = new URLSearchParams()
  if (query.category) params.set('category', query.category)
  if (query.query) params.set('q', query.query)
  if (query.sort && query.sort !== 'featured') params.set('sort', query.sort)
  return params
}

function matchesQuery(cakeName: string, flavors: string[], term: string): boolean {
  const hay = `${cakeName} ${flavors.join(' ')}`.toLowerCase()
  const needle = term.toLowerCase()
  return needle
    .split(/\s+/)
    .filter(Boolean)
    .every((word) => hay.includes(word))
}

export function filterCakes(query: CatalogQuery) {
  let result = cakes

  if (query.category) {
    result = result.filter((cake) => cake.category === query.category)
  }

  if (query.query) {
    result = result.filter((cake) => matchesQuery(cake.name, cake.flavors, query.query!))
  }

  const sort = query.sort ?? 'featured'
  result = [...result].sort((a, b) => {
    if (sort === 'price-asc') return a.basePrice - b.basePrice
    if (sort === 'price-desc') return b.basePrice - a.basePrice
    // featured: featured first, then by name
    if (a.featured !== b.featured) return a.featured ? -1 : 1
    return a.name.localeCompare(b.name)
  })

  return result
}

export function relatedCakes(slug: string, limit = 4) {
  const cake = cakeBySlug.get(slug)
  if (!cake) return []
  const inSameCategory = cakes
    .filter((other) => other.slug !== slug && other.category === cake.category)
  const others = cakes
    .filter((other) => other.slug !== slug && other.category !== cake.category)
    .filter((other) => other.featured)
  return [...inSameCategory, ...others].slice(0, limit)
}

export function categoryForCakesPage(slug?: string) {
  return categories.find((c) => c.slug === slug)
}
