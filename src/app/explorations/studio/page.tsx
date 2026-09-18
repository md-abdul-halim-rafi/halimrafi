import type { Metadata } from 'next'
import { StudioExploration } from '@/components/explorations/studio/StudioExploration'
import { photographAssets } from '@/lib/photographAssets'

export const metadata: Metadata = {
  title: 'Studio exploration',
  robots: { index: false, follow: false },
}

/**
 * Assets are resolved here, on the server: the photograph manifest reads the
 * filesystem and StudioExploration is a client component.
 *
 * Nothing is substituted for a missing file. If the photographs are absent that
 * part of the composition is not rendered and the page closes up around it.
 *
 * Octolane's brand artwork is deliberately not on this page. Its own marketing
 * headline competed with Rafi's. The asset is still in the project, in
 * `src/components/site/artifact.ts` and under `public/octolane/`, and no
 * substitute was put in its place.
 */
export default function StudioPage() {
  const photographs = photographAssets()

  // The page closes on the first frame in the manifest, which is also where the
  // viewer's sequence starts. The rest of the roll stays in the viewer, behind
  // the "More photographs" link beside the caption.
  const photograph = photographs[0] ?? null

  return <StudioExploration photograph={photograph} gallery={photographs} />
}
