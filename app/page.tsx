import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

import { ComparisonWorkspace } from "@/components/comparison-workspace"
import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"

export const metadata: Metadata = { alternates: { canonical: "/" } }

const standards = [
  ["01", "Specific to your setup", "Household, lifestyle and take-home pay change the answer."],
  ["02", "Designed to be inspected", "Category costs and assumptions remain visible beside the result."],
  ["03", "Freshness over false precision", "Dates and confidence will be attached to production data."],
]

export default function Home() {
  return (
    <main>
      <SiteHeader />
      <section className="home-intro">
        <div className="page-shell py-12 sm:py-16">
          <div className="intro-grid">
            <div>
              <p className="eyebrow text-[var(--brand-blue)]">City cost intelligence</p>
              <h1 className="display-title mt-5">Compare living costs with a budget you can inspect.</h1>
            </div>
            <div className="intro-copy">
              <p>Translate your salary, compare monthly costs and understand what changes between two cities. Every answer keeps its assumptions in view.</p>
              <dl className="coverage-line">
                <div><dt>Coverage</dt><dd>6 prototype cities</dd></div>
                <div><dt>Currency</dt><dd>USD equivalent</dd></div>
                <div><dt>Updated</dt><dd>Sep 2026</dd></div>
              </dl>
            </div>
          </div>

          <div className="mt-10"><ComparisonWorkspace /></div>
          <p className="prototype-note"><span>Data status</span> Illustrative estimates for product development. Verified source coverage is the next release milestone.</p>
        </div>
      </section>

      <section className="standards-band" aria-label="Product standards">
        <div className="page-shell standards-grid">
          {standards.map(([number, title, copy]) => (
            <article key={number}>
              <span>{number}</span>
              <h2>{title}</h2>
              <p>{copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="page-shell explainer-section">
        <div>
          <p className="eyebrow text-[var(--brand-blue)]">The comparison standard</p>
          <h2 className="section-title mt-4">A cost index is a starting point, not a decision.</h2>
        </div>
        <div className="explainer-copy">
          <p>Two people can experience the same city very differently. Rent, household size and income matter more than a single headline score, so our model shows the budget behind the percentage.</p>
          <div className="definition-list">
            <div><span>Budget</span><p>Housing, groceries, transport, utilities and lifestyle.</p></div>
            <div><span>Salary translation</span><p>The take-home income needed to preserve the same spending margin.</p></div>
            <div><span>Evidence</span><p>Source, observation date and confidence by category.</p></div>
          </div>
          <Link href="/methodology" className="text-link">Read the methodology <ArrowRight /></Link>
        </div>
      </section>
      <SiteFooter />
    </main>
  )
}
