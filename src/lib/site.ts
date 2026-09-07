/**
 * The single source of truth for public identity and contact details.
 *
 * Anything that would appear publicly on the site lives here. Values set to
 * `null` are treated as "not yet supplied": the UI omits the corresponding
 * control entirely rather than rendering a dead link or a placeholder address.
 * Never invent a value in this file.
 */

export type ContactLink = {
  label: string
  href: string
}

export const site = {
  name: 'Halim Rafi',
  domain: 'halimrafi.com',
  url: 'https://halimrafi.com',

  headline: 'I build products, from the hard decision to the last interaction.',
  role: 'Co-founder and CTO, Octolane AI',
  location: 'San Francisco',

  /**
   * Public email address. Left null until an address is explicitly designated
   * as public. While null, every mail control is omitted from the rendered page.
   */
  email: null as string | null,

  /**
   * Verified public profiles. Only add entries that have been confirmed;
   * an empty list renders no profile row at all.
   */
  profiles: [] as ContactLink[],
} as const

export const hasEmail = (): boolean => typeof site.email === 'string' && site.email.length > 0
export const hasProfiles = (): boolean => site.profiles.length > 0
export const hasAnyContact = (): boolean => hasEmail() || hasProfiles()
