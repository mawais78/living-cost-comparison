import type { MetadataRoute } from "next"

import { cities, getCanonicalComparisonPath, getIndexableComparisonPairs } from "@/lib/cost-data"

const origin = "https://livingcostcomparison.com"

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date("2026-09-24T00:00:00Z")
  const pages = [
    ["/", "weekly", 1],
    ["/compare-cities", "weekly", 0.95],
    ["/salary-comparison", "monthly", 0.9],
    ["/cost-of-living-index", "weekly", 0.9],
    ["/guides", "monthly", 0.9],
    ["/guides/how-to-compare-cost-of-living", "monthly", 0.85],
    ["/guides/equivalent-salary-for-relocation", "monthly", 0.85],
    ["/guides/cost-of-living-vs-cost-of-labor", "monthly", 0.8],
    ["/methodology", "monthly", 0.7],
    ["/about", "yearly", 0.45],
  ] as const

  const staticPages = pages.map(([path, changeFrequency, priority]) => ({
    url: `${origin}${path}`,
    lastModified,
    changeFrequency,
    priority,
  }))

  const cityPages = cities.map((city) => ({
    url: `${origin}/cost-of-living/${city.country.toLowerCase().replaceAll(" ", "-")}/${city.slug}`,
    lastModified,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }))

  const comparisonPages = getIndexableComparisonPairs().map(({ from, to }) => ({
    url: `${origin}${getCanonicalComparisonPath(from.slug, to.slug)}`,
    lastModified,
    changeFrequency: "monthly" as const,
    priority: 0.78,
  }))

  return [...staticPages, ...cityPages, ...comparisonPages]
}
