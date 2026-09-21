# Living Cost Comparison — logo generation brand kit

_Direction: Quiet Measure · Based on the live website palette and interface on 21 September 2026._

## Brand in one sentence

Living Cost Comparison is a calm, evidence-led planning tool that helps people compare two places on equal terms before a move or salary decision.

## Brand character

- **Calm, not cold.** Important financial decisions without urgency, hype or fear.
- **Credible, not institutional.** Structured and transparent, but still approachable.
- **Practical, not aspirational.** Focused on usable numbers rather than lifestyle fantasy.
- **Global, not location-specific.** The identity must work for any city, country or currency.
- **Precise, not technical.** Clear enough for everyday planning and rigorous enough for data.

Core attributes: **grounded · clear · measured · independent · useful**

## Colour system

The live site is a low-saturation green-and-ivory system. Warm neutrals carry most of the interface; green is used as a confidence signal rather than a loud promotional colour.

| Token | Hex | RGB | Role |
| --- | --- | --- | --- |
| Pine Ink | `#27302C` | `39, 48, 44` | Wordmark, primary text, dark surfaces, strongest logo colour |
| Forest Measure | `#405C50` | `64, 92, 80` | Brand accent, actions, labels, comparison emphasis |
| Muted Sage | `#89978F` | `137, 151, 143` | Secondary logo detail and decorative support only |
| Paper | `#F6F5F0` | `246, 245, 240` | Main warm background |
| Porcelain | `#FFFEFA` | `255, 254, 250` | Cards, clean logo ground, high-clarity surfaces |
| Warm Field | `#F3F1EB` | `243, 241, 235` | Hero and editorial section background |
| Mist | `#E9EDE9` | `233, 237, 233` | Soft data and comparison section background |
| Soft Rule | `#DEDFD9` | `222, 223, 217` | Dividers and control boundaries |
| Muted Ink | `#68716C` | `104, 113, 108` | Supporting copy and metadata |

### Recommended balance

- 60% warm neutrals: Paper, Porcelain and Warm Field
- 25% Pine Ink
- 10% Forest Measure
- 5% Muted Sage or Mist

The approved primary logo uses a restrained tonal gradient inside the stepped forms, Pine Ink for the wordmark and Muted Sage for the shared baseline. Solid one-colour versions remain mandatory for small, print and accessibility-sensitive uses.

### Contrast guardrails

- Pine Ink on Paper: `12.45:1` — excellent for all text and marks.
- Forest Measure on Paper: `6.72:1` — accessible for normal text.
- White on Forest Measure: `7.33:1` — excellent reversed combination.
- Muted Ink on Paper: `4.62:1` — acceptable for normal body copy.
- Muted Sage on Paper: `2.79:1` — decorative only; do not use for small text or fine logo details.

## Typography

### Primary family

Use **Inter** or a closely related humanist sans-serif. The current website relies on a clean sans with open counters, restrained curves and medium-to-semibold weights.

- Wordmark: Inter SemiBold or a lightly customized equivalent, `600–650` weight.
- Headlines: Inter Medium/SemiBold with tight tracking.
- Body and interface: Inter Regular/Medium.
- Data only: SFMono-Regular, Consolas or another neutral monospace.

The logo wordmark should read exactly **Living Cost Comparison** in title case. A two-line lockup may break after “Cost.” Do not use a tagline in the primary logo.

## Logo strategy

### Recommended concept: Shared Baseline

Create a compact abstract mark from **two distinct vertical measures resting on one shared horizontal baseline**. The two forms represent two cities; the common line represents the same measurement standard. Difference in height communicates comparison without judging one place as better.

The symbol should feel like a proprietary sign first and a data metaphor second. It may subtly suggest buildings or columns, but it must not become a literal skyline or conventional bar-chart icon.

### Geometry

- Simple, balanced construction with two vertical forms and one shared ground line.
- Slightly rounded corners that match the website’s calm 9–16px corner language.
- Moderate stroke or solid-form weight; no hairlines.
- Work inside a square or near-square footprint.
- Preserve recognizability at `16px` and in one colour.
- Avoid perfect bilateral symmetry; the differing measures are part of the meaning.

### Desired visual tone

- Quiet confidence
- Contemporary editorial utility
- Human, stable and globally neutral
- Flat, vector-like and easy to reproduce
- Distinctive enough to register as an app icon or favicon

### Avoid

- Currency symbols, coins, wallets, piggy banks or bank imagery
- Scales of justice or literal weighing scales
- Houses, detailed skylines, globes, maps or location pins
- Calculator buttons or a conventional chart with axes
- Arrows as the dominant idea
- Eco/leaf symbolism; the green means calm stability, not sustainability
- High-contrast or multicolour gradients, shadows, glass, 3D, metallic finishes or neon
- Luxury serif styling, mascots, clip art or generic fintech blue

## Required logo system

Ask for these deliverables from the final direction:

1. Primary horizontal lockup: symbol plus wordmark.
2. Stacked lockup for square placements.
3. Symbol-only app icon and favicon.
4. One-colour Pine Ink version.
5. Reversed white/Porcelain version for Pine Ink backgrounds.
6. Black-only version for documents and stamps.
7. Vector master (`SVG` or `PDF`) plus transparent `PNG` exports.

### Production assets

- `public/brand/logo-lockup.png` — lossless crop of the approved supplied PNG; this is the exact website lockup.
- `public/brand/logo-monogram.png` — lossless crop of the original stepped symbol for compact placements.
- `public/favicon-16x16.png`, `public/favicon-32x32.png` — PNG browser icons derived from the original symbol without changing its proportions.
- `public/apple-touch-icon.png`, `public/icon-192.png`, `public/icon-512.png` — PNG device and install icons.
- `public/site.webmanifest` — install metadata and icon registration.

The website renders the PNG lockup directly with its native `1444:426` aspect ratio. The dark-footer treatment uses a CSS colour filter on that same PNG, preserving the original silhouette and proportions. SVG construction studies remain in the brand folder for reference but are not loaded as the website logo.

Minimum acceptance checks:

- The symbol is clear at `16px`, `24px` and `32px`.
- It remains identifiable in one colour.
- The wordmark stays legible at `120px` total lockup width.
- No element depends on Muted Sage for contrast.
- The symbol feels equally relevant to London, Karachi, Amsterdam or any future city.

## Copy-ready generation prompt

> Design a refined, minimal logo for **Living Cost Comparison**, a global web tool that helps people compare city living costs, monthly budgets and equivalent salaries before a move. The brand should feel calm, credible, independent, practical and data-informed—never flashy or corporate. Create a proprietary abstract symbol based on **two distinct stepped measures resting on one shared horizontal baseline**, representing two cities compared with the same standard. The forms may subtly suggest columns or buildings, but should not look like a conventional bar chart or skyline. Use simple balanced geometry, substantial weight and softly rounded corners. Build both a compact square symbol and a horizontal lockup with the exact wordmark **Living Cost Comparison** in a bold humanist sans-serif similar to Inter ExtraBold. Use deep Pine Ink `#27302C` for the wordmark, a restrained tonal Forest Measure gradient around `#405C50` for the stepped forms and Muted Sage `#89978F` for the baseline. The gradient must remain subtle and confined to the mark. The logo must stay distinctive at favicon size and work in full colour, one colour, black and reversed white. No tagline.

### Negative prompt

> No currency signs, coins, wallets, piggy banks, justice scales, literal weighing scales, houses, detailed skylines, globe, map pin, calculator, chart axes, dominant arrows, leaf or eco icon, rainbow or high-contrast multicolour gradient, shadow, glass, 3D, metallic effect, neon, luxury serif, mascot, clip art or generic blue-fintech styling. Do not add a slogan. Do not misspell or shorten the name.

## Generator workflow

1. Generate symbol-only concepts first in black and white.
2. Select the strongest silhouette at `24px` before judging colour.
3. Generate the horizontal and stacked wordmark lockups from that one symbol.
4. Apply Pine Ink and Forest Measure only after the geometry is approved.
5. Redraw the chosen result as clean vector paths; AI output should be treated as concept art, not final production artwork.

## Visual reference

Use `public/brand/logo-generation-brand-kit.svg` or its PNG export as the uploadable reference board. The small paired-form diagram is a structural cue, not final logo artwork.
