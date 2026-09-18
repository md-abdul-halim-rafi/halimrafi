'use client'

import { Fragment, useLayoutEffect, useRef, type ReactNode } from 'react'

import Image from 'next/image'
import Link from 'next/link'
import { Switcher } from '@/components/explorations/Switcher'
import { STORY } from '@/explorations/data'
import { formatArticleDate, type ArticleEntry } from '@/lib/articles'
import { StudioLightbox, useLightbox, type StudioAsset } from '../studio/StudioLightbox'

/**
 * Story: introduction, current work, everything published, a personal closing.
 * The writing section is absent while nothing is published.
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
  header,
  photograph,
  gallery,
  articles,
  moreArticles,
  switcher = true,
}: {
  /**
   * The site header, rendered by the server route above this client component.
   *
   * This composition used to carry a header of its own, which drifted from the
   * one every other page renders and made the top of the page jump on
   * navigation. It is a slot rather than an import because the header reads the
   * writing registry on the server.
   */
  header: ReactNode
  /** The one photograph in the closing. */
  photograph: StudioAsset | null
  /** Every photograph, in order, for the viewer behind the gallery link. */
  gallery: StudioAsset[]
  /** The newest published pieces, already trimmed to what this page shows. */
  articles: ArticleEntry[]
  /** Whether the archive holds more than the list above. */
  moreArticles: boolean
  /**
   * The exploration switcher. It belongs to the exploration routes, where it
   * exists to hop between directions in development. On the site's own front
   * page it is furniture from somewhere else, so that route turns it off.
   */
  switcher?: boolean
}) {
  const lightbox = useLightbox()
  const root = useRef<HTMLDivElement>(null)

  /*
   * Arriving at a section rather than at the top.
   *
   * `:target` looked like the clean way to detect this and is not: a
   * client-side navigation updates the URL through the history API, and the
   * browser does not re-evaluate `:target` for that, so the rule never
   * matched. A layout effect does, because it runs after the DOM is in place
   * and before the first paint, which is where the word entrance would
   * otherwise begin.
   *
   * The opening is not what a reader coming back from the article wants to
   * watch, and animating it off-screen only to have them scroll up to a
   * settled line is work nobody sees.
   */
  useLayoutEffect(() => {
    if (window.location.hash) root.current?.setAttribute('data-jumped', '')
  }, [])
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

  return (
    <div ref={root} data-explore="story" className="story-type-350 min-h-dvh bg-paper">
      {header}

      <div className="mx-auto max-w-[58rem] px-6 pb-28 sm:px-10">
        <main>
          {/* One group: the place, the name, the role, at the spacing of a
              lockup rather than three separated lines. */}
          <section aria-label="Introduction" className="pt-10 sm:pt-12">
            {/* The batch links out to the company's YC page; the city does
                not link anywhere. */}
            <p className="story-mono story-quiet">
              {STORY.aside.map((part, i) =>
                part.href ? (
                  <a
                    key={i}
                    href={part.href}
                    target="_blank"
                    rel="noreferrer"
                    className="story-link story-link-out"
                  >
                    {part.text}
                  </a>
                ) : (
                  <Fragment key={i}>{part.text}</Fragment>
                ),
              )}
            </p>
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
            {/* The company link sits beside the heading rather than under the
                screenshot, centred on it. Baseline alignment was wrong here:
                against a 28px heading it drops 13px text to the heading's
                floor, which reads as misaligned however correct it is
                typographically. The row wraps so a narrow screen drops the
                link to its own line instead of squeezing the heading. The dot
                is decoration between two things that already read as separate,
                so it is hidden from assistive technology. */}
            <div className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-1">
              <h2
                id="octolane"
                className="story-display story-ink max-w-[18ch] scroll-mt-20 text-[clamp(1.75rem,3.4vw,2.25rem)] sm:scroll-mt-24"
              >
                {STORY.workHeading}
              </h2>
              <span aria-hidden className="story-quiet text-[0.8125rem]">
                &middot;
              </span>
              <a
                href={STORY.productSourceHref}
                target="_blank"
                rel="noreferrer"
                /* The coarse-pointer rule gives this a 40px tap target. Left
                   alone it would be the tallest thing in the row and would
                   centre the heading against it, nudging the heading down on a
                   phone. The negative margin lets the target hang outside the
                   line box, so it stays tappable without setting the row's
                   height. */
                className="story-link story-link-out text-[0.8125rem] [@media(pointer:coarse)]:-my-2.5"
              >
                {STORY.productSourceLabel}
              </a>
            </div>
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

                The image is the control and carries no visible label, so the
                only cue that it opens is the pointer and the focus ring. Its
                accessible name still says what pressing it does. The viewer it
                opens handles Escape, focus restoration and scroll on its
                own. */}
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
              </button>
              <figcaption className="story-quiet mt-2 max-w-[34rem] text-[0.8125rem] leading-[1.5]">
                {STORY.productCaption}
              </figcaption>
            </figure>

            <p className="story-quiet mt-5 max-w-[28rem] text-[0.875rem] leading-[1.6]">
              {STORY.previously.map((part, i) =>
                part.href ? (
                  <a
                    key={i}
                    href={part.href}
                    target="_blank"
                    rel="noreferrer"
                    className="story-link story-link-out"
                  >
                    {part.text}
                  </a>
                ) : (
                  <Fragment key={i}>{part.text}</Fragment>
                ),
              )}
            </p>
          </section>

          {/* Writing: one section for everything published, between the work
              and the closing.

              A case study used to get a section of its own here, with an essay
              listed smaller underneath. Two headings for two pieces made them
              look like unrelated bodies of work, and the reader had to notice
              that the smaller list was the same kind of thing. One list, one
              treatment, a label on the pieces that are case studies.

              The section is not rendered while nothing is published, since a
              heading over an empty list is a promise the page cannot keep, and
              the archive link appears only when there is more behind the list
              than the list shows. */}
          {articles.length > 0 ? (
            <section aria-labelledby="writing" className="pt-14 sm:pt-16">
              <hr className="story-rule w-14" />
              {/* The landing target for the way back from an article. The
                  scroll margin keeps the heading clear of the viewport's top
                  edge, with the section's own rule visible above it. */}
              <h2
                id="writing"
                className="story-display story-ink mt-5 max-w-[20ch] scroll-mt-20 text-[clamp(1.75rem,3.4vw,2.25rem)] sm:scroll-mt-24"
              >
                {STORY.writingHeading}
              </h2>

              <ul className="mt-8 space-y-8">
                {articles.map((article) => (
                  <li key={article.href}>
                    {article.kind === 'case-study' ? (
                      <p className="story-mono story-quiet mb-2 text-[0.6875rem]">Case study</p>
                    ) : null}
                    <h3 className="text-[1.0625rem] leading-[1.45]">
                      <Link href={article.href} className="story-link story-link-in">
                        {article.title}
                      </Link>
                    </h3>
                    <p className="story-mid mt-2 max-w-[33rem] text-[0.9375rem] leading-[1.6]">
                      {article.description}
                    </p>
                    <p className="story-mono story-quiet mt-2 text-[0.75rem]">
                      <time dateTime={article.date}>{formatArticleDate(article.date)}</time>
                    </p>
                  </li>
                ))}
              </ul>

              {moreArticles ? (
                <p className="mt-8">
                  <Link href={STORY.writingAllHref} className="story-link story-link-in story-read">
                    <span>{STORY.writingAllLabel}</span>
                    <span aria-hidden>&rarr;</span>
                  </Link>
                </p>
              ) : null}
            </section>
          ) : null}

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
                      <Link href="/photographs" className="story-link story-link-in">
                        More photographs
                      </Link>
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
                    <a href={`mailto:${STORY.email}`} className="story-link story-link-out story-address">
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
      {switcher ? <Switcher /> : null}
    </div>
  )
}
