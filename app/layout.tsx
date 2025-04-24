import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Vikas Thirumanyam | AI/ML Specialist",
  description: "Portfolio of Vikas Thirumanyam, AI/ML Data Scientist and MCA student",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="normal"
          enableSystem={false}
          themes={["normal", "dark", "flamingo", "minimal"]}
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}


import './globals.css'