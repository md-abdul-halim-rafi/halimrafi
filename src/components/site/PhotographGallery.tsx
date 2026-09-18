'use client'

import Image from 'next/image'
import {
  StudioLightbox,
  useLightbox,
  type StudioAsset,
} from '@/components/explorations/studio/StudioLightbox'

/**
 * Every photograph, each one opening the viewer the front page already uses.
 *
 * The grid is the one the About page carried — two columns from `sm`, three
 * from `lg`, a landscape frame spanning two — because that arrangement was
 * working and this is a move, not a redesign. What it gains is the viewer: on
 * the About page a photograph was a flat image, while the same photograph on
 * the front page opened full size. Two behaviours for one thing.
 *
 * Each tile opens the sequence at its own index, so stepping through from any
 * starting point walks the whole roll in the order the grid shows it.
 *
 * Sizes are declared so the browser reserves the right box before an image
 * decodes; the manifest reads the real pixel dimensions for the same reason.
 */
export function PhotographGallery({ photographs }: { photographs: StudioAsset[] }) {
  const lightbox = useLightbox()

  if (photographs.length === 0) return null

  return (
    <>
      <ul className="grid gap-x-5 gap-y-9 sm:grid-cols-2 lg:grid-cols-3">
        {photographs.map((photo, index) => (
          <li key={photo.id} className={photo.width > photo.height ? 'sm:col-span-2' : ''}>
            <figure className="m-0">
              <button
                type="button"
                onClick={(event) => lightbox.show(photographs, index, event.currentTarget)}
                aria-haspopup="dialog"
                aria-label={`Open ${photo.title}`}
                className="studio-photo block w-full"
              >
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  width={photo.width}
                  height={photo.height}
                  sizes="(min-width: 1024px) 18rem, (min-width: 640px) 45vw, 92vw"
                  className="h-auto w-full"
                />
              </button>
              <figcaption className="story-quiet mt-3 text-[0.8125rem] leading-[1.5]">
                {photo.title}
              </figcaption>
            </figure>
          </li>
        ))}
      </ul>

      {lightbox.open ? (
        <StudioLightbox
          assets={lightbox.open.assets}
          index={lightbox.open.index}
          origin={lightbox.open.origin}
          onStep={lightbox.step}
          onClose={lightbox.hide}
        />
      ) : null}
    </>
  )
}
