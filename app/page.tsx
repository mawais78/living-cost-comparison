import type { Metadata } from "next"
import { ArrowRight, BadgeDollarSign, Banknote, MapPin, Receipt, ShieldCheck, ShoppingBasket, SlidersHorizontal, Users } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

import { AnimatedFaqList } from "@/components/animated-faq"
import { CompareLauncher } from "@/components/compare-launcher"
import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"
import { StructuredData } from "@/components/structured-data"
import { cities, costCategories, dataEdition, getCanonicalComparisonPath, getCity, getCityDisplayName, getMonthlyCost } from "@/lib/cost-data"
import { getSocialMetadata, siteName, siteUrl } from "@/lib/seo"
import heroImage from "@/public/images/guides/compare-cost-of-living.jpg"

const pageTitle = "Cost of Living Comparison Calculator | Compare Cities"
const pageDescription = `Compare the cost of living in ${cities.length} cities. Explore monthly budgets including rent, groceries and transport, and estimate equivalent take-home pay for a move.`
const countryCount = new Set(cities.map((city) => city.country)).size

export const metadata: Metadata = {
  title: { absolute: pageTitle },
  description: pageDescription,
  alternates: { canonical: "/" },
  ...getSocialMetadata({
    title: pageTitle,
    description: pageDescription,
    path: "/",
  }),
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
  { from: "amsterdam", to: "london", label: "Netherlands · United Kingdom", query: "Compare rent, monthly spending and equivalent income." },
  { from: "new-york", to: "san-francisco", label: "United States", query: "See how housing contributes to the budget difference." },
  { from: "toronto", to: "vancouver", label: "Canada", query: "Compare the same household budget in two Canadian cities." },
  { from: "melbourne", to: "sydney", label: "Australia", query: "Review housing and everyday expenses side by side." },
  { from: "dubai", to: "london", label: "United Arab Emirates · United Kingdom", query: "Compare living costs before checking taxes separately." },
  { from: "singapore", to: "zurich", label: "Singapore · Switzerland", query: "Explore the monthly budget and take-home income target." },
  { from: "austin", to: "new-york", label: "United States", query: "Check the cost difference before weighing a job offer." },
  { from: "berlin", to: "paris", label: "Germany · France", query: "Compare recurring expenses for a move within Europe." },
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
const categoryNotes = {
  housing: "A monthly housing allowance. Check rental listings for your intended neighborhood, home size and lease terms.",
  groceries: "Food and household shopping. Dietary choices, local brands and household size can change your actual bill.",
  dining: "Meals and drinks away from home. Review this allowance against how often you expect to eat out.",
  transport: "Everyday travel. Check local transit fares or build a separate car budget with fuel, insurance and parking.",
  utilities: "Energy, water, heating and waste collection. Confirm which bills your rent includes.",
  connectivity: "Home internet and mobile service. Check local plans, installation fees and contract terms.",
  insurance: "Recurring personal, renter and household protection. Coverage requirements and employer benefits vary by location.",
  healthcare: "A broad allowance for appointments, dental care and treatment. Check your eligibility, insurance and expected out-of-pocket costs.",
  pharmacy: "Prescriptions, basic medicine and pharmacy purchases. Local coverage and dispensing rules can affect the amount you pay.",
  personal: "Grooming, toiletries and routine personal services. Adjust the allowance to match the products and services you use.",
  clothing: "Everyday clothing and footwear. Seasonal needs and workplace expectations can change this amount.",
  household: "Cleaning supplies, small furnishings and home essentials. A new home may need a larger first-year allowance.",
  householdServices: "Laundry, cleaning, repairs and routine home help. Local labor costs can make this line change considerably.",
  fitness: "Gym, sports and routine wellness spending. Membership choices make this category highly personal.",
  entertainment: "Streaming, events, games and recurring media. Review subscriptions that may change price or availability after a move.",
  leisure: "Hobbies, local outings and recreation. Your routine determines how closely this allowance fits.",
} satisfies Record<(typeof costCategories)[number]["key"], string>
const salaryExample = {
  from: getCity("london"),
  to: getCity("amsterdam"),
  income: 6500,
}
const exampleFromBudget = getMonthlyCost(salaryExample.from, "single", "balanced")
const exampleToBudget = getMonthlyCost(salaryExample.to, "single", "balanced")
const exampleEquivalent = Math.round(salaryExample.income * exampleToBudget / exampleFromBudget / 10) * 10

const faqs = [
  ["How do I compare the cost of living between two cities?", "Choose your current city and destination, then use the same household and lifestyle settings in both. Compare the monthly totals and category breakdown. Before deciding on a move, check local rent and transport prices and add expenses specific to your household."],
  ["Does this cost-of-living calculator include rent?", "Yes. Housing is included in the monthly total, alongside food, transport, utilities, connectivity, insurance, healthcare, personal and household spending, fitness, entertainment and leisure. Housing is a modeled allowance; it is not a quote for a particular apartment or neighborhood."],
  ["Can I compare costs for a couple or a family of four?", "Yes. Choose one person, a couple or a family of four, with a lean, balanced or comfortable lifestyle. These presets scale the same city basket using fixed multipliers. They do not price each family member separately, and childcare and school fees are excluded."],
  ["What salary do I need to maintain my lifestyle in another city?", "The calculator multiplies your current monthly take-home income by the destination budget divided by the current-city budget. The result is an estimated net-income target in USD. Calculate taxes separately to work back to a gross salary, and check local market pay and benefits before evaluating an offer."],
  ["Which currency does the comparison use?", "All budgets and salary inputs use US dollars or USD equivalents so cities can be compared on the same basis. The calculator does not use live exchange rates. Check the current exchange rate separately if you earn or spend in another currency."],
  ["Where do the cost estimates come from, and how current are they?", `Living Cost Comparison maintains rounded, modeled estimates. The current model edition is ${dataEdition}; this is not a date of verified local price collection. Individual prices do not yet have provider-level citations or live exchange-rate timestamps. Use the estimates to shortlist cities, then check current local quotes.`],
  ["What costs should I add to my relocation budget?", "Add childcare, education, debt repayments, savings goals and one-time moving costs such as deposits, travel, visas and shipping. These are outside the monthly city basket. Taxes and employer benefits also need a separate review when comparing take-home income."],
  ["Is a cost-of-living comparison the same as inflation?", "No. A city comparison looks at differences in estimated costs between places. Inflation measures price changes over time. A city can have slower inflation and still be more expensive than another city."],
]

export default function Home() {
  return (
    <main>
      <StructuredData data={[
        { "@context": "https://schema.org", "@type": "WebSite", "@id": `${siteUrl}/#website`, name: siteName, alternateName: "LivingCostComparison.com", url: `${siteUrl}/`, description: pageDescription, publisher: { "@id": `${siteUrl}/#organization` }, inLanguage: "en" },
        { "@context": "https://schema.org", "@type": "Organization", "@id": `${siteUrl}/#organization`, name: siteName, url: `${siteUrl}/`, logo: `${siteUrl}/brand/logo-mark.svg` },
        { "@context": "https://schema.org", "@type": "WebPage", "@id": `${siteUrl}/#webpage`, name: pageTitle, url: `${siteUrl}/`, description: pageDescription, isPartOf: { "@id": `${siteUrl}/#website` }, publisher: { "@id": `${siteUrl}/#organization` }, inLanguage: "en" },
        { "@context": "https://schema.org", "@type": "ItemList", "@id": `${siteUrl}/#featured-comparisons`, name: "Featured city cost-of-living comparisons", numberOfItems: featuredComparisons.length, itemListElement: featuredComparisons.map((comparison, index) => ({ "@type": "ListItem", position: index + 1, name: `${comparison.fromName} vs ${comparison.toName} cost of living`, url: `${siteUrl}${comparison.href}` })) },
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
            <p className="eyebrow">Cost of living comparison calculator</p>
            <h1>Compare the cost of living between cities.</h1>
            <p>Planning a move or weighing a job offer? Compare monthly budgets in {cities.length} cities, see how rent and everyday expenses differ, and estimate the take-home income you would need.</p>
            <div className="landing-trust"><span>{cities.length} cities · {countryCount} countries and territories</span><span>No signup required</span></div>
          </div>
          <CompareLauncher />
        </div>
      </section>

      <section className="home-answer-section">
        <div className="page-shell home-answer-grid">
          <header><p className="eyebrow">Understand your next move</p><h2>What is a cost-of-living comparison?</h2><p className="home-answer-definition">A cost-of-living comparison estimates how much the same set of everyday expenses costs in two places. Here, you can compare a monthly household budget, see the difference by category and estimate an equivalent take-home income.</p></header>
          <div className="home-answer-cards">
            <article>
              <div className="home-answer-marker"><span>01</span><ShoppingBasket aria-hidden="true" /></div>
              <div className="home-answer-copy"><h3>How much would I spend each month?</h3><p>See estimated monthly totals for one person, a couple or a family of four. Keep the same lifestyle preset in both cities to make a useful comparison.</p><Link href="/compare-cities">Compare city living costs <ArrowRight aria-hidden="true" /></Link></div>
            </article>
            <article>
              <div className="home-answer-marker"><span>02</span><BadgeDollarSign aria-hidden="true" /></div>
              <div className="home-answer-copy"><h3>What salary would I need after moving?</h3><p>Enter your monthly income after tax to estimate the take-home pay that could support a similar modeled lifestyle at your destination.</p><Link href="/salary-comparison">Use the equivalent salary calculator <ArrowRight aria-hidden="true" /></Link></div>
            </article>
            <article>
              <div className="home-answer-marker"><span>03</span><ShieldCheck aria-hidden="true" /></div>
              <div className="home-answer-copy"><h3>What should I check before deciding?</h3><p>Review how the estimates are calculated, then check rental listings, local fares and your household’s extra costs before setting a moving budget.</p><Link href="/methodology">Read the methodology and limits <ArrowRight aria-hidden="true" /></Link></div>
            </article>
          </div>
        </div>
      </section>

      <section className="home-evidence-section">
        <div className="page-shell home-evidence-grid">
          <div><p className="eyebrow">Start with the biggest expenses</p><h2>Compare rent and transport together.</h2><p>A cheaper apartment may come with a longer commute, car payments or higher utility bills. Compare the combined monthly cost of the home and the routine it creates.</p><p>In the United States, housing and transport accounted for just over half of average household spending in 2024, according to the <a className="home-source-link" href="https://www.bls.gov/opub/ted/2026/housing-and-transportation-accounted-for-50-percent-of-household-spending-in-2024.htm">U.S. Bureau of Labor Statistics</a>. That is U.S. context, not a spending rule for every city or household.</p><Link href="/guides/how-to-compare-cost-of-living">Learn how to compare a relocation budget →</Link></div>
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
            <p className="eyebrow">What the calculator includes</p>
            <h2 id="home-cost-drivers-title">{costCategories.length} categories behind your monthly budget.</h2>
            <p>Every city uses the same expense categories. The breakdown shows where the modeled difference comes from, so you can decide which local prices to research first.</p>
            <div className="home-cost-driver-note"><strong>Budget separately for the extras.</strong><p>Income tax, childcare, education, debt repayments, savings and one-time moving costs are outside these totals. The family preset does not add childcare or school fees.</p></div>
          </header>
          <div className="home-cost-driver-list">
            {costCategories.map((category, index) => <article key={category.key}><span>{String(index + 1).padStart(2, "0")}</span><div><h3>{category.label}</h3><p>{categoryNotes[category.key]}</p></div></article>)}
          </div>
        </div>
      </section>

      <section className="landing-spectrum">
        <div className="page-shell landing-spectrum-grid">
          <div className="landing-spectrum-copy"><p className="eyebrow">Explore city budgets</p><h2>What does it cost to live in another city?</h2><p>These eight examples show estimated monthly spending for one person with a balanced lifestyle, including housing. All amounts are USD equivalents from the {dataEdition} model edition.</p><p>Rank shows each city’s position among our {cities.length} modeled budgets, from highest to lowest. Search and sort the full index to build your shortlist.</p><Link href="/cost-of-living-index">Explore all {cities.length} city budgets <span>→</span></Link></div>
          <div className="landing-budget-chart" aria-label={`Modeled monthly city budgets in USD, one person, balanced lifestyle, ${dataEdition}`}>
            <div className="landing-budget-head" aria-hidden="true"><span>Rank</span><span>City</span><span>Relative budget</span><span>USD / month</span></div>
            {featuredBudgets.map(({ city, total, rank }) => <Link href={`/cost-of-living/${countrySlug(city.country)}/${city.slug}`} key={city.slug} className="landing-budget-row"><span>{String(rank).padStart(3, "0")}</span><strong>{city.city}</strong><div><i style={{ width: `${total / maxBudget * 100}%` }} /></div><b>{money.format(total)}</b></Link>)}
          </div>
        </div>
      </section>

      <section className="home-featured-comparisons" aria-labelledby="featured-comparisons-title">
        <div className="page-shell home-featured-comparisons-grid">
          <header>
            <p className="eyebrow">Featured city comparisons</p>
            <h2 id="featured-comparisons-title">Compare living costs side by side.</h2>
            <p>Explore city pairs across the United States, Canada, Europe, Australia and Asia. Each preview uses one person, a balanced lifestyle and USD per month, including housing. Open a comparison to change the presets.</p>
            <Link className="text-link" href="/compare-cities">Choose your own city pair <ArrowRight aria-hidden="true" /></Link>
          </header>
          <div className="home-featured-comparisons-list">
            {featuredComparisons.map((comparison, index) => (
              <Link href={comparison.href} key={comparison.href}>
                <span className="home-featured-comparison-number">{String(index + 1).padStart(2, "0")}</span>
                <span className="home-featured-comparison-copy"><small>{comparison.label}</small><strong>{comparison.fromName} <i>vs</i> {comparison.toName}</strong><em>{comparison.query}</em></span>
                <span className="home-featured-comparison-budget"><small>USD / month · estimated</small><b>{money.format(comparison.fromTotal)} <i>→</i> {money.format(comparison.toTotal)}</b><em>{money.format(Math.abs(comparison.difference))} {comparison.difference >= 0 ? "more" : "less"} in {comparison.toName}</em></span>
                <ArrowRight className="home-featured-comparison-arrow" aria-hidden="true" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="home-method-section-rich">
        <div className="page-shell">
          <header><p className="eyebrow">From estimate to moving plan</p><h2>How to use the cost-of-living calculator.</h2></header>
          <div className="home-method-grid">
            <article><div className="home-method-card-top"><span>01</span><MapPin aria-hidden="true" /></div><h3>Choose your cities</h3><p>In the calculator, set your current city and destination. Use the swap button if needed; the current city is the base for the percentage difference.</p></article>
            <article><div className="home-method-card-top"><span>02</span><Users aria-hidden="true" /></div><h3>Set your household</h3><p>Choose one person, a couple or a family of four. The same household multiplier applies to both cities.</p></article>
            <article><div className="home-method-card-top"><span>03</span><SlidersHorizontal aria-hidden="true" /></div><h3>Choose a lifestyle</h3><p>Use lean, balanced or comfortable to scale the budget. These are broad spending presets, not individual rent or shopping inputs.</p></article>
            <article><div className="home-method-card-top"><span>04</span><Receipt aria-hidden="true" /></div><h3>Read the breakdown</h3><p>Compare monthly totals, the percentage change and each expense category. Look for the largest differences in dollars.</p></article>
            <article><div className="home-method-card-top"><span>05</span><Banknote aria-hidden="true" /></div><h3>Compare take-home pay</h3><p>Enter monthly income after tax in USD to see an equivalent income estimate. Review taxes and employer benefits separately.</p></article>
            <article><div className="home-method-card-top"><span>06</span><ShieldCheck aria-hidden="true" /></div><h3>Check local prices</h3><p>Use current rent, transport and healthcare quotes in your own budget. Add childcare, savings and moving costs where needed.</p></article>
          </div>
          <Link className="text-link" href="/guides/how-to-compare-cost-of-living">Read the cost-of-living comparison guide →</Link>

          <aside className="home-income-example" aria-labelledby="home-salary-example-title">
            <div><p className="eyebrow">Worked salary example</p><h3 id="home-salary-example-title">What would {money.format(salaryExample.income)} in {salaryExample.from.city} mean in {salaryExample.to.city}?</h3><p>For one person with a balanced lifestyle, our model estimates {money.format(exampleFromBudget)} a month in {salaryExample.from.city} and {money.format(exampleToBudget)} in {salaryExample.to.city}. Applying that budget ratio gives an equivalent take-home income of about <strong>{money.format(exampleEquivalent)} a month</strong> in {salaryExample.to.city}.</p></div>
            <div className="home-salary-calculation"><span>Current net income × destination budget ÷ current budget</span><p>{money.format(salaryExample.income)} × {money.format(exampleToBudget)} ÷ {money.format(exampleFromBudget)} ≈ <strong>{money.format(exampleEquivalent)}</strong></p><small>USD per month, rounded to the nearest $10. This scales income with modeled costs; it does not preserve a fixed savings amount or calculate gross pay.</small><Link href="/salary-comparison">Calculate your equivalent take-home pay <ArrowRight aria-hidden="true" /></Link></div>
          </aside>
        </div>
      </section>

      <section className="home-relocation-section" aria-labelledby="home-relocation-title">
        <div className="page-shell home-relocation-layout">
          <header className="home-relocation-heading">
            <div><p className="eyebrow">Beyond the monthly estimate</p><h2 id="home-relocation-title">Is a cheaper city a better financial move?</h2></div>
            <p>Lower living costs can help, but the decision also depends on take-home pay, benefits and the cash needed to relocate. Build your plan in three parts.</p>
          </header>
          <div className="home-relocation-ledger">
            <article>
              <span>01 · Monthly</span>
              <h3>Recurring living costs</h3>
              <p>Start with the city estimate, then add the commitments specific to your household.</p>
              <ul><li>Housing, utilities, food and transport</li><li>Healthcare, personal care and leisure</li><li>Childcare and education, if needed</li><li>Debt payments and a savings target</li></ul>
              <Link href="/compare-cities">Compare monthly costs <ArrowRight aria-hidden="true" /></Link>
            </article>
            <article>
              <span>02 · One time</span>
              <h3>Moving and setup costs</h3>
              <p>Keep these one-time expenses separate from the recurring city budget.</p>
              <ul><li>Deposits and application fees</li><li>Travel, shipping and temporary housing</li><li>Visas, permits and registrations</li><li>Furniture, equipment and connection fees</li></ul>
              <Link href="/guides/how-to-compare-cost-of-living">Plan your relocation budget <ArrowRight aria-hidden="true" /></Link>
            </article>
            <article>
              <span>03 · Income</span>
              <h3>Take-home pay and benefits</h3>
              <p>Compare the income you can spend and the benefits you would keep or lose.</p>
              <ul><li>Net salary after tax and deductions</li><li>Health, pension and employer benefits</li><li>Bonuses, equity and variable income</li><li>Savings target and emergency margin</li></ul>
              <Link href="/salary-comparison">Estimate equivalent salary <ArrowRight aria-hidden="true" /></Link>
            </article>
          </div>
          <div className="home-relocation-rule"><strong>Check what you would have left.</strong><p>Subtract your own expected monthly expenses from take-home income in each city. Compare the remaining amount with your savings goal, and budget separately for the move. A lower city total alone does not tell you whether you will be better off.</p></div>
        </div>
      </section>

      <section className="home-guides-section">
        <div className="page-shell home-guides-grid">
          <header><p className="eyebrow">Relocation and salary guides</p><h2>Make sense of your comparison.</h2><p>Learn how to check a city budget, estimate salary needs and understand the difference between living costs and local pay.</p></header>
          <div>
            <Link href="/guides/how-to-compare-cost-of-living">
              <Image className="home-guide-image" src="/images/guides/compare-cost-of-living.jpg" alt="" width={1536} height={1024} />
              <div className="home-guide-copy"><span>01 · Monthly budget</span><h3>How to compare cost of living between cities</h3><p>Match your assumptions, interpret the percentage difference and check the largest expenses.</p><b>Read comparison guide →</b></div>
            </Link>
            <Link href="/guides/equivalent-salary-for-relocation">
              <Image className="home-guide-image" src="/images/guides/equivalent-salary-relocation.jpg" alt="" width={1536} height={1024} />
              <div className="home-guide-copy"><span>02 · Take-home pay</span><h3>How to calculate equivalent salary after moving</h3><p>Compare spending power, review benefits and make room for savings and relocation costs.</p><b>Read salary guide →</b></div>
            </Link>
            <Link href="/guides/cost-of-living-vs-cost-of-labor">
              <Image className="home-guide-image" src="/images/guides/cost-of-living-vs-labor.jpg" alt="" width={1536} height={1024} />
              <div className="home-guide-copy"><span>03 · Job offers</span><h3>Cost of living versus cost of labor</h3><p>Understand why a higher household budget does not guarantee higher pay for your role.</p><b>Read compensation guide →</b></div>
            </Link>
          </div>
        </div>
      </section>

      <section className="home-transparency-section">
        <div className="page-shell home-transparency-grid">
          <header><h2>Where the estimates come from.</h2></header>
          <div className="home-transparency-body">
            <div className="home-transparency-commitments">
              <article><span>01</span><div><h3>Modeled planning estimates</h3><p>Living Cost Comparison maintains rounded USD-equivalent budgets. These are broad city estimates, not live prices or quotes for your household.</p></div></article>
              <article><span>02</span><div><h3>{dataEdition} edition</h3><p>This identifies the current model edition. Individual values do not yet include provider-level citations, local observation dates or live exchange-rate timestamps.</p></div></article>
              <article><span>03</span><div><h3>Shared assumptions</h3><p>Household and lifestyle presets scale the same basket. The expanded category view separates bundled spending without changing the city total.</p></div></article>
            </div>
            <nav aria-label="About the estimates"><Link href="/methodology">Read the calculation methodology <ArrowRight aria-hidden="true" /></Link><Link href="/about">About Living Cost Comparison <ArrowRight aria-hidden="true" /></Link></nav>
          </div>
        </div>
      </section>

      <section className="home-faq-section"><div className="page-shell home-faq-layout"><header className="home-section-intro home-faq-heading"><p className="eyebrow">Frequently asked questions</p><h2>Cost-of-living comparison questions, answered.</h2></header><AnimatedFaqList className="home-faq-list" iconElement="i" items={faqs} /></div></section>

      <section className="home-final-cta"><div className="page-shell"><span>Your next move starts here</span><div><p className="eyebrow">Plan with a clearer budget</p><h2>See what your next city could cost.</h2></div><Link href="/compare-cities#compare">Compare two cities <ArrowRight aria-hidden="true" /></Link></div></section>
      <SiteFooter />
    </main>
  )
}
