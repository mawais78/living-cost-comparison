"use client"

import { useLayoutEffect, type ReactNode } from "react"
import { usePathname } from "next/navigation"

const revealSelector = [
  "main > header:not(.site-header)",
  "main > section",
  "main > footer",
  ".research-article > section",
  ".method-article > section",
].join(",")

export function SiteMotion({ children }: { children: ReactNode }) {
  const pathname = usePathname()

  useLayoutEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)")
    const elements = Array.from(document.querySelectorAll<HTMLElement>(revealSelector))

    if (reducedMotion.matches) {
      document.documentElement.classList.remove("motion-ready")
      return
    }

    elements.forEach((element) => {
      element.dataset.motionReveal = ""
      if (element.getBoundingClientRect().top < window.innerHeight * 0.94) {
        element.dataset.motionVisible = "true"
      }
    })

    document.documentElement.classList.add("motion-ready")

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return
          const element = entry.target as HTMLElement
          element.dataset.motionVisible = "true"
          observer.unobserve(element)
        })
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
    )

    elements.forEach((element) => {
      if (element.dataset.motionVisible !== "true") observer.observe(element)
    })

    return () => observer.disconnect()
  }, [pathname])

  return children
}
