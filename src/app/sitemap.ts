import type { MetadataRoute } from 'next'
import { site } from '@/lib/site'
import { listedWorkMeta } from '@/lib/work'
import { publishedWriting } from '@/lib/writing'

/**
 * The sitemap.
 *
 * Built from the same sources the pages read, so it cannot drift from what is
 * actually on offer: `listedWorkMeta` and `publishedWriting` filter to the
 * published entries the Writing lists show, so a draft is absent here for the
 * same reason its own URL returns 404, and an unlisted piece is absent for the
 * same reason it is not in those lists — rather than because this file
 * remembered to exclude either.
 *
 * The site URL comes from `site.url` and is not repeated anywhere in here.
 *
 * Absent on purpose: the exploration routes, which are marked noindex in their
 * own layout and are not part of the public site; `/writing` itself while
 * nothing is published, since an empty archive is not worth crawling;
 * `/about`, which is no longer a page and redirects to the front page; and any
 * piece marked `listed: false`, whose URL still serves for anyone holding a
 * link but which is not offered to a crawler either.
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [work, writing] = await Promise.all([listedWorkMeta(), publishedWriting()])

  const entries: MetadataRoute.Sitemap = [
    { url: site.url, changeFrequency: 'monthly', priority: 1 },
    { url: `${site.url}/photographs`, changeFrequency: 'monthly', priority: 0.5 },
  ]

  for (const meta of work) {
    entries.push({
      url: `${site.url}/work/${meta.slug}`,
      lastModified: new Date(meta.date),
      changeFrequency: 'yearly',
      priority: 0.8,
    })
  }

  if (writing.length > 0) {
    entries.push({
      url: `${site.url}/writing`,
      lastModified: new Date(writing[0].updated ?? writing[0].date),
      changeFrequency: 'monthly',
      priority: 0.7,
    })
    for (const meta of writing) {
      entries.push({
        url: `${site.url}/writing/${meta.slug}`,
        lastModified: new Date(meta.updated ?? meta.date),
        changeFrequency: 'yearly',
        priority: 0.7,
      })
    }
  }

  return entries
}
