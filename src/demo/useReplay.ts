'use client'

import { useMemo } from 'react'
import { keyframesFor, useKeyframeClock, type ClockStatus } from './clock'
import { durationOf, eventsFor } from './fixtures'
import { project } from './project'
import type { ResponseState, RevealMode, ScenarioId } from './types'

export type ReplayStatus = ClockStatus

export type Replay = {
  state: ResponseState
  /** The finished answer, used to hold space so playback shifts nothing. */
  completed: ResponseState
  status: ReplayStatus
  elapsed: number
  duration: number
  play: () => void
  pause: () => void
  reset: () => void
  isPlaying: boolean
  atRest: boolean
}

/** The full demonstration: one mode at a time, all controls, used in the case study. */
export function useReplay(mode: RevealMode, scenario: ScenarioId): Replay {
  const events = useMemo(() => eventsFor(scenario), [scenario])
  const duration = useMemo(() => durationOf(events), [events])
  const keyframes = useMemo(() => keyframesFor(events, duration), [events, duration])

  // At rest the demo shows the finished answer: useful with no interaction, and
  // identical on the server and the client so hydration has nothing to reconcile.
  const clock = useKeyframeClock({
    keyframes,
    duration,
    restingAt: duration,
    resetKey: `${mode}:${scenario}`,
  })

  const state = useMemo(
    () => project(events, clock.elapsed, mode, duration),
    [events, clock.elapsed, mode, duration],
  )

  const completed = useMemo(
    () => project(events, duration, mode, duration),
    [events, duration, mode],
  )

  return { ...clock, state, completed, duration }
}
