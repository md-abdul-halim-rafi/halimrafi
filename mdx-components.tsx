import type { MDXComponents } from 'mdx/types'
import { proseComponents } from '@/components/story/prose'
import { Callout } from '@/components/story/Callout'
import { Disclosure } from '@/components/story/Disclosure'
import { Lede } from '@/components/story/Lede'
import { StreamingDemo } from '@/components/demo/StreamingDemo'

// Next 16: useMDXComponents takes no arguments.
export function useMDXComponents(): MDXComponents {
  return {
    ...proseComponents,
    Callout,
    Disclosure,
    Lede,
    // The demo breaks wider than the reading column; the column itself stays at
    // the body measure.
    Demo: () => (
      <div className="breakout my-12">
        <StreamingDemo />
      </div>
    ),
  }
}
