import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { ArticleLayout, type ArticleDetail } from '@/components/article/ArticleLayout'
import { slugify } from '@/components/story/prose'
import { site } from '@/lib/site'
import { loadWork, workSlugs } from '@/lib/work'

type Params = { params: Promise<{ slug: string }> }

export function generateStaticParams() {
  return workSlugs.map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params
  const entry = await loadWork(slug)
  if (!entry || entry.meta.status !== 'published') return {}
  const { meta } = entry
  const url = `${site.url}/work/${meta.slug}`
  return {
    title: meta.title,
    description: meta.summary,
    alternates: {
      canonical: url,
      // Unlisted means unlisted: no Markdown is served for it, so none is
      // advertised.
      ...(meta.listed === false ? {} : { types: { 'text/markdown': `${url}.md` } }),
    },
    /*
     * An unlisted piece is not offered to anyone who has not been given the
     * link, and that has to include a crawler that reaches it by some other
     * route. Leaving it out of the sitemap only stops it being submitted.
     *
     * `follow` stays true: the page is not disowned, and the links out of it
     * lead to pages that are on offer.
     */
    ...(meta.listed === false ? { robots: { index: false, follow: true } } : {}),
    openGraph: {
      title: meta.title,
      description: meta.summary,
      type: 'article',
      url,
      publishedTime: meta.date,
      authors: [site.name],
      images: [{ url: site.ogImage, width: 1200, height: 630, alt: site.ogImageAlt }],
    },
    twitter: { card: 'summary_large_image', title: meta.title, description: meta.summary },
  }
}

/**
 * A case study.
 *
 * The route is unchanged — these URLs are published — but the page is now the
 * shared `ArticleLayout`, the same one an essay is published in. What makes it
 * a case study is two pieces of data: the kicker, and the details below the
 * metadata. Everything else a reader sees is the shell both kinds share.
 *
 * Role and collaborators are details, not a masthead. They used to open the
 * page in a bordered block above the writing; they sit under the date now,
 * still stated in full, because the credit matters and the position did not.
 */
export default async function WorkPage({ params }: Params) {
  const { slug } = await params
  const entry = await loadWork(slug)
  if (!entry || entry.meta.status !== 'published') notFound()

  const { meta, default: Body } = entry
  const sections = meta.sections.map((title) => ({ id: slugify(title), title }))

  const details: ArticleDetail[] = [{ term: 'Role', value: meta.role }]
  if (meta.collaborators.length > 0) {
    details.push({ term: 'Worked with', value: meta.collaborators.join(', ') })
  }
  if (meta.artifact.label) {
    details.push({ term: 'Artifact', value: meta.artifact.label })
  }

  return (
    <ArticleLayout
      kind="case-study"
      title={meta.title}
      description={meta.summary}
      date={meta.date}
      url={`${site.url}/work/${meta.slug}`}
      sections={sections}
      details={details}
    >
      <Body />
    </ArticleLayout>
  )
}
