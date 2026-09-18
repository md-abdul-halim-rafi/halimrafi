'use client'

import { useCallback, useEffect, useRef, useState } from 'react'

export type Section = { id: string; title: string }

/**
 * Contents navigation, in two forms of the same list.
 *
 * Wide: a rail hanging in the margin beside the centred reading column, quiet
 * enough to stay secondary to the article. Narrow, or zoomed in, where there is
 * no margin to hang in: a closed `<details>` above the article. One component,
 * because two would drift and because the active-section tracking is the same
 * work either way.
 *
 * The rail's breakpoint is derived rather than guessed. It needs half the
 * article column, plus the rail, plus the gap, plus a page margin, on each side
 * of centre — 76rem in total. Below that it is not rendered at all, so nothing
 * hangs off the page edge and nothing invisible sits in the tab order. Browser
 * zoom shrinks the viewport in CSS pixels, so zooming past roughly 150% hands
 * the reader the disclosure instead of a rail crushed against the text.
 */
export function Contents({ sections, containerId = 'article' }: { sections: Section[]; containerId?: string }) {
  const [active, setActive] = useState(sections[0]?.id)
  const navRef = useRef<HTMLElement>(null)
  const cursorRef = useRef<HTMLSpanElement>(null)
  const detailsRef = useRef<HTMLDetailsElement>(null)
  const ticking = useRef(false)

  // The cursor is written straight to the DOM so scrolling does not push a
  // state update through React on every frame.
  useEffect(() => {
    const nav = navRef.current
    const cursor = cursorRef.current
    if (!nav || !cursor) return
    const el = nav.querySelector<HTMLAnchorElement>(`[href="#${active}"]`)
    if (el) cursor.style.transform = `translateY(${el.offsetTop + 5}px)`
  }, [active])

  useEffect(() => {
    const article = document.getElementById(containerId)
    if (!article) return

    const onScroll = () => {
      if (ticking.current) return
      ticking.current = true
      requestAnimationFrame(() => {
        ticking.current = false
        // A third of the way down the viewport, so the indicator changes when a
        // heading reaches the reading position rather than the moment it
        // appears at the bottom edge.
        const line = window.innerHeight * 0.34
        let current = sections[0]?.id
        for (const section of sections) {
          const el = document.getElementById(section.id)
          if (el && el.getBoundingClientRect().top <= line) current = section.id
        }
        setActive(current)
      })
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [sections, containerId])

  /**
   * Smooth scrolling lives here rather than on the document.
   *
   * `html { scroll-behavior: smooth }` applied to every scroll the page makes,
   * including the one the router performs on navigation — so opening an article
   * showed the middle of it gliding upward for half a second. The root is back
   * to instant and the glide belongs to the one interaction that wanted it.
   *
   * The link keeps its href, so middle-click, copy-link and keyboard all behave
   * normally; the fragment is pushed so the URL and the Back button stay right.
   */
  const jump = useCallback((event: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) return
    const target = document.getElementById(id)
    if (!target) return
    event.preventDefault()

    // Close first, then scroll. Closing afterwards removed the open list from
    // the flow while the reader was already past it, which pulled the whole
    // article up by the list's height and left the target some two hundred
    // pixels above the top of the screen. Scrolling into a settled layout is
    // the only way the landing position means anything.
    detailsRef.current?.removeAttribute('open')

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    target.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' })
    history.pushState(null, '', `#${id}`)
    // Keep the heading reachable by keyboard from where the reader now is.
    target.setAttribute('tabindex', '-1')
    target.focus({ preventScroll: true })
  }, [])

  const link = (id: string, extra: string) =>
    [
      'block transition-colors duration-200 [transition-timing-function:var(--ease-out-quint)]',
      active === id ? 'text-ink-12' : 'text-muted hover:text-ink-12',
      extra,
    ].join(' ')

  return (
    <>
      {/* Narrow and zoomed-in. Closed by default: it is a way back to a
          section, not an introduction to the article. */}
      <details ref={detailsRef} className="contents-disclosure [@media(min-width:76rem)]:hidden">
        <summary className="label flex min-h-11 cursor-pointer list-none items-center gap-2">
          <span className="contents-caret" aria-hidden>
            &rsaquo;
          </span>
          On this page
        </summary>
        <ol className="mt-1 space-y-2.5 pb-1 pl-5">
          {sections.map((section) => (
            <li key={section.id}>
              <a
                href={`#${section.id}`}
                onClick={(event) => jump(event, section.id)}
                aria-current={active === section.id ? 'true' : undefined}
                className={link(section.id, 'text-[0.875rem] leading-[1.4]')}
              >
                {section.title}
              </a>
            </li>
          ))}
        </ol>
      </details>

      {/* Wide. `pointer-events-none` on the hanger so the empty margin above
          and below the rail never intercepts a click meant for the page. */}
      <div className="contents-rail">
        <nav ref={navRef} aria-label="Contents" className="contents-rail-inner">
          <p className="label mb-3.5">Contents</p>
          <div className="relative">
            <span
              ref={cursorRef}
              aria-hidden
              className="absolute -left-3.5 top-0 h-3.5 w-px bg-signal transition-transform duration-300 [transition-timing-function:var(--ease-out-quint)] motion-reduce:transition-none"
            />
            <ol className="space-y-2.5">
              {sections.map((section) => (
                <li key={section.id}>
                  <a
                    href={`#${section.id}`}
                    onClick={(event) => jump(event, section.id)}
                    aria-current={active === section.id ? 'true' : undefined}
                    className={link(section.id, 'text-[0.8125rem] leading-[1.35]')}
                  >
                    {section.title}
                  </a>
                </li>
              ))}
            </ol>
          </div>
        </nav>
      </div>
    </>
  )
}
