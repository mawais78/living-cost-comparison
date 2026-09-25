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
            <Link href="/compare-cities">Compare cities</Link>
            <Link href="/salary-comparison">Salary calculator</Link>
            <Link href="/cost-of-living-index">Cost of living index</Link>
          </div>
        </div>
        <div>
          <p className="footer-label">About</p>
          <div className="footer-links">
            <Link href="/methodology">Methodology</Link>
            <Link href="/about">About Living Cost Comparison</Link>
            <Link href="/guides">Guides</Link>
          </div>
        </div>
        <div>
          <p className="footer-label">Research guides</p>
          <div className="footer-links">
            <Link href="/guides">All guides</Link>
            <Link href="/guides/how-to-compare-cost-of-living">How to compare living costs</Link>
            <Link href="/guides/equivalent-salary-for-relocation">Equivalent salary after moving</Link>
            <Link href="/guides/cost-of-living-vs-cost-of-labor">Cost of living vs cost of labor</Link>
          </div>
        </div>
      </div>
      <div className="page-shell footer-base"><span>© 2026 Living Cost Comparison</span><span>Cost estimates updated September 2026</span></div>
    </footer>
  )
}
