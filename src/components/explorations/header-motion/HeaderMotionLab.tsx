'use client'

import { useCallback, useLayoutEffect, useRef, useState } from 'react'
import { flushSync } from 'react-dom'

/**
 * Four ways the header could answer a navigation, driven by the real markup.
 *
 * `none` is what the site does today. `crossfade` dissolves the whole bar.
 * `morph-vt` hands the browser the View Transitions API and lets it work out
 * the movement. `morph-flip` measures the labels before and after and animates
 * the difference by hand, which is the same picture without the API.
 *
 * The two morphs are deliberately the same visual. They differ in who computes
 * it and therefore in which browsers show it, which is the decision this bench
 * exists to make — so it also reports whether the browser reading it supports
 * the native one.
 */

type Page = 'home' | 'writing' | 'photographs'
type Motion = 'none' | 'crossfade' | 'morph-vt' | 'morph-flip'

const LABEL: Record<Page, string> = { home: 'Home', writing: 'Writing', photographs: 'Photography' }

const MOTIONS: { id: Motion; name: string; note: string }[] = [
  { id: 'none', name: 'Off', note: 'what the site does now' },
  { id: 'crossfade', name: 'Crossfade', note: 'the bar dissolves, nothing travels' },
  { id: 'morph-vt', name: 'Morph · View Transitions', note: 'the browser moves the shared labels' },
  { id: 'morph-flip', name: 'Morph · FLIP', note: 'the same movement, measured by hand' },
]

const supportsVT = () =>
  typeof document !== 'undefined' && typeof document.startViewTransition === 'function'

export function HeaderMotionLab() {
  const [page, setPage] = useState<Page>('home')
  const [motion, setMotion] = useState<Motion>('morph-vt')
  const [ms, setMs] = useState(220)

  const barRef = useRef<HTMLDivElement>(null)
  // Where each named label sat before the change, for FLIP to animate from.
  const before = useRef<Map<string, DOMRect>>(new Map())
  const flipping = useRef(false)

  const measure = useCallback(() => {
    const map = new Map<string, DOMRect>()
    barRef.current?.querySelectorAll<HTMLElement>('[data-vt]').forEach((el) => {
      map.set(el.dataset.vt!, el.getBoundingClientRect())
    })
    return map
  }, [])

  const go = useCallback(
    (next: Page) => {
      if (next === page) return
      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

      if (motion === 'none' || reduced) {
        setPage(next)
        return
      }

      if (motion === 'morph-flip') {
        before.current = measure()
        flipping.current = true
        flushSync(() => setPage(next))
        return
      }

      // Both View Transition modes go through the browser; the difference is
      // only which CSS the stylesheet applies to the captured groups.
      if (supportsVT()) {
        document.documentElement.dataset.motion = motion
        document.documentElement.style.setProperty('--lab-ms', `${ms}ms`)
        const t = document.startViewTransition(() => {
          flushSync(() => setPage(next))
        })
        void t.finished.finally(() => {
          delete document.documentElement.dataset.motion
        })
        return
      }
      setPage(next)
    },
    [measure, motion, ms, page],
  )

  // FLIP: the labels are already in their new places, so put them back where
  // they were and let them travel forward.
  useLayoutEffect(() => {
    if (!flipping.current) return
    flipping.current = false
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) return
    barRef.current?.querySelectorAll<HTMLElement>('[data-vt]').forEach((el) => {
      const was = before.current.get(el.dataset.vt!)
      const now = el.getBoundingClientRect()
      if (!was) {
        el.animate([{ opacity: 0 }, { opacity: 1 }], { duration: ms, easing: 'cubic-bezier(.22,1,.36,1)' })
        return
      }
      const dx = was.left - now.left
      const dy = was.top - now.top
      if (Math.abs(dx) < 0.5 && Math.abs(dy) < 0.5) return
      el.animate(
        [{ transform: `translate(${dx}px, ${dy}px)` }, { transform: 'translate(0, 0)' }],
        { duration: ms, easing: 'cubic-bezier(.22,1,.36,1)' },
      )
    })
  }, [page, ms])

  const vt = (name: string) =>
    motion === 'morph-vt' && supportsVT() ? ({ viewTransitionName: name } as const) : undefined

  const link = (target: Page, label: string, name: string, out = false) => (
    <button
      key={name}
      type="button"
      data-vt={name}
      style={vt(name)}
      onClick={() => go(target)}
      className={`site-nav-link${out ? ' site-nav-link--out' : ''}`}
    >
      {label}
    </button>
  )

  const section = page === 'writing' ? 'writing' : page === 'photographs' ? 'photographs' : null
  const elsewhere: Page[] = (['writing', 'photographs'] as Page[]).filter((p) => p !== page)

  return (
    <div className="min-h-dvh bg-paper">
      {/* The bar under test, in the site's own markup and styles. */}
      <div ref={barRef} className="site-header" style={{ position: 'static' }}>
        <div className={`site-header-inner${page === 'home' ? ' site-header-inner--center' : ''}`}>
          {page === 'home' ? (
            <nav aria-label="Site" className="site-nav">
              {link('writing', 'Writing', 'writing')}
              {link('photographs', 'Photography', 'photographs')}
              {link('home', 'Email', 'email', true)}
            </nav>
          ) : (
            <>
              <nav aria-label="Breadcrumb" className="site-trail">
                <ol>
                  <li>{link('home', 'Home', 'home')}</li>
                  <li>
                    <span aria-hidden className="site-trail-mark" data-vt="slash" style={vt('slash')}>
                      /
                    </span>
                    <span className="site-nav-here" data-vt={section!} style={vt(section!)}>
                      {LABEL[section!]}
                    </span>
                  </li>
                </ol>
              </nav>
              <nav aria-label="Site" className="site-nav">
                {elsewhere.map((p) => link(p, LABEL[p], p))}
                {link(page, 'Email', 'email', true)}
              </nav>
            </>
          )}
        </div>
      </div>

      {/* The page under it, so the bar is judged in context and not alone. */}
      <main className="mx-auto w-full max-w-[58rem] px-6 pb-24 pt-14 sm:px-10">
        <p className="label">{page === 'home' ? 'Front page' : LABEL[section!]}</p>
        <h1 className="article-title mt-4">
          {page === 'home' ? 'I’m Rafi.' : page === 'writing' ? 'Writing' : 'Photographs'}
        </h1>
        <p className="article-summary">
          Press a label in the bar above to navigate. The bar is the real one — same markup, same
          stylesheet — so what moves here is what would move on the site.
        </p>

        <div className="mt-12 border-t border-[color:var(--hairline)] pt-7">
          <p className="label">Motion</p>
          <div className="mt-3 flex flex-wrap gap-2.5">
            {MOTIONS.map((m) => (
              <button
                key={m.id}
                type="button"
                onClick={() => setMotion(m.id)}
                aria-pressed={motion === m.id}
                className="lab-chip"
              >
                {m.name}
              </button>
            ))}
          </div>
          <p className="mt-3 text-[0.9375rem] text-muted">
            {MOTIONS.find((m) => m.id === motion)?.note}
            {motion === 'morph-vt' && !supportsVT()
              ? ' — your browser has no View Transitions API, so this falls back to an instant swap. That is the fallback the site would ship.'
              : ''}
          </p>

          <p className="label mt-8">Duration</p>
          <div className="mt-3 flex flex-wrap gap-2.5">
            {[160, 220, 300, 420].map((d) => (
              <button
                key={d}
                type="button"
                onClick={() => setMs(d)}
                aria-pressed={ms === d}
                className="lab-chip"
              >
                {d}ms
              </button>
            ))}
          </div>

          <p className="mt-8 text-[0.9375rem] text-muted">
            This browser{' '}
            <strong className="text-ink-12">{supportsVT() ? 'supports' : 'does not support'}</strong>{' '}
            the View Transitions API. Reduced motion is respected in every mode: with it on, every
            option above behaves as Off.
          </p>
        </div>
      </main>
    </div>
  )
}
