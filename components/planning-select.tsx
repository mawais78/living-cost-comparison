"use client"

import { useEffect, useId, useRef, useState } from "react"
import { CheckIcon, ChevronDownIcon } from "lucide-react"

type PlanningSelectOption<Value extends string> = {
  value: Value
  label: string
}

type PlanningSelectProps<Value extends string> = {
  label: string
  value: Value
  options: readonly PlanningSelectOption<Value>[]
  onValueChange: (value: Value) => void
  variant: "salary" | "studio"
}

export function PlanningSelect<Value extends string>({ label, value, options, onValueChange, variant }: PlanningSelectProps<Value>) {
  const id = useId()
  const labelId = `${id}-label`
  const listId = `${id}-options`
  const wrapperRef = useRef<HTMLDivElement>(null)
  const [open, setOpen] = useState(false)
  const [activeIndex, setActiveIndex] = useState(-1)
  const selected = options.find((option) => option.value === value)

  useEffect(() => {
    const closeWhenClickingOutside = (event: PointerEvent) => {
      if (wrapperRef.current?.contains(event.target as Node)) return
      setOpen(false)
      setActiveIndex(-1)
    }

    document.addEventListener("pointerdown", closeWhenClickingOutside)
    return () => document.removeEventListener("pointerdown", closeWhenClickingOutside)
  }, [])

  const closeMenu = () => {
    setOpen(false)
    setActiveIndex(-1)
  }

  const openMenu = () => {
    setOpen(true)
    setActiveIndex(Math.max(0, options.findIndex((option) => option.value === value)))
  }

  const moveActiveOption = (direction: 1 | -1) => {
    if (!options.length) return
    if (!open) openMenu()
    setActiveIndex((current) => current < 0
      ? direction === 1 ? 0 : options.length - 1
      : (current + direction + options.length) % options.length)
  }

  const selectOption = (option: PlanningSelectOption<Value>) => {
    onValueChange(option.value)
    closeMenu()
  }

  return (
    <div ref={wrapperRef} className={`${variant === "studio" ? "studio-field " : ""}planning-select planning-select-${variant}`}>
      <span id={labelId} className={variant === "studio" ? "field-label planning-select-label" : "planning-select-label"}>{label}</span>
      <div className="planning-select-shell">
        <button
          id={id}
          type="button"
          role="combobox"
          aria-labelledby={labelId}
          aria-controls={listId}
          aria-expanded={open}
          aria-haspopup="listbox"
          aria-activedescendant={open && activeIndex >= 0 ? `${listId}-${activeIndex}` : undefined}
          className="planning-select-trigger"
          onClick={() => open ? closeMenu() : openMenu()}
          onKeyDown={(event) => {
            if (event.key === "ArrowDown") {
              event.preventDefault()
              moveActiveOption(1)
            } else if (event.key === "ArrowUp") {
              event.preventDefault()
              moveActiveOption(-1)
            } else if (event.key === "Enter" && open && activeIndex >= 0) {
              event.preventDefault()
              selectOption(options[activeIndex])
            } else if (event.key === "Escape" && open) {
              event.preventDefault()
              closeMenu()
            }
          }}
        >
          <span>{selected?.label ?? "Select"}</span>
          <ChevronDownIcon aria-hidden="true" />
        </button>

        {open && (
          <div id={listId} className="planning-select-popup" role="listbox" aria-label={`${label} options`}>
            {options.map((option, index) => (
              <button
                type="button"
                id={`${listId}-${index}`}
                key={option.value}
                role="option"
                aria-selected={option.value === value}
                data-highlighted={index === activeIndex ? "" : undefined}
                className="planning-select-option"
                onPointerMove={() => setActiveIndex(index)}
                onClick={() => selectOption(option)}
              >
                <span>{option.label}</span>
                {option.value === value && <CheckIcon aria-hidden="true" />}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
