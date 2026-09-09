'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { EXPLORATIONS } from '@/explorations/data'

/**
 * A development-only aid for comparing the three directions.
 *
 * It used to be a bar across the middle of the bottom edge, which put it on top
 * of whatever was being read. Now it is a small control in the bottom right,
 * closed until it is asked for, and not rendered in a production build at all.
 * Nothing in the live pages links to it.
 *
 * The right corner rather than the left: Next's development overlay sits in the
 * bottom left and swallows clicks meant for anything underneath it.
 */
const ENABLED = process.env.NODE_ENV === 'development'

export function Switcher() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  if (!ENABLED) return null

  const current = EXPLORATIONS.find((item) => pathname.startsWith(`/explorations/${item.slug}`))

  return (
    <div className="exploration-switcher fixed bottom-3 right-3 z-40 print:hidden">
      <div className="flex items-center gap-1 rounded-[var(--r-pill)] border border-[color:var(--hairline)] bg-[color:color-mix(in_srgb,var(--surface)_92%,transparent)] p-1 shadow-[0_1px_2px_rgba(18,22,27,0.05)] backdrop-blur-md">
        {/* Rendered only while open, so the closed control holds no hidden tab
            stops behind it. The links unfold to the left of the toggle, which
            keeps the toggle itself in the corner. */}
        {open ? (
          <nav id="exploration-switcher-links" aria-label="Explorations" className="flex gap-0.5">
            {EXPLORATIONS.map((item) => {
              const active = item.slug === current?.slug
              return (
                <Link
                  key={item.slug}
                  href={`/explorations/${item.slug}`}
                  aria-current={active ? 'page' : undefined}
                  className={`trim-cap inline-flex items-center justify-center rounded-[var(--r-pill)] px-2.5 py-1 text-[0.8125rem] transition-colors duration-200 [transition-timing-function:var(--ease-out-quint)] [@media(pointer:coarse)]:min-h-10 ${
                    active ? 'bg-ink-12 font-medium text-ink-1' : 'text-muted hover:text-ink-12'
                  }`}
                >
                  {item.name}
                </Link>
              )
            })}
          </nav>
        ) : null}

        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          aria-controls="exploration-switcher-links"
          title="Exploration directions, development only"
          className="switcher-toggle"
        >
          <span aria-hidden>{open ? '×' : '●'}</span>
          <span className="sr-only">
            {open ? 'Hide exploration directions' : 'Show exploration directions'}
          </span>
        </button>
      </div>
    </div>
  )
}
