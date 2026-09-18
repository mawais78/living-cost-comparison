import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  metadataBase: new URL("https://livingcostcomparison.com"),
  title: { default: "Living Cost Comparison — Compare Cities & Salaries", template: "%s | Living Cost Comparison" },
  description: "Compare living costs between cities, translate your salary, and understand the monthly budget behind your next move.",
  other: { "codex-preview": "development" },
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>
}
