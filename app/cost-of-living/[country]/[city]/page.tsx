import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { notFound } from "next/navigation"

import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"
import { ResearchCitations } from "@/components/research-citations"
import { StructuredData } from "@/components/structured-data"
import { cities, costCategories, getComparisonPath, getMonthlyCost } from "@/lib/cost-data"

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
    title: `Cost of Living in ${city.city} — Prototype Budget`,
    description: `Explore an illustrative monthly budget for ${city.city} and learn which housing, household and data assumptions a production city guide must include.`,
    alternates: { canonical: `/cost-of-living/${values.country}/${values.city}` },
    robots: { index: false, follow: true },
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
      <StructuredData data={{ "@context": "https://schema.org", "@type": "WebPage", name: `Cost of living in ${city.city} — prototype budget`, description: `An illustrative monthly budget for ${city.city}, with research guidance and explicit prototype-data limits.`, dateModified: "2026-09-22", about: { "@type": "Place", name: `${city.city}, ${city.country}` } }} />
      <SiteHeader />
      <section className="subpage-hero">
        <div className="page-shell py-12 sm:py-16">
          <nav className="breadcrumbs" aria-label="Breadcrumb"><Link href="/">Home</Link><span>/</span><span>{city.country}</span><span>/</span><span>{city.city}</span></nav>
          <div className="mt-9 grid items-end gap-8 lg:grid-cols-[1fr_320px]">
            <div>
              <p className="eyebrow text-[var(--blue)]">City cost prototype · {city.updated}</p>
              <h1 className="subpage-title mt-4">Cost of living in {city.city}</h1>
              <p className="mt-5 max-w-2xl text-base leading-7 text-[var(--muted-ink)]">The current illustrative model places a one-person balanced budget at <strong className="text-[var(--ink)]">${total.toLocaleString()} per month</strong>, with housing accounting for about {housingShare}%. These are interface-testing values, not verified live prices.</p>
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
            <h2>What a production {city.city} guide will add</h2>
            <ul>
              <li>Native-currency item prices with observation periods and units.</li>
              <li>A named city or metropolitan geography and no silent regional fallback.</li>
              <li>Housing ranges by relevant tenure and home size.</li>
              <li>Healthcare, childcare and transport options that activate only when applicable.</li>
              <li>Source coverage, sample or observation counts, dispersion and category confidence.</li>
              <li>Separate currency-conversion, tax and salary-market context.</li>
            </ul>
            <h2>How to research your personal budget now</h2>
            <p>Start with the home and commute you would actually choose. Add local utility inclusions, healthcare eligibility and any childcare or education requirement. Convert the resulting native-currency budget with a dated exchange rate, then compare it with expected take-home pay rather than gross salary.</p>
            <h2>Compare {city.city} with another city</h2>
            <div className="link-grid">{cities.filter((item) => item.slug !== city.slug).slice(0, 4).map((item) => <Link href={getComparisonPath(city.slug, item.slug)} key={item.slug}>{city.city} vs {item.city}<ArrowRight /></Link>)}</div>
          </article>
          <aside className="side-card">
            <p className="footer-label">Data note</p>
            <p className="text-sm leading-6 text-[var(--muted-ink)]">Figures on this first release are illustrative product data. Production pages will show source coverage and confidence at category level.</p>
            <Link href="/methodology">Read the methodology <ArrowRight /></Link>
          </aside>
        </div>
      </section>
      <section className="city-research-section"><div className="page-shell"><ResearchCitations ids={["world-bank-icp", "bls-ce", "oecd-taxing-wages", "mit-living-wage"]} title="References for building a complete city budget" /></div></section>
      <SiteFooter />
    </main>
  )
}
