import type { Metadata } from "next"
import { ArrowRight, CircleHelp, MapPinned, Scale, ShoppingBasket } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

import { AnimatedFaqList } from "@/components/animated-faq"
import { ComparisonWorkspace } from "@/components/comparison-workspace"
import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"
import { StructuredData } from "@/components/structured-data"
import { cities, costCategories, getCanonicalComparisonPath, getLaunchComparisonPairs, getMonthlyCost, getPossibleComparisonCount } from "@/lib/cost-data"

export const metadata: Metadata = {
  title: "Compare Cost of Living Between Cities",
  description: "Compare living costs between cities using the same household, lifestyle and income. See category differences, equivalent salary and assumptions.",
  alternates: { canonical: "/compare-cities" },
}

const faqs = [
  ["What should a city cost comparison include?", "At minimum: comparable housing, food, transport, utilities, healthcare and personal spending for the same household. Taxes, childcare and one-time moving costs should be either included explicitly or clearly excluded."],
  ["Why can the percentage change when I swap cities?", "Percentages use the starting city as the denominator. If one basket costs 100 and another costs 120, the second is 20% higher than the first, while the first is about 16.7% lower than the second."],
  ["Should I compare city or metro data?", "Use the geography that matches the decision and label it. Metro data may be suitable for a regional move, but it should not be described as a particular neighborhood price."],
  ["Are taxes part of cost of living?", "We keep taxes separate from the living-cost basket. Taxes determine how gross salary becomes take-home pay and require household- and jurisdiction-specific rules."],
]

const pairs = getLaunchComparisonPairs().map(({ from, to }) => {
  const fromTotal = getMonthlyCost(from, "single", "balanced")
  const toTotal = getMonthlyCost(to, "single", "balanced")
  return {
    from,
    to,
    percent: Math.round(Math.abs(toTotal - fromTotal) / fromTotal * 100),
    direction: toTotal > fromTotal ? "higher" : "lower",
  }
})

function PairCard({ pair, index }: { pair: (typeof pairs)[number]; index: number }) {
  return (
    <Link className="compare-pair-card" href={getCanonicalComparisonPath(pair.from.slug, pair.to.slug)}>
      <span className="compare-pair-number">{String(index + 1).padStart(2, "0")}</span>
      <span className="compare-pair-cities"><strong>{pair.from.city}</strong><i>to</i><strong>{pair.to.city}</strong></span>
      <span className="compare-pair-summary">{pair.to.city} is {pair.percent}% {pair.direction}</span>
      <ArrowRight aria-hidden="true" />
    </Link>
  )
}

export default function CompareCitiesPage() {
  return (
    <main className="compare-page compare-redesign">
      <SiteHeader />
      <StructuredData data={[
        { "@context": "https://schema.org", "@type": "WebApplication", name: "City Cost of Living Comparison", applicationCategory: "FinanceApplication", operatingSystem: "Web", url: "https://livingcostcomparison.com/compare-cities", description: metadata.description, isAccessibleForFree: true },
        { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faqs.map(([question, answer]) => ({ "@type": "Question", name: question, acceptedAnswer: { "@type": "Answer", text: answer } })) },
      ]} />

      <header className="compare-intro">
        <div className="page-shell">
          <nav className="breadcrumbs" aria-label="Breadcrumb"><Link href="/" prefetch={false}>Home</Link><span>/</span><span>Compare cities</span></nav>
          <div className="compare-intro-grid">
            <div className="compare-intro-copy">
              <p className="eyebrow">Cost of living comparison</p>
              <h1>See what your move changes.</h1>
              <p>Build a like-for-like monthly budget for two cities. Keep the household and lifestyle constant, then inspect the cost difference, spending-equivalent income and categories driving the change.</p>
              <div className="compare-intro-meta" aria-label="Calculator coverage"><span>{cities.length} major cities</span><span>{getPossibleComparisonCount().toLocaleString("en-US")} possible city pairs</span><span>{costCategories.length} budget categories</span></div>
            </div>
            <aside className="compare-intro-note">
              <span>Start with your real setup</span>
              <p>Choose where you live, where you may move and the monthly income you want to preserve.</p>
              <a href="#compare">Start comparing <ArrowRight aria-hidden="true" /></a>
            </aside>
          </div>
        </div>
      </header>

      <section className="compare-studio-section" aria-label="Interactive city comparison">
        <div className="page-shell"><ComparisonWorkspace /></div>
      </section>

      <section className="compare-how-section">
        <div className="page-shell">
          <header className="compare-section-heading">
            <div><p className="eyebrow">Reading the result</p><h2>Three numbers to use first.</h2></div>
            <p>Treat the estimate as a planning range. Start with the total, then look at income and the category breakdown.</p>
          </header>
          <div className="compare-how-grid">
            <article>
              <figure className="compare-how-image"><Image src="/images/compare-cities/monthly-budget.jpg" alt="" width={1536} height={1024} sizes="(max-width: 680px) calc(100vw - 40px), (max-width: 900px) calc((100vw - 60px) / 2), 380px" /></figure>
              <div className="compare-how-card-body"><span>01</span><h3>Monthly budget</h3><p>See the recurring amount your household may spend in each city under the same assumptions.</p></div>
            </article>
            <article>
              <figure className="compare-how-image"><Image src="/images/compare-cities/salary-target.jpg" alt="" width={1536} height={1024} sizes="(max-width: 680px) calc(100vw - 40px), (max-width: 900px) calc((100vw - 60px) / 2), 380px" /></figure>
              <div className="compare-how-card-body"><span>02</span><h3>Salary target</h3><p>Translate your current take-home pay into an equivalent amount for the destination.</p></div>
            </article>
            <article>
              <figure className="compare-how-image"><Image src="/images/compare-cities/category-pressure.jpg" alt="" width={1536} height={1024} sizes="(max-width: 680px) calc(100vw - 40px), (max-width: 900px) calc((100vw - 60px) / 2), 380px" /></figure>
              <div className="compare-how-card-body"><span>03</span><h3>Category pressure</h3><p>Find whether housing, groceries or another expense is creating most of the difference.</p></div>
            </article>
          </div>
        </div>
      </section>

      <section className="compare-browse-section">
        <div className="page-shell">
          <header className="compare-section-heading compare-browse-heading">
            <div><p className="eyebrow">Example comparisons</p><h2>Open a city pair directly.</h2></div>
            <p>These examples are a starting point. Search any of the {cities.length} cities in the workspace above to build the comparison that fits your move.</p>
          </header>
          <div className="compare-pair-grid">{pairs.map((pair, index) => <PairCard key={`${pair.from.slug}-${pair.to.slug}`} pair={pair} index={index} />)}</div>
        </div>
      </section>

      <section className="compare-decision-section">
        <div className="page-shell compare-boundaries">
          <header className="compare-boundaries-header"><p className="eyebrow">Before you decide</p><h2>Check what an estimate cannot know.</h2><p>A useful estimate narrows the decision. These three inputs still need evidence from your actual move.</p></header>
          <div className="compare-boundary-list">
            <article><span>01</span><h3>Neighborhood</h3><p>Price the home size, area and commute you would actually choose.</p></article>
            <article><span>02</span><h3>Local take-home pay</h3><p>Convert gross offers after tax, pension, benefits and any recurring deductions.</p></article>
            <article><span>03</span><h3>Move-in cash</h3><p>Keep deposits, visas, shipping and temporary accommodation outside the monthly estimate.</p></article>
          </div>
        </div>
      </section>

      <section className="compare-research-section">
        <div className="page-shell compare-evidence">
          <header className="compare-evidence-header"><p className="eyebrow">What a useful result needs</p><h2>A headline percentage is the beginning, not the conclusion.</h2><p>A reliable household comparison requires comparable items, useful category weights and an honest geographic label. The percentage becomes useful when you can see which assumptions created it.</p></header>
          <div className="compare-evidence-grid">
            <article>
              <div className="compare-evidence-marker"><span>01</span><ShoppingBasket aria-hidden="true" /></div>
              <div className="compare-evidence-copy"><span>Basket</span><h3>Comparable items and quantities</h3><p>Changing home size, commute or household at the same time as the city makes the result impossible to interpret.</p></div>
            </article>
            <article>
              <div className="compare-evidence-marker"><span>02</span><Scale aria-hidden="true" /></div>
              <div className="compare-evidence-copy"><span>Weights</span><h3>Your expensive categories matter most</h3><p>A large rent difference should influence the result more than a small change in coffee or cinema prices.</p></div>
            </article>
            <article>
              <div className="compare-evidence-marker"><span>03</span><MapPinned aria-hidden="true" /></div>
              <div className="compare-evidence-copy"><span>Geography</span><h3>City, metro and country are not synonyms</h3><p>Use the narrowest reliable geography and disclose any fallback rather than silently mixing levels.</p></div>
            </article>
            <article>
              <div className="compare-evidence-marker"><span>04</span><CircleHelp aria-hidden="true" /></div>
              <div className="compare-evidence-copy"><span>Uncertainty</span><h3>Close scores are not decisive rankings</h3><p>Category coverage, observation age, exchange rates and neighborhood choice may outweigh a few index points.</p></div>
            </article>
          </div>
        </div>
      </section>

      <section className="compare-interpretation-section">
        <div className="page-shell compare-math">
          <header className="compare-math-header"><p className="eyebrow">Interpret the math</p><h2>Why the reverse percentage is different</h2><p>If a comparable basket is 100 in the current city and 120 in the destination, both statements below are correct. The result changes because the starting value, or denominator, changes.</p></header>
          <figure className="compare-math-visual">
            <Image src="/images/compare/direction-percentage-visual.jpg" alt="The same short and tall measurement columns shown in opposite comparison directions" width={1600} height={800} sizes="(max-width: 680px) calc(100vw - 40px), (max-width: 1048px) calc(100vw - 48px), 1000px" />
            <figcaption className="compare-math-visual-copy" aria-label="Current to destination: 100 to 120 is 20 percent higher. Destination to current: 120 to 100 is 16.7 percent lower. Direction-specific difference equals destination divided by current minus one, multiplied by 100.">
              <article><span>Current to destination</span><strong>100 → 120</strong><b>20% higher</b></article>
              <article><span>Destination to current</span><strong>120 → 100</strong><b>16.7% lower</b></article>
              <div className="compare-math-visual-formula"><span>Same values · different base</span><small>Direction-specific difference</small><strong>(destination ÷ current − 1) × 100</strong></div>
            </figcaption>
          </figure>
          <aside className="compare-math-checks"><h3>Before acting on the result</h3><ul><li>Replace modeled rent with real neighborhoods.</li><li>Check whether the commute requires a car.</li><li>Add relevant healthcare and childcare.</li><li>Convert gross offers to take-home pay.</li><li>Budget moving and setup costs separately.</li></ul><Link href="/guides/how-to-compare-cost-of-living">Read the complete comparison guide →</Link></aside>
        </div>
      </section>

      <section className="compare-faq-section"><div className="page-shell compare-faq-frame"><header className="compare-faq-heading"><p className="eyebrow">Comparison FAQ</p><h2>Questions that change the answer</h2><p>Use these checks when a result looks surprising or when two cities appear unusually close.</p></header><AnimatedFaqList className="article-faq compare-faq-list" items={faqs} /></div></section>

      <SiteFooter />
    </main>
  )
}
