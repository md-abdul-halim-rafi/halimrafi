'use client'

import { useRef, useState } from 'react'
import { CompactComparison } from '@/components/demo/CompactComparison'
import { Switcher } from '@/components/explorations/Switcher'
import { PROTOTYPE_CAPTION, person, work } from '@/explorations/data'

/**
 * Workbench.
 *
 * A compact index on the left drives a large preview on the right. The whole
 * character is in the selection: one tab stop for the list, arrow keys to move
 * within it, and a selected row that is unmistakable without shouting.
 *
 * The list is a real tablist. A roving tabindex means Tab reaches the list once
 * and then leaves it, rather than making a keyboard user step through every
 * project to get past the index, which is the usual failure of this layout.
 */
export function WorkbenchExploration() {
  const [selected, setSelected] = useState(work[0].id)
  const tabs = useRef<(HTMLButtonElement | null)[]>([])
  const active = work.find((w) => w.id === selected) ?? work[0]
  const activeIndex = work.findIndex((w) => w.id === selected)

  const move = (delta: number) => {
    const next = (activeIndex + delta + work.length) % work.length
    setSelected(work[next].id)
    tabs.current[next]?.focus()
  }

  const onKeyDown = (event: React.KeyboardEvent) => {
    const keys: Record<string, number> = { ArrowDown: 1, ArrowRight: 1, ArrowUp: -1, ArrowLeft: -1 }
    if (event.key in keys) {
      event.preventDefault()
      move(keys[event.key])
      return
    }
    if (event.key === 'Home') {
      event.preventDefault()
      setSelected(work[0].id)
      tabs.current[0]?.focus()
    }
    if (event.key === 'End') {
      event.preventDefault()
      setSelected(work[work.length - 1].id)
      tabs.current[work.length - 1]?.focus()
    }
  }

  return (
    <div data-explore="workbench" className="min-h-dvh bg-paper text-ink-11">
      <main className="mx-auto max-w-[82rem] px-5 pb-32 pt-10 sm:px-8 sm:pt-14">
        <header className="flex flex-wrap items-baseline justify-between gap-x-10 gap-y-3 border-b border-[color:var(--hairline)] pb-5">
          <h1 className="text-[1.375rem] font-semibold tracking-[-0.022em] text-ink-12">
            {person.name}
          </h1>
          <p className="max-w-[62ch] text-[0.875rem] leading-[1.6] text-ink-10">{person.intro}</p>
        </header>

        <div className="mt-8 grid gap-x-10 gap-y-8 lg:grid-cols-[19rem_minmax(0,1fr)]">
          {/* The index */}
          <div>
            <p className="label mb-3">Projects</p>
            <div
              role="tablist"
              aria-orientation="vertical"
              aria-label="Projects"
              onKeyDown={onKeyDown}
              className="overflow-hidden rounded-lg border border-[color:var(--hairline)] bg-surface"
            >
              {work.map((item, i) => {
                const isActive = item.id === selected
                return (
                  <button
                    key={item.id}
                    ref={(el) => {
                      tabs.current[i] = el
                    }}
                    role="tab"
                    id={`wb-tab-${item.id}`}
                    aria-selected={isActive}
                    aria-controls="wb-panel"
                    tabIndex={isActive ? 0 : -1}
                    onClick={() => setSelected(item.id)}
                    className={`wb-row flex w-full items-start gap-3.5 border-b border-[color:var(--hairline)] px-4 py-3.5 text-left last:border-b-0 ${
                      isActive ? 'is-selected' : ''
                    }`}
                  >
                    <span className="mt-px w-4 shrink-0 font-mono text-[0.6875rem] text-ink-8">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className="min-w-0">
                      <span className="block text-[0.9375rem] font-medium leading-snug text-ink-12">
                        {item.name}
                      </span>
                      <span className="mt-1 block text-[0.8125rem] leading-snug text-ink-9">
                        {item.kind}
                      </span>
                    </span>
                  </button>
                )
              })}
            </div>
            <p className="mt-3 text-[0.75rem] leading-relaxed text-ink-9">
              Arrow keys move through the list.
            </p>
          </div>

          {/* The preview */}
          <div
            role="tabpanel"
            id="wb-panel"
            aria-labelledby={`wb-tab-${active.id}`}
            tabIndex={-1}
            className="min-w-0 rounded-lg border border-[color:var(--hairline)] bg-surface"
          >
            <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2 border-b border-[color:var(--hairline)] px-5 py-4 sm:px-7">
              <h2 className="text-[1.25rem] font-semibold tracking-[-0.02em] text-ink-12">
                {active.name}
              </h2>
              <p className="label">{active.role}</p>
            </div>

            {/* Keyed so a change reads as new content arriving, not text swapping. */}
            <div key={active.id} className="wb-enter px-5 py-6 sm:px-7 sm:py-7">
              <p className="max-w-[62ch] text-[1.0625rem] leading-[1.6] text-ink-12">
                {active.summary}
              </p>

              <dl className="mt-7 grid gap-x-10 gap-y-6 sm:grid-cols-2">
                <div>
                  <dt className="label">The problem</dt>
                  <dd className="mt-2 text-[0.9375rem] leading-[1.65]">{active.problem}</dd>
                </div>
                <div>
                  <dt className="label">My contribution</dt>
                  <dd className="mt-2 text-[0.9375rem] leading-[1.65]">{active.contribution}</dd>
                </div>
              </dl>

              {active.note ? (
                <p className="mt-7 border-l-2 border-[color:var(--signal)] pl-4 text-[0.9375rem] leading-[1.65] text-ink-11">
                  {active.note}
                </p>
              ) : null}

              {active.interactive ? (
                <div className="mt-8 border-t border-[color:var(--hairline)] pt-6">
                  <p className="label mb-3">{PROTOTYPE_CAPTION}</p>
                  <CompactComparison />
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </main>

      <Switcher />
    </div>
  )
}
