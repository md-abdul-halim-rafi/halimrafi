import Image from 'next/image'
import { availablePhotographs, PHOTO_CREDIT } from '@/lib/photographs'

/**
 * Renders the photographs that are present, or nothing at all.
 *
 * There is deliberately no empty state and no placeholder frame: until the files
 * exist the section leaves no trace on the page. Sizes are given so the browser
 * reserves the right box before the image decodes, which keeps the page from
 * shifting as they load.
 */
export function Photographs({ limit }: { limit?: number }) {
  const photos = availablePhotographs()
  if (photos.length === 0) return null
  const shown = typeof limit === 'number' ? photos.slice(0, limit) : photos

  return (
    <section className="mt-14" aria-labelledby="photographs">
      <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 border-t border-[color:var(--hairline)] pt-5">
        <h2 id="photographs" className="label">
          Photographs
        </h2>
        <p className="label">{PHOTO_CREDIT}</p>
      </div>

      <ul className="mt-6 grid gap-x-5 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
        {shown.map((photo) => (
          <li key={photo.file} className={photo.orientation === 'landscape' ? 'sm:col-span-2' : ''}>
            <figure className="m-0">
              <div className="overflow-hidden rounded-md bg-sunk">
                <Image
                  src={`/photographs/${photo.file}`}
                  alt={photo.alt}
                  width={photo.width}
                  height={photo.height}
                  sizes="(min-width: 1024px) 22rem, (min-width: 640px) 45vw, 90vw"
                  className="h-auto w-full"
                />
              </div>
              <figcaption className="mt-2.5 text-[0.8125rem] leading-[1.55] text-muted">
                {photo.label}
              </figcaption>
            </figure>
          </li>
        ))}
      </ul>
    </section>
  )
}
