/**
 * A real artifact from the product.
 *
 * This stays `null` until a genuine screenshot or recording exists. While it is
 * null the site renders nothing at all for it: no frame, no caption, no reserved
 * box. Do not point it at stock imagery or a mock-up.
 *
 * Annotations are for pointing at specific things in the image. Only add ones
 * the supplied material actually supports.
 */
export type ProductArtifact = {
  /** Path under /public, e.g. "/octolane-account-view.png". */
  src: string
  /** What the image shows, for readers who cannot see it. */
  alt: string
  /** One or two sentences: what this is, and when it was captured. */
  caption: string
  width: number
  height: number
  annotations?: { label: string; note: string }[]
}

/**
 * Octolane's own brand image for Revenue Superintelligence, taken from the
 * company's site. It is deliberately captioned as a brand image rather than a
 * product screenshot, because that is what it is: it shows the positioning and
 * the mark, not the interface. The figures printed in its margins are Octolane's
 * marketing copy and are not repeated here as claims.
 */
export const productArtifact: ProductArtifact | null = {
  src: '/octolane/octolane-revenue-superintelligence.jpg',
  alt: 'Octolane brand image: the wordmark Superintelligence for human judgment set over an iridescent gradient, with the Octolane mark above it.',
  caption:
    'Octolane\'s brand image for Revenue Superintelligence. It shows how the company presents itself rather than the product interface.',
  width: 2400,
  height: 1260,
}
