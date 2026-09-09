import type { Metadata } from 'next'
import { StoryExploration } from '@/components/explorations/story/StoryExploration'
import type { StudioAsset } from '@/components/explorations/studio/StudioLightbox'
import { availablePhotographs } from '@/lib/photographs'
import { PHOTO_CREDIT } from '@/lib/photoCredit'

export const metadata: Metadata = {
  title: 'Story exploration',
  robots: { index: false, follow: false },
}

/**
 * Assets are resolved here, on the server: the photograph manifest reads the
 * filesystem and StoryExploration is a client component.
 *
 * No Octolane product artifact has been supplied to this project, so the work
 * section is two paragraphs and no image. The marketing cover is not product
 * evidence and is deliberately absent. Recorded in docs/PROJECT-STATUS.md.
 */
export default function StoryPage() {
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

  return <StoryExploration photograph={photograph} gallery={photographs} />
}
