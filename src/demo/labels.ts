import type { ClockStatus } from './clock'

/**
 * One label table for every playback control, so Studio and the article cannot
 * drift apart.
 *
 * At rest both demos already show the finished answer, so the primary action is
 * a replay rather than a first play. That is why idle and complete share a
 * label: from the reader's point of view they are the same state, a readable
 * answer with the comparison waiting to be run.
 *
 * Reset is separate. It stops playback and restores that finished answer, and it
 * is disabled when the demo is already sitting there.
 */
export function playLabel(status: ClockStatus): string {
  switch (status) {
    case 'playing':
      return 'Pause'
    case 'paused':
      return 'Resume'
    default:
      return 'Replay comparison'
  }
}

export const RESET_LABEL = 'Reset'

/** Shown once near each demo. */
export const PROTOTYPE_CAPTION = 'Interactive prototype using simulated data'

/**
 * The same sentence, punctuated, for the preview that sets it as a caption
 * beside its control rather than as an uppercase label above the panel. One
 * constant so the two cannot drift into different wording.
 */
export const PROTOTYPE_CAPTION_SENTENCE = `${PROTOTYPE_CAPTION}.`

/** What the comparison is actually about, in one sentence. */
export const COMPARISON_NOTE =
  'Both sides receive the same simulated events on the same clock. The comparison is about how the answer arrives, not what it says.'
