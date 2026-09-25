import type { Metadata, Viewport } from "next"
import { SiteMotion } from "@/components/site-motion"
import "./globals.css"

export const metadata: Metadata = {
  metadataBase: new URL("https://livingcostcomparison.com"),
  title: { default: "Cost of Living Comparison: Cities, Budgets & Salaries", template: "%s | Living Cost Comparison" },
  description: "Compare the cost of living between cities, estimate an equivalent salary and learn how to build a reliable relocation budget.",
  applicationName: "Living Cost Comparison",
  category: "personal finance",
  keywords: ["cost of living comparison", "compare cities", "equivalent salary calculator", "relocation budget"],
  authors: [{ name: "Living Cost Comparison" }],
  creator: "Living Cost Comparison",
  publisher: "Living Cost Comparison",
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    siteName: "Living Cost Comparison",
    title: "Cost of Living Comparison: Cities, Budgets & Salaries",
    description: "Compare city costs, translate salary and inspect the assumptions behind a relocation budget.",
    url: "https://livingcostcomparison.com",
  },
  twitter: { card: "summary", title: "Living Cost Comparison", description: "Compare city costs, budgets and equivalent salaries." },
  manifest: "/site.webmanifest",
  icons: {
    icon: [
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    shortcut: "/favicon-32x32.png",
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#27302C",
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body><SiteMotion>{children}</SiteMotion></body></html>
}
