/**
 * Event and document types for the illustrative streaming demo.
 *
 * Everything here describes *simulated* events replayed from a local fixture.
 * No value in this module is a measurement of production behaviour.
 */

export type DemoEvent =
  /** A chunk of response text, exactly as it would arrive over the wire. */
  | { at: number; kind: 'text'; text: string }
  /** The model asks for a tool; this is where its widget belongs in the answer. */
  | { at: number; kind: 'tool-call'; toolId: string; label: string }
  /** The tool's result arrives. In the delayed scenario only this `at` changes. */
  | { at: number; kind: 'tool-result'; toolId: string }
  /** Trailing provenance line. Considered mode holds this until completion. */
  | { at: number; kind: 'footer'; text: string }
  /** The response stream is finished. */
  | { at: number; kind: 'done' }

export type RevealMode = 'raw' | 'considered'
export type ScenarioId = 'normal' | 'delayed'

export type Inline =
  | { type: 'text'; value: string }
  | { type: 'strong'; value: string }
  | { type: 'code'; value: string }

export type Block =
  | { type: 'paragraph'; content: Inline[] }
  | { type: 'list'; items: Inline[][] }

export type WidgetState =
  | { status: 'pending'; label: string; overdue: boolean }
  | { status: 'resolved' }

export type Segment =
  | { kind: 'blocks'; blocks: Block[] }
  | { kind: 'widget'; toolId: string; state: WidgetState }

/** The complete, renderable state of the answer at one instant. */
export type ResponseState = {
  segments: Segment[]
  footer: string | null
  complete: boolean
  /** Total fixture duration, used to know when playback has finished. */
  duration: number
}
