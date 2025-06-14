"use client"

import type React from "react"
import { useState } from "react"
import { Inter, Cardo } from "next/font/google" // Using next/font for optimization
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import AppSidebar from "@/components/app-sidebar"
import { cn } from "@/lib/utils"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})

const cardo = Cardo({
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
  variable: "--font-cardo",
})

const MIN_SIDEBAR_WIDTH = 72
const MAX_LEFT_SIDEBAR_WIDTH = 220
const DEFAULT_SIDEBAR_WIDTH = MAX_LEFT_SIDEBAR_WIDTH

export default function ClientLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const [sidebarWidth, setSidebarWidth] = useState(DEFAULT_SIDEBAR_WIDTH)

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
    setSidebarWidth(isSidebarOpen ? MIN_SIDEBAR_WIDTH : MAX_LEFT_SIDEBAR_WIDTH)
  }

  return (
    <html lang="en" suppressHydrationWarning className={cn(inter.variable, cardo.variable)}>
      <head />
      <body className={cn("bg-background text-foreground", inter.variable, cardo.variable)}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          <div className="flex h-screen bg-background text-foreground overflow-hidden">
            {" "}
            {/* Ensure main div uses theme variables */}
            <AppSidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} sidebarWidth={sidebarWidth} />
            <main className="flex-1 flex flex-col overflow-hidden">
              <div className="flex-1 overflow-y-auto bg-background">
                {" "}
                {/* Changed from parchmentOffWhite/obsidianBlack to bg-background */}
                {children}
              </div>
            </main>
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
