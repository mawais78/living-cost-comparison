import type { Metadata } from "next"
import { ExternalLink } from "lucide-react"
import Link from "next/link"

import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"
import { StructuredData } from "@/components/structured-data"
import { researchSources, researchUpdated } from "@/lib/research"

export const metadata: Metadata = {
  title: "Cost of Living Data Sources",
  description: "Inspect the official sources used for Living Cost Comparison's methodology and editorial research, including their scope and limitations.",
  alternates: { canonical: "/sources" },
}

export default function SourcesPage() {
  return (
    <main className="sources-page">
      <SiteHeader />
      <StructuredData data={{ "@context": "https://schema.org", "@type": "CollectionPage", name: "Living Cost Comparison data sources", description: metadata.description, dateModified: "2026-09-22", url: "https://livingcostcomparison.com/sources", isPartOf: { "@type": "WebSite", name: "Living Cost Comparison", url: "https://livingcostcomparison.com" } }} />

      <header className="source-mast">
        <div className="page-shell source-mast-grid">
          <div><nav className="breadcrumbs" aria-label="Breadcrumb"><Link href="/">Home</Link><span>/</span><span>Sources</span></nav><p className="eyebrow">Evidence register</p><h1>Sources, coverage and limits</h1><p>Every useful number has a geography, period and purpose. This register explains the research we use now and the production data that is still required.</p></div>
          <dl><div><dt>Reviewed</dt><dd>{researchUpdated}</dd></div><div><dt>Listed sources</dt><dd>{researchSources.length}</dd></div><div><dt>Current city figures</dt><dd>Prototype only</dd></div></dl>
        </div>
      </header>

      <section className="source-status">
        <div className="page-shell source-status-grid">
          <div><span>Current status</span><h2>The research is publishable. The city-price dataset is not yet production data.</h2></div>
          <div><p>The sources below support definitions, calculation choices and editorial guidance. They do not validate the illustrative city values currently shown in the prototype calculators.</p><p>Before city profiles and pair pages are indexed, each displayed category must have licensed or openly reusable observations, an observation period, geographic definition and confidence record.</p></div>
        </div>
      </section>

      <section className="source-register">
        <div className="page-shell">
          <header><p className="eyebrow">Primary research</p><h2>Source-by-source register</h2><p>Links open the originating institution. “Use” describes our editorial or methodological use, not permission to republish the source as a city database.</p></header>
          <div className="source-register-list">
            {researchSources.map((source, index) => (
              <article id={source.id} key={source.id}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <div><p>{source.publisher}</p><h3>{source.title}</h3><a href={source.url} target="_blank" rel="noreferrer">Open original source <ExternalLink aria-hidden="true" /></a></div>
                <dl><div><dt>Scope</dt><dd>{source.scope}</dd></div><div><dt>How we use it</dt><dd>{source.use}</dd></div><div><dt>Important limit</dt><dd>{source.caution}</dd></div></dl>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="source-requirements">
        <div className="page-shell source-requirements-grid">
          <div><p className="eyebrow">Production gate</p><h2>What a city observation must carry</h2></div>
          <ul><li>Place and geographic level</li><li>Category, item, unit and quantity</li><li>Native value and currency</li><li>Observation period and ingestion date</li><li>Source and collection method</li><li>Sample count or coverage where available</li><li>Dispersion or range where available</li><li>Licence and permitted display status</li><li>Observed, calculated or modeled label</li><li>Quality flags and confidence components</li></ul>
        </div>
      </section>

      <section className="source-next">
        <div className="page-shell"><h2>Read how these sources become a comparison.</h2><Link href="/methodology">Open the complete methodology →</Link></div>
      </section>
      <SiteFooter />
    </main>
  )
}
