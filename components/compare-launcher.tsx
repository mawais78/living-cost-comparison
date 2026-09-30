"use client"

import { useState } from "react"
import Link from "next/link"

import { CityCombobox } from "@/components/city-combobox"
import { dataEdition, defaultComparison, getCanonicalComparisonPath } from "@/lib/cost-data"

export function CompareLauncher() {
  const [from, setFrom] = useState(defaultComparison.from)
  const [to, setTo] = useState(defaultComparison.to)

  return (
    <div className="home-launcher" aria-label="Start a city comparison">
      <div className="home-launcher-head"><span>Start your comparison</span><strong>Where could you live next?</strong></div>
      <CityCombobox label="First city" value={from} onValueChange={setFrom} disabledSlug={to} variant="launcher" />
      <CityCombobox label="Second city" value={to} onValueChange={setTo} disabledSlug={from} variant="launcher" />
      <Link href={getCanonicalComparisonPath(from, to)} prefetch={false}>Compare living costs <span>→</span></Link>
      <p>{dataEdition} model edition · Monthly USD-equivalent estimates, including housing. Check current local prices before setting your budget.</p>
    </div>
  )
}
