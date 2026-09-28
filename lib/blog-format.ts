import dayjs from 'dayjs'

import { SITE_URL } from './site'

export const PERSON_ID = `${SITE_URL}#person`

export type EvidenceKind = 'stripe-verified' | 'self-reported'

export type BlogSource = {
  label: string
  url: string
}

export type EditionCompany = {
  slug: string
  name: string
  listingNote: string | null
  description: string
  evidenceKind: EvidenceKind
  evidence: string
  sources: BlogSource[]
  homepage: string | null
  indieAngle: string | null
  image: string | null
  imageAlt: string | null
  imageWidth: number | null
  imageHeight: number | null
}

export type HonorableMention = {
  name: string
  note: string
}

export type Hero = {
  id: string
  src: string
  alt: string
  width: number
  height: number
  credit: string
  creditUrl: string
  license: string
  subject?: 'nature' | 'animal'
}

export type Edition = {
  date: string
  title: string
  dek: string
  heroId: string
  companies: EditionCompany[]
  honorableMentions: HonorableMention[]
}

export type CompanyMention = {
  date: string
  evidenceKind: EvidenceKind
  evidence: string
  sources: BlogSource[]
  indieAngle: string | null
}

export type Company = {
  slug: string
  name: string
  listingNote: string | null
  description: string
  homepage: string | null
  image: string | null
  imageAlt: string | null
  imageWidth: number | null
  imageHeight: number | null
  mentions: CompanyMention[]
}

export type Crumb = {
  name: string
  path: string
}

export function formatEditionDate(isoDate: string) {
  return dayjs(isoDate).format('D MMMM YYYY')
}

export function evidenceLabel(kind: EvidenceKind) {
  return kind === 'stripe-verified' ? 'Stripe-verified' : 'Self-reported'
}

export function latestMention(company: Company) {
  return company.mentions[company.mentions.length - 1]
}

export function trustMrrEmbedUrl(sources: BlogSource[]) {
  for (const source of sources) {
    let url: URL
    try {
      url = new URL(source.url)
    } catch {
      continue
    }
    if (url.hostname !== 'trustmrr.com' && url.hostname !== 'www.trustmrr.com') {
      continue
    }
    const match = url.pathname.match(/^\/startup\/([^/]+)\/?$/)
    if (!match) continue
    return `https://trustmrr.com/embed/${match[1]}`
  }
  return null
}
