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
 * Spacing is deliberately absent here. `.article-grid` sets one rhythm for the
 * whole article — a heading always gets more room above it than a paragraph,
 * a list always less — so an element carrying its own `mt-` would be arguing
 * with its neighbours about which of them owns the gap. These rules set what a
 * thing looks like; the grid sets where it sits.
 *
 * Every child takes the reading measure by default; anything that should be
 * wider opts in with `.breakout`.
 *
 * Headings carry no styling utilities either. They used the `.heading` class,
 * which lives in Tailwind's utilities layer and therefore beat every
 * components-layer rule the article tried to set on them whatever its
 * specificity — the article's serif silently lost to it. Their appearance is
 * set in CSS alongside the rest of the article's type.
 */
export const proseComponents: MDXComponents = {
  h2: ({ children, ...props }) => (
    <h2
      {...props}
      id={slugify(children)}

    >
      {children}
    </h2>
  ),
  h3: (props) => (
    <h3 {...props} />
  ),
  p: (props) => <p {...props} className="article-body" />,
  ul: (props) => <ul {...props} className="list-disc space-y-2.5 pl-5" />,
  ol: (props) => <ol {...props} className="list-decimal space-y-2.5 pl-5" />,
  li: (props) => (
    <li
      {...props}
      className="article-body marker:text-ink-8 [&>strong]:text-ink-12"
      style={{ marginTop: 0 }}
    />
  ),
  /* Emphasis reads as emphasis, not as a second voice. Weight alone carries
     it; the colour bump on top made every bold phrase the darkest thing on the
     line. */
  strong: (props) => <strong {...props} className="font-semibold" />,
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
      className="border-l-2 border-[color:color-mix(in_srgb,var(--signal)_40%,transparent)] pl-5 text-ink-11 italic [&>p]:text-[1.0625rem]"
    />
  ),
  hr: () => <div className="rule-fade" />,

  /* Tables. The article's comparison is genuinely tabular, so it gets a table
     rather than a styled list. It scrolls inside its own box at narrow widths,
     which is what keeps the page from scrolling sideways. */
  table: (props) => (
    /* The scroll box is the table's own, so a narrow screen scrolls the table
       and not the page. Text stays at reading size: shrinking it to avoid the
       scroll would make the one part of the article built for comparison the
       hardest part to read. */
    <div className="breakout" tabIndex={0} role="region" aria-label="Table">
      <table
        {...props}
        className="w-full min-w-[36rem] border-collapse text-left text-[1rem]"
      />
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
  td: (props) => (
    <td
      {...props}
      className="py-3.5 pr-6 align-top leading-[1.5] text-ink-11 [overflow-wrap:anywhere]"
    />
  ),
  caption: (props) => <caption {...props} className="label pb-3 text-left" />,
}
