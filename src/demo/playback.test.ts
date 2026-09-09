import { test } from 'node:test'
import assert from 'node:assert/strict'
import { COMPARISON_END, durationOf, eventsFor } from './fixtures'
import { playLabel, RESET_LABEL } from './labels'
import { project } from './project'
import type { ResponseState } from './types'

/**
 * The initial state and the control language.
 *
 * Before this, both demos rested part way through the stream: the reader met
 * half a sentence and a raw `**` under a button that said Play, which reads as
 * broken rather than as a comparison waiting to be run. Both now rest at the
 * end of their own timeline, and these tests hold that in place.
 *
 * The clock itself is a React hook, so what is checked here is the projection at
 * the position the clock rests at, plus the label table. Reset returning the
 * clock to that same position is checked by hand in a browser.
 */

const normal = eventsFor('normal')
const delayed = eventsFor('delayed')

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

test('the play control follows the clock', () => {
  assert.equal(playLabel('playing'), 'Pause')
  assert.equal(playLabel('paused'), 'Resume')
  assert.equal(playLabel('complete'), 'Replay comparison')
  // Idle and complete are the same thing to the reader: a finished answer with
  // the comparison not running. They must not offer different words for it.
  assert.equal(playLabel('idle'), playLabel('complete'))
  assert.notEqual(playLabel('idle'), RESET_LABEL)
})

test('the compact comparison rests on the finished answer, identical on both sides', () => {
  const raw = project(normal, COMPARISON_END, 'raw', COMPARISON_END)
  const considered = project(normal, COMPARISON_END, 'considered', COMPARISON_END)

  assert.equal(textOf(raw), textOf(considered))
  assert.match(textOf(considered), /security questionnaire came back completed/)
})

test('nothing unfinished is on screen at rest', () => {
  for (const mode of ['raw', 'considered'] as const) {
    const text = textOf(project(normal, COMPARISON_END, mode, COMPARISON_END))
    // The syntax the raw side leaks mid-flight must be gone once it is at rest.
    assert.doesNotMatch(text, /\*\*/, `${mode} still shows markup at rest`)
    assert.doesNotMatch(text, /\[pending\]/, `${mode} still waiting at rest`)
    assert.match(text, /VP of Operations/, `${mode} lost the bold text`)
  }
})

test('the full demo rests on the complete answer in every scenario', () => {
  for (const [name, events] of [['normal', normal], ['delayed', delayed]] as const) {
    const duration = durationOf(events)
    for (const mode of ['raw', 'considered'] as const) {
      const text = textOf(project(events, duration, mode, duration))
      assert.match(text, /\[record\]/, `${name}/${mode} never resolved the record`)
      assert.doesNotMatch(text, /\[pending\]/, `${name}/${mode} rests on a pending slot`)
      assert.doesNotMatch(text, /\*\*/, `${name}/${mode} rests on open markup`)
      assert.match(text, /Synthesized from 4 emails/, `${name}/${mode} lost the footer`)
    }
  }
})

test('the difference between the modes exists only while events are arriving', () => {
  const midway = 900
  assert.notEqual(
    textOf(project(normal, midway, 'raw', COMPARISON_END)),
    textOf(project(normal, midway, 'considered', COMPARISON_END)),
  )
  assert.equal(
    textOf(project(normal, COMPARISON_END, 'raw', COMPARISON_END)),
    textOf(project(normal, COMPARISON_END, 'considered', COMPARISON_END)),
  )
})

test('one control is enough to cover play, pause and replay', () => {
  // The story page renders the comparison with a single control, so every
  // playback state a reader can be in has to have a label on that one button.
  const labels = (['idle', 'playing', 'paused', 'complete'] as const).map(playLabel)
  assert.equal(new Set(labels).size, 3, 'four states, three words')
  assert.deepEqual(new Set(labels), new Set(['Replay comparison', 'Pause', 'Resume']))
  // Reset is the control that variant drops. Nothing may fall through to it.
  assert.ok(!labels.includes(RESET_LABEL))
})

test('dropping Reset loses no reachable state', () => {
  // Reset returns the clock to its resting frame. The primary control lands on
  // that same frame once a run finishes, so the resting answer is still
  // reachable without it.
  const resting = project(normal, COMPARISON_END, 'considered', COMPARISON_END)
  const finished = project(normal, COMPARISON_END, 'considered', COMPARISON_END)
  assert.equal(textOf(resting), textOf(finished))
  assert.equal(playLabel('complete'), playLabel('idle'))
})
