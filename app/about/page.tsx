import type { Metadata } from "next"
import Link from "next/link"

import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"
import { StructuredData } from "@/components/structured-data"

export const metadata: Metadata = {
  title: "About Living Cost Comparison",
  description: "Why Living Cost Comparison exists and how its calculators, guides and city estimates help people plan a move or evaluate a salary.",
  alternates: { canonical: "/about" },
}

export default function AboutPage() {
  return (
    <main className="about-page">
      <SiteHeader />
      <StructuredData data={{ "@context": "https://schema.org", "@type": "AboutPage", name: "About Living Cost Comparison", description: metadata.description, url: "https://livingcostcomparison.com/about", mainEntity: { "@type": "Organization", name: "Living Cost Comparison", url: "https://livingcostcomparison.com", slogan: "Compare the real cost of living." } }} />

      <header className="about-mast"><div className="page-shell"><nav className="breadcrumbs" aria-label="Breadcrumb"><Link href="/">Home</Link><span>/</span><span>About</span></nav><p className="eyebrow">About the project</p><h1>Better moving decisions begin with inspectable numbers.</h1><p>Living Cost Comparison helps people weigh a move, remote-work location or salary offer. It connects place-based costs to a practical household budget without pretending that one city average fits everyone.</p></div></header>

      <section className="about-mission"><div className="page-shell about-mission-grid"><div><span>Our purpose</span><h2>Make the assumptions as useful as the answer.</h2></div><div><p>A headline such as “City B is 18% more expensive” is only meaningful when you can see the basket, housing choice, geography, currency date and data quality behind it.</p><p>We therefore separate living costs, taxes, take-home pay and labor-market salary. They work together in a relocation decision, but they are not the same measure.</p></div></div></section>

      <section className="about-principles"><div className="page-shell"><header><p className="eyebrow">Editorial principles</p><h2>The standard for every page</h2></header><div>
        <article><span>01</span><h3>Answer the real question</h3><p>Each page has one primary job: compare two places, calculate a salary, explain a method or document evidence.</p></article>
        <article><span>02</span><h3>Keep inputs consistent</h3><p>The same household, lifestyle and cost categories are used on both sides of a comparison.</p></article>
        <article><span>03</span><h3>Show material limits</h3><p>Geography, missing categories, tax treatment and low confidence belong beside the answer.</p></article>
        <article><span>04</span><h3>Make every page useful</h3><p>City and comparison pages answer a complete planning question rather than repeating a generic score.</p></article>
        <article><span>05</span><h3>Keep commercial influence visible</h3><p>Future partnerships must be disclosed and cannot remove or distort the complete core answer.</p></article>
        <article><span>06</span><h3>Keep estimates current</h3><p>Material updates to city costs and calculation rules are reflected in the displayed update period.</p></article>
      </div></div></section>

      <section className="about-now"><div className="page-shell about-now-grid"><div><p className="eyebrow">Built for planning</p><h2>Compare a move with the household choices that matter.</h2></div><div><p>The calculators turn city costs into a consistent monthly budget, then show how household size and lifestyle settings change the result.</p><p>Use the estimate to frame a decision, then replace major inputs such as rent, commuting and childcare with the choices you expect to make.</p><div className="about-links"><Link href="/compare-cities">Compare two cities →</Link><Link href="/methodology">Read the methodology →</Link></div></div></div></section>
      <SiteFooter />
    </main>
  )
}
