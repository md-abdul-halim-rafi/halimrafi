import type { DemoEvent, ScenarioId } from './types'

/**
 * A single recorded-looking event stream, authored by hand.
 *
 * The account below is fictional. Mock records appear only inside the demo,
 * which is labelled as simulated wherever it is rendered.
 *
 * Two details are deliberate:
 *  - The bold span for "VP of Operations" is split across two chunks, so the
 *    stream crosses a formatting boundary mid-flight.
 *  - The tool-result is the only event the delayed scenario moves.
 */
const BASE: DemoEvent[] = [
  { at: 0, kind: 'text', text: 'Northwind Logistics moved from ' },
  { at: 240, kind: 'text', text: 'evaluation to active negotiation this week. ' },
  { at: 520, kind: 'text', text: 'Three signals stand out:\n\n' },
  { at: 820, kind: 'text', text: '- Two new stakeholders joined the thread, including their **' },
  { at: 1040, kind: 'text', text: 'VP of Operations**.\n' },
  { at: 1300, kind: 'text', text: '- Pricing page visits tripled after the Tuesday demo.\n' },
  { at: 1580, kind: 'text', text: '- The security questionnaire came back completed.\n\n' },
  { at: 1840, kind: 'tool-call', toolId: 'account', label: 'Reading account record' },
  { at: 2380, kind: 'tool-result', toolId: 'account' },
  { at: 2660, kind: 'footer', text: 'Synthesized from 4 emails, 2 meetings and 1 form submission.' },
  { at: 2960, kind: 'done' },
]

/**
 * The homepage preview's own stream: one sentence, one bold span, four chunks.
 *
 * The full fixture above is a paragraph, three list items, a tool call and a
 * record, which is more reading than a homepage should ask for. This holds the
 * one thing the comparison exists to show, and holds it twice over:
 *
 *  - The bold marker opens at 500ms and does not close until 1700ms, so for
 *    1200ms the raw side has a live `**` on screen and the considered side has
 *    nothing to show yet. The first schedule ran the whole thing in 1240ms,
 *    which was too quick to read; every mark was stretched by the same factor,
 *    on the one clock both sides share. These are demo timings, not a
 *    measurement of anything.
 *  - The last chunk closes both the span and the paragraph, which is the moment
 *    the considered side releases the whole sentence. Before that there is no
 *    readable unit to release, which is the behaviour the label names.
 *
 * The account is fictional, as in the full fixture.
 */
const PREVIEW: DemoEvent[] = [
  { at: 0, kind: 'text', text: 'Two new stakeholders joined the thread, ' },
  { at: 500, kind: 'text', text: 'including their **' },
  { at: 1100, kind: 'text', text: 'VP of Operations' },
  { at: 1700, kind: 'text', text: '**.\n\n' },
  { at: 1900, kind: 'done' },
]

export function previewEvents(): DemoEvent[] {
  return PREVIEW
}

/** The preview's whole timeline, which is also where it rests. */
export const PREVIEW_END = 1900

/**
 * Where the compact comparison ends: after the prose has closed and before the
 * tool call opens. The comparison is about how prose arrives, so it plays only
 * that stretch, and this is therefore its finished state as well as its rest.
 */
export const COMPARISON_END = 1700

/** How long the reserved widget slot waits before it admits it is late. */
export const WIDGET_WAIT_LIMIT_MS = 2400

/** The delayed scenario's tool-result arrival, well past the wait limit. */
const DELAYED_RESULT_AT = 5600

export function eventsFor(scenario: ScenarioId): DemoEvent[] {
  if (scenario === 'normal') return BASE
  // Moving the tool result later puts it out of order relative to the events
  // that follow it, so the stream is re-sorted. Consumers rely on chronological
  // order; without this the footer and completion events sit behind a future
  // event and are never reached.
  return BASE.map((event) =>
    event.kind === 'tool-result' ? { ...event, at: DELAYED_RESULT_AT } : event,
  ).sort((a, b) => a.at - b.at)
}

export function durationOf(events: DemoEvent[]): number {
  return events.reduce((max, event) => Math.max(max, event.at), 0)
}

/** The fictional record the tool returns. Never presented as a real customer. */
export const ACCOUNT_RECORD = {
  name: 'Northwind Logistics',
  stage: 'Negotiation',
  owner: 'Unassigned',
  seats: '120 requested',
  lastTouch: 'Tuesday, product demo',
} as const
