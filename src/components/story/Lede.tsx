/**
 * The article's opening paragraph.
 *
 * It carried a drop cap until the body face changed to a grotesque. A
 * high-contrast serif capital against Inter read as borrowed rather than
 * designed, and holding its baseline across widths and font-load states needed
 * a measuring pass on every resize. Scale and ink carry the opening instead,
 * which is font-agnostic and has no failure mode.
 */
export function Lede({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[1.3125rem] leading-[1.5] text-ink-12 sm:text-[1.4375rem]">{children}</p>
  )
}
