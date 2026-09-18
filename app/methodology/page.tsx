import type { Metadata } from "next"
import Link from "next/link"

import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"

export const metadata: Metadata = {
  title: "Methodology & Data Standards",
  description: "How Living Cost Comparison plans to source, normalize, update and communicate cost-of-living estimates.",
  alternates: { canonical: "/methodology" },
}

const steps = [
  ["01", "Collect", "Combine structured public data, first-party price observations and reputable commercial sources where licensing allows."],
  ["02", "Normalize", "Map prices into consistent categories, units, currencies and household assumptions so comparisons remain like-for-like."],
  ["03", "Model", "Build a monthly budget from housing, groceries, transport, utilities and lifestyle inputs—not one opaque score."],
  ["04", "Score", "Attach freshness and confidence signals at category level, with lower confidence when coverage is thin or volatile."],
]

export default function MethodologyPage() {
  return (
    <main>
      <SiteHeader />
      <section className="subpage-hero">
        <div className="page-shell py-12 sm:py-20">
          <nav className="breadcrumbs" aria-label="Breadcrumb"><Link href="/">Home</Link><span>/</span><span>Methodology</span></nav>
          <p className="eyebrow mt-9 text-[var(--blue)]">Transparent by design</p>
          <h1 className="subpage-title mt-4">A number is only useful when you can inspect it.</h1>
          <p className="mt-5 max-w-3xl text-base leading-7 text-[var(--muted-ink)]">This page defines the data standard behind Living Cost Comparison. The current product uses illustrative estimates while the source pipeline is being built; it never presents those figures as verified live prices.</p>
        </div>
      </section>

      <section className="page-shell py-16">
        <div className="content-grid">
          <article className="prose-panel">
            <p className="eyebrow text-[var(--blue)]">The model</p>
            <h2>How a monthly estimate is built</h2>
            <p>We begin with a category basket for a single person, then apply explicit household and lifestyle multipliers. Salary equivalence is calculated by multiplying current take-home income by the ratio between the two modeled budgets.</p>
            <div className="formula">Equivalent income = current income × destination budget ÷ current-city budget</div>
            <p>The result is a planning estimate. Taxes, benefits, healthcare and one-time relocation costs require separate treatment and will only be added when the model can explain them clearly.</p>
            <h2 id="sources">Source hierarchy</h2>
            <ol>
              <li><strong>Official statistics and open government data</strong> for inflation, national benchmarks and public services.</li>
              <li><strong>First-party or directly observed prices</strong> for housing listings, transit fares and utilities.</li>
              <li><strong>Licensed and reputable third-party datasets</strong> to improve coverage and cross-check outliers.</li>
              <li><strong>User contributions</strong> only with validation, anomaly detection and transparent sample sizes.</li>
            </ol>
            <h2>Freshness and confidence</h2>
            <p>Each category is intended to carry an observation window, sample size where available and a confidence label. Rapidly changing inputs such as rent and exchange rates need shorter refresh windows than slower-moving public-transport tariffs.</p>
            <h2>Editorial standard</h2>
            <p>City pages answer one search intent, disclose the date and assumptions near the answer, and link to relevant comparisons. We do not create thin location pages by swapping city names into identical copy.</p>
          </article>
          <aside>
            <div className="method-steps">{steps.map(([number, title, copy]) => <div key={number}><span>{number}</span><h3>{title}</h3><p>{copy}</p></div>)}</div>
          </aside>
        </div>
      </section>
      <SiteFooter />
    </main>
  )
}
