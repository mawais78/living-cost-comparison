# Content cluster 01 — publication map

**Implemented:** 22 September 2026  
**Scope:** Nine indexable pages, one prototype explorer and two protected programmatic templates.  
**Rule:** Index only pages that answer a distinct search intent and whose claims can be traced to the source register.

## Indexable pages

| URL | Primary intent | Primary topic phrase | Page job | Research basis |
| --- | --- | --- | --- | --- |
| `/` | Broad comparison | cost of living comparison | Introduce the decision model and route users to the correct tool or guide | BLS expenditure shares plus the published methodology |
| `/compare-cities` | Tool | compare cost of living between cities | Run a like-for-like city comparison and teach users how to interpret it | World Bank ICP, BEA RPP, BLS CE, ONS household-cost methods |
| `/salary-comparison` | Tool | equivalent salary calculator | Estimate spending-equivalent take-home pay and audit the rest of an offer | OECD Taxing Wages, BLS employer compensation, MIT Living Wage |
| `/guides/how-to-compare-cost-of-living` | Informational | how to compare cost of living | Give a complete seven-step comparison method, category checklist and index math | World Bank ICP, Eurostat PPP, BEA RPP, BLS CE, ONS HCI |
| `/guides/equivalent-salary-for-relocation` | Informational/commercial | equivalent salary after moving | Explain net targets, disposable margin, benefits and one-time costs | OECD Taxing Wages, BLS ECEC/CE, MIT Living Wage |
| `/guides/cost-of-living-vs-cost-of-labor` | Informational | cost of living vs cost of labor | Separate household costs from employer compensation and market pay | BLS ECEC, OECD Taxing Wages, WorldatWork as secondary context |
| `/methodology` | Trust/method | cost of living methodology | Define basket, calculation, geography, confidence and indexation rules | All primary institutional references |
| `/sources` | Trust/source | cost of living data sources | Publish source scope, use and limitations | Direct institutional source pages |
| `/about` | Trust/entity | about Living Cost Comparison | Explain purpose, editorial standards and current release status | First-party editorial policy |

## Available but not indexable yet

| URL/template | Status | Reason | Requirement to index |
| --- | --- | --- | --- |
| `/cost-of-living-index` | `noindex, follow` | Current six-city figures are illustrative | Production city observations, coverage/confidence records and a defensible reference basket |
| `/compare/[pair]` | `noindex, follow` | Pair conclusions are computed from prototype values | Canonical pair data passes the methodology publication gate |
| `/cost-of-living/[country]/[city]` | `noindex, follow` | City budgets do not yet have source-level evidence | Native-currency observations, geography, period, sources and category confidence |
| `/brand` | `noindex, nofollow` | Internal brand reference, not user search content | Never intended for search |

## Internal-link design

- Homepage links to both tools, all three guides, methodology, sources and about.
- Tool pages link to the guide that explains how to use the result.
- Every guide links to a relevant tool, methodology and cited primary sources.
- Methodology links to the complete source register.
- Footer exposes product, standards and research-guide clusters through crawlable anchors.
- Prototype pages remain followable so people and crawlers can reach the publication-ready pages.

## On-page requirements applied

- Unique title, description, canonical URL and H1 by intent.
- Direct answer before deep explanation on guides and tools.
- Visible reviewed/status information on research-sensitive pages.
- Article, WebApplication, WebSite, AboutPage, CollectionPage, FAQ and breadcrumb structured data only where it matches visible content.
- No Dataset structured data for prototype values.
- One XML sitemap containing only canonical pages intended for search.
- Explicit `noindex` for prototype or internal pages.
- Research citations link to originating institutions and state material limitations.
- Normal crawlable internal links with descriptive anchor text.

## Next content gate

Do not add another city page simply to increase the URL count. The next batch should begin only after one of these conditions is met:

1. Production data is ready for the first 5–10 city entities, including licences and observation records; or
2. Search Console data from this cluster identifies a high-value explanatory intent that the current guides do not answer.

When production city data is ready, the first page batch should contain a focused relocation corridor and its canonical comparisons, not unrelated global cities.
