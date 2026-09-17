'use client'

import { Fragment } from 'react'

import Image from 'next/image'
import Link from 'next/link'
import { Switcher } from '@/components/explorations/Switcher'
import { person, STORY } from '@/explorations/data'
import { StudioLightbox, useLightbox, type StudioAsset } from '../studio/StudioLightbox'

/**
 * Story: introduction, current work, one case study, a personal closing.
 *
 * The streaming comparison that used to sit between the work and the closing
 * was removed on request. Its component, fixtures and tests are untouched and
 * still drive their own article. What sits there now is text: the case study
 * about long-running agent work, linked with `?from=story` so the article's
 * way back returns here.
 *
 * The progression is the point. The introduction is one tight group rather than
 * three spaced lines. The work is two short paragraphs. Then the decision, and
 * the comparison under it runs the container's full width while every paragraph
 * on the page holds about sixty characters, so the page changes rhythm exactly
 * where the reader arrives at something they can operate. The closing is a
 * photograph at a modest size.
 *
 * The spacing runs tighter through the argument than it did, 64px between the
 * introduction, the work and the decision, so the comparison's heading and the
 * top of its panel are both inside a 1440x900 screen. The pause before the
 * photograph stays longer, at 96px, because that is where the subject changes.
 * No section is given a height and nothing hides overflow to reach that.
 *
 * Five decisions are adapted from the Octolane frontend; the report carries the
 * sources. Here they are the reading weight on the root, the serif's tracking
 * and `ch` measures on the display lines, the ink ladder, the mono treatment on
 * small controls, and the kicker above the name with the dotted rule as the
 * section mark and the display line entering word by word.
 *
 * The ladder's bottom step is one level darker than the reference's. Its
 * faintest, 0.447, measures 3.0:1 on this paper, which is not readable at
 * 12.5px.
 */

/** The display line enters word by word, so each word needs its own box. */
function Words({ text, from = 0.38, step = 0.06 }: { text: string; from?: number; step?: number }) {
  const words = text.split(' ')
  return (
    <>
      {words.map((word, i) => (
        /* The space is a sibling of the span, not a child of it: each word is
           an inline-block so it can be transformed on its own, and an
           inline-block trims the whitespace inside its own box. */
        <Fragment key={`${word}-${i}`}>
          <span
            className="story-word"
            style={{ ['--story-delay' as string]: `${from + i * step}s` }}
          >
            {word}
          </span>
          {i < words.length - 1 ? ' ' : null}
        </Fragment>
      ))}
    </>
  )
}

export function StoryExploration({
  photograph,
  gallery,
}: {
  /** The one photograph in the closing. */
  photograph: StudioAsset | null
  /** Every photograph, in order, for the viewer behind the gallery link. */
  gallery: StudioAsset[]
}) {
  const lightbox = useLightbox()
  const productAsset: StudioAsset = {
    id: 'octolane-app-home',
    kind: 'product',
    src: STORY.productSrc,
    alt: STORY.productAlt,
    width: STORY.productWidth,
    height: STORY.productHeight,
    title: STORY.productTitle,
    caption: STORY.productCaption,
  }
  const shownIndex = Math.max(
    0,
    gallery.findIndex((item) => item.id === photograph?.id),
  )
  const moreIndex = gallery.length > 1 ? (shownIndex + 1) % gallery.length : 0

  return (
    <div data-explore="story" className="story-type-350 min-h-dvh bg-paper">
      <div className="mx-auto max-w-[58rem] px-6 pb-28 sm:px-10">
        <header className="flex items-baseline justify-between gap-6 pt-6">
          <p className="story-ink text-[0.8125rem] font-medium">{person.name}</p>
          <a href={`mailto:${STORY.email}`} className="story-mono story-control">
            <span>Email</span>
          </a>
        </header>
        <hr className="story-rule mt-5" />

        <main>
          {/* One group: the place, the name, the role, at the spacing of a
              lockup rather than three separated lines. */}
          <section aria-label="Introduction" className="pt-10 sm:pt-12">
            <p className="story-mono story-quiet">{STORY.aside}</p>
            <h1 className="story-display story-ink mt-3 max-w-[15ch] text-[clamp(3.5rem,8.5vw,5.5rem)]">
              <Words text={STORY.name} />
            </h1>
            <p className="story-mid mt-3 max-w-[34ch] text-[1.0625rem] leading-[1.5] sm:text-[1.125rem]">
              {STORY.role}
            </p>
          </section>

          {/* The current work. Two paragraphs: what it helps people do, then
              what he is answerable for. */}
          <section aria-labelledby="octolane" className="pt-14 sm:pt-16">
            <hr className="story-rule w-14" />
            <h2
              id="octolane"
              className="story-display story-ink mt-5 max-w-[18ch] text-[clamp(1.75rem,3.4vw,2.25rem)]"
            >
              {STORY.workHeading}
            </h2>
            <p className="story-ink mt-6 max-w-[33rem] text-[1.0625rem] leading-[1.55]">
              {STORY.workProduct}
            </p>
            <p className="story-mid mt-4 max-w-[28rem] text-[0.9375rem] leading-[1.65]">
              {STORY.workRole}
            </p>

            {/* The product itself, once.
                
                It takes the container's full width, the same as the comparison
                below, so the two figures on this page are measured alike while
                every paragraph stays at its reading width.

                No border is drawn on it. The dark rounded outline is part of
                the asset: its own edge pixels are black and the corners
                outside it are transparent, so a CSS frame would sit on top of
                a frame.

                One control, not two. The image and the words under it are
                inside the same button, so there is a single tab stop and the
                visible label is the accessible name. The viewer it opens
                handles Escape, focus restoration and scroll on its own. */}
            <figure className="m-0 mt-7">
              <button
                type="button"
                onClick={(event) => lightbox.show([productAsset], 0, event.currentTarget)}
                aria-haspopup="dialog"
                aria-label={STORY.productZoomAria}
                className="studio-photo block w-full text-left"
              >
                <Image
                  src={STORY.productSrc}
                  alt={STORY.productAlt}
                  width={STORY.productWidth}
                  height={STORY.productHeight}
                  sizes="(min-width: 640px) 58rem, 92vw"
                  className="h-auto w-full"
                />
                <span className="story-mono story-quiet mt-3 inline-flex items-center gap-2 text-[0.75rem]">
                  <span>{STORY.productZoomLabel}</span>
                  <span aria-hidden>&#8599;</span>
                </span>
              </button>
              <figcaption className="story-quiet mt-2 flex flex-wrap items-baseline gap-x-4 gap-y-1 text-[0.8125rem] leading-[1.5]">
                <span>{STORY.productCaption}</span>
                <a href={STORY.productSourceHref} className="story-gallery">
                  {STORY.productSourceLabel}
                </a>
              </figcaption>
            </figure>

            <p className="story-quiet mt-5 max-w-[28rem] text-[0.875rem] leading-[1.6]">
              {STORY.previously}
            </p>
          </section>

          {/* The case study, between the work and the closing. Heading, one
              paragraph carrying the problem and the contribution, then a link.
              No panel and no artifact, because the article has none either,
              and no rollout status, because saying it accurately takes three
              qualifications and those live in the article. */}
          <section aria-labelledby="case" className="pt-14 sm:pt-16">
            <hr className="story-rule w-14" />
            <h2
              id="case"
              className="story-display story-ink mt-5 max-w-[20ch] text-[clamp(1.75rem,3.4vw,2.25rem)]"
            >
              {STORY.caseHeading}
            </h2>
            <p className="story-mid mt-4 max-w-[33rem] text-[1.0625rem] leading-[1.55]">
              {STORY.caseBody}
            </p>
            <p className="mt-5">
              <Link href={STORY.caseHref} className="story-read">
                <span>{STORY.caseLabel}</span>
                <span aria-hidden>&rarr;</span>
              </Link>
            </p>
          </section>

          {/* The closing: a photograph at a modest size, the sentence beside
              it, the gallery, and the background line. */}
          {photograph ? (
            <section aria-label="Photography" className="pt-20 sm:pt-24">
              <hr className="story-rule w-14" />
              <div className="mt-8 sm:flex sm:items-start sm:gap-9">
                <figure className="m-0 sm:order-1 sm:shrink-0">
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
                      sizes="(min-width: 640px) 17rem, 92vw"
                      className="h-auto w-full sm:w-[17rem]"
                    />
                  </button>
                  <figcaption className="story-quiet mt-3 flex flex-wrap items-baseline gap-x-5 gap-y-1 text-[0.8125rem] leading-[1.5]">
                    <span>{photograph.title}</span>
                    {gallery.length > 1 ? (
                      <button
                        type="button"
                        onClick={(event) => lightbox.show(gallery, moreIndex, event.currentTarget)}
                        aria-haspopup="dialog"
                        className="story-gallery"
                      >
                        More photographs
                      </button>
                    ) : null}
                  </figcaption>
                </figure>

                <div className="mt-6 sm:order-2 sm:mt-0">
                  <p className="story-ink max-w-[30ch] text-[1.0625rem] leading-[1.5]">
                    {STORY.photography}
                  </p>
                  <p className="mt-6">
                    {/* The address itself, so it can be read and copied. The
                        mono treatment stays, the uppercase does not: an address
                        set in capitals reads as a label. */}
                    <a href={`mailto:${STORY.email}`} className="story-address">
                      {STORY.email}
                    </a>
                  </p>
                </div>
              </div>
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
