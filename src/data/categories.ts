export type Category = {
  slug: string
  name: string
  blurb: string
}

export const categories: Category[] = [
  {
    slug: 'celebration',
    name: 'Celebration',
    blurb: 'Birthdays, anniversaries, graduations and the milestones in between.',
  },
  {
    slug: 'wedding',
    name: 'Wedding',
    blurb: 'Tiered centrepieces and quiet, elegant tables.',
  },
  {
    slug: 'cupcakes',
    name: 'Cupcakes',
    blurb: 'Boxes, minis and party sets, baked by the dozen.',
  },
  {
    slug: 'custom',
    name: 'Custom',
    blurb: 'Something drawn on paper first, then baked.',
  },
]

export const categoryBySlug = new Map(categories.map((c) => [c.slug, c]))
