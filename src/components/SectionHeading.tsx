import type { ReactNode } from 'react'
import { cn } from '../lib/cn'
import { Reveal } from './Reveal'

type SectionHeadingProps = {
  eyebrow: string
  title: ReactNode
  intro?: string
  align?: 'left' | 'center'
  className?: string
}

export function SectionHeading({
  eyebrow,
  title,
  intro,
  align = 'left',
  className,
}: SectionHeadingProps) {
  return (
    <Reveal
      className={cn(
        'flex flex-col',
        align === 'center' && 'items-center text-center',
        className,
      )}
    >
      <p className="label">{eyebrow}</p>
      <h2
        className={cn(
          'mt-4 max-w-[22ch] text-[clamp(30px,4vw,52px)] font-light leading-[1.04] tracking-[-0.02em]',
          align === 'center' && 'mx-auto',
        )}
      >
        {title}
      </h2>
      {intro ? (
        <p
          className={cn(
            'mt-5 max-w-[54ch] text-[15px] leading-[1.7] text-ink-muted',
            align === 'center' && 'mx-auto',
          )}
        >
          {intro}
        </p>
      ) : null}
    </Reveal>
  )
}
