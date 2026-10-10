import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const contentRoot = path.join(root, 'content/blog')

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, 'utf8'))
}

const companies = fs
  .readdirSync(path.join(contentRoot, 'companies'))
  .filter((name) => name.endsWith('.json'))
  .map((name) => readJson(path.join(contentRoot, 'companies', name)))
  .map((company) => ({
    name: company.name,
    slug: company.slug,
    homepage: company.homepage || null,
  }))
  .sort((a, b) => a.name.localeCompare(b.name))

const mentions = []
for (const file of fs.readdirSync(path.join(contentRoot, 'editions'))) {
  if (!file.endsWith('.json')) continue
  const edition = readJson(path.join(contentRoot, 'editions', file))
  for (const mention of edition.honorableMentions || []) {
    mentions.push({
      date: edition.date,
      name: mention.name,
      homepage: mention.homepage || null,
    })
  }
}
mentions.sort((a, b) => a.name.localeCompare(b.name) || a.date.localeCompare(b.date))

process.stdout.write(
  `${JSON.stringify({ companies, honorableMentions: mentions }, null, 2)}\n`,
)
