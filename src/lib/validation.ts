export type ContactField = 'name' | 'phone' | 'email'

/**
 * Shared validation rules. Pure, framework-free — usable by the booking
 * modal, the contact form, and any future server-side port.
 */

export function isRequired(value: string | undefined | null): boolean {
  return typeof value === 'string' && value.trim().length > 0
}

/** Loose phone: 8–15 digits, optional +, spaces or dashes allowed. */
export function isPhone(value: string): boolean {
  const digits = value.replace(/[^\d]/g, '')
  return digits.length >= 8 && digits.length <= 15
}

/** Empty is fine; non-empty must look like an email. */
export function isEmail(value: string): boolean {
  if (!value.trim()) return true
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())
}

export function minDateGapHours(value: string): number {
  if (!value) return 0
  const then = new Date(value).getTime()
  if (Number.isNaN(then)) return 0
  return (then - Date.now()) / 3_600_000
}

export function isNotesTooLong(value: string, max = 280): boolean {
  return value.length > max
}

export type FieldErrors = Partial<Record<ContactField | 'date' | 'notes' | 'size' | 'flavor' | 'quantity' | 'cake', string>>
