import type { Metadata } from 'next'
import Link from 'next/link'
import { SiteFooter } from '@/components/site/Chrome'
import { IslandNav } from '@/components/site/IslandNav'
import { ControlLink } from '@/components/ui/Control'
import { ArrowRight } from '@/components/ui/icons'
import { hasEmail, hasProfiles, site } from '@/lib/site'

export const metadata: Metadata = {
  title: 'About',
  description: `${site.name} is a founder and engineer based in ${site.location}.`,
}

/**
 * Compact on purpose. The homepage says what he does, so this page carries only
 * what it can say that the homepage cannot: where he is from, what he is doing
 * now, and how to reach him. The general philosophy that used to sit here
 * repeated the homepage and has been removed.
 *
 * Everything here is supplied biography. Nothing is inferred.
 */
const FACTS: [string, string][] = [
  ['Now', 'Co-founder and CTO, Octolane AI'],
  ['Programme', 'Y Combinator W24'],
  ['Before', 'Co-founder, Mainly Coding, acquired by Shikho'],
  ['Studied', 'Applied Mathematics, University of Dhaka'],
  ['Based', 'San Francisco'],
  ['From', 'Bangladesh'],
]

export default function AboutPage() {
  const contactable = hasEmail() || hasProfiles()

  return (
    <>
      <IslandNav />

      <main className="mx-auto max-w-[76rem] px-5 pt-28 sm:px-8 sm:pt-32">
        <div className="grid gap-x-14 gap-y-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="label">About</p>
            <h1 className="display mt-5 text-[clamp(2.5rem,6vw,3.75rem)] leading-[1.0] text-ink-12">
              {site.name}
            </h1>

            <dl className="mt-9 border-t border-[color:var(--hairline)]">
              {FACTS.map(([term, value]) => (
                <div
                  key={term}
                  className="flex gap-5 border-b border-[color:var(--hairline)] py-3"
                >
                  <dt className="label w-24 shrink-0 pt-0.5">{term}</dt>
                  <dd className="text-[0.875rem] leading-snug text-ink-11">{value}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="lg:col-span-7">
            <p className="text-[1.1875rem] leading-[1.65] text-ink-11">
              I grew up in Bangladesh and studied Applied Mathematics at the University of Dhaka. I
              live in San Francisco and spend most of my time on Octolane.
            </p>
            <p className="mt-5 text-[length:var(--read-size)] leading-[var(--read-leading)] text-ink-11">
              I am learning photography.
            </p>

            {contactable ? (
              <div className="mt-10 rounded-[var(--r-lg)] border border-[color:var(--hairline)] bg-surface p-7">
                <h2 className="heading text-[1.25rem] leading-snug">
                  Have a difficult product problem?
                </h2>
                <p className="mt-2.5 text-[0.9375rem] leading-[1.65] text-muted">
                  Tell me what you are building and where it gets stuck.
                </p>
                <div className="ctl-row mt-6 flex flex-wrap items-center gap-2.5">
                  {hasEmail() ? (
                    <ControlLink href={`mailto:${site.email}`} variant="signal" icon={<ArrowRight />}>
                      Get in touch
                    </ControlLink>
                  ) : null}
                  {site.profiles.map((profile) => (
                    <ControlLink key={profile.href} href={profile.href} variant="quiet">
                      {profile.label}
                    </ControlLink>
                  ))}
                </div>
              </div>
            ) : null}

            <p className="mt-10">
              <Link
                href="/"
                className="group inline-flex items-center gap-1.5 text-[0.9375rem] font-medium text-signal"
              >
                <span className="trim-cap">Back to the work</span>
                <span className="icon-slot">
                  <span>
                    <ArrowRight />
                  </span>
                </span>
              </Link>
            </p>
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  )
}
