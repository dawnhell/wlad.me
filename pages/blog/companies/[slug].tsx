import Image from 'next/image'
import type { ReactElement } from 'react'

import Breadcrumbs from '../../../components/blog/Breadcrumbs'
import OutboundLink from '../../../components/blog/OutboundLink'
import Layout from '../../../components/Layout'
import {
  evidenceLabel,
  formatEditionDate,
  latestMention,
  type Company,
} from '../../../lib/blog-format'
import { articleSchema, breadcrumbSchema } from '../../../lib/blog-schema'
import type { tNextPageWithLayout } from '../../_app'

const initialFor = (name: string) =>
  name.replace(/[^A-Za-z0-9]/g, '').slice(0, 1).toUpperCase() || '?'

const CompanyPage: tNextPageWithLayout<{ company: Company }> = ({ company }) => {
  const latest = latestMention(company)
  const earlier = company.mentions.slice(0, -1).reverse()

  return (
    <article className="flex w-full flex-col gap-8">
      <Breadcrumbs
        crumbs={[
          { name: 'Blog', path: '/blog' },
          { name: 'Companies', path: '/blog#companies' },
          { name: company.name, path: `/blog/companies/${company.slug}` },
        ]}
      />

      <header className="flex w-full flex-col gap-3">
        <h1 className="font-serif text-3xl font-medium text-balance md:text-4xl">
          {company.name}
        </h1>
        {company.listingNote ? (
          <p className="text-sm text-muted-foreground">{company.listingNote}</p>
        ) : null}
        <p className="max-w-[65ch] leading-relaxed text-muted-foreground">
          {company.description}
        </p>
      </header>

      {company.image ? (
        <Image
          src={company.image}
          alt={company.imageAlt || company.name}
          width={company.imageWidth || 1200}
          height={company.imageHeight || 630}
          priority
          sizes="(min-width: 1024px) 960px, 100vw"
          className="h-auto w-full rounded-xl"
        />
      ) : (
        <div
          aria-hidden
          className="flex size-16 items-center justify-center rounded-xl bg-muted font-serif text-2xl"
        >
          {initialFor(company.name)}
        </div>
      )}

      <section className="flex w-full flex-col gap-3">
        <h2 className="text-sm font-medium">Latest figures</h2>
        <p className="text-sm text-muted-foreground">
          <time dateTime={latest.date}>{formatEditionDate(latest.date)}</time>
        </p>
        <p className="w-fit rounded-md border border-border px-2 py-0.5 text-xs font-medium">
          {evidenceLabel(latest.evidenceKind)}
        </p>
        <p className="max-w-[65ch] text-sm tabular-nums leading-relaxed">
          {latest.evidence}
        </p>
        {latest.indieAngle ? (
          <p className="max-w-[65ch] text-sm leading-relaxed text-muted-foreground">
            {latest.indieAngle}
          </p>
        ) : null}
        {company.homepage ? (
          <p className="text-sm">
            <OutboundLink href={company.homepage}>Homepage</OutboundLink>
          </p>
        ) : null}
        {latest.sources.length > 0 ? (
          <div className="flex flex-col gap-2">
            <h3 className="text-sm font-medium">Sources</h3>
            <ol className="flex list-decimal flex-col gap-1 pl-5 text-sm">
              {latest.sources.map((source) => (
                <li key={source.url}>
                  <OutboundLink href={source.url}>{source.label}</OutboundLink>
                </li>
              ))}
            </ol>
          </div>
        ) : null}
      </section>

      <section className="flex w-full flex-col gap-3">
        <h2 className="text-sm font-medium">Mentioned in</h2>
        <ul className="flex flex-col gap-2 text-sm">
          {[...company.mentions].reverse().map((mention) => (
            <li key={mention.date}>
              <a
                href={`/blog/${mention.date}#${company.slug}`}
                className="text-link"
              >
                {formatEditionDate(mention.date)}
              </a>
            </li>
          ))}
        </ul>
      </section>

      {earlier.length > 0 ? (
        <section className="flex w-full flex-col gap-4">
          <h2 className="font-serif text-2xl font-medium">Earlier notes</h2>
          <ul className="flex flex-col gap-4">
            {earlier.map((mention) => (
              <li key={mention.date} className="flex flex-col gap-2 border-t border-border pt-4">
                <a href={`/blog/${mention.date}#${company.slug}`} className="text-link text-sm">
                  <time dateTime={mention.date}>{formatEditionDate(mention.date)}</time>
                </a>
                <p className="text-sm tabular-nums leading-relaxed">{mention.evidence}</p>
              </li>
            ))}
          </ul>
        </section>
      ) : null}
    </article>
  )
}

CompanyPage.getLayout = function getLayout(
  page: ReactElement,
  pageProps: { company: Company },
) {
  const company = pageProps.company
  const latest = latestMention(company)
  const crumbs = [
    { name: 'Blog', path: '/blog' },
    { name: 'Companies', path: '/blog#companies' },
    { name: company.name, path: `/blog/companies/${company.slug}` },
  ]
  const description = `${company.description} Figures recorded ${formatEditionDate(latest.date)}, labeled ${evidenceLabel(latest.evidenceKind).toLowerCase()}.`
  return (
    <Layout
      title={`${company.name} revenue notes | Boring SaaS`}
      description={description}
      image={company.image || '/circle_me.png'}
      mainAlign="start"
      ogType="article"
      publishedTime={`${latest.date}T00:00:00Z`}
      rss
      extraStructuredData={[
        articleSchema({
          headline: `${company.name} revenue notes`,
          description,
          path: `/blog/companies/${company.slug}`,
          date: latest.date,
          image: company.image,
        }),
        breadcrumbSchema(crumbs),
      ]}
    >
      {page}
    </Layout>
  )
}

export default CompanyPage

export async function getStaticPaths() {
  const { getCompanies } = await import('../../../lib/blog')
  return {
    paths: getCompanies().map((company) => ({ params: { slug: company.slug } })),
    fallback: false,
  }
}

export async function getStaticProps({
  params,
}: {
  params: { slug: string }
}) {
  const { getCompany } = await import('../../../lib/blog')
  const company = getCompany(params.slug)
  if (!company) return { notFound: true }
  return { props: { company } }
}
