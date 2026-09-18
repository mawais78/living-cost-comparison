import Link from "next/link"

import { BrandLogo } from "@/components/brand-logo"

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="page-shell footer-grid">
        <div className="footer-brand">
          <BrandLogo reversed />
          <p>Independent tools for comparing city costs, salaries and monthly budgets.</p>
        </div>
        <div>
          <p className="footer-label">Product</p>
          <div className="footer-links">
            <Link href="/#compare">Compare cities</Link>
            <Link href="/compare/london-vs-amsterdam">London vs Amsterdam</Link>
            <Link href="/cost-of-living/united-kingdom/london">London cost guide</Link>
          </div>
        </div>
        <div>
          <p className="footer-label">Standards</p>
          <div className="footer-links">
            <Link href="/methodology">Methodology</Link>
            <Link href="/methodology#sources">Sources &amp; freshness</Link>
            <span>Prototype data · Sep 2026</span>
          </div>
        </div>
      </div>
      <div className="page-shell footer-base"><span>© 2026 Living Cost Comparison</span><span>livingcostcomparison.com</span></div>
    </footer>
  )
}
