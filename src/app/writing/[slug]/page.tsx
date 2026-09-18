import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { ArticleLayout } from '@/components/article/ArticleLayout'
import { slugify } from '@/components/story/prose'
import { site } from '@/lib/site'
import { loadWriting, publishedWriting } from '@/lib/writing'

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
 * The same shell a case study is published in, with no case-study details and
 * no kicker — an essay has a title, a sentence and a date, and adding empty
 * fields for a role it does not have would be a form nobody filled in.
 *
 * A draft returns 404. Nothing else needs to know: every list reads the
 * published set, so a draft cannot leak by being forgotten in one of them.
 */
export default async function WritingPage({ params }: Params) {
  const { slug } = await params
  const entry = await loadWriting(slug)
  if (!entry || entry.meta.status !== 'published') notFound()

  const { meta, default: Body } = entry
  const sections = (meta.sections ?? []).map((title) => ({ id: slugify(title), title }))

  return (
    <ArticleLayout
      kind="article"
      title={meta.title}
      description={meta.description}
      date={meta.date}
      updated={meta.updated}
      byline={meta.byline}
      url={`${site.url}/writing/${meta.slug}`}
      sections={sections}
    >
      <Body />
    </ArticleLayout>
  )
}
