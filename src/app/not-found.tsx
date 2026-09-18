import { SiteFooter } from '@/components/site/Chrome'
import { SiteHeader } from '@/components/site/SiteHeader'
import { BackLink } from '@/components/ui/BackLink'

export default function NotFound() {
  return (
    <>
      <SiteHeader />
      <main className="mx-auto max-w-[58rem] px-6 pt-20 sm:px-10">
        <p className="label">404</p>
        <h1 className="display mt-5 text-[clamp(2.25rem,6vw,3.5rem)] leading-[1.02] text-ink-12">
          This page does not exist.
        </h1>
        <p className="mt-8">
          <BackLink href="/">Home</BackLink>
        </p>
      </main>
      <SiteFooter />
    </>
  )
}
