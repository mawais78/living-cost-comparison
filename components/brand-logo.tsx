import Link from "next/link"

export function LogoMark({ reversed = false, className = "" }: { reversed?: boolean; className?: string }) {
  return (
    <svg className={className} viewBox="0 0 48 48" role="img" aria-label="Living Cost Comparison">
      <path fill={reversed ? "#FFFFFF" : "#142B3D"} d="M18 7H10a3 3 0 0 0-3 3v28a3 3 0 0 0 3 3h8v-6h-5V13h5V7Z" />
      <path fill={reversed ? "#FFFFFF" : "#142B3D"} d="M30 7h8a3 3 0 0 1 3 3v28a3 3 0 0 1-3 3h-8v-6h5V13h-5V7Z" />
      <path fill={reversed ? "#75A0FF" : "#2F5BFF"} d="M19 17h10v5H19z" />
      <path fill={reversed ? "#F3BD4F" : "#E5A82A"} d="M19 26h10v5H19z" />
    </svg>
  )
}

export function BrandLogo({ reversed = false, compact = false }: { reversed?: boolean; compact?: boolean }) {
  return (
    <Link href="/" className="brand-logo" aria-label="Living Cost Comparison home">
      <LogoMark reversed={reversed} className="brand-logo-mark" />
      {!compact && <span className={reversed ? "brand-wordmark text-white" : "brand-wordmark"}><span>Living Cost</span><span>Comparison</span></span>}
    </Link>
  )
}
