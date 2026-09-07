/**
 * Optional depth inside a case study.
 *
 * A native <details> element: keyboard operable, open to find-in-page in modern
 * browsers, and readable with no JavaScript. Detail that not every reader needs
 * goes in here rather than being cut.
 */
export function Disclosure({
  summary,
  children,
}: {
  summary: string
  children: React.ReactNode
}) {
  return (
    <details className="group measure mt-6 border-t border-[color:var(--hairline)]">
      <summary className="flex cursor-pointer list-none items-baseline gap-3 py-4 text-[0.9375rem] font-medium text-ink marker:hidden hover:text-signal [&::-webkit-details-marker]:hidden">
        <span
          aria-hidden
          className="font-mono text-xs text-signal transition-transform duration-150 group-open:rotate-45"
        >
          +
        </span>
        <span>{summary}</span>
      </summary>
      <div className="pb-2">{children}</div>
    </details>
  )
}
