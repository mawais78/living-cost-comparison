import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, BadgeDollarSign, CalendarClock, CircleGauge, Home } from "lucide-react"
import { notFound } from "next/navigation"

import { ComparisonWorkspace } from "@/components/comparison-workspace"
import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"
import { StructuredData } from "@/components/structured-data"
import { cities, getMonthlyCost } from "@/lib/cost-data"

type Props = { params: Promise<{ pair: string }> }

function resolvePair(pair: string) {
  const [fromSlug, toSlug, ...rest] = pair.split("-vs-")
  if (!fromSlug || !toSlug || rest.length || fromSlug === toSlug) return null
  const from = cities.find((city) => city.slug === fromSlug)
  const to = cities.find((city) => city.slug === toSlug)
  return from && to ? { from, to } : null
}

export function generateStaticParams() {
  return [
    { pair: "london-vs-amsterdam" },
    { pair: "london-vs-lisbon" },
    { pair: "new-york-vs-london" },
    { pair: "dubai-vs-london" },
    { pair: "karachi-vs-dubai" },
  ]
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { pair } = await params
  const citiesPair = resolvePair(pair)
  if (!citiesPair) return { title: "City comparison" }
  const { from, to } = citiesPair
  return {
    title: `${from.city} vs ${to.city} Cost of Living (2026)`,
    description: `Compare the cost of living in ${from.city} and ${to.city}, including housing, groceries, transport and salary equivalence.`,
    alternates: { canonical: `/compare/${pair}` },
  }
}

export default async function ComparisonPage({ params }: Props) {
  const { pair } = await params
  const citiesPair = resolvePair(pair)
  if (!citiesPair) notFound()
  const { from, to } = citiesPair
  const fromTotal = getMonthlyCost(from, "single", "balanced")
  const toTotal = getMonthlyCost(to, "single", "balanced")
  const difference = toTotal - fromTotal
  const percent = Math.round(Math.abs(difference / fromTotal) * 100)

  return (
    <main>
      <StructuredData data={{ "@context": "https://schema.org", "@type": "WebPage", name: `${from.city} vs ${to.city} cost of living`, dateModified: "2026-09-18", breadcrumb: { "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: "https://livingcostcomparison.com/" }, { "@type": "ListItem", position: 2, name: `${from.city} vs ${to.city}` }] } }} />
      <SiteHeader />
      <section className="subpage-hero">
        <div className="page-shell py-12 sm:py-16">
          <nav className="breadcrumbs" aria-label="Breadcrumb"><Link href="/">Home</Link><span>/</span><span>City comparison</span></nav>
          <p className="eyebrow mt-9 text-[var(--blue)]">Cost of living comparison · 2026</p>
          <h1 className="subpage-title mt-4">{from.city} vs {to.city}: cost of living</h1>
          <p className="mt-5 max-w-3xl text-base leading-7 text-[var(--muted-ink)]">For a single person with a balanced lifestyle, {to.city} is estimated to be <strong className="text-[var(--ink)]">{percent}% {difference >= 0 ? "more" : "less"} expensive</strong> than {from.city}. Adjust the assumptions below for a comparison that fits you.</p>
          <div className="mt-8"><ComparisonWorkspace initialFrom={from.slug} initialTo={to.slug} embedded /></div>
        </div>
      </section>

      <section className="page-shell py-16">
        <div className="content-grid">
          <article className="prose-panel">
            <p className="eyebrow text-[var(--blue)]">Direct answer</p>
            <h2>How much does the difference mean each month?</h2>
            <p>Our prototype budget estimates {from.city} at <strong>${fromTotal.toLocaleString()}</strong> per month and {to.city} at <strong>${toTotal.toLocaleString()}</strong>. That is a difference of <strong>${Math.abs(difference).toLocaleString()} per month</strong> before personal adjustments.</p>
            <p>Housing is usually the largest swing factor, but transport, groceries and lifestyle spending can materially change the result. The calculator keeps those assumptions visible so the headline percentage is not mistaken for a universal figure.</p>
            <h2>How to use this comparison</h2>
            <div className="info-list">
              <div><Home /><span><strong>Start with housing</strong>Use the rent level and household size that best match your plans.</span></div>
              <div><BadgeDollarSign /><span><strong>Translate take-home pay</strong>Compare net monthly income, not headline gross salary.</span></div>
              <div><CircleGauge /><span><strong>Check your margin</strong>Look at what remains after core costs, not only the total cost index.</span></div>
              <div><CalendarClock /><span><strong>Check freshness</strong>Prices move at different speeds, so review the date and confidence by category.</span></div>
            </div>
          </article>
          <aside className="side-card">
            <p className="footer-label">Continue researching</p>
            <Link href={`/cost-of-living/${from.country.toLowerCase().replaceAll(" ", "-")}/${from.slug}`}>{from.city} cost guide <ArrowRight /></Link>
            <Link href={`/cost-of-living/${to.country.toLowerCase().replaceAll(" ", "-")}/${to.slug}`}>{to.city} cost guide <ArrowRight /></Link>
            <Link href="/methodology">How we calculate costs <ArrowRight /></Link>
          </aside>
        </div>
      </section>
      <SiteFooter />
    </main>
  )
}
