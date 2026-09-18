import type { Metadata } from 'next'
import { StoryExploration } from '@/components/explorations/story/StoryExploration'
import { STORY } from '@/explorations/data'
import { storyProps } from '@/lib/storyProps'
import { site } from '@/lib/site'

/**
 * The front page.
 *
 * It renders the story composition: the introduction, the work at Octolane with
 * one real product screenshot, one case study, writing when there is any, and
 * the photography closing. The editorial homepage this replaces is still in the
 * tree as `HomeEditorial`, unused, so the change is one line to undo.
 *
 * No exploration switcher here: that control exists to hop between directions
 * in development and is not part of the site.
 *
 * The composition carries no site header or footer of its own. That is the
 * design, not an omission, so the header's Work link points into this page's
 * own work section rather than at a nav bar that no longer exists here.
 */
export const metadata: Metadata = {
  alternates: { canonical: site.url },
}

export default async function Page() {
  return (
    <StoryExploration {...(await storyProps())} switcher={false} caseHref={STORY.caseHrefLive} />
  )
}
