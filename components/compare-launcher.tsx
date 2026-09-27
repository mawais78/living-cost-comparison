"use client"

import { useState } from "react"
import Link from "next/link"

import { cities, dataEdition, defaultComparison, getCanonicalComparisonPath, getCityLocation } from "@/lib/cost-data"

const cityOptions = [...cities].sort((first, second) => first.city.localeCompare(second.city))

export function CompareLauncher() {
  const [from, setFrom] = useState(defaultComparison.from)
  const [to, setTo] = useState(defaultComparison.to)

  return (
    <div className="home-launcher" aria-label="Start a city comparison">
      <div className="home-launcher-head"><span>Start your comparison</span><strong>Where could you live next?</strong></div>
      <label>
        <span>First city</span>
        <select value={from} onChange={(event) => setFrom(event.target.value)}>
          {cityOptions.map((city) => <option key={city.slug} value={city.slug} disabled={city.slug === to}>{getCityLocation(city)}</option>)}
        </select>
      </label>
      <label>
        <span>Second city</span>
        <select value={to} onChange={(event) => setTo(event.target.value)}>
          {cityOptions.map((city) => <option key={city.slug} value={city.slug} disabled={city.slug === from}>{getCityLocation(city)}</option>)}
        </select>
      </label>
      <Link href={getCanonicalComparisonPath(from, to)} prefetch={false}>Compare living costs <span>→</span></Link>
      <p>{dataEdition} model edition · Monthly USD-equivalent estimates, including housing. Check current local prices before setting your budget.</p>
    </div>
  )
}
