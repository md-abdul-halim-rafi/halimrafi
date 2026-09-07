'use client'

import { useEffect } from 'react'

/**
 * Maps the first screen of scroll onto `--opening` (1 at rest, 0 once the
 * opening has left). Everything that responds to the opening leaving reads
 * that one variable, so there is a single source of truth and a single rAF
 * loop rather than one per effect.
 *
 * Compositor-only consumers: opacity and transform. Nothing here changes
 * layout, so the demo below never reflows while the page scrolls.
 */
export function OpeningDriver() {
  useEffect(() => {
    const root = document.documentElement
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)')
    let frame = 0

    const write = () => {
      frame = 0
      const span = Math.max(window.innerHeight * 0.72, 1)
      const progress = Math.min(Math.max(window.scrollY / span, 0), 1)
      root.style.setProperty('--opening', String(1 - progress))
    }

    const onScroll = () => {
      if (frame) return
      frame = requestAnimationFrame(write)
    }

    const apply = () => {
      if (reduced.matches) {
        // No scroll-linked motion, and the nav is simply always available.
        root.style.setProperty('--opening', '0')
        window.removeEventListener('scroll', onScroll)
        return
      }
      write()
      window.addEventListener('scroll', onScroll, { passive: true })
    }

    apply()
    reduced.addEventListener('change', apply)

    return () => {
      if (frame) cancelAnimationFrame(frame)
      window.removeEventListener('scroll', onScroll)
      reduced.removeEventListener('change', apply)
      root.style.removeProperty('--opening')
    }
  }, [])

  return null
}
