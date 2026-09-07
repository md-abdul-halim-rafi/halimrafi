import Image from 'next/image'
import { productArtifact } from './artifact'

/**
 * Renders the product artifact, or nothing at all.
 *
 * There is deliberately no empty state. An absent screenshot should leave no
 * trace on the page rather than a box announcing what is missing.
 */
export function ProductArtifactView() {
  if (!productArtifact) return null
  const { src, alt, caption, width, height, annotations } = productArtifact

  return (
    <figure className="m-0">
      <div className="overflow-hidden rounded-[var(--radius)] border border-[color:var(--hairline)] bg-surface">
        <Image src={src} alt={alt} width={width} height={height} className="h-auto w-full" />
      </div>
      <figcaption className="mt-3 text-[0.8125rem] leading-[1.6] text-muted">{caption}</figcaption>

      {annotations?.length ? (
        <ol className="mt-4 space-y-2.5 border-t border-[color:var(--hairline)] pt-3">
          {annotations.map((annotation, i) => (
            <li key={annotation.label} className="flex gap-3 text-[0.8125rem] leading-[1.55]">
              <span className="font-mono text-[0.6875rem] text-signal">
                {String(i + 1).padStart(2, '0')}
              </span>
              <span>
                <span className="text-ink">{annotation.label}.</span>{' '}
                <span className="text-muted">{annotation.note}</span>
              </span>
            </li>
          ))}
        </ol>
      ) : null}
    </figure>
  )
}
