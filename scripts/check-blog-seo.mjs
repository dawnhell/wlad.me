import fs from 'fs'
import path from 'path'
import { pathToFileURL } from 'url'

import ts from 'typescript'

const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..')
const contentRoot = path.join(root, 'content/blog')

function compileBlogFormat() {
  const cacheDir = path.join(root, 'node_modules/.cache/blog-seo-check')
  fs.mkdirSync(cacheDir, { recursive: true })
  for (const name of ['site.ts', 'blog-format.ts']) {
    const sourcePath = path.join(root, 'lib', name)
    const source = fs.readFileSync(sourcePath, 'utf8')
    const js = ts.transpileModule(source, {
      compilerOptions: {
        module: ts.ModuleKind.ESNext,
        target: ts.ScriptTarget.ES2022,
      },
      fileName: sourcePath,
    }).outputText.replaceAll("from './site'", "from './site.js'")
    fs.writeFileSync(path.join(cacheDir, name.replace(/\.ts$/, '.js')), js)
  }
  return import(pathToFileURL(path.join(cacheDir, 'blog-format.js')).href)
}

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, 'utf8'))
}

function words(value) {
  return String(value || '')
    .trim()
    .split(/\s+/)
    .filter(Boolean).length
}

function sentences(value) {
  return String(value || '')
    .split(/(?<=[.!?])\s+/)
    .map((sentence) => sentence.trim())
    .filter((sentence) => sentence.length >= 40)
}

const moneyInFaq = /[$€£]|\bMRR\b|\bARR\b/

function proseWords(company, blurb, faq) {
  const latest = company.mentions[company.mentions.length - 1]
  return words(
    [
      company.description,
      company.whyItPrints,
      blurb,
      latest?.indieAngle,
      company.whyThisMatters,
      ...faq.map((item) => item.answer),
    ]
      .filter(Boolean)
      .join(' '),
  )
}

const blog = await compileBlogFormat()
const failures = []

function fail(message) {
  failures.push(message)
}

const siteJs = await import(
  pathToFileURL(path.join(root, 'node_modules/.cache/blog-seo-check/site.js')).href
)
if (siteJs.canonicalPath('/blog/2026-10-10#tally') !== '/blog/2026-10-10') {
  fail('canonicalPath did not strip a hash')
}
if (siteJs.canonicalPath('/blog/companies/tally?x=1') !== '/blog/companies/tally') {
  fail('canonicalPath did not strip a query')
}
if (siteJs.canonicalPath('/') !== '/') fail('canonicalPath broke the home path')

const layout = fs.readFileSync(path.join(root, 'components/Layout.tsx'), 'utf8')
if (!layout.includes('canonicalPath(router.asPath)')) {
  fail('Layout does not build the canonical from canonicalPath')
}
if (!layout.includes('rel="canonical"')) fail('Layout is missing a canonical link')

const companies = fs
  .readdirSync(path.join(contentRoot, 'companies'))
  .filter((name) => name.endsWith('.json'))
  .map((name) => readJson(path.join(contentRoot, 'companies', name)))
const editions = fs
  .readdirSync(path.join(contentRoot, 'editions'))
  .filter((name) => name.endsWith('.json'))
  .map((name) => readJson(path.join(contentRoot, 'editions', name)))
const blurbs = readJson(path.join(contentRoot, 'blurbs.json'))
const slugs = new Set(companies.map((company) => company.slug))
const editionByDate = new Map(editions.map((edition) => [edition.date, edition]))
const metas = new Map()

for (const company of companies) {
  const meta = blog.companyMetaDescription(company)
  if (meta.length > 155) fail(`${company.slug} meta is ${meta.length} characters`)
  if (metas.has(meta)) fail(`${company.slug} meta duplicates ${metas.get(meta)}`)
  metas.set(meta, company.slug)

  const faq = blog.companyFaq(company)
  const questions = new Set()
  for (const item of faq) {
    if (questions.has(item.question)) fail(`${company.slug} repeats a FAQ question`)
    questions.add(item.question)
    if (moneyInFaq.test(item.answer)) {
      fail(`${company.slug} FAQ answer contains a figure: ${item.question}`)
    }
    if (item.answer.includes(company.mentions.at(-1).evidence)) {
      fail(`${company.slug} FAQ repeats the evidence block`)
    }
  }

  const count = proseWords(company, blurbs[company.slug], faq)
  if (count < 300) fail(`${company.slug} has ${count} unique words`)

  const why = company.whyThisMatters || ''
  for (const sentence of sentences(company.mentions.at(-1).evidence)) {
    if (why.includes(sentence)) {
      fail(`${company.slug} whyThisMatters repeats an evidence sentence`)
    }
  }

  const latest = company.mentions[company.mentions.length - 1]
  const edition = editionByDate.get(latest.date)
  const related = blog.relatedCompanies(
    company,
    companies,
    (edition?.companies ?? []).map((entry) => entry.slug),
  )
  if (related.length < 2 || related.length > 3) {
    fail(`${company.slug} has ${related.length} related links`)
  }
  for (const peer of related) {
    if (!slugs.has(peer.slug)) fail(`${company.slug} links to missing ${peer.slug}`)
    if (peer.name !== companies.find((item) => item.slug === peer.slug)?.name) {
      fail(`${company.slug} related anchor is not the product name`)
    }
  }

  const crumbs = blog.companyCrumbs(company)
  if (crumbs.map((crumb) => crumb.name).join(' > ') !== `Home > Blog > Companies > ${company.name}`) {
    fail(`${company.slug} breadcrumbs are ${crumbs.map((crumb) => crumb.name).join(' > ')}`)
  }
}

for (const edition of editions) {
  const crumbs = blog.editionCrumbs(edition.date)
  if (crumbs[0]?.name !== 'Home' || crumbs[1]?.name !== 'Blog') {
    fail(`${edition.date} edition breadcrumbs do not start at Home`)
  }
  if (crumbs[2]?.path !== `/blog/${edition.date}`) {
    fail(`${edition.date} edition canonical path is wrong`)
  }
  for (const company of edition.companies) {
    if (!slugs.has(company.slug)) fail(`${edition.date} links to missing ${company.slug}`)
  }
}

const about = fs.readFileSync(path.join(root, 'pages/blog/about.tsx'), 'utf8')
if (!about.includes("{ name: 'Home', path: '/' }")) {
  fail('About page is missing the Home breadcrumb')
}

if (failures.length) {
  console.error(`${failures.length} SEO checks failed`)
  for (const failure of failures) console.error(`- ${failure}`)
  process.exit(1)
}

console.log(`SEO checks passed for ${companies.length} companies and ${editions.length} editions`)
