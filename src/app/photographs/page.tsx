import type { Metadata } from 'next'
import { SiteFooter } from '@/components/site/Chrome'
import { PhotographGallery } from '@/components/site/PhotographGallery'
import { SiteHeader } from '@/components/site/SiteHeader'
import { PHOTO_CREDIT } from '@/lib/photoCredit'
import { photographAssets } from '@/lib/photographAssets'
import { site } from '@/lib/site'

const description = `Photographs by ${site.name}.`

export const metadata: Metadata = {
  title: 'Photographs',
  description,
  alternates: { canonical: `${site.url}/photographs` },
  openGraph: {
    title: `Photographs · ${site.name}`,
    description,
    type: 'website',
    url: `${site.url}/photographs`,
    images: [{ url: site.ogImage, width: 1200, height: 630, alt: site.ogImageAlt }],
  },
}

/**
 * The photographs, all of them.
 *
 * This is where the About page's gallery went when that page was removed from
 * the site. The images, their captions and the credit are the ones the manifest
 * already carried; what is new is that the page has a destination of its own,
 * which is what the front page's "More photographs" now points at instead of
 * opening the viewer from under the reader.
 *
 * Built like the writing archive: the site's header, one 58rem measure, a
 * display heading, and then the thing itself. No introduction. A page of
 * photographs does not need to be told what it is.
 *
 * Assets are resolved here because the manifest reads the filesystem and the
 * gallery is a client component.
 */
export default function PhotographsPage() {
  const photographs = photographAssets()

  return (
    <>
      <SiteHeader />

      <main className="mx-auto w-full max-w-[58rem] px-6 pb-24 sm:px-10">
        <header className="pb-10 pt-16 sm:pb-12 sm:pt-20">
          <h1 className="display max-w-[15ch] text-[clamp(2.5rem,6.4vw,4.25rem)] leading-[1.0] text-ink-12">
            Photographs
          </h1>
          <p className="story-mono story-quiet mt-6">{PHOTO_CREDIT}</p>
        </header>

        <PhotographGallery photographs={photographs} />
      </main>

      <SiteFooter />
    </>
  )
}
