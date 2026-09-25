import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"

import { CityIndexExplorer } from "@/components/city-index-explorer"
import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"
import { StructuredData } from "@/components/structured-data"
import { cities, costCategories, dataEdition, getMonthlyCost } from "@/lib/cost-data"

export const metadata: Metadata = {
  title: "Cost of Living Index by City",
  description: `Compare cost-of-living estimates across ${cities.length} major cities, search and sort monthly budgets, and interpret an index normalized to London = 100.`,
  alternates: { canonical: "/cost-of-living-index" },
}

const totals = cities.map((city) => getMonthlyCost(city, "single", "balanced"))

export default function CostOfLivingIndexPage() {
  return (
    <main className="city-index-page">
      <SiteHeader />
      <StructuredData data={{ "@context": "https://schema.org", "@type": "WebPage", name: "Cost of Living Index by City", description: metadata.description, url: "https://livingcostcomparison.com/cost-of-living-index" }} />

      <header className="city-index-mast">
        <div className="page-shell">
          <nav className="breadcrumbs" aria-label="Breadcrumb"><Link href="/">Home</Link><span>/</span><span>City index</span></nav>
          <div className="city-index-mast-grid"><div><p className="eyebrow">Cost of living index</p><h1>Compare relative living costs by city.</h1><p>Search and sort monthly budgets across {cities.length} major cities, then learn what an index can and cannot tell you.</p></div><dl><div><dt>Reference</dt><dd>London = 100</dd></div><div><dt>Highest estimate</dt><dd>${Math.max(...totals).toLocaleString("en-US")}</dd></div><div><dt>Lowest estimate</dt><dd>${Math.min(...totals).toLocaleString("en-US")}</dd></div></dl></div>
        </div>
      </header>

      <section className="city-index-data">
        <div className="page-shell"><div className="city-index-data-head"><div><span>City explorer</span><h2>Cost-of-living ranking</h2></div><p>{dataEdition} · USD equivalent · one person · balanced lifestyle</p></div><CityIndexExplorer /></div>
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
            <article><span>Geography</span><h3>Country and city indexes answer different questions</h3><p>A national, metropolitan and city-level estimate can describe different areas. None should be silently relabeled as a neighborhood price.</p></article>
            <article><span>Date</span><h3>Exchange rates and price observations move separately</h3><p>A reference-currency total can change because the currency moved even when local rent and groceries did not.</p></article>
          </div>
        </div>
      </section>

      <section className="index-direction-section"><div className="page-shell index-direction-grid"><div><p className="eyebrow">Direction matters</p><h2>A 20% increase does not reverse to a 20% decrease.</h2><p>Moving from an index of 100 to 120 is a 20% increase. Moving from 120 to 100 is about a 16.7% decrease because the starting value, or denominator, has changed.</p></div><figure className="index-direction-visual"><Image src="/images/index/direction-calculation.svg" alt="100 to 120 is 20% higher, while 120 to 100 is 16.7% lower; relative difference equals destination divided by current minus 1, multiplied by 100." width={1400} height={860} /></figure></div></section>

      <section className="index-method-note">
        <div className="page-shell index-method-grid"><div><span>Do not over-rank close scores</span><p>Neighborhood choice, household needs, exchange rates and data freshness can matter more than a few index points.</p></div><div><span>Use the same basket</span><p>All cities use the same {costCategories.length} categories and household assumptions so the comparison remains interpretable.</p></div><Link href="/methodology">Open full methodology →</Link></div>
      </section>

      <SiteFooter />
    </main>
  )
}
