# Living Cost Comparison — website foundation

## Positioning

Living Cost Comparison is a decision tool for people considering a move, remote-work base or salary offer. Its distinctive promise is to connect city prices to a user’s household, lifestyle and take-home pay—then show the assumptions and evidence behind the answer.

Core message: **Compare the real cost of living.**

## Brand system

- Personality: credible, calm, practical and globally minded.
- Visual idea: a modern civic-data publication—precise, restrained and built on a strict 8-point grid.
- Primary colours: Ledger Ink `#142B3D`, Signal Blue `#2F5BFF`, Compare Gold `#E5A82A`.
- Support colours: Paper `#F4F6F8`, Rule `#D7DEE5`, White `#FFFFFF`.
- Type: Helvetica Neue/system sans-serif throughout, with a system mono stack for figures and dates.
- Logo: balanced brackets hold two comparison bars to the same measurement standard.

## Information architecture

1. `/` — comparison workspace and product explanation.
2. `/compare/[city-a]-vs-[city-b]/` — high-intent comparison template.
3. `/cost-of-living/[country]/[city]/` — city profile template.
4. `/methodology/` — sources, normalization, freshness and editorial policy.
5. Next: `/countries/[country]/`, `/rankings/[topic]/`, `/calculators/salary-equivalent/` and evidence-led guides.

## SEO rules carried into the build

- One primary search intent for every indexable URL.
- Direct answer and useful calculator before long-form copy.
- Unique title, description, canonical URL and structured data by template.
- Visible update date, source state and assumptions.
- Contextual internal links between comparisons, city profiles and methodology.
- Programmatic pages must earn indexation through data depth and genuinely city-specific copy.

## Delivery phases

### Foundation — implemented

- Brand system and responsive component base.
- Working comparison tool with six prototype cities.
- Comparison and city page templates.
- Metadata, sitemap, robots, structured data and internal links.
- Methodology and explicit prototype-data labelling.

### Data beta

- Select production data providers and document licences.
- Build category-level ingestion, currency normalization and anomaly checks.
- Add source, sample-size, freshness and confidence fields to every cost record.
- Launch 20–30 high-confidence city profiles before expanding the index.

### Content growth

- Use Search Console impressions and comparison demand to select new city pairs.
- Add country hubs, salary-equivalence landing pages and rankings only where data is strong.
- Publish evidence-led relocation guides that support, rather than duplicate, calculator pages.

### Trust and monetization

- Add saved comparisons and downloadable moving budgets.
- Test relevant partnerships only after core answers remain complete without them.
- Establish update SLAs and publish material methodology changes.
