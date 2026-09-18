import type { MDXComponents } from 'mdx/types'
import type { ReactNode } from 'react'

/** Stable anchor ids so the reading rail can link into the article. */
export function slugify(node: ReactNode): string {
  return String(node)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}

/**
 * Element mapping for article prose.
 *
 * The reading column is fixed at the body measure; anything that should be
 * wider opts in with `.breakout` rather than the column widening around it.
 */
export const proseComponents: MDXComponents = {
  h2: ({ children, ...props }) => (
    <h2
      {...props}
      id={slugify(children)}
      className="heading mt-14 scroll-mt-28 text-[1.4375rem] leading-[1.25] text-ink-12 sm:text-[1.625rem]"
    >
      {children}
    </h2>
  ),
  h3: (props) => (
    <h3 {...props} className="mt-9 text-[1.0625rem] font-semibold leading-snug text-ink-12" />
  ),
  p: (props) => <p {...props} className="mt-5 article-body" />,
  ul: (props) => <ul {...props} className="mt-5 list-disc space-y-2.5 pl-5" />,
  ol: (props) => <ol {...props} className="mt-5 list-decimal space-y-2.5 pl-5" />,
  li: (props) => (
    <li
      {...props}
      className="article-body marker:text-ink-8 [&>strong]:text-ink-12"
      style={{ marginTop: 0 }}
    />
  ),
  strong: (props) => <strong {...props} className="font-semibold text-ink-12" />,
  code: (props) => (
    <code
      {...props}
      className="rounded-xs bg-sunk px-[0.35em] py-[0.15em] font-mono text-[0.85em] text-ink-11"
    />
  ),
  a: (props) => <a {...props} className="link-underline" />,
  blockquote: (props) => (
    <blockquote
      {...props}
      className="mt-7 border-l-2 border-[color:color-mix(in_srgb,var(--signal)_40%,transparent)] pl-5 text-ink-10 italic"
    />
  ),
  hr: () => <div className="rule-fade mt-12" />,

  /* Tables. The article's comparison is genuinely tabular, so it gets a table
     rather than a styled list. It scrolls inside its own box at narrow widths,
     which is what keeps the page from scrolling sideways. */
  table: (props) => (
    <div className="breakout mt-8 overflow-x-auto">
      <table {...props} className="w-full min-w-[34rem] border-collapse text-left text-[0.9375rem]" />
    </div>
  ),
  thead: (props) => <thead {...props} />,
  tbody: (props) => <tbody {...props} />,
  tr: (props) => <tr {...props} className="border-b border-[color:var(--hairline)] last:border-0" />,
  th: (props) => (
    <th
      {...props}
      className="label border-b border-[color:var(--hairline-strong)] pb-2.5 pr-6 align-bottom"
    />
  ),
  td: (props) => <td {...props} className="py-3.5 pr-6 align-top leading-[1.5] text-ink-11" />,
  caption: (props) => <caption {...props} className="label pb-3 text-left" />,
}
