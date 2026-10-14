import Link from 'next/link'
import { formatArticleDate, type ArticleEntry } from '@/lib/articles'

/**
 * The list, on both surfaces that publish one.
 *
 * The front page and the archive had the same three fields in two different
 * treatments — different sizes, different faces, and a "Case study" label above
 * the title in one place while the date sat under the description in the other.
 * They are the same component now, so an entry cannot look like two things.
 *
 * The title is set in the article's own reading serif at something close to the
 * size it will have once opened, because a list of articles is a list of
 * titles and the titles are what a reader scans. Everything under it is
 * interface: the description in the interface face at reading size, and one
 * quiet metadata row.
 *
 * That row is the fix for the label: date first, always, then the kind, then a
 * byline if the piece is not the site owner's. Every entry reads in the same
 * order, and an entry with no label is the same shape as one with it.
 *
 * The title is the link, not a separate "read more": a list of titles is a list
 * of things to open, and making the reader aim at a smaller second target is
 * work for no gain.
 *
 * Separators sit between entries and nowhere else, so the list does not box
 * itself off from the heading above or the page below.
 */
export function ArticleList({
  articles,
  headingLevel = 2,
}: {
  articles: ArticleEntry[]
  /**
   * The list sits under the archive's `h1` on one page and under a section's
   * `h2` on the other, so its own entries are one level below whichever that
   * is. Passing it keeps the document outline right on both.
   */
  headingLevel?: 2 | 3
}) {
  const Heading = headingLevel === 3 ? 'h3' : 'h2'

  return (
    <ul>
      {articles.map((article) => (
        <li
          key={article.href}
          className="border-[color:var(--hairline)] [&+li]:mt-9 [&+li]:border-t [&+li]:pt-9"
        >
          <Heading className="entry-title">
            <Link href={article.href} className="entry-link">
              {article.title}
            </Link>
          </Heading>

          <p className="entry-summary">{article.description}</p>

          <p className="entry-meta">
            <time dateTime={article.date}>{formatArticleDate(article.date)}</time>
            {article.kind === 'case-study' ? <span>Case study</span> : null}
            {article.byline ? <span>{article.byline}</span> : null}
          </p>
        </li>
      ))}
    </ul>
  )
}
