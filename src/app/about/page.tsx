import type { Metadata } from 'next'
import Link from 'next/link'
import { SiteFooter } from '@/components/site/Chrome'
import { SiteHeader } from '@/components/site/SiteHeader'
import { Photographs } from '@/components/site/Photographs'
import { ControlLink } from '@/components/ui/Control'
import { ArrowRight } from '@/components/ui/icons'
import { hasEmail, hasProfiles, site } from '@/lib/site'

export const metadata: Metadata = {
  title: 'About',
  description: `${site.name} is a founder and engineer based in ${site.location}.`,
}

/**
 * Education, location, origin and company history live in the record below and
 * nowhere else. The prose beside it used to restate all four, which made the
 * page read as though it were padding itself out.
 *
 * There is no photograph and no public contact destination supplied, so the
 * layout is text only by design: one record, one personal line, no second column
 * held open for an image that does not exist.
 */
const RECORD: [string, string][] = [
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
      <SiteHeader current="about" />

      <main className="mx-auto max-w-[58rem] px-6 pt-16 sm:px-10 sm:pt-20">
        <p className="label">About</p>
        <h1 className="display mt-5 text-[clamp(2.5rem,6vw,3.75rem)] leading-[1.0] text-ink-12">
          {site.name}
        </h1>
        <p className="mt-6 max-w-[46ch] text-[1.1875rem] leading-[1.6] text-ink-11">
          I am learning photography.
        </p>

        <dl className="mt-12 grid gap-x-14 border-t border-[color:var(--hairline)] sm:grid-cols-2">
          {RECORD.map(([term, value]) => (
            <div
              key={term}
              className="flex gap-5 border-b border-[color:var(--hairline)] py-3.5"
            >
              <dt className="label w-[6.5rem] shrink-0 pt-0.5">{term}</dt>
              <dd className="text-[0.875rem] leading-snug text-ink-11">{value}</dd>
            </div>
          ))}
        </dl>

        {contactable ? (
          <div className="mt-12 rounded-lg border border-[color:var(--hairline)] bg-surface p-7">
            <h2 className="heading text-[1.25rem] leading-snug">
              Have a difficult product problem?
            </h2>
            <p className="mt-2.5 max-w-[46ch] text-[0.9375rem] leading-[1.65] text-muted">
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

        <Photographs />

        <p className="mt-12">
          <Link
            href="/"
            className="group inline-flex items-center gap-1.5 text-[0.9375rem] font-medium text-signal"
          >
            <span className="trim-cap">Back to the front page</span>
            <span className="icon-slot">
              <span>
                <ArrowRight />
              </span>
            </span>
          </Link>
        </p>
      </main>
      <SiteFooter />
    </>
  )
}
