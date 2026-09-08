import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"
import { ClientLayout } from "@/components/layout/client-layout"
import { ThemeProvider } from "@/components/providers/theme-provider"
import { ThemeScript } from "@/components/providers/theme-script"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "DSA Java Judge — Learn DSA from A to Z",
  description:
    "A complete DSA learning ecosystem combining Striver A2Z structure, LeetCode-style coding, interactive learning, and local progress tracking.",
  keywords: [
    "DSA",
    "Java",
    "Data Structures",
    "Algorithms",
    "LeetCode",
    "Codeforces",
    "Striver A2Z",
    "Coding Interview",
    "Programming",
  ],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    // data-theme is the single source of truth for the palette. It previously
    // carried a `dark` class that was never defined in CSS, so light mode was
    // unreachable; suppressHydrationWarning covers the pre-hydration script
    // rewriting this attribute before React attaches.
    <html
      lang="en"
      data-theme="dark"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <ThemeScript />
      </head>
      {/* bg-background / text-foreground, not hardcoded greys -- the previous
          bg-gray-950 overrode the theme tokens entirely. */}
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <ThemeProvider>
          <ClientLayout>{children}</ClientLayout>
        </ThemeProvider>
      </body>
    </html>
  )
}
