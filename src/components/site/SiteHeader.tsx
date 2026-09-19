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
 * or moves across a navigation.
 *
 * About is not among them: the standalone page was removed, and what it held
 * that the site still wants — the biography and the way to get in touch — is on
 * the front page. Photographs is reached from the front page's closing rather
 * than from here, which keeps this row to the two destinations that are not
 * already on the page a reader starts from.
 *
 * The current page is named but not linked, and on the front page that applies
 * to the name itself.
 */
export async function SiteHeader({ current }: { current?: 'home' | 'writing' }) {
  const hasWriting = (await publishedWriting()).length > 0

  return (
    <div className="mx-auto w-full max-w-[58rem] px-6 sm:px-10">
      <header className="flex items-center justify-between gap-6 pt-6">
        {/*
          The mark, in place of the name set in type.

          It is the favicon's own file rather than a copy of its path, so the
          tab and the page cannot end up showing two different R's.

          `alt` carries the name: on every page but the front one this is the
          link home, and its accessible name is the only one it has.
        */}
        <p className="story-control">
          {current === 'home' ? (
            <SiteMark />
          ) : (
            <Link href="/" className="site-mark-link" aria-label={`${person.name}, home`}>
              <SiteMark decorative />
            </Link>
          )}
        </p>

        <nav aria-label="Site" className="flex items-baseline gap-x-6">
          {hasWriting ? (
            <Item href="/writing" label="Writing" current={current === 'writing'} />
          ) : null}
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
 * The R, at the size the header wears it.
 *
 * A plain `<img>`, not `next/image`: the file is 2.5KB of vector that must
 * paint with the first frame of the header, and an optimiser has nothing to
 * take off it. Width and height are set so the row reserves its box before the
 * file arrives and the nav beside it never moves.
 */
function SiteMark({ decorative = false }: { decorative?: boolean }) {
  return (
    /* eslint-disable-next-line @next/next/no-img-element */
    <img
      src="/icon.svg"
      alt={decorative ? '' : person.name}
      width={22}
      height={22}
      className="site-mark"
    />
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
