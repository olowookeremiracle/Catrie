import { categories } from './categories'

export type CakeSize = {
  /** Servings, or a descriptive size label. */
  label: string
  /** Multiplier for the base price. */
  price: number
}

export type Cake = {
  slug: string
  name: string
  category: string
  /** Short one-line description shown on cards. */
  summary: string
  /** Longer description for the detail page. */
  description: string
  /** Default (smallest) price in NGN. */
  basePrice: number
  sizes: CakeSize[]
  flavors: string[]
  /** Whether this cake is highlighted on Home. */
  featured: boolean
  /** Image key, matches a file in public/images/cakes/. */
  image: string
}

export const cakes: Cake[] = [
  {
    slug: 'the-anniversary-layer',
    name: 'The Anniversary Layer',
    category: 'celebration',
    summary: 'Three tiers of vanilla bean and salted caramel, finished with buttercream.',
    description:
      'Our signature celebration cake. Three generous tiers of vanilla bean sponge soaked in warm syrup, layered with salted caramel and piped into a soft buttercream finish. The tiers can be dressed to your occasion — gold leaf, fresh flowers or a hand-lettered topper.',
    basePrice: 48000,
    sizes: [
      { label: 'Serves 12', price: 48000 },
      { label: 'Serves 24', price: 82000 },
      { label: 'Serves 40', price: 130000 },
    ],
    flavors: ['Vanilla bean', 'Salted caramel', 'Dark chocolate'],
    featured: true,
    image: 'anniversary-layer',
  },
  {
    slug: 'chocolate-midnight',
    name: 'Chocolate Midnight',
    category: 'celebration',
    summary: 'Deep cocoa layers with a glossy dark chocolate ganache drip.',
    description:
      'For the people who only order one cake. Three tiers of cocoa sponge baked with single-origin chocolate, filled with ganache and finished with a slow-set dark drip. Rich, quiet and unapologetic.',
    basePrice: 52000,
    sizes: [
      { label: 'Serves 12', price: 52000 },
      { label: 'Serves 24', price: 90000 },
      { label: 'Serves 40', price: 142000 },
    ],
    flavors: ['Dark chocolate', 'Hazelnut praline', 'Raspberry'],
    featured: true,
    image: 'chocolate-midnight',
  },
  {
    slug: 'the-graduation-arch',
    name: 'The Graduation Arch',
    category: 'celebration',
    summary: 'A milestone cake with a hand-painted arch and confetti topper.',
    description:
      'Made for the big ones. A sturdy celebration tier under a sculpted arch, with a hand-painted name, year or message. We finish it with a confetti topper so the photo works as well as the slice.',
    basePrice: 46000,
    sizes: [
      { label: 'Serves 12', price: 46000 },
      { label: 'Serves 24', price: 78000 },
      { label: 'Serves 40', price: 124000 },
    ],
    flavors: ['Vanilla bean', 'Strawberry', 'Lemon curd'],
    featured: false,
    image: 'graduation-arch',
  },
  {
    slug: 'lemon-poppy-seed',
    name: 'Lemon Poppy Seed',
    category: 'celebration',
    summary: 'Bright, citrus sponge with a tangy white glaze.',
    description:
      'The daytime cake. A light lemon-poppy sponge with a quick white glaze and a squeeze of fresh zest on top. It cuts clean, keeps its shape for the afternoon, and tastes like a good lunch.',
    basePrice: 38000,
    sizes: [
      { label: 'Serves 10', price: 38000 },
      { label: 'Serves 20', price: 64000 },
      { label: 'Serves 35', price: 102000 },
    ],
    flavors: ['Lemon curd', 'Vanilla bean', 'Raspberry'],
    featured: false,
    image: 'lemon-poppy-seed',
  },
  {
    slug: 'two-tier-blush',
    name: 'Two-Tier Blush',
    category: 'wedding',
    summary: 'A soft, layered wedding centrepiece in blush tones.',
    description:
      'A calm two-tier centrepiece for a smaller table. Two tiers of sponge with a blushed buttercream finish and delicate hand-piped detail. We coordinate the flavour with your menu so the cake matches the room.',
    basePrice: 96000,
    sizes: [
      { label: 'Serves 30', price: 96000 },
      { label: 'Serves 60', price: 168000 },
      { label: 'Serves 100', price: 260000 },
    ],
    flavors: ['Vanilla bean', 'Almond', 'Champagne'],
    featured: true,
    image: 'two-tier-blush',
  },
  {
    slug: 'three-tier-ivory',
    name: 'Three-Tier Ivory',
    category: 'wedding',
    summary: 'The classic three-tier centrepiece, finished in smooth ivory.',
    description:
      'Our full centrepiece. Three tiers in smooth ivory buttercream, built to sit on the table for hours and still cut clean. Every finish, topper and flower detail is confirmed with you before it goes in the oven.',
    basePrice: 156000,
    sizes: [
      { label: 'Serves 60', price: 156000 },
      { label: 'Serves 100', price: 240000 },
      { label: 'Serves 150', price: 360000 },
    ],
    flavors: ['Vanilla bean', 'Almond', 'Dark chocolate', 'Raspberry'],
    featured: true,
    image: 'three-tier-ivory',
  },
  {
    slug: 'the-rustic-forest',
    name: 'The Rustic Forest',
    category: 'wedding',
    summary: 'A half-naked tier with fresh berries and a dusting of cocoa.',
    description:
      'For a softer table. A half-naked finish that lets the sponge show, with fresh berries, edible flowers and a light cocoa dust. It reads quiet and natural on the table without losing the structure of a proper wedding cake.',
    basePrice: 128000,
    sizes: [
      { label: 'Serves 40', price: 128000 },
      { label: 'Serves 80', price: 214000 },
      { label: 'Serves 120', price: 320000 },
    ],
    flavors: ['Vanilla bean', 'Raspberry', 'Lemon curd'],
    featured: false,
    image: 'rustic-forest',
  },
  {
    slug: 'vanilla-bean-dozen',
    name: 'Vanilla Bean Dozen',
    category: 'cupcakes',
    summary: 'A dozen classic vanilla cupcakes with a swirl of buttercream.',
    description:
      'The dependable dozen. Vanilla bean sponge with a soft buttercream swirl, baked fresh the day you need them. Great for desks, hand-outs and the person who always takes the corner piece home.',
    basePrice: 24000,
    sizes: [
      { label: '6 cupcakes', price: 14000 },
      { label: '12 cupcakes', price: 24000 },
      { label: '24 cupcakes', price: 42000 },
    ],
    flavors: ['Vanilla bean', 'Chocolate', 'Strawberry'],
    featured: false,
    image: 'vanilla-bean-dozen',
  },
  {
    slug: 'assorted-flavour-box',
    name: 'Assorted Flavour Box',
    category: 'cupcakes',
    summary: 'A mix-and-match box across four house flavours.',
    description:
      'For a table that can’t agree. A box that mixes and matches across four house flavours, so every guest gets a favourite. We balance the box so the sweet ones and the lighter ones sit side by side.',
    basePrice: 32000,
    sizes: [
      { label: '6 cupcakes', price: 19000 },
      { label: '12 cupcakes', price: 32000 },
      { label: '24 cupcakes', price: 56000 },
    ],
    flavors: ['Vanilla bean', 'Chocolate', 'Lemon curd', 'Raspberry'],
    featured: true,
    image: 'assorted-flavour-box',
  },
  {
    slug: 'chocolate-truffle-triptych',
    name: 'Chocolate Truffle Triptych',
    category: 'cupcakes',
    summary: 'Triple-stacked truffle cupcakes with a molten centre.',
    description:
      'Three tiers of truffle sponge stacked in one cup, with a molten centre that stays just right for the first bite. We hold them back for guests who want the biggest slice on the box.',
    basePrice: 36000,
    sizes: [
      { label: '4 cupcakes', price: 16000 },
      { label: '9 cupcakes', price: 36000 },
      { label: '18 cupcakes', price: 66000 },
    ],
    flavors: ['Dark chocolate', 'Hazelnut praline'],
    featured: false,
    image: 'chocolate-truffle-triptych',
  },
  {
    slug: 'strawberry-drip-mini',
    name: 'Strawberry Drip Mini',
    category: 'cupcakes',
    summary: 'A small cake with a slow-set strawberry drip.',
    description:
      'A mini cake that still behaves like the big ones. A compact tier with a slow-set strawberry drip, sized for a small table or a last-minute celebration that still wants to look deliberate.',
    basePrice: 34000,
    sizes: [
      { label: 'Serves 8', price: 34000 },
      { label: 'Serves 14', price: 52000 },
      { label: 'Serves 24', price: 78000 },
    ],
    flavors: ['Strawberry', 'Vanilla bean'],
    featured: false,
    image: 'strawberry-drip-mini',
  },
  {
    slug: 'the-sketch',
    name: 'The Sketch',
    category: 'custom',
    summary: 'Bring us a drawing and we will bake it, start to finish.',
    description:
      'Start with whatever you have — a sketch, a colour, a photo, a feeling. We translate it into a buildable design, agree on the structure and finish, and bake it to your date. No two are the same.',
    basePrice: 64000,
    sizes: [
      { label: 'Serves 12', price: 64000 },
      { label: 'Serves 24', price: 110000 },
      { label: 'Serves 40', price: 176000 },
    ],
    flavors: ['Vanilla bean', 'Chocolate', 'Strawberry', 'Lemon curd', 'Raspberry'],
    featured: true,
    image: 'the-sketch',
  },
  {
    slug: 'the-monogram',
    name: 'The Monogram',
    category: 'custom',
    summary: 'A personalised cake with a hand-lettered monogram or message.',
    description:
      'A clean centrepiece built around your initials or a short message, hand-lettered into the finish. We set the typography early so the lettering sits right on the table, not squeezed into the corner.',
    basePrice: 58000,
    sizes: [
      { label: 'Serves 12', price: 58000 },
      { label: 'Serves 24', price: 98000 },
      { label: 'Serves 40', price: 158000 },
    ],
    flavors: ['Vanilla bean', 'Almond', 'Dark chocolate'],
    featured: false,
    image: 'the-monogram',
  },
  {
    slug: 'the-heirloom',
    name: 'The Heirloom',
    category: 'custom',
    summary: 'A sculptural centrepiece built around a single idea.',
    description:
      'Our most ambitious build. A sculptural centrepiece built around a single idea — an object, a place, a story. It is the project where the paper drawing matters most and the finish carries the room.',
    basePrice: 88000,
    sizes: [
      { label: 'Serves 12', price: 88000 },
      { label: 'Serves 24', price: 150000 },
      { label: 'Serves 40', price: 240000 },
    ],
    flavors: ['Vanilla bean', 'Dark chocolate', 'Almond'],
    featured: true,
    image: 'the-heirloom',
  },
  {
    slug: 'the-first-issue',
    name: 'The First Issue',
    category: 'custom',
    summary: 'A statement cake for the occasion that is hard to describe.',
    description:
      'For the celebration that does not fit a category. We design a statement cake around the moment itself — the shape, the colour, the message — so the cake says what the room already knows.',
    basePrice: 72000,
    sizes: [
      { label: 'Serves 12', price: 72000 },
      { label: 'Serves 24', price: 124000 },
      { label: 'Serves 40', price: 198000 },
    ],
    flavors: ['Vanilla bean', 'Strawberry', 'Lemon curd'],
    featured: false,
    image: 'the-first-issue',
  },
  {
    slug: 'the-garden',
    name: 'The Garden',
    category: 'custom',
    summary: 'A floral, hand-finished centrepiece that reads as still life.',
    description:
      'A hand-finished centrepiece that reads as still life. We build the structure first, then dress it with colour and texture so it photographs like a painting and tastes like the small-batch cakes we are known for.',
    basePrice: 76000,
    sizes: [
      { label: 'Serves 12', price: 76000 },
      { label: 'Serves 24', price: 132000 },
      { label: 'Serves 40', price: 208000 },
    ],
    flavors: ['Vanilla bean', 'Raspberry', 'Lemon curd'],
    featured: false,
    image: 'the-garden',
  },
]

export const cakeBySlug = new Map(cakes.map((cake) => [cake.slug, cake]))

export const categoryCounts = categories.map((category) => ({
  ...category,
  count: cakes.filter((cake) => cake.category === category.slug).length,
}))

export const featuredCakes = cakes.filter((cake) => cake.featured)

export function priceForSize(cake: Cake, sizeIndex: number): number {
  const size = cake.sizes[sizeIndex]
  return size ? size.price : cake.basePrice
}
