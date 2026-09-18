import Link from "next/link"
import { ArrowUpRight } from "lucide-react"

export function BrandMark() {
  return <span className="brand-mark" aria-hidden="true"><span /><span /><span /></span>
}

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="page-shell flex h-16 items-center justify-between gap-6">
        <Link href="/" className="flex items-center gap-2.5" aria-label="Living Cost Comparison home">
          <BrandMark />
          <span className="text-[15px] font-bold tracking-[-0.02em] text-[var(--ink)]">Living Cost <span className="hidden sm:inline">Comparison</span></span>
        </Link>
        <nav className="hidden items-center gap-7 text-sm font-medium text-[var(--muted-ink)] md:flex" aria-label="Primary navigation">
          <Link href="/#compare" className="nav-link">Compare cities</Link>
          <Link href="/cost-of-living/united-kingdom/london" className="nav-link">City guides</Link>
          <Link href="/methodology" className="nav-link">Methodology</Link>
        </nav>
        <Link href="/#compare" className="header-cta">Start comparing <ArrowUpRight className="size-3.5" /></Link>
      </div>
    </header>
  )
}
