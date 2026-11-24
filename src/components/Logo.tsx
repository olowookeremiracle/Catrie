import { Link } from 'react-router-dom'
import { cn } from '../lib/cn'

type LogoProps = {
  dark?: boolean
  className?: string
  asLink?: boolean
}

/**
 * Outlined Kaushan Script wordmark. The shapes are baked into the SVG so the
 * logo never waits on a font download.
 */
export function Logo({ dark = false, className = 'h-[34px]', asLink = true }: LogoProps) {
  const mark = (
    <img
      src={dark ? '/brand/catrie-logo-dark.svg' : '/brand/catrie-logo.svg'}
      alt="Catrie"
      width={400}
      height={151}
      draggable={false}
      className={cn('w-auto select-none', className)}
    />
  )

  if (!asLink) return mark

  return (
    <Link to="/" className="inline-flex">
      {mark}
    </Link>
  )
}
