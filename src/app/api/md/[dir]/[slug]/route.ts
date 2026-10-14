import { articleMarkdown } from '@/lib/markdown'
import { loadWork } from '@/lib/work'
import { loadWriting } from '@/lib/writing'

/**
 * The Markdown behind `/writing/<slug>.md` and `/work/<slug>.md`.
 *
 * A rewrite in `next.config.ts` maps those addresses here, so the Markdown
 * lives at the article's own URL with a suffix — which is where something
 * looking for it will try first — rather than at an API path nobody would
 * guess.
 *
 * The same rules as the page apply, because they are read from the same
 * metadata: a draft is not served, and neither is a piece marked `listed:
 * false`. An agent is offered exactly what a reader browsing the site is
 * offered, which is the point of having one flag rather than one per audience.
 */
export const dynamic = 'force-static'

export async function generateStaticParams() {
  return []
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ dir: string; slug: string }> },
) {
  const { dir, slug } = await params

  if (dir === 'writing') {
    const entry = await loadWriting(slug)
    if (!entry || entry.meta.status !== 'published') return notFound()
    const { meta } = entry
    return markdown(
      await articleMarkdown('writing', {
        kind: 'article',
        slug: meta.slug,
        title: meta.title,
        description: meta.description,
        date: meta.date,
        byline: meta.byline,
      }),
    )
  }

  if (dir === 'work') {
    const entry = await loadWork(slug)
    if (!entry || entry.meta.status !== 'published' || entry.meta.listed === false) {
      return notFound()
    }
    const { meta } = entry
    return markdown(
      await articleMarkdown('work', {
        kind: 'case-study',
        slug: meta.slug,
        title: meta.title,
        description: meta.summary,
        date: meta.date,
      }),
    )
  }

  return notFound()
}

function markdown(body: string) {
  return new Response(body, {
    headers: {
      'content-type': 'text/markdown; charset=utf-8',
      'cache-control': 'public, max-age=0, must-revalidate',
    },
  })
}

function notFound() {
  return new Response('Not found\n', {
    status: 404,
    headers: { 'content-type': 'text/plain; charset=utf-8' },
  })
}
