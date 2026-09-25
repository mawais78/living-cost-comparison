import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { notFound } from "next/navigation"

import { AnimatedFaqList } from "@/components/animated-faq"
import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"
import { StructuredData } from "@/components/structured-data"
import { cities, costCategories, getCanonicalComparisonPath, getCityDisplayName, getCityLocation, getCitySeoName, getMonthlyCost, type CostCategory } from "@/lib/cost-data"
import { getSocialMetadata } from "@/lib/seo"

type Props = { params: Promise<{ country: string; city: string }> }
const countrySlug = (country: string) => country.toLowerCase().replaceAll(" ", "-")
const formatUsd = (value: number) => `$${value.toLocaleString("en-US")}`

const categoryAdvice: Record<CostCategory, string> = {
  housing: "The address, home size, lease terms and whether utilities are included will move this line more than any other assumption.",
  groceries: "Household size, diet, imported products and how often you cook at home are the main variables here.",
  dining: "Meal frequency, neighborhood and the balance between casual meals and restaurants can change this category quickly.",
  transport: "A transit-first routine and a car-dependent routine can produce very different totals, especially when parking and insurance apply.",
  utilities: "Climate, home size, energy efficiency and the services included in rent affect this recurring amount.",
  healthcare: "Eligibility, employer cover, insurance choices and routine out-of-pocket care should be checked for the household you are moving with.",
  personal: "Clothing, grooming and household essentials are flexible, so use your own monthly pattern when you replace the baseline.",
  leisure: "Fitness, entertainment, hobbies and short trips are included as a planning allowance rather than a fixed bill.",
}

function getRankLabel(rank: number, totalCities: number) {
  const highCutoff = Math.ceil(totalCities * 0.2)
  const lowCutoff = Math.floor(totalCities * 0.8)
  if (rank <= highCutoff) return "one of the higher-cost cities in the current index"
  if (rank >= lowCutoff) return "one of the lower-cost cities in the current index"
  return "within the middle range of the current index"
}

export function generateStaticParams() {
  return cities.map((city) => ({ country: countrySlug(city.country), city: city.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const values = await params
  const city = cities.find((item) => item.slug === values.city && countrySlug(item.country) === values.country)
  if (!city) return { title: "Cost of living" }
  const displayName = getCitySeoName(city)
  const total = getMonthlyCost(city, "single", "balanced")
  const canonicalPath = `/cost-of-living/${values.country}/${values.city}`
  const title = `Cost of Living in ${displayName}`
  const description = `Estimate monthly living costs in ${displayName}, including housing, food, transport, utilities and household budget scenarios.`
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: canonicalPath },
    ...getSocialMetadata({
      title,
      description: `A one-person balanced budget in ${displayName} is estimated at ${formatUsd(total)} per month. Explore the breakdown.`,
      path: canonicalPath,
      type: "article",
    }),
  }
}

export default async function CityPage({ params }: Props) {
  const values = await params
  const city = cities.find((item) => item.slug === values.city && countrySlug(item.country) === values.country)
  if (!city) notFound()

  const displayName = getCityDisplayName(city)
  const locationName = getCityLocation(city)
  const total = getMonthlyCost(city, "single", "balanced")
  const leanTotal = getMonthlyCost(city, "single", "lean")
  const comfortableTotal = getMonthlyCost(city, "single", "comfortable")
  const coupleTotal = getMonthlyCost(city, "couple", "balanced")
  const familyTotal = getMonthlyCost(city, "family", "balanced")
  const annualTotal = total * 12
  const categoryRows = costCategories.map((category) => ({
    ...category,
    value: city.costs[category.key],
    share: Math.round((city.costs[category.key] / total) * 100),
  })).sort((a, b) => b.value - a.value)
  const topCategories = categoryRows.slice(0, 3)
  const essentialTotal = city.costs.housing + city.costs.groceries + city.costs.transport + city.costs.utilities
  const flexibleTotal = total - essentialTotal
  const rankedCities = cities.map((item) => ({ city: item, total: getMonthlyCost(item, "single", "balanced") })).sort((a, b) => b.total - a.total)
  const rank = rankedCities.findIndex((item) => item.city.slug === city.slug) + 1
  const rankLabel = getRankLabel(rank, cities.length)
  const averageTotal = Math.round(rankedCities.reduce((sum, item) => sum + item.total, 0) / rankedCities.length / 10) * 10
  const nearbyBudgetPeers = cities
    .filter((item) => item.slug !== city.slug)
    .sort((a, b) => Math.abs(getMonthlyCost(a, "single", "balanced") - total) - Math.abs(getMonthlyCost(b, "single", "balanced") - total))
    .slice(0, 6)
  const faqs = [
    [`How much money do I need to live in ${displayName}?`, `A one-person balanced planning baseline is ${formatUsd(total)} per month, or about ${formatUsd(annualTotal)} per year before savings, debt repayments and one-time moving costs. A lean baseline is about ${formatUsd(leanTotal)} and a comfortable baseline is about ${formatUsd(comfortableTotal)}.`],
    [`What is the biggest cost in ${displayName}?`, `${topCategories[0].label} is the largest modeled category at ${formatUsd(topCategories[0].value)} per month, about ${topCategories[0].share}% of the one-person balanced baseline. Your neighborhood and home choice can move this figure substantially.`],
    [`Is ${displayName} expensive compared with other cities?`, `${displayName} is ${rankLabel}, ranked ${rank} of ${cities.length} cities by the current one-person balanced estimate. The current all-city average is about ${formatUsd(averageTotal)} per month, so use the ranking as orientation rather than a personal budget verdict.`],
    [`Does this ${displayName} estimate include salary and taxes?`, `No. This page estimates recurring living costs in USD equivalent. Taxes, benefits, employer coverage, savings goals, childcare, education and market salary should be added for your own household and offer.`],
  ] as [string, string][]

  return (
    <main className="city-guide-page">
      <StructuredData data={[
        { "@context": "https://schema.org", "@type": "WebPage", name: `Cost of living in ${displayName}`, description: `Estimated monthly living costs in ${locationName}, with category detail, household scenarios and relocation planning guidance.`, dateModified: "2026-09-24", about: { "@type": "Place", name: locationName } },
        { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: "https://livingcostcomparison.com/" }, { "@type": "ListItem", position: 2, name: "Cost of living", item: "https://livingcostcomparison.com/cost-of-living-index" }, { "@type": "ListItem", position: 3, name: displayName, item: `https://livingcostcomparison.com/cost-of-living/${values.country}/${values.city}` }] },
      ]} />
      <SiteHeader />

      <section className="subpage-hero city-guide-hero">
        <div className="page-shell py-12 sm:py-16">
          <nav className="breadcrumbs" aria-label="Breadcrumb"><Link href="/">Home</Link><span>/</span><Link href="/cost-of-living-index">Cost of living</Link><span>/</span><span>{city.country}</span>{city.region && <><span>/</span><span>{city.region}</span></>}<span>/</span><span>{city.city}</span></nav>
          <div className="city-guide-hero-grid">
            <div>
              <p className="eyebrow text-[var(--blue)]">City cost guide · updated {city.updated}</p>
              <h1 className="subpage-title mt-4">Cost of living in {displayName}</h1>
              <p className="city-guide-lede">A one-person balanced budget in {displayName} is estimated at <strong>{formatUsd(total)} per month</strong>. That baseline keeps the same household and lifestyle assumptions used across the index, so you can see what changes when the city changes.</p>
              <p className="city-guide-context">Housing accounts for {topCategories.find((item) => item.key === "housing")?.share ?? 0}% of the baseline. The rest is split across food, mobility, utilities, healthcare and flexible spending, giving you a starting point to replace with your own rent, commute and priorities.</p>
            </div>
            <div className="city-guide-hero-stats">
              <div className="city-stat"><span>Indicative monthly budget</span><strong>{formatUsd(total)}</strong><small>USD equivalent · 1 person</small></div>
              <div className="city-guide-rank"><span>Current index position</span><strong>{String(rank).padStart(2, "0")} <small>/ {cities.length}</small></strong><p>{rankLabel}</p></div>
            </div>
          </div>
        </div>
      </section>

      <section className="city-guide-overview">
        <div className="page-shell city-guide-overview-grid">
          <article className="city-guide-overview-copy">
            <p className="eyebrow">At a glance</p>
            <h2>The number is useful when you can see what is inside it.</h2>
            <p>{displayName} has a modeled recurring baseline of {formatUsd(total)} for one adult with a balanced lifestyle. The estimate is not a promise of an individual budget. It is a consistent reference point for comparing cities before you plug in a real home, commute and take-home salary.</p>
            <p>The essential part of this baseline is {formatUsd(essentialTotal)} for housing, groceries, transport and utilities. The remaining {formatUsd(flexibleTotal)} covers dining out, healthcare, personal care and leisure. Those two groups respond differently to a move: housing and transport often change because of geography, while flexible spending changes because of habits and choices.</p>
          </article>
          <div className="city-guide-stat-grid" aria-label={`${displayName} budget summary`}>
            <article><span>Annual baseline</span><strong>{formatUsd(annualTotal)}</strong><p>Recurring estimate before savings and one-time costs.</p></article>
            <article><span>Essential costs</span><strong>{formatUsd(essentialTotal)}</strong><p>Housing, groceries, transport and utilities.</p></article>
            <article><span>Flexible costs</span><strong>{formatUsd(flexibleTotal)}</strong><p>Dining, healthcare, personal care and leisure.</p></article>
            <article><span>Top category</span><strong>{topCategories[0].label}</strong><p>{formatUsd(topCategories[0].value)} per month in the baseline.</p></article>
          </div>
        </div>
      </section>

      <section className="city-guide-budget">
        <div className="page-shell city-guide-budget-grid">
          <article className="prose-panel city-guide-main-copy">
            <p className="eyebrow text-[var(--blue)]">Monthly budget</p>
            <h2>Typical costs by category</h2>
            <p>These category values are shown in USD equivalent so the same basket can be compared across countries. Keep the category structure, then replace the assumptions that matter to you. A furnished apartment, a longer commute or a different healthcare arrangement can change the result without changing the city.</p>
            <div className="city-guide-cost-table" role="table" aria-label={`${displayName} cost categories`}>
              <div className="city-guide-cost-head" role="row"><span>Category</span><span>Monthly estimate</span><span>Share</span></div>
              {categoryRows.map((category) => <div className="city-guide-cost-row" role="row" key={category.key}><div><strong>{category.label}</strong><small>{category.description}</small></div><b>{formatUsd(category.value)}</b><span>{category.share}%</span></div>)}
              <div className="city-guide-cost-total" role="row"><strong>Balanced monthly baseline</strong><b>{formatUsd(total)}</b><span>100%</span></div>
            </div>

            <h2>What drives the {displayName} budget?</h2>
            <p>The three largest modeled categories account for {topCategories.reduce((sum, item) => sum + item.share, 0)}% of the baseline. Start your personal research there, because changing a large category usually matters more than optimizing a small discretionary line.</p>
            <div className="city-guide-category-insights">
              {topCategories.map((category, index) => <article key={category.key}><span>0{index + 1}</span><div><h3>{category.label} · {formatUsd(category.value)}</h3><p>{categoryAdvice[category.key]} In this baseline, it represents about {category.share}% of monthly spending.</p></div></article>)}
            </div>

            <h2>How to turn this estimate into your budget</h2>
            <p>Use the baseline as a checklist, not as a fixed quote. Start with the home and neighborhood you would actually choose, then test the commute that follows from that address. Add local utility inclusions, healthcare eligibility and any family costs that apply to your move. Finally, compare the resulting monthly total with take-home pay after tax rather than a gross salary headline.</p>
            <ol className="city-guide-steps">
              <li><span>01</span><div><strong>Replace housing first</strong><p>Use a realistic rent, home size and neighborhood. This is usually the largest source of variance.</p></div></li>
              <li><span>02</span><div><strong>Choose your transport pattern</strong><p>Price the routine you would use, including transit, fuel, parking, insurance and maintenance when relevant.</p></div></li>
              <li><span>03</span><div><strong>Add household-specific costs</strong><p>Switch on childcare, education, healthcare cover, debt payments or savings targets only when they apply to your household.</p></div></li>
              <li><span>04</span><div><strong>Stress-test the result</strong><p>Run a lean and comfortable version of the budget so a single average does not decide the move for you.</p></div></li>
            </ol>
          </article>

          <aside className="city-guide-rail">
            <div className="city-guide-rail-card">
              <p className="footer-label">Use this page for</p>
              <ul><li>Relocation planning</li><li>Offer and salary checks</li><li>Remote-work budgeting</li><li>City shortlisting</li></ul>
            </div>
            <div className="city-guide-rail-card city-guide-rail-note">
              <p className="footer-label">Important context</p>
              <p>USD-equivalent values make cities comparable. They do not replace a local quote, tax calculation or a neighborhood-level housing search.</p>
              <Link href="/methodology">Read how the estimate works <ArrowRight /></Link>
            </div>
          </aside>
        </div>
      </section>

      <section className="city-guide-scenarios">
        <div className="page-shell">
          <header className="city-guide-section-heading"><div><p className="eyebrow">Household scenarios</p><h2>The same city changes with the household.</h2></div><p>These scenarios hold the city and balanced lifestyle constant, then scale the recurring basket for a different household size. Add your own fixed costs before treating them as a move budget.</p></header>
          <div className="city-guide-scenario-grid">
            <article><span>01 · One person</span><strong>{formatUsd(total)}</strong><p>Balanced monthly estimate for one adult.</p><small>{formatUsd(leanTotal)} lean · {formatUsd(comfortableTotal)} comfortable</small></article>
            <article><span>02 · Couple</span><strong>{formatUsd(coupleTotal)}</strong><p>Balanced monthly estimate for two adults.</p><small>Adjust food, housing and transport for your routine.</small></article>
            <article><span>03 · Family of four</span><strong>{formatUsd(familyTotal)}</strong><p>Balanced monthly estimate for a four-person household.</p><small>Childcare, education and larger housing are separate checks.</small></article>
          </div>
        </div>
      </section>

      <section className="city-guide-comparison">
        <div className="page-shell city-guide-comparison-grid">
          <div><p className="eyebrow">Keep planning</p><h2>Compare {displayName} with a similar budget city.</h2><p>Use a close budget peer to understand where the total is coming from, then use the full comparison workspace to change household, lifestyle and income assumptions.</p></div>
          <div className="city-guide-related-links">{nearbyBudgetPeers.map((item) => <Link href={getCanonicalComparisonPath(city.slug, item.slug)} key={item.slug}><span><strong>{displayName}</strong><small>{getCityDisplayName(item)}</small></span><b>{formatUsd(getMonthlyCost(item, "single", "balanced"))} baseline</b><ArrowRight /></Link>)}</div>
        </div>
      </section>

      <section className="city-guide-faq">
        <div className="page-shell city-guide-faq-grid">
          <header><p className="eyebrow">{displayName} cost guide FAQ</p><h2>Questions to answer before you move.</h2><p>Use the estimate as a starting point, then replace the large assumptions with your own household details.</p></header>
          <AnimatedFaqList className="article-faq" items={faqs} />
        </div>
      </section>

      <section className="city-guide-next">
        <div className="page-shell city-guide-next-grid">
          <div><p className="eyebrow">Next step</p><h2>Build the comparison around your actual offer.</h2><p>Compare {displayName} with another city, translate a take-home salary or read the method before you make a decision.</p></div>
          <div className="city-guide-next-links"><Link href="/compare-cities#compare">Compare two cities <ArrowRight /></Link><Link href="/salary-comparison">Check an equivalent salary <ArrowRight /></Link><Link href="/guides/how-to-compare-cost-of-living">Read the comparison guide <ArrowRight /></Link></div>
        </div>
      </section>

      <SiteFooter />
    </main>
  )
}
