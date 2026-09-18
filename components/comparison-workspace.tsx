"use client"

import { useEffect, useMemo, useState } from "react"
import { ArrowRight, ArrowRightLeft, Check, Info, Sparkles } from "lucide-react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { cities, costCategories, getCity, getMonthlyCost, type CityCost, type householdMultipliers, type lifestyleMultipliers } from "@/lib/cost-data"

type Household = keyof typeof householdMultipliers
type Lifestyle = keyof typeof lifestyleMultipliers
const money = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 })

function CitySelect({ label, value, onValueChange }: { label: string; value: string; onValueChange: (value: string) => void }) {
  const selected = getCity(value)
  return (
    <label className="grid min-w-0 gap-2">
      <span className="field-label">{label}</span>
      <Select value={value} onValueChange={(next) => next && onValueChange(next)}>
        <SelectTrigger className="h-14 w-full rounded-xl border-[var(--line-strong)] bg-white px-4 shadow-none">
          <SelectValue>
            <span className="flex min-w-0 items-center gap-3">
              <span className="city-dot" style={{ background: selected.accent }} />
              <span className="min-w-0 text-left">
                <span className="block truncate font-semibold text-[var(--ink)]">{selected.city}</span>
                <span className="block truncate text-xs text-[var(--muted-ink)]">{selected.country}</span>
              </span>
            </span>
          </SelectValue>
        </SelectTrigger>
        <SelectContent position="popper" align="start" className="min-w-[260px]">
          {cities.map((city) => <SelectItem key={city.slug} value={city.slug}>{city.city}, {city.country}</SelectItem>)}
        </SelectContent>
      </Select>
    </label>
  )
}

function CostBar({ left, right, from, to }: { left: number; right: number; from: CityCost; to: CityCost }) {
  const max = Math.max(left, right)
  return (
    <div className="grid gap-2">
      <div className="flex items-center gap-2"><span className="bar-label">{from.city}</span><span className="h-2.5 min-w-1 rounded-sm" style={{ width: `${Math.max(6, (left / max) * 100)}%`, background: from.accent }} /><span className="bar-value">{money.format(left)}</span></div>
      <div className="flex items-center gap-2"><span className="bar-label">{to.city}</span><span className="h-2.5 min-w-1 rounded-sm" style={{ width: `${Math.max(6, (right / max) * 100)}%`, background: to.accent }} /><span className="bar-value">{money.format(right)}</span></div>
    </div>
  )
}

export function ComparisonWorkspace({ initialFrom = "london", initialTo = "amsterdam", embedded = false }: { initialFrom?: string; initialTo?: string; embedded?: boolean }) {
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
    <section id="compare" className={embedded ? "comparison-shell embedded" : "comparison-shell"} aria-label="Living cost calculator">
      <div className="comparison-controls">
        <div className="grid gap-3 lg:grid-cols-[1fr_auto_1fr] lg:items-end">
          <CitySelect label="I live in" value={fromSlug} onValueChange={setFromSlug} />
          <Button type="button" variant="outline" size="icon" className="mb-1 rounded-full border-[var(--line-strong)] bg-white" onClick={swap} aria-label="Swap cities"><ArrowRightLeft className="size-4" /></Button>
          <CitySelect label="I’m comparing with" value={toSlug} onValueChange={setToSlug} />
        </div>
        <div className="mt-4 grid gap-4 sm:grid-cols-3">
          <label className="grid gap-2">
            <span className="field-label">Household</span>
            <Select value={household} onValueChange={(next) => next && setHousehold(next as Household)}><SelectTrigger className="w-full bg-white"><SelectValue /></SelectTrigger><SelectContent><SelectItem value="single">1 person</SelectItem><SelectItem value="couple">Couple</SelectItem><SelectItem value="family">Family of 4</SelectItem></SelectContent></Select>
          </label>
          <label className="grid gap-2">
            <span className="field-label">Lifestyle</span>
            <Select value={lifestyle} onValueChange={(next) => next && setLifestyle(next as Lifestyle)}><SelectTrigger className="w-full bg-white"><SelectValue /></SelectTrigger><SelectContent><SelectItem value="lean">Lean</SelectItem><SelectItem value="balanced">Balanced</SelectItem><SelectItem value="comfortable">Comfortable</SelectItem></SelectContent></Select>
          </label>
          <label className="grid gap-2">
            <span className="field-label">Monthly take-home · USD</span>
            <Input type="number" min={0} step={100} value={income} onChange={(event) => setIncome(Number(event.target.value) || 0)} className="bg-white" />
          </label>
        </div>
      </div>

      <div className="result-grid">
        <div className="result-summary">
          <span className="eyebrow"><Sparkles className="size-3.5" /> Your quick answer</span>
          <h2 className="mt-4 text-2xl font-semibold leading-tight tracking-[-0.035em] text-white sm:text-[32px]">{to.city} is <span className="text-[var(--amber)]">{result.percent}% {result.difference >= 0 ? "more" : "less"} expensive</span> for your setup.</h2>
          <p className="mt-4 max-w-lg text-sm leading-6 text-white/70">To keep roughly the same lifestyle, a {money.format(income)} monthly take-home in {from.city} translates to about <strong className="font-semibold text-white">{money.format(result.equivalent)}</strong> in {to.city}.</p>
          <div className="mt-6 grid grid-cols-2 gap-3"><div className="metric-card"><span>{from.city} budget</span><strong>{money.format(result.fromTotal)}</strong><small>per month</small></div><div className="metric-card"><span>{to.city} budget</span><strong>{money.format(result.toTotal)}</strong><small>per month</small></div></div>
          <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-white/60"><span className="flex items-center gap-1.5"><Check className="size-3.5 text-[var(--mint)]" /> Customised to you</span><span className="flex items-center gap-1.5"><Info className="size-3.5" /> Prototype estimates</span></div>
        </div>
        <div className="breakdown-panel">
          <div className="flex items-end justify-between gap-4"><div><p className="eyebrow text-[var(--blue)]">What drives the difference</p><h3 className="mt-2 text-lg font-semibold text-[var(--ink)]">Monthly cost breakdown</h3></div><span className="text-right text-xs leading-5 text-[var(--muted-ink)]">USD equivalent<br />{from.updated}</span></div>
          <div className="mt-6 grid gap-5">
            {costCategories.map((category) => <div key={category.key} className="grid gap-2"><div className="flex items-center justify-between text-xs"><span className="font-semibold text-[var(--ink)]">{category.label}</span><span className="text-[var(--muted-ink)]">{money.format(to.costs[category.key] - from.costs[category.key])}</span></div><CostBar left={from.costs[category.key]} right={to.costs[category.key]} from={from} to={to} /></div>)}
          </div>
          <Link href="/compare/london-vs-amsterdam" className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-[var(--blue)]">Open the full comparison <ArrowRight className="size-4" /></Link>
        </div>
      </div>
    </section>
  )
}
