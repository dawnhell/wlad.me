import fs from 'fs'
import path from 'path'

import type { Company, Edition, Hero } from './blog-format'

export type {
  BlogSource,
  Company,
  CompanyMention,
  Crumb,
  Edition,
  EditionCompany,
  EvidenceKind,
  Hero,
  HonorableMention,
} from './blog-format'
export { evidenceLabel, formatEditionDate, latestMention, PERSON_ID } from './blog-format'

const contentRoot = path.join(process.cwd(), 'content/blog')

function readJson<T>(filePath: string): T {
  return JSON.parse(fs.readFileSync(filePath, 'utf8')) as T
}

export function getHeroes() {
  return readJson<Hero[]>(path.join(contentRoot, 'heroes.json'))
}

export function getHero(id: string) {
  const hero = getHeroes().find((item) => item.id === id)
  if (!hero) throw new Error(`Missing hero ${id}`)
  return hero
}

export function getEditions() {
  const dir = path.join(contentRoot, 'editions')
  if (!fs.existsSync(dir)) return []
  return fs
    .readdirSync(dir)
    .filter((name) => name.endsWith('.json'))
    .map((name) => readJson<Edition>(path.join(dir, name)))
    .sort((a, b) => b.date.localeCompare(a.date))
}

export function getEdition(date: string) {
  const filePath = path.join(contentRoot, 'editions', `${date}.json`)
  if (!fs.existsSync(filePath)) return null
  return readJson<Edition>(filePath)
}

export function getAdjacentEditions(date: string) {
  const editions = getEditions()
  const index = editions.findIndex((edition) => edition.date === date)
  if (index === -1) return { newer: null, older: null }
  return {
    newer: editions[index - 1] ?? null,
    older: editions[index + 1] ?? null,
  }
}

export function getCompanies() {
  const dir = path.join(contentRoot, 'companies')
  if (!fs.existsSync(dir)) return []
  return fs
    .readdirSync(dir)
    .filter((name) => name.endsWith('.json'))
    .map((name) => readJson<Company>(path.join(dir, name)))
    .sort((a, b) => a.name.localeCompare(b.name))
}

export function getCompany(slug: string) {
  const filePath = path.join(contentRoot, 'companies', `${slug}.json`)
  if (!fs.existsSync(filePath)) return null
  return readJson<Company>(filePath)
}
