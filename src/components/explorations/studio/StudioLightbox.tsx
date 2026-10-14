'use client'

import Image from 'next/image'
import { useCallback, useEffect, useRef, useState } from 'react'
import { useReducedMotion } from '@/lib/useReducedMotion'

/**
 * Full-size sources the browser has already fetched this session.
 *
 * The HTTP cache is what actually makes a second open instant; this only
 * records that it will be, so the viewer can paint the real picture straight
 * away instead of flashing a thumbnail it no longer needs.
 */
const loadedSources = new Set<string>()
const hasLoaded = (src?: string) => (src ? loadedSources.has(src) : false)
const remember = (src?: string) => { if (src) loadedSources.add(src) }

export type StudioAsset = {
  id: string
  kind: 'product' | 'photograph'
  src: string
  /** Higher-quality source used in the expanded viewer; the grid keeps `src`. */
  modalSrc?: string
  alt: string
  width: number
  height: number
  title: string
  /** Shown under the image on the page and in the expanded view. */
  caption: string
  /** Only for the product: a short factual note, no inferred ownership. */
  note?: string
}

const sourceFor = (asset: StudioAsset) => asset.modalSrc ?? asset.src

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
    /**
     * The exact URL the grid's own thumbnail was served at.
     *
     * It is in the browser's cache already, so painting it costs nothing and
     * the viewer opens on the picture instead of on a dark rectangle while the
     * full-size version is resized and sent. Read from the trigger rather than
     * rebuilt, because a URL we construct ourselves is a different cache entry
     * and would be a second download.
     */
    thumb: string | null
  } | null>(null)
  const triggerRef = useRef<HTMLElement | null>(null)
  const scrollRef = useRef(0)

  const show = useCallback((assets: StudioAsset[], index: number, trigger: HTMLElement) => {
    if (assets.length === 0) return
    triggerRef.current = trigger
    const rect = trigger.getBoundingClientRect()
    scrollRef.current = window.scrollY
    const img = trigger.querySelector('img')
    setOpen({
      assets,
      index: Math.min(Math.max(index, 0), assets.length - 1),
      origin: {
        x: Math.round(rect.left + rect.width / 2),
        y: Math.round(rect.top + rect.height / 2),
      },
      thumb: img?.currentSrc || img?.src || null,
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
  thumb = null,
  onStep,
  onClose,
}: {
  assets: StudioAsset[]
  index: number
  origin: { x: number; y: number } | null
  /** The grid thumbnail already in cache, painted until the full size lands. */
  thumb?: string | null
  onStep: (delta: number) => void
  onClose: () => void
}) {
  const frameRef = useRef<HTMLDivElement>(null)
  const closeRef = useRef<HTMLButtonElement>(null)
  const reduced = useReducedMotion()
  /*
    Two indices, not one.

    `index` is what the reader asked for. `shown` is what is actually painted,
    which lags it while the next picture is still arriving — the viewer holds
    the picture it has rather than blanking to dark and back. The caption and
    the counter follow `shown`, so they never describe something that is not
    on screen.

    `null` means nothing full-size has landed yet, which happens exactly once
    per open; the grid's thumbnail stands in until it does.
  */
  const [shown, setShown] = useState<number | null>(null)
  const [failed, setFailed] = useState<number | null>(null)
  const [attempt, setAttempt] = useState(0)

  // The latest request, for a load handler to check itself against. Written in
  // an effect rather than in render: a response cannot arrive before the effect
  // that follows the render which asked for it.
  const wanted = useRef(index)
  useEffect(() => {
    wanted.current = index
  }, [index])

  /*
    What is painted, which is not always what was asked for.

    If the requested picture is already in the browser (the one either side is
    preloaded, and a second open of anything is a cache hit) it is painted at
    once. Otherwise the viewer keeps the picture it has until the new one
    lands, rather than blanking to dark and back. Nothing is synchronised in an
    effect: this is derived, so it cannot lag a render behind.
  */
  const cached = hasLoaded(assets[index] ? sourceFor(assets[index]) : undefined)
  const painted = cached ? index : (shown ?? index)
  const asset = assets[painted]
  const requested = assets[index]
  const many = assets.length > 1
  const product = asset.kind === 'product'

  // The one moment with nothing full-size to show: the first open. The grid's
  // own thumbnail stands in, upscaled, so the viewer opens on the picture.
  const standingIn = shown === null && !cached && Boolean(thumb) && !product
  // A loader is needed whenever what is painted is not the requested file.
  const arriving = (standingIn || painted !== index) && failed !== index

  const settle = useCallback(
    (i: number) => {
      if (wanted.current !== i) return // a later press already won
      remember(assets[i] ? sourceFor(assets[i]) : undefined)
      setShown(i)
      setFailed(null)
    },
    [assets],
  )

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
                {painted + 1} of {assets.length}
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
              ? 'relative min-h-0 flex-1 overflow-auto overscroll-contain'
              : 'relative flex min-h-0 flex-1 items-center justify-center'
          }
        >
          {/*
            What is painted. On the first open of a photograph this is the
            grid's own thumbnail, upscaled — soft for a moment, but the picture
            rather than a hole. Measured cold, the full size took 563ms to
            arrive, 557ms of it the optimiser resizing a 26MB original; that is
            the gap this fills.

            The frame keeps the picture's own ratio throughout, so the swap
            changes sharpness and nothing else.
          */}
          {standingIn && thumb ? (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img
              src={thumb}
              alt={requested.alt}
              width={requested.width}
              height={requested.height}
              /*
                Fills the frame and lets `object-contain` letterbox it, rather
                than sizing to the thumbnail's own 384px. The painted rectangle
                is then the one the full size will use, so the swap changes
                sharpness and nothing about the layout.
              */
              className="block h-full w-full object-contain"
            />
          ) : (
            <Image
              key={sourceFor(asset)}
              src={sourceFor(asset)}
              alt={asset.alt}
              width={asset.width}
              height={asset.height}
              /*
                `sizes` has to describe the width the image is really laid out
                at, or the browser picks a candidate for the wrong size. A
                product screenshot is panned at 900px on a narrow or short
                screen, so claiming 92vw there fetched 750px for a 900px box
                and the interface came out soft. Both arms err large rather
                than small: over-claiming costs bytes, under-claiming costs the
                legibility this control exists for.
              */
              sizes={product ? '(max-width: 1200px) 900px, 92vw' : '92vw'}
              quality={asset.modalSrc ? 90 : undefined}
              // No sizing utilities on the product branch: the width is one
              // expression in `.studio-zoom-pan`, and utilities in a later
              // layer would win over it whatever its specificity.
              className={product ? 'studio-zoom-pan mx-auto block' : 'block h-full w-auto max-w-[92vw] object-contain'}
              style={product ? { ['--zoom-ratio' as string]: String(asset.width / asset.height) } : undefined}
              onLoad={() => settle(painted)}
              priority
            />
          )}

          {/*
            The picture being fetched, kept out of the layout until it is
            ready. It is what promotes `shown`; a response that arrives after
            the reader has pressed on again is discarded by `settle`, so an
            older request can never replace a newer choice.
          */}
          {arriving && failed !== index ? (
            <Image
              key={`load-${index}-${attempt}`}
              src={sourceFor(requested)}
              alt=""
              aria-hidden
              width={requested.width}
              height={requested.height}
              quality={requested.modalSrc ? 90 : undefined}
              sizes={product ? '(max-width: 1200px) 900px, 92vw' : '92vw'}
              className="pointer-events-none absolute h-px w-px opacity-0"
              onLoad={() => settle(index)}
              onError={() => { if (wanted.current === index) setFailed(index) }}
              priority
            />
          ) : null}

          {/*
            A load that failed says so and offers another go, rather than
            leaving the reader looking at whatever was there before and
            wondering. The arrows and Close are outside this box and keep
            working, so a broken picture is not a trap.
          */}
          {failed === index ? (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-center">
              <p className="text-[0.875rem] text-[color:var(--ink-6)]">
                That photograph didn&rsquo;t load.
              </p>
              <button type="button" onClick={() => { setFailed(null); setAttempt((a) => a + 1) }} className="studio-close">
                Try again
              </button>
            </div>
          ) : null}

          {/* Bounded: the one either side, and no further. Opening the viewer
              should not pull the whole roll down the wire. */}
          {shown !== null && many
            ? [-1, 1]
                .map((d) => assets[(shown + d + assets.length) % assets.length])
                .filter((a, i, all) => a && sourceFor(a) !== sourceFor(asset) && all.indexOf(a) === i)
                .map((a) => (
                  <Image
                    key={`pre-${sourceFor(a)}`}
                    src={sourceFor(a)}
                    alt=""
                    aria-hidden
                    width={a.width}
                    height={a.height}
                    sizes={'92vw'}
                    quality={a.modalSrc ? 90 : undefined}
                    className="pointer-events-none absolute h-px w-px opacity-0"
                    onLoad={() => remember(sourceFor(a))}
                  />
                ))
            : null}
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
