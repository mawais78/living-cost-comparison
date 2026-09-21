import type { Metadata } from "next"

import { BrandDirectionGrid } from "@/components/brand-direction-grid"

export const metadata: Metadata = {
  title: "Choose a Brand Direction",
  robots: { index: false, follow: false },
}

export default function BrandPage() {
  return <BrandDirectionGrid />
}
