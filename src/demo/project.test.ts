import { test } from 'node:test'
import assert from 'node:assert/strict'
import { durationOf, eventsFor, WIDGET_WAIT_LIMIT_MS } from './fixtures'
import { parseInline, parseBlocks } from './markdown'
import { project } from './project'
import type { ResponseState } from './types'

const normal = eventsFor('normal')
const delayed = eventsFor('delayed')

/** Flatten a projection to plain text, the way the reader would read it. */
function textOf(state: ResponseState): string {
  const parts: string[] = []
  for (const segment of state.segments) {
    if (segment.kind === 'widget') {
      parts.push(segment.state.status === 'pending' ? '[pending]' : '[record]')
      continue
    }
    for (const block of segment.blocks) {
      if (block.type === 'paragraph') parts.push(block.content.map((r) => r.value).join(''))
      else block.items.forEach((i) => parts.push('- ' + i.map((r) => r.value).join('')))
    }
  }
  if (state.footer) parts.push(state.footer)
  return parts.join('\n')
}

test('events are chronological in both scenarios', () => {
  for (const [name, events] of [['normal', normal], ['delayed', delayed]] as const) {
    const times = events.map((e) => e.at)
    assert.deepEqual(times, [...times].sort((a, b) => a - b), `${name} out of order`)
  }
})

test('the delayed scenario changes only the tool result arrival', () => {
  const strip = (list: typeof normal) =>
    list.filter((e) => e.kind !== 'tool-result').map((e) => JSON.stringify(e)).sort()
  assert.deepEqual(strip(delayed), strip(normal))
})

test('raw arrival exposes an unclosed bold span; considered reveal withholds it', () => {
  const at = 950
  assert.match(textOf(project(normal, at, 'raw', durationOf(normal))), /\*\*/)
  assert.doesNotMatch(textOf(project(normal, at, 'considered', durationOf(normal))), /\*\*/)
})

test('parseInline holds an unclosed delimiter only when asked to', () => {
  assert.equal(parseInline('a **b', true).map((r) => r.value).join(''), 'a ')
  assert.equal(parseInline('a **b', false).map((r) => r.value).join(''), 'a **b')
  assert.deepEqual(parseInline('a **b** c', true).map((r) => r.type), ['text', 'strong', 'text'])
})

test('considered reveal shows a paragraph only once it is closed', () => {
  const open = parseBlocks('A sentence still arriving', 'considered', false)
  assert.equal(open.length, 0)
  const closed = parseBlocks('A sentence still arriving\n\n', 'considered', false)
  assert.equal(closed.length, 1)
  // Once the stream is settled nothing is held back.
  assert.equal(parseBlocks('A sentence still arriving', 'considered', true).length, 1)
})

test('the projection is a pure function of elapsed time', () => {
  for (const at of [0, 520, 950, 1840, 2380, 2960]) {
    const a = project(normal, at, 'considered', durationOf(normal))
    const b = project(normal, at, 'considered', durationOf(normal))
    assert.deepEqual(a, b, `differs at ${at}`)
  }
})

test('replaying never duplicates text, whatever order elapsed is sampled in', () => {
  const duration = durationOf(normal)
  const forward = [0, 300, 900, 1500, 2100, 2700, duration]
  // A restart mid-playback rewinds elapsed; sampling out of order simulates that.
  const scrambled = [2100, 300, duration, 900, 0, 2700, 1500]

  const lead = /Northwind Logistics moved from/g
  for (const at of [...forward, ...scrambled]) {
    const occurrences = textOf(project(normal, at, 'considered', duration)).match(lead) ?? []
    assert.ok(occurrences.length <= 1, `lead sentence repeated at ${at}`)
  }
  // Rewinding and returning to the same instant yields byte-identical output.
  const before = project(normal, 2100, 'considered', duration)
  project(normal, 0, 'considered', duration)
  assert.deepEqual(project(normal, 2100, 'considered', duration), before)
})

test('a late tool result does not hold back the text around it', () => {
  const duration = durationOf(delayed)
  const toolCall = delayed.find((e) => e.kind === 'tool-call')!
  const afterDone = 3200

  const state = project(delayed, afterDone, 'considered', duration)
  const text = textOf(state)
  // Prose and the provenance line complete while the record is still pending.
  assert.match(text, /security questionnaire came back completed/)
  assert.match(text, /Synthesized from/)
  assert.ok(state.complete)
  assert.match(text, /\[pending\]/)

  // The reserved slot admits it is late once the wait limit passes.
  const atLimit = toolCall.at + WIDGET_WAIT_LIMIT_MS
  const overdue = project(delayed, atLimit, 'considered', duration).segments.find(
    (s) => s.kind === 'widget',
  )
  assert.ok(overdue?.kind === 'widget' && overdue.state.status === 'pending' && overdue.state.overdue)

  // And it resolves in place, keeping its position in the answer.
  const resolvedText = textOf(project(delayed, duration, 'considered', duration))
  assert.match(resolvedText, /\[record\]/)
  assert.ok(resolvedText.indexOf('[record]') < resolvedText.indexOf('Synthesized from'))
})

test('considered reveal holds the provenance line until the answer is complete', () => {
  const duration = durationOf(normal)
  const beforeDone = project(normal, 2700, 'considered', duration)
  assert.equal(beforeDone.footer, null)
  assert.ok(project(normal, duration, 'considered', duration).footer)
})

/**
 * The case study quotes these two numbers as the cost of grouping. Deriving them
 * here means the prose cannot drift away from the fixture.
 */
function firstVisibleAt(events: typeof normal, mode: 'raw' | 'considered'): number {
  const duration = durationOf(events)
  for (const at of [...new Set(events.map((e) => e.at))].sort((a, b) => a - b)) {
    if (textOf(project(events, at, mode, duration)).trim().length > 0) return at
  }
  throw new Error('no visible text in this stream')
}

test('grouping costs 520ms to first visible text in this fixture', () => {
  assert.equal(firstVisibleAt(normal, 'raw'), 0)
  assert.equal(firstVisibleAt(normal, 'considered'), 520)
})

test('both modes end at the same answer', () => {
  const duration = durationOf(normal)
  assert.equal(
    textOf(project(normal, duration, 'raw', duration)),
    textOf(project(normal, duration, 'considered', duration)),
  )
})
