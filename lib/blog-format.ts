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
  whyThisMatters: string | null
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

function isSoftPeriod(text: string, index: number) {
  const prev = text[index - 1] || ''
  const next = text[index + 1] || ''
  if (/\d/.test(prev) && /\d/.test(next)) return true
  if (/^(js|ts|css|store|com|io|dev|app|so|co|ai|net|org)\b/i.test(text.slice(index + 1))) {
    return true
  }
  return /\b(?:incl|etc|vs|mr|st|jr|dr|e\.g|i\.e)$/i.test(text.slice(0, index))
}

function firstSentence(text: string) {
  const trimmed = text.trim()
  for (let i = 0; i < trimmed.length; i++) {
    const char = trimmed[i]
    if (char === '!' || char === '?') return trimmed.slice(0, i + 1).trim()
    if (char !== '.' || isSoftPeriod(trimmed, i)) continue
    return trimmed.slice(0, i + 1).trim()
  }
  return trimmed
}

function productClause(description: string) {
  const sentence = firstSentence(description).replace(/[.!?]+$/, '')
  return sentence.split(/\s+[—–]\s+|:\s+|;\s+/)[0]?.trim() || sentence
}

function processorName(kind: EvidenceKind) {
  if (kind === 'stripe-verified') return 'Stripe'
  if (kind === 'creem-verified') return 'Creem'
  if (kind === 'polar-verified') return 'Polar'
  if (kind === 'paddle-verified') return 'Paddle'
  if (kind === 'lemon-squeezy-verified') return 'Lemon Squeezy'
  if (kind === 'revenuecat-verified') return 'RevenueCat'
  if (kind === 'shopify-verified') return 'Shopify'
  return null
}

function moneyToken(raw: string) {
  return raw.match(/~?\$[\d,.]+[kKmM]?/)?.[0] ?? null
}

function isZeroMoney(token: string) {
  return /^~?\$0(?:\.0+)?[kKmM]?$/.test(token)
}

function headlineMrr(evidence: string) {
  const match = evidence.match(/~?\$[\d,.]+[kKmM]?\s*MRR|MRR\s+~?\$[\d,.]+[kKmM]?/i)
  if (!match) return null
  const token = moneyToken(match[0])
  if (!token || isZeroMoney(token)) return null
  return `${token} MRR`
}

function headlineCount(evidence: string) {
  const sub = evidence.match(
    /([\d,.]+[kKmM]?)\s+active subscriptions|([\d,.]+[kKmM]?)\s+subs\b|([\d,.]+[kKmM]?)\s+paying orgs/i,
  )
  if (sub) {
    const count = sub[1] || sub[2] || sub[3]
    if (count && count !== '0') {
      return {
        count,
        label: /paying orgs/i.test(sub[0]) ? 'paying orgs' : 'subscriptions',
      }
    }
  }
  const users = evidence.match(/([\d,.]+[kKmM]?)\s+users\b/i)
  if (users?.[1] && users[1] !== '0') return { count: users[1], label: 'users' }
  return null
}

function headlineL30(evidence: string) {
  const match = evidence.match(
    /~?\$[\d,.]+[kKmM]?(?:\s*[–-]\s*~?\$[\d,.]+[kKmM]?)?\s*L30/,
  )
  if (!match) return null
  const token = moneyToken(match[0])
  if (!token || isZeroMoney(token)) return null
  return token
}

function shortProduct(description: string) {
  let raw = productClause(description).replace(/[.!?]+$/, '')
  raw = raw.replace(/^TrustMRR lists it as\s+[“"](.+?)[”"]$/i, '$1')
  raw = raw.replace(
    /~?[$€£][\d,.]+[kKmM]?(?:\s*[–—-]\s*~?[$€£]?[\d,.]+[kKmM]?)?\+?(?:\s*\/\s*[A-Za-z]+)?/g,
    '',
  )
  raw = raw.replace(/\b\d+(?:\.\d+)?%\s*\+?/g, '')
  raw = raw.replace(/\s{2,}/g, ' ')
  raw = raw.replace(/\b(?:from|at|around|about)\s*$/i, '')
  raw = raw.replace(/^[,–—+\s]+|[,–—+\s]+$/g, '').trim()
  raw = raw.replace(/^["“]|["”]$/g, '')
  if ((raw.match(/\(/g) || []).length !== (raw.match(/\)/g) || []).length) {
    raw = raw.replace(/\s*\([^)]*$/, '').trim()
  }
  if (!raw || /[$€£]/.test(raw)) return ''
  return raw
}

export function companyMetaDescription(company: Company) {
  const latest = latestMention(company)
  const mrr = headlineMrr(latest.evidence)
  const count = headlineCount(latest.evidence)
  const l30 = headlineL30(latest.evidence)
  const verified =
    latest.evidenceKind === 'self-reported'
      ? 'Self-reported numbers.'
      : `Verified numbers from ${processorName(latest.evidenceKind)}.`

  let figure = ''
  if (mrr && count) figure = `${mrr} from ${count.count} ${count.label}`
  else if (mrr) figure = mrr
  else if (l30) figure = `${l30} last 30 days`
  else if (count) figure = `${count.count} ${count.label}`

  const prefix = figure
    ? `${company.name} revenue breakdown: ${figure}`
    : `${company.name} revenue breakdown`
  const joiner = figure ? ', ' : ': '
  const room = 155 - prefix.length - joiner.length - 2 - verified.length
  let product = shortProduct(company.description)
  if (product.length > room) {
    product = product.replace(/\s*\([^)]*\)\s*$/, '').trim()
  }
  if (!product || product.length > room || product.toLowerCase() === company.name.toLowerCase()) {
    product = ''
  }

  const description = product
    ? `${prefix}${joiner}${product}. ${verified}`
    : `${prefix}. ${verified}`
  return description.replace(/\s+/g, ' ').trim()
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

function cutStackSentence(raw: string) {
  let end = raw.length
  for (let i = 0; i < raw.length; i++) {
    if (raw[i] !== '.') continue
    if (/^(js|ts|css)/i.test(raw.slice(i + 1, i + 4))) continue
    end = i
    break
  }
  const clause = raw.slice(0, end).trim().replace(/[,;]\s*$/, '')
  if (!clause || clause.length < 3 || /[$€£]|MRR|ARR/i.test(clause)) return null
  return clause
}

export function stackClause(company: Company) {
  const sources = [company.description, company.whyThisMatters ?? '']
  for (const text of sources) {
    const labeled = text.match(/Stack(?:\s+on the public profile)?:\s*([\s\S]+)/i)
    if (labeled) {
      const clause = cutStackSentence(labeled[1])
      if (clause) return clause
    }
    const named = text.match(/homepage (?:names|lists) the stack as ([^.]+)/i)
    if (named) {
      const clause = named[1].trim().replace(/[,;]\s*$/, '')
      if (clause && !/[$€£]|MRR|ARR/i.test(clause)) return clause
    }
    const paren = text.match(/stack\s*\(([^)]+)\)/i)
    if (paren && !/[$€£]|MRR|ARR/i.test(paren[1])) return paren[1].trim()
  }
  return null
}

function legitAnswer(company: Company) {
  const latest = latestMention(company)
  const home = company.homepage
    ? 'A public homepage is linked beside the figure.'
    : 'No public homepage is listed on this page.'
  if (latest.evidenceKind === 'self-reported') {
    return `${company.name} is labeled self-reported. That is the founder's account, not a payment-processor connection. ${home}`
  }
  return `${company.name} is labeled ${evidenceLabel(latest.evidenceKind)}. That means ${processorName(latest.evidenceKind)} is the connected source of the figure, not an audit of the company. ${home}`
}

export function companyFaq(company: Company) {
  const latest = latestMention(company)
  const items = [
    {
      question: `How much does ${company.name} make?`,
      answer: `The ${formatEditionDate(latest.date)} note labels the figure ${evidenceLabel(latest.evidenceKind)}. The amount is in that revenue block and is not restated in this answer.`,
    },
    {
      question: `Is ${company.name} legit?`,
      answer: legitAnswer(company),
    },
  ]
  const stack = stackClause(company)
  if (stack) {
    items.push({
      question: `What stack does ${company.name} use?`,
      answer: `${company.name} lists ${stack}.`,
    })
  }
  return items
}

const RELATED_STOP = new Set([
  'the', 'and', 'for', 'with', 'that', 'this', 'from', 'are', 'was', 'its',
  'their', 'your', 'you', 'not', 'per', 'via', 'into', 'over', 'than', 'then',
  'them', 'they', 'have', 'has', 'had', 'but', 'about', 'after', 'before',
  'between', 'when', 'what', 'which', 'who', 'how', 'all', 'one', 'our', 'out',
  'can', 'will', 'just', 'more', 'other', 'also', 'only', 'still', 'each',
  'both', 'any', 'some', 'such', 'using', 'used', 'use', 'app', 'saas',
  'software', 'product', 'products', 'company', 'companies', 'founded',
  'stack', 'public', 'profile', 'stripe', 'verified', 'month', 'pricing',
  'model', 'audience', 'bootstrapped', 'team', 'users', 'based', 'been',
  'were', 'tool', 'tools', 'platform', 'service', 'services', 'online',
  'business', 'customer', 'customers', 'his', 'her', 'new', 'get', 'pay',
  'paid', 'pays', 'without', 'within', 'across', 'where', 'while', 'there',
])

function descriptionTokens(company: Company) {
  return new Set(
    `${company.name} ${company.description}`
      .toLowerCase()
      .split(/[^a-z0-9+]+/)
      .filter((token) => token.length > 2 && !RELATED_STOP.has(token) && !/^\d+$/.test(token)),
  )
}

export function relatedCompanies(
  company: Company,
  all: Company[],
  sameEditionSlugs: string[],
) {
  const docs = all.map((item) => ({ item, tokens: descriptionTokens(item) }))
  const frequency = new Map<string, number>()
  for (const doc of docs) {
    for (const token of doc.tokens) {
      frequency.set(token, (frequency.get(token) ?? 0) + 1)
    }
  }
  const ceiling = Math.ceil(all.length * 0.25)
  const rare = (tokens: Set<string>) =>
    new Set([...tokens].filter((token) => (frequency.get(token) ?? 0) <= ceiling))
  const mine = rare(descriptionTokens(company))
  const scored = docs
    .filter((doc) => doc.item.slug !== company.slug)
    .map((doc) => {
      let score = 0
      for (const token of rare(doc.tokens)) if (mine.has(token)) score += 1
      return { slug: doc.item.slug, name: doc.item.name, score }
    })
    .filter((item) => item.score >= 2)
    .sort((a, b) => b.score - a.score || a.name.localeCompare(b.name))
  if (scored.length >= 2) {
    return scored.slice(0, 3).map(({ slug, name }) => ({ slug, name }))
  }
  const bySlug = new Map(all.map((item) => [item.slug, item]))
  return sameEditionSlugs
    .filter((slug) => slug !== company.slug && bySlug.has(slug))
    .slice(0, 3)
    .map((slug) => {
      const item = bySlug.get(slug)!
      return { slug: item.slug, name: item.name }
    })
}

export function companyCrumbs(company: Company): Crumb[] {
  return [
    { name: 'Home', path: '/' },
    { name: 'Blog', path: '/blog' },
    { name: 'Companies', path: '/blog#companies' },
    { name: company.name, path: `/blog/companies/${company.slug}` },
  ]
}

export function editionCrumbs(date: string): Crumb[] {
  return [
    { name: 'Home', path: '/' },
    { name: 'Blog', path: '/blog' },
    { name: formatEditionDate(date), path: `/blog/${date}` },
  ]
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
