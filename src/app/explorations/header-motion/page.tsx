import type { Metadata } from 'next'
import { HeaderMotionLab } from '@/components/explorations/header-motion/HeaderMotionLab'

export const metadata: Metadata = {
  title: 'Header motion',
  robots: { index: false, follow: false },
}

/**
 * A bench for choosing how the header should move between pages.
 *
 * It drives the real header markup and the real stylesheet through the three
 * mechanisms under consideration, so the comparison is of the thing itself
 * rather than of a drawing of it. Nothing here is imported by the site.
 */
export default function HeaderMotionPage() {
  return <HeaderMotionLab />
}
