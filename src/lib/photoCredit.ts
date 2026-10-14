/**
 * Kept apart from photographs.ts on purpose: that module reads the filesystem,
 * so importing it from a client component pulls `node:fs` into the browser
 * bundle and the build fails. Plain constants live here instead.
 *
 * Shown once per gallery, never repeated under each image.
 */
import { site } from './site'

export const PHOTO_CREDIT = `Photographs by ${site.name}`
