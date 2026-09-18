import type { ArticleEntry } from './articles'
import { site } from './site'

/**
 * Structured data, so a machine reads a record rather than guessing at markup.
 *
 * Everything here is already on the page in prose or in a `<time>` element —
 * nothing is asserted that a reader cannot also see. That is the rule this file
 * is written to: structured data is a second statement of the same facts, in a
 * form that does not depend on anyone parsing a heading correctly. The moment
 * it says something the page does not, it is a claim made only to machines.
 *
 * `headline`, `datePublished` and `author` are the three fields worth the most:
 * they are what an assistant cites when it passes a piece on, and they are
 * exactly the three that are painful to infer from HTML.
 */

const person = {
  '@type': 'Person',
  '@id': `${site.url}/#person`,
  name: site.name,
  url: site.url,
  jobTitle: site.role,
} as const

export function personJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfilePage',
    '@id': `${site.url}/#page`,
    url: site.url,
    mainEntity: { ...person, email: site.email ? `mailto:${site.email}` : undefined },
  }
}

export function articleJsonLd(article: {
  kind: ArticleEntry['kind']
  url: string
  title: string
  description: string
  date: string
  updated?: string
  byline?: string
  sections?: string[]
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    '@id': `${article.url}#article`,
    url: article.url,
    mainEntityOfPage: article.url,
    headline: article.title,
    description: article.description,
    datePublished: article.date,
    ...(article.updated ? { dateModified: article.updated } : {}),
    // A byline is only set when the piece is not the site owner's, which is
    // the same rule the page itself prints.
    author: article.byline ? { '@type': 'Organization', name: article.byline } : person,
    publisher: person,
    inLanguage: 'en',
    /* The section list is the article's own contents, so it says nothing the
       headings do not. It is what lets a machine answer "what does this
       cover?" without fetching and parsing the body. */
    ...(article.sections?.length ? { articleSection: article.sections } : {}),
    /* The same piece as plain Markdown. Declared here as well as in a `<link>`
       so it is discoverable from the data alone. */
    encoding: {
      '@type': 'MediaObject',
      encodingFormat: 'text/markdown',
      contentUrl: `${article.url}.md`,
    },
  }
}

export function collectionJsonLd(articles: ArticleEntry[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    '@id': `${site.url}/writing#blog`,
    url: `${site.url}/writing`,
    name: 'Writing',
    author: person,
    blogPost: articles.map((article) => ({
      '@type': 'BlogPosting',
      '@id': `${site.url}${article.href}#article`,
      url: `${site.url}${article.href}`,
      headline: article.title,
      description: article.description,
      datePublished: article.date,
    })),
  }
}

/**
 * The script tag itself.
 *
 * `JSON.stringify` is the whole escaping story for a JSON-LD block except for
 * `</script>` appearing inside a string, which would end the element early.
 * None of this content contains one, but the guard costs nothing and the
 * failure it prevents is an unparseable page rather than a wrong date.
 */
export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, '\\u003c') }}
    />
  )
}
