import { existsSync } from 'node:fs'
import { fileURLToPath } from 'node:url'

/**
 * Lets `node --test` resolve the extensionless relative imports the app source
 * uses, which the bundler handles but Node's ESM resolver does not. Also maps
 * the `@/` alias from tsconfig. Keeps the source free of test-only conventions.
 */
export function resolve(specifier, context, next) {
  let request = specifier

  if (request.startsWith('@/')) {
    request = new URL(`../src/${request.slice(2)}`, import.meta.url).href
  }

  const relative = request.startsWith('.') || request.startsWith('file:')
  if (relative && !/\.[cm]?[jt]sx?$/.test(request)) {
    const base = request.startsWith('file:')
      ? new URL(request)
      : new URL(request, context.parentURL)
    for (const ext of ['.ts', '.tsx', '/index.ts']) {
      if (existsSync(fileURLToPath(new URL(base.href + ext)))) {
        return next(base.href + ext, context)
      }
    }
  }

  return next(request, context)
}
