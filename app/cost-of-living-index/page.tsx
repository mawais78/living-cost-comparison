import type { Metadata } from "next"
import Link from "next/link"

import { CityIndexExplorer } from "@/components/city-index-explorer"
import { ResearchCitations } from "@/components/research-citations"
import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"
import { StructuredData } from "@/components/structured-data"
import { cities, getMonthlyCost } from "@/lib/cost-data"

export const metadata: Metadata = {
  title: "Cost of Living Index by City — Prototype Explorer",
  description: "Learn how to read a city cost-of-living index and explore the current six-city prototype normalized to London = 100.",
  alternates: { canonical: "/cost-of-living-index" },
  robots: { index: false, follow: true },
}

const totals = cities.map((city) => getMonthlyCost(city, "single", "balanced"))

export default function CostOfLivingIndexPage() {
  return (
    <main className="city-index-page">
      <SiteHeader />
      <StructuredData data={{ "@context": "https://schema.org", "@type": "WebPage", name: "Cost of Living Index by City — Prototype Explorer", description: metadata.description, url: "https://livingcostcomparison.com/cost-of-living-index" }} />

      <header className="city-index-mast">
        <div className="page-shell">
          <nav className="breadcrumbs" aria-label="Breadcrumb"><Link href="/">Home</Link><span>/</span><span>City index</span></nav>
          <div className="city-index-mast-grid"><div><p className="eyebrow">Cost of living index · prototype</p><h1>Explore how a relative city index works.</h1><p>Search and sort six illustrative city budgets, then learn what an index can—and cannot—tell you.</p></div><dl><div><dt>Reference</dt><dd>London = 100</dd></div><div><dt>Highest model</dt><dd>${Math.max(...totals).toLocaleString("en-US")}</dd></div><div><dt>Lowest model</dt><dd>${Math.min(...totals).toLocaleString("en-US")}</dd></div></dl></div>
        </div>
      </header>

      <section className="city-index-data">
        <div className="page-shell"><div className="city-index-data-head"><div><span>Data explorer</span><h2>Prototype city ranking</h2></div><p>September 2026 · USD equivalent · one person · balanced lifestyle</p></div><CityIndexExplorer /></div>
      </section>

      <section className="index-definition">
        <div className="page-shell index-definition-grid">
          <div><p className="eyebrow">Read the measure correctly</p><h2>A spatial index is not inflation.</h2></div>
          <div className="index-definition-cards"><article><span>Cost index</span><h3>Compares places at one point in time.</h3><p>A score of 120 means the modeled basket costs about 20% more than the London reference. It describes relative price levels across cities.</p></article><article><span>Inflation index</span><h3>Tracks price change through time.</h3><p>Measures such as CPI show whether a basket becomes more expensive over months or years. They answer a different question.</p></article></div>
        </div>
      </section>

      <section className="index-reading-section">
        <div className="page-shell index-reading-grid-rich">
          <header><p className="eyebrow">How to read the score</p><h2>Every index needs a base, basket, geography and date.</h2></header>
          <div>
            <article><span>Base</span><h3>100 is a reference, not an average person</h3><p>Here, London is set to 100. A city at 120 has a modeled basket 20% above the London reference under the same assumptions.</p></article>
            <article><span>Basket</span><h3>The result follows its weights</h3><p>An index weighted toward housing can differ sharply from one centered on groceries or a car-free household.</p></article>
            <article><span>Geography</span><h3>Country and city indexes answer different questions</h3><p>World Bank and Eurostat price-level indexes are national. BEA Regional Price Parities can compare US states and metros. Neither should be silently relabeled as a neighborhood price.</p></article>
            <article><span>Date</span><h3>Exchange rates and price observations move separately</h3><p>A reference-currency total can change because the currency moved even when local rent and groceries did not.</p></article>
          </div>
        </div>
      </section>

      <section className="index-direction-section"><div className="page-shell index-direction-grid"><div><p className="eyebrow">Direction matters</p><h2>A 20% increase does not reverse to a 20% decrease.</h2><p>Moving from an index of 100 to 120 is a 20% increase. Moving from 120 to 100 is about a 16.7% decrease because the starting value—the denominator—has changed.</p></div><div className="formula-card"><span>Relative difference</span><strong>(destination ÷ current − 1) × 100</strong><small>Always name the starting city.</small></div></div></section>

      <section className="index-method-note">
        <div className="page-shell index-method-grid"><div><span>Do not over-rank close scores</span><p>Neighborhood choice, household needs, exchange rates and data freshness can matter more than a few index points.</p></div><div><span>Use the same basket</span><p>All cities use the same five categories and household assumptions so the comparison remains interpretable.</p></div><Link href="/methodology">Open full methodology →</Link></div>
      </section>

      <section className="index-sources">
        <div className="page-shell index-sources-grid"><header><p className="eyebrow">Reference material</p><h2>The statistical ideas behind the interface.</h2></header><div><a href="https://www.worldbank.org/en/programs/icp/faq" target="_blank" rel="noreferrer"><span>01</span><strong>World Bank · International Comparison Program</strong><i>Spatial price indexes and interpretation ↗</i></a><a href="https://www.bea.gov/data/prices-inflation/regional-price-parities-state-and-metro-area" target="_blank" rel="noreferrer"><span>02</span><strong>US BEA · Regional Price Parities</strong><i>Price levels relative to a reference value ↗</i></a><a href="https://www.bls.gov/cex/tables-getting-started-guide.htm" target="_blank" rel="noreferrer"><span>03</span><strong>US BLS · Consumer Expenditure Surveys</strong><i>Household spending categories ↗</i></a></div></div>
      </section>
      <section className="index-source-detail"><div className="page-shell"><ResearchCitations ids={["world-bank-icp", "eurostat-ppp", "bea-rpp", "bls-ce"]} title="Official references for spatial price indexes" /></div></section>
      <SiteFooter />
    </main>
  )
}
