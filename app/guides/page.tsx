import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"
import { StructuredData } from "@/components/structured-data"
import { getSocialMetadata } from "@/lib/seo"

const path = "/guides"

const guides = [
  {
    number: "01",
    eyebrow: "Comparison guide",
    title: "How to compare cost of living between two cities",
    description: "Build a like-for-like household basket, handle currency correctly and find the categories that actually change your result.",
    href: "/guides/how-to-compare-cost-of-living",
    image: "/images/guides/compare-cost-of-living.jpg",
    imageAlt: "Planning materials for comparing household costs between two cities",
    readTime: "12 minute read",
  },
  {
    number: "02",
    eyebrow: "Salary guide",
    title: "How to calculate an equivalent salary after moving",
    description: "Translate a destination budget into a realistic take-home target without confusing spending power with market salary.",
    href: "/guides/equivalent-salary-for-relocation",
    image: "/images/guides/equivalent-salary-relocation.jpg",
    imageAlt: "Salary and relocation planning materials arranged on a desk",
    readTime: "11 minute read",
  },
  {
    number: "03",
    eyebrow: "Compensation guide",
    title: "Cost of living and cost of labor are not the same",
    description: "Understand why local prices and employer pay can move differently, and how to use both when evaluating an offer.",
    href: "/guides/cost-of-living-vs-cost-of-labor",
    image: "/images/guides/cost-of-living-vs-labor.jpg",
    imageAlt: "Household expenses and employer compensation shown as separate measures",
    readTime: "9 minute read",
  },
]

export const metadata: Metadata = {
  title: "Cost of Living and Relocation Guides",
  description: "Practical guides for comparing city costs, calculating an equivalent salary and evaluating relocation offers with the right assumptions.",
  alternates: { canonical: path },
  ...getSocialMetadata({
    title: "Cost of Living and Relocation Guides",
    description: "Understand city costs, salary targets and relocation trade-offs before making a move.",
    path,
  }),
}

export default function GuidesPage() {
  return (
    <main className="guides-page">
      <SiteHeader />
      <StructuredData data={[
        {
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: "Cost of Living and Relocation Guides",
          description: metadata.description,
          url: `https://livingcostcomparison.com${path}`,
          mainEntity: {
            "@type": "ItemList",
            itemListElement: guides.map((guide, index) => ({
              "@type": "ListItem",
              position: index + 1,
              name: guide.title,
              url: `https://livingcostcomparison.com${guide.href}`,
            })),
          },
        },
        {
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: "https://livingcostcomparison.com/" },
            { "@type": "ListItem", position: 2, name: "Guides", item: `https://livingcostcomparison.com${path}` },
          ],
        },
      ]} />

      <header className="guides-hub-mast">
        <div className="page-shell">
          <nav className="breadcrumbs" aria-label="Breadcrumb"><Link href="/">Home</Link><span>/</span><span>Guides</span></nav>
          <div className="guides-hub-hero">
            <div className="guides-hub-intro">
              <p className="eyebrow">Planning library</p>
              <h1>Make the move with the right numbers.</h1>
              <p>Cost comparisons become useful when they answer a specific decision. These guides show how to compare the same lifestyle, translate spending into a salary target and separate household costs from the local job market.</p>
            </div>
            <Link className="guides-feature" href={guides[0].href}>
              <Image src={guides[0].image} alt={guides[0].imageAlt} width={1536} height={1024} priority />
              <span className="guides-feature-shade" aria-hidden="true" />
              <span className="guides-feature-copy">
                <small>Start here · {guides[0].readTime}</small>
                <strong>{guides[0].title}</strong>
                <b>Read the guide <ArrowRight aria-hidden="true" /></b>
              </span>
            </Link>
          </div>
          <dl className="guides-hub-meta">
            <div><dt>Three focused guides</dt><dd>One question per article</dd></div>
            <div><dt>Practical frameworks</dt><dd>Methods you can apply to your own move</dd></div>
            <div><dt>Connected tools</dt><dd>Move from reading to calculation</dd></div>
          </dl>
        </div>
      </header>

      <section className="guides-library" aria-labelledby="guides-library-title">
        <div className="page-shell">
          <header className="guides-section-heading">
            <div><p className="eyebrow">Complete library</p><h2 id="guides-library-title">Read for the decision in front of you.</h2></div>
            <p>Begin with the comparison guide if you are exploring. Use the salary guide when you have an offer. Read the compensation guide when employer pay and local prices seem to tell different stories.</p>
          </header>
          <div className="guides-library-grid">
            {guides.map((guide, index) => (
              <article className={`guides-story${index === 0 ? " guides-story-primary" : ""}`} key={guide.href}>
                <Link className="guides-story-image" href={guide.href} aria-label={`Read ${guide.title}`}>
                  <Image src={guide.image} alt={guide.imageAlt} width={1536} height={1024} />
                </Link>
                <div className="guides-story-copy">
                  <div className="guides-story-meta"><span>{guide.number} · {guide.eyebrow}</span><small>{guide.readTime}</small></div>
                  <h3><Link href={guide.href}>{guide.title}</Link></h3>
                  <p>{guide.description}</p>
                  <Link className="guides-story-link" href={guide.href}>Read guide <ArrowRight aria-hidden="true" /></Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="guides-decision" aria-labelledby="guides-decision-title">
        <div className="page-shell guides-decision-grid">
          <header>
            <p className="eyebrow">Choose your question</p>
            <h2 id="guides-decision-title">One move. Three different decisions.</h2>
            <p>A percentage can orient you, but each decision needs its own calculation and evidence.</p>
          </header>
          <div className="guides-question-list">
            <Link href="/guides/how-to-compare-cost-of-living"><span>01</span><div><small>I am choosing between cities</small><strong>What would the same lifestyle cost?</strong></div><ArrowRight aria-hidden="true" /></Link>
            <Link href="/guides/equivalent-salary-for-relocation"><span>02</span><div><small>I have a relocation offer</small><strong>What take-home pay would preserve my position?</strong></div><ArrowRight aria-hidden="true" /></Link>
            <Link href="/guides/cost-of-living-vs-cost-of-labor"><span>03</span><div><small>I am evaluating the package</small><strong>Is the offer competitive as well as affordable?</strong></div><ArrowRight aria-hidden="true" /></Link>
          </div>
        </div>
      </section>

      <section className="guides-next-step">
        <div className="page-shell guides-next-step-grid">
          <div><p className="eyebrow">Ready to calculate?</p><h2>Turn the reading into your own scenario.</h2></div>
          <div className="guides-next-links">
            <Link href="/compare-cities#compare"><span>Compare two cities</span><ArrowRight aria-hidden="true" /></Link>
            <Link href="/salary-comparison"><span>Calculate an equivalent salary</span><ArrowRight aria-hidden="true" /></Link>
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  )
}
