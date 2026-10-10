import dayjs from 'dayjs'

import { SITE_URL } from './site'

export const PERSON_ID = `${SITE_URL}#person`

export type EvidenceKind =
  | 'stripe-verified'
  | 'creem-verified'
  | 'polar-verified'
  | 'paddle-verified'
  | 'lemon-squeezy-verified'
  | 'revenuecat-verified'
  | 'shopify-verified'
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
  if (kind === 'lemon-squeezy-verified') return 'Lemon Squeezy-verified'
  if (kind === 'revenuecat-verified') return 'RevenueCat-verified'
  if (kind === 'shopify-verified') return 'Shopify-verified'
  return 'Self-reported'
}

export function latestMention(company: Company) {
  return company.mentions[company.mentions.length - 1]
}

export function firstMention(company: Company) {
  return company.mentions[0]
}

function firstSentence(text: string) {
  const trimmed = text.trim()
  for (let i = 0; i < trimmed.length; i++) {
    const char = trimmed[i]
    if (char === '!' || char === '?') return trimmed.slice(0, i + 1).trim()
    if (char !== '.') continue
    const decimal = /\d/.test(trimmed[i - 1] || '') && /\d/.test(trimmed[i + 1] || '')
    if (!decimal) return trimmed.slice(0, i + 1).trim()
  }
  return trimmed
}

function figureClause(evidence: string) {
  const sentence = firstSentence(evidence).replace(/[.!?]+$/, '')
  return sentence.split(/,(?!\d)/)[0]?.trim() || sentence
}

function productClause(description: string) {
  const sentence = firstSentence(description).replace(/[.!?]+$/, '')
  return sentence.split(/\s+[—–]\s+|:\s+/)[0]?.trim() || sentence
}

function fitClause(text: string, room: number) {
  if (text.length <= room) return text
  const cut = text.slice(0, room).replace(/\s+\S*$/, '').trim()
  return cut || text.slice(0, room).trim()
}

export function companyMetaDescription(company: Company) {
  const latest = latestMention(company)
  const lead = `On ${formatEditionDate(latest.date)} the ${evidenceLabel(latest.evidenceKind)} figure is ${figureClause(latest.evidence)}.`
  const raw = productClause(company.description)
  const hasEnd = /[.!?]$/.test(raw)
  const budget = 160 - lead.length - 1 - (hasEnd ? 0 : 1)
  const product = budget > 24 ? fitClause(raw, budget) : raw
  const sentence = /[.!?]$/.test(product) ? product : `${product}.`
  return `${lead} ${sentence}`
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
  const hit = parts.find(
    (part) =>
      pattern.test(part) && !/\b(listed for sale|asking price|first listed)\b/i.test(part),
  )
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
