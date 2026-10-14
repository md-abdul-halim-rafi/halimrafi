import type { StudioAsset } from '@/components/explorations/studio/StudioLightbox'
import { availablePhotographs } from './photographs'
import { PHOTO_CREDIT } from './photoCredit'

const modalSources: Record<string, string> = {
  'alley-red-blooms.jpg': '/photographs/alley-red-blooms-modal.jpg',
  'leafy-sidewalk.jpg': '/photographs/leafy-sidewalk-modal.jpg',
  'glass-and-sky.jpg': '/photographs/glass-and-sky-modal.jpg',
}

/**
 * The photographs as viewer assets, in manifest order.
 *
 * Three surfaces need this exact list now — the front page's closing, the
 * gallery at `/photographs` and the studio exploration — and the front page
 * hands its sequence to the same viewer the gallery opens. Building it in each
 * of them is how the gallery ends up in a different order from the sequence the
 * front page opens, so it is built once here.
 *
 * Reads the filesystem, so it stays on the server.
 */
export function photographAssets(): StudioAsset[] {
  return availablePhotographs().map((photo) => ({
    id: photo.file,
    kind: 'photograph',
    src: `/photographs/${photo.file}`,
    modalSrc: modalSources[photo.file],
    alt: photo.alt,
    width: photo.width,
    height: photo.height,
    title: photo.label,
    caption: PHOTO_CREDIT,
  }))
}
