import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"

import { AnimatedFaqList } from "@/components/animated-faq"
import { SalaryCalculator } from "@/components/salary-calculator"
import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"
import { StructuredData } from "@/components/structured-data"
import { getSocialMetadata } from "@/lib/seo"

export const metadata: Metadata = {
  title: "Equivalent Salary Calculator",
  description: "Estimate the take-home salary needed after moving cities, then check taxes, benefits, market pay and relocation costs before evaluating an offer.",
  alternates: { canonical: "/salary-comparison" },
  ...getSocialMetadata({
    title: "Equivalent Salary Calculator",
    description: "Estimate the take-home pay needed after moving, then review taxes, benefits, market pay and relocation costs.",
    path: "/salary-comparison",
  }),
}

const faqs = [
  ["Should I enter gross or take-home salary?", "Use monthly take-home income. Tax systems vary by jurisdiction and household, so a gross amount should be converted before comparing everyday spending power."],
  ["Is this the minimum salary I should accept?", "No. It is a spending-power reference. Your target should also reflect the role, local market, benefits, savings goals, currency risk and the cost of the move."],
  ["Are relocation expenses included?", "No. Deposits, flights, visas, shipping, temporary accommodation and furniture are separate one-time costs."],
  ["Is equivalent salary the same as local market salary?", "No. Equivalent salary reprices your selected household budget. Market salary reflects what employers pay for a role based on skills, talent supply, competition and compensation policy."],
  ["Why should taxes be calculated separately?", "The living-cost basket prices household consumption. Income tax and mandatory contributions convert gross pay into take-home income and vary by jurisdiction and household case."],
]

const offerLayers = [
  {
    number: "01",
    label: "Cash",
    title: "Take-home pay",
    description: "Salary after income tax and mandatory deductions. This is the amount available for everyday life.",
    image: "/images/salary/take-home-pay.jpg",
    imageAlt: "Pay envelope and household budget tray in a calm green still life",
  },
  {
    number: "02",
    label: "Protection",
    title: "Benefits",
    description: "Health coverage, pension contributions, insurance and paid leave can change the value materially.",
    image: "/images/salary/benefits.jpg",
    imageAlt: "Heart, medical cross and calendar sheltered beneath a protective arch",
  },
  {
    number: "03",
    label: "Upside",
    title: "Variable compensation",
    description: "Separate guaranteed income from bonus and equity. Do not fund essential spending with uncertain pay.",
    image: "/images/salary/variable-compensation.jpg",
    imageAlt: "Stable blocks with an elevated bonus block and a floating equity gem",
  },
  {
    number: "04",
    label: "Transition",
    title: "Relocation support",
    description: "Flights, visas, temporary housing and deposit support reduce the cash required to move.",
    image: "/images/salary/relocation-support.jpg",
    imageAlt: "Suitcase, moving boxes, travel ticket and house key arranged for a relocation",
  },
]

export default function SalaryComparisonPage() {
  return (
    <main className="salary-page salary2-page">
      <SiteHeader />
      <StructuredData data={[
        { "@context": "https://schema.org", "@type": "WebApplication", name: "Equivalent Salary Calculator", applicationCategory: "FinanceApplication", operatingSystem: "Web", url: "https://livingcostcomparison.com/salary-comparison", description: metadata.description },
      ]} />

      <section className="salary-page-hero">
        <div className="page-shell salary-page-hero-grid">
          <div><nav className="breadcrumbs" aria-label="Breadcrumb"><Link href="/">Home</Link><span>/</span><span>Salary calculator</span></nav><p className="eyebrow">Salary planning worksheet</p><h1>Turn a city move into a take-home target.</h1></div>
          <p>Compare spending power first. Then translate the result into gross salary using the destination’s tax rules and assess market pay separately.</p>
        </div>
      </section>

      <div className="page-shell salary-calculator-wrap"><SalaryCalculator /></div>

      <section className="salary2-package">
        <div className="page-shell">
          <header><p className="eyebrow">Offer audit</p><h2>The calculator gives you one number. A real offer has four layers.</h2><p>Review every layer before deciding whether two offers provide comparable value.</p></header>
          <div className="salary2-package-strip">
            {offerLayers.map((layer) => (
              <article key={layer.number}>
                <figure>
                  <Image src={layer.image} alt={layer.imageAlt} width={1100} height={825} sizes="(max-width: 760px) calc(100vw - 40px), (max-width: 980px) calc(50vw - 36px), 274px" />
                </figure>
                <span>{layer.number} · {layer.label}</span>
                <h3>{layer.title}</h3>
                <p>{layer.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="salary2-range">
        <div className="page-shell">
          <header><p className="eyebrow">Use the result</p><h2>Build a salary range, not a single demand.</h2><p>Move from a minimum living-cost requirement to the complete offer you would accept.</p></header>
          <ol>
            <li><span>01</span><b>Floor</b><p>Your equivalent take-home estimate plus essential personal costs missing from the model.</p></li>
            <li><span>02</span><b>Target</b><p>The floor plus savings goals, role progression and a buffer for price or currency movement.</p></li>
            <li><span>03</span><b>Total package</b><p>Translate the target into gross pay, then weigh benefits and relocation support alongside cash.</p></li>
          </ol>
        </div>
      </section>

      <section className="salary2-measures">
        <div className="page-shell">
          <header><p className="eyebrow">Three numbers, three questions</p><h2>One salary figure cannot answer everything.</h2></header>
          <div>
            <article><span>01</span><h3>Spending-equivalent income</h3><p>What net income would fund the same selected cost basket in the destination?</p></article>
            <article><span>02</span><h3>Take-home-equivalent income</h3><p>What net income would fund that basket while preserving the disposable margin you need?</p></article>
            <article><span>03</span><h3>Market salary</h3><p>What do employers pay for the role, level and labor market? Treat this as a separate question.</p></article>
          </div>
        </div>
      </section>

      <section className="salary2-tax">
        <div className="page-shell">
          <header><p className="eyebrow">Gross is not disposable</p><h2>Follow the money from an offer to the amount you can actually use.</h2></header>
          <figure className="salary2-tax-visual">
            <Image src="/images/salary/salary-flow-visual.jpg" alt="Gross salary passing through deductions and household expenses, leaving a smaller disposable margin" width={1800} height={750} sizes="(max-width: 760px) calc(100vw - 40px), (max-width: 1232px) calc(100vw - 48px), 1184px" />
            <figcaption className="salary2-tax-flow" aria-label="Gross salary minus taxes and mandatory deductions equals take-home pay, minus destination household budget equals disposable margin">
              <div className="salary2-tax-equation"><span>Gross salary</span><i aria-hidden="true">−</i><span>Taxes and mandatory deductions</span><i aria-hidden="true">=</i><strong>Take-home pay</strong></div>
              <div className="salary2-tax-equation"><span className="salary2-tax-mobile-start">Take-home pay</span><i aria-hidden="true">−</i><span>Destination household budget</span><i aria-hidden="true">=</i><strong>Disposable margin</strong></div>
            </figcaption>
          </figure>
          <div className="salary2-tax-notes"><p>Gross earnings, employee income tax, mandatory contributions and cash benefits affect how much income is available for monthly spending.</p><p>This calculator starts with take-home income. Convert a gross offer using the destination’s rules for your household before comparing spending power.</p></div>
        </div>
      </section>

      <section className="salary2-checklist">
        <div className="page-shell">
          <header><p className="eyebrow">Offer checklist</p><h2>Collect the facts before you compare the package.</h2><Link href="/guides/equivalent-salary-for-relocation">Open the complete salary guide →</Link></header>
          <div className="salary2-check-groups">
            <section><span>Pay</span><ul><li>Guaranteed base and pay frequency</li><li>Expected household take-home</li><li>Bonus and equity conditions</li><li>Destination market range</li></ul></section>
            <section><span>Benefits</span><ul><li>Health coverage and out-of-pocket cost</li><li>Pension or retirement contributions</li><li>Paid leave and working hours</li></ul></section>
            <section><span>Move</span><ul><li>Relocation allowance and repayment terms</li><li>Currency and remote-pay review policy</li><li>One-time move and setup budget</li></ul></section>
          </div>
        </div>
      </section>

      <section className="salary2-faq">
        <div className="page-shell"><header><p className="eyebrow">Questions before negotiating</p><h2>Know what the estimate means.</h2></header><AnimatedFaqList className="salary2-faq-list" items={faqs} /></div>
      </section>
      <SiteFooter />
    </main>
  )
}
