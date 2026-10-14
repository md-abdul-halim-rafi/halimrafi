import { WIDGET_WAIT_LIMIT_MS } from './fixtures'
import { parseBlocks } from './markdown'
import type { DemoEvent, ResponseState, RevealMode, Segment } from './types'

/**
 * Derive the entire visible state of the answer from elapsed time.
 *
 * This is the core of the demo. Because the rendered state is a pure function of
 * (events, elapsed, mode), replaying is just moving `elapsed`. Replaying sets
 * it to zero, resetting returns it to the resting frame, and pausing stops
 * advancing it. The same elapsed value always
 * produces the same output, which project.test.ts checks by sampling the
 * timeline out of order and after a rewind.
 */
export function project(
  events: DemoEvent[],
  elapsed: number,
  mode: RevealMode,
  duration: number,
): ResponseState {
  type Part = { kind: 'text'; src: string } | { kind: 'widget'; toolId: string; label: string }

  const parts: Part[] = []
  let toolCallAt: number | null = null
  let resolved = false
  let footer: string | null = null
  let done = false

  const pushText = (text: string) => {
    const last = parts[parts.length - 1]
    if (last && last.kind === 'text') last.src += text
    else parts.push({ kind: 'text', src: text })
  }

  for (const event of events) {
    if (event.at > elapsed) break
    switch (event.kind) {
      case 'text':
        pushText(event.text)
        break
      case 'tool-call':
        toolCallAt = event.at
        // Considered mode reserves the slot immediately. Raw mode has nothing to
        // show yet, so the widget will land later and displace what follows it.
        if (mode === 'considered') {
          parts.push({ kind: 'widget', toolId: event.toolId, label: event.label })
        }
        break
      case 'tool-result':
        resolved = true
        if (mode === 'raw') {
          parts.push({ kind: 'widget', toolId: event.toolId, label: '' })
        }
        break
      case 'footer':
        footer = event.text
        break
      case 'done':
        done = true
        break
    }
  }

  // Considered mode holds the provenance line until the answer is finished, so
  // it does not flicker into place mid-sentence.
  const visibleFooter = mode === 'raw' ? footer : done ? footer : null

  const overdue =
    !resolved && toolCallAt !== null && elapsed - toolCallAt >= WIDGET_WAIT_LIMIT_MS

  const segments: Segment[] = parts.map((part, index) => {
    if (part.kind === 'widget') {
      return {
        kind: 'widget',
        toolId: part.toolId,
        state: resolved ? { status: 'resolved' } : { status: 'pending', label: part.label, overdue },
      }
    }
    // A text run followed by anything else will receive no further characters.
    const isLast = index === parts.length - 1
    const settled = mode === 'raw' ? true : !isLast || done
    return { kind: 'blocks', blocks: parseBlocks(part.src, mode, settled) }
  })

  return { segments, footer: visibleFooter, complete: done, duration }
}
