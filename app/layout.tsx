import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Avion Capital - Smart Financing for Business Growth",
  description:
    "Fast, flexible capital solutions for Canadian businesses. Equipment financing, invoice factoring, and secured business loans across transportation, construction, staffing, hospitality, and aviation industries.",
  keywords:
    "business financing, equipment financing, invoice factoring, business loans, Canadian financing, transportation financing, aviation financing, construction financing",
  authors: [{ name: "Avion Capital" }],
  creator: "Avion Capital",
  publisher: "Avion Capital",
  robots: "index, follow",
  openGraph: {
    title: "Avion Capital - Smart Financing for Business Growth",
    description: "Fast, flexible capital solutions for Canadian businesses across key industries.",
    url: "https://avioncapital.ca",
    siteName: "Avion Capital",
    locale: "en_CA",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Avion Capital - Smart Financing for Business Growth",
    description: "Fast, flexible capital solutions for Canadian businesses across key industries.",
  },
  viewport: "width=device-width, initial-scale=1",
  themeColor: "#2563eb",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="canonical" href="https://avioncapital.ca" />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  )
}
