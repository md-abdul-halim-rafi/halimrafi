import { readFile } from 'node:fs/promises'
import path from 'node:path'
import { formatArticleDate, type ArticleKind } from './articles'
import { site } from './site'

/**
 * An article as plain Markdown, for whoever is reading it as text.
 *
 * An agent fetching `/writing/<slug>` gets the whole page: a header, a contents
 * rail, a footer, and several hundred class names wrapped around the sentences
 * it came for. The writing is already Markdown on disk, so the honest thing is
 * to hand that over rather than make something reconstruct it from the HTML.
 *
 * What this does to the source is small and lossless in the direction that
 * matters: the `meta` export becomes a short header, and the handful of MDX
 * components become the Markdown they stand for. Not one word of the prose is
 * touched.
 */

const ROOTS: Record<'writing' | 'work', string> = {
  writing: 'src/content/writing',
  work: 'src/content/work',
}

export type MarkdownSource = {
  kind: ArticleKind
  slug: string
  title: string
  description: string
  date: string
  byline?: string
}

export async function articleMarkdown(
  dir: 'writing' | 'work',
  meta: MarkdownSource,
): Promise<string> {
  const file = path.join(process.cwd(), ROOTS[dir], `${meta.slug}.mdx`)
  const raw = await readFile(file, 'utf8')

  const header = [
    `# ${meta.title}`,
    '',
    meta.description,
    '',
    `${meta.byline ?? site.name} · ${formatArticleDate(meta.date)}`,
    meta.kind === 'case-study' ? 'Case study' : null,
    `Source: ${site.url}/${dir}/${meta.slug}`,
    '',
    '---',
    '',
    '',
  ]
    .filter((line) => line !== null)
    .join('\n')

  return header + toMarkdown(raw) + '\n'
}

/**
 * MDX to Markdown.
 *
 * Each of these components carries meaning that Markdown can hold, so each one
 * becomes the nearest true thing rather than being stripped: a disclosure is a
 * subsection the reader may skip, a callout is a named aside, a lede is the
 * opening paragraph. The demo is the one exception — it is an interface, and
 * there is no text of it to give — so it leaves a line saying what stood there
 * rather than a silent gap.
 */
function toMarkdown(source: string): string {
  return (
    source
      // The `meta` export, which the header above already says in prose.
      .replace(/^export const meta = \{[\s\S]*?\n\}\n/m, '')
      .replace(/<Lede>([\s\S]*?)<\/Lede>/g, '$1')
      .replace(/<Disclosure summary="([^"]*)">/g, '#### $1\n')
      .replace(/<\/Disclosure>/g, '')
      .replace(/<Callout label="([^"]*)">/g, '> **$1**\n>')
      .replace(/<\/Callout>/g, '')
      .replace(/<Demo\s*\/>/g, '_[An interactive prototype stands here in the page.]_')
      .replace(/\n{3,}/g, '\n\n')
      .trim()
  )
}
