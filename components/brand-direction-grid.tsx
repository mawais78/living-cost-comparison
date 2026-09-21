"use client"

import { useState, type CSSProperties, type ReactNode } from "react"
import Link from "next/link"
import { ArrowLeft, Check } from "lucide-react"

type Kit = {
  id: string
  name: string
  descriptor: string
  rationale: string
  headingFont: string
  bodyFont: string
  fontLabel: string
  palette: string[]
  values: string[]
  mark: ReactNode
}

function BracketMark() {
  return <svg viewBox="0 0 48 48" aria-hidden="true"><path d="M18 7H10a3 3 0 0 0-3 3v28a3 3 0 0 0 3 3h8v-6h-5V13h5V7Zm12 0h8a3 3 0 0 1 3 3v28a3 3 0 0 1-3 3h-8v-6h5V13h-5V7Z" fill="currentColor"/><path d="M19 17h10v5H19z" fill="var(--kit-primary)"/><path d="M19 26h10v5H19z" fill="var(--kit-accent)"/></svg>
}

function RouteMark() {
  return <svg viewBox="0 0 48 48" aria-hidden="true"><circle cx="12" cy="32" r="6" fill="var(--kit-primary)"/><circle cx="36" cy="16" r="6" fill="var(--kit-accent)"/><path d="M16.5 28.5 31.5 19.5" stroke="currentColor" strokeWidth="4"/><path d="m27 14 10 1-4 9" fill="none" stroke="currentColor" strokeWidth="3"/></svg>
}

function AxisMark() {
  return <svg viewBox="0 0 48 48" aria-hidden="true"><path d="M8 38V10h6v22h26v6H8Z" fill="currentColor"/><path d="m17 27 7-8 6 5 10-13" fill="none" stroke="var(--kit-primary)" strokeWidth="5" strokeLinejoin="round"/><circle cx="40" cy="11" r="4" fill="var(--kit-accent)"/></svg>
}

function GridMark() {
  return <svg viewBox="0 0 48 48" aria-hidden="true"><rect x="7" y="7" width="14" height="14" rx="2" fill="currentColor"/><rect x="27" y="7" width="14" height="14" rx="2" fill="var(--kit-accent)"/><rect x="7" y="27" width="14" height="14" rx="2" fill="var(--kit-primary)"/><rect x="27" y="27" width="14" height="14" rx="2" fill="currentColor" opacity=".22"/></svg>
}

function BalanceMark() {
  return <svg viewBox="0 0 48 48" aria-hidden="true"><path d="M22 8h4v29h-4z" fill="currentColor"/><path d="M10 14h28v4H10z" fill="currentColor"/><path d="m12 18-6 13h12l-6-13Zm24 0-6 13h12l-6-13Z" fill="var(--kit-primary)"/><path d="M15 37h18v4H15z" fill="var(--kit-accent)"/></svg>
}

const kits: Kit[] = [
  {
    id: "01",
    name: "Ledger",
    descriptor: "Civic data system",
    rationale: "Serious and transparent. Built for a large library of city data, tables and methodology pages.",
    headingFont: '"Helvetica Neue", Helvetica, Arial, sans-serif',
    bodyFont: '"Helvetica Neue", Helvetica, Arial, sans-serif',
    fontLabel: "Helvetica Neue + SF Mono",
    palette: ["#142B3D", "#2F5BFF", "#E5A82A", "#F4F6F8"],
    values: ["institutional", "precise", "scalable"],
    mark: <BracketMark />,
  },
  {
    id: "02",
    name: "Northstar",
    descriptor: "Global mobility guide",
    rationale: "Open and optimistic. A strong fit if the product should feel like guidance for an international move.",
    headingFont: '"Avenir Next", Avenir, "Segoe UI", sans-serif',
    bodyFont: '"Avenir Next", Avenir, "Segoe UI", sans-serif',
    fontLabel: "Avenir Next + system sans",
    palette: ["#0E2A47", "#2477F3", "#20BFA9", "#F3F8FC"],
    values: ["global", "reassuring", "clear"],
    mark: <RouteMark />,
  },
  {
    id: "03",
    name: "Metric",
    descriptor: "Independent research desk",
    rationale: "Direct and high-contrast. Designed to make figures feel decisive without becoming a finance dashboard.",
    headingFont: 'Arial, Helvetica, sans-serif',
    bodyFont: 'Arial, Helvetica, sans-serif',
    fontLabel: "Arial Grotesk + IBM Plex Mono",
    palette: ["#111417", "#FF5A36", "#B8E34B", "#F2F2EE"],
    values: ["direct", "analytical", "bold"],
    mark: <AxisMark />,
  },
  {
    id: "04",
    name: "Latitude",
    descriptor: "Human planning utility",
    rationale: "Calm and contemporary. Balances trustworthy data with a warmer, more approachable moving experience.",
    headingFont: '"Trebuchet MS", "Avenir Next", sans-serif',
    bodyFont: '"Trebuchet MS", "Avenir Next", sans-serif',
    fontLabel: "Trebuchet + system mono",
    palette: ["#103F3B", "#00A884", "#D8F171", "#F1F7F5"],
    values: ["calm", "human", "useful"],
    mark: <GridMark />,
  },
  {
    id: "05",
    name: "Common Ground",
    descriptor: "Editorial comparison guide",
    rationale: "Warm and authoritative. Best if long-form city guides and editorial SEO content will lead the experience.",
    headingFont: 'Georgia, "Times New Roman", serif',
    bodyFont: '"Helvetica Neue", Helvetica, Arial, sans-serif',
    fontLabel: "Georgia + Helvetica Neue",
    palette: ["#27231F", "#C84C2F", "#3856E8", "#FAF5E9"],
    values: ["editorial", "grounded", "distinctive"],
    mark: <BalanceMark />,
  },
]

function BrandKitCard({ kit, selected, onSelect }: { kit: Kit; selected: boolean; onSelect: () => void }) {
  const style = {
    "--kit-ink": kit.palette[0],
    "--kit-primary": kit.palette[1],
    "--kit-accent": kit.palette[2],
    "--kit-paper": kit.palette[3],
    "--kit-heading": kit.headingFont,
    "--kit-body": kit.bodyFont,
  } as CSSProperties

  return (
    <article className={`direction-card${selected ? " selected" : ""}`} style={style}>
      <div className="direction-card-top">
        <div className="direction-mark">{kit.mark}</div>
        <span className="direction-number">Direction {kit.id}</span>
      </div>

      <div className="direction-identity">
        <p className="direction-wordmark">Living Cost<br />Comparison</p>
        <div><p className="direction-name">{kit.name}</p><span>{kit.descriptor}</span></div>
      </div>

      <div className="direction-hero-sample">
        <div>
          <span>London → Amsterdam</span>
          <h2>Know what your salary is worth in another city.</h2>
          <button type="button">Compare costs</button>
        </div>
        <div className="direction-result">
          <span>Monthly estimate</span>
          <strong>$3,420</strong>
          <small>14% less than London</small>
          <div className="direction-bars"><i /><i /></div>
        </div>
      </div>

      <div className="direction-details">
        <div><span className="direction-label">Palette</span><div className="direction-swatches">{kit.palette.map((colour) => <i key={colour} style={{ background: colour }} title={colour} />)}</div></div>
        <div><span className="direction-label">Typography</span><p>{kit.fontLabel}</p></div>
      </div>

      <p className="direction-rationale">{kit.rationale}</p>
      <div className="direction-values">{kit.values.map((value) => <span key={value}>{value}</span>)}</div>
      <button type="button" className="direction-select" onClick={onSelect} aria-pressed={selected}>{selected ? <><Check /> Selected</> : `Select direction ${kit.id}`}</button>
    </article>
  )
}

export function BrandDirectionGrid() {
  const [selected, setSelected] = useState<string | null>("05")
  const active = kits.find((kit) => kit.id === selected)

  return (
    <main className="directions-page">
      <header className="directions-header">
        <div className="directions-shell">
          <Link href="/" className="directions-back"><ArrowLeft /> Back to website</Link>
          <span>Brand direction study · v1</span>
        </div>
      </header>

      <section className="directions-shell directions-intro">
        <p className="directions-kicker">Living Cost Comparison</p>
        <h1>Choose the visual system before we redesign the product.</h1>
        <div className="directions-intro-grid">
          <p>Each direction includes its own logo idea, palette, typography, data treatment and interface sample. The content is identical so you can judge the system—not the copy.</p>
          <div><span>Reference principles</span><strong>Readable type · generous spacing · restrained colour · consistent components</strong></div>
        </div>
      </section>

      {active && <div className="selection-bar"><div className="directions-shell"><span>Selected direction</span><strong>{active.id} — {active.name}</strong><p>Tell me “use {active.id}” and I’ll apply it across the website.</p></div></div>}

      <section className="directions-shell direction-grid" aria-label="Five brand directions">
        {kits.map((kit) => <BrandKitCard key={kit.id} kit={kit} selected={selected === kit.id} onSelect={() => setSelected(kit.id)} />)}
      </section>

      <footer className="directions-footer"><div className="directions-shell"><p>Nothing has been applied to the main UI yet.</p><p>Select one direction, then we will refine and roll it out.</p></div></footer>
    </main>
  )
}
