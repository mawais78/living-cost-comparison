"use client"

import { useState } from "react"
import Link from "next/link"

import { CityCombobox } from "@/components/city-combobox"
import { cities, defaultComparison, getCanonicalComparisonPath } from "@/lib/cost-data"

export function CompareLauncher() {
  const [from, setFrom] = useState(defaultComparison.from)
  const [to, setTo] = useState(defaultComparison.to)

  return (
    <div className="home-launcher" aria-label="Start a city comparison">
      <div className="home-launcher-head"><span>Start here</span><strong>Pick two cities</strong></div>
      <CityCombobox label="Where you live" value={from} onValueChange={setFrom} disabledSlug={to} variant="launcher" />
      <CityCombobox label="Where you are considering" value={to} onValueChange={setTo} disabledSlug={from} variant="launcher" />
      <Link href={getCanonicalComparisonPath(from, to)}>Compare these cities <span>→</span></Link>
      <p>{cities.length} cities available · Search by city or country · USD-equivalent estimates</p>
    </div>
  )
}
