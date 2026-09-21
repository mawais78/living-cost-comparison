import Image from "next/image"
import Link from "next/link"

export function LogoMark({ reversed = false, className = "" }: { reversed?: boolean; className?: string }) {
  return (
    <Image
      src="/brand/logo-monogram.png"
      alt=""
      width={517}
      height={426}
      className={`${className}${reversed ? " brand-logo-raster-reversed" : ""}`}
      unoptimized
    />
  )
}

export function BrandLogo({ reversed = false, compact = false }: { reversed?: boolean; compact?: boolean }) {
  return (
    <Link href="/" className={`brand-logo${reversed ? " brand-logo-reversed" : ""}`} aria-label="Living Cost Comparison home">
      {compact ? <LogoMark reversed={reversed} className="brand-logo-mark" /> : <Image
        src="/brand/logo-lockup.png"
        alt=""
        width={1444}
        height={426}
        className="brand-logo-lockup"
        unoptimized
      />}
    </Link>
  )
}
