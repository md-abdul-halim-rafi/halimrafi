import type { Metadata } from 'next'
import { SiteHeader } from '@/components/site/SiteHeader'
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
 * The header is the shared `SiteHeader`, passed in rather than imported
 * because the composition is a client component. Every page renders that same
 * header now; this page used to carry one of its own that looked like it but
 * measured differently, which shifted the top of the page on every navigation.
 */
export const metadata: Metadata = {
  alternates: { canonical: site.url },
}

export default async function Page() {
  return (
    <StoryExploration
      {...(await storyProps())}
      header={<SiteHeader current="home" />}
      switcher={false}
      caseHref={STORY.caseHrefLive}
    />
  )
}
