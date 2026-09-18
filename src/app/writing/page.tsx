import type { Metadata } from 'next'
import { SiteFooter } from '@/components/site/Chrome'
import { SiteHeader } from '@/components/site/SiteHeader'
import { ArticleList } from '@/components/article/ArticleList'
import { BackLink } from '@/components/ui/BackLink'
import { publishedArticles } from '@/lib/articles'
import { site } from '@/lib/site'

const description = `Writing and case studies by ${site.name}, newest first.`

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
 * The archive: everything published, newest first, in one list.
 *
 * It used to hold essays only, while the case studies lived at their own URLs
 * with nothing linking to them but the front page's single featured entry. A
 * reader had no way to find the rest. Both kinds are here now, told apart by a
 * label rather than by being kept in different places.
 */
export default async function WritingArchive() {
  const articles = await publishedArticles()

  return (
    <>
      <SiteHeader current="writing" />

      <main className="mx-auto w-full max-w-[58rem] px-6 pb-24 sm:px-10">
        {/* The heading names the page; the entries are what a reader scans, so
            it steps down out of their way and sits closer to the first one. */}
        <header className="pb-7 pt-16 sm:pb-8 sm:pt-20">
          <h1 className="display text-[clamp(1.75rem,1.2vw+1.2rem,2.25rem)] leading-[1.1] text-ink-12">
            Writing
          </h1>
        </header>

        {articles.length > 0 ? (
          <ArticleList articles={articles} />
        ) : (
          <p className="max-w-[60ch] text-[0.9375rem] leading-[1.6] text-muted">
            Nothing published yet.
          </p>
        )}

        <p className="mt-12">
          <BackLink href="/">Home</BackLink>
        </p>
      </main>

      <SiteFooter />
    </>
  )
}
