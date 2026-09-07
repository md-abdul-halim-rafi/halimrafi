'use client'

import { useEffect, useRef, useState } from 'react'
import { useReducedMotion } from '@/lib/useReducedMotion'

/**
 * The one scroll transition on this site.
 *
 * A frame lifts as it enters: its shadow arrives, its hairline sharpens, and it
 * settles up a few pixels. Opacity and transform only, so the content inside
 * never reflows and never scales. It runs once, it is short, and under a
 * reduced-motion preference the frame is simply in its settled state from the
 * start.
 */
export function Reveal({
  children,
  className = '',
}: {
  children: React.ReactNode
  className?: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const [seen, setSeen] = useState(false)
  const reduced = useReducedMotion()
  // Derived, so no effect writes state during render. Under reduced motion the
  // frame is settled from the first paint.
  const entered = reduced || seen

  useEffect(() => {
    const el = ref.current
    if (!el || reduced) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setSeen(true)
          observer.disconnect()
        }
      },
      { rootMargin: '0px 0px -12% 0px' },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [reduced])

  return (
    <div
      ref={ref}
      data-entered={entered ? '' : undefined}
      className={`transition-[transform,box-shadow,border-color] duration-[620ms] [transition-timing-function:var(--ease-out-quint)] ${className}`}
      style={{
        transform: entered ? 'translateY(0)' : 'translateY(14px)',
        boxShadow: entered ? 'var(--card-shadow)' : '0 0 0 rgba(0,0,0,0)',
      }}
    >
      {children}
    </div>
  )
}
