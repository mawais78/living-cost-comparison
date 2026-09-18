export type CostCategory = "housing" | "groceries" | "transport" | "utilities" | "lifestyle"

export type CityCost = {
  slug: string
  city: string
  country: string
  currency: string
  currencySymbol: string
  accent: string
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

export const cities: CityCost[] = [
  { slug: "london", city: "London", country: "United Kingdom", currency: "GBP", currencySymbol: "£", accent: "#4f7cff", updated: "September 2026", costs: { housing: 2300, groceries: 520, transport: 220, utilities: 310, lifestyle: 650 } },
  { slug: "amsterdam", city: "Amsterdam", country: "Netherlands", currency: "EUR", currencySymbol: "€", accent: "#f4b84a", updated: "September 2026", costs: { housing: 1950, groceries: 480, transport: 120, utilities: 270, lifestyle: 600 } },
  { slug: "new-york", city: "New York", country: "United States", currency: "USD", currencySymbol: "$", accent: "#ef6b56", updated: "September 2026", costs: { housing: 3200, groceries: 650, transport: 132, utilities: 280, lifestyle: 780 } },
  { slug: "lisbon", city: "Lisbon", country: "Portugal", currency: "EUR", currencySymbol: "€", accent: "#24a87b", updated: "September 2026", costs: { housing: 1300, groceries: 370, transport: 55, utilities: 180, lifestyle: 420 } },
  { slug: "dubai", city: "Dubai", country: "United Arab Emirates", currency: "AED", currencySymbol: "د.إ", accent: "#9b6ee8", updated: "September 2026", costs: { housing: 2200, groceries: 500, transport: 210, utilities: 250, lifestyle: 700 } },
  { slug: "karachi", city: "Karachi", country: "Pakistan", currency: "PKR", currencySymbol: "₨", accent: "#16a3b6", updated: "September 2026", costs: { housing: 350, groceries: 210, transport: 45, utilities: 85, lifestyle: 180 } },
]

export const householdMultipliers = { single: 1, couple: 1.55, family: 2.2 } as const
export const lifestyleMultipliers = { lean: 0.82, balanced: 1, comfortable: 1.25 } as const

export function getCity(slug: string) {
  return cities.find((city) => city.slug === slug) ?? cities[0]
}

export function getMonthlyCost(city: CityCost, household: keyof typeof householdMultipliers, lifestyle: keyof typeof lifestyleMultipliers) {
  const base = Object.values(city.costs).reduce((sum, value) => sum + value, 0)
  return Math.round((base * householdMultipliers[household] * lifestyleMultipliers[lifestyle]) / 10) * 10
}
