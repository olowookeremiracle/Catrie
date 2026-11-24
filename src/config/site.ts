export const site = {
  name: "Catrie",
  tagline: "Cakes, made to order",
  description:
    "Celebration, wedding, cupcake and custom cakes, baked to order in Osun State, Nigeria.",
  whatsapp: "2349039579399",
  email: "olowookerejohnmbg@gmail.com",
  address: "Osun State, Nigeria",
  hours: "Mon–Sat, 9:00–18:00",
  leadTimeDays: 2,
  currency: "NGN",
  demoMode: false,
} as const

export const whatsappLink = (message?: string) => {
  const text = message ?? "Hello Catrie, I'd like to ask about a cake."
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(text)}`
}

export const formatPrice = (amount: number) =>
  new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: site.currency,
    maximumFractionDigits: 0,
  }).format(amount)
