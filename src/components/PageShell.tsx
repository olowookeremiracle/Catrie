import type { ReactNode } from 'react'
import { Reveal } from './Reveal'

type PageShellProps = {
  eyebrow: string
  title: ReactNode
  intro?: string
  children?: ReactNode
}

export function PageShell({ eyebrow, title, intro, children }: PageShellProps) {
  return (
    <div className="pb-24 pt-[132px] md:pb-32 md:pt-[168px]">
      <div className="container-content">
        <Reveal>
          <p className="label">{eyebrow}</p>
          <h1 className="mt-5 max-w-[20ch] text-[clamp(38px,6vw,76px)] font-light leading-[1.02] tracking-[-0.02em]">
            {title}
          </h1>
          {intro ? (
            <p className="mt-6 max-w-[58ch] text-[16px] leading-[1.7] text-ink-muted md:text-[17px]">
              {intro}
            </p>
          ) : null}
        </Reveal>
        {children}
      </div>
    </div>
  )
}
