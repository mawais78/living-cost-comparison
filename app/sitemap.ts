import type { MetadataRoute } from "next"

import { cities, getCanonicalComparisonPath, getIndexableComparisonPairs } from "@/lib/cost-data"

const origin = "https://livingcostcomparison.com"

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date("2026-09-26T00:00:00Z")
  const pages = [
    "/",
    "/compare-cities",
    "/salary-comparison",
    "/cost-of-living-index",
    "/guides",
    "/guides/how-to-compare-cost-of-living",
    "/guides/equivalent-salary-for-relocation",
    "/guides/cost-of-living-vs-cost-of-labor",
    "/methodology",
    "/about",
  ] as const

  const staticPages = pages.map((path) => ({
    url: `${origin}${path}`,
    lastModified,
  }))

  const cityPages = cities.map((city) => ({
    url: `${origin}/cost-of-living/${city.country.toLowerCase().replaceAll(" ", "-")}/${city.slug}`,
    lastModified,
  }))

  const comparisonPages = getIndexableComparisonPairs().map(({ from, to }) => ({
    url: `${origin}${getCanonicalComparisonPath(from.slug, to.slug)}`,
    lastModified,
  }))

  return [...staticPages, ...cityPages, ...comparisonPages]
}
