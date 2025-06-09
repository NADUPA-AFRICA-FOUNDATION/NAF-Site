import type React from "react"
import "@/app/globals.css"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "NADUPA AFRICA FOUNDATION",
  description: "Empowering Communities, Transforming Lives across Kenya",
  keywords: "Kenya, NGO, education, community development, environmental conservation, NADUPA",
  authors: [{ name: "NADUPA AFRICA FOUNDATION" }],
  creator: "NADUPA AFRICA FOUNDATION",
  publisher: "NADUPA AFRICA FOUNDATION",
  robots: "index, follow",
  openGraph: {
    title: "NADUPA AFRICA FOUNDATION",
    description: "Empowering Communities, Transforming Lives across Kenya",
    url: "https://nadupaafricafoundation.org",
    siteName: "NADUPA AFRICA FOUNDATION",
    images: [
      {
        url: "/images/nadupa-logo-vertical.png",
        width: 400,
        height: 400,
        alt: "NADUPA AFRICA FOUNDATION Logo",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "NADUPA AFRICA FOUNDATION",
    description: "Empowering Communities, Transforming Lives across Kenya",
    images: ["/images/nadupa-logo-vertical.png"],
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
    shortcut: "/favicon.ico",
  },
  manifest: "/site.webmanifest",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        {/* Additional favicon links for better browser support */}
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#059669" />
        <meta name="msapplication-TileColor" content="#059669" />
      </head>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
