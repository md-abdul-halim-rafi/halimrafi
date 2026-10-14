import { CompactComparison } from '@/components/demo/CompactComparison'
import { Switcher } from '@/components/explorations/Switcher'
import { PROTOTYPE_CAPTION, person, work } from '@/explorations/data'
import { EditorialPhotos } from './EditorialPhotos'
import { Annotations, type Annotation } from './Annotations'

/**
 * Editorial.
 *
 * A masthead, then one large figure carrying the page, then the rest set small
 * beneath it. The scale jump between the featured work and the supporting
 * entries does the hierarchy; there is no card, no border and no shadow doing it
 * instead.
 *
 * With no product photography supplied, the featured figure is the prototype's
 * own output, which is real rather than a placeholder standing in for something
 * real.
 */
const featured = work.find((w) => w.interactive)!
const supporting = work.filter((w) => !w.interactive)

const NOTES: Annotation[] = [
  {
    id: 'boundary',
    marker: '01',
    title: 'Formatting mid-flight',
    body: 'The stream opens a bold span in one chunk and closes it in a later one. Raw arrival shows the marks; the considered side withholds the line until the span has closed. Buffering to a word boundary would not fix this on its own, because the opening and closing marks can sit several words apart.',
  },
  {
    id: 'unit',
    marker: '02',
    title: 'Readable units',
    body: 'A paragraph appears once it is closed and a list item once its line lands, so the reader receives whole thoughts instead of a growing edge of text. In this script that costs 520ms to first visible text, measured from the start of playback.',
  },
  {
    id: 'reserve',
    marker: '03',
    title: 'Reserved space',
    body: 'The slot for a pending record is sized by the record it is waiting for, so its arrival moves nothing below it. That is exact here only because the script is known in advance; a real result of unknown size would need a fixed slot or a different treatment.',
  },
]

export function EditorialExploration() {
  return (
    <div data-explore="editorial" className="min-h-dvh bg-paper text-ink-11">
      <main className="mx-auto max-w-[74rem] px-5 pb-32 pt-12 sm:px-8 sm:pt-16">
        {/* Masthead */}
        <header className="border-b-2 border-[color:var(--ink-12)] pb-4">
          <div className="flex flex-wrap items-end justify-between gap-x-10 gap-y-4">
            <h1 className="display text-[clamp(3rem,9vw,6.5rem)] leading-[0.86] tracking-[-0.02em] text-ink-12">
              {person.name}
            </h1>
            <p className="max-w-[34ch] pb-1 text-[0.875rem] leading-[1.55] text-ink-10">
              {person.intro}
            </p>
          </div>
        </header>

        <div className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-1 border-b border-[color:var(--hairline)] py-2.5">
          <p className="label">{person.place}</p>
          <p className="label">Selected work, three entries</p>
        </div>

        {/* The featured figure carries the page. */}
        <section className="mt-12 sm:mt-16">
          <div className="grid gap-x-12 gap-y-6 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <p className="label">{featured.kind}</p>
              <h2 className="display mt-3 text-[clamp(2rem,4.4vw,3.25rem)] leading-[0.98] text-ink-12">
                {featured.name}
              </h2>
              <p className="mt-4 text-[1.0625rem] leading-[1.55] text-ink-11">{featured.summary}</p>
              <p className="mt-4 text-[0.875rem] leading-[1.65] text-ink-10">{featured.problem}</p>
              <p className="label mt-6">{featured.role}</p>
            </div>

            <figure className="m-0 lg:col-span-8">
              <CompactComparison />
              <figcaption className="mt-3 text-[0.8125rem] leading-[1.6] text-ink-9">
                {PROTOTYPE_CAPTION}. The same answer, shown two ways while it is still arriving.
              </figcaption>
              <Annotations items={NOTES} />
            </figure>
          </div>
        </section>

        {/* Supporting entries, set small under the rule. */}
        <section className="mt-20 border-t-2 border-[color:var(--ink-12)] pt-6 sm:mt-24">
          <p className="label">Also</p>
          <div className="mt-6 grid gap-x-12 gap-y-10 sm:grid-cols-2">
            {supporting.map((item) => (
              <article key={item.id}>
                <p className="label">{item.kind}</p>
                <h3 className="display mt-2.5 text-[1.75rem] leading-[1.05] text-ink-12">
                  {item.name}
                </h3>
                <p className="mt-3 text-[1rem] leading-[1.6] text-ink-11">{item.summary}</p>
                <p className="mt-3 max-w-[46ch] text-[0.875rem] leading-[1.65] text-ink-10">
                  {item.problem}
                </p>
                <p className="mt-4 border-t border-[color:var(--hairline)] pt-3 text-[0.8125rem] leading-[1.6] text-ink-10">
                  <span className="label">Role</span>{' '}
                  <span className="ml-1">{item.contribution}</span>
                </p>
              </article>
            ))}
          </div>
        </section>
        <EditorialPhotos />
      </main>

      <Switcher />
    </div>
  )
}
