import type { Metadata } from "next"
import Link from "next/link"

import { SalaryCalculator } from "@/components/salary-calculator"
import { ResearchCitations } from "@/components/research-citations"
import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"
import { StructuredData } from "@/components/structured-data"

export const metadata: Metadata = {
  title: "Equivalent Salary Calculator",
  description: "Estimate the take-home salary needed after moving cities, then check taxes, benefits, market pay and relocation costs before evaluating an offer.",
  alternates: { canonical: "/salary-comparison" },
}

const faqs = [
  ["Should I enter gross or take-home salary?", "Use monthly take-home income. The prototype does not model different tax systems, so using gross salary would make the result look more precise than it is."],
  ["Is this the minimum salary I should accept?", "No. It is a spending-power reference. Your target should also reflect the role, local market, benefits, savings goals, currency risk and the cost of the move."],
  ["Are relocation expenses included?", "No. Deposits, flights, visas, shipping, temporary accommodation and furniture are separate one-time costs."],
  ["Is equivalent salary the same as local market salary?", "No. Equivalent salary reprices your selected household budget. Market salary reflects what employers pay for a role based on skills, talent supply, competition and compensation policy."],
  ["Why should taxes be calculated separately?", "The living-cost basket prices household consumption. Income tax and mandatory contributions convert gross pay into take-home income and vary by jurisdiction and household case."],
]

export default function SalaryComparisonPage() {
  return (
    <main className="salary-page">
      <SiteHeader />
      <StructuredData data={[
        { "@context": "https://schema.org", "@type": "WebApplication", name: "Equivalent Salary Calculator", applicationCategory: "FinanceApplication", operatingSystem: "Web", url: "https://livingcostcomparison.com/salary-comparison", description: metadata.description },
        { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faqs.map(([question, answer]) => ({ "@type": "Question", name: question, acceptedAnswer: { "@type": "Answer", text: answer } })) },
      ]} />

      <section className="salary-page-hero">
        <div className="page-shell salary-page-hero-grid">
          <div><nav className="breadcrumbs" aria-label="Breadcrumb"><Link href="/">Home</Link><span>/</span><span>Salary calculator</span></nav><p className="eyebrow">Salary planning worksheet</p><h1>Turn a city move into a take-home target.</h1></div>
          <p>Compare spending power first. Then translate the result into gross salary using the destination's tax rules and assess market pay separately.</p>
        </div>
      </section>

      <div className="page-shell salary-calculator-wrap"><SalaryCalculator /></div>

      <section className="salary-offer-audit">
        <div className="page-shell salary-offer-grid">
          <header><p className="eyebrow">Offer audit</p><h2>The calculator gives you one number. A real offer has four layers.</h2></header>
          <div>
            <article><span>Cash</span><h3>Take-home pay</h3><p>Salary after local income tax and mandatory deductions—the amount available for everyday life.</p></article>
            <article><span>Protection</span><h3>Benefits</h3><p>Health coverage, pension contributions, insurance and paid leave can change the value materially.</p></article>
            <article><span>Upside</span><h3>Variable compensation</h3><p>Separate guaranteed income from bonus and equity. Do not fund essential spending with uncertain pay.</p></article>
            <article><span>Transition</span><h3>Relocation support</h3><p>Signing bonuses, flights, visas, temporary housing and deposit support reduce the cash required to move.</p></article>
          </div>
        </div>
      </section>

      <section className="salary-negotiation">
        <div className="page-shell salary-negotiation-grid">
          <div><p className="eyebrow">Use the result</p><h2>Build a salary range, not a single demand.</h2></div>
          <ol><li><b>Floor</b><p>Your equivalent take-home estimate plus essential personal costs missing from the model.</p></li><li><b>Target</b><p>The floor plus savings goals, role progression and a reasonable buffer for price or currency movement.</p></li><li><b>Total package</b><p>Translate the target into gross pay, then weigh benefits and relocation support alongside cash.</p></li></ol>
        </div>
      </section>

      <section className="salary-research">
        <div className="page-shell salary-research-grid">
          <header><p className="eyebrow">Three numbers, three questions</p><h2>Do not let one salary figure answer everything.</h2></header>
          <div>
            <article><span>01</span><div><h3>Spending-equivalent income</h3><p>What net income would fund the same selected cost basket in the destination?</p></div></article>
            <article><span>02</span><div><h3>Take-home-equivalent income</h3><p>What net income would fund that basket while preserving the disposable margin you need?</p></div></article>
            <article><span>03</span><div><h3>Market salary</h3><p>What do employers pay for the role, level and labor market? This requires a separate salary dataset.</p></div></article>
          </div>
        </div>
      </section>

      <section className="salary-tax-section">
        <div className="page-shell salary-tax-grid">
          <div><p className="eyebrow">Gross is not disposable</p><h2>Tax and benefits change the bridge from an offer to everyday life.</h2><p>The OECD's Taxing Wages framework separates gross earnings, employee income tax, social contributions and cash benefits. It also distinguishes the employee's net personal tax rate from the broader employer tax wedge.</p><p>That is why this calculator currently asks for take-home income. A reliable gross-salary result will only be added jurisdiction by jurisdiction, with household assumptions and the supported tax year visible.</p></div>
          <div className="salary-tax-flow"><span>Gross salary</span><i>−</i><span>Employee taxes and mandatory deductions</span><i>=</i><strong>Take-home pay</strong><i>−</i><span>Destination household budget</span><i>=</i><strong>Disposable margin</strong></div>
        </div>
      </section>

      <section className="salary-checklist-section"><div className="page-shell"><header><p className="eyebrow">Offer checklist</p><h2>Information to collect before you decide</h2></header><ul className="salary-checklist"><li>Guaranteed base salary and pay frequency</li><li>Expected take-home under your household case</li><li>Health coverage and likely out-of-pocket cost</li><li>Pension or retirement contributions</li><li>Bonus and equity conditions</li><li>Paid leave and working hours</li><li>Relocation allowance and repayment terms</li><li>Currency and review policy for remote pay</li><li>Role-specific market range in the destination</li><li>One-time move and setup budget</li></ul><Link href="/guides/equivalent-salary-for-relocation">Read the complete equivalent-salary guide →</Link></div></section>

      <section className="salary-source-section"><div className="page-shell"><ResearchCitations ids={["oecd-taxing-wages", "bls-ecec", "bls-ce", "mit-living-wage"]} title="Research behind the salary framework" /></div></section>

      <section className="salary-faq">
        <div className="page-shell salary-faq-grid"><header><p className="eyebrow">Questions before negotiating</p><h2>Know what the estimate means.</h2></header><div>{faqs.map(([question, answer]) => <details key={question}><summary>{question}<span>+</span></summary><p>{answer}</p></details>)}</div></div>
      </section>
      <SiteFooter />
    </main>
  )
}
