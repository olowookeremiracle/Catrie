import type { ReactElement } from 'react'
import { cn } from '../lib/cn'

export function CakeStand({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 200 200"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={cn(className)}
    >
      <ellipse cx="100" cy="76" rx="52" ry="10" />
      <path d="M48 76c0 9 23 16 52 16s52-7 52-16" />
      <path d="M100 92v48" />
      <path d="M78 146h44" />
      <path d="M68 154h64" />
      <path d="M66 76V58c0-4 3-7 7-7h54c4 0 7 3 7 7v18" />
      <path d="M66 62c10 5 21 7 34 7s24-2 34-7" />
      <path d="M84 51V42" />
      <path d="M84 38c-2-3 2-5 0-8-2 3 2 5 0 8Z" />
      <path d="M116 51V42" />
      <path d="M116 38c-2-3 2-5 0-8-2 3 2 5 0 8Z" />
    </svg>
  )
}

export function CakeSlice({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 200 200"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={cn(className)}
    >
      <path d="M54 148 100 46l46 102" />
      <path d="M54 148h92" />
      <path d="M68 120h64" />
      <path d="M80 93h40" />
      <path d="M100 46V32" />
      <path d="M100 28c-2-3 2-5 0-8-2 3 2 5 0 8Z" />
      <circle cx="100" cy="166" r="2.5" />
    </svg>
  )
}

/* -------------------------------------------------------------------------- */
/* Catalog illustrations — one per cake, palette-bound, quiet.                  */
/* -------------------------------------------------------------------------- */

const base = {
  viewBox: '0 0 200 200',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.5,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  'aria-hidden': true,
} as const

export function IllustrationAnniversaryLayer({ className }: { className?: string }) {
  return (
    <svg {...base} className={cn(className)}>
      <ellipse cx="100" cy="152" rx="56" ry="10" />
      <path d="M44 152c0 9 25 16 56 16s56-7 56-16" />
      <path d="M100 168v22" />
      <path d="M78 190h44" />
      <path d="M60 152V96c0-3 2-5 5-5h70c3 0 5 2 5 5v56" />
      <path d="M60 118h80" />
      <path d="M66 96V70c0-3 2-5 5-5h58c3 0 5 2 5 5v26" />
      <path d="M72 70V48c0-3 2-5 5-5h46c3 0 5 2 5 5v22" />
      <path d="M92 43v-8" />
      <path d="M92 35c-2-3 2-5 0-8-2 3 2 5 0 8Z" />
      <path d="M108 43v-8" />
      <path d="M108 35c-2-3 2-5 0-8-2 3 2 5 0 8Z" />
      <path d="M100 43v-6" />
    </svg>
  )
}

export function IllustrationChocolateMidnight({ className }: { className?: string }) {
  return (
    <svg {...base} className={cn(className)}>
      <ellipse cx="100" cy="150" rx="50" ry="9" />
      <path d="M50 150c0 9 22 15 50 15s50-6 50-15" />
      <path d="M100 165v24" />
      <path d="M80 189h40" />
      <path d="M62 150V98c0-3 2-5 5-5h66c3 0 5 2 5 5v52" />
      <path d="M62 120h76" />
      <path d="M70 98V74c0-3 2-5 5-5h50c3 0 5 2 5 5v24" />
      <path d="M78 69V54" />
      <path d="M78 52c-2-3 2-5 0-8-2 3 2 5 0 8Z" />
      <path d="M122 69V54" />
      <path d="M122 52c-2-3 2-5 0-8-2 3 2 5 0 8Z" />
      <path d="M100 69V56" />
      <path d="M100 54c-2-3 2-5 0-8-2 3 2 5 0 8Z" />
    </svg>
  )
}

export function IllustrationGraduationArch({ className }: { className?: string }) {
  return (
    <svg {...base} className={cn(className)}>
      <ellipse cx="100" cy="150" rx="52" ry="9" />
      <path d="M48 150c0 9 23 15 52 15s52-6 52-15" />
      <path d="M100 165v24" />
      <path d="M80 189h40" />
      <path d="M64 150V96c0-3 2-5 5-5h62c3 0 5 2 5 5v54" />
      <path d="M64 118h72" />
      <path d="M72 96V78a28 28 0 0 1 56 0v18" />
      <path d="M84 78v-6" />
      <path d="M116 78v-6" />
      <path d="M100 72v-4" />
    </svg>
  )
}

export function IllustrationLemonPoppySeed({ className }: { className?: string }) {
  return (
    <svg {...base} className={cn(className)}>
      <ellipse cx="100" cy="148" rx="46" ry="8" />
      <path d="M54 148c0 8 20 14 46 14s46-6 46-14" />
      <path d="M100 162v26" />
      <path d="M82 188h36" />
      <path d="M68 148V104c0-3 2-5 5-5h54c3 0 5 2 5 5v44" />
      <path d="M68 122h64" />
      <path d="M74 104V92" />
      <path d="M74 90c-2-3 2-5 0-8-2 3 2 5 0 8Z" />
      <path d="M126 104V92" />
      <path d="M126 90c-2-3 2-5 0-8-2 3 2 5 0 8Z" />
    </svg>
  )
}

export function IllustrationTwoTierBlush({ className }: { className?: string }) {
  return (
    <svg {...base} className={cn(className)}>
      <ellipse cx="100" cy="150" rx="58" ry="10" />
      <path d="M42 150c0 9 28 16 58 16s58-7 58-16" />
      <path d="M100 166v22" />
      <path d="M78 188h44" />
      <path d="M58 150V100c0-3 2-5 5-5h74c3 0 5 2 5 5v50" />
      <path d="M58 116h84" />
      <path d="M68 100V74c0-3 2-5 5-5h54c3 0 5 2 5 5v26" />
      <path d="M76 69V60" />
      <path d="M76 58c-2-3 2-5 0-8-2 3 2 5 0 8Z" />
      <path d="M124 69V60" />
      <path d="M124 58c-2-3 2-5 0-8-2 3 2 5 0 8Z" />
    </svg>
  )
}

export function IllustrationThreeTierIvory({ className }: { className?: string }) {
  return (
    <svg {...base} className={cn(className)}>
      <ellipse cx="100" cy="152" rx="60" ry="10" />
      <path d="M40 152c0 9 28 16 60 16s60-7 60-16" />
      <path d="M100 168v22" />
      <path d="M78 190h44" />
      <path d="M60 152V96c0-3 2-5 5-5h70c3 0 5 2 5 5v56" />
      <path d="M60 118h80" />
      <path d="M66 96V70c0-3 2-5 5-5h58c3 0 5 2 5 5v26" />
      <path d="M72 70V48c0-3 2-5 5-5h46c3 0 5 2 5 5v22" />
      <path d="M88 43v-8" />
      <path d="M88 35c-2-3 2-5 0-8-2 3 2 5 0 8Z" />
      <path d="M112 43v-8" />
      <path d="M112 35c-2-3 2-5 0-8-2 3 2 5 0 8Z" />
      <path d="M100 43v-6" />
    </svg>
  )
}

export function IllustrationRusticForest({ className }: { className?: string }) {
  return (
    <svg {...base} className={cn(className)}>
      <ellipse cx="100" cy="150" rx="54" ry="9" />
      <path d="M46 150c0 9 24 15 54 15s54-6 54-15" />
      <path d="M100 165v24" />
      <path d="M80 189h40" />
      <path d="M64 150V98c0-3 2-5 5-5h62c3 0 5 2 5 5v52" />
      <path d="M64 120h72" />
      <path d="M70 98V74c0-3 2-5 5-5h50c3 0 5 2 5 5v24" />
      <path d="M82 69V56" />
      <path d="M82 54c-2-3 2-5 0-8-2 3 2 5 0 8Z" />
      <path d="M118 69V56" />
      <path d="M118 54c-2-3 2-5 0-8-2 3 2 5 0 8Z" />
      <path d="M100 69V58" />
      <path d="M100 56c-2-3 2-5 0-8-2 3 2 5 0 8Z" />
    </svg>
  )
}

export function IllustrationCupcakeBox({ className }: { className?: string }) {
  return (
    <svg {...base} className={cn(className)}>
      <ellipse cx="60" cy="150" rx="30" ry="6" />
      <ellipse cx="140" cy="150" rx="30" ry="6" />
      <path d="M46 150v-26c0-2 2-4 4-4h20c2 0 4 2 4 4v26" />
      <path d="M46 138h28" />
      <path d="M126 150v-26c0-2 2-4 4-4h20c2 0 4 2 4 4v26" />
      <path d="M126 138h28" />
      <path d="M52 120V112c0-2 2-4 4-4h12c2 0 4 2 4 4v8" />
      <path d="M132 120V112c0-2 2-4 4-4h12c2 0 4 2 4 4v8" />
      <path d="M58 104v-6" />
      <path d="M58 98c-2-3 2-5 0-8-2 3 2 5 0 8Z" />
      <path d="M138 104v-6" />
      <path d="M138 98c-2-3 2-5 0-8-2 3 2 5 0 8Z" />
      <path d="M64 104v-6" />
      <path d="M64 98c-2-3 2-5 0-8-2 3 2 5 0 8Z" />
      <path d="M144 104v-6" />
      <path d="M144 98c-2-3 2-5 0-8-2 3 2 5 0 8Z" />
    </svg>
  )
}

export function IllustrationAssortedBox({ className }: { className?: string }) {
  return (
    <svg {...base} className={cn(className)}>
      <ellipse cx="100" cy="150" rx="58" ry="9" />
      <path d="M42 150c0 9 26 15 58 15s58-6 58-15" />
      <path d="M100 165v24" />
      <path d="M80 189h40" />
      <path d="M62 150v-30c0-3 2-5 5-5h66c3 0 5 2 5 5v30" />
      <path d="M62 128h76" />
      <path d="M70 120v-8" />
      <path d="M70 112c-2-3 2-5 0-8-2 3 2 5 0 8Z" />
      <path d="M92 120v-8" />
      <path d="M92 112c-2-3 2-5 0-8-2 3 2 5 0 8Z" />
      <path d="M108 120v-8" />
      <path d="M108 112c-2-3 2-5 0-8-2 3 2 5 0 8Z" />
      <path d="M130 120v-8" />
      <path d="M130 112c-2-3 2-5 0-8-2 3 2 5 0 8Z" />
    </svg>
  )
}

export function IllustrationTruffleTriptych({ className }: { className?: string }) {
  return (
    <svg {...base} className={cn(className)}>
      <ellipse cx="100" cy="152" rx="48" ry="8" />
      <path d="M52 152c0 8 20 14 48 14s48-6 48-14" />
      <path d="M100 166v24" />
      <path d="M80 190h40" />
      <path d="M66 152v-52c0-3 2-5 5-5h58c3 0 5 2 5 5v52" />
      <path d="M66 130h68" />
      <path d="M66 108h68" />
      <path d="M72 100V80" />
      <path d="M72 78c-2-3 2-5 0-8-2 3 2 5 0 8Z" />
      <path d="M100 100V76" />
      <path d="M100 74c-2-3 2-5 0-8-2 3 2 5 0 8Z" />
      <path d="M128 100V80" />
      <path d="M128 78c-2-3 2-5 0-8-2 3 2 5 0 8Z" />
    </svg>
  )
}

export function IllustrationStrawberryDripMini({ className }: { className?: string }) {
  return (
    <svg {...base} className={cn(className)}>
      <ellipse cx="100" cy="150" rx="42" ry="7" />
      <path d="M58 150c0 7 18 12 42 12s42-5 42-12" />
      <path d="M100 162v26" />
      <path d="M82 188h36" />
      <path d="M72 150v-40c0-3 2-5 5-5h46c3 0 5 2 5 5v40" />
      <path d="M72 128h56" />
      <path d="M84 110v-6" />
      <path d="M84 104c-2-3 2-5 0-8-2 3 2 5 0 8Z" />
      <path d="M116 110v-6" />
      <path d="M116 104c-2-3 2-5 0-8-2 3 2 5 0 8Z" />
      <path d="M100 110v-6" />
      <path d="M100 104c-2-3 2-5 0-8-2 3 2 5 0 8Z" />
    </svg>
  )
}

export function IllustrationTheSketch({ className }: { className?: string }) {
  return (
    <svg {...base} className={cn(className)}>
      <path d="M60 150h80" />
      <path d="M60 150v-40c0-3 2-5 5-5h70c3 0 5 2 5 5v40" />
      <path d="M60 128h80" />
      <path d="M70 120v-10" />
      <path d="M70 110c-2-3 2-5 0-8-2 3 2 5 0 8Z" />
      <path d="M130 120v-10" />
      <path d="M130 110c-2-3 2-5 0-8-2 3 2 5 0 8Z" />
      <path d="M100 120v-10" />
      <path d="M100 110c-2-3 2-5 0-8-2 3 2 5 0 8Z" />
      <path d="M150 92l10-10" />
      <path d="M160 82l-6 6" />
      <path d="M154 88l6-6" />
      <path d="M140 150v-8" />
      <path d="M60 162h80" />
    </svg>
  )
}

export function IllustrationTheMonogram({ className }: { className?: string }) {
  return (
    <svg {...base} className={cn(className)}>
      <ellipse cx="100" cy="150" rx="50" ry="9" />
      <path d="M50 150c0 8 22 14 50 14s50-6 50-14" />
      <path d="M100 164v24" />
      <path d="M80 188h40" />
      <path d="M64 150v-52c0-3 2-5 5-5h62c3 0 5 2 5 5v52" />
      <path d="M64 122h72" />
      <circle cx="100" cy="98" r="22" />
      <path d="M94 88v20l14-10-14-10Z" />
      <path d="M78 72v-6" />
      <path d="M122 72v-6" />
    </svg>
  )
}

export function IllustrationTheHeirloom({ className }: { className?: string }) {
  return (
    <svg {...base} className={cn(className)}>
      <ellipse cx="100" cy="152" rx="56" ry="10" />
      <path d="M44 152c0 9 26 16 56 16s56-7 56-16" />
      <path d="M100 168v22" />
      <path d="M78 190h44" />
      <path d="M62 152v-56c0-3 2-5 5-5h66c3 0 5 2 5 5v56" />
      <path d="M62 126h76" />
      <path d="M70 96v-20c0-3 2-5 5-5h50c3 0 5 2 5 5v20" />
      <path d="M78 71v-8" />
      <path d="M78 63c-2-3 2-5 0-8-2 3 2 5 0 8Z" />
      <path d="M122 71v-8" />
      <path d="M122 63c-2-3 2-5 0-8-2 3 2 5 0 8Z" />
      <path d="M100 71v-10" />
      <path d="M100 61c-2-3 2-5 0-8-2 3 2 5 0 8Z" />
    </svg>
  )
}

export function IllustrationTheFirstIssue({ className }: { className?: string }) {
  return (
    <svg {...base} className={cn(className)}>
      <ellipse cx="100" cy="150" rx="50" ry="9" />
      <path d="M50 150c0 8 22 14 50 14s50-6 50-14" />
      <path d="M100 164v24" />
      <path d="M80 188h40" />
      <path d="M64 150v-48c0-3 2-5 5-5h62c3 0 5 2 5 5v48" />
      <path d="M64 124h72" />
      <path d="M72 102v-6" />
      <path d="M72 96c-2-3 2-5 0-8-2 3 2 5 0 8Z" />
      <path d="M88 102v-6" />
      <path d="M88 96c-2-3 2-5 0-8-2 3 2 5 0 8Z" />
      <path d="M112 102v-6" />
      <path d="M112 96c-2-3 2-5 0-8-2 3 2 5 0 8Z" />
      <path d="M128 102v-6" />
      <path d="M128 96c-2-3 2-5 0-8-2 3 2 5 0 8Z" />
    </svg>
  )
}

export function IllustrationTheGarden({ className }: { className?: string }) {
  return (
    <svg {...base} className={cn(className)}>
      <ellipse cx="100" cy="150" rx="52" ry="9" />
      <path d="M48 150c0 8 24 14 52 14s52-6 52-14" />
      <path d="M100 164v24" />
      <path d="M80 188h40" />
      <path d="M66 150v-48c0-3 2-5 5-5h58c3 0 5 2 5 5v48" />
      <path d="M66 126h68" />
      <path d="M80 102v-8" />
      <path d="M80 94c-2-3 2-5 0-8-2 3 2 5 0 8Z" />
      <path d="M100 102v-10" />
      <path d="M100 92c-2-3 2-5 0-8-2 3 2 5 0 8Z" />
      <path d="M120 102v-8" />
      <path d="M120 94c-2-3 2-5 0-8-2 3 2 5 0 8Z" />
      <path d="M88 74c-2-3 2-5 0-8-2 3 2 5 0 8Z" />
      <path d="M112 74c-2-3 2-5 0-8-2 3 2 5 0 8Z" />
    </svg>
  )
}

export const cakeIllustrations: Record<string, (props: { className?: string }) => ReactElement> = {
  'anniversary-layer': IllustrationAnniversaryLayer,
  'chocolate-midnight': IllustrationChocolateMidnight,
  'graduation-arch': IllustrationGraduationArch,
  'lemon-poppy-seed': IllustrationLemonPoppySeed,
  'two-tier-blush': IllustrationTwoTierBlush,
  'three-tier-ivory': IllustrationThreeTierIvory,
  'rustic-forest': IllustrationRusticForest,
  'vanilla-bean-dozen': IllustrationCupcakeBox,
  'assorted-flavour-box': IllustrationAssortedBox,
  'chocolate-truffle-triptych': IllustrationTruffleTriptych,
  'strawberry-drip-mini': IllustrationStrawberryDripMini,
  'the-sketch': IllustrationTheSketch,
  'the-monogram': IllustrationTheMonogram,
  'the-heirloom': IllustrationTheHeirloom,
  'the-first-issue': IllustrationTheFirstIssue,
  'the-garden': IllustrationTheGarden,
}

