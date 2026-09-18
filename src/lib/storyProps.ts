import { photographAssets } from './photographAssets'
import { publishedWriting, WRITING_PREVIEW_COUNT } from './writing'

/**
 * Everything the story composition needs, resolved on the server.
 *
 * It lives here because two routes render that composition now: the site's
 * front page and the exploration it grew up in. One loader means the two
 * cannot drift into showing different photographs or a different number of
 * articles, which is the failure mode of copying a page component's data
 * fetching alongside it.
 *
 * The photograph manifest reads the filesystem and the writing registry is a
 * server module, while the composition itself is a client component, so this
 * boundary is where the work has to happen either way.
 */
export async function storyProps() {
  const photographs = photographAssets()

  // The closing shows the first frame in the manifest, which is also where the
  // viewer's sequence starts; the rest are at `/photographs`.
  const photograph = photographs[0] ?? null

  const writing = await publishedWriting()

  return {
    photograph,
    gallery: photographs,
    writing: writing.slice(0, WRITING_PREVIEW_COUNT),
    moreWriting: writing.length > WRITING_PREVIEW_COUNT,
  }
}
