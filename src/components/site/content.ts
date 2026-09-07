/**
 * Homepage copy.
 *
 * Each section has one job. The introduction says who he is and what he builds.
 * The Octolane section explains the product, the responsibility and the scope of
 * the engineering work. The case study explains one decision. None of them
 * repeats another's argument.
 *
 * Claims are limited to established background: role, company, prior company and
 * its acquisition. No metrics, customers, dates or outcomes appear anywhere until
 * evidence supports them. Notes about missing evidence live in
 * docs/PROJECT-STATUS.md, never on the page.
 */
export const home = {
  intro: {
    headline: 'I build products, from the hard decision to the last interaction.',
    bio: 'Co-founder and CTO of Octolane AI (YC W24). Previously co-founded Mainly Coding, acquired by Shikho.',
  },

  /** Frames the artifact in one line. The argument itself lives in the case study. */
  artifact: {
    label: 'One decision, made visible',
    line: 'The same answer, shown two ways while it is still arriving.',
  },

  octolane: {
    label: 'The work',
    name: 'Octolane AI',
    role: 'Co-founder and CTO',
    context: 'YC W24',
    purpose:
      'Octolane is a CRM built around a language model. A sales team can ask what changed on an account this week and get an answer drawn from the email, meetings and records the system already holds, rather than assembling it by hand.',
    responsibility:
      'I am a co-founder and the CTO. I am responsible for the engineering team and for the technical direction of the product: what we build, how it is built, and the standard we hold it to. The product is the work of that team, not of one person.',
    detailsEyebrow: 'A decision you can inspect',
    // Add verified engineering decisions to `details` below as evidence allows.
    // Two or three concrete examples would carry the scope of the role far
    // better than a summary sentence, which is why there is no summary sentence.
  },

  details: [
    {
      slug: 'making-a-response-readable',
      title: 'Making a response readable',
      blurb:
        'An answer arrives in pieces. Deciding when to show each piece is a product decision, not a rendering detail.',
      kind: 'Interactive prototype',
    },
  ],

  mainlyCoding: {
    period: 'Previously',
    name: 'Mainly Coding',
    role: 'Co-founder',
    outcome: 'Acquired by Shikho',
    body: 'A programming-learning platform built for Bengali speakers, with coding in the browser.',
  },
} as const
