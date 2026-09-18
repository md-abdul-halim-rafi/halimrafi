import type { ReactNode } from 'react'
import { SiteFooter } from '@/components/site/Chrome'
import { SiteHeader } from '@/components/site/SiteHeader'
import { HashScroll } from '@/components/story/HashScroll'
import { BackLink } from '@/components/ui/BackLink'
import { formatArticleDate, type ArticleKind } from '@/lib/articles'
import { articleJsonLd, JsonLd } from '@/lib/jsonLd'
import { Contents, type Section } from './Contents'

export type ArticleDetail = { term: string; value: string }

/**
 * The reading shell both kinds of piece are published in.
 *
 * A case study and an essay were two templates that had drifted into two
 * different publications — different title sizes, different metadata rows,
 * different return links, one with a "Case study" label and one without. They
 * are the same thing to a reader: a title, a sentence, a date, and a long piece
 * of prose. So the shell is one file, and what differs between the two is data:
 * a kicker, and an optional row of case-study details.
 *
 * Neither piece's structure is touched. The body is whatever the MDX file says
 * it is, and a case study keeps its role and collaborators — as a quiet row
 * under the summary rather than the bordered block it used to open with, which
 * competed with the article for the reader's first attention.
 *
 * Layout is `.article-grid`: the reading column is centred in the viewport, the
 * contents rail hangs in the margin beside it, and anything marked `.breakout`
 * widens symmetrically about the same axis instead of pushing the column off
 * centre.
 */
export function ArticleLayout({
  kind,
  title,
  description,
  date,
  updated,
  byline,
  sections,
  details,
  url,
  children,
}: {
  kind: ArticleKind
  title: string
  description: string
  date: string
  updated?: string
  byline?: string
  sections: Section[]
  /** Case-study extras — role, collaborators. Omitted entirely for an essay. */
  details?: ArticleDetail[]
  /** The piece's canonical URL, for the structured data. */
  url: string
  children: ReactNode
}) {
  return (
    <>
      <SiteHeader />
      <HashScroll />

      <JsonLd
        data={articleJsonLd({
          kind,
          url,
          title,
          description,
          date,
          updated,
          byline,
          sections: sections.map((section) => section.title),
        })}
      />

      <main id="article" className="article-grid relative pb-4">
        <header className="pb-6 pt-14 sm:pt-16">
          {kind === 'case-study' ? <p className="label">Case study</p> : null}
          <h1 className={`article-title ${kind === 'case-study' ? 'mt-5' : ''}`}>{title}</h1>
          <p className="article-summary">{description}</p>

          <p className="article-meta">
            <span>{byline ?? 'Halim Rafi'}</span>
            <time dateTime={date}>{formatArticleDate(date)}</time>
            {updated ? (
              <time dateTime={updated}>Updated {formatArticleDate(updated)}</time>
            ) : null}
          </p>

          {details && details.length > 0 ? (
            <dl className="article-details">
              {details.map((detail) => (
                <div key={detail.term}>
                  <dt className="label">{detail.term}</dt>
                  <dd>{detail.value}</dd>
                </div>
              ))}
            </dl>
          ) : null}
        </header>

        {sections.length > 0 ? <Contents sections={sections} /> : null}

        {children}

        <div className="mt-14">
          <div className="rule-fade" />
          <p className="pt-6">
            <BackLink href="/writing">All writing</BackLink>
          </p>
        </div>
      </main>

      <SiteFooter />
    </>
  )
}
