import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, BadgeDollarSign, CalendarClock, CircleGauge, Home } from "lucide-react"
import { notFound, permanentRedirect } from "next/navigation"

import { AnimatedFaqList } from "@/components/animated-faq"
import { ComparisonWorkspace } from "@/components/comparison-workspace"
import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"
import { StructuredData } from "@/components/structured-data"
import { cities, costCategories, getCanonicalComparisonPath, getCityDisplayName, getCitySeoName, getIndexableComparisonPairs, getMonthlyCost, isIndexableComparison } from "@/lib/cost-data"
import { getSocialMetadata } from "@/lib/seo"

type Props = { params: Promise<{ pair: string }> }
const formatUsd = (value: number) => `$${value.toLocaleString("en-US")}`
const formatSignedUsd = (value: number) => value === 0 ? "Same" : `${value > 0 ? "+" : "−"}${formatUsd(Math.abs(value))}`

function resolvePair(pair: string) {
  const [fromSlug, toSlug, ...rest] = pair.split("-vs-")
  if (!fromSlug || !toSlug || rest.length || fromSlug === toSlug) return null
  const from = cities.find((city) => city.slug === fromSlug)
  const to = cities.find((city) => city.slug === toSlug)
  return from && to ? { from, to } : null
}

export const dynamicParams = true

export function generateStaticParams() {
  return getIndexableComparisonPairs().map(({ from, to }) => ({
    pair: getCanonicalComparisonPath(from.slug, to.slug).replace("/compare/", ""),
  }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { pair } = await params
  const citiesPair = resolvePair(pair)
  if (!citiesPair) return { title: "City comparison" }
  const { from, to } = citiesPair
  const fromName = getCitySeoName(from)
  const toName = getCitySeoName(to)
  const canonicalPath = getCanonicalComparisonPath(from.slug, to.slug)
  const title = `${fromName} vs ${toName} Cost of Living`
  const description = `Compare living costs in ${fromName} and ${toName}, including monthly budgets, category differences and equivalent take-home pay.`
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: canonicalPath },
    robots: isIndexableComparison(from.slug, to.slug) ? { index: true, follow: true } : { index: false, follow: true },
    ...getSocialMetadata({ title, description, path: canonicalPath, type: "article" }),
  }
}

export default async function ComparisonPage({ params }: Props) {
  const { pair } = await params
  const citiesPair = resolvePair(pair)
  if (!citiesPair) notFound()
  const { from, to } = citiesPair
  const canonicalPair = getCanonicalComparisonPath(from.slug, to.slug).replace("/compare/", "")
  if (pair !== canonicalPair) permanentRedirect(`/compare/${canonicalPair}`)

  const fromName = getCityDisplayName(from)
  const toName = getCityDisplayName(to)
  const fromTotal = getMonthlyCost(from, "single", "balanced")
  const toTotal = getMonthlyCost(to, "single", "balanced")
  const difference = toTotal - fromTotal
  const percent = fromTotal === 0 ? 0 : Math.round(Math.abs(difference / fromTotal) * 100)
  const reversePercent = toTotal === 0 ? 0 : Math.round(Math.abs(difference / toTotal) * 100)
  const defaultTakeHome = 6500
  const equivalentIncome = fromTotal === 0 ? defaultTakeHome : Math.round((defaultTakeHome * toTotal) / fromTotal / 10) * 10
  const equivalentDelta = equivalentIncome - defaultTakeHome
  const pairTitle = `${fromName} vs ${toName}: cost of living`
  const comparisonSummary = difference === 0
    ? `The modeled monthly cost is the same in ${fromName} and ${toName} for one person with a balanced setting. Use the category view below to see where the two budgets still differ.`
    : `Using the same one-person balanced basket, ${toName} is ${percent}% ${difference > 0 ? "more" : "less"} expensive than ${fromName}. The total is a starting point: your home, commute and household choices determine the budget you will actually need.`
  const categoryRows = costCategories.map((category) => ({
    ...category,
    fromValue: from.costs[category.key],
    toValue: to.costs[category.key],
    difference: to.costs[category.key] - from.costs[category.key],
    fromShare: Math.round((from.costs[category.key] / fromTotal) * 100),
    toShare: Math.round((to.costs[category.key] / toTotal) * 100),
  }))
  const categoryPressure = [...categoryRows].sort((a, b) => Math.abs(b.difference) - Math.abs(a.difference)).slice(0, 4)
  const fromEssential = from.costs.housing + from.costs.groceries + from.costs.transport + from.costs.utilities
  const toEssential = to.costs.housing + to.costs.groceries + to.costs.transport + to.costs.utilities
  const fromFlexible = fromTotal - fromEssential
  const toFlexible = toTotal - toEssential
  const scenarios = ([
    ["One person", "single"],
    ["Couple", "couple"],
    ["Family of four", "family"],
  ] as const).map(([label, household]) => {
    const current = getMonthlyCost(from, household, "balanced")
    const destination = getMonthlyCost(to, household, "balanced")
    return { label, current, destination, difference: destination - current }
  })
  const faqs = [
    [`Which city is more expensive, ${fromName} or ${toName}?`, difference === 0 ? `The modeled balanced basket is the same in both cities at ${formatUsd(fromTotal)} per month for one person.` : `${toName} is modeled as ${percent}% ${difference > 0 ? "more" : "less"} expensive than ${fromName} for one person with a balanced lifestyle. The result is driven most by ${categoryPressure[0].label.toLowerCase()}.`],
    [`How much salary would I need in ${toName}?`, `If you currently take home ${formatUsd(defaultTakeHome)}` + ` per month in ${fromName}, the spending-equivalent estimate for ${toName} is ${formatUsd(equivalentIncome)}. This is a budget translation, not a market salary prediction or a tax calculation.`],
    [`What changes the ${fromName} and ${toName} comparison most?`, `${categoryPressure[0].label} has the largest modeled difference at ${formatUsd(Math.abs(categoryPressure[0].difference))} per month. Housing, transport and household size can outweigh smaller category changes, so replace those assumptions first.`],
    [`Why is the reverse percentage different?`, `The forward percentage uses ${fromName} as the base. Reversing the comparison uses ${toName} as the base, so ${fromName} is ${reversePercent}% ${difference > 0 ? "less" : "more"} expensive in the reverse statement. Both calculations can be correct because the denominator changes.`],
    [`Do these city estimates include taxes or moving costs?`, `No. The comparison covers recurring living categories in USD equivalent. Income tax, benefits, savings, debt, childcare, education, deposits, visas and one-time moving costs need to be added for your situation.`],
  ] as [string, string][]

  return (
    <main className="comparison-detail-page">
      <StructuredData data={[
        { "@context": "https://schema.org", "@type": "WebPage", name: pairTitle, description: `Compare estimated monthly living costs in ${fromName} and ${toName}, including category pressure, salary translation and household scenarios.`, dateModified: "2026-09-24", about: [{ "@type": "Place", name: fromName }, { "@type": "Place", name: toName }] },
        { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: "https://livingcostcomparison.com/" }, { "@type": "ListItem", position: 2, name: "Compare cities", item: "https://livingcostcomparison.com/compare-cities" }, { "@type": "ListItem", position: 3, name: `${fromName} vs ${toName}`, item: `https://livingcostcomparison.com${getCanonicalComparisonPath(from.slug, to.slug)}` }] },
      ]} />
      <SiteHeader />

      <section className="subpage-hero comparison-detail-hero">
        <div className="page-shell py-12 sm:py-16">
          <nav className="breadcrumbs" aria-label="Breadcrumb"><Link href="/">Home</Link><span>/</span><Link href="/compare-cities">Compare cities</Link><span>/</span><span>{fromName} vs {toName}</span></nav>
          <div className="comparison-detail-hero-grid">
            <div>
              <p className="eyebrow text-[var(--blue)]">Cost of living comparison · updated {from.updated}</p>
              <h1 className="subpage-title mt-4">{pairTitle}</h1>
              <p className="comparison-detail-lede">{comparisonSummary}</p>
              <div className="comparison-detail-hero-note"><span>Read the result in context</span><p>Start with the total, then inspect the categories and household scenarios before you turn the percentage into a salary or relocation decision.</p></div>
            </div>
            <div className="comparison-detail-hero-metrics">
              <article><span>{fromName} baseline</span><strong>{formatUsd(fromTotal)}</strong><small>per month · one person</small></article>
              <article><span>{toName} baseline</span><strong>{formatUsd(toTotal)}</strong><small>{difference === 0 ? "same modeled total" : `${formatSignedUsd(difference)} per month`}</small></article>
            </div>
          </div>
          <div className="mt-8"><ComparisonWorkspace initialFrom={from.slug} initialTo={to.slug} embedded /></div>
        </div>
      </section>

      <section className="comparison-detail-answer">
        <div className="page-shell">
          <div className="comparison-answer-header"><div><p className="eyebrow">The short answer</p><h2>{difference === 0 ? "The modeled monthly cost is the same." : <><strong>{toName}</strong> is <strong>{percent}%</strong> {difference > 0 ? "more" : "less"} expensive.</>}</h2></div><p>{difference === 0 ? `Both cities land at ${formatUsd(fromTotal)} in the balanced one-person model. The category breakdown still shows where the two baskets differ.` : `${formatUsd(Math.abs(difference))} separates the monthly baselines before you change the household, lifestyle or neighborhood assumptions.`}</p></div>
          <div className="comparison-answer-grid">
            <article><span>Monthly difference</span><strong>{difference === 0 ? "Same" : formatUsd(Math.abs(difference))}</strong><p>{difference === 0 ? "No difference in the balanced model." : `${toName} is ${difference > 0 ? "higher" : "lower"} than ${fromName}.`}</p></article>
            <article><span>Spending-equivalent income</span><strong>{formatUsd(equivalentIncome)}</strong><p>Illustration for {formatUsd(defaultTakeHome)} take-home pay in {fromName}.</p></article>
            <article><span>Largest pressure</span><strong>{categoryPressure[0].label}</strong><p>{formatUsd(Math.abs(categoryPressure[0].difference))} separates the two category estimates.</p></article>
          </div>
        </div>
      </section>

      <section className="comparison-detail-breakdown">
        <div className="page-shell comparison-detail-breakdown-grid">
          <article className="prose-panel comparison-detail-main-copy">
            <p className="eyebrow text-[var(--blue)]">Direct answer</p>
            <h2>What does the difference mean each month?</h2>
            <p>The estimated monthly budget is <strong>{formatUsd(fromTotal)}</strong> in {fromName} and <strong>{formatUsd(toTotal)}</strong> in {toName}. That is a difference of <strong>{difference === 0 ? "no modeled difference" : `${formatUsd(Math.abs(difference))} per month`}</strong> before personal adjustments.</p>
            <p>This comparison keeps the same household and lifestyle on both sides. It answers one narrow question: what happens when the same recurring basket is repriced in another city? It does not decide which neighborhood, salary, tax system or lifestyle will fit you best.</p>
            <h2>Monthly cost breakdown for {fromName} and {toName}</h2>
            <div className="research-table-wrap pair-static-table">
              <table className="research-table">
                <caption>{`Server-rendered monthly cost comparison for ${fromName} and ${toName} in USD equivalent`}</caption>
                <thead><tr><th>Category</th><th>{fromName}</th><th>{toName}</th><th>Difference</th></tr></thead>
                <tbody>
                  {categoryRows.map((category) => <tr key={category.key}><th>{category.label}</th><td data-label={fromName}>{formatUsd(category.fromValue)}</td><td data-label={toName}>{formatUsd(category.toValue)}</td><td data-label="Difference">{formatSignedUsd(category.difference)}</td></tr>)}
                  <tr className="pair-static-total"><th>Total</th><td data-label={fromName}>{formatUsd(fromTotal)}</td><td data-label={toName}>{formatUsd(toTotal)}</td><td data-label="Difference">{formatSignedUsd(difference)}</td></tr>
                </tbody>
              </table>
            </div>
            <h2>Where the comparison changes most</h2>
            <p>{categoryPressure[0].label} is the largest modeled pressure point, but the order matters for your own decision. Check the first four categories below before you spend time optimizing smaller lines.</p>
            <div className="comparison-pressure-list">{categoryPressure.map((category, index) => <article key={category.key}><span>0{index + 1}</span><div><h3>{category.label}</h3><p>{fromName} {formatUsd(category.fromValue)} · {toName} {formatUsd(category.toValue)} · {category.difference === 0 ? "same modeled amount" : `${formatUsd(Math.abs(category.difference))} ${category.difference > 0 ? "higher" : "lower"} in ${toName}`}</p><small>{category.description}</small></div></article>)}</div>
          </article>
          <aside className="comparison-detail-rail">
            <div className="side-card"><p className="footer-label">Continue planning</p><Link href={`/cost-of-living/${from.country.toLowerCase().replaceAll(" ", "-")}/${from.slug}`}>{from.city} cost guide <ArrowRight /></Link><Link href={`/cost-of-living/${to.country.toLowerCase().replaceAll(" ", "-")}/${to.slug}`}>{to.city} cost guide <ArrowRight /></Link><Link href="/methodology">How we calculate costs <ArrowRight /></Link></div>
            <div className="comparison-detail-side-note"><span>Core versus flexible spending</span><p>{fromName} has {formatUsd(fromEssential)} in core categories and {formatUsd(fromFlexible)} in flexible categories. {toName} has {formatUsd(toEssential)} and {formatUsd(toFlexible)}. This split helps you see whether the gap is structural or mostly discretionary.</p></div>
          </aside>
        </div>
      </section>

      <section className="comparison-detail-salary">
        <div className="page-shell comparison-detail-salary-grid">
          <div><p className="eyebrow">Salary translation</p><h2>A cost difference is not automatically a salary offer.</h2><p>If you take home {formatUsd(defaultTakeHome)} in {fromName}, repricing the same balanced basket in {toName} implies about {formatUsd(equivalentIncome)} per month. The difference is {formatUsd(Math.abs(equivalentDelta))}, but your gross offer can move differently after tax, benefits, pension and employer coverage.</p></div>
          <div className="comparison-salary-card"><div><span>Current take-home</span><strong>{formatUsd(defaultTakeHome)}</strong><small>{fromName}</small></div><div className="comparison-salary-arrow">→</div><div><span>Spending-equivalent</span><strong>{formatUsd(equivalentIncome)}</strong><small>{toName}</small></div><p>Use the salary calculator for your own income, household and lifestyle settings.</p><Link href="/salary-comparison">Open salary calculator <ArrowRight /></Link></div>
        </div>
      </section>

      <section className="comparison-detail-scenarios">
        <div className="page-shell">
          <header className="comparison-detail-section-heading"><div><p className="eyebrow">Household scenarios</p><h2>The gap changes when the household changes.</h2></div><p>Housing and food do not scale in exactly the same way for every household. These balanced scenarios show how the recurring comparison moves when the same city pair is used for one person, a couple or a family.</p></header>
          <div className="comparison-scenario-table" role="table" aria-label={`Household scenarios for ${fromName} and ${toName}`}><div role="row" className="comparison-scenario-head"><span>Household</span><span>{fromName}</span><span>{toName}</span><span>Difference</span></div>{scenarios.map((scenario) => <div role="row" className="comparison-scenario-row" key={scenario.label}><strong>{scenario.label}</strong><span>{formatUsd(scenario.current)}</span><span>{formatUsd(scenario.destination)}</span><b>{formatSignedUsd(scenario.difference)}</b></div>)}</div>
        </div>
      </section>

      <section className="comparison-detail-reading">
        <div className="page-shell comparison-detail-reading-grid">
          <div><p className="eyebrow">Use the result correctly</p><h2>A comparison narrows the decision. It does not make it for you.</h2><p>Replace broad assumptions with the details that actually determine your move. The closer the headline totals are, the more important those details become.</p></div>
          <div className="comparison-reading-list"><div><Home /><span><strong>Price the neighborhood</strong>Use the home size, lease terms and commute you would really choose.</span></div><div><BadgeDollarSign /><span><strong>Translate take-home pay</strong>Compare net income and benefits, not only gross salary.</span></div><div><CircleGauge /><span><strong>Check your margin</strong>Look at what remains after core costs, savings and recurring obligations.</span></div><div><CalendarClock /><span><strong>Keep the date visible</strong>Prices, exchange rates and housing markets change at different speeds.</span></div></div>
        </div>
      </section>

      <section className="comparison-detail-faq">
        <div className="page-shell comparison-detail-faq-grid"><header><p className="eyebrow">Comparison FAQ</p><h2>Questions that change the answer.</h2><p>Use these checks when the headline percentage looks surprising or when the two cities appear unusually close.</p></header><AnimatedFaqList className="article-faq" items={faqs} /></div>
      </section>

      <section className="pair-research-section"><div className="page-shell"><div className="pair-research-links"><Link href="/guides/how-to-compare-cost-of-living">How to compare living costs correctly <ArrowRight /></Link><Link href="/guides/equivalent-salary-for-relocation">How to calculate an equivalent salary <ArrowRight /></Link><Link href="/compare-cities#compare">Build another comparison <ArrowRight /></Link></div></div></section>
      <SiteFooter />
    </main>
  )
}
