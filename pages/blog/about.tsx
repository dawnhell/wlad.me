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
          Boring SaaS is a collection of notes about software products that already make money.
        </p>
        <p className="max-w-[65ch] leading-relaxed text-muted-foreground">
          The notes are dated, so they're really more of an archive than a regularly updated 
          database. The rest of this site is my résumé; this part is where I keep the research.
        </p>
      </header>

      <section className="flex max-w-[65ch] flex-col gap-3">
        <h2 className="font-serif text-2xl font-normal">Stripe-verified</h2>
        <p className="leading-relaxed text-muted-foreground">
          If you see "Stripe-verified", the numbers come from TrastMRR listing(that's already Stripe-verified).
          I'm not independently checking the number against Stripe. The TrustMRR source is linked next to it, so you can see where it came from.
        </p>
      </section>

      <section className="flex max-w-[65ch] flex-col gap-3">
        <h2 className="font-serif text-2xl font-normal">
          Creem, Polar, Paddle, Lemon Squeezy, and RevenueCat
        </h2>
        <p className="leading-relaxed text-muted-foreground">
          Same thing, just with a different payment processor.
        </p>
        <p className="leading-relaxed text-muted-foreground">
          The TrustMRR listing is marked as connected to Creem, Polar, Paddle, Lemon Squeezy, or RevenueCat. 
          I'm not auditing those numbers either
        </p>
      </section>

      <section className="flex max-w-[65ch] flex-col gap-3">
        <h2 className="font-serif text-2xl font-normal">Self-reported</h2>
        <p className="leading-relaxed text-muted-foreground">
          These numbers come from the company, a founder, or another source 
          mentioned in the original brief. They're not presented as verified revenue. 
          If there's a source, I link to it.
        </p>
      </section>

      <section className="flex max-w-[65ch] flex-col gap-3">
        <h2 className="font-serif text-2xl font-normal">How the pages work</h2>
        <p className="leading-relaxed text-muted-foreground">
          Each dated brief is its own edition. Companies that get a full entry also 
          have their own page. That means a later edition can add a new number 
          without rewriting what was reported before.
        </p>
        <p className="leading-relaxed text-muted-foreground">
          Honorable mentions stay with the original edition unless they later get a 
          full entry.
        </p>
      </section>

      <section className="flex max-w-[65ch] flex-col gap-3">
        <h2 className="font-serif text-2xl font-normal">Photographs</h2>
        <p className="leading-relaxed text-muted-foreground">
          The big photo at the top of each edition is usually a nature or animal photo 
          from Wikimedia Commons. It’s not meant to represent the product. The photographer 
          and license are credited on the image. The product images further down the page 
          come from the companies' own social posts and are compressed for the site.
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
