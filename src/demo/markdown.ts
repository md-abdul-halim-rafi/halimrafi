import type { Block, Inline } from './types'

/**
 * A deliberately small incremental parser.
 *
 * It exists to demonstrate one behaviour: what a half-arrived answer looks like
 * when you render it verbatim, versus when you wait for readable units and hold
 * back formatting that has not closed yet. It is not a general markdown parser.
 */

type RawLine = { text: string; terminated: boolean }

function toLines(source: string): RawLine[] {
  const parts = source.split('\n')
  const lines: RawLine[] = []
  parts.forEach((text, index) => {
    const isLast = index === parts.length - 1
    // A trailing newline produces an empty final part that is not a real line.
    if (isLast && text === '') return
    lines.push({ text, terminated: !isLast })
  })
  return lines
}

/**
 * Split inline text into runs, handling `**strong**` and `` `code` ``.
 *
 * When `holdIncomplete` is true an unclosed delimiter and everything after it is
 * withheld, so the reader never sees a stray `**`. When false the text is shown
 * exactly as it arrived, dangling delimiters included.
 */
export function parseInline(text: string, holdIncomplete: boolean): Inline[] {
  const out: Inline[] = []
  let buffer = ''
  let index = 0

  const flush = () => {
    if (buffer) out.push({ type: 'text', value: buffer })
    buffer = ''
  }

  while (index < text.length) {
    const strongOpen = text.startsWith('**', index)
    const codeOpen = !strongOpen && text[index] === '`'

    if (!strongOpen && !codeOpen) {
      buffer += text[index]
      index += 1
      continue
    }

    const marker = strongOpen ? '**' : '`'
    const closeAt = text.indexOf(marker, index + marker.length)

    if (closeAt === -1) {
      // The delimiter never closed in the text we have so far.
      if (holdIncomplete) {
        flush()
        return out
      }
      buffer += text.slice(index)
      break
    }

    flush()
    out.push({
      type: strongOpen ? 'strong' : 'code',
      value: text.slice(index + marker.length, closeAt),
    })
    index = closeAt + marker.length
  }

  flush()
  return out
}

/**
 * Turn accumulated stream text into blocks.
 *
 * `settled` means the stream has finished, so nothing needs to be held back.
 * While it is false, considered mode reveals only complete readable units: a
 * paragraph appears once it is closed, a list item once its line has landed.
 */
export function parseBlocks(source: string, mode: 'raw' | 'considered', settled: boolean): Block[] {
  const lines = toLines(source)
  const blocks: Block[] = []
  const hold = mode === 'considered' && !settled
  const holdInline = mode === 'considered'

  let paragraph: RawLine[] = []
  let list: RawLine[] = []

  const closeParagraph = (closed: boolean) => {
    if (paragraph.length === 0) return
    if (!hold || closed) {
      const text = paragraph.map((line) => line.text).join(' ')
      const content = parseInline(text, holdInline)
      if (content.length > 0) blocks.push({ type: 'paragraph', content })
    }
    paragraph = []
  }

  const closeList = () => {
    if (list.length === 0) return
    const usable = hold ? list.filter((line) => line.terminated) : list
    if (usable.length > 0) {
      blocks.push({
        type: 'list',
        items: usable.map((line) => parseInline(line.text.slice(2), holdInline)),
      })
    }
    list = []
  }

  for (const line of lines) {
    const isBlank = line.text.trim() === ''
    const isItem = line.text.startsWith('- ')

    if (isBlank) {
      closeParagraph(true)
      closeList()
      continue
    }
    if (isItem) {
      closeParagraph(true)
      list.push(line)
      continue
    }
    closeList()
    paragraph.push(line)
  }

  // Anything still open has not been terminated by a blank line.
  closeParagraph(settled)
  closeList()

  return blocks
}
