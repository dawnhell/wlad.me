import dayjs from 'dayjs'

import { SITE_URL } from './site'

export const PERSON_ID = `${SITE_URL}#person`

export type EvidenceKind =
  | 'stripe-verified'
  | 'creem-verified'
  | 'polar-verified'
  | 'paddle-verified'
  | 'self-reported'

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
  whyItPrints: string | null
  image: string | null
  imageAlt: string | null
  imageWidth: number | null
  imageHeight: number | null
}

export type HonorableMention = {
  name: string
  note: string
  homepage?: string | null
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
  whyItPrints: string | null
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
  if (kind === 'stripe-verified') return 'Stripe-verified'
  if (kind === 'creem-verified') return 'Creem-verified'
  if (kind === 'polar-verified') return 'Polar-verified'
  if (kind === 'paddle-verified') return 'Paddle-verified'
  return 'Self-reported'
}

export function latestMention(company: Company) {
  return company.mentions[company.mentions.length - 1]
}

export function samePage(left: string, right: string) {
  try {
    const a = new URL(left)
    const b = new URL(right)
    const host = (value: string) => value.replace(/^www\./, '')
    const pathName = (value: string) => value.replace(/\/+$/, '') || '/'
    return host(a.hostname) === host(b.hostname) && pathName(a.pathname) === pathName(b.pathname)
  } catch {
    return false
  }
}

export function linkedSources(homepage: string | null, sources: BlogSource[]) {
  if (!homepage) return sources
  return sources.filter((source) => !samePage(source.url, homepage))
}

function sentenceWith(text: string, pattern: RegExp) {
  const parts = text.split(/(?<=[.!?])\s+/).filter(Boolean)
  if (parts.length < 2) return null
  const hit = parts.find((part) => pattern.test(part))
  if (!hit || hit === text) return null
  return hit
}

export function priceLine(description: string) {
  return sentenceWith(description, /[$€£]|\bper month\b|\/mo\b|\bcommission\b/i)
}

export function companyFaq(company: Company) {
  const latest = latestMention(company)
  const items = [
    {
      question: `What revenue was recorded for ${company.name}?`,
      answer: `On ${formatEditionDate(latest.date)} it is labeled ${evidenceLabel(latest.evidenceKind)}. ${latest.evidence}`,
    },
  ]
  const price =
    priceLine(company.description) ??
    sentenceWith(
      latest.evidence,
      /\bper (month|year|company|seat|domain|user)\b|\/mo\b|\/yr\b|\bcommission\b|\bpricing\b|\ba month\b|\ba year\b/i,
    )
  if (price) {
    items.push({
      question: `What does ${company.name} cost?`,
      answer: price,
    })
  }
  return items
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
