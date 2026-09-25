import type { Metadata } from "next"
import { ArrowRight } from "lucide-react"
import Link from "next/link"

import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"

export const metadata: Metadata = {
  title: { absolute: "Page Not Found | Living Cost Comparison" },
  description: "The requested Living Cost Comparison page could not be found.",
}

export default function NotFound() {
  return (
    <main className="not-found-page">
      <SiteHeader />
      <section className="not-found-panel">
        <div className="page-shell">
          <p className="eyebrow">404 · Page not found</p>
          <h1>This route does not match a published page.</h1>
          <p>Return to the city comparison, browse the full city index or read a relocation guide.</p>
          <div>
            <Link href="/compare-cities">Compare cities <ArrowRight aria-hidden="true" /></Link>
            <Link href="/cost-of-living-index">Browse city guides</Link>
          </div>
        </div>
      </section>
      <SiteFooter />
    </main>
  )
}
