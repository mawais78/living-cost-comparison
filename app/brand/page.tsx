import type { Metadata } from "next"

import { LogoMark } from "@/components/brand-logo"
import { SiteHeader } from "@/components/site-header"

export const metadata: Metadata = {
  title: "Brand Kit",
  robots: { index: false, follow: false },
}

const colours = [
  ["Ledger Ink", "#142B3D", "Primary text, dark fields and reversed surfaces"],
  ["Signal Blue", "#2F5BFF", "Actions, origin data and active states"],
  ["Compare Gold", "#E5A82A", "Destination data and meaningful differences"],
  ["Paper", "#F4F6F8", "Page background and quiet separation"],
  ["Rule", "#D7DEE5", "Dividers, tables and control boundaries"],
  ["White", "#FFFFFF", "Working surfaces and negative space"],
]

export default function BrandPage() {
  return (
    <main className="brand-kit-page">
      <SiteHeader />
      <section className="page-shell brand-kit-header">
        <div>
          <p className="eyebrow text-[var(--brand-blue)]">Living Cost Comparison</p>
          <h1>Brand system</h1>
        </div>
        <p>Version 1.0 · September 2026</p>
      </section>

      <section className="page-shell brand-kit-section">
        <div className="brand-section-heading"><span>01</span><div><h2>Logo</h2><p>The brackets represent two places held to the same standard. The two centre bars express comparison without implying that every outcome is equal.</p></div></div>
        <div className="logo-showcase">
          <div className="logo-tile light"><LogoMark className="brand-display-mark" /><p>Primary mark</p></div>
          <div className="logo-tile dark"><LogoMark reversed className="brand-display-mark" /><p>Reversed mark</p></div>
          <div className="logo-clearspace"><div className="clearspace-box"><LogoMark className="brand-display-mark" /></div><p>Minimum clear space equals the width of one centre bar.</p></div>
        </div>
        <div className="asset-links"><a href="/brand/logo-mark.svg" download>Download primary SVG</a><a href="/brand/logo-mark-reversed.svg" download>Download reversed SVG</a><a href="/brand/logo-lockup.svg" download>Download lockup SVG</a></div>
      </section>

      <section className="page-shell brand-kit-section">
        <div className="brand-section-heading"><span>02</span><div><h2>Colour</h2><p>A narrow palette keeps comparison states consistent across charts, controls and editorial pages.</p></div></div>
        <div className="colour-grid">
          {colours.map(([name, hex, use]) => <article key={name}><div className="colour-swatch" style={{ background: hex }} /><h3>{name}</h3><code>{hex}</code><p>{use}</p></article>)}
        </div>
      </section>

      <section className="page-shell brand-kit-section">
        <div className="brand-section-heading"><span>03</span><div><h2>Typography</h2><p>One neutral grotesk family carries both editorial copy and interface controls. Tabular figures use the system mono stack.</p></div></div>
        <div className="type-specimens">
          <div><span>Display / 52</span><p className="type-display">Compare the real cost of living.</p></div>
          <div><span>Heading / 28</span><p className="type-heading">Monthly cost breakdown</p></div>
          <div><span>Body / 16</span><p className="type-body">Clear explanations should feel calm, exact and easy to verify.</p></div>
          <div><span>Data / 14 mono</span><p className="type-data">USD 4,000 · SEP 2026</p></div>
        </div>
      </section>

      <section className="page-shell brand-kit-section last">
        <div className="brand-section-heading"><span>04</span><div><h2>Interface rules</h2><p>The interface should feel measured and editorial—not decorative, bubbly or assistant-like.</p></div></div>
        <div className="rules-grid"><div><strong>Use</strong><p>8-point spacing, square data panels, one-pixel rules, left-aligned labels and direct language.</p></div><div><strong>Avoid</strong><p>Decorative gradients, oversized slogans, glass effects, floating pills, excessive icons and invented precision.</p></div></div>
      </section>
    </main>
  )
}
