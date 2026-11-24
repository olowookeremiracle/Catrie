export type ContactPayload = {
  name: string
  email?: string
  phone?: string
  message: string
  /** Optional cake the visitor is asking about. */
  cakeSlug?: string
}

export type ContactResult = {
  ok: true
  /** Fake reference shown in demo mode. */
  reference: string
}

const delay = (ms: number) => new Promise<void>((resolve) => setTimeout(resolve, ms))

/**
 * Demo contact service — mirrors bookingService. Nothing is sent; a real
 * backend would swap in here without touching the form UI.
 */
export async function submitMessage(payload: ContactPayload): Promise<ContactResult> {
  await delay(700)
  const reference = `MSG-${String(Math.floor(1000 + Math.random() * 9000))}`
  void payload
  return { ok: true, reference }
}
