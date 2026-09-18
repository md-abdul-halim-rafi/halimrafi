import type { NextConfig } from 'next'
import createMDX from '@next/mdx'

const nextConfig: NextConfig = {
  pageExtensions: ['ts', 'tsx', 'mdx'],
  outputFileTracingIncludes: {},

  /**
   * `/about` was a standalone page and is not one any more. What it held that
   * the site still wants is on the front page, so the address resolves there
   * rather than 404ing on anyone who saved or shared it.
   *
   * Permanent, because it is: the page is gone, not moved aside for a while.
   * That means a 308 and caching by clients, which is the intended cost of
   * saying so.
   */
  async redirects() {
    return [{ source: '/about', destination: '/', permanent: true }]
  },
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
