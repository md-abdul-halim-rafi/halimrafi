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

export const productArtifact: ProductArtifact | null = null
