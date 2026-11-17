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
  | 'dodo-verified'
  | 'whop-verified'
  | 'razorpay-verified'
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
  if (kind === 'dodo-verified') return 'Dodo-verified'
  if (kind === 'whop-verified') return 'Whop-verified'
  if (kind === 'razorpay-verified') return 'Razorpay-verified'
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
  if (kind === 'dodo-verified') return 'Dodo'
  if (kind === 'whop-verified') return 'Whop'
  if (kind === 'razorpay-verified') return 'Razorpay'
  return null
}

function moneyToken(raw: string) {
  const token = raw.match(/~?\$[\d,.]+[kKmM]?/)?.[0] ?? null
  return token?.replace(/,+$/, '').replace(/\.+$/, '') ?? null
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

const MONEY_AMOUNT = String.raw`(?:[$€£]|C\$)\s?[\d,.]+(?:\s?[kKmM]\b|\s*(?:million|billion))?`
const MONEY_PREFIX = String.raw`(?:more than |over |under |about |around |roughly |up to )?`
const MONEY_PHRASE = new RegExp(
  `${MONEY_PREFIX}${MONEY_AMOUNT}(?:\\s*(?:to|–|-)\\s*${MONEY_PREFIX}${MONEY_AMOUNT})?(?:\\s+a\\s+(?:year|month))?`,
  'gi',
)
const FIGURE_MONTH =
  'January|February|March|April|May|June|July|August|September|October|November|December'

export type QuotedRevenue = {
  amounts: string[]
  asOf: string | null
  conflict: boolean
}

function evidenceSentences(text: string) {
  const parts: string[] = []
  let start = 0
  for (let i = 0; i < text.length; i++) {
    const char = text[i]
    if (char === '!' || char === '?' || (char === '.' && !isSoftPeriod(text, i))) {
      const sentence = text.slice(start, i + 1).trim()
      if (sentence) parts.push(sentence)
      start = i + 1
    }
  }
  const rest = text.slice(start).trim()
  if (rest) parts.push(rest)
  return parts
}

function skipRevenueSentence(sentence: string) {
  return /no revenue figure|no reliable revenue|no single revenue|price list|the price is the menu|not a revenue total|those prices are the menu|the prices are the menu|listed prices are a menu|not used|not clearly this company|data error|left out|listed for sale|asking price|raised |funding|valuation|valued at|series [a-c]\b|\bSAFE\b|credit facility|donations|passing through|customers' work|not [\w' ]{0,40}revenue/i.test(
    sentence,
  )
}

function cleanAmount(raw: string) {
  return raw.replace(/\s+/g, ' ').replace(/[.,]$/, '').trim()
}

function isEmptyAmount(amount: string) {
  return /(?:[$€£]|C\$)\s?0(?:\.0+)?(?:\s?[kKmM]|\s*(?:million|billion))?\b/i.test(amount)
}

function figureDate(sentence: string, amountIndex: number) {
  const dates = new RegExp(
    `\\b(\\d{1,2}\\s+(?:${FIGURE_MONTH})\\s+20\\d{2}|(?:${FIGURE_MONTH})\\s+20\\d{2}|20\\d{2})\\b`,
    'gi',
  )
  let best: { text: string; distance: number } | null = null
  for (const match of sentence.matchAll(dates)) {
    const index = match.index ?? 0
    const before = sentence.slice(Math.max(0, index - 16), index)
    if (/read|seen|synced|updated|homepage/i.test(before)) continue
    const distance = Math.abs(index - amountIndex)
    const limit = new RegExp(FIGURE_MONTH, 'i').test(match[1]) ? 120 : 40
    if (distance > limit) continue
    if (!best || distance < best.distance) best = { text: match[1], distance }
  }
  return best?.text ?? null
}

function amountContext(sentence: string, index: number) {
  const before = sentence.slice(Math.max(0, index - 24), index)
  if (/last 30 days\s*$/i.test(before)) return ' in the last 30 days'
  if (/all-time\s*$/i.test(before)) return ' all-time'
  if (/last 12 months\s*$/i.test(before)) return ' in the last 12 months'
  return ''
}

export function quotedRevenue(evidence: string): QuotedRevenue | null {
  const hits: { amount: string; asOf: string | null }[] = []
  for (const sentence of evidenceSentences(evidence)) {
    if (skipRevenueSentence(sentence)) continue
    for (const match of sentence.matchAll(MONEY_PHRASE)) {
      const amount = cleanAmount(match[0]) + amountContext(sentence, match.index ?? 0)
      if (!amount || isEmptyAmount(amount)) continue
      hits.push({
        amount,
        asOf: figureDate(sentence, match.index ?? 0),
      })
    }
  }
  if (!hits.length) return null
  const conflict =
    /not the same (?:reading|sentence|number|figure)|do not agree|does not agree|don't agree|neither is the number|estimates conflict|those conflict|they conflict|guesses do not agree/i.test(
      evidence,
    )
  if (conflict && hits.length >= 2) {
    const last = hits[hits.length - 1]
    return {
      amounts: [hits[0].amount, last.amount],
      asOf: hits[0].asOf,
      conflict: true,
    }
  }
  return { amounts: [hits[0].amount], asOf: hits[0].asOf, conflict: false }
}

function amountLead(amount: string) {
  if (/^(more than |over |under |up to )/i.test(amount)) return amount
  return `about ${amount.replace(/^(?:about |around |roughly )/i, '')}`
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

  const quoted = quotedRevenue(latest.evidence)
  let figure = ''
  if (mrr && count) figure = `${mrr} from ${count.count} ${count.label}`
  else if (mrr) figure = mrr
  else if (l30) figure = `${l30} last 30 days`
  else if (quoted) {
    figure = quoted.conflict
      ? `${quoted.amounts[0]} and ${quoted.amounts[1]}`
      : quoted.asOf
        ? `${quoted.amounts[0]}, ${quoted.asOf}`
        : quoted.amounts[0]
  } else if (count) figure = `${count.count} ${count.label}`

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

function stripApprox(token: string) {
  return token.replace(/^~/, '')
}

function howMuchAnswer(company: Company) {
  const latest = latestMention(company)
  const mrr = headlineMrr(latest.evidence)
  const count = headlineCount(latest.evidence)
  const l30 = headlineL30(latest.evidence)
  const date = formatEditionDate(latest.date)
  const quoted = quotedRevenue(latest.evidence)
  const source =
    latest.evidenceKind === 'self-reported'
      ? "That's self-reported."
      : `That figure comes through ${processorName(latest.evidenceKind)}.`

  let lead = ''
  if (mrr && count) {
    lead = `About ${stripApprox(mrr.replace(/\s*MRR$/i, ''))} a month from ${count.count} ${count.label}`
  } else if (mrr) {
    lead = `About ${stripApprox(mrr.replace(/\s*MRR$/i, ''))} a month`
  } else if (l30 && count) {
    lead = `About ${stripApprox(l30)} in the last 30 days, from ${count.count} ${count.label}`
  } else if (l30) {
    lead = `About ${stripApprox(l30)} in the last 30 days`
  } else if (quoted?.conflict) {
    const first = amountLead(quoted.amounts[0]).replace(/^./, (letter) => letter.toUpperCase())
    return `${first} and ${amountLead(quoted.amounts[1])}. Those are not the same reading. ${source}`
  } else if (quoted) {
    const asOf = quoted.asOf || date
    return `${amountLead(quoted.amounts[0]).replace(/^./, (letter) => letter.toUpperCase())}, as of ${asOf}. ${source}`
  } else if (count) {
    lead = `${count.count} ${count.label}`
  } else {
    return `The ${date} note has the figure. ${source}`
  }
  return `${lead}, as of ${date}. ${source}`
}

function legitAnswer(company: Company) {
  const latest = latestMention(company)
  const home = company.homepage
    ? "There's a public homepage linked next to it."
    : "There's no public homepage on this page."
  if (latest.evidenceKind === 'self-reported') {
    return `${company.name} is marked self-reported. So that's the founder's number, not a payment processor. ${home}`
  }
  return `${company.name} is marked ${evidenceLabel(latest.evidenceKind)}. ${processorName(latest.evidenceKind)} is connected for the figure. That isn't the same as an audit. ${home}`
}

export function companyFaq(company: Company) {
  const items = [
    {
      question: `How much does ${company.name} make?`,
      answer: howMuchAnswer(company),
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

export type CompanyPeer = { slug: string; name: string }

function escapeRegExp(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

function noteText(company: Company) {
  return [
    company.description,
    company.whyItPrints,
    company.whyThisMatters,
    ...company.mentions.flatMap((mention) => [mention.evidence, mention.indieAngle]),
  ]
    .filter(Boolean)
    .join('\n')
}

export function namedCompanyPeers(company: Company, all: Company[]): CompanyPeer[] {
  const text = noteText(company)
  const hits: { peer: CompanyPeer; index: number; length: number }[] = []
  for (const other of all) {
    if (other.slug === company.slug || other.name.length < 3) continue
    const match = new RegExp(
      `(?:^|[^A-Za-z0-9])(${escapeRegExp(other.name)})(?=$|[^A-Za-z0-9])`,
    ).exec(text)
    if (!match || match.index === undefined) continue
    hits.push({
      peer: { slug: other.slug, name: other.name },
      index: match.index + match[0].length - match[1].length,
      length: other.name.length,
    })
  }
  hits.sort((left, right) => left.index - right.index || right.length - left.length)
  const kept: CompanyPeer[] = []
  for (const hit of hits) {
    const insideLongerName = hits.some(
      (other) =>
        other.peer.slug !== hit.peer.slug &&
        other.length > hit.length &&
        hit.index >= other.index &&
        hit.index < other.index + other.length,
    )
    if (insideLongerName || kept.some((item) => item.slug === hit.peer.slug)) continue
    kept.push(hit.peer)
  }
  return kept
}

export function relatedCompanies(
  company: Company,
  all: Company[],
  _sameEditionSlugs: string[],
) {
  return namedCompanyPeers(company, all).slice(0, 3)
}

export function companyCrumbs(company: Company): Crumb[] {
  return [
    { name: 'Home', path: '/' },
    { name: 'Blog', path: '/blog' },
    { name: 'Companies', path: '/blog/companies' },
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
