'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { WIDGET_WAIT_LIMIT_MS } from './fixtures'
import type { DemoEvent } from './types'

export type ClockStatus = 'idle' | 'playing' | 'paused' | 'complete'

/**
 * Timestamps at which output can actually change: every event, the moment the
 * reserved widget slot admits it is late, and the end of the stream. Scheduling
 * against these keeps playback exact and avoids re-rendering sixty times a
 * second to show the same thing.
 */
export function keyframesFor(events: DemoEvent[], duration: number): number[] {
  const marks = new Set<number>([0, duration])
  for (const event of events) {
    marks.add(event.at)
    if (event.kind === 'tool-call') {
      const overdueAt = event.at + WIDGET_WAIT_LIMIT_MS
      if (overdueAt < duration) marks.add(overdueAt)
    }
  }
  return [...marks].sort((a, b) => a - b)
}

export type Clock = {
  elapsed: number
  status: ClockStatus
  /** Starts from the beginning when idle or complete; resumes when paused. */
  play: () => void
  pause: () => void
  /** Returns to the resting frame without starting playback. */
  reset: () => void
  isPlaying: boolean
  /** True when the clock sits at its resting frame, so Reset has nothing to do. */
  atRest: boolean
}

/**
 * Drives an elapsed value across a set of keyframes.
 *
 * `restingAt` is where the clock sits before anyone presses anything: the end
 * of the stream for the full demo, a chosen frame for the compact comparison.
 * Changing `resetKey` returns the clock to rest.
 */
export function useKeyframeClock({
  keyframes,
  duration,
  restingAt,
  resetKey,
}: {
  keyframes: number[]
  duration: number
  restingAt: number
  resetKey: string
}): Clock {
  const [status, setStatus] = useState<ClockStatus>('idle')
  const [elapsed, setElapsed] = useState(restingAt)
  const [epoch, setEpoch] = useState(0)

  // Mirrors `elapsed` for the playback effect, which needs the current position
  // when it starts but must not re-subscribe every time the position moves.
  const elapsedRef = useRef(elapsed)
  useEffect(() => {
    elapsedRef.current = elapsed
  })

  // Adjusting during render rather than in an effect avoids showing one frame of
  // the previous selection before the reset lands.
  const [key, setKey] = useState(resetKey)
  if (key !== resetKey) {
    setKey(resetKey)
    setStatus('idle')
    setElapsed(restingAt)
  }

  useEffect(() => {
    if (status !== 'playing') return

    const startedAt = performance.now() - elapsedRef.current
    let timer: ReturnType<typeof setTimeout> | undefined
    let cancelled = false

    const schedule = () => {
      if (cancelled) return
      const now = performance.now() - startedAt
      const next = keyframes.find((mark) => mark > now)

      if (next === undefined) {
        setElapsed(duration)
        setStatus('complete')
        return
      }

      timer = setTimeout(
        () => {
          if (cancelled) return
          setElapsed(next)
          schedule()
        },
        Math.max(0, next - (performance.now() - startedAt)),
      )
    }

    schedule()

    // Cancels the pending step on pause, restart, unmount, or a reset, so a
    // stale timer can never advance a replay that has been replaced.
    return () => {
      cancelled = true
      if (timer) clearTimeout(timer)
    }
  }, [status, epoch, keyframes, duration])

  const play = useCallback(() => {
    setStatus((current) => {
      if (current === 'playing') return current
      if (current === 'idle' || current === 'complete') {
        setElapsed(0)
        elapsedRef.current = 0
        setEpoch((n) => n + 1)
      }
      return 'playing'
    })
  }, [])

  const pause = useCallback(() => {
    setStatus((current) => (current === 'playing' ? 'paused' : current))
  }, [])

  const reset = useCallback(() => {
    setElapsed(restingAt)
    elapsedRef.current = restingAt
    // Bumping the epoch retires any in-flight step, so a run cannot resume into
    // a reset clock.
    setEpoch((n) => n + 1)
    setStatus('idle')
  }, [restingAt])

  return {
    elapsed,
    status,
    play,
    pause,
    reset,
    isPlaying: status === 'playing',
    atRest: status === 'idle',
  }
}
