import type { CompanyIndexCard } from '../../lib/company-index'

const CompanyRoll = ({
  companies,
  showCount = false,
}: {
  companies: CompanyIndexCard[]
  showCount?: boolean
}) => {
  return (
    <ul className="grid gap-2 sm:grid-cols-2">
      {companies.map((company) => (
        <li key={company.slug}>
          <a
            href={`/blog/companies/${company.slug}`}
            className="flex min-h-11 flex-col gap-1 rounded-lg p-3 fine-hover:bg-muted"
          >
            <span className="font-medium">{company.name}</span>
            <span className="text-sm text-muted-foreground">
              {company.evidenceLabel}
              <span aria-hidden> · </span>
              <time dateTime={company.latestDate}>{company.latestDateLabel}</time>
              {showCount ? (
                <>
                  <span aria-hidden> · </span>
                  {company.mentionCount} notes
                </>
              ) : null}
            </span>
            {company.line ? (
              <span className="text-sm leading-relaxed text-muted-foreground">{company.line}</span>
            ) : null}
          </a>
        </li>
      ))}
    </ul>
  )
}

export default CompanyRoll
