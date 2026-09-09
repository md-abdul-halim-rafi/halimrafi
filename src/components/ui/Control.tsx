import Link from 'next/link'
import type { ReactNode } from 'react'

type Variant = 'primary' | 'signal' | 'quiet'

const VARIANT: Record<Variant, string> = {
  primary: 'ctl-primary',
  signal: 'ctl-signal',
  quiet: 'ctl-quiet',
}

/**
 * The icon that appears on hover or keyboard focus. Its column opens first and
 * the icon arrives into the room it made, which is why the delay lives on the
 * hover state rather than the resting one.
 */
function HoverIcon({ children }: { children: ReactNode }) {
  return (
    <span className="icon-slot" aria-hidden>
      <span>{children}</span>
    </span>
  )
}

type Common = {
  children: ReactNode
  variant?: Variant
  icon?: ReactNode
  className?: string
}

/**
 * Holds room for the widest label a control will ever carry.
 *
 * A playback control changes its own label as it runs, and each label is a
 * different width, so the button resizes under the reader's cursor and drags
 * whatever sits beside it sideways. The widest wording is measured in the same
 * grid cell so the cell is as wide as the widest state from the first paint,
 * and the visible label is centred in it. Measuring the text rather than
 * writing a pixel width means it survives a font change.
 *
 * The reservation is a CSS `content` string rather than a second copy of the
 * text in the DOM. A duplicate would land in `textContent`, where a button
 * reading "Pause" would answer "PauseReplay comparison" to anything reading it
 * back, tests included. `visibility: hidden` keeps the pseudo-element out of
 * the accessibility tree while it still takes up its width.
 */
function Label({ children, reserve }: { children: ReactNode; reserve?: string }) {
  if (!reserve) return <span className="trim-cap">{children}</span>
  return (
    /* Left-aligned, so the icon and the first character stay together exactly
       as they do in the widest state. Centring the label inside the reserved
       cell left the icon stranded at the far edge, which is a different look
       from the one the button has at rest. */
    <span className="trim-cap grid justify-items-start">
      <span className="col-start-1 row-start-1">{children}</span>
      <span
        className="ctl-reserve col-start-1 row-start-1"
        style={{ ['--ctl-reserve' as string]: JSON.stringify(reserve) }}
        aria-hidden
      />
    </span>
  )
}

export function ControlLink({
  href,
  children,
  variant = 'quiet',
  icon,
  className = '',
}: Common & { href: string }) {
  const external = href.startsWith('http') || href.startsWith('mailto:')
  const content = (
    <>
      <span className="trim-cap">{children}</span>
      {icon ? <HoverIcon>{icon}</HoverIcon> : null}
    </>
  )
  const classes = `ctl ${VARIANT[variant]} ${variant !== 'quiet' ? 'on-signal' : ''} ${className}`

  if (external) {
    return (
      <a href={href} className={classes}>
        {content}
      </a>
    )
  }
  return (
    <Link href={href} className={classes}>
      {content}
    </Link>
  )
}

export function ControlButton({
  children,
  variant = 'quiet',
  icon,
  className = '',
  reserve,
  ...props
}: Common & { reserve?: string } & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      type="button"
      className={`ctl ${VARIANT[variant]} ${variant !== 'quiet' ? 'on-signal' : ''} ${className}`}
      {...props}
    >
      {icon ? (
        <span className="flex shrink-0 items-center" aria-hidden>
          {icon}
        </span>
      ) : null}
      <Label reserve={reserve}>{children}</Label>
    </button>
  )
}
