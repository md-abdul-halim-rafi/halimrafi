import Image from 'next/image'
import { availablePhotographs, PHOTO_CREDIT } from '@/lib/photographs'

/**
 * Editorial runs the photographs as a plate section under the rule: the widest
 * one at full measure, the rest smaller beneath it, which is the same scale jump
 * the page uses for its work entries. Renders nothing until files exist.
 */
export function EditorialPhotos() {
  const photos = availablePhotographs()
  if (photos.length === 0) return null

  const [lead, ...rest] = [...photos].sort((a, b) =>
    a.orientation === 'landscape' ? -1 : b.orientation === 'landscape' ? 1 : 0,
  )

  return (
    <section className="mt-20 border-t-2 border-[color:var(--ink-12)] pt-6 sm:mt-24">
      <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
        <p className="label">Noticed</p>
        <p className="label">{PHOTO_CREDIT}</p>
      </div>

      <figure className="m-0 mt-6">
        <div className="overflow-hidden bg-sunk">
          <Image
            src={`/photographs/${lead.file}`}
            alt={lead.alt}
            width={lead.width}
            height={lead.height}
            sizes="(min-width: 1024px) 68rem, 92vw"
            className="h-auto w-full"
          />
        </div>
        <figcaption className="mt-3 max-w-[54ch] text-[0.875rem] leading-[1.6] text-ink-10">
          {lead.label}
        </figcaption>
      </figure>

      {rest.length > 0 ? (
        <ul className="mt-10 grid gap-x-6 gap-y-8 sm:grid-cols-2 lg:grid-cols-4">
          {rest.map((photo) => (
            <li key={photo.file}>
              <figure className="m-0">
                <div className="overflow-hidden bg-sunk">
                  <Image
                    src={`/photographs/${photo.file}`}
                    alt={photo.alt}
                    width={photo.width}
                    height={photo.height}
                    sizes="(min-width: 1024px) 16rem, 45vw"
                    className="h-auto w-full"
                  />
                </div>
                <figcaption className="mt-2.5 text-[0.75rem] leading-[1.5] text-ink-9">
                  {photo.label}
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      ) : null}
    </section>
  )
}
