"use client"

import { useState } from "react"
import Link from "next/link"

import { cities, defaultComparison, getCanonicalComparisonPath, getCityLocation } from "@/lib/cost-data"

const cityOptions = [...cities].sort((first, second) => first.city.localeCompare(second.city))

export function CompareLauncher() {
  const [from, setFrom] = useState(defaultComparison.from)
  const [to, setTo] = useState(defaultComparison.to)

  return (
    <div className="home-launcher" aria-label="Start a city comparison">
      <div className="home-launcher-head"><span>Start here</span><strong>Pick two cities</strong></div>
      <label>
        <span>Where you live</span>
        <select value={from} onChange={(event) => setFrom(event.target.value)}>
          {cityOptions.map((city) => <option key={city.slug} value={city.slug} disabled={city.slug === to}>{getCityLocation(city)}</option>)}
        </select>
      </label>
      <label>
        <span>Where you are considering</span>
        <select value={to} onChange={(event) => setTo(event.target.value)}>
          {cityOptions.map((city) => <option key={city.slug} value={city.slug} disabled={city.slug === from}>{getCityLocation(city)}</option>)}
        </select>
      </label>
      <Link href={getCanonicalComparisonPath(from, to)} prefetch={false}>Compare these cities <span>→</span></Link>
      <p>{cities.length} cities available · Organized by city and country · USD-equivalent estimates</p>
    </div>
  )
}
