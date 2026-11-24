import { useEffect } from 'react'
import { site } from '../config/site'

/**
 * Sets the document title per route. Falls back to the site title when empty.
 */
export function useDocumentTitle(title?: string) {
  useEffect(() => {
    document.title = title ? `${title} — ${site.name}` : `${site.name} — ${site.tagline}`
  }, [title])
}
