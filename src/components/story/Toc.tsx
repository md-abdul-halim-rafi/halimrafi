'use client'

import { useEffect, useRef, useState } from 'react'

export type TocSection = { id: string; title: string }

/**
 * The reading rail.
 *
 * It hangs in the page's left margin rather than taking a grid column. When it
 * took a column, the article was pushed off centre and its text stopped four
 * hundred pixels short of the rules beneath it, which read as a broken layout
 * rather than a wide one. The reading column keeps the page's own measure now,
 * and the rail sits beside it in space that was empty anyway.
 *
 * It only appears where there is margin to hang in: the column is 58rem and
 * the rail hangs 13rem to its left, so it needs 84rem of viewport before it
 * clears the left edge. Below that it is not rendered at all, so there is
 * nothing hidden left in the tab order, and nothing hanging off the page.
 */
export function Toc({ sections, containerId = 'article' }: { sections: TocSection[]; containerId?: string }) {
  const [active, setActive] = useState(sections[0]?.id)
  const navRef = useRef<HTMLElement>(null)
  const cursorRef = useRef<HTMLSpanElement>(null)
  const ticking = useRef(false)

  // The cursor rides as a direct DOM write, so scrolling does not push a state
  // update through React on every frame.
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

  return (
    <div className="pointer-events-none absolute inset-y-0 left-0 hidden -translate-x-[13rem] [@media(min-width:84rem)]:block">
      <nav
        ref={navRef}
        aria-label="Contents"
        className="pointer-events-auto sticky top-8 w-[11rem]"
      >
        <p className="label mb-3.5">Contents</p>
        <div className="relative">
          <span
            ref={cursorRef}
            aria-hidden
            className="absolute -left-3.5 top-0 h-3.5 w-px bg-signal transition-transform duration-300 [transition-timing-function:var(--ease-out-quint)]"
          />
          <ol className="space-y-2.5">
            {sections.map((section) => (
              <li key={section.id}>
                <a
                  href={`#${section.id}`}
                  aria-current={active === section.id ? 'true' : undefined}
                  className={[
                    'block text-[0.8125rem] leading-[1.35] transition-colors duration-200',
                    '[transition-timing-function:var(--ease-out-quint)]',
                    active === section.id ? 'text-ink-12' : 'text-muted hover:text-ink-12',
                  ].join(' ')}
                >
                  {section.title}
                </a>
              </li>
            ))}
          </ol>
        </div>
      </nav>
    </div>
  )
}
