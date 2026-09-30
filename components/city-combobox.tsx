"use client"

import { useEffect, useId, useMemo, useRef, useState } from "react"
import { ChevronDownIcon, XIcon } from "lucide-react"

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
  const listId = `${id}-options`
  const wrapperRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const selected = cityOptions.find((city) => city.value === value) ?? null
  const [inputValue, setInputValue] = useState(selected?.label ?? "")
  const [open, setOpen] = useState(false)
  const [activeIndex, setActiveIndex] = useState(-1)

  const filteredOptions = useMemo(() => {
    const query = inputValue.trim().toLocaleLowerCase()
    if (!query || query === selected?.label.toLocaleLowerCase()) return cityOptions
    return cityOptions.filter((option) => option.label.toLocaleLowerCase().includes(query))
  }, [inputValue, selected?.label])

  useEffect(() => {
    const closeWhenClickingOutside = (event: PointerEvent) => {
      if (wrapperRef.current?.contains(event.target as Node)) return
      setOpen(false)
      setActiveIndex(-1)
      setInputValue(selected?.label ?? "")
    }
    document.addEventListener("pointerdown", closeWhenClickingOutside)
    return () => document.removeEventListener("pointerdown", closeWhenClickingOutside)
  }, [selected?.label])

  const openPicker = () => {
    setOpen(true)
    setActiveIndex(-1)
  }

  const closePicker = () => {
    setOpen(false)
    setActiveIndex(-1)
    setInputValue(selected?.label ?? "")
  }

  const selectCity = (option: CityOption) => {
    if (option.value === disabledSlug) return
    setInputValue(option.label)
    setOpen(false)
    setActiveIndex(-1)
    onValueChange(option.value)
  }

  const moveActiveOption = (direction: 1 | -1) => {
    if (!filteredOptions.length) return
    setOpen(true)
    setActiveIndex((current) => {
      let next = current
      do {
        next = next < 0
          ? direction === 1 ? 0 : filteredOptions.length - 1
          : (next + direction + filteredOptions.length) % filteredOptions.length
      } while (filteredOptions[next]?.value === disabledSlug && next !== current)
      return next
    })
  }

  return (
    <div ref={wrapperRef} className={`city-picker city-picker-${variant}`}>
      <label className="city-picker-label" htmlFor={id}>{label}</label>
      <div className="city-picker-shell">
        <div className="city-picker-control">
          <input
            ref={inputRef}
            id={id}
            role="combobox"
            aria-autocomplete="list"
            aria-controls={listId}
            aria-expanded={open}
            aria-activedescendant={activeIndex >= 0 ? `${listId}-${activeIndex}` : undefined}
            autoComplete="off"
            spellCheck={false}
            value={inputValue}
            placeholder="Search city or country"
            onClick={openPicker}
            onFocus={openPicker}
            onChange={(event) => {
              setInputValue(event.target.value)
              setOpen(true)
              setActiveIndex(-1)
            }}
            onKeyDown={(event) => {
              if (event.key === "ArrowDown") {
                event.preventDefault()
                moveActiveOption(1)
              } else if (event.key === "ArrowUp") {
                event.preventDefault()
                moveActiveOption(-1)
              } else if (event.key === "Enter" && open && activeIndex >= 0) {
                event.preventDefault()
                selectCity(filteredOptions[activeIndex])
              } else if (event.key === "Escape" && open) {
                event.preventDefault()
                closePicker()
              }
            }}
          />

          {open && inputValue ? (
            <button
              type="button"
              className="city-picker-clear"
              aria-label={`Clear ${label.toLowerCase()} search`}
              onPointerDown={(event) => event.preventDefault()}
              onClick={() => {
                setInputValue("")
                setActiveIndex(-1)
                inputRef.current?.focus()
              }}
            >
              <XIcon aria-hidden="true" />
            </button>
          ) : (
            <button
              type="button"
              className="city-picker-toggle"
              aria-label={open ? `Close ${label.toLowerCase()} options` : `Open ${label.toLowerCase()} options`}
              aria-expanded={open}
              onPointerDown={(event) => event.preventDefault()}
              onClick={() => {
                if (open) closePicker()
                else {
                  openPicker()
                  inputRef.current?.focus()
                }
              }}
            >
              <ChevronDownIcon aria-hidden="true" />
            </button>
          )}
        </div>

        {open && (
          <div id={listId} className="city-picker-popup" role="listbox" aria-label={`${label} options`}>
            <div className="city-picker-list">
              {filteredOptions.length ? filteredOptions.map((option, index) => {
                const disabled = option.value === disabledSlug
                return (
                  <button
                    type="button"
                    id={`${listId}-${index}`}
                    key={option.value}
                    role="option"
                    aria-selected={option.value === value}
                    disabled={disabled}
                    data-highlighted={index === activeIndex ? "" : undefined}
                    className="city-picker-option"
                    onClick={() => selectCity(option)}
                  >
                    <span><strong>{option.city}</strong><small>{[option.region, option.country].filter(Boolean).join(", ")}</small></span>
                    {disabled && <em>Already selected</em>}
                  </button>
                )
              }) : <p className="city-picker-empty">No city with available data found.</p>}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
