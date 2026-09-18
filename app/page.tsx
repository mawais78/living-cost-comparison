import Link from "next/link"
import type { Metadata } from "next"
import { ArrowRight, Database, Gauge, WalletCards } from "lucide-react"

import { ComparisonWorkspace } from "@/components/comparison-workspace"
import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"

const trustPoints = [
  { icon: Database, label: "Source-aware estimates", copy: "Every published figure will carry a source, date and confidence signal." },
  { icon: WalletCards, label: "Built around your budget", copy: "See salary equivalence and monthly breathing room—not just an index score." },
  { icon: Gauge, label: "Fast, useful answers", copy: "The key difference appears first; the underlying categories stay easy to inspect." },
]

export const metadata: Metadata = { alternates: { canonical: "/" } }

export default function Home() {
  return (
    <main>
      <SiteHeader />
      <section className="hero-grid">
        <div className="page-shell relative py-12 sm:py-16 lg:py-20">
          <div className="max-w-3xl">
            <p className="eyebrow text-[var(--blue)]">Plan your next move with context</p>
            <h1 className="display-title mt-5">Compare the real cost of living.</h1>
            <p className="mt-5 max-w-2xl text-base leading-7 text-[var(--muted-ink)] sm:text-lg">Translate a salary, understand the budget difference, and see what life could cost in another city—with the assumptions out in the open.</p>
          </div>
          <div className="mt-9"><ComparisonWorkspace /></div>
          <p className="mt-4 flex items-start gap-2 text-xs leading-5 text-[var(--muted-ink)]"><span className="mt-2 size-1.5 shrink-0 rounded-full bg-[var(--amber)]" />This first release uses clearly labelled sample estimates to demonstrate the product experience. Verified datasets and live freshness scoring are the next data milestone.</p>
        </div>
      </section>

      <section className="border-y border-[var(--line)] bg-white">
        <div className="page-shell grid divide-y divide-[var(--line)] md:grid-cols-3 md:divide-x md:divide-y-0">
          {trustPoints.map(({ icon: Icon, label, copy }) => <article key={label} className="py-8 md:px-8 md:first:pl-0 md:last:pr-0"><Icon className="size-5 text-[var(--blue)]" /><h2 className="mt-4 font-semibold text-[var(--ink)]">{label}</h2><p className="mt-2 text-sm leading-6 text-[var(--muted-ink)]">{copy}</p></article>)}
        </div>
      </section>

      <section className="page-shell py-16 sm:py-20">
        <div className="grid items-start gap-10 lg:grid-cols-[0.85fr_1.15fr]">
          <div>
            <p className="eyebrow text-[var(--blue)]">A better comparison model</p>
            <h2 className="section-title mt-4">From headline number to a decision you can use.</h2>
            <p className="mt-5 max-w-xl text-sm leading-7 text-[var(--muted-ink)]">Most cost-of-living pages stop at an index. We connect the same data to household size, lifestyle and income so you can judge affordability—not only expense.</p>
            <Link href="/methodology" className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[var(--blue)]">See how the model works <ArrowRight className="size-4" /></Link>
          </div>
          <div className="decision-flow">{["Choose two cities", "Set your real-life assumptions", "Compare budget and salary", "Inspect sources and freshness"].map((item, index) => <div key={item} className="flow-item"><span>{String(index + 1).padStart(2, "0")}</span><strong>{item}</strong></div>)}</div>
        </div>
      </section>
      <SiteFooter />
    </main>
  )
}
