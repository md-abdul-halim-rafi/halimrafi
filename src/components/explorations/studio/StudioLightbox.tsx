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
  const product = asset.kind === 'product'

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

    /*
     * Lock the page and mark it, so the exploration switcher can step out of
     * the way rather than glowing through the overlay.
     *
     * The lock goes on the root element, not only on the body. `overflow` set
     * on the body reaches the viewport only while the root's own overflow is
     * `visible`, and the root here carries `overflow-x: clip` as a horizontal
     * guard — which quietly switched this lock off. Measured before the fix:
     * a wheel over the backdrop took the page behind the dialog from 298 to
     * 605.
     */
    const { body } = document
    const root = document.documentElement
    const previousBodyOverflow = body.style.overflow
    const previousRootOverflow = root.style.overflowY
    const previousPadding = body.style.paddingRight
    const gap = window.innerWidth - root.clientWidth
    body.style.overflow = 'hidden'
    root.style.overflowY = 'hidden'
    if (gap > 0) body.style.paddingRight = `${gap}px`
    body.dataset.viewerOpen = 'true'

    return () => {
      document.removeEventListener('keydown', onKey)
      body.style.overflow = previousBodyOverflow
      root.style.overflowY = previousRootOverflow
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
        The frame used to shrink to the picture, which put the label, the
        controls and the caption against the picture's own edges. That reads
        well on one image and badly across a sequence: stepping from a portrait
        to a landscape moved Close 322px and the arrows with it, so the control
        a reader was aiming at walked out from under the cursor.

        So the frame now spans the overlay and the picture is centred in what
        is left. The controls sit at a fixed distance from the viewport's own
        top-right corner and do not move between orientations. Each photograph
        keeps its own aspect ratio and is never cropped; only the room around
        it changes.

        The controls stay inside this element because the Tab handler contains
        focus to whatever is focusable within it.
      */}
      <div
        ref={frameRef}
        role="dialog"
        aria-modal="true"
        aria-label={asset.title}
        className="relative flex h-full w-full flex-col outline-none"
        style={{
          transformOrigin,
          animation: reduced ? 'none' : 'studio-grow 200ms var(--ease-out-quint)',
        }}
      >
        <div className="flex shrink-0 items-center justify-between gap-6 pb-2.5">
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

        {/*
          Photographs are fitted whole, never cropped or stretched.

          A product screenshot cannot work that way on a small screen. Fitting
          a 4074px interface inside a 390px phone gives 359px, seventeen more
          than the figure on the page, and at high zoom it gives a sliver;
          "View larger" would be a control that does nothing. So a product
          image is laid out at a legible width below 640px and the frame
          scrolls, which is how a wide screenshot is read on a phone. Above
          that width nothing changes: the fit is already over a thousand
          pixels.
        */}
        {/* A photograph is centred by the flex box and always fits. A product
            screenshot may be wider than the room available, and a flex box
            that centres its child makes that overflow unreachable rather than
            scrollable, so it gets a plain scrolling block and centres itself
            with a margin when it does fit. */}
        <div
          className={
            product
              ? 'min-h-0 flex-1 overflow-auto overscroll-contain'
              : 'flex min-h-0 flex-1 items-center justify-center'
          }
        >
          <Image
            src={asset.src}
            alt={asset.alt}
            width={asset.width}
            height={asset.height}
            /*
              `sizes` has to describe the width the image is really laid out
              at, or the browser picks a candidate for the wrong size. A
              product screenshot is panned at 900px on a narrow or short
              screen, so claiming 92vw there fetched 750px for a 900px box and
              the interface came out soft. Both arms err large rather than
              small: over-claiming costs bytes, under-claiming costs the
              legibility this control exists for.
            */
            sizes={product ? '(max-width: 1200px) 900px, 92vw' : '92vw'}
            // No sizing utilities on the product branch: the width is one
            // expression in `.studio-zoom-pan`, and utilities in a later layer
            // would win over it whatever its specificity.
            className={product ? 'studio-zoom-pan mx-auto block' : 'block max-h-full w-auto max-w-full object-contain'}
            style={product ? { ['--zoom-ratio' as string]: String(asset.width / asset.height) } : undefined}
            priority
          />
        </div>

        {/* Centred, so it stays under the picture now that the column is as
            wide as the overlay rather than as wide as the image. */}
        <p className="shrink-0 pt-2.5 text-center text-[0.8125rem] leading-[1.5] text-[color:var(--ink-8)]">
          {asset.caption}
        </p>
      </div>
    </div>
  )
}
