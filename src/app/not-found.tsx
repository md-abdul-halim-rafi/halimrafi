import type { Metadata } from 'next'
import { SiteFooter } from '@/components/site/Chrome'
import { SiteHeader } from '@/components/site/SiteHeader'
import { BackLink } from '@/components/ui/BackLink'

/**
 * A title of its own. Without it the 404 inherited the root layout's default,
 * so a wrong address sat in the reader's tabs and history calling itself the
 * front page.
 */
export const metadata: Metadata = {
  title: 'Page not found',
}

/**
 * The page a wrong address lands on.
 *
 * It says what happened, why it might have happened, and offers the two places
 * worth going instead. Nothing else: a wrong address is a small
 * disappointment, and a large numeral or an illustration turns it into an
 * event. The site's header and footer stay, so the reader can see they are
 * still somewhere rather than nowhere.
 *
 * Both destinations are explicit hrefs. Nothing redirects on a timer and
 * nothing sends the reader back through their history — someone who arrived
 * here from a search result has no previous page on this site, and a control
 * that goes somewhere different for every visitor is not a way out.
 *
 * The page is a flex column a viewport tall with the main area growing, so on a
 * short screen the footer sits at the bottom because there is nothing above it
 * to push it down, and on a tall one it sits under the content. No fixed
 * footer, and no spacer holding open a height somebody guessed.
 */
export default function NotFound() {
  return (
    <div className="flex min-h-dvh flex-col">
      <SiteHeader />

      <main className="mx-auto flex w-full max-w-[58rem] flex-1 flex-col justify-center px-6 py-20 sm:px-10">
        {/* One compact group: label, heading, the reason, the way out. */}
        <div>
          <p className="label">404</p>

          <h1 className="not-found-title mt-4">This page couldn’t be found.</h1>

          <p className="mt-4 max-w-[46ch] text-[1.0625rem] leading-[1.6] text-soft">
            The link may be outdated, or the address may be incorrect.
          </p>

          <p className="mt-8 flex flex-wrap items-baseline gap-x-7 gap-y-3">
            <BackLink href="/">Home</BackLink>
            <BackLink href="/writing" arrow={false}>
              Browse writing
            </BackLink>
          </p>
        </div>
      </main>

      <SiteFooter />
    </div>
  )
}
