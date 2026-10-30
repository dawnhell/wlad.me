import assert from 'node:assert/strict'
import fs from 'node:fs'
import path from 'node:path'
import test from 'node:test'
import { fileURLToPath } from 'node:url'

import { isListedForSale, sentenceSaysListedForSale } from './listed-for-sale.mjs'

const companyDir = path.join(
  path.dirname(fileURLToPath(import.meta.url)),
  '../content/blog/companies',
)

function companyParts(company) {
  return [
    company.description,
    company.whyItPrints,
    company.whyThisMatters,
    company.listingNote,
    ...company.mentions.flatMap((mention) => [mention.evidence, mention.indieAngle]),
  ].filter(Boolean)
}

function loadCompanies() {
  return fs
    .readdirSync(companyDir)
    .filter((name) => name.endsWith('.json'))
    .map((name) => JSON.parse(fs.readFileSync(path.join(companyDir, name), 'utf8')))
}

test('a sentence has to say the listing is for sale', () => {
  assert.equal(sentenceSaysListedForSale('Listed for sale at $300,000.'), true)
  assert.equal(sentenceSaysListedForSale('For sale: asking $449,000'), true)
  assert.equal(sentenceSaysListedForSale('The asset is for sale, with a dormant email list.'), true)
  assert.equal(sentenceSaysListedForSale('The listing is still for sale.'), true)
  assert.equal(sentenceSaysListedForSale('It is not for sale.'), false)
  assert.equal(sentenceSaysListedForSale('Not listed for sale.'), false)
  assert.equal(
    sentenceSaysListedForSale(
      'Not currently listed for sale, though the description reads like a sale pitch.',
    ),
    false,
  )
  assert.equal(sentenceSaysListedForSale('A second number for sales or support is a dull need.'), false)
  assert.equal(
    sentenceSaysListedForSale("Asking prices and estimates aren't in the response."),
    false,
  )
  assert.equal(
    sentenceSaysListedForSale('The page lists a bar, a restaurant, or another shop for sale.'),
    false,
  )
})

test('known notes land on the right side of the list', () => {
  const byName = new Map(loadCompanies().map((company) => [company.name, company]))
  const listed = (name) => isListedForSale(companyParts(byName.get(name)))

  assert.equal(listed('Catalister'), true)
  assert.equal(listed('BestTime.app'), true)
  assert.equal(listed('FriendFilter + GroupFilter'), true)
  assert.equal(listed('Transfer.zip'), false)
  assert.equal(listed('SoldComps'), false)
  assert.equal(listed('gosimless'), false)
  assert.equal(listed('B2B workforce-management SaaS'), false)
  assert.equal(listed('WordPress & WooCommerce maintenance business'), false)
})
