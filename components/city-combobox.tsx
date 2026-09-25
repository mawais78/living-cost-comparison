"use client"

import { useId, useState } from "react"
import { Combobox as ComboboxPrimitive } from "@base-ui/react"
import { XIcon } from "lucide-react"

import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/components/ui/combobox"
import { cities, getCityLocation } from "@/lib/cost-data"

type CityOption = {
  value: string
  label: string
  city: string
  country: string
  region?: string
}

const cityOptions: CityOption[] = [...cities]
  .sort((first, second) => first.city.localeCompare(second.city))
  .map((city) => ({
    value: city.slug,
    label: getCityLocation(city),
    city: city.city,
    country: city.country,
    region: city.region,
  }))

type CityComboboxProps = {
  label: string
  value: string
  onValueChange: (value: string) => void
  disabledSlug?: string
  variant?: "launcher" | "studio" | "salary"
}

export function CityCombobox({ label, value, onValueChange, disabledSlug, variant = "studio" }: CityComboboxProps) {
  return <CityComboboxField key={value} label={label} value={value} onValueChange={onValueChange} disabledSlug={disabledSlug} variant={variant} />
}

function CityComboboxField({ label, value, onValueChange, disabledSlug, variant = "studio" }: CityComboboxProps) {
  const id = useId()
  const selected = cityOptions.find((city) => city.value === value) ?? null
  const [inputValue, setInputValue] = useState(selected?.label ?? "")

  return (
    <div className={`city-picker city-picker-${variant}`}>
      <label className="city-picker-label" htmlFor={id}>{label}</label>
      <Combobox
        items={cityOptions}
        value={selected}
        inputValue={inputValue}
        onInputValueChange={setInputValue}
        onValueChange={(next) => {
          if (!next) return
          setInputValue(next.label)
          onValueChange(next.value)
        }}
        onOpenChange={(open) => {
          if (!open && !inputValue) setInputValue(selected?.label ?? "")
        }}
        isItemEqualToValue={(item, current) => item.value === current.value}
        autoHighlight
        autoComplete="off"
      >
        <ComboboxInput
          id={id}
          className="city-picker-control"
          placeholder="Search city or country"
          aria-label={label}
        >
          {inputValue && (
            <ComboboxPrimitive.Clear className="city-picker-clear" aria-label={`Clear ${label.toLowerCase()} search`}>
              <XIcon aria-hidden="true" />
            </ComboboxPrimitive.Clear>
          )}
        </ComboboxInput>
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
                <span><strong>{option.city}</strong><small>{[option.region, option.country].filter(Boolean).join(", ")}</small></span>
                {option.value === disabledSlug && <em>Already selected</em>}
              </ComboboxItem>
            )}
          </ComboboxList>
        </ComboboxContent>
      </Combobox>
    </div>
  )
}
