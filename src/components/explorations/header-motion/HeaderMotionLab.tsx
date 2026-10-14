'use client'

import { useCallback, useState } from 'react'
import { flushSync } from 'react-dom'

/**
 * Choosing how the bar answers a navigation.
 *
 * Three behaviours, driven by the real header markup and the real stylesheet.
 * Nothing here is imported by the site, and every rule it relies on is scoped
 * to `html[data-motion]`, which only this page sets.
 *
 * The interesting part is that one naming scheme will not do.
 *
 * Between the front page and an inner page the labels are the same labels in
 * different places, so they are named by identity and travel: Writing leaves
 * the centre for the trail, Photography and Email go to the right edge, Home
 * and the separator fade in behind them.
 *
 * Between two inner pages they would swap sides — Writing from the trail to
 * the right, Photography from the right to the trail — and named by identity
 * they would cross each other in the middle, which reads as two labels
 * fighting rather than one page becoming another. So that navigation names the
 * *slots* instead: the trail's section and the nav's first item each stay put
 * and change what they say. Email is named the same on both sides and does not
 * move at all.
 *
 * Between an archive and an article the bar is already correct, so nothing
 * runs. The cheapest animation is the one that is not played.
 */

type Page = 'home' | 'writing' | 'article' | 'photographs'
type Mode = 'off' | 'fade' | 'recommended'
type Arrangement = 'breadcrumb' | 'stable'
type Scheme = 'identity' | 'slot' | 'bar'

const MODES: { id: Mode; name: string; note: string }[] = [
  { id: 'off', name: 'Off', note: 'the layout changes immediately — what the site does today' },
  {
    id: 'fade',
    name: 'Subtle fade',
    note: 'the bar alone fades between its two states; no label travels, and the page underneath still changes instantly',
  },
  {
    id: 'recommended',
    name: 'Recommended',
    note: 'shared labels travel between the centred and inner arrangements at 220ms; two inner pages exchange their labels in place at 120ms; an article does not replay it',
  },
]

/* Which section a page belongs to. Writing and an article share one, which is
   why moving between them changes nothing in the bar. */
const sectionOf = (p: Page) => (p === 'photographs' ? 'photographs' : p === 'home' ? null : 'writing')

/* What the bar would render. Two pages that produce the same string have
   nothing to animate between. */
const stateOf = (p: Page, a: Arrangement) =>
  a === 'stable'
    ? `${p === 'home' ? 'no-home' : 'home'}:${sectionOf(p) ?? 'none'}`
    : p === 'home'
      ? 'centred'
      : `trail-${sectionOf(p)}`

function schemeFor(from: Page, to: Page, mode: Mode, a: Arrangement): Scheme | null {
  if (stateOf(from, a) === stateOf(to, a)) return null // the bar is already right
  if (mode === 'fade') return 'bar'
  // Nothing moves in the stable arrangement, so identity naming is all it
  // needs: the groups resolve to a translation of zero and what is left is
  // Home arriving and the active label changing colour.
  if (a === 'stable') return 'identity'
  return from === 'home' || to === 'home' ? 'identity' : 'slot'
}

const supportsVT = () =>
  typeof document !== 'undefined' && typeof document.startViewTransition === 'function'

export function HeaderMotionLab() {
  const [page, setPage] = useState<Page>('home')
  const [mode, setMode] = useState<Mode>('recommended')
  const [arrangement, setArrangement] = useState<Arrangement>('stable')
  const [ms, setMs] = useState(220)
  // The scheme in force for the transition being captured right now. It has to
  // be painted onto the old DOM before the snapshot is taken, which is why it
  // is state rather than something computed inside the callback.
  const [scheme, setScheme] = useState<Scheme | null>(null)

  const go = useCallback(
    (next: Page) => {
      if (next === page) return
      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      const s = schemeFor(page, next, mode, arrangement)

      if (mode === 'off' || reduced || s === null || !supportsVT()) {
        setPage(next)
        return
      }

      const root = document.documentElement
      flushSync(() => setScheme(s)) // name the old DOM, then capture it
      root.dataset.motion = mode
      root.dataset.scheme = s
      root.dataset.arrangement = arrangement
      root.style.setProperty('--lab-ms', `${ms}ms`)

      const t = document.startViewTransition(() => {
        flushSync(() => setPage(next))
      })
      void t.finished.finally(() => {
        setScheme(null)
        delete root.dataset.motion
        delete root.dataset.scheme
        delete root.dataset.arrangement
      })
    },
    [mode, ms, page, arrangement],
  )

  /* A name is only attached while a transition is being captured, so the bar
     carries no transition state at rest. */
  const vt = (identity: string, slot: string) => {
    if (!scheme) return undefined
    if (scheme === 'bar') return undefined
    return { viewTransitionName: scheme === 'identity' ? identity : slot } as const
  }
  const barVt = scheme === 'bar' ? ({ viewTransitionName: 'lab-bar' } as const) : undefined

  const nav = (
    target: Page,
    label: string,
    style?: React.CSSProperties,
    out = false,
    active = false,
  ) => (
    <button
      type="button"
      onClick={() => go(target)}
      style={style}
      aria-current={active ? 'page' : undefined}
      className={`site-nav-link${out ? ' site-nav-link--out' : ''}${active ? ' site-nav-link--here' : ''}`}
    >
      {label}
    </button>
  )

  const here = sectionOf(page)

  const onPhotographs = page === 'photographs'
  const sectionLabel = onPhotographs ? 'Photography' : 'Writing'
  const otherLabel = onPhotographs ? 'Writing' : 'Photography'
  const otherTarget: Page = onPhotographs ? 'writing' : 'photographs'

  return (
    <div className="min-h-dvh bg-paper">
      <div className="site-header" style={{ position: 'static' }}>
        {arrangement === 'stable' ? (
          /*
            The same three labels, in the same order, in the same place, on
            every page. Home joins them on an inner page without moving them:
            the outer grid tracks are equal, so the middle one is centred on
            the page whatever sits beside it.
          */
          <div style={barVt} className="site-header-inner lab-bar-stable">
            <div>
              {page === 'home'
                ? null
                : nav('home', 'Home', vt('lab-home', 'lab-home'))}
            </div>
            <nav aria-label="Site" className="site-nav">
              {nav('writing', 'Writing', vt('lab-writing', 'lab-writing'), false, here === 'writing')}
              {nav(
                'photographs',
                'Photography',
                vt('lab-photographs', 'lab-photographs'),
                false,
                here === 'photographs',
              )}
              {nav(page, 'Email', vt('lab-email', 'lab-email'), true)}
            </nav>
            <div />
          </div>
        ) : (
          <div
            style={barVt}
            className={`site-header-inner${page === 'home' ? ' site-header-inner--center' : ''}`}
          >
            {page === 'home' ? (
              <nav aria-label="Site" className="site-nav">
                {nav('writing', 'Writing', vt('lab-writing', 'lab-writing'))}
                {nav('photographs', 'Photography', vt('lab-photographs', 'lab-photographs'))}
                {nav('home', 'Email', vt('lab-email', 'lab-email'), true)}
              </nav>
            ) : (
              <>
                <nav aria-label="Breadcrumb" className="site-trail">
                  <ol>
                    <li>{nav('home', 'Home', vt('lab-home', 'lab-home'))}</li>
                    <li>
                      <span
                        aria-hidden
                        className="site-trail-mark"
                        style={vt('lab-slash', 'lab-slash')}
                      >
                        /
                      </span>
                      <span
                        className="site-nav-here"
                        style={vt(
                          onPhotographs ? 'lab-photographs' : 'lab-writing',
                          'lab-trail-section',
                        )}
                      >
                        {sectionLabel}
                      </span>
                    </li>
                  </ol>
                </nav>
                <nav aria-label="Site" className="site-nav">
                  {nav(
                    otherTarget,
                    otherLabel,
                    vt(onPhotographs ? 'lab-writing' : 'lab-photographs', 'lab-nav-slot'),
                  )}
                  {nav(page, 'Email', vt('lab-email', 'lab-email'), true)}
                </nav>
              </>
            )}
          </div>
        )}
      </div>

      <main className="mx-auto w-full max-w-[58rem] px-6 pb-24 pt-14 sm:px-10">
        {arrangement === 'stable' && page === 'article' ? (
          <p className="mb-6">
            <button type="button" onClick={() => go('writing')} className="lab-backline">
              <span aria-hidden>&larr;</span>
              <span>All writing</span>
            </button>
          </p>
        ) : null}
        <p className="label">
          {page === 'home' ? 'Front page' : page === 'article' ? 'Article' : sectionLabel}
        </p>
        <h1 className="article-title mt-4">
          {page === 'home'
            ? 'I’m Rafi.'
            : page === 'writing'
              ? 'Writing'
              : page === 'article'
                ? 'Your agent’s knowledge base is not a retrieval problem'
                : 'Photographs'}
        </h1>
        <p className="article-summary">
          The bar above is the real one. Press its labels to navigate, and use Open an article to
          reach the case the bar should ignore.
        </p>

        <p className="mt-6 flex flex-wrap gap-2.5">
          <button type="button" onClick={() => go('writing')} className="lab-chip">
            Writing
          </button>
          <button type="button" onClick={() => go('article')} className="lab-chip">
            Open an article
          </button>
          <button type="button" onClick={() => go('photographs')} className="lab-chip">
            Photography
          </button>
          <button type="button" onClick={() => go('home')} className="lab-chip">
            Home
          </button>
        </p>

        <div className="mt-12 border-t border-[color:var(--hairline)] pt-7">
          <p className="label">Arrangement</p>
          <div className="mt-3 flex flex-wrap gap-2.5">
            {(
              [
                ['stable', 'Stable'],
                ['breadcrumb', 'Breadcrumb'],
              ] as [Arrangement, string][]
            ).map(([id, name]) => (
              <button
                key={id}
                type="button"
                onClick={() => setArrangement(id)}
                aria-pressed={arrangement === id}
                className="lab-chip"
              >
                {name}
              </button>
            ))}
          </div>
          <p className="mt-3 max-w-[60ch] text-[0.9375rem] leading-[1.6] text-muted">
            {arrangement === 'stable'
              ? 'Writing, Photography and Email hold one centred position on every page. Home joins them on the left without moving them, the section you are in is a shade darker with a solid underline, and an article carries its way back above the title instead of in the bar.'
              : 'The bar becomes a trail on an inner page: Home / Writing on the left, the rest at the right edge. The labels travel between the two arrangements.'}
          </p>

          <p className="label mt-8">Behaviour</p>
          <div className="mt-3 flex flex-wrap gap-2.5">
            {MODES.map((m) => (
              <button
                key={m.id}
                type="button"
                onClick={() => setMode(m.id)}
                aria-pressed={mode === m.id}
                className="lab-chip"
              >
                {m.name}
              </button>
            ))}
          </div>
          <p className="mt-3 max-w-[60ch] text-[0.9375rem] leading-[1.6] text-muted">
            {MODES.find((m) => m.id === mode)?.note}
          </p>

          {mode === 'recommended' ? (
            <>
              <p className="label mt-8">Duration of the travelling step</p>
              <div className="mt-3 flex flex-wrap gap-2.5">
                {[160, 220, 300].map((d) => (
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
            </>
          ) : null}

          <p className="mt-8 max-w-[60ch] text-[0.9375rem] leading-[1.6] text-muted">
            {arrangement === 'stable'
              ? 'Nothing travels: the only changes are Home arriving and the active label darkening. Writing to an article changes no part of the bar, so nothing runs at all. '
              : 'Writing to Photography exchanges the two labels where they stand, at 120ms, so nothing crosses the bar. Writing to an article changes no part of the bar, so nothing runs. '}
            The background, the divider and the height never move, and the page beneath changes
            immediately in every mode. This browser{' '}
            <strong className="text-ink-12">{supportsVT() ? 'supports' : 'does not support'}</strong>{' '}
            the View Transitions API; without it, and under reduced motion, every mode behaves as
            Off.
          </p>
        </div>
      </main>
    </div>
  )
}
