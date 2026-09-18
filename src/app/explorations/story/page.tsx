import type { Metadata } from 'next'
import { StoryExploration } from '@/components/explorations/story/StoryExploration'
import { storyProps } from '@/lib/storyProps'

export const metadata: Metadata = {
  title: 'Story exploration',
  robots: { index: false, follow: false },
}

/**
 * The composition that the site's front page now renders, kept here as the
 * working surface it was developed on.
 *
 * Same component and same loader as `/`, so this cannot drift from the page it
 * became. What differs is the shell: this route stays out of the index and
 * keeps the exploration switcher.
 */
export default async function StoryPage() {
  return <StoryExploration {...(await storyProps())} />
}
