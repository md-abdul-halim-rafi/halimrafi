import type { ComponentType } from 'react'

/**
 * Content model for writing.
 *
 * Deliberately the same shape as `work.ts`: an MDX file exports a `meta`
 * object, one line registers it below, and no page component changes. Two
 * content types with two different conventions would be one convention too
 * many.
 *
 * What it does not carry is the case study's role and artifact metadata. A
 * piece of writing has an author and a date; it does not have a role on a
 * team or a simulated artifact to disclose.
 *
 * Adding an article: create `src/content/writing/<slug>.mdx`, export `meta`,
 * add one line to `registry`.
 */

export type WritingStatus = 'draft' | 'published'

export type WritingMeta = {
  slug: string
  title: string
  /** One sentence. Used in the list, in the archive and as the description. */
  description: string
  /** ISO date of publication. */
  date: string
  /** ISO date of a later material revision, if there has been one. */
  updated?: string
  status: WritingStatus
  /**
   * Section headings, in order, for the reading rail. Omit for a piece short
   * enough not to need one, and the rail is not rendered at all.
   */
  sections?: string[]
}

export type WritingModule = {
  meta: WritingMeta
  default: ComponentType
}

/**
 * The registry is empty until an article exists. Every surface below is built
 * to read from it, so the first entry needs no other change: the list appears
 * on the story page, the archive fills, and the sitemap picks it up.
 */
const registry: Record<string, () => Promise<WritingModule>> = {}

export const writingSlugs = Object.keys(registry)

export async function loadWriting(slug: string): Promise<WritingModule | null> {
  const load = registry[slug]
  if (!load) return null
  return load()
}

/**
 * Published articles, newest first. Drafts never appear here, which is what
 * keeps them off every public surface and out of the sitemap: nothing reads
 * the registry directly.
 */
export async function publishedWriting(): Promise<WritingMeta[]> {
  const modules = await Promise.all(writingSlugs.map((slug) => loadWriting(slug)))
  return modules
    .flatMap((m) => (m ? [m.meta] : []))
    .filter((meta) => meta.status === 'published')
    .sort((a, b) => b.date.localeCompare(a.date))
}

/**
 * The date, to the day.
 *
 * `formatDate` in `work.ts` gives a month and a year, which suits a case study
 * describing a stretch of work. An article is published on a day, and a reader
 * scanning a list wants to know which one. The machine-readable value in the
 * `datetime` attribute is the ISO date either way.
 */
export function formatArticleDate(iso: string): string {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  })
}

/** How many appear on the story page before the archive link earns its place. */
export const WRITING_PREVIEW_COUNT = 3
