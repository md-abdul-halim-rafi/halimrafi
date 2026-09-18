import Link from 'next/link'
import { STORY } from '@/explorations/data'
import { person } from '@/explorations/data'
import { publishedWriting } from '@/lib/writing'

/**
 * The site header. Every page renders this one, including the front page.
 *
 * It used to be two headers that merely looked alike: the front page had its
 * own inside the story composition, and this component approximated it for the
 * article and archive pages. They disagreed on all three things a header is
 * made of — the name sat 9px lower on the front page, the rule 14px lower and
 * dotted rather than solid — so every navigation between them shifted the top
 * of the page. Approximating a layout in two places is how that happens; one
 * component is the fix.
 *
 * The geometry is the front page's, because that is the register the rest of
 * the site was brought into: `pt-6` above, a 40px control row, the dotted rule
 * below. The links are the same set everywhere, so nothing appears, disappears
 * or moves across a navigation — which also gives the front page the way to
 * About it had been missing since the composition replaced the old homepage.
 *
 * The current page is named but not linked, and on the front page that applies
 * to the name itself.
 */
export async function SiteHeader({ current }: { current?: 'home' | 'about' | 'writing' }) {
  const hasWriting = (await publishedWriting()).length > 0

  return (
    <div className="mx-auto w-full max-w-[58rem] px-6 sm:px-10">
      <header className="flex items-baseline justify-between gap-6 pt-6">
        <p className="story-ink text-[0.8125rem] font-medium">
          {current === 'home' ? (
            person.name
          ) : (
            <Link href="/" className="story-link story-link-in">
              {person.name}
            </Link>
          )}
        </p>

        <nav aria-label="Site" className="flex items-baseline gap-x-6">
          {hasWriting ? <Item href="/writing" label="Writing" current={current === 'writing'} /> : null}
          <Item href="/about" label="About" current={current === 'about'} />
          <a
            href={`mailto:${STORY.email}`}
            className="story-mono story-control story-link story-link-out"
          >
            <span>Email</span>
          </a>
        </nav>
      </header>
      <hr className="story-rule mt-5" />
    </div>
  )
}

/**
 * One nav item. The current page keeps the control's box so the row's height
 * and the items' positions do not depend on which page you are on.
 */
function Item({ href, label, current }: { href: string; label: string; current: boolean }) {
  if (current) {
    return (
      <span aria-current="page" className="story-mono story-control story-ink">
        {label}
      </span>
    )
  }
  return (
    <Link href={href} className="story-mono story-control story-link story-link-in">
      {label}
    </Link>
  )
}
