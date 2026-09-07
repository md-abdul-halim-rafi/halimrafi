import { FragmentField } from '@/components/field/FragmentField'
import { ControlLink } from '@/components/ui/Control'
import { ArrowRight } from '@/components/ui/icons'
import { home } from '@/components/site/content'
import { site } from '@/lib/site'

/**
 * The opening.
 *
 * Three layers: a cool stage gradient, the graticule feathered into it with a
 * radial mask so it has no visible edge, and the lockup on top. The headline
 * breaks deliberately at sm and above, and wraps naturally below that, because
 * forced breaks at 390px push a display face off the side of the screen.
 *
 * Nothing here waits on an animation. The text is server-rendered and readable
 * before any script runs; the field is the only moving part and the page is
 * complete without it.
 */
export function Hero() {
  return (
    <section className="stage relative isolate overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-full"
        style={{
          maskImage:
            'linear-gradient(to bottom, transparent, black 18%, black 74%, transparent), radial-gradient(120% 80% at 50% 45%, black 30%, transparent 76%)',
          WebkitMaskImage:
            'linear-gradient(to bottom, transparent, black 18%, black 74%, transparent), radial-gradient(120% 80% at 50% 45%, black 30%, transparent 76%)',
          maskComposite: 'intersect',
          WebkitMaskComposite: 'source-in',
          opacity: 'calc((0.4 + var(--opening, 1) * 0.6) * var(--field-strength, 1))',
        }}
      >
        <FragmentField className="h-full w-full" />
      </div>

      {/* Quiet annotations. Real role and programme, nothing invented. */}
      <div className="pointer-events-none absolute inset-x-0 top-0 hidden justify-between px-8 pt-7 md:flex">
        <p className="label">Octolane AI / Co-founder &amp; CTO</p>
        <p className="label">YC W24</p>
      </div>

      <div className="relative mx-auto flex min-h-[70svh] max-w-[76rem] flex-col justify-center px-5 pb-24 pt-16 sm:px-8 sm:pb-28 sm:pt-20">
        <p className="label">
          {site.name} <span className="mx-1.5 opacity-40">/</span> {site.location}
        </p>

        <h1 className="display mt-7 text-[length:var(--display-size)] leading-[0.96] text-ink-12">
          <span className="sm:block">I build products,</span>{' '}
          <span className="sm:block">from the hard decision</span>{' '}
          <span className="sm:block">to the last interaction.</span>
        </h1>

        <p className="measure mt-8 text-[1.0625rem] leading-[1.7] text-soft">{home.intro.bio}</p>

        <div className="ctl-row mt-9 flex flex-wrap items-center gap-2.5">
          <ControlLink
            href={`/work/${home.details[0].slug}`}
            variant="primary"
            icon={<ArrowRight />}
          >
            Open the decision
          </ControlLink>
          <ControlLink href="/about" variant="quiet">
            About
          </ControlLink>
        </div>
      </div>

      {/* Watched by the island nav so its arrival follows the content rather
          than an arbitrary scroll offset. */}
      <div id="opening-end" aria-hidden className="h-px w-full" />
    </section>
  )
}
