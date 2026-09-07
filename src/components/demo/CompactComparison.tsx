'use client'

import Link from 'next/link'
import { useMemo } from 'react'
import { keyframesFor, useKeyframeClock } from '@/demo/clock'
import { durationOf, eventsFor } from '@/demo/fixtures'
import { project } from '@/demo/project'
import { ControlButton } from '@/components/ui/Control'
import { ArrowRight, Pause, Play, Restart } from '@/components/ui/icons'
import { useHydrated } from '@/lib/useHydrated'
import { Reserve, ResponseView } from './ResponseView'

/**
 * The moment the point makes itself: the stream has opened a bold span and the
 * closing marker is still in flight. Raw arrival shows the syntax; considered
 * reveal is still holding the line back. Frozen here so the comparison reads
 * before anyone touches a control.
 */
const TELLING_FRAME = 950

/**
 * The compact comparison stops once the list has landed, before the tool call.
 * Two panes only read as a comparison if both fit on screen at once, which they
 * cannot on a phone if they replay the whole answer. The full stream, the record
 * and the delayed scenario live in the case study.
 */
const COMPARISON_END = 1700

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

export function CompactComparison({ href }: { href: string }) {
  const events = useMemo(() => eventsFor('normal'), [])
  const keyframes = useMemo(
    () => keyframesFor(events, durationOf(events)).filter((mark) => mark <= COMPARISON_END),
    [events],
  )

  const clock = useKeyframeClock({
    keyframes,
    duration: COMPARISON_END,
    restingAt: TELLING_FRAME,
    resetKey: 'compact',
  })

  const ready = useHydrated()
  const playing = clock.isPlaying
  // After completion the control restarts from zero, so it says so.
  const label = playing
    ? 'Pause'
    : clock.status === 'paused'
      ? 'Resume'
      : clock.status === 'complete'
        ? 'Play again'
        : 'Play both'

  return (
    <figure className="m-0">
      <div className="grid gap-px overflow-hidden rounded-[var(--r-md)] bg-[color:var(--hairline)] lg:grid-cols-2">
        {PANES.map((pane) => (
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
              <Reserve
                ghost={
                  <ResponseView state={project(events, COMPARISON_END, pane.mode, COMPARISON_END)} />
                }
              >
                <ResponseView state={project(events, clock.elapsed, pane.mode, COMPARISON_END)} />
              </Reserve>
            </div>
            <p className="mt-auto flex items-center border-t border-[color:var(--hairline)] px-4 py-2 text-[0.8125rem] leading-snug text-muted lg:min-h-[2.75rem] lg:py-2.5">
              {pane.caption}
            </p>
          </div>
        ))}
      </div>

      <figcaption className="mt-4 flex flex-wrap items-center justify-between gap-x-6 gap-y-3">
        <p className="label">Interactive prototype using simulated data</p>

        <div className="ctl-row flex items-center gap-2.5">
          <ControlButton
            variant="primary"
            disabled={!ready}
            onClick={playing ? clock.pause : clock.play}
            icon={playing ? <Pause /> : <Play />}
          >
            {label}
          </ControlButton>
          {clock.status !== 'idle' ? (
            <ControlButton
              variant="quiet"
              disabled={!ready}
              onClick={clock.restart}
              icon={<Restart />}
            >
              Restart
            </ControlButton>
          ) : (
            <Link
              href={href}
              className="group inline-flex items-center gap-1.5 text-[0.875rem] font-medium text-signal"
            >
              <span className="trim-cap">Open the decision</span>
              <span className="icon-slot">
                <span>
                  <ArrowRight />
                </span>
              </span>
            </Link>
          )}
        </div>
      </figcaption>
    </figure>
  )
}
