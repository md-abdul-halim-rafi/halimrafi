import Link from 'next/link'
import { SiteFooter } from '@/components/site/Chrome'
import { SiteHeader } from '@/components/site/SiteHeader'

export default function NotFound() {
  return (
    <>
      <SiteHeader />
      <main className="mx-auto max-w-[76rem] px-5 pt-20 sm:px-8">
        <p className="label">404</p>
        <h1 className="display mt-5 text-[clamp(2.25rem,6vw,3.5rem)] leading-[1.02] text-ink-12">
          This page does not exist.
        </h1>
        <p className="mt-6 text-[0.9375rem]">
          <Link href="/" className="link-underline">
            Back to the front page
          </Link>
        </p>
      </main>
      <SiteFooter />
    </>
  )
}
