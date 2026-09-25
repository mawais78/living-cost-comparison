import type { Metadata } from "next"
import { ArrowRight } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"
import { StructuredData } from "@/components/structured-data"
import { cities, costCategories, dataEdition } from "@/lib/cost-data"
import { getSocialMetadata } from "@/lib/seo"

export const metadata: Metadata = {
  title: "Cost of Living Comparison Methodology",
  description: "See how Living Cost Comparison turns city costs, household choices and income into a consistent monthly budget and equivalent-salary estimate.",
  alternates: { canonical: "/methodology" },
  ...getSocialMetadata({
    title: "Cost of Living Comparison Methodology",
    description: "See how city estimates become comparable monthly budgets and equivalent-income planning figures.",
    path: "/methodology",
  }),
}

const steps = [
  ["01", "Set the scenario", "Choose the two cities, household size and lifestyle level."],
  ["02", "Build each basket", "Estimate the same recurring cost categories in both locations."],
  ["03", "Apply adjustments", "Scale category values for the selected household and lifestyle."],
  ["04", "Compare like for like", "Calculate the monthly difference using the current city as the base."],
  ["05", "Translate the result", "Estimate the take-home income needed to preserve spending power."],
]

const glossary = [
  ["Spatial comparison", "A comparison of a defined basket between places at roughly the same time."],
  ["Inflation", "A measure of price change through time. It does not rank city price levels."],
  ["Living-cost equivalent", "The take-home income implied by repricing the selected household basket in another city."],
  ["Market salary", "What employers pay for a role in a labor market. It is separate from household spending."],
]

export default function MethodologyPage() {
  return (
    <main className="methodology-page method2-page">
      <SiteHeader />
      <StructuredData data={[
        { "@context": "https://schema.org", "@type": "TechArticle", headline: "Living Cost Comparison methodology", description: metadata.description, datePublished: "2026-09-18T00:00:00Z", dateModified: "2026-09-23T00:00:00Z", author: { "@type": "Organization", name: "Living Cost Comparison", url: "https://livingcostcomparison.com/about" }, publisher: { "@type": "Organization", name: "Living Cost Comparison", url: "https://livingcostcomparison.com/" }, mainEntityOfPage: "https://livingcostcomparison.com/methodology" },
        { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: "https://livingcostcomparison.com/" }, { "@type": "ListItem", position: 2, name: "Methodology", item: "https://livingcostcomparison.com/methodology" }] },
      ]} />

      <header className="method2-hero">
        <div className="page-shell">
          <nav className="breadcrumbs" aria-label="Breadcrumb"><Link href="/">Home</Link><span>/</span><span>Methodology</span></nav>
          <div className="method2-hero-grid">
            <div className="method2-hero-copy">
              <p className="eyebrow">How the calculation works</p>
              <h1>One method.<br />Two cities.<br /><span>Your</span> scenario.</h1>
              <p>We compare the same household and lifestyle in both places, keep the major cost categories visible and separate recurring living costs from taxes and market salary.</p>
              <Link href="/compare-cities#compare">Use the calculator <ArrowRight aria-hidden="true" /></Link>
            </div>

            <div className="method2-model" aria-label="Comparison model summary">
              <div className="method2-model-head"><span>Comparison model</span><small>Like for like</small></div>
              <div className="method2-model-row"><span>Household</span><strong>Held constant</strong></div>
              <div className="method2-model-row"><span>Lifestyle</span><strong>Held constant</strong></div>
              <div className="method2-model-row"><span>Cost categories</span><strong>Matched</strong></div>
              <div className="method2-model-cities"><span>City A basket</span><i>versus</i><span>City B basket</span></div>
              <div className="method2-model-output"><span>Output</span><strong>Monthly difference<br />+ equivalent income</strong></div>
            </div>
          </div>

          <dl className="method2-meta">
            <div><dt>Updated</dt><dd>23 September 2026</dd></div>
            <div><dt>Coverage</dt><dd>{cities.length} cities</dd></div>
            <div><dt>Display currency</dt><dd>USD equivalent</dd></div>
            <div><dt>Primary use</dt><dd>Relocation planning</dd></div>
          </dl>
        </div>
      </header>

      <nav className="method2-jump" aria-label="Methodology sections">
        <div className="page-shell">
          <a href="#process">Process</a><a href="#basket">Basket</a><a href="#controls">Controls</a><a href="#formulas">Formulas</a><a href="#quality">Quality</a><a href="#limits">Limits</a>
        </div>
      </nav>

      <section id="process" className="method2-process">
        <div className="page-shell">
          <header className="method2-section-head"><div><p className="eyebrow">01 · Process</p><h2>From two places to one comparable answer.</h2></div><p>The order matters. We define the scenario before comparing prices, then translate the difference into a monthly budget and salary-planning figure.</p></header>
          <ol className="method2-process-line">
            {steps.map(([number, title, description]) => <li key={number}><span>{number}</span><h3>{title}</h3><p>{description}</p></li>)}
          </ol>
        </div>
      </section>

      <section id="basket" className="method2-basket">
        <div className="page-shell method2-basket-grid">
          <div className="method2-basket-intro"><p className="eyebrow">02 · The monthly basket</p><h2>The total stays understandable because the categories stay separate.</h2><p>A universal average cannot describe every household. The basket is intentionally modular, so major assumptions can be replaced with the choices a person expects to make.</p></div>
          <div className="method2-ledger">
            <div className="method2-ledger-head"><span>Included in the recurring estimate</span><span>What changes it</span></div>
            {costCategories.map((category) => <div key={category.key}><strong>{category.label}</strong><span>{category.description}</span></div>)}
            <aside><strong>Kept outside the basket</strong><p>Income tax, debt repayments, savings targets, childcare, education and one-time moving costs are calculated or considered separately.</p></aside>
          </div>
        </div>
      </section>

      <section id="controls" className="method2-controls">
        <div className="page-shell">
          <header><div><p className="eyebrow">03 · Comparison controls</p><h2>Change the city, not the person.</h2></div><p>A like-for-like result holds personal settings steady while local costs change.</p></header>
          <div className="method2-control-board">
            <div><span>Fixed on both sides</span><strong>Household size</strong><strong>Lifestyle level</strong><strong>Cost categories</strong></div>
            <div><span>Changes by location</span><strong>Category prices</strong><strong>Currency conversion</strong><strong>Monthly total</strong></div>
            <div><span>Handled separately</span><strong>Income tax</strong><strong>Market salary</strong><strong>Moving costs</strong></div>
          </div>
        </div>
      </section>

      <section id="formulas" className="method2-formulas">
        <div className="page-shell">
          <header className="method2-section-head"><div><p className="eyebrow">04 · Formulas</p><h2>The denominator determines the answer.</h2></div><p>The current city is always the base. Reversing a comparison changes the denominator, so the percentage is not simply the same number with a minus sign.</p></header>
          <figure className="method2-formula-visual">
            <Image
              src="/images/methodology/formula-calculation.svg?v=2"
              alt="Cost difference and spending-equivalent income formulas for comparing destination and current baskets."
              width={1800}
              height={820}
            />
          </figure>
        </div>
      </section>

      <section id="quality" className="method2-quality">
        <div className="page-shell">
          <header className="method2-quality-head">
            <div><p className="eyebrow">05 · Reading the result</p><h2>Three checks before you use the headline percentage.</h2></div>
            <p>Close city scores should be treated as a range, not a decisive ranking. Personal housing and transport choices can outweigh a narrow difference.</p>
          </header>
          <ol className="method2-quality-cards">
            <li><span>01</span><h3>Geography</h3><p>City, metropolitan and national figures describe different places. Use the level that matches the decision.</p></li>
            <li><span>02</span><h3>Freshness</h3><p>The observation period matters more than the date a page was republished.</p></li>
            <li><span>03</span><h3>Coverage</h3><p>Housing and other large categories deserve more attention than a small discretionary line.</p></li>
          </ol>
          <div className="method2-quality-scale" aria-label="How to interpret estimate quality"><span>Use as orientation</span><i /><span>Replace major inputs</span><i /><strong>Use for planning</strong></div>
        </div>
      </section>

      <section id="limits" className="method2-reference">
        <div className="page-shell">
          <header className="method2-reference-head">
            <div><p className="eyebrow">06 · Use with care</p><h2>Know the terms. Know the limits.</h2></div>
            <p>Definitions keep the comparison precise. Limits show where your own research and real quotes need to replace a broad estimate.</p>
          </header>
          <div className="method2-reference-grid">
            <div className="method2-terms">
              <span className="method2-reference-label">Useful distinctions</span>
              <dl>{glossary.map(([term, definition]) => <div key={term}><dt>{term}</dt><dd>{definition}</dd></div>)}</dl>
            </div>
            <aside className="method2-limit-card">
              <span className="method2-reference-label">What an estimate cannot know</span>
              <ul>
                <li>Your exact neighborhood, lease terms or housing standard.</li>
                <li>Your eligibility for healthcare, childcare or public benefits.</li>
                <li>Your debts, savings goals or one-time relocation expenses.</li>
                <li>The market salary for your role, level and employer.</li>
                <li>Future exchange-rate or price movement.</li>
              </ul>
            </aside>
          </div>
          <aside className="method2-provenance">
            <div><span className="method2-reference-label">Current data provenance</span><h3>A consistent planning model, not a live price feed.</h3></div>
            <div><p>The {dataEdition} edition uses rounded USD-equivalent estimates maintained by Living Cost Comparison. Every city uses the same category structure so places can be compared consistently.</p><p>Individual values do not currently include provider-level citations or live exchange-rate timestamps. Treat them as orientation, then validate rent, transport, utilities, healthcare and other material costs with current local primary sources before making a financial commitment.</p></div>
          </aside>
        </div>
      </section>

      <section className="method2-cta">
        <div className="page-shell"><div><p className="eyebrow">Put the method to work</p><h2>Build a comparison around your household.</h2></div><Link href="/compare-cities#compare">Compare two cities <ArrowRight aria-hidden="true" /></Link></div>
      </section>
      <SiteFooter />
    </main>
  )
}
