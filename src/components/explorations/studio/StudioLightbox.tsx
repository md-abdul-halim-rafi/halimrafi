'use client'

import Image from 'next/image'
import { useCallback, useEffect, useRef, useState } from 'react'
import { useReducedMotion } from '@/lib/useReducedMotion'

export type StudioAsset = {
  id: string
  kind: 'product' | 'photograph'
  src: string
  alt: string
  width: number
  height: number
  title: string
  /** Shown under the image on the page and in the expanded view. */
  caption: string
  /** Only for the product: a short factual note, no inferred ownership. */
  note?: string
}

/**
 * Opening, stepping through, and closing an artifact.
 *
 * The viewer holds a sequence rather than a single image, which is what lets
 * the page show one photograph and keep the rest here instead of laying out a
 * second grid.
 *
 * The trigger's position is captured so the expanded view grows from where the
 * item sat rather than arriving from nowhere. Scroll position is recorded and
 * restored, and focus goes back to the trigger, so a detour through the images
 * leaves the page exactly as it was.
 */
export function useLightbox() {
  // The origin is used to render the expansion, so it lives in state next to the
  // sequence rather than in a ref.
  const [open, setOpen] = useState<{
    assets: StudioAsset[]
    index: number
    origin: { x: number; y: number }
  } | null>(null)
  const triggerRef = useRef<HTMLElement | null>(null)
  const scrollRef = useRef(0)

  const show = useCallback((assets: StudioAsset[], index: number, trigger: HTMLElement) => {
    if (assets.length === 0) return
    triggerRef.current = trigger
    const rect = trigger.getBoundingClientRect()
    scrollRef.current = window.scrollY
    setOpen({
      assets,
      index: Math.min(Math.max(index, 0), assets.length - 1),
      origin: {
        x: Math.round(rect.left + rect.width / 2),
        y: Math.round(rect.top + rect.height / 2),
      },
    })
  }, [])

  // Wraps, so neither end of a short sequence is a dead control.
  const step = useCallback((delta: number) => {
    setOpen((current) => {
      if (!current) return current
      const count = current.assets.length
      return { ...current, index: (current.index + delta + count) % count }
    })
  }, [])

  const hide = useCallback(() => setOpen(null), [])

  // Focus and scroll are restored after the view has left the DOM. Doing either
  // in the same tick races the unmount and focus lands on the body.
  useEffect(() => {
    if (open !== null) return
    const trigger = triggerRef.current
    if (!trigger) return
    triggerRef.current = null
    window.scrollTo({ top: scrollRef.current, behavior: 'instant' })
    trigger.focus({ preventScroll: true })
  }, [open])

  return { open, show, step, hide }
}

export function StudioLightbox({
  assets,
  index,
  origin,
  onStep,
  onClose,
}: {
  assets: StudioAsset[]
  index: number
  origin: { x: number; y: number } | null
  onStep: (delta: number) => void
  onClose: () => void
}) {
  const frameRef = useRef<HTMLDivElement>(null)
  const closeRef = useRef<HTMLButtonElement>(null)
  const reduced = useReducedMotion()
  const asset = assets[index]
  const many = assets.length > 1

  useEffect(() => {
    closeRef.current?.focus()

    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.stopPropagation()
        onClose()
        return
      }
      if (many && (event.key === 'ArrowRight' || event.key === 'ArrowLeft')) {
        event.preventDefault()
        onStep(event.key === 'ArrowRight' ? 1 : -1)
        return
      }
      // Contain focus. The viewer holds one control, so Tab and Shift+Tab both
      // return to it rather than walking out into the page behind.
      if (event.key === 'Tab') {
        const frame = frameRef.current
        if (!frame) return
        const focusable = frame.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
        )
        if (focusable.length === 0) return
        const first = focusable[0]
        const last = focusable[focusable.length - 1]
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault()
          last.focus()
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault()
          first.focus()
        }
      }
    }
    document.addEventListener('keydown', onKey)

    // Lock the page and mark it, so the exploration switcher can step out of the
    // way rather than glowing through the overlay.
    const { body } = document
    const previousOverflow = body.style.overflow
    const previousPadding = body.style.paddingRight
    const gap = window.innerWidth - document.documentElement.clientWidth
    body.style.overflow = 'hidden'
    if (gap > 0) body.style.paddingRight = `${gap}px`
    body.dataset.viewerOpen = 'true'

    return () => {
      document.removeEventListener('keydown', onKey)
      body.style.overflow = previousOverflow
      body.style.paddingRight = previousPadding
      delete body.dataset.viewerOpen
    }
  }, [onClose, onStep, many])

  const transformOrigin = origin ? `${origin.x}px ${origin.y}px` : '50% 50%'

  // The frame animates in once. Stepping swaps the picture inside a frame that
  // is already there, so replaying the growth on every press would be motion
  // the reader did not ask for.

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center p-4 sm:p-6"
      style={{ animation: reduced ? 'none' : 'explore-fade 150ms var(--ease-out-quint)' }}
    >
      <button
        type="button"
        aria-label="Close"
        onClick={onClose}
        tabIndex={-1}
        className="absolute inset-0 cursor-default bg-[color:color-mix(in_srgb,var(--ink-12)_94%,transparent)]"
      />

      {/*
        The frame shrinks to the image, so the label, the close control and the
        caption sit against the picture's own edges instead of the edges of an
        oversized box.
      */}
      <div
        ref={frameRef}
        role="dialog"
        aria-modal="true"
        aria-label={asset.title}
        // inline-flex shrinks to the picture without the circular constraint
        // that `w-fit` plus `max-h-full` created, which was scaling the image
        // down to a fraction of the space available.
        className="relative inline-flex flex-col outline-none"
        style={{
          transformOrigin,
          animation: reduced ? 'none' : 'studio-grow 200ms var(--ease-out-quint)',
        }}
      >
        <div className="flex items-center justify-between gap-6 pb-2.5">
          <p className="min-w-0 truncate text-[0.8125rem] text-[color:var(--ink-4)]">
            {asset.title}
            {many ? (
              <span className="ml-2.5 text-[color:var(--ink-9)]">
                {index + 1} of {assets.length}
              </span>
            ) : null}
          </p>
          <div className="flex shrink-0 items-center gap-1.5">
            {many ? (
              <>
                <button
                  type="button"
                  aria-label="Previous photograph"
                  onClick={() => onStep(-1)}
                  className="studio-close"
                >
                  <span aria-hidden>&larr;</span>
                </button>
                <button
                  type="button"
                  aria-label="Next photograph"
                  onClick={() => onStep(1)}
                  className="studio-close"
                >
                  <span aria-hidden>&rarr;</span>
                </button>
              </>
            ) : null}
            <button ref={closeRef} type="button" onClick={onClose} className="studio-close">
              Close
            </button>
          </div>
        </div>

        {/* Fitted whole, never cropped or stretched. */}
        <Image
          src={asset.src}
          alt={asset.alt}
          width={asset.width}
          height={asset.height}
          sizes="92vw"
          className="block max-h-[calc(100dvh-8rem)] w-auto max-w-[92vw] object-contain"
          priority
        />

        <p className="pt-2.5 text-[0.8125rem] leading-[1.5] text-[color:var(--ink-8)]">
          {asset.caption}
        </p>
      </div>
    </div>
  )
}
