import type { ComponentType } from 'react'

/**
 * Content model for case studies.
 *
 * Adding a case study means: create `src/content/work/<slug>.mdx`, export a
 * `meta` object from it, and add one line to `registry` below. No page component
 * changes. See README.md.
 */

export type WorkStatus = 'draft' | 'published'

export type WorkMeta = {
  slug: string
  title: string
  /** One sentence, used on the homepage and in share previews. */
  summary: string
  /** ISO date this entry was published or last materially revised. */
  date: string
  status: WorkStatus
  /** What this specific person did. Never inflate into team-wide credit. */
  role: string
  collaborators: string[]
  /**
   * Whether the narrative contains an interactive artifact, and how it must be
   * described. Simulated artifacts are always labelled where they appear.
   */
  artifact: { kind: 'simulated-demo' | 'screenshot' | 'none'; label?: string }
  /** Section headings, in order, for the article's side rail. */
  sections: string[]
}

export type WorkModule = {
  meta: WorkMeta
  default: ComponentType
}

const registry: Record<string, () => Promise<WorkModule>> = {
  'making-a-response-readable': () =>
    import('@/content/work/making-a-response-readable.mdx') as Promise<WorkModule>,
  'helping-an-agent-finish-longer-tasks': () =>
    import('@/content/work/helping-an-agent-finish-longer-tasks.mdx') as Promise<WorkModule>,
}

export const workSlugs = Object.keys(registry)

export async function loadWork(slug: string): Promise<WorkModule | null> {
  const load = registry[slug]
  if (!load) return null
  return load()
}

export async function allWorkMeta(): Promise<WorkMeta[]> {
  const modules = await Promise.all(workSlugs.map((slug) => loadWork(slug)))
  return modules
    .flatMap((m) => (m ? [m.meta] : []))
    .filter((meta) => meta.status === 'published')
    .sort((a, b) => b.date.localeCompare(a.date))
}

export function formatDate(iso: string): string {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    timeZone: 'UTC',
  })
}
