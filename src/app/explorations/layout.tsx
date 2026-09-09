import type { Metadata } from 'next'

/**
 * Visual explorations, kept out of the site's navigation and out of search.
 * These are for comparison only; nothing here links back into the live pages
 * and nothing in the live pages links here.
 */
export const metadata: Metadata = {
  robots: { index: false, follow: false, nocache: true },
}

export default function ExplorationsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
