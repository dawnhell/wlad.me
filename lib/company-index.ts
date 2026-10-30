import {
  evidenceLabel,
  formatEditionDate,
  latestMention,
  type Company,
  type EvidenceKind,
} from './blog-format'
import { isListedForSale } from './listed-for-sale.mjs'

export type CompanyIndexCard = {
  slug: string
  name: string
  line: string
  description: string
  listingNote: string | null
  evidenceKind: EvidenceKind
  evidenceLabel: string
  latestDate: string
  latestDateLabel: string
  mentionCount: number
}

export type EvidenceGroup = {
  id: 'stripe-verified' | 'self-reported' | 'other-processors'
  title: string
  companies: CompanyIndexCard[]
}

const GROUPS: { id: EvidenceGroup['id']; title: string; kinds: EvidenceKind[] | null }[] = [
  { id: 'stripe-verified', title: 'Stripe-verified', kinds: ['stripe-verified'] },
  { id: 'self-reported', title: 'Self-reported', kinds: ['self-reported'] },
  { id: 'other-processors', title: 'Other payment companies', kinds: null },
]

function openingLine(description: string) {
  const trimmed = description.replace(/\s+/g, ' ').trim()
  if (trimmed.length <= 180) return trimmed
  const cut = trimmed.slice(0, 177)
  const space = cut.lastIndexOf(' ')
  return `${(space > 100 ? cut.slice(0, space) : cut).trim()}…`
}

function companyParts(company: Company) {
  return [
    company.description,
    company.whyItPrints,
    company.whyThisMatters,
    company.listingNote,
    ...company.mentions.flatMap((mention) => [mention.evidence, mention.indieAngle]),
  ].filter((part): part is string => Boolean(part))
}

export function toCompanyCard(company: Company): CompanyIndexCard {
  const latest = latestMention(company)
  return {
    slug: company.slug,
    name: company.name,
    line: openingLine(company.description),
    description: company.description,
    listingNote: company.listingNote,
    evidenceKind: latest.evidenceKind,
    evidenceLabel: evidenceLabel(latest.evidenceKind),
    latestDate: latest.date,
    latestDateLabel: formatEditionDate(latest.date),
    mentionCount: company.mentions.length,
  }
}

function byName(a: CompanyIndexCard, b: CompanyIndexCard) {
  return a.name.localeCompare(b.name)
}

function byLatestDate(a: CompanyIndexCard, b: CompanyIndexCard) {
  return b.latestDate.localeCompare(a.latestDate) || a.name.localeCompare(b.name)
}

export function companyCards(companies: Company[]) {
  return companies.map(toCompanyCard).sort(byName)
}

function inGroup(card: CompanyIndexCard, kinds: EvidenceKind[] | null) {
  if (kinds) return kinds.includes(card.evidenceKind)
  return card.evidenceKind !== 'stripe-verified' && card.evidenceKind !== 'self-reported'
}

export function evidenceGroups(cards: CompanyIndexCard[]): EvidenceGroup[] {
  return GROUPS.map((group) => ({
    id: group.id,
    title: group.title,
    companies: cards.filter((card) => inGroup(card, group.kinds)),
  })).filter((group) => group.companies.length > 0)
}

export function forSaleCards(companies: Company[]) {
  return companies
    .filter((company) => isListedForSale(companyParts(company)))
    .map(toCompanyCard)
    .sort(byLatestDate)
}

export function againCards(companies: Company[]) {
  return companies
    .filter((company) => company.mentions.length > 1)
    .map(toCompanyCard)
    .sort(byLatestDate)
}
