/**
 * The article's opening paragraph.
 *
 * Once a drop cap, then a size of its own two steps above the body. Both were
 * ways of announcing that the article had started, which the title had already
 * done. Set in the reading face at reading size, the opening sentence is the
 * first sentence of the piece rather than a poster for it, and the reader is
 * already reading by the end of it.
 *
 * It keeps the full ink step, which is the whole of its remaining emphasis.
 */
export function Lede({ children }: { children: React.ReactNode }) {
  return <p className="article-lede article-body text-ink-12">{children}</p>
}
