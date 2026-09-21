import type { Metadata } from "next"
import Link from "next/link"

import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"
import { StructuredData } from "@/components/structured-data"

export const metadata: Metadata = {
  title: "About Living Cost Comparison",
  description: "Why Living Cost Comparison exists, how its research is reviewed and the standards used for calculators, guides and future city data.",
  alternates: { canonical: "/about" },
}

export default function AboutPage() {
  return (
    <main className="about-page">
      <SiteHeader />
      <StructuredData data={{ "@context": "https://schema.org", "@type": "AboutPage", name: "About Living Cost Comparison", description: metadata.description, url: "https://livingcostcomparison.com/about", mainEntity: { "@type": "Organization", name: "Living Cost Comparison", url: "https://livingcostcomparison.com", slogan: "Compare the real cost of living." } }} />

      <header className="about-mast"><div className="page-shell"><nav className="breadcrumbs" aria-label="Breadcrumb"><Link href="/">Home</Link><span>/</span><span>About</span></nav><p className="eyebrow">About the project</p><h1>Better moving decisions begin with inspectable numbers.</h1><p>Living Cost Comparison is being built for people weighing a move, remote-work location or salary offer. Its job is to connect place-based prices to a real household budget—without pretending that one city average fits everyone.</p></div></header>

      <section className="about-mission"><div className="page-shell about-mission-grid"><div><span>Our purpose</span><h2>Make the assumptions as useful as the answer.</h2></div><div><p>A headline such as “City B is 18% more expensive” is only meaningful when you can see the basket, housing choice, geography, currency date and data quality behind it.</p><p>We therefore separate living costs, taxes, take-home pay and labor-market salary. They work together in a relocation decision, but they are not the same measure.</p></div></div></section>

      <section className="about-principles"><div className="page-shell"><header><p className="eyebrow">Editorial principles</p><h2>The standard for every page</h2></header><div>
        <article><span>01</span><h3>Answer the real question</h3><p>Each page has one primary job: compare two places, calculate a salary, explain a method or document evidence.</p></article>
        <article><span>02</span><h3>Label the evidence</h3><p>Observed, calculated and modeled values are identified. Publication dates are not presented as observation dates.</p></article>
        <article><span>03</span><h3>Show material limits</h3><p>Geography, missing categories, tax treatment and low confidence belong beside the answer.</p></article>
        <article><span>04</span><h3>Prefer fewer complete pages</h3><p>City and pair pages are indexed only after data and unique-value requirements are met.</p></article>
        <article><span>05</span><h3>Keep commercial influence visible</h3><p>Future partnerships must be disclosed and cannot remove or distort the complete core answer.</p></article>
        <article><span>06</span><h3>Correct the record</h3><p>Material data or methodology changes will be dated in the methodology change log.</p></article>
      </div></div></section>

      <section className="about-now"><div className="page-shell about-now-grid"><div><p className="eyebrow">Current release</p><h2>A research and interface foundation—not a finished market dataset.</h2></div><div><p>The present calculators use clearly identified prototype values to test household, lifestyle and salary workflows. Those values are not marketed as live city prices.</p><p>The first public data release will cover a deliberately small city set with source, period, geography and confidence attached to every material category.</p><div className="about-links"><Link href="/sources">Inspect the source register →</Link><Link href="/methodology">Read the methodology →</Link></div></div></div></section>
      <SiteFooter />
    </main>
  )
}
