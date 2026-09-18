import Link from 'next/link'
import { CompactComparison } from '@/components/demo/CompactComparison'
import { SiteFooter } from '@/components/site/Chrome'
import { Hero } from '@/components/site/Hero'
import { SiteHeader } from '@/components/site/SiteHeader'
import { OpeningDriver } from '@/components/site/OpeningDriver'
import { ProductArtifactView } from '@/components/site/ProductArtifactView'
import { Reveal } from '@/components/site/Reveal'
import { home } from '@/components/site/content'
import { ArrowRight } from '@/components/ui/icons'
import { site } from '@/lib/site'

/**
 * The homepage runs opening, featured artifact, the work, the earlier company,
 * then out. Each section takes the composition its content needs rather than
 * repeating one column, and the section rules fade at both ends so nothing is
 * boxed.
 */
export function HomeEditorial() {
  return (
    <>
      <OpeningDriver />
      <SiteHeader />

      <Hero />

      <main className="mx-auto max-w-[76rem] px-5 sm:px-8">
        {/* The featured interaction, breaking wider than the reading column. */}
        <section className="-mt-10 sm:-mt-14" aria-labelledby="featured">
          <Reveal className="rounded-lg border border-[color:var(--hairline)] bg-surface">
            <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 border-b border-[color:var(--hairline)] px-4 py-3.5 sm:px-6">
              <h2 id="featured" className="label">
                {home.artifact.label}
              </h2>
              <p className="text-[0.8125rem] text-muted">{home.artifact.line}</p>
            </div>
            <div className="px-4 py-5 sm:px-6 sm:py-6">
              <CompactComparison />
            </div>
          </Reveal>
        </section>

        {/* The work: what the product is, what he is responsible for, and one
            decision presented as a destination rather than a footnote link. */}
        <section id="work" className="scroll-mt-28 pt-20 sm:pt-24">
          <div className="grid gap-x-14 gap-y-8 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <p className="label">{home.octolane.label}</p>
              <h2 className="heading mt-3 text-[1.75rem] leading-[1.12] text-ink-12 sm:text-[2rem]">
                {home.octolane.name}
              </h2>
              <dl className="mt-5 space-y-3 border-t border-[color:var(--hairline)] pt-4">
                <div className="flex gap-3">
                  <dt className="label w-20 shrink-0 pt-px">Role</dt>
                  <dd className="text-[0.8125rem] leading-snug text-ink-11">
                    {home.octolane.role}
                  </dd>
                </div>
                <div className="flex gap-3">
                  <dt className="label w-20 shrink-0 pt-px">Stage</dt>
                  <dd className="text-[0.8125rem] leading-snug text-ink-11">
                    {home.octolane.context}
                  </dd>
                </div>
              </dl>
            </div>

            <div className="lg:col-span-8">
              <p className="measure text-[length:var(--read-size)] leading-[var(--read-leading)]">
                {home.octolane.purpose}
              </p>
              <p className="measure mt-5 text-[length:var(--read-size)] leading-[var(--read-leading)] text-soft">
                {home.octolane.responsibility}
              </p>

              <div className="mt-7 empty:mt-0">
                <ProductArtifactView />
              </div>
            </div>
          </div>

          {/* The decision, given the weight of a destination. */}
          <h3 className="label mt-14">{home.octolane.detailsEyebrow}</h3>
          <ul className="mt-4 space-y-3">
            {home.details.map((detail) => (
              <li key={detail.slug}>
                {/* One link for the whole card: no nested interactive elements,
                    so keyboard focus lands once and the focus ring frames the
                    thing that is actually activated. */}
                <Link href={`/work/${detail.slug}`} className="card-link group block">
                  <div className="grid gap-x-10 gap-y-3 p-5 sm:p-6 lg:grid-cols-12">
                    <div className="lg:col-span-8">
                      <h4 className="heading text-[1.25rem] leading-snug text-ink-12">
                        {detail.title}
                      </h4>
                      <p className="mt-2 max-w-[52ch] text-[0.9375rem] leading-[1.6] text-muted">
                        {detail.blurb}
                      </p>
                    </div>
                    <div className="flex items-end justify-between gap-6 lg:col-span-4 lg:flex-col lg:items-end">
                      <p className="label order-2 lg:order-1">{detail.kind}</p>
                      <span className="order-1 inline-flex items-center gap-1.5 text-[0.875rem] font-medium text-signal lg:order-2">
                        <span className="trim-cap">Read the case study</span>
                        <span className="icon-slot">
                          <span>
                            <ArrowRight />
                          </span>
                        </span>
                      </span>
                    </div>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        {/* The earlier company as a compact record row. */}
        <section className="pt-16 sm:pt-20">
          <div className="rule-fade" />
          <div className="grid items-baseline gap-x-14 gap-y-3 pt-6 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <p className="label">{home.mainlyCoding.period}</p>
              <h2 className="heading mt-2.5 text-[1.375rem] leading-snug text-ink-12">
                {home.mainlyCoding.name}
              </h2>
            </div>
            <p className="font-mono text-[0.75rem] leading-relaxed text-ink-10 lg:col-span-3">
              {home.mainlyCoding.role}
              <br className="hidden lg:block" />
              <span className="lg:hidden"> / </span>
              {home.mainlyCoding.outcome}
            </p>
            <p className="text-[0.9375rem] leading-[1.7] text-soft lg:col-span-5">
              {home.mainlyCoding.body}
            </p>
          </div>
        </section>

        <section className="pt-14">
          <div className="rule-fade" />
          <p className="pt-6">
            <Link
              href="/about"
              className="group inline-flex items-center gap-1.5 text-[0.9375rem] font-medium text-signal"
            >
              <span className="trim-cap">About {site.name}</span>
              <span className="icon-slot">
                <span>
                  <ArrowRight />
                </span>
              </span>
            </Link>
          </p>
        </section>

      </main>

      <SiteFooter />
    </>
  )
}
