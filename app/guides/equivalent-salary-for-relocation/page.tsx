import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"

import { AnimatedFaqList } from "@/components/animated-faq"
import { GuideRail } from "@/components/guide-rail"
import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"
import { StructuredData } from "@/components/structured-data"

const path = "/guides/equivalent-salary-for-relocation"
const faqs = [
  ["What is an equivalent salary?", "It is an estimate of the income needed in a destination to preserve a defined level of spending power. It is not automatically the salary employers pay for your job in that market."],
  ["Should equivalent salary use gross or net pay?", "Use take-home pay for a lifestyle comparison. If you start with gross salary, estimate destination taxes and mandatory contributions separately before comparing disposable income."],
  ["Should rent be included?", "Usually yes, because housing is often the largest household expense. Also show a result without housing when accommodation is employer-provided or the two housing choices are not comparable."],
  ["Are benefits part of equivalent salary?", "Benefits are part of total compensation, but not all benefits become spendable cash. Compare cash, healthcare, retirement, paid leave, equity and relocation support as separate layers."],
]

export const metadata: Metadata = {
  title: "Equivalent Salary After Moving",
  description: "Calculate the salary needed after relocating using living costs, take-home pay, taxes, benefits and one-time moving expenses.",
  alternates: { canonical: path },
  openGraph: { type: "article", title: "How to Calculate an Equivalent Salary After Moving", description: "A practical framework for converting current spending power into a relocation salary target.", url: path, images: [{ url: "/images/guides/equivalent-salary-relocation.jpg", width: 1536, height: 1024, alt: "Salary and relocation planning materials arranged on a desk" }] },
}

export default function EquivalentSalaryGuidePage() {
  return (
    <main className="research-page">
      <SiteHeader />
      <StructuredData data={[
        { "@context": "https://schema.org", "@type": "Article", headline: "How to Calculate an Equivalent Salary After Moving", description: metadata.description, image: "https://livingcostcomparison.com/images/guides/equivalent-salary-relocation.jpg", datePublished: "2026-09-22", dateModified: "2026-09-22", author: { "@type": "Organization", name: "Living Cost Comparison" }, publisher: { "@type": "Organization", name: "Living Cost Comparison" }, mainEntityOfPage: `https://livingcostcomparison.com${path}` },
        { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: "https://livingcostcomparison.com/" }, { "@type": "ListItem", position: 2, name: "Guides", item: "https://livingcostcomparison.com/guides" }, { "@type": "ListItem", position: 3, name: "Equivalent salary after moving", item: `https://livingcostcomparison.com${path}` }] },
        { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faqs.map(([question, answer]) => ({ "@type": "Question", name: question, acceptedAnswer: { "@type": "Answer", text: answer } })) },
      ]} />

      <header className="research-mast salary-guide-mast">
        <div className="page-shell research-mast-grid">
          <div>
            <nav className="breadcrumbs" aria-label="Breadcrumb"><Link href="/">Home</Link><span>/</span><Link href="/guides">Guides</Link><span>/</span><span>Equivalent salary</span></nav>
            <p className="eyebrow">Salary guide · 11 minute read</p>
            <h1>How to calculate an equivalent salary after moving</h1>
            <p className="research-deck">The right target is not your current gross salary multiplied by one city index. Build it from take-home pay, your household budget and the parts of compensation that do not appear in a paycheck.</p>
          </div>
          <aside className="research-mast-aside">
            <figure className="research-mast-visual"><Image src="/images/guides/equivalent-salary-relocation.jpg" alt="Salary and relocation planning materials arranged on a desk" width={1536} height={1024} priority /></figure>
            <dl className="research-byline"><div><dt>Updated</dt><dd>23 September 2026</dd></div><div><dt>Covers</dt><dd>Take-home pay, tax and benefits</dd></div><div><dt>Use for</dt><dd>Offers and relocation negotiations</dd></div></dl>
          </aside>
        </div>
      </header>

      <div className="page-shell research-layout">
        <GuideRail current={path} />
        <article className="research-article">
          <section className="answer-box">
            <p className="eyebrow">Direct answer</p>
            <h2>Start from disposable income, not headline salary.</h2>
            <p>Estimate your current take-home pay, subtract the budget required for your present lifestyle, and preserve the resulting margin in the destination. Then work backward through destination taxes to a gross salary and assess benefits and moving support separately.</p>
          </section>

          <section>
            <h2>Three different salary numbers</h2>
            <div className="concept-grid">
              <article><span>01</span><h3>Spending-equivalent income</h3><p>The income change implied by the ratio between two comparable living-cost baskets. It answers: what would fund the same selected basket?</p></article>
              <article><span>02</span><h3>Take-home-equivalent income</h3><p>The net amount that preserves both the destination budget and the disposable margin you want after essentials.</p></article>
              <article><span>03</span><h3>Market salary</h3><p>What employers pay for a role in the destination labor market. Skills, scarcity and competition influence it; it may not track living costs.</p></article>
            </div>
            <p>Keeping these numbers separate prevents two bad conclusions: that the calculator predicts your job offer, or that a local market salary automatically preserves your current lifestyle.</p>
          </section>

          <section>
            <h2>The practical calculation</h2>
            <ol className="numbered-method">
              <li><span>01</span><div><h3>Calculate current take-home pay</h3><p>Begin with cash received after income tax, employee social contributions and mandatory deductions. Exclude uncertain bonus and equity from the amount funding essential monthly spending.</p></div></li>
              <li><span>02</span><div><h3>Measure your current monthly budget</h3><p>Use actual spending where possible. Separate housing, food, transport, utilities, healthcare, family costs, debt obligations, discretionary spending and regular savings.</p></div></li>
              <li><span>03</span><div><h3>Reprice the same basket in the destination</h3><p>Hold household size and lifestyle constant. Change only the prices and unavoidable structural differences, such as a required private health plan or a car-dependent commute.</p></div></li>
              <li><span>04</span><div><h3>Preserve the margin you need</h3><p>Add the destination budget to your chosen monthly margin for savings, debt repayment and unexpected costs.</p></div></li>
              <li><span>05</span><div><h3>Convert net target to gross salary</h3><p>Apply destination tax and mandatory-contribution rules for the correct household case. Gross and take-home relationships differ across countries and family types.</p></div></li>
              <li><span>06</span><div><h3>Value the rest of the package</h3><p>Compare health cover, pension, paid leave, bonus, equity and relocation support. Do not add their face value to cash unless you would otherwise buy the same benefit.</p></div></li>
            </ol>
          </section>

          <section>
            <h2>A worked example with hypothetical numbers</h2>
            <p>Suppose a household receives 5,000 per month after tax, spends 3,500 and keeps a 1,500 margin. A like-for-like destination budget is 4,100.</p>
            <div className="formula-stack">
              <div><span>Current margin</span><strong>5,000 − 3,500 = 1,500</strong></div>
              <div><span>Destination net target</span><strong>4,100 + 1,500 = 5,600</strong></div>
              <div><span>Then</span><strong>Convert 5,600 net to destination gross pay</strong></div>
            </div>
            <p>This method preserves the household’s selected cash margin. A simple index-ratio method would multiply the whole salary, even though some income may currently go to savings or obligations that do not change with local prices.</p>
          </section>

          <section>
            <h2>What taxes change</h2>
            <p>Personal income tax, employee contributions and cash benefits determine the relationship between gross earnings and take-home pay. The wider cost to the employer is a separate measure. These are not interchangeable.</p>
            <div className="research-table-wrap"><table className="research-table"><thead><tr><th>Measure</th><th>What it answers</th><th>Common mistake</th></tr></thead><tbody>
              <tr><th>Gross salary</th><td>Contractual cash pay before employee taxes and deductions</td><td>Comparing gross offers across tax systems as if they were spendable income</td></tr>
              <tr><th>Take-home pay</th><td>Cash available after modeled employee tax and mandatory deductions</td><td>Ignoring filing status, children, benefits or local taxes</td></tr>
              <tr><th>Employer cost</th><td>Wages plus employer taxes and benefit costs</td><td>Treating employer cost as money the worker receives</td></tr>
              <tr><th>Disposable margin</th><td>Take-home pay minus the selected recurring budget</td><td>Preserving spending but accidentally eliminating savings</td></tr>
            </tbody></table></div>
          </section>

          <section>
            <h2>Build an offer range instead of one magic number</h2>
            <div className="range-model">
              <article><span>Floor</span><h3>Required take-home</h3><p>Destination essentials, fixed obligations and minimum savings. Add only guaranteed cash.</p></article>
              <article><span>Target</span><h3>Comparable financial position</h3><p>Your preferred housing and lifestyle plus the margin you currently keep.</p></article>
              <article><span>Stretch</span><h3>Role and transition value</h3><p>Market rate, increased responsibility, currency risk and an appropriate relocation buffer.</p></article>
            </div>
          </section>

          <section>
            <h2>Do not forget one-time moving cash</h2>
            <ul className="check-list two-column">
              <li>Rental deposit and advance rent</li><li>Temporary accommodation</li><li>Visa and document fees</li><li>Flights and shipping</li><li>Furniture and home setup</li><li>Vehicle purchase or registration</li><li>Insurance waiting periods</li><li>Currency-transfer fees</li>
            </ul>
            <p>Keep these costs outside the recurring cost-of-living index. Negotiate them as relocation support or calculate how many months of the higher salary are needed to recover them.</p>
          </section>

          <section className="guide-action">
            <p className="eyebrow">Try the worksheet</p>
            <h2>Estimate the destination take-home target.</h2>
            <p>The calculator keeps the current and destination budget visible so the salary result can be inspected rather than accepted as a black box.</p>
            <Link href="/salary-comparison">Open the equivalent salary calculator →</Link>
          </section>

          <section><h2>Frequently asked questions</h2><AnimatedFaqList className="article-faq" items={faqs} /></section>
        </article>
      </div>
      <SiteFooter />
    </main>
  )
}
