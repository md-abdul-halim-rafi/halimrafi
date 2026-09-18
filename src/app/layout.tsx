import type { Metadata } from 'next'
import { Geist_Mono, Instrument_Serif, Inter, Source_Serif_4 } from 'next/font/google'
import { site } from '@/lib/site'
import './globals.css'

/**
 * Four roles, kept strictly separate.
 *
 * Instrument Serif carries the display sizes on the front page, where its high
 * contrast has room to show. Source Serif 4 does the reading inside an article
 * and nowhere else: Instrument Serif is a display face and thins out badly at
 * twenty pixels, while Inter reads as interface rather than as a piece of
 * writing. Inter keeps everything that is interface — navigation, metadata,
 * contents, tables, controls. Geist Mono is technical annotation: dates,
 * labels, timings, code.
 *
 * Source Serif is loaded variable with real italics, because an article's
 * emphasis is genuinely italic and a synthesised slant next to a serif's own
 * is obvious. `font-synthesis-weight: none` on the body means the weights an
 * article asks for have to be real ones, and a variable face has them all.
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

const reading = Source_Serif_4({
  subsets: ['latin'],
  variable: '--font-reading',
  style: ['normal', 'italic'],
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
    <html
      lang="en"
      className={`${sans.variable} ${mono.variable} ${display.variable} ${reading.variable}`}
    >
      <body className="min-h-dvh antialiased">{children}</body>
    </html>
  )
}
