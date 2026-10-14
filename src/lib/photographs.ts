import { existsSync, readFileSync } from 'node:fs'
import path from 'node:path'

/**
 * Photographs taken by Rafi.
 *
 * The manifest names the files and carries the alt text and captions. At build
 * time the list is filtered to the files that actually exist under
 * `public/photographs`, so dropping a file in makes it appear and a missing file
 * is skipped rather than leaving a hole or a broken image.
 *
 * Captions describe what is in frame and nothing more. No locations are named
 * beyond what the photograph itself shows.
 */
export type Photograph = {
  file: string
  alt: string
  /** A short literal name for the subject. No locations, dates or commentary. */
  label: string
  /** Read from the file, not declared, so the reserved box always matches. */
  width: number
  height: number
  orientation: 'portrait' | 'landscape'
}

type Entry = { file: string; alt: string; label: string }

/**
 * Reads pixel dimensions out of a JPEG or PNG header.
 *
 * The declared dimensions have to match the file. With `height: auto` the
 * browser uses the image's own ratio once it decodes, so a guessed ratio
 * reserves the wrong box and the page jumps when the photograph arrives. Reading
 * the real numbers removes the guess.
 */
/**
 * Reads the EXIF orientation tag, if present.
 *
 * Camera files store the sensor readout in the JPEG header and record the
 * rotation separately. Browsers honour that rotation, so a portrait photograph
 * reports landscape dimensions in its header and renders portrait. Ignoring the
 * tag reserves a box of the wrong shape and the page jumps on load.
 */
function readOrientation(buffer: Buffer): number {
  let offset = 2
  while (offset + 4 < buffer.length) {
    if (buffer[offset] !== 0xff) return 1
    const marker = buffer[offset + 1]
    const length = buffer.readUInt16BE(offset + 2)

    if (marker === 0xe1 && buffer.toString('ascii', offset + 4, offset + 10) === 'Exif\0\0') {
      const tiff = offset + 10
      const little = buffer.toString('ascii', tiff, tiff + 2) === 'II'
      const u16 = (at: number) => (little ? buffer.readUInt16LE(at) : buffer.readUInt16BE(at))
      const u32 = (at: number) => (little ? buffer.readUInt32LE(at) : buffer.readUInt32BE(at))

      const ifd = tiff + u32(tiff + 4)
      const count = u16(ifd)
      for (let i = 0; i < count; i += 1) {
        const entry = ifd + 2 + i * 12
        if (u16(entry) === 0x0112) return u16(entry + 8)
      }
      return 1
    }

    if (marker === 0xda) return 1 // start of scan; no EXIF found
    offset += 2 + length
  }
  return 1
}

function readSize(file: string): { width: number; height: number } | null {
  let buffer: Buffer
  try {
    buffer = readFileSync(file)
  } catch {
    return null
  }

  // PNG: IHDR width and height are big-endian at byte 16.
  if (buffer.length > 24 && buffer.readUInt32BE(0) === 0x89504e47) {
    return { width: buffer.readUInt32BE(16), height: buffer.readUInt32BE(20) }
  }

  // JPEG: walk the segments to a start-of-frame marker, then apply rotation.
  if (buffer.length > 4 && buffer[0] === 0xff && buffer[1] === 0xd8) {
    let offset = 2
    while (offset + 9 < buffer.length) {
      if (buffer[offset] !== 0xff) break
      const marker = buffer[offset + 1]
      if (marker >= 0xc0 && marker <= 0xcf && marker !== 0xc4 && marker !== 0xc8 && marker !== 0xcc) {
        const height = buffer.readUInt16BE(offset + 5)
        const width = buffer.readUInt16BE(offset + 7)
        // 5 to 8 are the quarter-turn orientations, which swap the axes.
        const orientation = readOrientation(buffer)
        return orientation >= 5 && orientation <= 8
          ? { width: height, height: width }
          : { width, height }
      }
      offset += 2 + buffer.readUInt16BE(offset + 2)
    }
  }

  return null
}

const MANIFEST: Entry[] = [
  {
    file: 'pier-shed-railings.jpg',
    alt: 'A long pier shed with white railings and weathered timber posts, in warm low light, with an empty concrete plaza in front.',
    label: 'Waterfront',
  },
  {
    file: 'half-moon-sky.jpg',
    alt: 'A half moon high in a flat pink and grey sky, with the top of a lamp post at the lower left.',
    label: 'Moon',
  },
  {
    file: 'alley-red-blooms.jpg',
    alt: 'An urban alley with brick buildings, a parked car, overhead wires, and red flowers spilling over a low brick wall.',
    label: 'Red blooms over a brick wall',
  },
  {
    file: 'leafy-sidewalk.jpg',
    alt: 'A sunlit sidewalk shaded by dense street trees, with two distant pedestrians and parked cars down the block.',
    label: 'A walk beneath the street trees',
  },
  {
    file: 'glass-and-sky.jpg',
    alt: 'The upper stories of a glass-and-concrete building rising into a broad blue sky, with a small cloud at the edge.',
    label: 'Glass against a blue sky',
  },
]

/**
 * The photographs whose files are present, with their real dimensions. A file
 * that exists but cannot be measured is skipped rather than guessed at.
 */
export function availablePhotographs(): Photograph[] {
  const dir = path.join(process.cwd(), 'public', 'photographs')
  const out: Photograph[] = []

  for (const entry of MANIFEST) {
    const full = path.join(dir, entry.file)
    if (!existsSync(full)) continue
    const size = readSize(full)
    if (!size) continue
    out.push({
      ...entry,
      width: size.width,
      height: size.height,
      orientation: size.height > size.width ? 'portrait' : 'landscape',
    })
  }

  return out
}

export { PHOTO_CREDIT } from './photoCredit'
