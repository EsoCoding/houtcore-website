import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Houtcore | Ambachtelijk maatwerk in hout",
  description: "Vakkundig unieke meubels, interieur, maatwerk en projecten",
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="nl" className="scroll-smooth">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
