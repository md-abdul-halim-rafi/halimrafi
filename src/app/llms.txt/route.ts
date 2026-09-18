import { publishedArticles } from '@/lib/articles'
import { site } from '@/lib/site'

/**
 * /llms.txt — a short index of the site, in Markdown, for something reading it
 * as text rather than looking at it.
 *
 * A convention rather than a standard, and not one every crawler consumes
 * today. It is here because it costs one generated file and, unlike a sitemap,
 * it can say what a page is for as well as where it is.
 *
 * Generated from the same `publishedArticles` every other list reads, so it
 * cannot offer something the site does not — the unlisted prototype is absent
 * here for the same reason it is absent everywhere else, rather than because
 * this file remembered to leave it out.
 *
 * Each entry points at the Markdown, which is the thing worth fetching: a fifth
 * of the bytes and none of the furniture.
 */
export const dynamic = 'force-static'

export async function GET() {
  const articles = await publishedArticles()

  const body = [
    `# ${site.name}`,
    '',
    `> ${site.role}. ${site.url}`,
    '',
    'Every article below is also served as Markdown at the same address with a',
    '`.md` suffix — the same text, without the page around it.',
    '',
    '## Writing',
    '',
    ...articles.map((article) => {
      const url = `${site.url}${article.href}`
      const kind = article.kind === 'case-study' ? 'Case study. ' : ''
      return `- [${article.title}](${url}.md): ${kind}${article.description}`
    }),
    '',
    '## Pages',
    '',
    `- [Writing](${site.url}/writing): every piece, newest first.`,
    `- [Photographs](${site.url}/photographs): photographs, with captions.`,
    '',
  ].join('\n')

  return new Response(body, {
    headers: {
      'content-type': 'text/markdown; charset=utf-8',
      'cache-control': 'public, max-age=0, must-revalidate',
    },
  })
}
