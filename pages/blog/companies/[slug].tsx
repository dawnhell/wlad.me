import Image from 'next/image'
import type { ReactElement } from 'react'

import Breadcrumbs from '../../../components/blog/Breadcrumbs'
import OutboundLink from '../../../components/blog/OutboundLink'
import TrustMrrChart from '../../../components/blog/TrustMrrChart'
import Layout from '../../../components/Layout'
import blurbs from '../../../content/blog/blurbs.json'
import {
  companyCrumbs,
  companyFaq,
  companyMetaDescription,
  evidenceLabel,
  firstMention,
  formatEditionDate,
  latestMention,
  linkedSources,
  priceLine,
  relatedCompanies,
  type Company,
  type CompanyMention,
} from '../../../lib/blog-format'
import { articleSchema, breadcrumbSchema, faqSchema } from '../../../lib/blog-schema'
import type { tNextPageWithLayout } from '../../_app'

const notes = blurbs as Record<string, string>

const editionHref = (slug: string, date: string) => `/blog/${date}#${slug}`

const Figures = ({
  slug,
  mention,
  homepage,
}: {
  slug: string
  mention: CompanyMention
  homepage: string | null
}) => {
  const sources = linkedSources(homepage, mention.sources)
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
      {sources.length > 0 ? (
        <p className="flex flex-wrap items-baseline gap-x-4 gap-y-2 text-sm">
          {sources.map((source) => (
            <OutboundLink key={source.url} href={source.url}>
              {source.label}
            </OutboundLink>
          ))}
        </p>
      ) : null}
    </div>
  )
}

type CompanyPeer = { slug: string; name: string }

const CompanyPage: tNextPageWithLayout<{
  company: Company
  related: CompanyPeer[]
}> = ({ company, related }) => {
  const latest = latestMention(company)
  const earlier = company.mentions.slice(0, -1).reverse()
  const blurb = notes[company.slug]
  const price = priceLine(company.description)
  const about = price
    ? company.description.replace(price, '').replace(/\s{2,}/g, ' ').trim()
    : company.description
  const sources = linkedSources(company.homepage, latest.sources)
  const faq = companyFaq(company)

  return (
    <article className="mx-auto flex w-full max-w-3xl flex-col gap-10">
      <Breadcrumbs crumbs={companyCrumbs(company)} />

      <div className="flex w-full flex-col gap-5">
        <header className="flex w-full flex-col gap-2">
          <h1 className="font-serif text-4xl font-normal tracking-tight text-balance md:text-5xl">
            {company.name}
          </h1>
          {company.listingNote ? (
            <p className="text-sm text-muted-foreground">{company.listingNote}</p>
          ) : null}
        </header>

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
            {sources.map((source) => (
              <OutboundLink key={source.url} href={source.url}>
                {source.label}
              </OutboundLink>
            ))}
          </p>
        </div>

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

        {about ? (
          <p className="max-w-[65ch] leading-relaxed text-pretty">{about}</p>
        ) : null}
        {company.whyItPrints ? (
          <p className="max-w-[65ch] leading-relaxed text-pretty">{company.whyItPrints}</p>
        ) : null}
        {price ? (
          <p className="max-w-[65ch] leading-relaxed text-pretty">{price}</p>
        ) : null}
        {blurb ? (
          <p className="max-w-[65ch] text-lg leading-relaxed text-pretty">{blurb}</p>
        ) : null}
        {latest.indieAngle ? (
          <p className="max-w-[65ch] leading-relaxed text-pretty">{latest.indieAngle}</p>
        ) : null}
        <TrustMrrChart name={company.name} sources={latest.sources} />
      </div>

      {company.whyThisMatters ? (
        <section className="flex w-full max-w-[65ch] flex-col gap-4">
          <h2 className="font-serif text-3xl font-normal tracking-tight">
            Why this matters
          </h2>
          {company.whyThisMatters.split(/\n\n+/).map((paragraph, index) => (
            <p key={index} className="leading-relaxed text-pretty">
              {paragraph}
            </p>
          ))}
        </section>
      ) : null}

      {related.length > 0 ? (
        <section className="flex w-full flex-col gap-3">
          <h2 className="font-serif text-3xl font-normal tracking-tight">
            Related notes
          </h2>
          <p className="flex max-w-[65ch] flex-wrap gap-x-4 gap-y-2 text-sm">
            {related.map((peer) => (
              <a key={peer.slug} href={`/blog/companies/${peer.slug}`} className="text-link">
                {peer.name}
              </a>
            ))}
          </p>
        </section>
      ) : null}

      {earlier.length > 0 ? (
        <section className="flex w-full flex-col gap-8">
          <h2 className="font-serif text-3xl font-normal tracking-tight">
            Earlier notes
          </h2>
          {earlier.map((mention) => (
            <Figures
              key={mention.date}
              slug={company.slug}
              mention={mention}
              homepage={company.homepage}
            />
          ))}
        </section>
      ) : null}

      <section className="flex w-full max-w-[65ch] flex-col gap-6">
        <h2 className="font-serif text-3xl font-normal tracking-tight">Questions</h2>
        {faq.map((item) => (
          <div key={item.question} className="flex flex-col gap-2">
            <h3 className="font-serif text-xl font-normal">{item.question}</h3>
            <p className="leading-relaxed text-pretty">{item.answer}</p>
          </div>
        ))}
      </section>
    </article>
  )
}

CompanyPage.getLayout = function getLayout(
  page: ReactElement,
  pageProps: { company: Company },
) {
  const company = pageProps.company
  const latest = latestMention(company)
  const first = firstMention(company)
  const crumbs = companyCrumbs(company)
  const description = companyMetaDescription(company)
  const headline =
    latest.evidenceKind === 'self-reported'
      ? `${company.name} revenue notes`
      : `${company.name} verified revenue`
  return (
    <Layout
      title={`${headline} | Boring SaaS`}
      description={description}
      image={company.image || '/circle_me.jpg'}
      mainAlign="start"
      ogType="article"
      publishedTime={`${first.date}T00:00:00Z`}
      rss
      extraStructuredData={[
        articleSchema({
          headline,
          description,
          path: `/blog/companies/${company.slug}`,
          date: first.date,
          dateModified: latest.date,
          image: company.image,
        }),
        breadcrumbSchema(crumbs),
        faqSchema(companyFaq(company)),
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
  const { getCompanies, getCompany, getEdition } = await import('../../../lib/blog')
  const company = getCompany(params.slug)
  if (!company) return { notFound: true }
  const latest = latestMention(company)
  const edition = getEdition(latest.date)
  const related = relatedCompanies(
    company,
    getCompanies(),
    (edition?.companies ?? []).map((entry) => entry.slug),
  )
  return { props: { company, related } }
}
