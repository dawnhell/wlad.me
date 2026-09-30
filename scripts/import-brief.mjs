import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

import sharp from 'sharp'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const contentRoot = path.join(root, 'content/blog')
const siteUrl = 'https://www.wlad.me'

function slugify(value) {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/&/g, ' and ')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

function splitHeading(raw) {
  let name = raw.trim().replace(/\s*\(update\)\s*$/i, '').trim()
  let listingNote = null
  const match = name.match(/^(.*?)\s+\((.+)\)\s*$/)
  if (match) {
    name = match[1].trim()
    listingNote = match[2].trim()
  }
  return { name, listingNote }
}

function sourceLabel(url) {
  const host = new URL(url).hostname.replace(/^www\./, '')
  if (host === 'reddit.com') return 'Reddit'
  if (host === 'getlatka.com') return 'Latka'
  if (host === 'trustmrr.com') return 'TrustMRR'
  return host
}

function parseHomepage(value) {
  const trimmed = value.trim()
  if (/^none\b/i.test(trimmed)) return null
  const match = trimmed.match(/https?:\/\/\S+/)
  if (!match) return null
  return match[0].replace(/[),.;]+$/, '')
}

function fieldValue(body, label) {
  const pattern = new RegExp(`\\*\\*${label}:\\*\\*\\s*(.+)`)
  const match = body.match(pattern)
  return match ? match[1].trim() : null
}

function parseSources(body) {
  const start = body.indexOf('**Sources:**')
  if (start === -1) return []
  const rest = body.slice(start).split('\n').slice(1)
  const sources = []
  for (const line of rest) {
    if (!line.trim()) continue
    if (!line.trim().startsWith('-')) break
    const match = line.match(/https?:\/\/\S+/)
    if (!match) continue
    const url = match[0].replace(/[),.;]+$/, '')
    sources.push({ label: sourceLabel(url), url })
  }
  return sources
}

function evidenceKindFromLabel(label) {
  if (/stripe/i.test(label)) return 'stripe-verified'
  if (/creem/i.test(label)) return 'creem-verified'
  if (/polar/i.test(label)) return 'polar-verified'
  return 'self-reported'
}

function parseMoney(body) {
  const match = body.match(/\*\*Money evidence(?: \(([^)]*)\))?:\*\*\s*(.+)/)
  if (!match) return null
  const label = match[1] || ''
  return {
    evidenceKind: evidenceKindFromLabel(label),
    evidence: match[2].trim(),
  }
}

function parseHonorable(body) {
  return body
    .split('\n')
    .map((line) => {
      const colon = line.match(/^- \*\*(.+?)\*\*:\s*(.+)$/)
      if (colon) return { name: colon[1].trim(), note: colon[2].trim() }
      const dash = line.match(/^- \*\*(.+?)\*\*\s*(?:\([^)]*\)\s*)?[—–-]\s*(.+)$/)
      if (dash) return { name: dash[1].trim(), note: dash[2].trim() }
      return null
    })
    .filter(Boolean)
}

async function compressImage(inputPath, outputPath) {
  const input = fs.readFileSync(inputPath)
  const animated = await sharp(input, { animated: true }).metadata()
  const page = animated.pages > 1 ? animated.pages - 1 : undefined
  const source = () => sharp(input, page === undefined ? undefined : { page })
  let quality = 75
  let buffer = await source()
    .rotate()
    .resize({ width: 1200, withoutEnlargement: true })
    .webp({ quality })
    .toBuffer()
  while (buffer.length > 150 * 1024 && quality > 50) {
    quality -= 5
    buffer = await source()
      .rotate()
      .resize({ width: 1200, withoutEnlargement: true })
      .webp({ quality })
      .toBuffer()
  }
  const meta = await sharp(buffer).metadata()
  fs.mkdirSync(path.dirname(outputPath), { recursive: true })
  fs.writeFileSync(outputPath, buffer)
  return {
    width: meta.width,
    height: meta.height,
    bytes: buffer.length,
    quality,
  }
}

function parseBrief(markdown, briefDir, date) {
  const chunks = markdown.split(/\n(?=## )/)
  const companies = []
  let honorableMentions = []

  for (const chunk of chunks) {
    const lines = chunk.trim().split('\n')
    const heading = lines[0].replace(/^##\s+/, '').trim()
    const body = lines.slice(1).join('\n')
    if (/^honorable mentions/i.test(heading)) {
      honorableMentions = parseHonorable(body)
      continue
    }
    const numbered = heading.match(/^\d+\.\s+(.+)$/)
    if (!numbered) continue
    const { name, listingNote } = splitHeading(numbered[1])
    const money = parseMoney(body)
    const description = fieldValue(body, 'What it is')
    if (!money || !description) {
      throw new Error(`Entry "${name}" is missing a description or money evidence`)
    }
    const imageMatch = body.match(/!\[[^\]]*]\(([^)]+)\)/)
    companies.push({
      slug: slugify(name),
      name,
      listingNote,
      description,
      evidenceKind: money.evidenceKind,
      evidence: money.evidence,
      sources: parseSources(body),
      homepage: parseHomepage(fieldValue(body, 'Homepage') || ''),
      indieAngle: fieldValue(body, 'Indie angle'),
      imageFile: imageMatch ? imageMatch[1].trim() : null,
      briefDir,
      date,
    })
  }

  return { companies, honorableMentions }
}

function editionDek(companies, formatted) {
  const counts = new Map()
  for (const company of companies) {
    counts.set(company.evidenceKind, (counts.get(company.evidenceKind) || 0) + 1)
  }
  const labels = [
    ['stripe-verified', 'Stripe-verified'],
    ['creem-verified', 'Creem-verified'],
    ['polar-verified', 'Polar-verified'],
    ['self-reported', 'self-reported'],
  ]
  const parts = labels
    .filter(([kind]) => counts.get(kind))
    .map(([kind, label]) => {
      const count = counts.get(kind)
      return `${count} ${count === 1 ? 'is' : 'are'} ${label}`
    })
  const summary =
    parts.length === 0
      ? ''
      : parts.length === 1
        ? `${parts[0]}.`
        : `${parts.slice(0, -1).join(', ')} and ${parts.at(-1)}.`
  return `Revenue notes on ${companies.length} products for ${formatted}. ${summary} Each figure links to its source.`
}

function prettyDate(isoDate) {
  return new Intl.DateTimeFormat('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(new Date(`${isoDate}T00:00:00Z`))
}

function heroIdForDate(isoDate, heroes) {
  const day = Math.floor(Date.parse(`${isoDate}T00:00:00Z`) / 86400000)
  const nature = heroes.filter((hero) => hero.subject === 'nature')
  const animals = heroes.filter((hero) => hero.subject !== 'nature')
  const pool = nature.length > 0 ? nature : animals
  return pool[day % pool.length].id
}

function readCompany(slug) {
  const filePath = path.join(contentRoot, 'companies', `${slug}.json`)
  if (!fs.existsSync(filePath)) return null
  return JSON.parse(fs.readFileSync(filePath, 'utf8'))
}

function writeCompany(company) {
  const dir = path.join(contentRoot, 'companies')
  fs.mkdirSync(dir, { recursive: true })
  fs.writeFileSync(
    path.join(dir, `${company.slug}.json`),
    `${JSON.stringify(company, null, 2)}\n`,
  )
}

function xml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

function writeSeoFiles() {
  const editionDir = path.join(contentRoot, 'editions')
  const companyDir = path.join(contentRoot, 'companies')
  const editions = fs
    .readdirSync(editionDir)
    .filter((name) => name.endsWith('.json'))
    .map((name) => JSON.parse(fs.readFileSync(path.join(editionDir, name), 'utf8')))
    .sort((a, b) => b.date.localeCompare(a.date))
  const companies = fs
    .readdirSync(companyDir)
    .filter((name) => name.endsWith('.json'))
    .map((name) => JSON.parse(fs.readFileSync(path.join(companyDir, name), 'utf8')))
    .sort((a, b) => a.name.localeCompare(b.name))
  const newest = editions[0]?.date ?? '2026-09-28'

  const urls = [
    ['https://www.wlad.me/', '2026-09-14', 'monthly', '1.0'],
    ['https://www.wlad.me/Wlad.me_CV(2026).pdf', '2026-08-25', 'yearly', '0.6'],
    [`${siteUrl}/blog`, newest, 'weekly', '0.8'],
    [`${siteUrl}/blog/about`, newest, 'monthly', '0.4'],
    ...editions.map((edition) => [
      `${siteUrl}/blog/${edition.date}`,
      edition.date,
      'monthly',
      '0.7',
    ]),
    ...companies.map((company) => [
      `${siteUrl}/blog/companies/${company.slug}`,
      company.mentions[company.mentions.length - 1].date,
      'monthly',
      '0.6',
    ]),
  ]

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    ([loc, lastmod, changefreq, priority]) => `  <url>
    <loc>${xml(loc)}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`,
  )
  .join('\n')}
</urlset>
`
  fs.writeFileSync(path.join(root, 'public/sitemap.xml'), sitemap)

  const rssItems = editions
    .map((edition) => {
      const link = `${siteUrl}/blog/${edition.date}`
      const pubDate = new Date(`${edition.date}T12:00:00Z`).toUTCString()
      return `    <item>
      <title>${xml(edition.title)}</title>
      <link>${xml(link)}</link>
      <guid isPermaLink="true">${xml(link)}</guid>
      <pubDate>${pubDate}</pubDate>
      <description>${xml(edition.dek)}</description>
    </item>`
    })
    .join('\n')

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>Boring SaaS</title>
    <link>${siteUrl}/blog</link>
    <description>Dated revenue notes on software products, written by Wlad.</description>
    <language>en</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
${rssItems}
  </channel>
</rss>
`
  fs.mkdirSync(path.join(root, 'public/blog'), { recursive: true })
  fs.writeFileSync(path.join(root, 'public/blog/rss.xml'), rss)

  const editionLines = editions
    .map(
      (edition) =>
        `- [${edition.title}](${siteUrl}/blog/${edition.date}): ${edition.dek}`,
    )
    .join('\n')
  const companyLines = companies
    .map(
      (company) =>
        `- [${company.name}](${siteUrl}/blog/companies/${company.slug}): ${company.description}`,
    )
    .join('\n')
  const llms = `# Wlad.me

> Personal site of Wlad, a senior UI engineer. Boring SaaS is a dated series of revenue notes on software products.

## Boring SaaS

- [Boring SaaS](${siteUrl}/blog): Index of editions and companies.
- [About these notes](${siteUrl}/blog/about): How Stripe-verified and self-reported labels work.

## Editions

${editionLines}

## Companies

${companyLines}
`
  fs.writeFileSync(path.join(root, 'public/llms.txt'), llms)
}

async function main() {
  const arg = process.argv[2]
  if (!arg) {
    console.error('Usage: node scripts/import-brief.mjs YYYY-MM-DD')
    process.exit(1)
  }
  const briefDir =
    arg.includes(path.sep) || arg.startsWith('~')
      ? arg.replace(/^~(?=$|\/)/, os.homedir())
      : path.join(os.homedir(), 'Documents', 'briefs', arg)
  const date = path.basename(briefDir)
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    throw new Error(`Brief folder must be named YYYY-MM-DD, got ${date}`)
  }
  const briefPath = path.join(briefDir, 'brief.md')
  const markdown = fs.readFileSync(briefPath, 'utf8')
  const heroes = JSON.parse(
    fs.readFileSync(path.join(contentRoot, 'heroes.json'), 'utf8'),
  )
  const parsed = parseBrief(markdown, briefDir, date)
  const imageDir = path.join(root, 'public/blog', date)
  const editionCompanies = []

  for (const entry of parsed.companies) {
    let image = null
    let imageAlt = null
    let imageWidth = null
    let imageHeight = null
    if (entry.imageFile) {
      const inputPath = path.join(briefDir, entry.imageFile)
      const outputPath = path.join(imageDir, `${entry.slug}.webp`)
      const compressed = await compressImage(inputPath, outputPath)
      image = `/blog/${date}/${entry.slug}.webp`
      imageAlt = `${entry.name} product image`
      imageWidth = compressed.width
      imageHeight = compressed.height
      console.log(
        `${entry.slug}.webp ${compressed.width}x${compressed.height} ${Math.round(compressed.bytes / 1024)}KB q${compressed.quality}`,
      )
    }

    const snapshot = {
      slug: entry.slug,
      name: entry.name,
      listingNote: entry.listingNote,
      description: entry.description,
      evidenceKind: entry.evidenceKind,
      evidence: entry.evidence,
      sources: entry.sources,
      homepage: entry.homepage,
      indieAngle: entry.indieAngle,
      image,
      imageAlt,
      imageWidth,
      imageHeight,
    }
    editionCompanies.push(snapshot)

    const existing = readCompany(entry.slug)
    const mention = {
      date,
      evidenceKind: entry.evidenceKind,
      evidence: entry.evidence,
      sources: entry.sources,
      indieAngle: entry.indieAngle,
    }
    const company = existing ?? {
      slug: entry.slug,
      name: entry.name,
      listingNote: entry.listingNote,
      description: entry.description,
      homepage: entry.homepage,
      image: null,
      imageAlt: null,
      imageWidth: null,
      imageHeight: null,
      mentions: [],
    }
    company.name = entry.name
    company.listingNote = entry.listingNote
    company.description = entry.description
    if (entry.homepage) company.homepage = entry.homepage
    if (image) {
      company.image = image
      company.imageAlt = imageAlt
      company.imageWidth = imageWidth
      company.imageHeight = imageHeight
    }
    company.mentions = company.mentions.filter((item) => item.date !== date)
    company.mentions.push(mention)
    company.mentions.sort((a, b) => a.date.localeCompare(b.date))
    writeCompany(company)
  }

  const formatted = prettyDate(date)
  const edition = {
    date,
    title: `Boring SaaS ideas for ${formatted}`,
    dek: editionDek(editionCompanies, formatted),
    heroId: heroIdForDate(date, heroes),
    companies: editionCompanies,
    honorableMentions: parsed.honorableMentions,
  }
  const editionDir = path.join(contentRoot, 'editions')
  fs.mkdirSync(editionDir, { recursive: true })
  fs.writeFileSync(
    path.join(editionDir, `${date}.json`),
    `${JSON.stringify(edition, null, 2)}\n`,
  )
  writeSeoFiles()
  console.log(`Imported ${date} with hero ${edition.heroId}`)
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
