import Image from 'next/image'

import blurbs from '../../content/blog/blurbs.json'
import { evidenceLabel, linkedSources, type EditionCompany } from '../../lib/blog-format'
import OutboundLink from './OutboundLink'
import TrustMrrChart from './TrustMrrChart'

const notes = blurbs as Record<string, string>

const CompanyCard = ({
  company,
  index,
}: {
  company: EditionCompany
  index: number
}) => {
  const blurb = notes[company.slug]
  const number = String(index + 1).padStart(2, '0')

  return (
    <section
      id={company.slug}
      className="flex w-full scroll-mt-8 flex-col gap-5 pt-12"
    >
      <div className="flex items-baseline justify-between gap-4">
        <h2 className="font-serif text-3xl font-normal tracking-tight text-balance">
          <a
            href={`/blog/companies/${company.slug}`}
            className="transition-colors duration-150 [transition-timing-function:var(--ease-out)] fine-hover:text-primary"
          >
            {company.name}
          </a>
        </h2>
        <span className="text-sm tabular-nums text-muted-foreground">{number}</span>
      </div>

      {company.listingNote ? (
        <p className="-mt-3 text-sm text-muted-foreground">{company.listingNote}</p>
      ) : null}
      <p className="-mt-2 text-sm text-muted-foreground">{company.description}</p>

      {company.image ? (
        <figure className="overflow-hidden rounded-2xl">
          <Image
            src={company.image}
            alt={company.imageAlt || company.name}
            width={company.imageWidth || 1200}
            height={company.imageHeight || 630}
            sizes="(min-width: 768px) 736px, 100vw"
            className="h-auto w-full"
          />
        </figure>
      ) : null}

      <div className="flex max-w-[65ch] flex-col gap-4">
        {blurb ? (
          <p className="text-lg leading-relaxed text-pretty">{blurb}</p>
        ) : company.indieAngle ? (
          <p className="text-lg leading-relaxed text-pretty">{company.indieAngle}</p>
        ) : null}
        <TrustMrrChart name={company.name} sources={company.sources} size="compact" />
        <div className="flex flex-col gap-1 border-l-2 border-primary py-0.5 pl-4">
          <p className="text-xs font-medium tracking-wide text-muted-foreground">
            {evidenceLabel(company.evidenceKind)}
          </p>
          <p className="tabular-nums leading-relaxed">{company.evidence}</p>
        </div>
        <p className="flex flex-wrap items-baseline gap-x-4 gap-y-2 text-sm">
          {company.homepage ? (
            <OutboundLink href={company.homepage}>Homepage</OutboundLink>
          ) : null}
          {linkedSources(company.homepage, company.sources).map((source) => (
            <OutboundLink key={source.url} href={source.url}>
              {source.label}
            </OutboundLink>
          ))}
        </p>
      </div>
    </section>
  )
}

export default CompanyCard
