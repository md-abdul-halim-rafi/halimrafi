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
  ...props
}: Common & React.ButtonHTMLAttributes<HTMLButtonElement>) {
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
      <span className="trim-cap">{children}</span>
    </button>
  )
}
