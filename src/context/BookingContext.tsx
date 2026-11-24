import { createContext, useCallback, useContext, useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import { BookingModal } from '../components/BookingModal'

type BookingContextValue = {
  openBooking: (cakeSlug?: string) => void
}

const BookingContext = createContext<BookingContextValue | null>(null)

export function BookingProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false)
  const [prefillCakeSlug, setPrefillCakeSlug] = useState<string | undefined>(undefined)

  const openBooking = useCallback((cakeSlug?: string) => {
    setPrefillCakeSlug(cakeSlug)
    setOpen(true)
  }, [])

  const close = useCallback(() => setOpen(false), [])

  const value = useMemo(() => ({ openBooking }), [openBooking])

  return (
    <BookingContext.Provider value={value}>
      {children}
      <BookingModal open={open} onClose={close} prefillCakeSlug={prefillCakeSlug} />
    </BookingContext.Provider>
  )
}

export function useBooking(): BookingContextValue {
  const ctx = useContext(BookingContext)
  if (!ctx) {
    throw new Error('useBooking must be used inside <BookingProvider>')
  }
  return ctx
}
