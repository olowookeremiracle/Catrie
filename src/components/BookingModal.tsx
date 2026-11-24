import { useEffect, useRef, useState } from 'react'
import type { FormEvent, ReactNode } from 'react'
import { useSearchParams } from 'react-router-dom'
import { site, whatsappLink, formatPrice } from '../config/site'
import { WhatsAppIcon } from './WhatsAppIcon'
import { cakes, cakeBySlug, priceForSize } from '../data/cakes'
import type { Cake } from '../data/cakes'
import { isEmail, isPhone, isRequired, isNotesTooLong, minDateGapHours } from '../lib/validation'
import { submitBooking } from '../services/bookingService'

type BookingModalProps = {
  open: boolean
  onClose: () => void
  /** Preselect a cake when opening from a card / detail page. */
  prefillCakeSlug?: string
}

type Status = 'idle' | 'loading' | 'success'

export function BookingModal({ open, onClose, prefillCakeSlug }: BookingModalProps) {
  const [params] = useSearchParams()
  const dialogRef = useRef<HTMLDialogElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)

  const urlCakeSlug = params.get('cake') ?? undefined
  const initialSlug = prefillCakeSlug || urlCakeSlug
  const initialCake = initialSlug ? cakeBySlug.get(initialSlug) : undefined

  const [status, setStatus] = useState<Status>('idle')
  const [reference, setReference] = useState('')

  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [cakeSlug, setCakeSlug] = useState<string>(initialCake?.slug ?? '')
  const [sizeIndex, setSizeIndex] = useState(0)
  const [flavor, setFlavor] = useState('')
  const [quantity, setQuantity] = useState(1)
  const [date, setDate] = useState('')
  const [notes, setNotes] = useState('')
  const [errors, setErrors] = useState<Record<string, string>>({})

  const selectedCake = cakeBySlug.get(cakeSlug)
  const minDate = new Date(Date.now() + 48 * 3_600_000)
  const minDateStr = minDate.toISOString().slice(0, 10)

  // Keep the native dialog in step with React state, and reset on each open.
  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return
    if (open && !dialog.open) {
      setStatus('idle')
      setErrors({})
      dialog.showModal()
    }
    if (!open && dialog.open) dialog.close()
  }, [open])

  // When the prefill changes while open, follow it.
  useEffect(() => {
    if (!open) return
    if (initialCake) {
      setCakeSlug(initialCake.slug)
      if (!flavor || !initialCake.flavors.includes(flavor)) setFlavor(initialCake.flavors[0])
    }
  }, [open, initialCake, flavor])

  // Scroll lock while the modal is open.
  useEffect(() => {
    if (!open) return
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = previous
    }
  }, [open])

  const cakeOptions = cakes.filter((c) => !c.featured || c.featured)

  const onCakeChange = (slug: string) => {
    setCakeSlug(slug)
    const next = cakeBySlug.get(slug)
    setSizeIndex(0)
    setFlavor(next ? next.flavors[0] : '')
  }

  const validate = () => {
    const next: Record<string, string> = {}
    if (!isRequired(name)) next.name = 'Please add your name.'
    if (!isRequired(phone)) next.phone = 'A phone number is required.'
    else if (!isPhone(phone)) next.phone = 'Enter a valid phone number (8–15 digits).'
    if (!isEmail(email)) next.email = 'Enter a valid email, or leave it blank.'
    if (!cakeSlug) next.cake = 'Pick a cake.'
    if (!flavor) next.flavor = 'Pick a flavor.'
    if (quantity < 1) next.quantity = 'At least one.'
    if (!date) next.date = 'Choose the date you need it by.'
    else if (minDateGapHours(date) < 48) next.date = 'We need at least 48 hours notice.'
    if (isNotesTooLong(notes)) next.notes = 'Keep notes under 280 characters.'
    setErrors(next)
    return Object.keys(next).length === 0
  }

  const submit = async (event: FormEvent) => {
    event.preventDefault()
    if (!validate()) return
    setStatus('loading')
    const result = await submitBooking({
      name,
      phone,
      email: email || undefined,
      cakeSlug,
      cakeName: selectedCake?.name,
      sizeLabel: selectedCake ? selectedCake.sizes[sizeIndex].label : undefined,
      flavor,
      quantity,
      date,
      notes: notes || undefined,
    })
    setReference(result.reference)
    setStatus('success')
  }

  const close = () => onClose()

  const price = selectedCake ? priceForSize(selectedCake, sizeIndex) * quantity : 0

  const field = (label: string, key: string, children: ReactNode, extra?: ReactNode) => (
    <div>
      <label className="label mb-2 block" htmlFor={key}>
        {label}
      </label>
      {children}
      {errors[key] ? (
        <p id={`${key}-error`} role="alert" className="field-error mt-1.5 text-[13px] text-orange">
          {errors[key]}
        </p>
      ) : null}
      {extra}
    </div>
  )

  return (
    <dialog
      ref={dialogRef}
      onClose={onClose}
      onCancel={onClose}
      onClick={(event) => {
        if (event.target === dialogRef.current) close()
      }}
      className="booking-dialog fixed inset-0 m-0 h-dvh w-full max-w-none overflow-hidden p-0 text-chocolate"
      aria-label="Book a cake"
    >
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="booking-title"
        className="booking-panel relative my-auto flex max-h-[calc(100dvh-48px)] w-[min(440px,calc(100vw-32px))] flex-col overflow-hidden rounded-lg bg-cream shadow-[0_30px_80px_-20px_rgba(42,24,16,0.5)]"
      >
        {/* Header */}
        <div className="flex items-center justify-between gap-4 border-b border-line px-6 py-5">
          <div>
            <p className="text-[11px] uppercase tracking-[0.18em] text-sage">
              {status === 'success' ? 'Booking' : 'Book a cake'}
            </p>
            <h2 id="booking-title" className="mt-1 font-display text-[24px] font-light leading-tight">
              {status === 'success' ? 'Request received' : selectedCake ? selectedCake.name : 'Start a request'}
            </h2>
          </div>
          <button
            type="button"
            onClick={close}
            aria-label="Close"
            className="grid size-9 shrink-0 place-items-center rounded-full border border-line text-[16px] text-ink-muted transition-colors hover:border-chocolate hover:text-chocolate"
          >
            ×
          </button>
        </div>

        {status === 'success' ? (
          <div className="success-pop flex flex-col items-center px-7 py-10 text-center">
            <div className="grid size-14 place-items-center rounded-full bg-sage-soft text-sage">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="check-draw size-7">
                <path d="m5 13 4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <p className="mt-5 max-w-[34ch] text-[14px] leading-[1.7] text-ink-muted">
              Thanks, {name || 'friend'}. We&rsquo;ve noted your request and will
              reply on WhatsApp with options and a price.
            </p>
            <p className="mt-3 text-[12px] text-sage">Reference {reference}</p>
            <div className="mt-7 flex w-full flex-col gap-2.5">
              <button type="button" onClick={close} className="btn-primary w-full">
                Done
              </button>
              <a
                href={whatsappLink(`Hello Catrie, I just requested a booking (ref ${reference}).`)}
                target="_blank"
                rel="noreferrer"
                className="btn-secondary w-full"
              >
                <WhatsAppIcon className="size-4" />
                Message us on WhatsApp
              </a>
            </div>
            {site.demoMode && (
              <p className="mt-4 text-[11px] uppercase tracking-[0.16em] text-sage/60">
                Demo — nothing was sent
              </p>
            )}
          </div>
        ) : (
          <>
            <form id="bk-form" onSubmit={submit} className="flex-1 overflow-y-auto px-6 py-5">
              <div className="space-y-4">
                {field(
                  'Your name',
                  'bk-name',
                  <input
                    id="bk-name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    aria-invalid={!!errors.name}
                    className="form-input"
                  />,
                )}

                <div className="grid grid-cols-2 gap-3">
                  {field(
                    'Phone',
                    'bk-phone',
                    <input
                      id="bk-phone"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      inputMode="tel"
                      aria-invalid={!!errors.phone}
                      className="form-input"
                    />,
                  )}
                  {field(
                    'Email',
                    'bk-email',
                    <input
                      id="bk-email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      inputMode="email"
                      aria-invalid={!!errors.email}
                      className="form-input"
                    />,
                  )}
                </div>

                {field(
                  'Which cake',
                  'bk-cake',
                  <select
                    id="bk-cake"
                    value={cakeSlug}
                    onChange={(e) => onCakeChange(e.target.value)}
                    className="form-input"
                  >
                    <option value="" disabled>
                      Choose a cake
                    </option>
                    {cakeOptions.map((c: Cake) => (
                      <option key={c.slug} value={c.slug}>
                        {c.name}
                      </option>
                    ))}
                  </select>,
                )}

                {selectedCake && (
                  <div className="grid grid-cols-2 gap-3">
                    {field(
                      'Size',
                      'bk-size',
                      <select
                        id="bk-size"
                        value={sizeIndex}
                        onChange={(e) => setSizeIndex(Number(e.target.value))}
                        className="form-input"
                      >
                        {selectedCake.sizes.map((s, i) => (
                          <option key={s.label} value={i}>
                            {s.label}
                          </option>
                        ))}
                      </select>,
                    )}
                    {field(
                      'Flavor',
                      'bk-flavor',
                      <select
                        id="bk-flavor"
                        value={flavor}
                        onChange={(e) => setFlavor(e.target.value)}
                        aria-invalid={!!errors.flavor}
                        className="form-input"
                      >
                        {selectedCake.flavors.map((f) => (
                          <option key={f} value={f}>
                            {f}
                          </option>
                        ))}
                      </select>,
                    )}
                  </div>
                )}

                <div className="grid grid-cols-2 gap-3">
                  {field(
                    'Quantity',
                    'bk-qty',
                    <input
                      id="bk-qty"
                      type="number"
                      min={1}
                      value={quantity}
                      onChange={(e) => setQuantity(Math.max(1, Number(e.target.value) || 1))}
                      aria-invalid={!!errors.quantity}
                      className="form-input"
                    />,
                  )}
                  {field(
                    'Needed by',
                    'bk-date',
                    <input
                      id="bk-date"
                      type="date"
                      min={minDateStr}
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      aria-invalid={!!errors.date}
                      className="form-input"
                    />,
                  )}
                </div>

                {field(
                  'Notes / allergies',
                  'bk-notes',
                  <textarea
                    id="bk-notes"
                    rows={2}
                    maxLength={280}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    aria-invalid={!!errors.notes}
                    className="form-input resize-none"
                  />,
                )}
              </div>
            </form>

            {/* Sticky footer with live price + submit */}
            <div className="border-t border-line bg-cream-soft/50 px-6 py-4">
              <div className="mb-3 flex items-center justify-between text-[13px]">
                <span className="text-ink-muted">
                  {selectedCake ? (
                    <>
                      {quantity} × {selectedCake.sizes[sizeIndex].label}
                    </>
                  ) : (
                    'Estimate'
                  )}
                </span>
                <span className="font-display text-[18px] text-orange">
                  {selectedCake ? formatPrice(price) : '—'}
                </span>
              </div>
              <button
                type="submit"
                form="bk-form"
                disabled={status === 'loading'}
                className="btn-primary w-full disabled:opacity-60"
              >
                {status === 'loading' ? (
                  <>
                    <span
                      aria-hidden="true"
                      className="size-4 animate-spin rounded-full border-2 border-cream/40 border-t-cream"
                    />
                    Sending…
                  </>
                ) : (
                  'Request booking'
                )}
              </button>
              {site.demoMode && (
                <p className="mt-3 text-center text-[11px] uppercase tracking-[0.16em] text-sage/60">
                  Demo mode — nothing is sent
                </p>
              )}
            </div>
          </>
        )}
      </div>
    </dialog>
  )
}
