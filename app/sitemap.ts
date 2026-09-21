import type { MetadataRoute } from "next"

const origin = "https://livingcostcomparison.com"

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date("2026-09-22T00:00:00Z")
  const pages = [
    ["/", "weekly", 1],
    ["/compare-cities", "weekly", 0.95],
    ["/salary-comparison", "monthly", 0.9],
    ["/guides/how-to-compare-cost-of-living", "monthly", 0.85],
    ["/guides/equivalent-salary-for-relocation", "monthly", 0.85],
    ["/guides/cost-of-living-vs-cost-of-labor", "monthly", 0.8],
    ["/methodology", "monthly", 0.7],
    ["/sources", "monthly", 0.65],
    ["/about", "yearly", 0.45],
  ] as const

  return pages.map(([path, changeFrequency, priority]) => ({
    url: `${origin}${path}`,
    lastModified,
    changeFrequency,
    priority,
  }))
}
