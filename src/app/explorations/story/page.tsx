import type { Metadata } from 'next'
import { StoryExploration } from '@/components/explorations/story/StoryExploration'
import type { StudioAsset } from '@/components/explorations/studio/StudioLightbox'
import { availablePhotographs } from '@/lib/photographs'
import { PHOTO_CREDIT } from '@/lib/photoCredit'
import { publishedWriting, WRITING_PREVIEW_COUNT } from '@/lib/writing'

export const metadata: Metadata = {
  title: 'Story exploration',
  robots: { index: false, follow: false },
}

/**
 * Assets are resolved here, on the server: the photograph manifest reads the
 * filesystem and StoryExploration is a client component.
 *
 * The work section now carries one real product screenshot, Octolane's own
 * published image of the application, described in STORY.product* and rendered
 * by the component. The marketing cover is still absent: it is brand artwork,
 * not product evidence, and it says so in its own caption on the homepage.
 * What is still missing is recorded in docs/PROJECT-STATUS.md.
 */
export default async function StoryPage() {
  const photographs: StudioAsset[] = availablePhotographs().map((photo) => ({
    id: photo.file,
    kind: 'photograph',
    src: `/photographs/${photo.file}`,
    alt: photo.alt,
    width: photo.width,
    height: photo.height,
    title: photo.label,
    caption: PHOTO_CREDIT,
  }))

  // The closing shows the first frame in the manifest, which is also where the
  // viewer's sequence starts; the rest stay behind the gallery link.
  const photograph = photographs[0] ?? null

  // The three newest, and whether there is more behind them. Resolved here
  // because the component below is a client component and the registry reads
  // from the server.
  const writing = await publishedWriting()

  return (
    <StoryExploration
      photograph={photograph}
      gallery={photographs}
      writing={writing.slice(0, WRITING_PREVIEW_COUNT)}
      moreWriting={writing.length > WRITING_PREVIEW_COUNT}
    />
  )
}
