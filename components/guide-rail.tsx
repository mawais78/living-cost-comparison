import Link from "next/link"

const guides = [
  { href: "/guides/how-to-compare-cost-of-living", label: "How to compare cost of living" },
  { href: "/guides/equivalent-salary-for-relocation", label: "Equivalent salary after moving" },
  { href: "/guides/cost-of-living-vs-cost-of-labor", label: "Cost of living vs cost of labor" },
]

export function GuideRail({ current }: { current: string }) {
  return (
    <aside className="guide-rail" aria-label="Related research guides">
      <p className="footer-label">Research series</p>
      {guides.map((guide, index) => (
        <Link key={guide.href} href={guide.href} aria-current={guide.href === current ? "page" : undefined}>
          <span>{String(index + 1).padStart(2, "0")}</span>{guide.label}
        </Link>
      ))}
      <Link href="/methodology"><span>04</span>How the comparison model works</Link>
    </aside>
  )
}
