import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { notFound } from "next/navigation"

import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"
import { StructuredData } from "@/components/structured-data"
import { cities, costCategories, getMonthlyCost } from "@/lib/cost-data"

type Props = { params: Promise<{ country: string; city: string }> }
const countrySlug = (country: string) => country.toLowerCase().replaceAll(" ", "-")

export function generateStaticParams() {
  return cities.map((city) => ({ country: countrySlug(city.country), city: city.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const values = await params
  const city = cities.find((item) => item.slug === values.city && countrySlug(item.country) === values.country)
  if (!city) return { title: "Cost of living" }
  return {
    title: `Cost of Living in ${city.city} (2026 Prices & Budget)`,
    description: `See a sample monthly budget for ${city.city}, including housing, food, transport, utilities and lifestyle costs.`,
    alternates: { canonical: `/cost-of-living/${values.country}/${values.city}` },
  }
}

export default async function CityPage({ params }: Props) {
  const values = await params
  const city = cities.find((item) => item.slug === values.city && countrySlug(item.country) === values.country)
  if (!city) notFound()
  const total = getMonthlyCost(city, "single", "balanced")
  const housingShare = Math.round((city.costs.housing / total) * 100)

  return (
    <main>
      <StructuredData data={{ "@context": "https://schema.org", "@type": "Dataset", name: `Cost of living in ${city.city}`, description: `Prototype monthly living-cost estimates for ${city.city}, ${city.country}.`, dateModified: "2026-09-18", spatialCoverage: { "@type": "Place", name: `${city.city}, ${city.country}` }, creator: { "@type": "Organization", name: "Living Cost Comparison" } }} />
      <SiteHeader />
      <section className="subpage-hero">
        <div className="page-shell py-12 sm:py-16">
          <nav className="breadcrumbs" aria-label="Breadcrumb"><Link href="/">Home</Link><span>/</span><span>{city.country}</span><span>/</span><span>{city.city}</span></nav>
          <div className="mt-9 grid items-end gap-8 lg:grid-cols-[1fr_320px]">
            <div>
              <p className="eyebrow text-[var(--blue)]">City cost guide · Updated {city.updated}</p>
              <h1 className="subpage-title mt-4">Cost of living in {city.city}</h1>
              <p className="mt-5 max-w-2xl text-base leading-7 text-[var(--muted-ink)]">A single person with a balanced lifestyle may plan around <strong className="text-[var(--ink)]">${total.toLocaleString()} per month</strong> in our current prototype model, with housing accounting for about {housingShare}%.</p>
            </div>
            <div className="city-stat"><span>Indicative monthly budget</span><strong>${total.toLocaleString()}</strong><small>USD equivalent · 1 person</small></div>
          </div>
        </div>
      </section>

      <section className="page-shell py-16">
        <div className="content-grid">
          <article className="prose-panel">
            <p className="eyebrow text-[var(--blue)]">Monthly budget</p>
            <h2>Typical costs by category</h2>
            <div className="cost-table" role="table" aria-label={`${city.city} cost categories`}>
              {costCategories.map((category) => <div className="cost-row" role="row" key={category.key}><span role="cell">{category.label}</span><strong role="cell">${city.costs[category.key].toLocaleString()}</strong><span className="cost-track" aria-hidden="true"><i style={{ width: `${Math.max(8, (city.costs[category.key] / city.costs.housing) * 100)}%` }} /></span></div>)}
            </div>
            <h2>What this budget includes</h2>
            <p>The estimate combines housing, groceries, local transport, basic utilities and discretionary lifestyle spending. It is designed as a planning baseline, not a quote: neighbourhood, lease terms, household needs and personal habits can move the total substantially.</p>
            <h2>Compare {city.city} with another city</h2>
            <div className="link-grid">{cities.filter((item) => item.slug !== city.slug).slice(0, 4).map((item) => <Link href={`/compare/${city.slug}-vs-${item.slug}`} key={item.slug}>{city.city} vs {item.city}<ArrowRight /></Link>)}</div>
          </article>
          <aside className="side-card">
            <p className="footer-label">Data note</p>
            <p className="text-sm leading-6 text-[var(--muted-ink)]">Figures on this first release are illustrative product data. Production pages will show source coverage and confidence at category level.</p>
            <Link href="/methodology">Read the methodology <ArrowRight /></Link>
          </aside>
        </div>
      </section>
      <SiteFooter />
    </main>
  )
}
