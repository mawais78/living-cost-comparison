"use client"

import { useMemo, useState } from "react"
import Link from "next/link"

import { CityCombobox } from "@/components/city-combobox"
import { defaultComparison, getCity, getComparisonPath, getMonthlyCost, type householdMultipliers, type lifestyleMultipliers } from "@/lib/cost-data"

type Household = keyof typeof householdMultipliers
type Lifestyle = keyof typeof lifestyleMultipliers
const money = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 })

export function SalaryCalculator() {
  const [fromSlug, setFromSlug] = useState(defaultComparison.from)
  const [toSlug, setToSlug] = useState(defaultComparison.to)
  const [income, setIncome] = useState(6500)
  const [household, setHousehold] = useState<Household>("single")
  const [lifestyle, setLifestyle] = useState<Lifestyle>("balanced")
  const from = getCity(fromSlug)
  const to = getCity(toSlug)

  const result = useMemo(() => {
    const fromBudget = getMonthlyCost(from, household, lifestyle)
    const toBudget = getMonthlyCost(to, household, lifestyle)
    const monthly = Math.round(income * toBudget / fromBudget / 10) * 10
    return { fromBudget, toBudget, monthly, annual: monthly * 12, difference: monthly - income }
  }, [from, to, household, lifestyle, income])

  return (
    <section className="salary-worksheet" aria-label="Equivalent salary worksheet">
      <div className="salary-input-panel">
        <div className="salary-step"><span>01</span><div><strong>Your current take-home</strong><p>Use income after tax and deductions.</p></div></div>
        <label className="salary-income-field"><span>Monthly take-home · USD</span><div><b>$</b><input type="number" min="0" step="100" value={income} onChange={(event) => setIncome(Number(event.target.value) || 0)} /></div></label>
        <div className="salary-field-grid">
          <CityCombobox label="Current city" value={fromSlug} onValueChange={setFromSlug} disabledSlug={toSlug} variant="salary" />
          <CityCombobox label="Destination" value={toSlug} onValueChange={setToSlug} disabledSlug={fromSlug} variant="salary" />
        </div>
        <div className="salary-step salary-step-second"><span>02</span><div><strong>Match your setup</strong><p>Keep the assumptions the same in both cities.</p></div></div>
        <div className="salary-field-grid">
          <label><span>Household</span><select value={household} onChange={(event) => setHousehold(event.target.value as Household)}><option value="single">1 person</option><option value="couple">Couple</option><option value="family">Family of 4</option></select></label>
          <label><span>Lifestyle</span><select value={lifestyle} onChange={(event) => setLifestyle(event.target.value as Lifestyle)}><option value="lean">Lean</option><option value="balanced">Balanced</option><option value="comfortable">Comfortable</option></select></label>
        </div>
      </div>

      <div className="salary-answer-panel" aria-live="polite">
        <span className="salary-answer-kicker">Your planning target</span>
        <h2>{money.format(result.monthly)}<small> net / month</small></h2>
        <p>in <strong>{to.city}</strong> may support a similar modeled lifestyle to {money.format(income)} in {from.city}.</p>
        <div className="salary-answer-change"><span>{result.difference === 0 ? "No modeled change" : `${money.format(Math.abs(result.difference))} ${result.difference > 0 ? "more" : "less"}`}</span><small>than your current monthly take-home</small></div>
        <dl>
          <div><dt>Annual take-home target</dt><dd>{money.format(result.annual)}</dd></div>
          <div><dt>{from.city} model budget</dt><dd>{money.format(result.fromBudget)}</dd></div>
          <div><dt>{to.city} model budget</dt><dd>{money.format(result.toBudget)}</dd></div>
        </dl>
        <Link href={getComparisonPath(from.slug, to.slug)}>Inspect the full cost breakdown <span>→</span></Link>
        <small className="salary-answer-note">Planning estimate only. Taxes, benefits and one-time moving costs are not included.</small>
      </div>
    </section>
  )
}
