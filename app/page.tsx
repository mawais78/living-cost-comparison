import type { Metadata } from "next"
import { ArrowRight } from "lucide-react"
import Link from "next/link"

import { CompareLauncher } from "@/components/compare-launcher"
import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"
import { StructuredData } from "@/components/structured-data"
import { cities, getMonthlyCost } from "@/lib/cost-data"

export const metadata: Metadata = {
  title: { absolute: "Cost of Living Comparison: Cities & Salaries" },
  description: "Compare cost of living between cities, estimate the take-home salary needed after moving, and inspect the budget assumptions behind the result.",
  alternates: { canonical: "/" },
}

const ranked = cities.map((city) => ({ city, total: getMonthlyCost(city, "single", "balanced") })).sort((a, b) => b.total - a.total)
const maxBudget = Math.max(...ranked.map((item) => item.total))
const money = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 })
const faqs = [
  ["What does a cost-of-living comparison measure?", "It compares the price of a defined basket of household expenses between places. A useful comparison states the household, housing choice, geography, currency date and categories behind the headline percentage."],
  ["Is cost of living the same as inflation?", "No. A cost-of-living index between cities is a spatial comparison. Inflation measures price change through time for a defined economy and basket."],
  ["Can I use the result to compare salaries?", "Use it to estimate a spending-power target, then calculate taxes and compare role-specific market pay separately. An equivalent salary is not a prediction of what an employer will offer."],
  ["Are the current city values live market prices?", "No. The current calculator values are an explicitly labeled prototype dataset. City and pair pages remain outside the search index until production observations meet the published source and confidence standard."],
]

export default function Home() {
  return (
    <main>
      <StructuredData data={[
        { "@context": "https://schema.org", "@type": "WebSite", name: "Living Cost Comparison", alternateName: "LivingCostComparison.com", url: "https://livingcostcomparison.com/", description: metadata.description },
        { "@context": "https://schema.org", "@type": "Organization", name: "Living Cost Comparison", url: "https://livingcostcomparison.com/", logo: "https://livingcostcomparison.com/brand/logo-mark.svg" },
        { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faqs.map(([question, answer]) => ({ "@type": "Question", name: question, acceptedAnswer: { "@type": "Answer", text: answer } })) },
      ]} />
      <SiteHeader />

      <section className="landing-hero">
        <div className="page-shell landing-hero-grid">
          <div className="landing-hero-copy">
            <p className="eyebrow">Cost of living comparison</p>
            <h1>Know what a move changes before you commit.</h1>
            <p>Compare a like-for-like monthly budget, estimate the take-home pay needed in another city and see which assumptions have the greatest effect.</p>
            <div className="landing-trust"><span>Household-aware</span><span>Salary-focused</span><span>Sources explained</span></div>
          </div>
          <CompareLauncher />
        </div>
      </section>

      <section className="home-answer-section">
        <div className="page-shell home-answer-grid">
          <header><p className="eyebrow">What the comparison tells you</p><h2>One decision, broken into three answers.</h2></header>
          <div>
            <article><span>01</span><h3>What would the same household budget cost?</h3><p>Compare housing, food, transport, utilities and other recurring expenses using the same household and lifestyle assumptions.</p><Link href="/compare-cities">Compare two cities <ArrowRight /></Link></article>
            <article><span>02</span><h3>What take-home income could preserve it?</h3><p>Translate the destination budget into a planning target without confusing spending equivalence with gross salary or local market pay.</p><Link href="/salary-comparison">Estimate equivalent salary <ArrowRight /></Link></article>
            <article><span>03</span><h3>How much confidence belongs in the result?</h3><p>Check the geography, observation period, currency, coverage and whether a value was observed, calculated or modeled.</p><Link href="/methodology">Read the data standard <ArrowRight /></Link></article>
          </div>
        </div>
      </section>

      <section className="home-evidence-section">
        <div className="page-shell home-evidence-grid">
          <div><p className="eyebrow">Why a personal basket matters</p><h2>Large categories decide more than a neat average.</h2><p>Official expenditure research shows why one universal index cannot describe every household. In the US Bureau of Labor Statistics' 2024 survey, housing accounted for 33.4% of average spending, transport 17.0% and food 12.9%. Those are US averages—not global weights—but they demonstrate how a different home or commute can move the result.</p><a href="https://www.bls.gov/opub/reports/consumer-expenditures/2024/home.htm" target="_blank" rel="noreferrer">Review the BLS source ↗</a></div>
          <dl><div><dt>Housing</dt><dd>33.4%</dd><small>of average US spending</small></div><div><dt>Transport</dt><dd>17.0%</dd><small>of average US spending</small></div><div><dt>Food</dt><dd>12.9%</dd><small>of average US spending</small></div></dl>
        </div>
      </section>

      <section className="landing-spectrum">
        <div className="page-shell landing-spectrum-grid">
          <div className="landing-spectrum-copy"><p className="eyebrow">Prototype data explorer</p><h2>See how the comparison interface works.</h2><p>The six-city model below is illustrative and shown in USD equivalent for one person with a balanced setting. It is not presented as verified live pricing.</p><Link href="/cost-of-living-index">Open the prototype index <span>→</span></Link></div>
          <div className="landing-budget-chart" aria-label="Illustrative monthly city budgets">
            {ranked.map(({ city, total }, index) => <div key={city.slug} className="landing-budget-row"><span>{String(index + 1).padStart(2, "0")}</span><strong>{city.city}</strong><div><i style={{ width: `${total / maxBudget * 100}%` }} /></div><b>{money.format(total)}</b></div>)}
          </div>
        </div>
      </section>

      <section className="home-method-section-rich">
        <div className="page-shell">
          <header><p className="eyebrow">A defensible comparison</p><h2>Use the same method in both places.</h2></header>
          <div className="home-method-grid">
            <article><span>01</span><h3>Match the household</h3><p>Keep adults, children, housing tenure and lifestyle constant before you compare prices.</p></article>
            <article><span>02</span><h3>Name the geography</h3><p>City proper, metro and country averages are different. The page must say which one supports the number.</p></article>
            <article><span>03</span><h3>Retain native prices</h3><p>Convert to one display currency only after preserving local values and dating the exchange rate.</p></article>
            <article><span>04</span><h3>Separate taxes</h3><p>Living costs price the basket. Tax rules turn gross salary into take-home pay and require a separate calculation.</p></article>
            <article><span>05</span><h3>Inspect confidence</h3><p>Source reliability, coverage, recency and price dispersion decide how precisely a result can be stated.</p></article>
            <article><span>06</span><h3>Test what matters</h3><p>Change rent, childcare and transport before relying on a narrow city difference.</p></article>
          </div>
          <Link className="text-link" href="/guides/how-to-compare-cost-of-living">Read the complete comparison method →</Link>
        </div>
      </section>

      <section className="home-guides-section">
        <div className="page-shell home-guides-grid">
          <header><p className="eyebrow">Research guides</p><h2>Move from a percentage to a decision.</h2><p>Each guide answers a different question and links the statistical concept to a practical worksheet.</p></header>
          <div>
            <Link href="/guides/how-to-compare-cost-of-living"><span>01 · Method</span><h3>How to compare cost of living between cities</h3><p>Build a like-for-like basket, interpret indexes and check data quality.</p><b>Read guide →</b></Link>
            <Link href="/guides/equivalent-salary-for-relocation"><span>02 · Salary</span><h3>How to calculate equivalent salary after moving</h3><p>Preserve take-home margin, include benefits and keep moving costs separate.</p><b>Read guide →</b></Link>
            <Link href="/guides/cost-of-living-vs-cost-of-labor"><span>03 · Compensation</span><h3>Cost of living versus cost of labor</h3><p>Understand why an expensive city does not automatically mean an equal pay increase.</p><b>Read guide →</b></Link>
          </div>
        </div>
      </section>

      <section className="home-transparency-section">
        <div className="page-shell home-transparency-grid"><div><p className="eyebrow">Current release status</p><h2>Research first. City scale after evidence.</h2></div><div><p>The editorial pages use cited official material. The current city values remain prototype data while the observation and licensing pipeline is built.</p><p>City and pair templates are intentionally withheld from search indexing until they have source-level coverage, dates, geography and confidence.</p><div><Link href="/sources">Inspect all sources →</Link><Link href="/about">Read the editorial policy →</Link></div></div></div>
      </section>

      <section className="home-faq-section"><div className="page-shell home-faq-layout"><header className="home-section-intro home-faq-heading"><p className="eyebrow">Frequently asked</p><h2>Understand the result before using it.</h2></header><div className="home-faq-list">{faqs.map(([question, answer]) => <details key={question}><summary>{question}<i>+</i></summary><p>{answer}</p></details>)}</div></div></section>

      <section className="home-final-cta"><div className="page-shell"><span>Start with your own scenario</span><div><p className="eyebrow">Cost of living comparison</p><h2>Compare two cities using the same household and lifestyle.</h2></div><Link href="/compare-cities#compare">Open the comparison workspace <ArrowRight /></Link></div></section>
      <SiteFooter />
    </main>
  )
}
