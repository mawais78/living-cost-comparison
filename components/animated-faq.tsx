"use client"

import { useRef, type MouseEvent } from "react"

type AnimatedFaqListProps = {
  className: string
  iconElement?: "i" | "span"
  items: ReadonlyArray<ReadonlyArray<string>>
}

function AnimatedFaqItem({
  answer,
  iconElement = "span",
  question,
}: {
  answer: string
  iconElement?: "i" | "span"
  question: string
}) {
  const animationRef = useRef<Animation | null>(null)
  const detailsRef = useRef<HTMLDetailsElement>(null)

  function handleToggle(event: MouseEvent<HTMLElement>) {
    event.preventDefault()

    const details = detailsRef.current
    if (!details) return

    const summary = event.currentTarget
    const isReversingClose = details.dataset.state === "closing"
    const shouldOpen = !details.open || isReversingClose

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      animationRef.current?.cancel()
      animationRef.current = null
      details.open = shouldOpen
      details.style.removeProperty("height")
      details.style.removeProperty("overflow")
      delete details.dataset.state
      return
    }

    const startHeight = details.getBoundingClientRect().height
    animationRef.current?.cancel()

    // Keep the answer in the document while either direction is animating.
    details.open = true
    details.dataset.state = shouldOpen ? "opening" : "closing"

    let endHeight = summary.getBoundingClientRect().height
    if (shouldOpen) {
      details.style.height = "auto"
      endHeight = details.getBoundingClientRect().height
    }

    details.style.height = `${startHeight}px`
    details.style.overflow = "hidden"

    const animation = details.animate(
      { height: [`${startHeight}px`, `${endHeight}px`] },
      { duration: shouldOpen ? 320 : 260, easing: "cubic-bezier(0.22, 1, 0.36, 1)" },
    )

    animationRef.current = animation
    animation.onfinish = () => {
      if (animationRef.current !== animation) return

      details.open = shouldOpen
      details.style.removeProperty("height")
      details.style.removeProperty("overflow")
      delete details.dataset.state
      animationRef.current = null
    }
  }

  const Icon = iconElement

  return (
    <details ref={detailsRef}>
      <summary onClick={handleToggle}>
        {question}
        <Icon aria-hidden="true">+</Icon>
      </summary>
      <p>{answer}</p>
    </details>
  )
}

export function AnimatedFaqList({ className, iconElement, items }: AnimatedFaqListProps) {
  return (
    <div className={`${className} animated-faq-list`}>
      {items.map(([question, answer]) => (
        <AnimatedFaqItem
          answer={answer}
          iconElement={iconElement}
          key={question}
          question={question}
        />
      ))}
    </div>
  )
}
