'use client'

import { useMemo } from 'react'
import { keyframesFor, useKeyframeClock } from '@/demo/clock'
import { COMPARISON_END, durationOf, eventsFor, PREVIEW_END, previewEvents } from '@/demo/fixtures'
import { project } from '@/demo/project'
import { ControlButton } from '@/components/ui/Control'
import { Pause, Play, Reset } from '@/components/ui/icons'
import {
  COMPARISON_NOTE,
  playLabel,
  WIDEST_PLAY_LABEL,
  PROTOTYPE_CAPTION,
  PROTOTYPE_CAPTION_SENTENCE,
  RESET_LABEL,
} from '@/demo/labels'
import { useHydrated } from '@/lib/useHydrated'
import { Reserve, ResponseView } from './ResponseView'

/**
 * The compact comparison stops once the list has landed, before the tool call.
 * Two panes only read as a comparison if both fit on screen at once, which they
 * cannot on a phone if they replay the whole answer. The full stream, the record
 * and the delayed scenario live in the case study.
 */

const PANES = [
  {
    mode: 'raw' as const,
    title: 'Raw arrival',
    caption: 'Shows whatever has landed, formatting included.',
  },
  {
    mode: 'considered' as const,
    title: 'Considered reveal',
    caption: 'Waits for the line to be readable, then shows it whole.',
  },
]

/**
 * The preview says what each side does in its own label, so it needs no strip
 * of explanation underneath.
 */
const PREVIEW_PANES = [
  { mode: 'raw' as const, title: 'Show each piece', caption: null },
  { mode: 'considered' as const, title: 'Wait for a readable unit', caption: null },
]

export function CompactComparison({
  stacked = false,
  variant = 'full',
}: {
  stacked?: boolean
  /**
   * `full` is the paragraph, the three list items and the record: the version
   * every page has always rendered, and the default, so no existing consumer
   * changes.
   *
   * `preview` is the homepage's: one sentence on its own short fixture, the
   * labels carrying the explanation, one control, and no caption of its own
   * because the page supplies that. It is the same engine and the same clock.
   */
  variant?: 'full' | 'preview'
} = {}) {
  const preview = variant === 'preview'
  const panes = preview ? PREVIEW_PANES : PANES

  const events = useMemo(() => (preview ? previewEvents() : eventsFor('normal')), [preview])
  const end = preview ? PREVIEW_END : COMPARISON_END
  const keyframes = useMemo(
    () => keyframesFor(events, durationOf(events)).filter((mark) => mark <= end),
    [events, end],
  )

  const clock = useKeyframeClock({
    keyframes,
    duration: end,
    // At rest both sides show the finished answer. The difference only exists
    // while the events are arriving, so that is when it is shown.
    restingAt: end,
    resetKey: variant,
  })

  const ready = useHydrated()
  const playing = clock.isPlaying

  return (
    <figure className="m-0">
      <div className={`grid gap-px overflow-hidden rounded-md bg-[color:var(--hairline)] ${stacked ? "" : "lg:grid-cols-2"}`}>
        {panes.map((pane) => (
          <div key={pane.mode} className="flex flex-col bg-surface">
            <div className="flex items-center justify-between gap-3 border-b border-[color:var(--hairline)] px-4 py-2.5">
              <p className="label">{pane.title}</p>
              {pane.mode === 'considered' && playing ? (
                <span className="label text-signal">Holding</span>
              ) : null}
            </div>
            {/* Each pane holds the height it will reach, so playing moves
                nothing on the page. */}
            <div className="px-4 py-3 sm:py-3.5">
              <Reserve ghost={<ResponseView state={project(events, end, pane.mode, end)} />}>
                <ResponseView state={project(events, clock.elapsed, pane.mode, end)} />
              </Reserve>
            </div>
            {pane.caption ? (
              <p className={`mt-auto flex items-center border-t border-[color:var(--hairline)] px-4 py-2 text-[0.8125rem] leading-snug text-muted ${stacked ? "" : "lg:min-h-[2.75rem] lg:py-2.5"}`}>
                {pane.caption}
              </p>
            ) : null}
          </div>
        ))}
      </div>

      <figcaption
        className={`mt-4 flex flex-wrap items-center gap-x-6 gap-y-3 ${
          preview ? 'justify-start' : 'justify-between'
        }`}
      >
        {preview ? null : <p className="label">{PROTOTYPE_CAPTION}</p>}

        <div className="ctl-row flex items-center gap-2.5">
          {/* The label changes as it runs, and the widest wording is the
              resting one, so the button holds that width throughout. Without
              it the button shrank by 87px on the first press and took the
              caption beside it along. */}
          <ControlButton
            variant="primary"
            disabled={!ready}
            onClick={playing ? clock.pause : clock.play}
            icon={playing ? <Pause /> : <Play />}
            reserve={WIDEST_PLAY_LABEL}
          >
            {playLabel(clock.status)}
          </ControlButton>
          {preview ? null : (
            <ControlButton
              variant="quiet"
              disabled={!ready || clock.atRest}
              onClick={clock.reset}
              icon={<Reset />}
            >
              {RESET_LABEL}
            </ControlButton>
          )}
        </div>

        {/* The caption sits in the control's own row on a wide screen and wraps
            under it on a narrow one, which is what the flex-wrap above does
            without a breakpoint. */}
        {preview ? (
          <p className="text-[0.8125rem] leading-[1.5] text-[color:var(--demo-caption)]">
            {PROTOTYPE_CAPTION_SENTENCE}
          </p>
        ) : null}
      </figcaption>

      {preview ? null : (
        <p className="mt-3 max-w-[68ch] text-[0.8125rem] leading-[1.55] text-muted">
          {COMPARISON_NOTE}
        </p>
      )}
    </figure>
  )
}
