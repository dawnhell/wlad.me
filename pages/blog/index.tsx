import Image from 'next/image'
import type { ReactElement } from 'react'

import Layout from '../../components/Layout'
import { formatEditionDate, type Hero } from '../../lib/blog-format'
import type { tNextPageWithLayout } from '../_app'

type EditionSummary = {
  date: string
  title: string
  dek: string
  companyNames: string[]
  hero: Pick<Hero, 'src' | 'alt' | 'width' | 'height'>
}

type CompanySummary = {
  slug: string
  name: string
  description: string
}

type BlogIndexProps = {
  latest: EditionSummary
  hero: Hero
  older: EditionSummary[]
  companies: CompanySummary[]
}

const EditionCard = ({
  edition,
  priority = false,
  imageClassName,
  heading,
}: {
  edition: EditionSummary
  priority?: boolean
  imageClassName: string
  heading: 'h2' | 'h3'
}) => {
  const Title = heading
  return (
    <a
      href={`/blog/${edition.date}`}
      className="block h-full overflow-hidden rounded-xl border border-border bg-card shadow-[var(--shadow-border)] fine-hover:bg-muted"
    >
      <Image
        src={edition.hero.src}
        alt=""
        width={edition.hero.width}
        height={edition.hero.height}
        priority={priority}
        sizes="(min-width: 1024px) 960px, 100vw"
        className={imageClassName}
      />
      <div className="flex flex-col gap-2 p-4 sm:p-5">
        <time dateTime={edition.date} className="text-sm text-muted-foreground">
          {formatEditionDate(edition.date)}
        </time>
        <Title className="font-serif text-2xl font-normal text-balance">
          {edition.title}
        </Title>
        <p className="text-sm leading-relaxed text-muted-foreground">
          {edition.companyNames.join(' · ')}
        </p>
      </div>
    </a>
  )
}

const BlogIndex: tNextPageWithLayout<BlogIndexProps> = ({
  latest,
  older,
  companies,
}) => {
  return (
    <div className="flex w-full flex-col gap-12">
      <header className="flex w-full flex-col gap-3">
        <h1 className="font-serif text-3xl font-normal text-balance md:text-4xl">
          Boring SaaS
        </h1>
        <p className="max-w-[65ch] leading-relaxed text-muted-foreground">
          Dated notes on software products that already make money. Each figure
          is labeled Stripe-verified or self-reported, and each one links to its
          source.
        </p>
        <p className="flex flex-wrap gap-4 text-sm">
          <a href="/blog/about" className="text-link">
            How these notes work
          </a>
          <a href="/blog/rss.xml" className="text-link">
            RSS
          </a>
        </p>
      </header>

      <article className="w-full">
        <EditionCard
          edition={latest}
          priority
          heading="h2"
          imageClassName="h-40 w-full object-cover sm:h-56"
        />
      </article>

      {older.length > 0 ? (
        <section className="flex w-full flex-col gap-4">
          <h2 className="font-serif text-2xl font-normal">Earlier editions</h2>
          <ul className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {older.map((edition) => (
              <li key={edition.date}>
                <EditionCard
                  edition={edition}
                  heading="h3"
                  imageClassName="h-36 w-full object-cover sm:h-48"
                />
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      <section id="companies" className="flex w-full scroll-mt-8 flex-col gap-4">
        <h2 className="font-serif text-2xl font-normal">Companies</h2>
        <ul className="grid gap-2 sm:grid-cols-2">
          {companies.map((company) => (
            <li key={company.slug}>
              <a
                href={`/blog/companies/${company.slug}`}
                className="flex min-h-11 flex-col gap-1 rounded-lg p-3 fine-hover:bg-muted"
              >
                <span className="font-medium">{company.name}</span>
                <span className="text-sm leading-relaxed text-muted-foreground">
                  {company.description}
                </span>
              </a>
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}

BlogIndex.getLayout = function getLayout(
  page: ReactElement,
  pageProps: BlogIndexProps,
) {
  return (
    <Layout
      title="Boring SaaS(with revenue $$$) | Wlad"
      description="Dated notes on handpicked software products that already make money.
      Almost each of them is Stripe-verified with a public link to its TrustMRR listing."
      image={pageProps.hero.src}
      mainAlign="start"
      rss
    >
      {page}
    </Layout>
  )
}

export default BlogIndex

export async function getStaticProps() {
  const { getCompanies, getEditions, getHero } = await import('../../lib/blog')
  const editions = getEditions()
  const latestEdition = editions[0]
  if (!latestEdition) return { notFound: true }
  const hero = getHero(latestEdition.heroId)
  const summarize = (edition: typeof latestEdition): EditionSummary => {
    const editionHero = getHero(edition.heroId)
    return {
      date: edition.date,
      title: edition.title,
      dek: edition.dek,
      companyNames: edition.companies.map((company) => company.name),
      hero: {
        src: editionHero.src,
        alt: editionHero.alt,
        width: editionHero.width,
        height: editionHero.height,
      },
    }
  }

  return {
    props: {
      latest: summarize(latestEdition),
      hero,
      older: editions.slice(1).map(summarize),
      companies: getCompanies().map((company) => ({
        slug: company.slug,
        name: company.name,
        description: company.description,
      })),
    },
  }
}
