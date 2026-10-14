/**
 * A small inline icon set. Drawn on a 16 grid at a 1.5 stroke so they sit at
 * the same visual weight as the 14px labels beside them, and inherit colour.
 */
type IconProps = { className?: string }

const base = {
  width: 16,
  height: 16,
  viewBox: '0 0 16 16',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.5,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  'aria-hidden': true,
}

export function ArrowRight({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M3 8h10M9 4l4 4-4 4" />
    </svg>
  )
}

export function Play({ className }: IconProps) {
  return (
    <svg {...base} className={className} fill="currentColor" stroke="none">
      <path d="M5 3.6c0-.5.5-.8.9-.5l6.2 4.1c.4.3.4.8 0 1l-6.2 4.2c-.4.3-.9 0-.9-.5z" />
    </svg>
  )
}

export function Pause({ className }: IconProps) {
  return (
    <svg {...base} className={className} fill="currentColor" stroke="none">
      <rect x="4.5" y="3.5" width="2.4" height="9" rx="0.8" />
      <rect x="9.1" y="3.5" width="2.4" height="9" rx="0.8" />
    </svg>
  )
}

export function Reset({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M13 8a5 5 0 1 1-1.6-3.7" />
      <path d="M13 2.6V5h-2.4" />
    </svg>
  )
}
