import type { ReactNode } from 'react'

/**
 * A labelled aside inside an article: a named point the surrounding prose is
 * building towards, set apart so it can be found again on a second read.
 *
 * Not a Disclosure. A disclosure hides detail the reader may skip; this is the
 * opposite, a line the reader should not skip, which is why it is always open
 * and carries its label in the open.
 */
export function Callout({ label, children }: { label: string; children: ReactNode }) {
  return (
    <aside className="border-l-2 border-[color:var(--signal)] bg-[color:var(--signal-wash)] py-5 pl-5 pr-6 sm:pl-6">
      <p className="label text-signal">{label}</p>
      <div className="mt-2.5 [&>p]:mt-3 [&>p:first-child]:mt-0">{children}</div>
    </aside>
  )
}
