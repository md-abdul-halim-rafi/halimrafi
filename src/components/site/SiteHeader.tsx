import Link from 'next/link'
import { site } from '@/lib/site'
import { publishedWriting } from '@/lib/writing'

/**
 * The site header.
 *
 * A sticky strip on an opaque surface, not a translucent floating pill. The old
 * pill let sentences show through and around it while the page scrolled, which
 * read as a defect rather than a material. An opaque strip with a hairline under
 * it means text passes behind a real edge.
 *
 * Its height is published as `--header-h` so anchor scrolling and keyboard focus
 * can clear it. Nothing is scroll-triggered, so its presence is predictable and
 * a keyboard user never has focus land under an element that just appeared.
 */
export async function SiteHeader({ current }: { current?: 'work' | 'about' | 'writing' }) {
  // The archive only earns a place in the navigation once something is in it.
  // Reading the published set here means the first article adds the link, with
  // no second place to remember to change.
  const hasWriting = (await publishedWriting()).length > 0

  return (
    <header className="sticky top-0 z-40 h-[var(--header-h)] border-b border-[color:var(--hairline)] bg-[color:color-mix(in_srgb,var(--paper)_92%,transparent)] backdrop-blur-md backdrop-saturate-150">
      <div className="mx-auto flex h-full max-w-[82rem] items-center justify-between gap-6 px-5 sm:px-8">
        <Link
          href="/"
          className="link-quiet trim-cap -mx-2 rounded-sm px-2 py-1 text-[0.875rem] font-medium text-ink-12"
        >
          {site.name}
        </Link>

        <nav aria-label="Site" className="flex items-center gap-1">
          <Link
            // The front page's work section. `#work` was an id on the
            // editorial homepage this replaced, and would now scroll nowhere.
            href="/#octolane"
            aria-current={current === 'work' ? 'page' : undefined}
            className={`trim-cap rounded-sm px-2.5 py-1.5 text-[0.8125rem] transition-colors duration-200 [transition-timing-function:var(--ease-out-quint)] ${
              current === 'work' ? 'text-ink-12' : 'text-muted hover:text-ink-12'
            }`}
          >
            Work
          </Link>
          {hasWriting ? (
            <Link
              href="/writing"
              aria-current={current === 'writing' ? 'page' : undefined}
              className={`trim-cap rounded-sm px-2.5 py-1.5 text-[0.8125rem] transition-colors duration-200 [transition-timing-function:var(--ease-out-quint)] ${
                current === 'writing' ? 'text-ink-12' : 'text-muted hover:text-ink-12'
              }`}
            >
              Writing
            </Link>
          ) : null}
          <Link
            href="/about"
            aria-current={current === 'about' ? 'page' : undefined}
            className={`trim-cap rounded-sm px-2.5 py-1.5 text-[0.8125rem] transition-colors duration-200 [transition-timing-function:var(--ease-out-quint)] ${
              current === 'about' ? 'text-ink-12' : 'text-muted hover:text-ink-12'
            }`}
          >
            About
          </Link>
        </nav>
      </div>
    </header>
  )
}
