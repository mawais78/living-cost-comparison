import Link from "next/link"
import { BrandMark } from "@/components/site-header"

export function SiteFooter() {
  return (
    <footer className="border-t border-[var(--line)] bg-white">
      <div className="page-shell grid gap-10 py-12 md:grid-cols-[1.5fr_1fr_1fr]">
        <div>
          <div className="flex items-center gap-2.5 font-bold text-[var(--ink)]"><BrandMark /> Living Cost Comparison</div>
          <p className="mt-4 max-w-sm text-sm leading-6 text-[var(--muted-ink)]">A clearer way to compare cities, translate salaries and plan the life behind the numbers.</p>
        </div>
        <div>
          <p className="footer-label">Explore</p>
          <div className="mt-4 grid gap-3 text-sm text-[var(--muted-ink)]"><Link href="/#compare">Compare cities</Link><Link href="/compare/london-vs-amsterdam">London vs Amsterdam</Link><Link href="/cost-of-living/united-kingdom/london">London cost guide</Link></div>
        </div>
        <div>
          <p className="footer-label">Our data</p>
          <div className="mt-4 grid gap-3 text-sm text-[var(--muted-ink)]"><Link href="/methodology">Methodology</Link><Link href="/methodology#sources">Sources & freshness</Link><span>Prototype data · Sep 2026</span></div>
        </div>
      </div>
    </footer>
  )
}
