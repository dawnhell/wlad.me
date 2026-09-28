import type { ReactElement } from 'react'

import Breadcrumbs from '../../components/blog/Breadcrumbs'
import CompanyCard from '../../components/blog/CompanyCard'
import EditionHero from '../../components/blog/EditionHero'
import Layout from '../../components/Layout'
import {
  formatEditionDate,
  type Edition,
  type Hero,
} from '../../lib/blog-format'
import { articleSchema, breadcrumbSchema } from '../../lib/blog-schema'
import type { tNextPageWithLayout } from '../_app'

type EditionLink = {
  date: string
  title: string
}

type EditionPageProps = {
  edition: Edition
  hero: Hero
  newer: EditionLink | null
  older: EditionLink | null
}

const EditionPage: tNextPageWithLayout<EditionPageProps> = ({
  edition,
  hero,
  newer,
  older,
}) => {
  return (
    <article className="mx-auto flex w-full max-w-3xl flex-col gap-10">
      <Breadcrumbs
        crumbs={[
          { name: 'Blog', path: '/blog' },
          { name: formatEditionDate(edition.date), path: `/blog/${edition.date}` },
        ]}
      />
      <EditionHero hero={hero} />
      <header className="flex w-full flex-col gap-4">
        <h1 className="font-serif text-4xl font-normal tracking-tight text-balance md:text-5xl">
          {edition.title}
        </h1>
        <p className="text-sm text-muted-foreground">
          <time dateTime={edition.date}>{formatEditionDate(edition.date)}</time>
          <span aria-hidden> · </span>
          <a href="/" className="text-link">
            Wlad
          </a>
        </p>
        <p className="max-w-[65ch] text-lg leading-relaxed text-pretty text-muted-foreground">
          {edition.dek}
        </p>
      </header>

      <div className="flex w-full flex-col">
        {edition.companies.map((company, index) => (
          <CompanyCard key={company.slug} company={company} index={index} />
        ))}
      </div>

      {edition.honorableMentions.length > 0 ? (
        <section className="flex w-full flex-col gap-4 border-t border-border pt-12">
          <h2 className="font-serif text-3xl font-normal tracking-tight">
            Honorable mentions
          </h2>
          <ul className="flex w-full flex-col">
            {edition.honorableMentions.map((mention) => (
              <li
                key={mention.name}
                className="grid grid-cols-1 gap-1 border-t border-border py-3 sm:grid-cols-[11rem_minmax(0,1fr)] sm:items-baseline sm:gap-6"
              >
                <span className="font-medium">{mention.name}</span>
                <span className="text-sm tabular-nums leading-relaxed text-muted-foreground">
                  {mention.note}
                </span>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      {older || newer ? (
        <nav aria-label="Editions" className="flex w-full flex-col gap-3 text-sm sm:flex-row sm:justify-between">
          {older ? (
            <a href={`/blog/${older.date}`} className="text-link">
              Previous edition
              <span className="mt-1 block font-normal text-muted-foreground">
                {formatEditionDate(older.date)}
              </span>
            </a>
          ) : (
            <span />
          )}
          {newer ? (
            <a href={`/blog/${newer.date}`} className="text-link sm:text-right">
              Next edition
              <span className="mt-1 block font-normal text-muted-foreground">
                {formatEditionDate(newer.date)}
              </span>
            </a>
          ) : null}
        </nav>
      ) : null}
    </article>
  )
}

EditionPage.getLayout = function getLayout(
  page: ReactElement,
  pageProps: EditionPageProps,
) {
  const crumbs = [
    { name: 'Blog', path: '/blog' },
    {
      name: formatEditionDate(pageProps.edition.date),
      path: `/blog/${pageProps.edition.date}`,
    },
  ]
  return (
    <Layout
      title={`${pageProps.edition.title} | Boring SaaS`}
      description={pageProps.edition.dek}
      image={pageProps.hero.src}
      mainAlign="start"
      ogType="article"
      publishedTime={`${pageProps.edition.date}T00:00:00Z`}
      rss
      extraStructuredData={[
        articleSchema({
          headline: pageProps.edition.title,
          description: pageProps.edition.dek,
          path: `/blog/${pageProps.edition.date}`,
          date: pageProps.edition.date,
          image: pageProps.hero.src,
        }),
        breadcrumbSchema(crumbs),
      ]}
    >
      {page}
    </Layout>
  )
}

export default EditionPage

export async function getStaticPaths() {
  const { getEditions } = await import('../../lib/blog')
  return {
    paths: getEditions().map((edition) => ({ params: { date: edition.date } })),
    fallback: false,
  }
}

export async function getStaticProps({
  params,
}: {
  params: { date: string }
}) {
  const { getAdjacentEditions, getEdition, getHero } = await import('../../lib/blog')
  const edition = getEdition(params.date)
  if (!edition) return { notFound: true }
  const adjacent = getAdjacentEditions(edition.date)
  const link = (item: { date: string; title: string } | null) =>
    item ? { date: item.date, title: item.title } : null

  return {
    props: {
      edition,
      hero: getHero(edition.heroId),
      newer: link(adjacent.newer),
      older: link(adjacent.older),
    },
  }
}
