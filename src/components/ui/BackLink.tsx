import Link from 'next/link'

/**
 * The way back out of a page.
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
 */
export function BackLink({ href, children }: { href: string; children: string }) {
  return (
    <Link href={href} className="back-link">
      <span aria-hidden className="back-link-arrow">
        &larr;
      </span>
      <span>{children}</span>
    </Link>
  )
}
