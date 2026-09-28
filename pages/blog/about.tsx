import type { ReactElement } from 'react'

import Breadcrumbs from '../../components/blog/Breadcrumbs'
import Layout from '../../components/Layout'
import { breadcrumbSchema } from '../../lib/blog-schema'
import type { tNextPageWithLayout } from '../_app'

const crumbs = [
  { name: 'Blog', path: '/blog' },
  { name: 'About', path: '/blog/about' },
]

const AboutPage: tNextPageWithLayout = () => {
  return (
    <article className="flex w-full flex-col gap-8">
      <Breadcrumbs crumbs={crumbs} />
      <header className="flex w-full flex-col gap-3">
        <h1 className="font-serif text-3xl font-normal text-balance md:text-4xl">
          About these notes
        </h1>
        <p className="max-w-[65ch] leading-relaxed text-muted-foreground">
          Boring SaaS is a dated series of notes on software products that
          already charge money. The rest of this site is a résumé. This section
          is the archive.
        </p>
      </header>

      <section className="flex max-w-[65ch] flex-col gap-3">
        <h2 className="font-serif text-2xl font-normal">Stripe-verified</h2>
        <p className="leading-relaxed text-muted-foreground">
          The figure comes from a TrustMRR listing that the day’s brief marks
          as connected to Stripe. This site does not audit the number. The
          TrustMRR page is linked next to it.
        </p>
      </section>

      <section className="flex max-w-[65ch] flex-col gap-3">
        <h2 className="font-serif text-2xl font-normal">Self-reported</h2>
        <p className="leading-relaxed text-muted-foreground">
          The figure comes from the company, a founder, or another write-up the
          brief cites. It is not presented as checked against a payment
          processor. The source is linked next to the number.
        </p>
      </section>

      <section className="flex max-w-[65ch] flex-col gap-3">
        <h2 className="font-serif text-2xl font-normal">What gets a page</h2>
        <p className="leading-relaxed text-muted-foreground">
          Each dated brief becomes one edition. Each full entry also keeps a
          company page, so a later brief can add a new figure without replacing
          the old one. Honorable mentions stay on the edition until a later
          brief gives them a full entry. Listings without a public homepage are
          not given a guessed address.
        </p>
      </section>

      <section className="flex max-w-[65ch] flex-col gap-3">
        <h2 className="font-serif text-2xl font-normal">Photographs</h2>
        <p className="leading-relaxed text-muted-foreground">
          The large photo at the top of an edition is a nature or animal
          photograph from Wikimedia Commons. It is not a picture of the
          products. The line on the photo names the photographer and the
          license. Product images lower on the page are the companies’ own
          social images, compressed for this site.
        </p>
      </section>
    </article>
  )
}

AboutPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout
      title="About Boring SaaS | Wlad"
      description="How Boring SaaS labels revenue figures, what earns a company page, and where the edition photographs come from."
      mainAlign="start"
      rss
      extraStructuredData={[breadcrumbSchema(crumbs)]}
    >
      {page}
    </Layout>
  )
}

export default AboutPage
