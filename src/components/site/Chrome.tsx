import { site, hasEmail, hasProfiles } from '@/lib/site'

/**
 * The footer. Contact appears here on every page the moment an address exists;
 * until then the row is omitted rather than rendered empty.
 */
export function SiteFooter() {
  const showContact = hasEmail() || hasProfiles()

  return (
    <footer className="mt-20">
      <div className="mx-auto max-w-[76rem] px-5 sm:px-8">
        <div className="rule-fade" />
        <div className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-4 py-9">
          <p className="label">
            {site.name} <span className="mx-1 opacity-40">/</span> {site.role}
          </p>

          {showContact ? (
            <ul className="flex flex-wrap gap-x-6 gap-y-2 text-[0.8125rem]">
              {hasEmail() ? (
                <li>
                  <a className="link-underline" href={`mailto:${site.email}`}>
                    {site.email}
                  </a>
                </li>
              ) : null}
              {site.profiles.map((profile) => (
                <li key={profile.href}>
                  <a className="link-underline" href={profile.href}>
                    {profile.label}
                  </a>
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      </div>
    </footer>
  )
}
