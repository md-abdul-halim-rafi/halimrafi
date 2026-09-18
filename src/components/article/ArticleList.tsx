import Link from 'next/link'
import { formatArticleDate, type ArticleEntry } from '@/lib/articles'

/**
 * The list both the front page and the archive publish.
 *
 * One entry is a linked title, a sentence and a date, with a label on the ones
 * that are case studies. That is deliberately the whole vocabulary: the two
 * kinds used to be told apart by being in different places — one given a
 * section of its own, the other a small item under a heading — which read as
 * two unrelated bodies of work rather than one person's writing.
 *
 * The title is the link, not a separate "read more": a list of titles is a list
 * of things to open, and making the reader aim at a smaller second target is
 * work for no gain.
 *
 * Nothing here knows how many entries it is showing, so the same list carries
 * three pieces or thirty.
 */
export function ArticleList({ articles }: { articles: ArticleEntry[] }) {
  return (
    <ul className="border-t border-[color:var(--hairline)]">
      {articles.map((article) => (
        <li key={article.href} className="border-b border-[color:var(--hairline)] py-7">
          {article.kind === 'case-study' ? <p className="label mb-2.5">Case study</p> : null}

          <h2 className="text-[1.1875rem] leading-[1.4]">
            <Link href={article.href} className="story-link story-link-in">
              {article.title}
            </Link>
          </h2>

          <p className="mt-2 max-w-[58ch] text-[1rem] leading-[1.6] text-muted">
            {article.description}
          </p>

          <p className="story-mono story-quiet mt-3 flex flex-wrap items-baseline gap-x-5 gap-y-1 text-[0.75rem]">
            {article.byline ? <span>{article.byline}</span> : null}
            <time dateTime={article.date}>{formatArticleDate(article.date)}</time>
          </p>
        </li>
      ))}
    </ul>
  )
}
