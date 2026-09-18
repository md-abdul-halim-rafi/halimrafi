import { allWorkMeta } from './work'
import { publishedWriting } from './writing'

/**
 * One list of everything published, whatever kind of piece it is.
 *
 * Case studies and articles were separate all the way up: separate registries,
 * separate loaders, a standalone section on the front page for one of them and
 * a list for the other. A reader has no use for that distinction as a
 * navigation structure — it is a fact about a piece, not a place it lives — so
 * the two registries stay where they are and this is the single read model that
 * every list uses.
 *
 * The registries keep their own routes. Nothing moves; `href` carries the
 * difference, so a published URL stays published.
 */

export type ArticleKind = 'case-study' | 'article'

export type ArticleEntry = {
  kind: ArticleKind
  slug: string
  /** The piece's own URL. Unchanged from before the two lists were merged. */
  href: string
  title: string
  /** One sentence. `summary` on a case study, `description` on an article. */
  description: string
  /** ISO date, as the piece itself declares it. Nothing is derived or filled in. */
  date: string
  /** Set only when the piece is not by the site's owner. */
  byline?: string
}

export async function publishedArticles(): Promise<ArticleEntry[]> {
  const [work, writing] = await Promise.all([allWorkMeta(), publishedWriting()])

  const entries: ArticleEntry[] = [
    ...work.map((meta) => ({
      kind: 'case-study' as const,
      slug: meta.slug,
      href: `/work/${meta.slug}`,
      title: meta.title,
      description: meta.summary,
      date: meta.date,
    })),
    ...writing.map((meta) => ({
      kind: 'article' as const,
      slug: meta.slug,
      href: `/writing/${meta.slug}`,
      title: meta.title,
      description: meta.description,
      date: meta.date,
      byline: meta.byline,
    })),
  ]

  return entries.sort((a, b) => b.date.localeCompare(a.date))
}

/**
 * The date, to the day, for every kind of piece.
 *
 * The two models formatted differently — a case study said "September 2026"
 * and an article said "September 16, 2026" — which was visible as soon as they
 * sat in one list. Both carry a full ISO date, so the finer of the two is the
 * one that needs nothing invented.
 */
export function formatArticleDate(iso: string): string {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  })
}

/** How many appear on the front page before the archive link earns its place. */
export const ARTICLE_PREVIEW_COUNT = 3
