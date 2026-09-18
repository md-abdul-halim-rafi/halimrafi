import type { Metadata } from 'next'
import Link from 'next/link'
import { SiteFooter } from '@/components/site/Chrome'
import { SiteHeader } from '@/components/site/SiteHeader'
import { site } from '@/lib/site'
import { formatArticleDate, publishedWriting } from '@/lib/writing'

const description = 'Articles by Halim Rafi, newest first.'

export const metadata: Metadata = {
  title: 'Writing',
  description,
  alternates: { canonical: `${site.url}/writing` },
  openGraph: {
    title: `Writing · ${site.name}`,
    description,
    type: 'website',
    url: `${site.url}/writing`,
  },
}

/**
 * The archive: everything published, newest first, and nothing else.
 *
 * One entry is a title, a sentence and a date, which is the same three things
 * the story page shows. No cards, no thumbnails, no categories, no search. A
 * list this length does not need to be navigated, only read.
 *
 * With nothing published the page still renders, since the route has to exist
 * for the first article to land on. Nothing links here until there is
 * something to link to.
 */
export default async function WritingArchive() {
  const articles = await publishedWriting()

  return (
    <>
      <SiteHeader current={'writing'} />

      <main className="mx-auto w-full max-w-[58rem] px-5 pb-24 sm:px-8">
        <header className="pb-10 pt-16 sm:pb-12 sm:pt-20">
          <h1 className="display max-w-[15ch] text-[clamp(2.5rem,6.4vw,4.25rem)] leading-[1.0] text-ink-12">
            Writing
          </h1>
        </header>

        {articles.length > 0 ? (
          <ul className="border-t border-[color:var(--hairline)]">
            {articles.map((article) => (
              <li key={article.slug} className="border-b border-[color:var(--hairline)] py-7">
                <h2 className="text-[1.125rem] leading-snug">
                  <Link href={`/writing/${article.slug}`} className="link-quiet">
                    {article.title}
                  </Link>
                </h2>
                <p className="mt-2 max-w-[60ch] text-[0.9375rem] leading-[1.6] text-muted">
                  {article.description}
                </p>
                <p className="mt-3 flex flex-wrap items-baseline gap-x-5 gap-y-1 font-mono text-[0.8125rem] text-ink-10">
                  {article.byline ? <span>{article.byline}</span> : null}
                  <time dateTime={article.date}>{formatArticleDate(article.date)}</time>
                  {article.updated ? (
                    <>
                      {' · updated '}
                      <time dateTime={article.updated}>{formatArticleDate(article.updated)}</time>
                    </>
                  ) : null}
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="max-w-[60ch] text-[0.9375rem] leading-[1.6] text-muted">
            Nothing published yet.
          </p>
        )}
      </main>

      <SiteFooter />
    </>
  )
}
