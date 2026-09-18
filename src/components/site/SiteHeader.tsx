import Link from 'next/link'
import { site } from '@/lib/site'
import { publishedWriting } from '@/lib/writing'

/**
 * The site header, in the front page's register.
 *
 * It used to be a sticky translucent app bar with a nav, which belonged to the
 * editorial homepage that the story composition replaced. Against that
 * composition it read as furniture from another site: a bar that follows you
 * down a page whose own header simply sits at the top and scrolls away.
 *
 * So this is the front page's header with the links the other pages need: the
 * name on the left, a way onward on the right, one hairline under it, and no
 * stickiness. Same measure and same padding as the page below it, so the name
 * lines up with the first line of the article rather than floating in a
 * full-width bar above it.
 */
export async function SiteHeader({ current }: { current?: 'work' | 'about' | 'writing' }) {
  const hasWriting = (await publishedWriting()).length > 0

  const link = (active: boolean) =>
    `story-mono text-[0.75rem] ${active ? 'text-ink-12' : 'story-link story-link-in'}`

  return (
    <header className="mx-auto w-full max-w-[58rem] px-6 sm:px-10">
      <div className="flex items-baseline justify-between gap-6 border-b border-[color:var(--hairline)] py-6">
        <p className="text-[0.8125rem] font-medium text-ink-12">
          <Link href="/" className="story-link story-link-in">
            {site.name}
          </Link>
        </p>

        <nav aria-label="Site" className="flex items-baseline gap-5">
          {hasWriting ? (
            <Link
              href="/writing"
              aria-current={current === 'writing' ? 'page' : undefined}
              className={link(current === 'writing')}
            >
              Writing
            </Link>
          ) : null}
          <Link
            href="/about"
            aria-current={current === 'about' ? 'page' : undefined}
            className={link(current === 'about')}
          >
            About
          </Link>
        </nav>
      </div>
    </header>
  )
}
