'use client'

import { useState } from 'react'

import type { CompanyIndexCard, EvidenceGroup } from '../../lib/company-index'
import CompanyRoll from './CompanyRoll'

function matches(company: CompanyIndexCard, query: string) {
  if (!query) return true
  const haystack = [company.name, company.description, company.listingNote ?? '']
    .join('\n')
    .toLowerCase()
  return haystack.includes(query)
}

const CompanyDirectory = ({ groups }: { groups: EvidenceGroup[] }) => {
  const [query, setQuery] = useState('')
  const needle = query.trim().toLowerCase()
  const visible = groups
    .map((group) => ({
      ...group,
      companies: group.companies.filter((company) => matches(company, needle)),
    }))
    .filter((group) => group.companies.length > 0)
  const total = visible.reduce((sum, group) => sum + group.companies.length, 0)

  return (
    <div className="flex w-full flex-col gap-8">
      <div className="flex max-w-[65ch] flex-col gap-4">
        <label className="flex flex-col gap-2 text-sm" htmlFor="company-search">
          <span className="text-muted-foreground">Search</span>
          <input
            id="company-search"
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Name or what they sell"
            className="min-h-11 rounded-lg border border-border bg-card px-3 text-base text-foreground outline-none focus-visible:ring-2 focus-visible:ring-ring"
          />
        </label>
        {needle ? null : (
          <p className="flex flex-wrap gap-4 text-sm">
            {groups.map((group) => (
              <a key={group.id} href={`#${group.id}`} className="text-link">
                {group.title}
              </a>
            ))}
          </p>
        )}
      </div>

      {total === 0 ? (
        <p className="text-muted-foreground">Nothing under that.</p>
      ) : (
        visible.map((group) => (
          <section key={group.id} id={group.id} className="flex scroll-mt-8 flex-col gap-4">
            <h2 className="font-serif text-2xl font-normal">{group.title}</h2>
            <CompanyRoll companies={group.companies} />
          </section>
        ))
      )}
    </div>
  )
}

export default CompanyDirectory
