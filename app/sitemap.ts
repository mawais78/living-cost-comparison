import type { MetadataRoute } from "next"
import { cities } from "@/lib/cost-data"

const origin = "https://livingcostcomparison.com"
const countrySlug = (country: string) => country.toLowerCase().replaceAll(" ", "-")

export default function sitemap(): MetadataRoute.Sitemap {
  const updated = new Date("2026-09-18T00:00:00Z")
  const cityPages = cities.map((city) => ({ url: `${origin}/cost-of-living/${countrySlug(city.country)}/${city.slug}`, lastModified: updated, changeFrequency: "monthly" as const, priority: 0.8 }))
  const comparisonPages = ["london-vs-amsterdam", "london-vs-lisbon", "new-york-vs-london", "dubai-vs-london", "karachi-vs-dubai"].map((pair) => ({ url: `${origin}/compare/${pair}`, lastModified: updated, changeFrequency: "monthly" as const, priority: 0.9 }))
  return [{ url: `${origin}/`, lastModified: updated, changeFrequency: "weekly", priority: 1 }, { url: `${origin}/methodology`, lastModified: updated, changeFrequency: "monthly", priority: 0.5 }, ...comparisonPages, ...cityPages]
}
