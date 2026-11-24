import { site } from '../config/site'

export type BookingPayload = {
  name: string
  phone: string
  email?: string
  cakeSlug?: string
  cakeName?: string
  sizeLabel?: string
  flavor?: string
  quantity: number
  date: string
  notes?: string
}

export type BookingResult = {
  ok: true
  /** Fake reference shown in demo mode. */
  reference: string
}

const delay = (ms: number) => new Promise<void>((resolve) => setTimeout(resolve, ms))

/**
 * Demo booking service. Simulates a round-trip and returns a fake reference.
 * When a real API exists, this is the only file that changes — the payload and
 * result shapes stay the same so the UI keeps working untouched.
 */
export async function submitBooking(payload: BookingPayload): Promise<BookingResult> {
  await delay(900)
  const reference = `CAT-${String(Math.floor(1000 + Math.random() * 9000))}`
  // In demo mode we never transmit anything. A real implementation would:
  //   await fetch('/api/booking', { method: 'POST', body: JSON.stringify(payload) })
  void payload
  void site.demoMode
  return { ok: true, reference }
}
