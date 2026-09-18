import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { SiteFooter } from '@/components/site/Chrome'
import { SiteHeader } from '@/components/site/SiteHeader'
import { HashScroll } from '@/components/story/HashScroll'
import { slugify } from '@/components/story/prose'
import { Toc } from '@/components/story/Toc'
import { ArrowRight } from '@/components/ui/icons'
import { formatDate, loadWork, workSlugs } from '@/lib/work'

type Params = { params: Promise<{ slug: string }> }

export function generateStaticParams() {
  return workSlugs.map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params
  const entry = await loadWork(slug)
  if (!entry) return {}
  return {
    title: entry.meta.title,
    description: entry.meta.summary,
    openGraph: { title: entry.meta.title, description: entry.meta.summary, type: 'article' },
  }
}

export default async function WorkPage({ params }: Params) {
  const { slug } = await params
  const entry = await loadWork(slug)
  if (!entry || entry.meta.status !== 'published') notFound()

  const { meta, default: Body } = entry
  const sections = meta.sections.map((title) => ({ id: slugify(title), title }))

  return (
    <>
      <SiteHeader />
      <HashScroll />

      {/*
        One grid runs the whole article, so the opening and the body share a
        single left edge instead of each centring itself. The contents rail is a
        real column: reserving its space is what stops the wide figure from
        running underneath it, which no amount of stacking order would fix.

        Below the rail's breakpoint the column carries its own max width and
        centres as a block, so the page does not leave a wide empty gutter.
      */}
      <div id="article" className="relative mx-auto max-w-[58rem] px-6 sm:px-10">
        <div>
          <Toc sections={sections} />

          <div className="prose-column w-full min-w-0">
            <header className="max-w-none pb-12 pt-16 sm:pb-14 sm:pt-20">
              <p className="label">Case study</p>
              <h1 className="display mt-5 max-w-[15ch] text-[clamp(2.5rem,6.4vw,4.25rem)] leading-[1.0] text-ink-12">
                {meta.title}
              </h1>
              <p className="mt-6 max-w-[46ch] text-[1.0625rem] leading-[1.65] text-soft">
                {meta.summary}
              </p>

              <dl className="mt-9 flex max-w-none flex-wrap gap-x-12 gap-y-5 border-t border-[color:var(--hairline)] pt-6">
                <div>
                  <dt className="label">Published</dt>
                  <dd className="mt-2 font-mono text-[0.8125rem] text-ink-11">
                    {formatDate(meta.date)}
                  </dd>
                </div>
                <div className="max-w-[30ch]">
                  <dt className="label">Role</dt>
                  <dd className="mt-2 text-[0.8125rem] leading-snug text-ink-11">{meta.role}</dd>
                </div>
                {meta.artifact.label ? (
                  <div className="max-w-[30ch]">
                    <dt className="label">Artifact</dt>
                    <dd className="mt-2 text-[0.8125rem] leading-snug text-ink-11">
                      {meta.artifact.label}
                    </dd>
                  </div>
                ) : null}
              </dl>
            </header>

            {/* Direct children of the column, so the measure rule reaches them. */}
            <Body />

            <div className="mt-16 max-w-none">
              <div className="rule-fade" />
              <p className="pt-6">
                <Link
                  href="/"
                  className="group inline-flex items-center gap-1.5 text-[0.9375rem] font-medium text-signal"
                >
                  <span className="trim-cap">Back to the front page</span>
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
