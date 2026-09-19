import Link from 'next/link'
import { hasEmail, site } from '@/lib/site'
import { publishedWriting } from '@/lib/writing'

/**
 * Where you are, and where else you can go.
 *
 * Every page renders this one component and tells it which page it is, rather
 * than each template assembling its own row — two headers that merely resemble
 * each other is how this site previously came to shift its own layout on every
 * navigation.
 *
 * The front page needs no trail, because it is the place a trail leads back
 * to, and no wordmark, because the hero underneath says the name at
 * forty-six pixels. It gets the three destinations, centred.
 *
 * Every other page gets a trail on the left and, on the right, the
 * destinations it is not already on. An article's trail leads to the section
 * it belongs to; it does not repeat the title, which is set underneath it at
 * three times the size, and it does not mark Writing as the current page,
 * because the reader is not on Writing — they are on something Writing lists.
 *
 * Narrow screens get one link back instead of a trail: a trail and a nav at
 * 390px is either two rows or a collision.
 */

export type HeaderPage = 'home' | 'writing' | 'article' | 'photographs' | 'none'

const WRITING = { href: '/writing', label: 'Writing' }
const PHOTOGRAPHS = { href: '/photographs', label: 'Photography' }

export async function SiteHeader({ page = 'none' }: { page?: HeaderPage }) {
  const hasWriting = (await publishedWriting()).length > 0

  // The right-hand side offers everything this page is not already on.
  const onWriting = page === 'writing' || page === 'article'
  const elsewhere = [
    ...(hasWriting && !onWriting ? [WRITING] : []),
    ...(page !== 'photographs' ? [PHOTOGRAPHS] : []),
  ]

  if (page === 'home') {
    return (
      <header className="site-header">
        <div className="site-header-inner site-header-inner--center">
          <nav aria-label="Site" className="site-nav">
            {hasWriting ? (
              <Link href={WRITING.href} className="site-nav-link">
                {WRITING.label}
              </Link>
            ) : null}
            <Link href={PHOTOGRAPHS.href} className="site-nav-link">
              {PHOTOGRAPHS.label}
            </Link>
            <EmailLink />
          </nav>
        </div>
      </header>
    )
  }

  // The trail's last step: the section this page belongs to.
  const section =
    page === 'photographs' ? PHOTOGRAPHS : page === 'writing' || page === 'article' ? WRITING : null

  return (
    <header className="site-header">
      <div className="site-header-inner">
        {/* Wide: the trail. */}
        <nav aria-label="Breadcrumb" className="site-trail">
          <ol>
            <li>
              <Link href="/" className="site-nav-link">
                Home
              </Link>
            </li>
            {section ? (
              <li>
                <span aria-hidden className="site-trail-mark">
                  /
                </span>
                {page === 'article' ? (
                  <Link href={section.href} className="site-nav-link">
                    {section.label}
                  </Link>
                ) : (
                  <span aria-current="page" className="site-nav-here">
                    {section.label}
                  </span>
                )}
              </li>
            ) : null}
          </ol>
        </nav>

        {/* Narrow: one step back, which is the only step worth the room. */}
        <nav aria-label="Back" className="site-back">
          <Link
            href={page === 'article' && section ? section.href : '/'}
            className="site-nav-link site-back-link"
          >
            <span aria-hidden>&larr;</span>
            <span>{page === 'article' && section ? section.label : 'Home'}</span>
          </Link>
        </nav>

        <nav aria-label="Site" className="site-nav">
          {elsewhere.map((item, i) => (
            <Link
              key={item.href}
              href={item.href}
              /* A third onward link is dropped on the narrowest screens; see
                 the rule in globals.css for the arithmetic. */
              className={`site-nav-link${elsewhere.length > 1 && i === elsewhere.length - 1 ? ' site-nav-link--optional' : ''}`}
            >
              {item.label}
            </Link>
          ))}
          <EmailLink />
        </nav>
      </div>
    </header>
  )
}

function EmailLink() {
  if (!hasEmail()) return null
  return (
    <a href={`mailto:${site.email}`} className="site-nav-link site-nav-link--out">
      Email
    </a>
  )
}
