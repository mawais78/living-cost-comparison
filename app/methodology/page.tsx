import type { Metadata } from "next"
import Link from "next/link"

import { ResearchCitations } from "@/components/research-citations"
import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"
import { StructuredData } from "@/components/structured-data"
import { researchUpdated } from "@/lib/research"

export const metadata: Metadata = {
  title: "Cost of Living Methodology",
  description: "How Living Cost Comparison defines baskets, normalizes currencies, models households, measures confidence and decides which pages are ready for search.",
  alternates: { canonical: "/methodology" },
}

const contents = [
  ["status", "Current data status"], ["definitions", "Definitions"], ["basket", "Budget basket"], ["calculation", "Calculation"], ["geography", "Geography and time"], ["confidence", "Confidence"], ["indexing", "Publication standard"], ["limitations", "Limitations"], ["changes", "Change log"],
]

export default function MethodologyPage() {
  return (
    <main className="methodology-page">
      <SiteHeader />
      <StructuredData data={[
        { "@context": "https://schema.org", "@type": "TechArticle", headline: "Living Cost Comparison methodology and data standards", description: metadata.description, datePublished: "2026-09-18", dateModified: "2026-09-22", author: { "@type": "Organization", name: "Living Cost Comparison" }, publisher: { "@type": "Organization", name: "Living Cost Comparison" }, mainEntityOfPage: "https://livingcostcomparison.com/methodology" },
        { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: "https://livingcostcomparison.com/" }, { "@type": "ListItem", position: 2, name: "Methodology", item: "https://livingcostcomparison.com/methodology" }] },
      ]} />

      <header className="method-mast">
        <div className="page-shell method-mast-grid">
          <div><nav className="breadcrumbs" aria-label="Breadcrumb"><Link href="/">Home</Link><span>/</span><span>Methodology</span></nav><p className="eyebrow">Methodology · version 0.2</p><h1>A comparison is only credible when its assumptions can be inspected.</h1><p>This document defines how city prices, household choices, salary and uncertainty will become one decision model. It also marks the line between the current prototype and production data.</p></div>
          <dl><div><dt>Last reviewed</dt><dd>{researchUpdated}</dd></div><div><dt>Model status</dt><dd>Research beta</dd></div><div><dt>City data status</dt><dd>Prototype</dd></div></dl>
        </div>
      </header>

      <div className="page-shell method-layout">
        <aside className="method-toc"><p className="footer-label">On this page</p>{contents.map(([id, label], index) => <a key={id} href={`#${id}`}><span>{String(index + 1).padStart(2, "0")}</span>{label}</a>)}</aside>
        <article className="method-article">
          <section id="status" className="method-alert"><p className="eyebrow">Current data status</p><h2>The interface is live locally; the displayed city figures are illustrative.</h2><p>The calculators currently use a small prototype dataset to validate the experience. Those figures do not yet have the source-level observation records required by this methodology. For that reason, city profiles, pair pages and the city index are excluded from the search sitemap and marked not to be indexed.</p><p>The research guides, methodology and sources register are based on cited institutional material and are the first publication-ready content cluster.</p></section>

          <section id="definitions"><p className="method-number">01</p><h2>Definitions keep different questions separate</h2><dl className="definition-list">
            <div><dt>Spatial price comparison</dt><dd>Compares the price of a defined basket between places at roughly the same time.</dd></div>
            <div><dt>Inflation</dt><dd>Measures how prices change through time for a defined population and basket. It does not rank city price levels.</dd></div>
            <div><dt>Purchasing power parity</dt><dd>A currency conversion factor and spatial price measure designed to equalize purchasing power between economies for a defined aggregate.</dd></div>
            <div><dt>Living-cost equivalent</dt><dd>The income implied by repricing the selected household basket in the destination.</dd></div>
            <div><dt>Take-home equivalent</dt><dd>The net income needed to fund the destination basket while preserving a chosen disposable margin.</dd></div>
            <div><dt>Market salary</dt><dd>Observed compensation for a role in a labor market. It is related to talent supply and demand, not only consumer prices.</dd></div>
          </dl></section>

          <section id="basket"><p className="method-number">02</p><h2>The budget basket</h2><p>A useful result begins with a transparent monthly basket. Categories stay separate so a user can replace assumptions that do not match their life.</p><div className="basket-grid">
            <article><h3>Housing</h3><p>Rent or owner cost, home size, local recurring fees and basic maintenance. Geography and tenure are mandatory labels.</p></article>
            <article><h3>Food</h3><p>Groceries and food away from home are separate because household size and habits affect them differently.</p></article>
            <article><h3>Transport</h3><p>Public transport or vehicle costs, including fuel, parking, insurance and routine maintenance when relevant.</p></article>
            <article><h3>Utilities</h3><p>Energy, water, broadband and mobile service, adjusted for what housing costs already include.</p></article>
            <article><h3>Healthcare</h3><p>Required coverage and routine out-of-pocket costs. Public eligibility and employer cover must be stated.</p></article>
            <article><h3>Conditional costs</h3><p>Childcare, private education and other large costs activate only for relevant household cases.</p></article>
            <article><h3>Lifestyle</h3><p>Personal care, clothing, fitness, entertainment and other discretionary spending—not a vague remainder.</p></article>
            <article><h3>Outside the basket</h3><p>Taxes, debt principal, savings and one-time moving costs are shown separately rather than hidden in the index.</p></article>
          </div><p>The US BLS Consumer Expenditure Survey is useful evidence for why weights matter: in 2024, housing represented 33.4% of average US consumer-unit spending and transport 17.0%. Those figures inform the design principle; they are not used as worldwide weights.</p></section>

          <section id="calculation"><p className="method-number">03</p><h2>Calculation sequence</h2><ol className="calculation-flow">
            <li><span>Collect</span><p>Retain the native price, currency, unit, geography, observation period, source and collection method.</p></li>
            <li><span>Validate</span><p>Standardize units, remove duplicates, flag outliers and check unexpected movement against independent evidence.</p></li>
            <li><span>Aggregate</span><p>Produce a representative item value only when coverage is adequate. The statistic—median, weighted mean or range—is disclosed.</p></li>
            <li><span>Build</span><p>Multiply item/category values by the selected household quantities and lifestyle assumptions.</p></li>
            <li><span>Convert</span><p>Show native values first, then apply a separately dated reference-currency rate.</p></li>
            <li><span>Compare</span><p>Calculate destination divided by current-city cost. Keep taxes and market salary as separate analytical layers.</p></li>
          </ol><div className="formula-card"><span>Basket difference</span><strong>(destination basket ÷ current basket − 1) × 100</strong><small>The reverse comparison uses a different denominator and therefore a different percentage.</small></div><div className="formula-card"><span>Simple spending-equivalent income</span><strong>current take-home × destination basket ÷ current basket</strong><small>The advanced take-home model instead preserves a selected disposable margin and calculates taxes separately.</small></div></section>

          <section id="geography"><p className="method-number">04</p><h2>Geography, time and currency</h2><div className="method-rule-list">
            <article><h3>Do not silently substitute geographies</h3><p>City proper, metro, state/region and country are distinct. A metropolitan index can support a metro comparison but not a neighborhood rent claim.</p></article>
            <article><h3>Observation date beats page-update date</h3><p>Every material category records when prices were observed. Republishing a page does not make an old observation current.</p></article>
            <article><h3>Spatial indexes are not inflation</h3><p>World Bank and Eurostat PPP/price-level data compare places. National CPI and household-cost indexes measure change over time. We do not splice the two without explanation.</p></article>
            <article><h3>Currency is its own moving input</h3><p>Native values remain available. Reference-currency totals carry an exchange-rate source and date so foreign-exchange movement is not reported as local price inflation.</p></article>
          </div></section>

          <section id="confidence"><p className="method-number">05</p><h2>Confidence must be explainable</h2><p>High, medium and low are summaries of evidence—not decoration. The score will combine:</p><ul className="check-list two-column"><li>Source reliability and independence</li><li>Observation recency</li><li>Number of usable observations</li><li>Geographic match</li><li>Agreement or price dispersion</li><li>Share of the basket directly covered</li></ul><p>A comparison cannot receive a high overall confidence label when a material category such as housing has weak coverage. Modeled values remain labeled and cannot improve confidence as if they were observations.</p></section>

          <section id="indexing"><p className="method-number">06</p><h2>Publication and search-index standard</h2><p>A city or pair page becomes indexable only when it meets every requirement:</p><ol className="publication-gate"><li>Core categories meet the documented coverage threshold.</li><li>The direct answer shows observation period, geography and currency state.</li><li>An evidence panel explains sources, gaps and confidence.</li><li>The page provides original computed insight and useful item/category detail.</li><li>The canonical URL is unique and included in the sitemap.</li><li>Internal links connect the page to its entities, method and relevant guides.</li><li>No critical licensing, freshness or quality warning remains unresolved.</li></ol><p>This gate implements Google's people-first guidance: publish pages because they complete a user task, not because a city-name template can generate them.</p></section>

          <section id="limitations"><p className="method-number">07</p><h2>Known limitations</h2><ul className="check-list"><li>City averages cannot represent every neighborhood or housing standard.</li><li>Price data can change faster than official datasets are released.</li><li>Healthcare, education and taxes may not be comparable without eligibility context.</li><li>A standard basket cannot know a user's debts, savings goals or consumption preferences.</li><li>Exchange rates can change the reference-currency total without changing local prices.</li><li>Equivalent salary is not a prediction of local market pay or employer policy.</li></ul></section>

          <section id="changes"><p className="method-number">08</p><h2>Methodology change log</h2><div className="change-log"><div><time dateTime="2026-09-22">22 Sep 2026</time><p>Defined indexation gate, evidence record, geography rules and separate spending/take-home salary layers. Added institutional source register.</p></div><div><time dateTime="2026-09-18">18 Sep 2026</time><p>Published initial prototype calculation and explicit illustrative-data disclosure.</p></div></div></section>

          <ResearchCitations ids={["world-bank-icp", "eurostat-ppp", "bea-rpp", "bls-ce", "oecd-taxing-wages", "ons-household-costs", "mit-living-wage"]} />
          <div className="method-next"><h2>Inspect each source and its limits.</h2><Link href="/sources">Open the source register →</Link></div>
        </article>
      </div>
      <SiteFooter />
    </main>
  )
}
