import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { SiteFooter } from '@/components/site/Chrome'
import { SiteHeader } from '@/components/site/SiteHeader'
import { HashScroll } from '@/components/story/HashScroll'
import { slugify } from '@/components/story/prose'
import { Toc } from '@/components/story/Toc'
import { ArrowRight } from '@/components/ui/icons'
import { site } from '@/lib/site'
import { formatArticleDate, loadWriting, publishedWriting } from '@/lib/writing'

type Params = { params: Promise<{ slug: string }> }

/**
 * Published slugs only. A draft would otherwise be prerendered as its own 404,
 * which works but leaves a build artifact named after an unpublished piece.
 */
export async function generateStaticParams() {
  return (await publishedWriting()).map((meta) => ({ slug: meta.slug }))
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params
  const entry = await loadWriting(slug)
  if (!entry || entry.meta.status !== 'published') return {}
  const { meta } = entry
  const url = `${site.url}/writing/${meta.slug}`
  return {
    title: meta.title,
    description: meta.description,
    alternates: { canonical: url },
    openGraph: {
      title: meta.title,
      description: meta.description,
      type: 'article',
      url,
      publishedTime: meta.date,
      ...(meta.updated ? { modifiedTime: meta.updated } : {}),
      authors: [meta.byline ?? site.name],
    },
    twitter: { card: 'summary_large_image', title: meta.title, description: meta.description },
  }
}

/**
 * One article.
 *
 * The case study's reading shell, reused rather than rebuilt: the same
 * 82rem grid with a 10rem rail, the same 58rem reading column, the same
 * display and prose styles. What it does not reuse is the case study's
 * metadata block. A case study says what the role and the artifact were; an
 * article has a title, a sentence and a date, and adding empty fields for the
 * rest would be a form nobody filled in.
 *
 * A draft returns 404. Nothing else needs to know: the list, the archive and
 * the sitemap all read the published set, so a draft cannot leak by being
 * forgotten in one of them.
 */
export default async function WritingPage({ params }: Params) {
  const { slug } = await params
  const entry = await loadWriting(slug)
  if (!entry || entry.meta.status !== 'published') notFound()

  const { meta, default: Body } = entry
  const sections = (meta.sections ?? []).map((title) => ({ id: slugify(title), title }))

  return (
    <>
      <SiteHeader current={'writing'} />
      <HashScroll />

      <div id="article" className="relative mx-auto max-w-[58rem] px-6 sm:px-10">
        <div
          className={
            sections.length > 0
              ? ''
              : 'grid'
          }
        >
          {sections.length > 0 ? <Toc sections={sections} /> : null}

          <div
            className="prose-column w-full min-w-0"
          >
            <header className="max-w-none pb-12 pt-16 sm:pb-14 sm:pt-20">
              <h1 className="display max-w-[15ch] text-[clamp(2.5rem,6.4vw,4.25rem)] leading-[1.0] text-ink-12">
                {meta.title}
              </h1>
              <p className="mt-6 max-w-[46ch] text-[1.0625rem] leading-[1.65] text-soft">
                {meta.description}
              </p>
              <p className="mt-8 flex flex-wrap items-baseline gap-x-5 gap-y-1 border-t border-[color:var(--hairline)] pt-6 font-mono text-[0.8125rem] text-ink-11">
                {meta.byline ? <span>{meta.byline}</span> : null}
                <time dateTime={meta.date}>{formatArticleDate(meta.date)}</time>
                {meta.updated ? (
                  <>
                    {' · updated '}
                    <time dateTime={meta.updated}>{formatArticleDate(meta.updated)}</time>
                  </>
                ) : null}
              </p>
            </header>

            <Body />

            <div className="mt-16 max-w-none">
              <div className="rule-fade" />
              <p className="pt-6">
                <Link
                  href="/writing"
                  className="group inline-flex items-center gap-1.5 text-[0.9375rem] font-medium text-signal"
                >
                  <span className="trim-cap">All writing</span>
                  <span className="icon-slot">
                    <span>
                      <ArrowRight />
                    </span>
                  </span>
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>

      <SiteFooter />
    </>
  )
}
