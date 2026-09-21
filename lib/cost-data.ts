export type CostCategory = "housing" | "groceries" | "transport" | "utilities" | "lifestyle"

export type CityCost = {
  slug: string
  city: string
  country: string
  currency: string
  currencySymbol: string
  updated: string
  costs: Record<CostCategory, number>
}

export const costCategories: { key: CostCategory; label: string }[] = [
  { key: "housing", label: "Housing" },
  { key: "groceries", label: "Groceries" },
  { key: "transport", label: "Transport" },
  { key: "utilities", label: "Utilities" },
  { key: "lifestyle", label: "Lifestyle" },
]

// Add a complete city record here and it becomes searchable in every calculator,
// available to dynamic comparison routes and included in the city index.
export const cities: CityCost[] = [
  { slug: "london", city: "London", country: "United Kingdom", currency: "GBP", currencySymbol: "£", updated: "September 2026", costs: { housing: 2300, groceries: 520, transport: 220, utilities: 310, lifestyle: 650 } },
  { slug: "amsterdam", city: "Amsterdam", country: "Netherlands", currency: "EUR", currencySymbol: "€", updated: "September 2026", costs: { housing: 1950, groceries: 480, transport: 120, utilities: 270, lifestyle: 600 } },
  { slug: "new-york", city: "New York", country: "United States", currency: "USD", currencySymbol: "$", updated: "September 2026", costs: { housing: 3200, groceries: 650, transport: 132, utilities: 280, lifestyle: 780 } },
  { slug: "lisbon", city: "Lisbon", country: "Portugal", currency: "EUR", currencySymbol: "€", updated: "September 2026", costs: { housing: 1300, groceries: 370, transport: 55, utilities: 180, lifestyle: 420 } },
  { slug: "dubai", city: "Dubai", country: "United Arab Emirates", currency: "AED", currencySymbol: "د.إ", updated: "September 2026", costs: { housing: 2200, groceries: 500, transport: 210, utilities: 250, lifestyle: 700 } },
  { slug: "karachi", city: "Karachi", country: "Pakistan", currency: "PKR", currencySymbol: "₨", updated: "September 2026", costs: { housing: 350, groceries: 210, transport: 45, utilities: 85, lifestyle: 180 } },
]

export const householdMultipliers = { single: 1, couple: 1.55, family: 2.2 } as const
export const lifestyleMultipliers = { lean: 0.82, balanced: 1, comfortable: 1.25 } as const

export const defaultComparison = {
  from: cities[0].slug,
  to: cities[1].slug,
} as const

const cityBySlug = new Map(cities.map((city) => [city.slug, city]))

export function getCity(slug: string) {
  const city = cityBySlug.get(slug)
  if (!city) throw new Error(`Unknown city slug: ${slug}`)
  return city
}

export function getComparisonPath(firstSlug: string, secondSlug: string) {
  return `/compare/${firstSlug}-vs-${secondSlug}`
}

export function getPossibleComparisonCount(cityCount = cities.length) {
  return cityCount < 2 ? 0 : cityCount * (cityCount - 1) / 2
}

export function getFeaturedCityPairs(limit = 6) {
  const pairs: Array<{ from: CityCost; to: CityCost }> = []
  for (let fromIndex = 0; fromIndex < cities.length; fromIndex += 1) {
    for (let toIndex = fromIndex + 1; toIndex < cities.length; toIndex += 1) {
      pairs.push({ from: cities[fromIndex], to: cities[toIndex] })
      if (pairs.length === limit) return pairs
    }
  }
  return pairs
}

export function getMonthlyCost(city: CityCost, household: keyof typeof householdMultipliers, lifestyle: keyof typeof lifestyleMultipliers) {
  const base = Object.values(city.costs).reduce((sum, value) => sum + value, 0)
  return Math.round((base * householdMultipliers[household] * lifestyleMultipliers[lifestyle]) / 10) * 10
}
