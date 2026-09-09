/**
 * The factual content shared by all three explorations.
 *
 * Identical across directions on purpose: the comparison is about composition,
 * typography, hierarchy and interaction, so the words must not vary. Every
 * claim here is established background. No metrics, customers, dates or
 * outcomes, because none have been supplied.
 */

export const person = {
  name: 'Halim Rafi',
  intro:
    'Co-founder and CTO of Octolane AI, YC W24. Previously co-founded Mainly Coding, acquired by Shikho.',
  place: 'San Francisco',
} as const

export type Work = {
  id: string
  /** The project's own name, used as the label everywhere. */
  name: string
  kind: 'Company' | 'Company, acquired' | 'Prototype'
  role: string
  /** One line, shown in listings. */
  summary: string
  /** What the work is, in plain terms. */
  problem: string
  /** Scope of responsibility. Never inflated past the title. */
  contribution: string
  /** One decision and its cost. Only where supported. */
  note?: string
  /** Whether this entry renders the live prototype. */
  interactive?: boolean
}

export const work: Work[] = [
  {
    id: 'octolane',
    name: 'Octolane AI',
    kind: 'Company',
    role: 'Co-founder and CTO',
    summary: 'A CRM built around a language model.',
    problem:
      'A sales team asks what changed on an account this week. The answer sits across email, meetings and records, and assembling it by hand is the work nobody wants to do.',
    contribution:
      'I am responsible for the engineering team and the technical direction: what we build, how it is built, and the standard we hold it to. The product is the work of that team.',
  },
  {
    id: 'mainly-coding',
    name: 'Mainly Coding',
    kind: 'Company, acquired',
    role: 'Co-founder',
    summary: 'Learning to program, in Bengali, in the browser.',
    // Supplied by Rafi, used as written.
    problem:
      'We built a platform for learning programming in Bengali, with coding directly in the browser. Mainly Coding was acquired by Shikho.',
    contribution: 'Co-founded the company. It was acquired by Shikho.',
  },
  {
    id: 'response-reveal',
    name: 'Response reveal',
    kind: 'Prototype',
    role: 'Designed and built for this site',
    summary: 'An answer arrives in pieces. When should each piece appear?',
    problem:
      'Streaming shows whatever has landed the moment it lands, so sentences assemble a fragment at a time and formatting arrives half open.',
    contribution:
      'A prototype on simulated data, built to make the decision inspectable rather than described.',
    note: 'Grouping into readable units costs 520ms to first text in this script, and buys a block that holds still long enough to read.',
    interactive: true,
  },
]

/** Shown wherever the prototype appears, in every direction. */
export const PROTOTYPE_CAPTION = 'Interactive prototype using simulated data'

/**
 * Octolane in two parts, from the supplied project material: what the product
 * does, then the scope of the role. Kept apart so neither reads as a claim about
 * the other, and kept short so neither repeats the introduction.
 *
 * No claim is made about the brand artwork, which he did not make, and none
 * about individual features.
 */
export const OCTOLANE = {
  /**
   * The same description as before, kept as two fields rather than one
   * paragraph: the first line is what the product is and the second is how it
   * behaves, and Studio sets them at different weights so the description can be
   * taken in at a glance. Splitting it here rather than slicing the string in
   * the component means a change to the wording cannot silently print the lead
   * twice.
   */
  productLead: 'A CRM built around a language model.',
  productDetail:
    'Ask what changed on an account this week and the answer comes from the email, meetings and records the system already holds.',
  role: 'I am responsible for the engineering team and the technical direction. The product is the work of that team.',
} as const

/**
 * Studio's narrative copy.
 *
 * Held apart from `person` and `work` above, which the other two directions
 * share and which must stay exactly as they are. Sentences marked as supplied
 * are Rafi's own wording, used verbatim.
 */
export const STUDIO = {
  // Supplied by Rafi, used as written. Apostrophes are typographic here and in
  // the two sentences below, so the three do not sit on the page with different
  // marks in the same word.
  intro: 'I’m Rafi, co-founder and CTO of Octolane AI.',
  /** Quiet supporting information beside the introduction, not a credential row. */
  aside: 'YC W24 / San Francisco',
  // Supplied by Rafi, used as written. One sentence, in the background.
  previously:
    'Previously, I co-founded Mainly Coding, a platform for learning programming in Bengali that was acquired by Shikho.',
  /**
   * The teaser for the article. Supplied by Rafi, used as written.
   *
   * It says what the decision is about and stops there. The comparison, the
   * scenarios, the implementation and the limits are all in the article, and
   * the caption is the only place the prototype is described, so the same
   * explanation is not given twice on one page.
   */
  decisionTitle: 'Making a response readable',
  decisionBody:
    'Building an AI product also means deciding how its answers appear. How should an answer unfold while it’s still arriving?',
  decisionLink: 'Explore the comparison',
  /** The prototype is illustrative and built for this site. It did not ship. */
  decisionCaption: 'Interactive prototype using simulated data.',
  // Supplied by Rafi, used as written.
  photography: 'Outside software, I’m learning photography.',
  /** Supplied as his public address. */
  email: 'mdabdulhalimrafi@gmail.com',
} as const

/**
 * Copy for the /explorations/story prototype.
 *
 * Separate from STUDIO so that route can keep its own wording. Every line here
 * is either Rafi's own, or the existing factual description of the product said
 * once. Nothing about outcomes, customers or measurements, because none has
 * been supplied.
 */
export const STORY = {
  // Supplied by Rafi, used as written.
  name: 'I’m Rafi.',
  role: 'Co-founder and CTO of Octolane AI.',
  aside: 'YC W24 · San Francisco',

  /** The work, in two short paragraphs: what it helps people do, then the
   *  scope of his responsibility. Nothing that implies he built the features. */
  workHeading: 'Octolane',
  workProduct:
    'Octolane brings together email, meetings, and account records so people can ask what changed.',
  workRole: 'As co-founder and CTO, I lead the engineering team and technical direction.',

  /** The decision, and the comparison that makes it observable. */
  decisionHeading: 'Making a response readable',
  decisionQuestion: 'An answer arrives in pieces. When should each piece appear?',
  decisionCaption: 'Interactive prototype using simulated data.',
  /**
   * The takeaway, without a number. Timings belong to the case study, where
   * they are checked against the fixture and named as demo configuration; a
   * figure on the homepage would be a claim the reader cannot see the basis
   * for.
   */
  decisionTradeoff:
    'This prototype waits for a readable unit before showing it. The tradeoff is a short delay before text appears.',
  readLabel: 'Read the case study',
  /**
   * The article lives under Studio and Studio links to it too, so the entry
   * point is named in the query. The article reads it to send the reader back
   * here rather than to Studio, which is not where they came from.
   */
  readHref: '/explorations/studio/making-a-response-readable?from=story',

  /** Background, and it belongs with the work rather than the photography. */
  previously: 'Previously, I co-founded Mainly Coding, which was acquired by Shikho.',

  /** The closing, which is only about the photograph. */
  photography: 'Outside software, I’m learning photography.',
  email: 'mdabdulhalimrafi@gmail.com',
} as const

export const EXPLORATIONS = [
  { slug: 'studio', name: 'Studio' },
  { slug: 'story', name: 'Story' },
  { slug: 'workbench', name: 'Workbench' },
  { slug: 'editorial', name: 'Editorial' },
] as const
