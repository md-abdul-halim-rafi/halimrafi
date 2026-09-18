import type { NextConfig } from 'next'
import createMDX from '@next/mdx'

const nextConfig: NextConfig = {
  pageExtensions: ['ts', 'tsx', 'mdx'],
  outputFileTracingIncludes: {},
}

/**
 * GFM, for tables. An article that compares two versions of a thing wants a
 * table, and writing one as JSX inside the content file would put layout in
 * with the prose. The plugin also brings strikethrough and autolinks, which
 * cost nothing.
 *
 * Named as a string, not imported. Turbopack passes loader options across a
 * boundary that only takes serialisable values, so handing it the imported
 * function fails the build outright.
 */
const withMDX = createMDX({
  options: { remarkPlugins: ['remark-gfm'] },
})

export default withMDX(nextConfig)
