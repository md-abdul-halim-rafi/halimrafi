import Link from 'next/link'

/**
 * The way out of a page, whether that is back or onward.
 *
 * The arrow is permanent, on the left, and points the way the link goes. It
 * used to be a right-pointing arrow that slid open on hover, on a link whose
 * label said "back" — the motion and the direction both argued with the words,
 * and the label moved sideways as the arrow made room, which is a layout shift
 * on hover.
 *
 * Nothing here moves. Hover and focus change colour and the underline; the
 * arrow and the text stay where they are, so the control is as still under the
 * pointer as it is beside it.
 *
 * `href` is always an explicit destination, never `history.back()`: a reader
 * who arrived from a search result has no previous page on this site, and a
 * control that sends them somewhere different each time is not a way back.
 *
 * The arrow is for the one link that means "back where you came from". A second
 * link offered beside it goes somewhere new, and drawing a left arrow on it
 * would say the opposite — so `arrow` turns it off while the two keep one
 * treatment.
 */
export function BackLink({
  href,
  arrow = true,
  children,
}: {
  href: string
  arrow?: boolean
  children: string
}) {
  return (
    <Link href={href} className="back-link">
      {arrow ? (
        <span aria-hidden className="back-link-arrow">
          &larr;
        </span>
      ) : null}
      <span>{children}</span>
    </Link>
  )
}
