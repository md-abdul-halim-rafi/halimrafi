import type { MetadataRoute } from 'next'
import { site } from '@/lib/site'

/**
 * robots.txt.
 *
 * There was none, so every crawler was working from its own defaults and the
 * sitemap was not advertised anywhere.
 *
 * Everything public is allowed, including to the assistants that read pages on
 * someone's behalf: the site exists to be read, and a rule that admits search
 * engines while turning away the thing a reader actually asked to fetch is a
 * rule against the reader.
 *
 * `/explorations/` is the only disallowed path. Those routes are working
 * surfaces, already `noindex` in their own layout, and they render the same
 * articles as the real ones — a crawler that indexed them would be holding two
 * copies of the same writing at two addresses.
 *
 * The unlisted streaming prototype is deliberately not listed here. Robots
 * rules are public, so naming a page you would rather not advertise in the one
 * file every crawler fetches is self-defeating; and a `Disallow` would stop a
 * crawler reaching the page at all, which would leave it unable to see the
 * `noindex` the page itself carries. Allowed to fetch, asked not to index, is
 * the combination that actually works.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: '*', allow: '/', disallow: '/explorations/' }],
    sitemap: `${site.url}/sitemap.xml`,
    host: site.url,
  }
}
