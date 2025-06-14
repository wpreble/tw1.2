import type React from "react"
import ClientLayout from "./ClientLayout"

// Metadata can be updated here if needed, or in ClientLayout
export const metadata = {
  title: "The Way - Daily Scripture, Prayer, and Perspective",
  description: "A chat-first progressive web application for believers.",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return <ClientLayout>{children}</ClientLayout>
}


import './globals.css'