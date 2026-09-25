import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"

import { AnimatedFaqList } from "@/components/animated-faq"
import { GuideRail } from "@/components/guide-rail"
import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"
import { StructuredData } from "@/components/structured-data"

const path = "/guides/how-to-compare-cost-of-living"

export const metadata: Metadata = {
  title: "How to Compare Cost of Living",
  description: "A practical, research-based method for comparing city costs, including housing, household budgets, price indexes, currencies and data quality.",
  alternates: { canonical: path },
  openGraph: { type: "article", title: "How to Compare Cost of Living Between Cities", description: "Use a like-for-like basket, household-specific weights and a consistent method to compare two cities properly.", url: path, images: [{ url: "/images/guides/compare-cost-of-living.jpg", width: 1536, height: 1024, alt: "Planning materials for comparing household costs between two cities" }] },
}

const faqs = [
  ["What is the best way to compare cost of living?", "Build the same monthly basket for both places, use the same household and housing assumptions, compare category totals, and then test the result against your income after tax. A single headline index is useful for orientation but not sufficient for a move."],
  ["Does a 20% higher cost index mean I need 20% more salary?", "It means the compared basket is estimated to cost 20% more in the destination. Your required gross salary may change by a different amount because taxes, benefits, savings and expenses outside the basket also change."],
  ["Should I compare cities in one currency?", "Yes for the final side-by-side total, but retain native prices and date the exchange rate. Otherwise currency movement can be mistaken for a local price change."],
  ["Is a cost-of-living index the same as inflation?", "No. A spatial price index compares places at roughly the same time. An inflation index such as CPI measures how prices change through time in one economy."],
]

export default function CompareCostGuidePage() {
  return (
    <main className="research-page">
      <SiteHeader />
      <StructuredData data={[
        { "@context": "https://schema.org", "@type": "Article", headline: "How to Compare Cost of Living Between Cities", description: metadata.description, image: "https://livingcostcomparison.com/images/guides/compare-cost-of-living.jpg", datePublished: "2026-09-22", dateModified: "2026-09-22", author: { "@type": "Organization", name: "Living Cost Comparison" }, publisher: { "@type": "Organization", name: "Living Cost Comparison" }, mainEntityOfPage: `https://livingcostcomparison.com${path}` },
        { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: "https://livingcostcomparison.com/" }, { "@type": "ListItem", position: 2, name: "Guides", item: "https://livingcostcomparison.com/guides" }, { "@type": "ListItem", position: 3, name: "How to compare cost of living", item: `https://livingcostcomparison.com${path}` }] },
        { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faqs.map(([question, answer]) => ({ "@type": "Question", name: question, acceptedAnswer: { "@type": "Answer", text: answer } })) },
      ]} />

      <header className="research-mast">
        <div className="page-shell research-mast-grid">
          <div>
            <nav className="breadcrumbs" aria-label="Breadcrumb"><Link href="/">Home</Link><span>/</span><Link href="/guides">Guides</Link><span>/</span><span>Compare living costs</span></nav>
            <p className="eyebrow">Practical guide · 12 minute read</p>
            <h1>How to compare cost of living between two cities</h1>
            <p className="research-deck">A reliable comparison matches the household, home and lifestyle, not only the currency. Use this method to turn broad indexes into a budget you can actually test.</p>
          </div>
          <aside className="research-mast-aside">
            <figure className="research-mast-visual"><Image src="/images/guides/compare-cost-of-living.jpg" alt="Planning materials for comparing household costs between two cities" width={1536} height={1024} priority /></figure>
            <dl className="research-byline"><div><dt>Updated</dt><dd>23 September 2026</dd></div><div><dt>Covers</dt><dd>Basket, geography and currency</dd></div><div><dt>Use for</dt><dd>Moves, remote work and budgeting</dd></div></dl>
          </aside>
        </div>
      </header>

      <div className="page-shell research-layout">
        <GuideRail current={path} />
        <article className="research-article">
          <section className="answer-box">
            <p className="eyebrow">Direct answer</p>
            <h2>Compare the same basket in both cities, then personalize it.</h2>
            <p>Start with housing, food, transport, utilities, healthcare and discretionary spending for the same household type. Convert both totals with a dated exchange rate, inspect the largest category differences, and finally compare the destination budget with your expected take-home pay.</p>
          </section>

          <section>
            <h2>Why one cost-of-living percentage is not enough</h2>
            <p>A city index compresses many prices into one number. That is helpful for a first look, but the average basket may rent a different home, use a different commute or spend differently from you. Even official indexes are designed for a defined geography and purpose.</p>
            <p>A spatial price index compares the cost of a common basket between places. An inflation index tracks how prices change through time. That distinction prevents a common mistake: treating a cross-city comparison as an inflation forecast.</p>
            <div className="fact-strip"><strong>One useful reality check</strong><p>Housing and transport frequently outweigh many smaller purchases. A different home or commute can therefore move your personal result much more than a small difference in everyday items.</p></div>
          </section>

          <section>
            <h2>A seven-step comparison method</h2>
            <ol className="numbered-method">
              <li><span>01</span><div><h3>Define the decision</h3><p>Are you choosing a city, testing a job offer or setting a remote-work budget? A discovery comparison can use broad averages. A signed lease or offer needs neighborhood rent, taxes and benefits.</p></div></li>
              <li><span>02</span><div><h3>Match the geography</h3><p>City proper, metropolitan area and state or region are not interchangeable. Record the area covered by each value. If an index is metro-level, do not describe it as a specific neighborhood price.</p></div></li>
              <li><span>03</span><div><h3>Hold the household constant</h3><p>Use the same number of adults and children, housing tenure and childcare assumptions. Otherwise the comparison mixes a location change with a lifestyle change.</p></div></li>
              <li><span>04</span><div><h3>Build the basket by category</h3><p>Separate housing, groceries, food away from home, transport, utilities, healthcare, childcare, education, personal spending and savings. Conditional costs should be switched on only when they apply.</p></div></li>
              <li><span>05</span><div><h3>Keep native prices and date the conversion</h3><p>Store rent in pounds, euros or local currency first. Add a reference-currency view with an exchange-rate date so currency volatility remains visible.</p></div></li>
              <li><span>06</span><div><h3>Compare income after tax</h3><p>A spending-equivalent amount preserves the basket. A take-home-equivalent amount also reflects tax and mandatory deductions. They answer different questions and should be shown separately.</p></div></li>
              <li><span>07</span><div><h3>Run a sensitivity check</h3><p>Change rent, childcare and transport because these large or conditional categories can reverse the conclusion. Treat a narrow difference as a range, not a winner.</p></div></li>
            </ol>
          </section>

          <section>
            <h2>The categories a useful comparison should cover</h2>
            <div className="research-table-wrap"><table className="research-table"><thead><tr><th>Category</th><th>Include</th><th>Personal decision that changes it</th></tr></thead><tbody>
              <tr><th>Housing</th><td>Rent or ownership cost, required size, local fees and basic maintenance</td><td>Neighborhood, tenure, furnished status and commute</td></tr>
              <tr><th>Food</th><td>Groceries and meals away from home as separate lines</td><td>Diet, household size and frequency of dining out</td></tr>
              <tr><th>Transport</th><td>Transit pass or car ownership, fuel, insurance, parking and maintenance</td><td>Car-free versus car-dependent routine</td></tr>
              <tr><th>Utilities</th><td>Energy, water, broadband and mobile service</td><td>Home size, climate, efficiency and what rent already includes</td></tr>
              <tr><th>Healthcare</th><td>Premiums, routine out-of-pocket costs and required cover</td><td>Public eligibility, employer plan and household health needs</td></tr>
              <tr><th>Family costs</th><td>Childcare and education only when applicable</td><td>Children’s ages, public eligibility and school choice</td></tr>
              <tr><th>Lifestyle</th><td>Clothing, fitness, entertainment, personal care and travel</td><td>Your actual habits rather than an average-city profile</td></tr>
            </tbody></table></div>
          </section>

          <section>
            <h2>How to read an index without reversing the math</h2>
            <p>If City A has an index of 100 and City B has an index of 120, the selected basket is 20% more expensive in B relative to A. The reverse statement is not 20%: A is about 16.7% cheaper than B because the denominator changes.</p>
            <div className="formula-card"><span>Destination difference</span><strong>(destination cost ÷ current cost − 1) × 100</strong><small>Example: (120 ÷ 100 − 1) × 100 = 20% higher</small></div>
            <p>Indexes close together should not be over-ranked. Results within a narrow range are better treated as broadly similar because weights, geographic coverage and changing prices all add uncertainty.</p>
          </section>

          <section>
            <h2>Check the data before trusting the answer</h2>
            <ul className="check-list">
              <li><strong>Data type:</strong> Is the figure observed, calculated, averaged or modeled?</li>
              <li><strong>Geography:</strong> Does it describe the city, metro, country or an unspecified area?</li>
              <li><strong>Period:</strong> Is the date the observation period, publication date or website update date?</li>
              <li><strong>Coverage:</strong> How many material categories and observations support the total?</li>
              <li><strong>Typical value:</strong> Is the figure a mean, median, range or one example price?</li>
              <li><strong>Currency:</strong> Is the exchange rate current, and can you inspect native values?</li>
              <li><strong>Limitations:</strong> Are taxes, childcare, healthcare and one-time moving costs included?</li>
            </ul>
          </section>

          <section className="guide-action">
            <p className="eyebrow">Apply the method</p>
            <h2>Start with a like-for-like city comparison.</h2>
            <p>Use the calculator as a planning worksheet, then replace its broad assumptions with your rent, commute and take-home pay before making a commitment.</p>
            <Link href="/compare-cities#compare">Compare two cities →</Link>
          </section>

          <section>
            <h2>Frequently asked questions</h2>
            <AnimatedFaqList className="article-faq" items={faqs} />
          </section>

        </article>
      </div>
      <SiteFooter />
    </main>
  )
}
