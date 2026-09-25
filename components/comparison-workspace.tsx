"use client"

import { useEffect, useMemo, useState } from "react"
import { ArrowDownRight, ArrowRight, ArrowRightLeft, ArrowUpRight } from "lucide-react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cities, costCategories, defaultComparison, getCanonicalComparisonPath, getCity, getCityLocation, getMonthlyCost, householdMultipliers, lifestyleMultipliers } from "@/lib/cost-data"

type Household = keyof typeof householdMultipliers
type Lifestyle = keyof typeof lifestyleMultipliers
const money = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 })
const cityOptions = [...cities].sort((first, second) => first.city.localeCompare(second.city))

function CitySelect({ label, value, onValueChange, disabledSlug }: { label: string; value: string; onValueChange: (value: string) => void; disabledSlug?: string }) {
  return (
    <label className="city-picker city-picker-studio">
      <span className="city-picker-label">{label}</span>
      <select className="city-picker-control studio-native-select" value={value} onChange={(event) => onValueChange(event.target.value)}>
        {cityOptions.map((city) => <option key={city.slug} value={city.slug} disabled={city.slug === disabledSlug}>{getCityLocation(city)}</option>)}
      </select>
    </label>
  )
}

function CostCell({ value, max, tone, label }: { value: number; max: number; tone: "origin" | "destination"; label: string }) {
  return (
    <div className="studio-cost-cell" data-label={label}>
      <strong>{money.format(value)}</strong>
      <span className="studio-cost-track"><i className={`studio-cost-bar ${tone}`} style={{ width: `${Math.max(6, (value / max) * 100)}%` }} /></span>
    </div>
  )
}

export function ComparisonWorkspace({ initialFrom = defaultComparison.from, initialTo = defaultComparison.to, embedded = false }: { initialFrom?: string; initialTo?: string; embedded?: boolean }) {
  const [fromSlug, setFromSlug] = useState(initialFrom)
  const [toSlug, setToSlug] = useState(initialTo)
  const [household, setHousehold] = useState<Household>("single")
  const [lifestyle, setLifestyle] = useState<Lifestyle>("balanced")
  const [income, setIncome] = useState(6500)
  const from = getCity(fromSlug)
  const to = getCity(toSlug)

  const result = useMemo(() => {
    const fromTotal = getMonthlyCost(from, household, lifestyle)
    const toTotal = getMonthlyCost(to, household, lifestyle)
    const difference = toTotal - fromTotal
    const percent = Math.round(Math.abs(difference / fromTotal) * 100)
    const equivalent = Math.round((income * toTotal) / fromTotal / 10) * 10
    return { fromTotal, toTotal, difference, percent, equivalent }
  }, [from, to, household, lifestyle, income])

  const swap = () => { setFromSlug(toSlug); setToSlug(fromSlug) }
  const destinationDelta = result.difference === 0
    ? "No monthly difference"
    : `${money.format(Math.abs(result.difference))} ${result.difference > 0 ? "more" : "less"} per month`
  const adjustedCategories = useMemo(() => {
    const factor = householdMultipliers[household] * lifestyleMultipliers[lifestyle]
    return costCategories.map((category) => {
      const fromValue = Math.round(from.costs[category.key] * factor / 10) * 10
      const toValue = Math.round(to.costs[category.key] * factor / 10) * 10
      return { ...category, fromValue, toValue, delta: toValue - fromValue }
    })
  }, [from, to, household, lifestyle])
  const largestChange = adjustedCategories.reduce((largest, item) => Math.abs(item.delta) > Math.abs(largest.delta) ? item : largest, adjustedCategories[0])

  useEffect(() => {
    const context = typeof document === "undefined" ? undefined : document.modelContext
    if (!context?.registerTool) return
    const lifecycle = new AbortController()

    const register = context.registerTool({
      name: "configure_cost_comparison",
      title: "Configure cost comparison",
      description: "Set the two cities, household, lifestyle and monthly take-home used by the visible cost comparison.",
      inputSchema: {
        type: "object",
        properties: {
          fromCity: { type: "string", enum: cities.map((city) => city.slug) },
          toCity: { type: "string", enum: cities.map((city) => city.slug) },
          household: { type: "string", enum: ["single", "couple", "family"] },
          lifestyle: { type: "string", enum: ["lean", "balanced", "comfortable"] },
          monthlyIncomeUsd: { type: "number", minimum: 0 },
        },
        required: ["fromCity", "toCity", "household", "lifestyle", "monthlyIncomeUsd"],
        additionalProperties: false,
      },
      annotations: { readOnlyHint: false, untrustedContentHint: false },
      execute(input) {
        if (!input || typeof input !== "object") throw new Error("Comparison settings must be an object.")
        const values = input as Record<string, unknown>
        const validCities = cities.map((city) => city.slug)
        if (typeof values.fromCity !== "string" || !validCities.includes(values.fromCity)) throw new Error("Choose a supported origin city.")
        if (typeof values.toCity !== "string" || !validCities.includes(values.toCity)) throw new Error("Choose a supported destination city.")
        if (values.fromCity === values.toCity) throw new Error("Choose two different cities.")
        if (!(["single", "couple", "family"] as unknown[]).includes(values.household)) throw new Error("Choose a supported household.")
        if (!(["lean", "balanced", "comfortable"] as unknown[]).includes(values.lifestyle)) throw new Error("Choose a supported lifestyle.")
        if (typeof values.monthlyIncomeUsd !== "number" || values.monthlyIncomeUsd < 0) throw new Error("Monthly income must be zero or greater.")

        const nextHousehold = values.household as Household
        const nextLifestyle = values.lifestyle as Lifestyle
        const nextFrom = getCity(values.fromCity)
        const nextTo = getCity(values.toCity)
        const fromTotal = getMonthlyCost(nextFrom, nextHousehold, nextLifestyle)
        const toTotal = getMonthlyCost(nextTo, nextHousehold, nextLifestyle)
        const equivalentIncome = Math.round((values.monthlyIncomeUsd * toTotal) / fromTotal / 10) * 10
        setFromSlug(values.fromCity)
        setToSlug(values.toCity)
        setHousehold(nextHousehold)
        setLifestyle(nextLifestyle)
        setIncome(values.monthlyIncomeUsd)
        return { fromCity: nextFrom.city, toCity: nextTo.city, fromMonthlyCostUsd: fromTotal, toMonthlyCostUsd: toTotal, equivalentIncomeUsd: equivalentIncome }
      },
    }, { signal: lifecycle.signal })
    void Promise.resolve(register).catch(() => undefined)
    return () => lifecycle.abort()
  }, [])

  return (
    <section id="compare" className={embedded ? "comparison-studio embedded" : "comparison-studio"} aria-label="Living cost calculator">
      <aside className="studio-setup">
        <div className="studio-setup-heading">
          <span>01</span>
          <div><p className="eyebrow">Your setup</p><h2>Build a like-for-like comparison.</h2></div>
        </div>

        <div className="studio-city-fields">
          <CitySelect label="Current city" value={fromSlug} onValueChange={setFromSlug} disabledSlug={toSlug} />
          <Button type="button" variant="outline" className="studio-swap" onClick={swap} aria-label="Swap cities"><ArrowRightLeft className="size-4" /> Swap cities</Button>
          <CitySelect label="Comparison city" value={toSlug} onValueChange={setToSlug} disabledSlug={fromSlug} />
        </div>

        <div className="studio-assumptions">
          <label className="studio-field">
            <span className="field-label">Household</span>
            <select className="studio-native-select" value={household} onChange={(event) => setHousehold(event.target.value as Household)}><option value="single">1 person</option><option value="couple">Couple</option><option value="family">Family of 4</option></select>
          </label>
          <label className="studio-field">
            <span className="field-label">Lifestyle</span>
            <select className="studio-native-select" value={lifestyle} onChange={(event) => setLifestyle(event.target.value as Lifestyle)}><option value="lean">Lean</option><option value="balanced">Balanced</option><option value="comfortable">Comfortable</option></select>
          </label>
          <label className="studio-field">
            <span className="field-label">Monthly take-home · USD</span>
            <span className="studio-income-input"><b>$</b><Input type="number" min={0} step={100} value={income} onChange={(event) => setIncome(Number(event.target.value) || 0)} /></span>
          </label>
        </div>
        <p className="studio-data-note"><strong>Planning estimate</strong>USD equivalent, updated {from.updated}. Taxes and one-time moving costs are excluded.</p>
      </aside>

      <div className="studio-results" aria-live="polite">
        <header className="studio-answer">
          <div className="studio-answer-top"><span className="eyebrow">Your result</span><span>{from.city} <ArrowRight /> {to.city}</span></div>
          <div className="studio-answer-title">
            <span className={result.difference > 0 ? "increase" : result.difference < 0 ? "decrease" : "neutral"}>{result.difference > 0 ? <ArrowUpRight /> : result.difference < 0 ? <ArrowDownRight /> : null}</span>
            <h2>{result.difference === 0 ? <>The modeled monthly cost is the same.</> : <><strong>{to.city}</strong> is <strong>{result.percent}%</strong> {result.difference > 0 ? "more" : "less"} expensive than {from.city}.</>}</h2>
          </div>
          <p>{destinationDelta} for a {household === "single" ? "one-person" : household} household with a {lifestyle} lifestyle.</p>
        </header>

        <div className="studio-metrics" aria-label="Comparison summary">
          <article><span>Current monthly budget</span><strong>{money.format(result.fromTotal)}</strong><small>{from.city}</small></article>
          <article><span>Destination budget</span><strong>{money.format(result.toTotal)}</strong><small>{to.city} · {destinationDelta}</small></article>
          <article className="salary"><span>Equivalent take-home</span><strong>{money.format(result.equivalent)}</strong><small>Needed in {to.city} to match {money.format(income)}</small></article>
        </div>

        <section className="studio-breakdown" aria-labelledby="breakdown-title">
          <div className="studio-breakdown-heading">
            <div><p className="eyebrow">Cost breakdown</p><h3 id="breakdown-title">Where the monthly budget changes</h3></div>
            <div className="studio-legend"><span><i className="origin" />{from.city}</span><span><i className="destination" />{to.city}</span></div>
          </div>
          <div className="studio-breakdown-head" aria-hidden="true"><span>Category</span><span>{from.city}</span><span>{to.city}</span><span>Change</span></div>
          <div className="studio-breakdown-list">
            {adjustedCategories.map(({ key, label, fromValue, toValue, delta }) => {
              const max = Math.max(fromValue, toValue)
              return (
                <article key={key} className="studio-breakdown-row">
                  <h4>{label}</h4>
                  <CostCell value={fromValue} max={max} tone="origin" label={from.city} />
                  <CostCell value={toValue} max={max} tone="destination" label={to.city} />
                  <span className={`studio-delta ${delta > 0 ? "increase" : delta < 0 ? "decrease" : "neutral"}`}>{delta === 0 ? "Same" : `${delta > 0 ? "+" : "−"}${money.format(Math.abs(delta))}`}</span>
                </article>
              )
            })}
          </div>

          <div className="studio-breakdown-footer">
            <div className="studio-largest-change"><span>Largest change</span><p>{largestChange.delta === 0 ? "Every category is currently equal." : <><strong>{largestChange.label}</strong> has the biggest modeled difference at {money.format(Math.abs(largestChange.delta))} per month.</>}</p></div>
            {from.slug !== to.slug && <Link href={getCanonicalComparisonPath(from.slug, to.slug)} className="studio-detail-link">Open shareable comparison <ArrowRight /></Link>}
          </div>
        </section>
      </div>
    </section>
  )
}
