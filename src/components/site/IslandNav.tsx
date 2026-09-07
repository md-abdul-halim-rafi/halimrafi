'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { site } from '@/lib/site'

/**
 * A floating nav that becomes useful once the opening has left.
 *
 * Its appearance follows the content: an observer watches a sentinel at the
 * bottom of the opening, so the nav arrives exactly when the opening stops
 * being on screen rather than at an arbitrary scroll offset.
 *
 * While hidden it is `inert` and `visibility: hidden`, so it is out of the tab
 * order instead of leaving invisible focus stops in the page.
 */
export function IslandNav() {
  const pathname = usePathname()
  const onHome = pathname === '/'
  // Set only from the observer callback. Whether the nav is shown is derived,
  // so the effect never writes state synchronously during render.
  const [pastOpening, setPastOpening] = useState(false)

  useEffect(() => {
    if (!onHome) return
    const sentinel = document.getElementById('opening-end')
    if (!sentinel) return
    const observer = new IntersectionObserver(
      ([entry]) => setPastOpening(!entry.isIntersecting && entry.boundingClientRect.top < 0),
      { threshold: 0 },
    )
    observer.observe(sentinel)
    return () => observer.disconnect()
  }, [onHome])

  const shown = !onHome || pastOpening

  return (
    <div
      // `inert` is a real attribute in React 19; it removes the subtree from
      // the tab order and from assistive technology while the nav is away.
      inert={!shown}
      className="pointer-events-none fixed inset-x-0 top-0 z-40 flex justify-center px-4 pt-3 sm:pt-4"
      style={{
        opacity: shown ? 1 : 0,
        transform: shown ? 'translateY(0)' : 'translateY(-10px)',
        visibility: shown ? 'visible' : 'hidden',
        transition:
          'opacity 260ms var(--ease-out-quint), transform 260ms var(--ease-out-quint), visibility 260ms',
      }}
    >
      <nav
        aria-label="Site"
        className="pointer-events-auto flex items-center gap-0.5 rounded-[var(--r-pill)] border border-[color:var(--hairline-strong)] bg-[color:color-mix(in_srgb,var(--surface)_94%,transparent)] p-1 shadow-[0_1px_2px_rgba(18,22,27,0.06),0_10px_28px_-14px_rgba(18,22,27,0.32)] backdrop-blur-xl backdrop-saturate-150"
      >
        <Link
          href="/"
          className="link-quiet trim-cap rounded-[var(--r-pill)] px-3 py-1.5 text-[0.8125rem] font-medium"
        >
          {site.name}
        </Link>
        <span aria-hidden className="mx-1 h-4 w-px bg-[color:var(--hairline-strong)]" />
        <Link
          href="/#work"
          className="link-quiet trim-cap rounded-[var(--r-pill)] px-3 py-1.5 text-[0.8125rem]"
        >
          Work
        </Link>
        <Link
          href="/about"
          className="link-quiet trim-cap rounded-[var(--r-pill)] px-3 py-1.5 text-[0.8125rem]"
        >
          About
        </Link>
      </nav>
    </div>
  )
}
