import Image from 'next/image'
import type { ReactElement } from 'react'

import Breadcrumbs from '../../../components/blog/Breadcrumbs'
import OutboundLink from '../../../components/blog/OutboundLink'
import TrustMrrChart from '../../../components/blog/TrustMrrChart'
import Layout from '../../../components/Layout'
import blurbs from '../../../content/blog/blurbs.json'
import {
  evidenceLabel,
  formatEditionDate,
  latestMention,
  type Company,
  type CompanyMention,
} from '../../../lib/blog-format'
import { articleSchema, breadcrumbSchema } from '../../../lib/blog-schema'
import type { tNextPageWithLayout } from '../../_app'

const notes = blurbs as Record<string, string>

const editionHref = (slug: string, date: string) => `/blog/${date}#${slug}`

const Figures = ({
  slug,
  mention,
}: {
  slug: string
  mention: CompanyMention
}) => {
  return (
    <div className="flex max-w-[65ch] flex-col gap-4">
      <p className="text-sm">
        <a href={editionHref(slug, mention.date)} className="text-link">
          <time dateTime={mention.date}>{formatEditionDate(mention.date)}</time>
        </a>
      </p>
      <div className="flex flex-col gap-1 border-l-2 border-primary py-0.5 pl-4">
        <p className="text-xs font-medium tracking-wide text-muted-foreground">
          {evidenceLabel(mention.evidenceKind)}
        </p>
        <p className="tabular-nums leading-relaxed">{mention.evidence}</p>
      </div>
      {mention.sources.length > 0 ? (
        <p className="flex flex-wrap items-baseline gap-x-4 gap-y-2 text-sm">
          {mention.sources.map((source) => (
            <OutboundLink key={source.url} href={source.url}>
              {source.label}
            </OutboundLink>
          ))}
        </p>
      ) : null}
    </div>
  )
}

const CompanyPage: tNextPageWithLayout<{ company: Company }> = ({ company }) => {
  const latest = latestMention(company)
  const earlier = company.mentions.slice(0, -1).reverse()
  const blurb = notes[company.slug]

  return (
    <article className="mx-auto flex w-full max-w-3xl flex-col gap-10">
      <Breadcrumbs
        crumbs={[
          { name: 'Blog', path: '/blog' },
          { name: 'Companies', path: '/blog#companies' },
          { name: company.name, path: `/blog/companies/${company.slug}` },
        ]}
      />

      <div className="flex w-full flex-col gap-5">
        <header className="flex w-full flex-col gap-2">
          <h1 className="font-serif text-4xl font-normal tracking-tight text-balance md:text-5xl">
            {company.name}
          </h1>
          {company.listingNote ? (
            <p className="text-sm text-muted-foreground">{company.listingNote}</p>
          ) : null}
          <p className="text-sm text-muted-foreground">{company.description}</p>
        </header>

        {company.image ? (
          <figure className="overflow-hidden rounded-2xl">
            <Image
              src={company.image}
              alt={company.imageAlt || company.name}
              width={company.imageWidth || 1200}
              height={company.imageHeight || 630}
              priority
              sizes="(min-width: 768px) 736px, 100vw"
              className="h-auto w-full"
            />
          </figure>
        ) : null}

        {blurb ? (
          <p className="max-w-[65ch] text-lg leading-relaxed text-pretty">{blurb}</p>
        ) : latest.indieAngle ? (
          <p className="max-w-[65ch] text-lg leading-relaxed text-pretty">{latest.indieAngle}</p>
        ) : null}
        <TrustMrrChart name={company.name} sources={latest.sources} />
        <div className="flex max-w-[65ch] flex-col gap-4">
          <p className="text-sm">
            <a href={editionHref(company.slug, latest.date)} className="text-link">
              <time dateTime={latest.date}>{formatEditionDate(latest.date)}</time>
            </a>
          </p>
          <div className="flex flex-col gap-1 border-l-2 border-primary py-0.5 pl-4">
            <p className="text-xs font-medium tracking-wide text-muted-foreground">
              {evidenceLabel(latest.evidenceKind)}
            </p>
            <p className="tabular-nums leading-relaxed">{latest.evidence}</p>
          </div>
          <p className="flex flex-wrap items-baseline gap-x-4 gap-y-2 text-sm">
            {company.homepage ? (
              <OutboundLink href={company.homepage}>Homepage</OutboundLink>
            ) : null}
            {latest.sources.map((source) => (
              <OutboundLink key={source.url} href={source.url}>
                {source.label}
              </OutboundLink>
            ))}
          </p>
        </div>
      </div>

      {earlier.length > 0 ? (
        <section className="flex w-full flex-col gap-8">
          <h2 className="font-serif text-3xl font-normal tracking-tight">
            Earlier notes
          </h2>
          {earlier.map((mention) => (
            <Figures key={mention.date} slug={company.slug} mention={mention} />
          ))}
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
