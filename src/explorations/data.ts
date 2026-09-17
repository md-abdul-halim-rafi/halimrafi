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
  /**
   * Segments, so the batch can be a link without slicing the string at render
   * time. Same reason as `previously` below.
   */
  aside: [
    { text: 'YC W24', href: 'https://www.ycombinator.com/companies/octolane-ai' },
    { text: ' · San Francisco' },
  ] as ReadonlyArray<{ text: string; href?: string }>,

  /** The work, in two short paragraphs: what it helps people do, then the
   *  scope of his responsibility. Nothing that implies he built the features. */
  workHeading: 'Octolane',
  workProduct:
    'Octolane brings together email, meetings, and account records so people can ask what changed.',
  workRole: 'As co-founder and CTO, I lead the engineering team and technical direction.',

  /**
   * The one piece of real product evidence on this page.
   *
   * Source, established by inspecting the file rather than its name: it is
   * `public/assets/images/01-screen-shot.webp` in Octolane's own website
   * repository, published on octolane.com as the image for the "Use Native AI
   * CRM" feature tab. Company material, already public.
   *
   * What the file actually is: a framed presentation of the application, not a
   * raw screen capture. The dark rounded outline is in the pixels themselves,
   * with transparent corners outside it, and the application background is 85%
   * opaque, so the interface was composited into a frame. The interface is the
   * product's own, shown in a demo workspace: the workspace switcher reads
   * Resend, and a meeting participant is at acme.com. Whether the interior was
   * captured from a running build or assembled in a design tool cannot be
   * determined from the file, so neither is claimed.
   *
   * Because the outline belongs to the asset, no CSS border is added over it.
   *
   * Three things are deliberately kept apart on this page. This is the product.
   * `productArtifact` in components/site is the company's brand image, and it
   * says so in its own caption. The comparison further down is a simulated
   * prototype built for this site, captioned as such wherever it appears.
   *
   * The caption describes the visible screen and nothing beyond it. The request
   * in the ask box is typed and unsent: the text cursor is still in the field
   * and the submit button sits beside it, with no answer anywhere on screen. So
   * the caption says "ready to send" and stops there, claiming no completed
   * workflow, no shipped behaviour, and no authorship. The sentence above the
   * figure carries the only contribution claim the supplied material supports,
   * which is the team and the technical direction.
   *
   * One more thing not written: the company site uses this same file for its
   * Salesforce tab and again for its HubSpot tab, and the image shows neither.
   */
  productSrc: '/octolane/octolane-app-home.webp',
  productWidth: 4074,
  productHeight: 2727,
  productTitle: 'Octolane',
  productAlt:
    'The Octolane application in a dark rounded frame. A sidebar lists Overview, Actions, Emails, Messages, Meetings, Signals, Accounts, Contacts and Pipelines, with Home selected. The main column is headed "Never miss a follow-up" over an ask box holding the typed, unsent request "Find deals stuck in negotiation for 14+ days and draft a check-in to each champion", the text cursor still at its end and a round submit button at its right. Below sit cards for AI Memory and AI Actions and a list of upcoming meetings with their participants.',
  productCaption: 'Octolane’s home workspace, with a follow-up request ready to send.',
  productZoomLabel: 'View larger',
  /**
   * The button wraps the screenshot, so without this its accessible name would
   * be the image's whole alt paragraph followed by "View larger". It begins
   * with the visible words, which is what WCAG's label-in-name asks for.
   */
  productZoomAria: 'View larger: Octolane’s home workspace',
  /**
   * The company's own site, linked beside the section heading rather than
   * under the screenshot. It opens in a new tab, so it carries `rel` alongside
   * `target` and does not hand the new tab a handle on this one.
   */
  productSourceLabel: 'octolane.com',
  productSourceHref: 'https://www.octolane.com',

  /**
   * The case study entry: the problem and the contribution in one paragraph,
   * then a link.
   *
   * Rollout status is deliberately absent. It needs three separate
   * qualifications to be accurate and they belong in the article's status
   * section, where there is room to keep them apart. Two sentences on a page
   * like this cannot carry them without either over-claiming or reading as
   * hedging.
   */
  caseHeading: 'Helping an agent finish longer tasks',
  caseBody:
    'Some requests need several rounds of work. I designed and built the execution path that lets Ask Octolane delegate tasks, save progress, and resume with the results.',
  caseLabel: 'Read the case study',
  caseHref: '/explorations/studio/helping-an-agent-finish-longer-tasks?from=story',

  /**
   * Background, and it belongs with the work rather than the photography.
   *
   * Held as segments rather than one string with the company names sliced out
   * of it at render time. Slicing a sentence to place links is the same shape
   * of mistake that once printed a lead line twice on this site: a wording
   * change silently breaks the match. Here a change to the sentence is a change
   * to this array and nothing else.
   */
  previously: [
    { text: 'Previously, I co-founded ' },
    { text: 'Mainly Coding', href: 'https://www.youtube.com/@MainlyCoding' },
    { text: ', which was acquired by ' },
    { text: 'Shikho', href: 'https://shikho.com' },
    { text: '.' },
  ] as ReadonlyArray<{ text: string; href?: string }>,

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
