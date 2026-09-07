import type { ClockStatus } from './clock'

/**
 * One label table for every playback control on the site, so the homepage
 * comparison and the article prototype cannot drift apart.
 *
 * "Play again" both rewinds and starts, which is why it is not called Reset.
 * Reset is the separate action that returns to the resting frame and stops
 * there, and it is disabled when the clock is already at rest.
 */
export function playLabel(status: ClockStatus): string {
  switch (status) {
    case 'playing':
      return 'Pause'
    case 'paused':
      return 'Resume'
    case 'complete':
      return 'Play again'
    default:
      return 'Play'
  }
}

export const RESET_LABEL = 'Reset'
