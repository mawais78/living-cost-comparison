export type ResearchSource = {
  id: string
  publisher: string
  title: string
  url: string
  scope: string
  use: string
  caution: string
}

export const researchUpdated = "22 September 2026"

export const researchSources: ResearchSource[] = [
  {
    id: "world-bank-icp",
    publisher: "World Bank",
    title: "International Comparison Program: concepts, methods and FAQ",
    url: "https://www.worldbank.org/en/programs/icp/faq",
    scope: "Country-level purchasing power parities and price-level indexes for international comparison.",
    use: "Defines how spatial price comparison differs from currency conversion and inflation.",
    caution: "ICP results are national annual averages, not city budgets or current retail quotes.",
  },
  {
    id: "eurostat-ppp",
    publisher: "Eurostat",
    title: "Purchasing power parities and comparative price levels",
    url: "https://ec.europa.eu/eurostat/en/web/purchasing-power-parities/information-data",
    scope: "Annual PPPs, price-level indexes and expenditure groups for European countries.",
    use: "Cross-checks country-level price relationships and category definitions in Europe.",
    caution: "Country-level results cannot be relabeled as city-level observations.",
  },
  {
    id: "bea-rpp",
    publisher: "US Bureau of Economic Analysis",
    title: "Regional Price Parities by state and metropolitan area",
    url: "https://www.bea.gov/data/prices-inflation/regional-price-parities-state-and-metro-area",
    scope: "Annual relative price levels for US states and metropolitan areas, with the United States equal to 100.",
    use: "Authoritative US spatial price-level benchmark and a model for explaining reference indexes.",
    caution: "Metropolitan estimates do not describe every neighborhood and are not monthly budgets.",
  },
  {
    id: "bls-ce",
    publisher: "US Bureau of Labor Statistics",
    title: "Consumer Expenditures — 2024",
    url: "https://www.bls.gov/opub/reports/consumer-expenditures/2024/home.htm",
    scope: "US household expenditure levels and shares by major spending category.",
    use: "Shows why household composition and category weights matter when building a budget.",
    caution: "US average expenditure shares are context, not a universal global basket.",
  },
  {
    id: "oecd-taxing-wages",
    publisher: "OECD",
    title: "Taxing Wages 2026",
    url: "https://www.oecd.org/en/publications/taxing-wages-2026_3a5169ef-en.html",
    scope: "Comparable tax-wedge and take-home-pay measures for defined household cases across OECD countries.",
    use: "Supports the separation of gross salary, employee tax, cash benefits and take-home income.",
    caution: "A representative tax case cannot replace an individual tax calculation.",
  },
  {
    id: "ons-household-costs",
    publisher: "UK Office for National Statistics",
    title: "Calculating the Household Costs Indices",
    url: "https://www.ons.gov.uk/economy/inflationandpriceindices/methodologies/calculatingthehouseholdcostsindices/pdf",
    scope: "Methods for measuring how different UK household groups experience changing costs.",
    use: "Evidence that expenditure weights and household characteristics change the inflation experience.",
    caution: "The index measures change through time in the UK, not price differences between global cities.",
  },
  {
    id: "mit-living-wage",
    publisher: "MIT Living Wage Calculator",
    title: "Living Wage Calculator methodology",
    url: "https://livingwage.mit.edu/pages/methodology",
    scope: "Basic-needs budgets for multiple family types across US counties, metros and states.",
    use: "A benchmark for explicit household archetypes and the distinction between basic needs and an average lifestyle.",
    caution: "US-only living-wage estimates are not international cost-of-living indexes.",
  },
  {
    id: "bls-ecec",
    publisher: "US Bureau of Labor Statistics",
    title: "Employer Costs for Employee Compensation methodology",
    url: "https://www.bls.gov/opub/hom/ecec/calculation.htm",
    scope: "Employer costs for wages, salaries and employee benefits per hour worked.",
    use: "Clarifies that the cost of employing labor includes compensation and benefits, not a worker's household budget.",
    caution: "The series describes US employer costs and should not be used as a global salary-equivalence index.",
  },
]

export const sourceById = Object.fromEntries(researchSources.map((source) => [source.id, source])) as Record<string, ResearchSource>
