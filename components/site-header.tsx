"use client"

import Link from "next/link"
import { Menu, X } from "lucide-react"
import { usePathname } from "next/navigation"

import { BrandLogo } from "@/components/brand-logo"

const navigation = [
  { href: "/compare-cities", label: "Compare" },
  { href: "/salary-comparison", label: "Salary" },
  { href: "/cost-of-living-index", label: "City index" },
  { href: "/guides/how-to-compare-cost-of-living", label: "Guides" },
  { href: "/methodology", label: "Data" },
]

export function SiteHeader() {
  const pathname = usePathname()
  const isActive = (href: string) => pathname === href || (href === "/compare-cities" && pathname.startsWith("/compare/")) || (href.startsWith("/guides/") && pathname.startsWith("/guides/"))

  return (
    <header className="site-header">
      <div className="page-shell site-header-inner">
        <BrandLogo />
        <nav className="primary-nav" aria-label="Primary navigation">
          {navigation.map((item) => <Link key={item.href} href={item.href} className={isActive(item.href) ? "active" : undefined} aria-current={isActive(item.href) ? "page" : undefined}>{item.label}</Link>)}
        </nav>
        <Link href="/compare-cities#compare" className="header-action">Start comparing</Link>
        <details className="mobile-nav">
          <summary aria-label="Toggle navigation menu">
            <Menu className="mobile-menu-open" aria-hidden="true" />
            <X className="mobile-menu-close" aria-hidden="true" />
          </summary>
          <div className="mobile-nav-panel">
            {navigation.map((item) => <Link key={item.href} href={item.href} className={isActive(item.href) ? "active" : undefined} aria-current={isActive(item.href) ? "page" : undefined}>{item.label}</Link>)}
            <Link href="/compare-cities#compare" className="mobile-nav-action">Start comparing</Link>
          </div>
        </details>
      </div>
    </header>
  )
}
