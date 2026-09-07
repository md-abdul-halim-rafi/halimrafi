'use client'

import { useState } from 'react'
import { useReplay } from '@/demo/useReplay'
import type { RevealMode, ScenarioId } from '@/demo/types'
import { ControlButton } from '@/components/ui/Control'
import { Pause, Play, Reset } from '@/components/ui/icons'
import { playLabel, RESET_LABEL } from '@/demo/labels'
import { useHydrated } from '@/lib/useHydrated'
import { Reserve, ResponseView } from './ResponseView'

const MODES: { id: RevealMode; label: string; hint: string }[] = [
  { id: 'raw', label: 'Raw arrival', hint: 'Every character shown the moment it lands.' },
  {
    id: 'considered',
    label: 'Considered reveal',
    hint: 'Readable units, held formatting, reserved space.',
  },
]

const SCENARIOS: { id: ScenarioId; label: string }[] = [
  { id: 'normal', label: 'Normal' },
  { id: 'delayed', label: 'Delayed tool result' },
]

function Segmented<T extends string>({
  legend,
  options,
  value,
  onChange,
  disabled,
}: {
  legend: string
  options: { id: T; label: string }[]
  value: T
  onChange: (id: T) => void
  disabled: boolean
}) {
  return (
    <fieldset className="min-w-0">
      <legend className="label mb-2">{legend}</legend>
      <div className="inline-flex flex-wrap gap-1 rounded-[var(--r-pill)] bg-sunk p-1">
        {options.map((option) => {
          const selected = option.id === value
          return (
            <button
              key={option.id}
              type="button"
              disabled={disabled}
              aria-pressed={selected}
              onClick={() => onChange(option.id)}
              className={[
                'trim-cap rounded-[var(--r-pill)] px-3 py-1.5 text-[0.8125rem]',
                'transition-[background-color,color,box-shadow] duration-200 [transition-timing-function:var(--ease-out-quint)]',
                'disabled:cursor-not-allowed disabled:opacity-45',
                selected
                  ? 'bg-surface font-medium text-ink-12 shadow-[var(--ring-hairline)]'
                  : 'text-muted hover:text-ink-12',
              ].join(' ')}
            >
              {option.label}
            </button>
          )
        })}
      </div>
    </fieldset>
  )
}

type DemoState = 'idle' | 'waiting' | 'playing' | 'paused' | 'complete'

/**
 * The states the visitor can be in, shown rather than inferred.
 *
 * `idle` and `complete` both display the finished answer, but they are not the
 * same thing to a reader: one is the resting frame they have not played yet, the
 * other is a run that has just ended. Labelling both "Complete" beside a Play
 * button read as a contradiction.
 */
function StatusChip({ state }: { state: DemoState }) {
  const copy = {
    idle: { text: 'Finished answer', tone: 'text-muted' },
    waiting: { text: 'Waiting on the record', tone: 'text-signal' },
    playing: { text: 'Playing', tone: 'text-ink-12' },
    paused: { text: 'Paused', tone: 'text-ink-12' },
    complete: { text: 'Complete', tone: 'text-muted' },
  }[state]

  return (
    <span className="inline-flex items-center gap-1.5">
      <span
        aria-hidden
        className={[
          'size-1.5 rounded-full',
          state === 'playing'
            ? 'bg-signal'
            : state === 'waiting'
              ? 'bg-signal/50'
              : state === 'paused'
                ? 'bg-ink-8'
                : 'bg-ink-6',
        ].join(' ')}
      />
      <span className={`label ${copy.tone}`}>{copy.text}</span>
    </span>
  )
}

export function StreamingDemo() {
  const [mode, setMode] = useState<RevealMode>('considered')
  const [scenario, setScenario] = useState<ScenarioId>('normal')
  const replay = useReplay(mode, scenario)
  const ready = useHydrated()

  const activeMode = MODES.find((m) => m.id === mode)!

  const waiting = replay.state.segments.some(
    (segment) =>
      segment.kind === 'widget' && segment.state.status === 'pending' && segment.state.overdue,
  )
  const state: DemoState = waiting
    ? 'waiting'
    : replay.status === 'playing'
      ? 'playing'
      : replay.status === 'paused'
        ? 'paused'
        : replay.status === 'complete'
          ? 'complete'
          : 'idle'

  const statusText = {
    idle: 'Showing the finished answer. Press play to watch it arrive.',
    waiting: 'Still waiting on the account record.',
    playing: 'Playing the response.',
    paused: 'Paused.',
    complete: 'Playback complete.',
  }[state]

  return (
    <section
      className="overflow-hidden rounded-[var(--r-lg)] border border-[color:var(--hairline)] bg-surface shadow-[var(--card-shadow)]"
      aria-label="Streaming response demonstration"
    >
      <header className="flex flex-wrap items-center justify-between gap-x-5 gap-y-2 border-b border-[color:var(--hairline)] px-4 py-3 sm:px-6">
        <p className="label">Interactive prototype using simulated data</p>
        <StatusChip state={state} />
      </header>

      <div className="flex flex-wrap items-end gap-x-8 gap-y-5 px-4 py-5 sm:px-6">
        <Segmented
          legend="Reveal"
          options={MODES}
          value={mode}
          onChange={setMode}
          disabled={!ready}
        />
        <Segmented
          legend="Scenario"
          options={SCENARIOS}
          value={scenario}
          onChange={setScenario}
          disabled={!ready}
        />

        <fieldset className="min-w-0">
          <legend className="label mb-2">Playback</legend>
          <div className="ctl-row flex gap-2.5">
            <ControlButton
              variant="primary"
              disabled={!ready}
              onClick={replay.isPlaying ? replay.pause : replay.play}
              icon={replay.isPlaying ? <Pause /> : <Play />}
            >
              {playLabel(replay.status)}
            </ControlButton>
            <ControlButton
              variant="quiet"
              disabled={!ready || replay.atRest}
              onClick={replay.reset}
              icon={<Reset />}
            >
              {RESET_LABEL}
            </ControlButton>
          </div>
        </fieldset>
      </div>

      <p className="px-4 pb-4 text-[0.8125rem] text-muted sm:px-6">{activeMode.hint}</p>

      {/*
        The transcript holds the height of the finished answer from the start, so
        nothing scrolls inside the panel and nothing below it moves during
        playback. The controls sit above it in normal flow and never cover it.
      */}
      <div
        role="region"
        aria-label="Response transcript"
        className="border-t border-[color:var(--hairline)] bg-[color:var(--ink-1)] px-4 py-5 sm:px-6 sm:py-6"
      >
        <Reserve ghost={<ResponseView state={replay.completed} />}>
          <ResponseView state={replay.state} />
        </Reserve>
      </div>

      <p className="sr-only" role="status">
        {statusText}
      </p>

      <noscript>
        <p className="border-t border-[color:var(--hairline)] px-4 py-3 text-[0.8125rem] text-muted sm:px-6">
          The completed answer is shown above. Playback needs JavaScript.
        </p>
      </noscript>
    </section>
  )
}
