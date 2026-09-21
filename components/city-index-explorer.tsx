"use client"

import { useMemo, useState } from "react"
import Link from "next/link"

import { cities, getMonthlyCost } from "@/lib/cost-data"

type SortKey = "index" | "budget" | "housing"
const money = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 })
const londonTotal = getMonthlyCost(cities.find((city) => city.slug === "london") ?? cities[0], "single", "balanced")
const countrySlug = (country: string) => country.toLowerCase().replaceAll(" ", "-")

export function CityIndexExplorer() {
  const [query, setQuery] = useState("")
  const [sort, setSort] = useState<SortKey>("index")
  const rows = useMemo(() => cities.map((city) => {
    const total = getMonthlyCost(city, "single", "balanced")
    return { city, total, index: Math.round(total / londonTotal * 100), housing: Math.round(city.costs.housing / total * 100) }
  }).filter(({ city }) => `${city.city} ${city.country}`.toLowerCase().includes(query.toLowerCase()))
    .sort((a, b) => sort === "housing" ? b.housing - a.housing : sort === "budget" ? b.total - a.total : b.index - a.index), [query, sort])

  return (
    <div className="index-explorer">
      <div className="index-toolbar">
        <label><span>Find a city</span><input type="search" placeholder="Search city or country" value={query} onChange={(event) => setQuery(event.target.value)} /></label>
        <div className="index-sort" aria-label="Sort cities"><span>Order by</span>{(["index", "budget", "housing"] as SortKey[]).map((key) => <button key={key} type="button" className={sort === key ? "active" : undefined} onClick={() => setSort(key)}>{key === "index" ? "Index" : key === "budget" ? "Budget" : "Housing share"}</button>)}</div>
      </div>
      <div className="index-explorer-table-wrap">
        <table className="index-explorer-table">
          <thead><tr><th>Rank</th><th>City</th><th>Cost index</th><th>Monthly model</th><th>Housing</th><th><span className="sr-only">Guide</span></th></tr></thead>
          <tbody>{rows.map(({ city, total, index, housing }, rank) => <tr key={city.slug}>
            <td><b>{String(rank + 1).padStart(2, "0")}</b></td>
            <td><strong>{city.city}</strong><small>{city.country}</small></td>
            <td><div className="index-value"><strong>{index}</strong><span><i style={{ width: `${Math.min(index, 126) / 1.26}%` }} /></span></div></td>
            <td>{money.format(total)}</td><td>{housing}%</td>
            <td><Link href={`/cost-of-living/${countrySlug(city.country)}/${city.slug}`} aria-label={`Open ${city.city} guide`}>View</Link></td>
          </tr>)}</tbody>
        </table>
      </div>
      {rows.length === 0 && <p className="index-empty">No supported city matches “{query}”.</p>}
      <p className="index-disclosure">London = 100 · One person · Balanced lifestyle · Illustrative USD-equivalent estimates</p>
    </div>
  )
}
