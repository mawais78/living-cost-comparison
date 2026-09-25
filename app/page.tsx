import type { Metadata } from "next"
import { ArrowRight, BadgeDollarSign, Banknote, MapPin, Receipt, ShieldCheck, ShoppingBasket, SlidersHorizontal, Users } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

import { AnimatedFaqList } from "@/components/animated-faq"
import { CompareLauncher } from "@/components/compare-launcher"
import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"
import { StructuredData } from "@/components/structured-data"
import { cities, getCanonicalComparisonPath, getCity, getCityDisplayName, getMonthlyCost } from "@/lib/cost-data"
import heroImage from "@/public/images/guides/compare-cost-of-living.jpg"

export const metadata: Metadata = {
  title: { absolute: "Cost of Living Comparison: Cities & Salaries" },
  description: "Compare cost of living between cities, estimate the take-home salary needed after moving, and inspect the budget assumptions behind the result.",
  alternates: { canonical: "/" },
}

const ranked = cities.map((city) => ({ city, total: getMonthlyCost(city, "single", "balanced") })).sort((a, b) => b.total - a.total)
const featuredBudgetSlugs = new Set(["san-francisco", "london", "amsterdam", "tokyo", "lisbon", "mexico-city", "bangkok", "karachi"])
const featuredBudgets = ranked
  .map((item, index) => ({ ...item, rank: index + 1 }))
  .filter(({ city }) => featuredBudgetSlugs.has(city.slug))
const maxBudget = Math.max(...ranked.map((item) => item.total))
const money = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 })
const countrySlug = (country: string) => country.toLowerCase().replaceAll(" ", "-")
const featuredComparisons = [
  { from: "amsterdam", to: "london", label: "European relocation benchmark", query: "Which city gives the same lifestyle budget?" },
  { from: "new-york", to: "san-francisco", label: "US housing pressure", query: "How much does housing change the result?" },
  { from: "toronto", to: "vancouver", label: "Canada's major metros", query: "Which Canadian city is easier on a monthly budget?" },
  { from: "melbourne", to: "sydney", label: "Australia's major cities", query: "What changes between Australia's largest job markets?" },
  { from: "dubai", to: "london", label: "International relocation", query: "How do two global hubs compare?" },
  { from: "singapore", to: "zurich", label: "High-income hubs", query: "What does a premium city budget look like?" },
  { from: "austin", to: "new-york", label: "US work and lifestyle move", query: "What happens when rent and commute change?" },
  { from: "berlin", to: "paris", label: "Western Europe", query: "How different are the recurring costs?" },
].map((item) => {
  const from = getCity(item.from)
  const to = getCity(item.to)
  const fromTotal = getMonthlyCost(from, "single", "balanced")
  const toTotal = getMonthlyCost(to, "single", "balanced")
  const difference = toTotal - fromTotal
  return {
    ...item,
    fromName: getCityDisplayName(from),
    toName: getCityDisplayName(to),
    fromTotal,
    toTotal,
    difference,
    href: getCanonicalComparisonPath(from.slug, to.slug),
  }
})
const faqs = [
  ["What does a cost-of-living comparison measure?", "It compares the price of a defined basket of household expenses between places. A useful comparison states the household, housing choice, geography, currency date and categories behind the headline percentage."],
  ["Is cost of living the same as inflation?", "No. A cost-of-living index between cities is a spatial comparison. Inflation measures price change through time for a defined economy and basket."],
  ["Can I use the result to compare salaries?", "Use it to estimate a spending-power target, then calculate taxes and compare role-specific market pay separately. An equivalent salary is not a prediction of what an employer will offer."],
  ["How current are the city estimates?", "Each city record shows its update month. Use the comparison as a planning baseline and refresh major costs such as rent, transport and childcare before making a financial commitment."],
  ["Which expenses usually create the biggest difference between cities?", "Housing is often the largest variable, but transport, childcare, healthcare and taxes can change the result substantially. The most useful comparison shows the category breakdown instead of relying only on one headline percentage."],
  ["Does a lower cost of living always mean a better move?", "No. A lower monthly budget can be offset by lower take-home pay, weaker benefits, longer commutes or costs that matter specifically to your household. Compare the remaining income after essential expenses, not only the city total."],
]

export default function Home() {
  return (
    <main>
      <StructuredData data={[
        { "@context": "https://schema.org", "@type": "WebSite", name: "Living Cost Comparison", alternateName: "LivingCostComparison.com", url: "https://livingcostcomparison.com/", description: metadata.description },
        { "@context": "https://schema.org", "@type": "Organization", name: "Living Cost Comparison", url: "https://livingcostcomparison.com/", logo: "https://livingcostcomparison.com/brand/logo-mark.svg" },
        { "@context": "https://schema.org", "@type": "ItemList", name: "Popular city cost comparisons", itemListElement: featuredComparisons.map((comparison, index) => ({ "@type": "ListItem", position: index + 1, name: `${comparison.fromName} vs ${comparison.toName} cost of living`, url: `https://livingcostcomparison.com${comparison.href}` })) },
        { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faqs.map(([question, answer]) => ({ "@type": "Question", name: question, acceptedAnswer: { "@type": "Answer", text: answer } })) },
      ]} />
      <SiteHeader />

      <section className="landing-hero">
        <Image
          className="landing-hero-image"
          src={heroImage}
          alt=""
          fill
          priority
          fetchPriority="high"
          quality={55}
          sizes="100vw"
        />
        <div className="page-shell landing-hero-grid">
          <div className="landing-hero-copy">
            <p className="eyebrow">Cost of living comparison</p>
            <h1>Know what a move changes before you commit.</h1>
            <p>Compare a like-for-like monthly budget, estimate the take-home pay needed in another city and see which assumptions have the greatest effect.</p>
            <div className="landing-trust"><span>Household-aware</span><span>Salary-focused</span><span>Method explained</span></div>
          </div>
          <CompareLauncher />
        </div>
      </section>

      <section className="home-answer-section">
        <div className="page-shell home-answer-grid">
          <header><p className="eyebrow">What the comparison tells you</p><h2>One decision, broken into three answers.</h2></header>
          <div className="home-answer-cards">
            <article>
              <div className="home-answer-marker"><span>01</span><ShoppingBasket aria-hidden="true" /></div>
              <div className="home-answer-copy"><h3>What would the same household budget cost?</h3><p>Compare housing, food, transport, utilities and other recurring expenses using the same household and lifestyle assumptions.</p><Link href="/compare-cities">Compare two cities <ArrowRight aria-hidden="true" /></Link></div>
            </article>
            <article>
              <div className="home-answer-marker"><span>02</span><BadgeDollarSign aria-hidden="true" /></div>
              <div className="home-answer-copy"><h3>What take-home income could preserve it?</h3><p>Translate the destination budget into a planning target without confusing spending equivalence with gross salary or local market pay.</p><Link href="/salary-comparison">Estimate equivalent salary <ArrowRight aria-hidden="true" /></Link></div>
            </article>
            <article>
              <div className="home-answer-marker"><span>03</span><ShieldCheck aria-hidden="true" /></div>
              <div className="home-answer-copy"><h3>How much confidence belongs in the result?</h3><p>Check the geography, observation period, currency, coverage and whether a value was observed, calculated or modeled.</p><Link href="/methodology">Read the data standard <ArrowRight aria-hidden="true" /></Link></div>
            </article>
          </div>
        </div>
      </section>

      <section className="home-evidence-section">
        <div className="page-shell home-evidence-grid">
          <div><p className="eyebrow">Why a personal basket matters</p><h2>Large categories decide more than a neat average.</h2><p>One universal index cannot describe every household. Housing can dominate one move, transport another, while food and family costs change with household size and routine. The calculator keeps these categories separate so you can see what is driving the result.</p><Link href="/methodology">See how the basket is calculated →</Link></div>
          <figure className="home-evidence-visual">
            <Image src="/images/home/household-cost-drivers.jpg" alt="A miniature home, city transit route and grocery basket representing household cost drivers" width={1448} height={1086} sizes="(max-width: 760px) calc(100vw - 40px), 520px" />
            <figcaption aria-label="Housing and rent, transport and commuting, food and household spending">
              <span><small>Housing</small><strong>Rent</strong></span>
              <span><small>Transport</small><strong>Commute</strong></span>
              <span><small>Food</small><strong>Household</strong></span>
            </figcaption>
          </figure>
        </div>
      </section>

      <section className="home-cost-drivers-section" aria-labelledby="home-cost-drivers-title">
        <div className="page-shell home-cost-drivers-layout">
          <header>
            <p className="eyebrow">What changes the result</p>
            <h2 id="home-cost-drivers-title">Cost of living is shaped by the life you plan to live.</h2>
            <p>A city average is useful for orientation, but a relocation budget becomes meaningful only when the assumptions resemble your household. Start with the categories that can move the total by hundreds or thousands each month, then refine the smaller expenses.</p>
            <div className="home-cost-driver-note"><strong>Start with the address.</strong><p>Housing affects rent, utilities, commute time, transport choices and access to schools or services. A realistic neighborhood often matters more than the citywide average.</p></div>
          </header>
          <div className="home-cost-driver-list">
            <article><span>01</span><div><h3>Housing and neighborhood</h3><p>Compare the home size, rental standard, area and lease terms you would actually choose. City-center and outer-area budgets can lead to very different conclusions.</p></div><small>Largest monthly variable</small></article>
            <article><span>02</span><div><h3>Transport and commute</h3><p>Public transport, car ownership, parking, fuel and commute distance belong in the same decision. Cheaper rent can lose its advantage when the commute becomes expensive.</p></div><small>Location dependent</small></article>
            <article><span>03</span><div><h3>Food and daily routine</h3><p>Groceries and dining depend on household size, dietary choices and how often you eat away from home. Keep the routine constant when comparing cities.</p></div><small>Household dependent</small></article>
            <article><span>04</span><div><h3>Healthcare and insurance</h3><p>Employer coverage, public systems, premiums and out-of-pocket costs vary widely. Compare the amount your household pays, not only the sticker price of care.</p></div><small>System dependent</small></article>
            <article><span>05</span><div><h3>Childcare and education</h3><p>Families should price the specific childcare schedule and school route they expect to use. These costs can outweigh savings in several smaller categories.</p></div><small>Family dependent</small></article>
            <article><span>06</span><div><h3>Taxes, benefits and take-home pay</h3><p>Keep taxes outside the living-cost basket, then compare net salary, pension, health benefits and employer support as a separate income calculation.</p></div><small>Income dependent</small></article>
          </div>
        </div>
      </section>

      <section className="landing-spectrum">
        <div className="page-shell landing-spectrum-grid">
          <div className="landing-spectrum-copy"><p className="eyebrow">City cost explorer</p><h2>A quick view across the cost spectrum.</h2><p>Eight city benchmarks show the range of USD-equivalent monthly estimates for one person. Search, sort and review all {cities.length} cities in the complete index.</p><Link href="/cost-of-living-index">Explore all {cities.length} cities <span>→</span></Link></div>
          <div className="landing-budget-chart" aria-label="Estimated monthly city budgets">
            <div className="landing-budget-head" aria-hidden="true"><span>Rank</span><span>City</span><span>Relative budget</span><span>Estimate</span></div>
            {featuredBudgets.map(({ city, total, rank }) => <Link href={`/cost-of-living/${countrySlug(city.country)}/${city.slug}`} key={city.slug} className="landing-budget-row"><span>{String(rank).padStart(3, "0")}</span><strong>{city.city}</strong><div><i style={{ width: `${total / maxBudget * 100}%` }} /></div><b>{money.format(total)}</b></Link>)}
          </div>
        </div>
      </section>

      <section className="home-featured-comparisons" aria-labelledby="featured-comparisons-title">
        <div className="page-shell home-featured-comparisons-grid">
          <header>
            <p className="eyebrow">Popular comparisons</p>
            <h2 id="featured-comparisons-title">Start with a city pair people often weigh.</h2>
            <p>These dedicated pages put two cities, their monthly budgets and the largest category differences in one place. Open a pair for the full breakdown, then adjust the household and lifestyle to fit your move.</p>
            <Link className="text-link" href="/compare-cities">Browse every comparison <ArrowRight aria-hidden="true" /></Link>
          </header>
          <div className="home-featured-comparisons-list">
            {featuredComparisons.map((comparison, index) => (
              <Link href={comparison.href} key={comparison.href}>
                <span className="home-featured-comparison-number">{String(index + 1).padStart(2, "0")}</span>
                <span className="home-featured-comparison-copy"><small>{comparison.label}</small><strong>{comparison.fromName} <i>vs</i> {comparison.toName}</strong><em>{comparison.query}</em></span>
                <span className="home-featured-comparison-budget"><small>One person · balanced</small><b>{money.format(comparison.fromTotal)} <i>→</i> {money.format(comparison.toTotal)}</b><em>{money.format(Math.abs(comparison.difference))} {comparison.difference >= 0 ? "more" : "less"} at destination</em></span>
                <ArrowRight className="home-featured-comparison-arrow" aria-hidden="true" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="home-method-section-rich">
        <div className="page-shell">
          <header><p className="eyebrow">A defensible comparison</p><h2>Use the same method in both places.</h2></header>
          <div className="home-method-grid">
            <article><div className="home-method-card-top"><span>01</span><Users aria-hidden="true" /></div><h3>Match the household</h3><p>Keep adults, children, housing tenure and lifestyle constant before you compare prices.</p></article>
            <article><div className="home-method-card-top"><span>02</span><MapPin aria-hidden="true" /></div><h3>Name the geography</h3><p>City proper, metro and country averages are different. The page must say which one supports the number.</p></article>
            <article><div className="home-method-card-top"><span>03</span><Banknote aria-hidden="true" /></div><h3>Retain native prices</h3><p>Convert to one display currency only after preserving local values and dating the exchange rate.</p></article>
            <article><div className="home-method-card-top"><span>04</span><Receipt aria-hidden="true" /></div><h3>Separate taxes</h3><p>Living costs price the basket. Tax rules turn gross salary into take-home pay and require a separate calculation.</p></article>
            <article><div className="home-method-card-top"><span>05</span><ShieldCheck aria-hidden="true" /></div><h3>Check the estimate</h3><p>Coverage, recency and price variation decide how precisely a result should be used.</p></article>
            <article><div className="home-method-card-top"><span>06</span><SlidersHorizontal aria-hidden="true" /></div><h3>Test what matters</h3><p>Change rent, childcare and transport before relying on a narrow city difference.</p></article>
          </div>
          <Link className="text-link" href="/guides/how-to-compare-cost-of-living">Read the complete comparison method →</Link>
        </div>
      </section>

      <section className="home-relocation-section" aria-labelledby="home-relocation-title">
        <div className="page-shell home-relocation-layout">
          <header className="home-relocation-heading">
            <div><p className="eyebrow">Plan the whole move</p><h2 id="home-relocation-title">A complete relocation budget has three parts.</h2></div>
            <p>The recurring city comparison is only one layer. A responsible plan also accounts for the cash required to move and the take-home income available after tax and benefits.</p>
          </header>
          <div className="home-relocation-ledger">
            <article>
              <span>01 · Monthly</span>
              <h3>Recurring living costs</h3>
              <p>The expenses that shape your regular household budget after you settle.</p>
              <ul><li>Rent and household utilities</li><li>Groceries and dining</li><li>Transport and commuting</li><li>Healthcare, childcare and leisure</li></ul>
              <Link href="/compare-cities">Compare monthly costs <ArrowRight aria-hidden="true" /></Link>
            </article>
            <article>
              <span>02 · One time</span>
              <h3>Moving and setup costs</h3>
              <p>The cash needed before the first normal month begins.</p>
              <ul><li>Deposits and application fees</li><li>Travel, shipping and temporary housing</li><li>Visas, permits and registrations</li><li>Furniture, equipment and connection fees</li></ul>
              <Link href="/guides/how-to-compare-cost-of-living">Build a complete checklist <ArrowRight aria-hidden="true" /></Link>
            </article>
            <article>
              <span>03 · Income</span>
              <h3>Take-home pay and benefits</h3>
              <p>The resources that must support the destination budget and your savings goals.</p>
              <ul><li>Net salary after tax and deductions</li><li>Health, pension and employer benefits</li><li>Bonuses, equity and variable income</li><li>Savings target and emergency margin</li></ul>
              <Link href="/salary-comparison">Estimate equivalent salary <ArrowRight aria-hidden="true" /></Link>
            </article>
          </div>
          <div className="home-relocation-rule"><strong>Use the remaining-income test.</strong><p>Compare what remains after essential monthly costs, not just whether the destination is cheaper. A move is financially stronger when the new take-home income covers the new budget, protects savings and leaves room for costs that are difficult to predict.</p></div>
        </div>
      </section>

      <section className="home-guides-section">
        <div className="page-shell home-guides-grid">
          <header><p className="eyebrow">Research guides</p><h2>Move from a percentage to a decision.</h2><p>Each guide answers a different question and links the statistical concept to a practical worksheet.</p></header>
          <div>
            <Link href="/guides/how-to-compare-cost-of-living">
              <Image className="home-guide-image" src="/images/guides/compare-cost-of-living.jpg" alt="" width={1536} height={1024} />
              <div className="home-guide-copy"><span>01 · Method</span><h3>How to compare cost of living between cities</h3><p>Build a like-for-like basket, interpret indexes and check data quality.</p><b>Read guide →</b></div>
            </Link>
            <Link href="/guides/equivalent-salary-for-relocation">
              <Image className="home-guide-image" src="/images/guides/equivalent-salary-relocation.jpg" alt="" width={1536} height={1024} />
              <div className="home-guide-copy"><span>02 · Salary</span><h3>How to calculate equivalent salary after moving</h3><p>Preserve take-home margin, include benefits and keep moving costs separate.</p><b>Read guide →</b></div>
            </Link>
            <Link href="/guides/cost-of-living-vs-cost-of-labor">
              <Image className="home-guide-image" src="/images/guides/cost-of-living-vs-labor.jpg" alt="" width={1536} height={1024} />
              <div className="home-guide-copy"><span>03 · Compensation</span><h3>Cost of living versus cost of labor</h3><p>Understand why an expensive city does not automatically mean an equal pay increase.</p><b>Read guide →</b></div>
            </Link>
          </div>
        </div>
      </section>

      <section className="home-transparency-section">
        <div className="page-shell home-transparency-grid">
          <header><h2>One method across every city.</h2></header>
          <div className="home-transparency-body">
            <div className="home-transparency-commitments">
              <article><span>01</span><div><h3>Same structure</h3><p>Every comparison uses the same household, lifestyle and category structure.</p></div></article>
              <article><span>02</span><div><h3>Visible assumptions</h3><p>Major assumptions stay visible and update dates are shown with city estimates.</p></div></article>
              <article><span>03</span><div><h3>Taxes stay separate</h3><p>Taxes remain separate from recurring living costs.</p></div></article>
            </div>
            <nav aria-label="Planning standard links"><Link href="/methodology">Read the methodology <ArrowRight aria-hidden="true" /></Link><Link href="/about">About the project <ArrowRight aria-hidden="true" /></Link></nav>
          </div>
        </div>
      </section>

      <section className="home-faq-section"><div className="page-shell home-faq-layout"><header className="home-section-intro home-faq-heading"><p className="eyebrow">Frequently asked</p><h2>Understand the result before using it.</h2></header><AnimatedFaqList className="home-faq-list" iconElement="i" items={faqs} /></div></section>

      <section className="home-final-cta"><div className="page-shell"><span>Start with your own scenario</span><div><p className="eyebrow">Cost of living comparison</p><h2>Compare two cities using the same household and lifestyle.</h2></div><Link href="/compare-cities#compare">Open the comparison workspace <ArrowRight /></Link></div></section>
      <SiteFooter />
    </main>
  )
}
