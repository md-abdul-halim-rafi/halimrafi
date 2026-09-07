import type { Metadata } from 'next'
import { Geist_Mono, Instrument_Serif, Inter } from 'next/font/google'
import { site } from '@/lib/site'
import './globals.css'

/**
 * Three roles, kept strictly separate.
 *
 * Instrument Serif carries the display sizes, where its high contrast has room
 * to show. Inter does the reading, which is what it is for. Geist Mono is
 * reserved for technical annotation: dates, labels, timings, code. Nothing
 * borrows another's job.
 */
const sans = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
})

const mono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
})

const display = Instrument_Serif({
  subsets: ['latin'],
  variable: '--font-serif',
  weight: '400',
  style: ['normal', 'italic'],
  display: 'swap',
})

const description =
  'Halim Rafi is co-founder and CTO of Octolane AI. A record of what he builds, the choices behind it, and what he learns when people use it.'

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name}: a working record`,
    template: `%s · ${site.name}`,
  },
  description,
  openGraph: {
    type: 'website',
    siteName: site.name,
    title: `${site.name}: a working record`,
    description,
    url: site.url,
  },
  twitter: {
    card: 'summary_large_image',
    title: `${site.name}: a working record`,
    description,
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${sans.variable} ${mono.variable} ${display.variable}`}>
      <body className="min-h-dvh antialiased">{children}</body>
    </html>
  )
}
