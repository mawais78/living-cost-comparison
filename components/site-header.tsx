import Link from "next/link"

import { BrandLogo } from "@/components/brand-logo"

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="page-shell site-header-inner">
        <BrandLogo />
        <nav className="primary-nav" aria-label="Primary navigation">
          <Link href="/#compare">Compare</Link>
          <Link href="/cost-of-living/united-kingdom/london">City data</Link>
          <Link href="/methodology">Methodology</Link>
        </nav>
        <Link href="/#compare" className="header-action">Compare cities</Link>
      </div>
    </header>
  )
}
