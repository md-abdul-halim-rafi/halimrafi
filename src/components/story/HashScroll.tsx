'use client'

import { useEffect } from 'react'

/**
 * Scrolls to the fragment on initial load.
 *
 * Arriving at /work/slug#a-section left the page at the top: the browser
 * attempts the fragment scroll before the layout has settled, and with fonts
 * still swapping it gives up at zero. In-page hash changes were unaffected,
 * which is why this only shows up on a shared or reloaded deep link.
 *
 * Waiting for `document.fonts.ready` means the target is measured at its final
 * position. scrollIntoView honours scroll-margin-top, so the heading clears the
 * sticky header rather than landing underneath it, and reduced motion gets a
 * jump instead of a glide.
 */
export function HashScroll() {
  useEffect(() => {
    const id = decodeURIComponent(window.location.hash.slice(1))
    if (!id) return

    let cancelled = false
    const go = () => {
      if (cancelled) return
      const target = document.getElementById(id)
      if (!target) return
      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      target.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' })
    }

    if (document.fonts?.status === 'loaded') go()
    else void document.fonts?.ready.then(go)

    return () => {
      cancelled = true
    }
  }, [])

  return null
}
