import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Switcher } from '@/components/explorations/Switcher'
import { slugify } from '@/components/story/prose'
import { loadWork } from '@/lib/work'

/**
 * The title follows the article, so the two case studies do not share one.
 * Indexing stays off for every slug: these are previews of live articles.
 */
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const entry = await loadWork((await params).slug)
  return {
    title: entry ? `${entry.meta.title}, Studio preview` : 'Studio preview',
    robots: { index: false, follow: false },
  }
}


/**
 * Two exploration routes link to this article, and the way back has to return
 * the reader to the one they came from. `?from=` names it; anything else, or
 * nothing at all, falls back to Studio, which is where the article lives. The
 * value is looked up in this table rather than used as an href, so a crafted
 * query cannot point the link anywhere.
 */
const ORIGINS = {
  studio: { href: '/explorations/studio', label: 'Back to Studio' },
  story: { href: '/explorations/story', label: 'Back to Story' },
} as const

function originOf(from: string | string[] | undefined) {
  const key = Array.isArray(from) ? from[0] : from
  return key && key in ORIGINS ? ORIGINS[key as keyof typeof ORIGINS] : ORIGINS.studio
}

type Props = {
  params: Promise<{ slug: string }>
  searchParams: Promise<{ from?: string | string[] }>
}

/**
 * Rendered in the rail on wide screens and under the title on narrow ones, so
 * the reader never meets the metadata before the title.
 *
 * Role only. The artifact's label is the simulated-data notice, and the demo
 * already carries that where it matters; repeating it up here would be the
 * second of two disclaimers on one page.
 */
function Credits({ role }: { role: string }) {
  return (
    <dl className="space-y-3 border-t border-[color:var(--hairline)] pt-4">
      <div className="flex gap-3">
        <dt className="label w-20 shrink-0 pt-px">Role</dt>
        <dd className="text-[0.8125rem] leading-snug text-ink-11">{role}</dd>
      </div>
    </dl>
  )
}

/**
 * Any published case study, in Studio's clothes.
 *
 * One route for every slug in the work registry rather than a folder per
 * article: the shell is identical and the content module is what differs, so a
 * second copy would only be a place for the two to drift.
 *
 * The content and the demo are the same modules the live article uses, so there
 * is one source for both. What changes is the shell: wrapping everything in
 * `data-explore="studio"` re-points the colour tokens, and the prose components
 * are written against those tokens rather than fixed colours, so the article
 * takes Studio's warm palette, type hierarchy, dividers, links and captions
 * without a second stylesheet.
 *
 * The layout follows Studio's convention as well: a 280px column beside the
 * content, carrying the role and the section list. That column is a real grid
 * track rather than a floating rail, so it cannot overlap the article or the
 * demo at any width, and it is not rendered at all below 1024px.
 *
 * The reading measure is narrowed to about 65 characters for this page, and the
 * demo still breaks wider through `.breakout`.
 */
export default async function StudioArticlePreview({ params, searchParams }: Props) {
  const entry = await loadWork((await params).slug)
  if (!entry || entry.meta.status !== 'published') notFound()

  const origin = originOf((await searchParams).from)

  const { meta, default: Body } = entry
  const sections = meta.sections.map((title) => ({ id: slugify(title), title }))

  return (
    <div
      data-explore="studio"
      className="min-h-dvh bg-paper text-ink-11"
      style={{ ['--measure-read' as string]: '33rem' }}
    >
      <main className="mx-auto max-w-[75rem] px-5 pb-20 pt-12 sm:px-6 sm:pt-16">
        <div className="grid gap-x-10 gap-y-10 lg:grid-cols-[280px_minmax(0,1fr)]">
          {/* The way back is its own row so that the title, not the metadata,
              is the first thing under it when the columns collapse. */}
          <p className="lg:col-span-2">
            <Link href={origin.href} className="studio-back">
              <span aria-hidden>&larr;</span>
              <span className="trim-cap">{origin.label}</span>
            </Link>
          </p>

          {/* Wide screens only. A contents list that cannot be seen while
              reading is dead weight on a phone, and it would otherwise sit
              below the whole article. */}
          <div className="hidden lg:block lg:sticky lg:top-10 lg:self-start">
            <Credits role={meta.role} />

            <nav aria-label="Contents" className="mt-8 border-t border-[color:var(--hairline)] pt-4">
              <p className="label">Contents</p>
              <ol className="mt-1.5 space-y-0.5">
                {sections.map((section) => (
                  <li key={section.id}>
                    <a
                      href={`#${section.id}`}
                      className="flex min-h-6 items-center text-[0.8125rem] leading-[1.35] text-ink-10 transition-colors duration-200 [transition-timing-function:var(--ease-out-quint)] hover:text-ink-12"
                    >
                      {section.title}
                    </a>
                  </li>
                ))}
              </ol>
            </nav>
          </div>

          <article className="prose-column min-w-0">
            <header className="max-w-none pb-8">
              <p className="label">Case study</p>
              <h1 className="display mt-4 max-w-[18ch] text-[clamp(2rem,3.4vw,2.75rem)] leading-[1.02] text-ink-12">
                {meta.title}
              </h1>
              <div className="mt-7 lg:hidden">
                <Credits role={meta.role} />
              </div>
            </header>

            <Body />

            <div className="mt-14 max-w-none border-t border-[color:var(--hairline)] pt-6">
              <p>
                <Link href={origin.href} className="studio-back">
                  <span aria-hidden>&larr;</span>
                  <span className="trim-cap">{origin.label}</span>
                </Link>
              </p>
            </div>
          </article>
        </div>
      </main>

      <Switcher />
    </div>
  )
}
