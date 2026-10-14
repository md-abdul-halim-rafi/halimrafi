'use client'

import { useState } from 'react'

export type Annotation = { id: string; marker: string; title: string; body: string }

/**
 * Editorial's interaction: numbered marks on the featured figure that expand a
 * note in place.
 *
 * One note is open at a time, and opening a second closes the first, so the
 * figure never ends up buried under stacked prose. The marks are buttons with
 * `aria-expanded` pointing at the note they control, and the note is a sibling
 * rather than a popover, so nothing is trapped and nothing needs dismissing.
 */
export function Annotations({ items }: { items: Annotation[] }) {
  const [open, setOpen] = useState<string | null>(items[0]?.id ?? null)

  return (
    <div className="mt-6">
      <div className="flex flex-wrap gap-2">
        {items.map((item) => {
          const isOpen = item.id === open
          return (
            <button
              key={item.id}
              type="button"
              aria-expanded={isOpen}
              aria-controls={`note-${item.id}`}
              onClick={() => setOpen(isOpen ? null : item.id)}
              className={`ed-mark ${isOpen ? 'is-open' : ''}`}
            >
              <span className="font-mono text-[0.6875rem]">{item.marker}</span>
              <span className="trim-cap">{item.title}</span>
            </button>
          )
        })}
      </div>

      {items.map((item) => (
        <div
          key={item.id}
          id={`note-${item.id}`}
          hidden={item.id !== open}
          className="ed-note mt-5 max-w-[58ch] border-t border-[color:var(--hairline)] pt-4"
        >
          <p className="text-[1rem] leading-[1.7] text-ink-11">
            <span className="font-mono text-[0.75rem] text-signal">{item.marker}</span>{' '}
            {item.body}
          </p>
        </div>
      ))}
    </div>
  )
}
