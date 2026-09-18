'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Switcher } from '@/components/explorations/Switcher'
import { OCTOLANE, person, STUDIO } from '@/explorations/data'
import { StudioLightbox, useLightbox, type StudioAsset } from './StudioLightbox'

/**
 * Studio.
 *
 * A small header, an introduction, one work section that carries the decision
 * inside it, and a photograph to close on.
 *
 * The container is 58rem rather than the 72.5rem it was. The page had text
 * running at 576px inside a 1160px box, which is what made it read as blocks
 * scattered across a canvas: the measure was fine, the canvas was twice as wide
 * as anything on it. Narrowing it puts the left anchor and the right edge of the
 * text within sight of each other.
 *
 * One display direction, and it is the body face. The page used to set the name
 * in a condensed serif and the question in a large sans, which read as two
 * systems arguing. Everything display-sized is now Inter at weight 500, three
 * steps apart: the introduction, the section heading, the inset title.
 *
 * Space is generous between the four groups and tight inside them, rather than
 * one rhythm applied to every section. The decision sits inset on the sunken
 * surface because it belongs to the work above it, not beside it.
 *
 * No entrance motion. Everything is present at load, which is what reduced
 * motion would fall back to anyway.
 */
export function StudioExploration({
  photograph,
  gallery,
}: {
  /** The one photograph shown on the page. */
  photograph: StudioAsset | null
  /** Every photograph, in order, for the viewer behind "More photographs". */
  gallery: StudioAsset[]
}) {
  const lightbox = useLightbox()
  const shownIndex = Math.max(
    0,
    gallery.findIndex((item) => item.id === photograph?.id),
  )
  const moreIndex = gallery.length > 1 ? (shownIndex + 1) % gallery.length : 0

  return (
    <div data-explore="studio" className="min-h-dvh bg-paper text-ink-11">
      <div className="mx-auto max-w-[58rem] px-6 pb-24 sm:px-10">
        {/* The name steps down to a header line, so the introduction below it
            can be the thing that speaks. */}
        <header className="flex items-baseline justify-between gap-6 pt-7">
          <p className="text-[0.9375rem] font-medium text-ink-12">{person.name}</p>
          <a href={`mailto:${STUDIO.email}`} className="studio-quiet text-[0.8125rem]">
            {STUDIO.email}
          </a>
        </header>

        <main>
          {/* Who he is, in two deliberate lines. */}
          <section aria-label="Introduction" className="pt-16 sm:pt-20">
            <h1 className="max-w-[48rem] text-[clamp(1.875rem,3.6vw,2.75rem)] font-medium leading-[1.18] tracking-[-0.02em] text-ink-12">
              I&rsquo;m Rafi.
              <br />
              Co-founder and CTO of Octolane AI.
            </h1>
            <p className="mt-5 text-[0.875rem] text-ink-9">{STUDIO.aside}</p>
          </section>

          {/* The work, and the decision that came out of it, as one section:
              what it is, what he is responsible for, then the experiment. */}
          <section aria-labelledby="octolane" className="pt-24 sm:pt-28">
            <h2
              id="octolane"
              className="text-[1.5rem] font-medium leading-[1.25] tracking-[-0.01em] text-ink-12 sm:text-[1.75rem]"
            >
              Octolane
            </h2>

            {/* Lead line first, detail beneath it, so the description can be
                taken in at a glance rather than read as a block. */}
            <p className="mt-5 max-w-[36rem] text-[1.0625rem] leading-[1.5] text-ink-12">
              {OCTOLANE.productLead}
            </p>
            <p className="mt-2.5 max-w-[36rem] text-[0.9375rem] leading-[1.6] text-ink-10">
              {OCTOLANE.productDetail}
            </p>

            <p className="mt-6 max-w-[36rem] text-[0.9375rem] leading-[1.6] text-ink-11">
              {OCTOLANE.role}
            </p>
            <p className="mt-4 max-w-[36rem] text-[0.875rem] leading-[1.6] text-ink-9">
              {STUDIO.previously}
            </p>

            {/* One interaction worth examining. Inset on the sunken surface so
                it reads as part of this work rather than a section of its own,
                and captioned as a prototype so it is not read as shipped. */}
            <div className="mt-10 max-w-[36rem] rounded-lg bg-sunk px-6 py-6 sm:px-7">
              <h3 className="text-[1.0625rem] font-medium leading-[1.35] text-ink-12">
                Making a response readable
              </h3>
              <p className="mt-2 text-[0.9375rem] leading-[1.6] text-ink-11">
                How should an answer appear while it&rsquo;s still arriving?
              </p>
              <p className="mt-4">
                <Link
                  href="/explorations/studio/making-a-response-readable"
                  className="studio-onward text-[0.9375rem]"
                >
                  <span className="trim-cap">Explore the comparison</span>
                  <span aria-hidden>&rarr;</span>
                </Link>
              </p>
              <p className="mt-1 text-[0.8125rem] leading-[1.5] text-ink-9">
                Prototype &middot; Simulated data
              </p>
            </div>
          </section>

          {/* The ending. The sentence sits with the top of the picture rather
              than trailing off its bottom corner. */}
          {photograph ? (
            <section aria-label="Photography" className="pt-24 sm:pt-32">
              <div className="sm:flex sm:items-start sm:gap-10">
                <p className="max-w-[20rem] text-[1.0625rem] leading-[1.5] text-ink-11 sm:order-2 sm:pt-1">
                  {STUDIO.photography}
                </p>

                <figure className="m-0 mt-6 sm:order-1 sm:mt-0 sm:shrink-0">
                  <button
                    type="button"
                    onClick={(event) => lightbox.show(gallery, shownIndex, event.currentTarget)}
                    aria-haspopup="dialog"
                    aria-label={`Open ${photograph.title}`}
                    className="studio-photo block w-full sm:w-fit"
                  >
                    <Image
                      src={photograph.src}
                      alt={photograph.alt}
                      width={photograph.width}
                      height={photograph.height}
                      sizes="(min-width: 640px) 22rem, 92vw"
                      /* Capped by height so the whole frame is in view on a
                         laptop. Both maxima apply at once and the intrinsic
                         ratio decides which binds, so nothing is cropped. */
                      className="h-auto max-w-full sm:max-h-[58svh] sm:w-auto"
                    />
                  </button>
                  <figcaption className="mt-3 flex flex-wrap items-baseline gap-x-5 gap-y-1 text-[0.8125rem] leading-[1.5] text-ink-9">
                    <span>{photograph.title}</span>
                    {gallery.length > 1 ? (
                      <button
                        type="button"
                        onClick={(event) => lightbox.show(gallery, moreIndex, event.currentTarget)}
                        aria-haspopup="dialog"
                        className="studio-quiet"
                      >
                        More photographs
                      </button>
                    ) : null}
                  </figcaption>
                </figure>
              </div>

              <p className="mt-14 text-[1rem]">
                <a href={`mailto:${STUDIO.email}`} className="link-underline">
                  {STUDIO.email}
                </a>
              </p>
            </section>
          ) : null}
        </main>
      </div>

      {lightbox.open ? (
        <StudioLightbox
          assets={lightbox.open.assets}
          index={lightbox.open.index}
          origin={lightbox.open.origin}
          onStep={lightbox.step}
          onClose={lightbox.hide}
        />
      ) : null}
      <Switcher />
    </div>
  )
}
