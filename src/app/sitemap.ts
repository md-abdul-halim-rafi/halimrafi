import type { MetadataRoute } from 'next'
import { site } from '@/lib/site'
import { allWorkMeta } from '@/lib/work'
import { publishedWriting } from '@/lib/writing'

/**
 * The sitemap.
 *
 * Built from the same sources the pages read, so it cannot drift from what is
 * actually published: `allWorkMeta` and `publishedWriting` both filter to
 * published entries, and a draft is therefore absent here for the same reason
 * its own URL returns 404, rather than because this file remembered to exclude
 * it.
 *
 * The site URL comes from `site.url` and is not repeated anywhere in here.
 *
 * Absent on purpose: the exploration routes, which are marked noindex in their
 * own layout and are not part of the public site; and `/writing` itself while
 * nothing is published, since an empty archive is not worth crawling.
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [work, writing] = await Promise.all([allWorkMeta(), publishedWriting()])

  const entries: MetadataRoute.Sitemap = [
    { url: site.url, changeFrequency: 'monthly', priority: 1 },
    { url: `${site.url}/about`, changeFrequency: 'yearly', priority: 0.5 },
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
