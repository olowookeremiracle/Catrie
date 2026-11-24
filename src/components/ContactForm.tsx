import { useState } from 'react'
import type { FormEvent } from 'react'
import { useSearchParams } from 'react-router-dom'
import { site, whatsappLink } from '../config/site'
import { cakes } from '../data/cakes'
import { cn } from '../lib/cn'
import { isEmail, isPhone, isRequired } from '../lib/validation'
import { submitMessage } from '../services/contactService'
import { WhatsAppIcon } from './WhatsAppIcon'

type Status = 'idle' | 'loading' | 'success'

export function ContactForm() {
  const [params] = useSearchParams()
  const [status, setStatus] = useState<Status>('idle')
  const [reference, setReference] = useState('')

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [cakeSlug, setCakeSlug] = useState(params.get('cake') ?? '')
  const [message, setMessage] = useState('')
  const [errors, setErrors] = useState<Record<string, string>>({})

  const validate = () => {
    const next: Record<string, string> = {}
    if (!isRequired(name)) next.name = 'Please add your name.'
    if (!isRequired(message)) next.message = 'Tell us a little about what you need.'
    if (email && !isEmail(email)) next.email = 'Enter a valid email, or leave it blank.'
    if (phone && !isPhone(phone)) next.phone = 'Enter a valid phone number.'
    setErrors(next)
    return Object.keys(next).length === 0
  }

  const submit = async (event: FormEvent) => {
    event.preventDefault()
    if (!validate()) return
    setStatus('loading')
    const result = await submitMessage({
      name,
      email: email || undefined,
      phone: phone || undefined,
      message,
      cakeSlug: cakeSlug || undefined,
    })
    setReference(result.reference)
    setStatus('success')
  }

  const startAnother = () => {
    setName('')
    setEmail('')
    setPhone('')
    setCakeSlug('')
    setMessage('')
    setErrors({})
    setReference('')
    setStatus('idle')
  }

  if (status === 'success') {
    return (
      <div className="success-pop relative flex flex-col items-center overflow-hidden rounded-lg border border-line bg-cream p-8 text-center shadow-[0_30px_70px_-50px_rgba(59,36,21,0.5)] md:p-10">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-14 -top-14 size-44 rounded-full bg-sage/10 blur-2xl"
        />
        <div className="grid size-16 place-items-center rounded-full bg-sage-soft text-sage">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="check-draw size-8">
            <path d="m5 13 4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <h2 className="mt-5 font-display text-[26px] font-light">Message sent</h2>
        <p className="mt-3 max-w-[36ch] text-[14px] leading-[1.7] text-ink-muted">
          Thanks, {name || 'friend'}. We&rsquo;ll reply soon — usually on WhatsApp.
        </p>
        <p className="mt-3 text-[12px] uppercase tracking-[0.14em] text-sage">
          Reference {reference}
        </p>
        {site.demoMode && (
          <p className="mt-1 text-[11px] uppercase tracking-[0.16em] text-sage/70">
            Demo — nothing was sent
          </p>
        )}
        <div className="mt-7 flex w-full flex-col gap-2.5 sm:flex-row sm:justify-center">
          <a
            href={whatsappLink(`Hello Catrie, following up on my message (ref ${reference}).`)}
            target="_blank"
            rel="noreferrer"
            className="btn-primary"
          >
            <WhatsAppIcon className="size-4" />
            Continue on WhatsApp
          </a>
          <button type="button" onClick={startAnother} className="btn-secondary">
            Send another
          </button>
        </div>
      </div>
    )
  }

  const err = (key: string) =>
    errors[key] ? (
      <p
        id={`cf-${key}-error`}
        role="alert"
        className="field-error mt-1.5 text-[13px] text-orange"
      >
        {errors[key]}
      </p>
    ) : null

  return (
    <form
      onSubmit={submit}
      noValidate
      className="relative overflow-hidden rounded-lg border border-line bg-cream p-6 shadow-[0_30px_70px_-50px_rgba(59,36,21,0.5)] md:p-8"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-16 -top-16 size-48 rounded-full bg-orange/[0.06] blur-2xl"
      />

      <div className="relative">
        <p className="label">Send a note</p>
        <h2 className="mt-2 font-display text-[26px] font-light leading-tight">
          Start the conversation
        </h2>
        <p className="mt-2 text-[13.5px] leading-[1.7] text-ink-muted">
          Tell us the date and the occasion. We&rsquo;ll come back with options and a
          price — usually within a few hours.
        </p>

        <div className="mt-6 space-y-4">
          <div>
            <label className="label mb-2 block" htmlFor="cf-name">
              Your name
            </label>
            <input
              id="cf-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              aria-invalid={!!errors.name}
              aria-describedby={errors.name ? 'cf-name-error' : undefined}
              className="form-input"
              placeholder="Amara Okafor"
            />
            {err('name')}
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="label mb-2 block" htmlFor="cf-email">
                Email
              </label>
              <input
                id="cf-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                aria-invalid={!!errors.email}
                aria-describedby={errors.email ? 'cf-email-error' : undefined}
                className="form-input"
                placeholder="you@example.com"
              />
              {err('email')}
            </div>
            <div>
              <label className="label mb-2 block" htmlFor="cf-phone">
                Phone
              </label>
              <input
                id="cf-phone"
                inputMode="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                aria-invalid={!!errors.phone}
                aria-describedby={errors.phone ? 'cf-phone-error' : undefined}
                className="form-input"
                placeholder="0803 000 0000"
              />
              {err('phone')}
            </div>
          </div>

          <div>
            <label className="label mb-2 block" htmlFor="cf-cake">
              Which cake <span className="normal-case tracking-normal text-sage/70">(optional)</span>
            </label>
            <select
              id="cf-cake"
              value={cakeSlug}
              onChange={(e) => setCakeSlug(e.target.value)}
              className="form-input"
            >
              <option value="">Just a general question</option>
              {cakes.map((c) => (
                <option key={c.slug} value={c.slug}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="label mb-2 block" htmlFor="cf-message">
              Message
            </label>
            <textarea
              id="cf-message"
              rows={4}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              aria-invalid={!!errors.message}
              aria-describedby={errors.message ? 'cf-message-error' : undefined}
              className="form-input h-auto resize-none py-3 leading-[1.6]"
              placeholder="The date, the occasion, the headcount, any inspiration…"
            />
            {err('message')}
          </div>

          <button
            type="submit"
            disabled={status === 'loading'}
            className={cn('btn-primary group w-full disabled:opacity-60')}
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
              <>
                Send message
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  aria-hidden="true"
                  className="size-4 transition-transform duration-200 group-hover:translate-x-0.5"
                >
                  <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </>
            )}
          </button>
          {site.demoMode && (
            <p className="text-center text-[11px] uppercase tracking-[0.16em] text-sage/70">
              Demo mode — nothing is sent
            </p>
          )}
        </div>
      </div>
    </form>
  )
}
