"use client"

import { useId } from "react"

import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/components/ui/combobox"
import { cities } from "@/lib/cost-data"

type CityOption = {
  value: string
  label: string
  city: string
  country: string
}

const cityOptions: CityOption[] = [...cities]
  .sort((first, second) => first.city.localeCompare(second.city))
  .map((city) => ({
    value: city.slug,
    label: `${city.city}, ${city.country}`,
    city: city.city,
    country: city.country,
  }))

type CityComboboxProps = {
  label: string
  value: string
  onValueChange: (value: string) => void
  disabledSlug?: string
  variant?: "launcher" | "studio" | "salary"
}

export function CityCombobox({ label, value, onValueChange, disabledSlug, variant = "studio" }: CityComboboxProps) {
  const id = useId()
  const selected = cityOptions.find((city) => city.value === value) ?? null

  return (
    <div className={`city-picker city-picker-${variant}`}>
      <label className="city-picker-label" htmlFor={id}>{label}</label>
      <Combobox
        items={cityOptions}
        value={selected}
        onValueChange={(next) => next && onValueChange(next.value)}
        isItemEqualToValue={(item, current) => item.value === current.value}
        autoHighlight
        autoComplete="off"
      >
        <ComboboxInput
          id={id}
          className="city-picker-control"
          placeholder="Search city or country"
          aria-label={label}
        />
        <ComboboxContent className="city-picker-popup">
          <ComboboxEmpty>No city with available data found.</ComboboxEmpty>
          <ComboboxList>
            {(option: CityOption) => (
              <ComboboxItem
                key={option.value}
                value={option}
                disabled={option.value === disabledSlug}
                className="city-picker-option"
              >
                <span><strong>{option.city}</strong><small>{option.country}</small></span>
                {option.value === disabledSlug && <em>Already selected</em>}
              </ComboboxItem>
            )}
          </ComboboxList>
        </ComboboxContent>
      </Combobox>
    </div>
  )
}
