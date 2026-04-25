import type { Metadata, Viewport } from "next"
import { Playfair_Display, DM_Sans, JetBrains_Mono } from "next/font/google"
import "@/styles/globals.css"
import { ThemeProvider } from "@/components/theme-provider"

// Premium heading font - elegant serif
const playfair = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-playfair",
  weight: ["400", "500", "600", "700"],
})

// Premium body font - modern, readable sans-serif
const dmSans = DM_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-dm-sans",
  weight: ["300", "400", "500", "600", "700"],
})

// Premium mono font - refined code typography
const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-jetbrains",
  weight: ["400", "500", "600"],
})

export const metadata: Metadata = {
  title: "Zuri Dashboard | Grand Azure Hotel",
  description: "Premium AI-powered hotel management dashboard for Grand Azure Hotel, Zanzibar",
  keywords: ["hotel management", "AI dashboard", "luxury hotel", "Zanzibar", "Grand Azure"],
  authors: [{ name: "Zuri AI" }],
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f8f7f5" },
    { media: "(prefers-color-scheme: dark)", color: "#1a1a2e" },
  ],
  width: "device-width",
  initialScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html 
      lang="en" 
      className={`${playfair.variable} ${dmSans.variable} ${jetbrainsMono.variable} bg-background`} 
      suppressHydrationWarning
    >
      <body className="font-sans antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
