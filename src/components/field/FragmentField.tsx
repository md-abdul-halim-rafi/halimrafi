'use client'

import { useEffect, useRef } from 'react'

/**
 * The field behind the opening: rows of short hairline fragments that drift in
 * scattered and settle into aligned lines.
 *
 * This is the featured decision drawn as geometry. The case study argues that an
 * answer arriving in pieces should be gathered into readable units before it is
 * shown; the field shows pieces finding their line. Concentric rings, which is
 * what this replaced, had no relationship to anything else on the page.
 *
 * Canvas rather than animated SVG: Blink does not compositor-promote transforms
 * inside an svg, so a field of moving hairlines repaints on the main thread
 * every frame. One canvas is a single composited layer.
 *
 * The still frame is the finished composition. Rows are drawn part settled and
 * part arriving, so the field reads as designed even when the loop never runs:
 * under a reduced-motion preference, on a hidden tab, or off screen.
 */

const ROWS = 13
const PER_ROW = 7
/** Seconds for one full settle cycle. Slow enough to read as drift. */
const CYCLE = 26

/** Deterministic, so the still frame is identical on every load. */
function noise(i: number, j: number): number {
  const n = Math.sin(i * 127.1 + j * 311.7) * 43758.5453
  return n - Math.floor(n)
}

export function FragmentField({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return // No context: the field simply does not draw.

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)')
    let frame = 0
    let onScreen = true
    let width = 0
    let height = 0

    const resize = () => {
      const rect = canvas.getBoundingClientRect()
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      width = rect.width
      height = rect.height
      canvas.width = Math.max(1, Math.round(width * dpr))
      canvas.height = Math.max(1, Math.round(height * dpr))
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    const draw = (t: number) => {
      ctx.clearRect(0, 0, width, height)
      if (width < 2 || height < 2) return

      const rowGap = height / (ROWS + 1)
      const measure = Math.min(width * 0.66, 560)
      const originX = (width - measure) / 2

      for (let row = 0; row < ROWS; row += 1) {
        const y = rowGap * (row + 1)

        // Each row runs its own phase of the same cycle, so at any instant some
        // rows are settled and others are still arriving.
        const phase = (t / (CYCLE * 1000) + row / ROWS) % 1
        // Ease the row from scattered (0) to settled (1) then hold.
        const settle = Math.min(1, phase * 1.8)
        const eased = 1 - Math.pow(1 - settle, 3)

        let x = originX
        for (let i = 0; i < PER_ROW; i += 1) {
          const r = noise(row, i)
          const segment = measure * (0.05 + r * 0.14)
          const scatter = (noise(row, i + 40) - 0.5) * measure * 0.34
          const drawX = x + scatter * (1 - eased)
          const alpha = 0.05 + eased * 0.06

          ctx.strokeStyle = `rgba(18, 22, 27, ${alpha})`
          ctx.lineWidth = 1
          ctx.beginPath()
          ctx.moveTo(drawX, y)
          ctx.lineTo(drawX + segment, y)
          ctx.stroke()

          x += segment + measure * 0.022
        }
      }
    }

    const loop = (t: number) => {
      draw(t)
      frame = requestAnimationFrame(loop)
    }

    const stop = () => {
      if (frame) cancelAnimationFrame(frame)
      frame = 0
    }

    const start = () => {
      if (frame || reduced.matches || document.hidden || !onScreen) return
      frame = requestAnimationFrame(loop)
    }

    const restart = () => {
      stop()
      resize()
      // The finished still frame, drawn part way through the cycle so the
      // composition reads as composed rather than mid-scatter.
      draw(CYCLE * 1000 * 0.62)
      start()
    }

    restart()

    const observer = new IntersectionObserver(
      ([entry]) => {
        onScreen = entry.isIntersecting
        if (onScreen) start()
        else stop()
      },
      { rootMargin: '96px' },
    )
    observer.observe(canvas)

    const onVisibility = () => (document.hidden ? stop() : start())
    const resizeObserver = new ResizeObserver(restart)
    resizeObserver.observe(canvas)
    document.addEventListener('visibilitychange', onVisibility)
    reduced.addEventListener('change', restart)

    return () => {
      stop()
      observer.disconnect()
      resizeObserver.disconnect()
      document.removeEventListener('visibilitychange', onVisibility)
      reduced.removeEventListener('change', restart)
    }
  }, [])

  return <canvas ref={canvasRef} aria-hidden className={className} />
}
