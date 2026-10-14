import { test } from 'node:test'
import assert from 'node:assert/strict'
import { PREVIEW_END, previewEvents } from './fixtures'
import { project } from './project'
import type { ResponseState } from './types'

/**
 * The homepage preview's fixture.
 *
 * It exists to be short, so the things worth asserting are that it stayed
 * short, that it still crosses a formatting boundary mid-flight, and that the
 * two sides finish identical. Every number here is read from the fixture, so
 * the fixture cannot drift away from what the page says about it.
 */

const events = previewEvents()

function textOf(state: ResponseState): string {
  const parts: string[] = []
  for (const segment of state.segments) {
    if (segment.kind === 'widget') {
      parts.push('[widget]')
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

test('the preview is one sentence, and nothing else', () => {
  const finished = project(events, PREVIEW_END, 'considered', PREVIEW_END)
  const text = textOf(finished)
  assert.doesNotMatch(text, /\n/, 'more than one block')
  assert.doesNotMatch(text, /\[widget\]/, 'the preview must not carry the record')
  assert.equal(finished.footer, null, 'the preview must not carry the provenance line')
  assert.match(text, /^Two new stakeholders joined the thread, including their VP of Operations\.$/)
})

test('the preview stays short', () => {
  // Stretched from 1240ms to 1900ms because the first schedule finished before
  // a reader could take it in. Still short enough for a homepage.
  assert.ok(PREVIEW_END <= 2200, `${PREVIEW_END}ms is too long for a homepage preview`)
  assert.ok(events.length <= 5, `${events.length} events`)
  const times = events.map((e) => e.at)
  assert.deepEqual(times, [...times].sort((a, b) => a - b), 'events out of order')
})

test('the preview keeps a bold span open across chunks', () => {
  // The marker opens in one chunk and closes in a later one, which is the only
  // reason the two sides can differ at all.
  const opens = events.findIndex((e) => e.kind === 'text' && e.text.includes('**'))
  const closes = events.findLastIndex((e) => e.kind === 'text' && e.text.includes('**'))
  assert.ok(closes > opens, 'the span opens and closes in the same chunk')

  const openAt = events[opens].at
  const closeAt = events[closes].at
  // Long enough to be read on screen, not just to exist in the timeline.
  assert.ok(closeAt - openAt >= 900, `only ${closeAt - openAt}ms of open markup`)
})

test('raw shows the open marker; waiting for a readable unit shows nothing yet', () => {
  const midway = 1300
  const raw = textOf(project(events, midway, 'raw', PREVIEW_END))
  const considered = textOf(project(events, midway, 'considered', PREVIEW_END))
  assert.match(raw, /\*\*/, 'the raw side should be showing the open marker')
  assert.equal(considered, '', 'there is no readable unit yet, so nothing should be shown')
})

test('both sides finish with identical content', () => {
  const raw = project(events, PREVIEW_END, 'raw', PREVIEW_END)
  const considered = project(events, PREVIEW_END, 'considered', PREVIEW_END)
  assert.equal(textOf(raw), textOf(considered))
  assert.doesNotMatch(textOf(considered), /\*\*/, 'markup left on screen at rest')
  assert.equal(raw.complete, true)
  assert.equal(considered.complete, true)
})

test('the preview rests on the finished sentence', () => {
  // The page shows the finished answer before anyone presses anything, so the
  // resting frame has to be the end of the timeline.
  for (const mode of ['raw', 'considered'] as const) {
    const rest = textOf(project(events, PREVIEW_END, mode, PREVIEW_END))
    assert.match(rest, /VP of Operations\./)
    assert.doesNotMatch(rest, /\*\*/)
  }
})
