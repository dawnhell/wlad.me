import { mkdir, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

import sharp from 'sharp'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const outDir = path.join(root, 'public/blog/heroes')

const picks = [
  {
    id: 'red-fox',
    subject: 'animal',
    alt: 'A red fox in snow in a nature reserve in Sweden',
    credit: 'ClaudiaTen',
    license: 'CC BY-SA 4.0',
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/c/cc/Portrait_of_a_red_fox_in_Rautas_fj%C3%A4llurskog.jpg/1920px-Portrait_of_a_red_fox_in_Rautas_fj%C3%A4llurskog.jpg',
  },
  {
    id: 'red-deer',
    subject: 'animal',
    alt: 'A wild red deer standing in the Aletsch Forest',
    credit: 'Giles Laurent',
    license: 'CC BY-SA 4.0',
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/6/66/014_Wild_Red_Deer_Switzerland_Photo_by_Giles_Laurent.jpg/1920px-014_Wild_Red_Deer_Switzerland_Photo_by_Giles_Laurent.jpg',
  },
  {
    id: 'coast-waves',
    subject: 'nature',
    alt: 'Waves breaking on rocks at sunset along a coast in Sète, France',
    credit: 'Christian Ferrer',
    license: 'CC BY 4.0',
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/7/71/Waves_at_La_Corniche.jpg/1920px-Waves_at_La_Corniche.jpg',
  },
  {
    id: 'mountain-lake',
    subject: 'nature',
    alt: 'A mountain lake among rock formations in the Sayan Mountains',
    credit: 'Vyacheslav Argenberg',
    license: 'CC BY 4.0',
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/c/cf/Ergaki%2C_Mountain_lake_Skazka%2C_Rock_formations%2C_Sayan_Mountains%2C_Russia.jpg/1920px-Ergaki%2C_Mountain_lake_Skazka%2C_Rock_formations%2C_Sayan_Mountains%2C_Russia.jpg',
  },
  {
    id: 'gull-flight',
    subject: 'animal',
    alt: 'A gull in flight with its wings spread',
    credit: 'Bengt Nyman',
    license: 'CC BY 2.0',
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/9/9d/Bird_in_flight_wings_spread.jpg/1920px-Bird_in_flight_wings_spread.jpg',
  },
  {
    id: 'elephants',
    subject: 'animal',
    alt: 'An African bush elephant standing with a young calf',
    credit: 'Charles J. Sharp',
    license: 'CC BY-SA 4.0',
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/d/d5/African_bush_elephants_%28Loxodonta_africana%29_female_with_six-week-old_baby.jpg/1920px-African_bush_elephants_%28Loxodonta_africana%29_female_with_six-week-old_baby.jpg',
  },
  {
    id: 'misty-forest',
    subject: 'nature',
    alt: 'A misty winter morning among the trees of Stonor Forest',
    credit: 'Scott Wylie',
    license: 'CC BY 2.0',
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/0/03/%28Explored%29_Misty_Winter_morning_in_Stonor_Forest_-_Flickr_-_scotbot.jpg/1920px-%28Explored%29_Misty_Winter_morning_in_Stonor_Forest_-_Flickr_-_scotbot.jpg',
  },
]

function filePage(thumbUrl) {
  const parts = new URL(thumbUrl).pathname.split('/')
  const filename = decodeURIComponent(parts[6])
  return `https://commons.wikimedia.org/wiki/File:${encodeURIComponent(filename)}`
}

await mkdir(outDir, { recursive: true })
await mkdir(path.join(root, 'content/blog'), { recursive: true })

const heroes = []

for (const pick of picks) {
  const response = await fetch(pick.url, {
    headers: { 'User-Agent': 'wlad.me blog hero import (wlad@wlad.me)' },
  })
  if (!response.ok) {
    throw new Error(`Failed to download ${pick.id}: ${response.status}`)
  }
  const input = Buffer.from(await response.arrayBuffer())
  let width = 1600
  let quality = 75
  let buffer = await sharp(input)
    .rotate()
    .resize({ width, withoutEnlargement: true })
    .webp({ quality })
    .toBuffer()
  while (buffer.length > 150 * 1024 && width > 960) {
    if (quality > 60) quality -= 5
    else {
      width -= 160
      quality = 68
    }
    buffer = await sharp(input)
      .rotate()
      .resize({ width, withoutEnlargement: true })
      .webp({ quality })
      .toBuffer()
  }
  const meta = await sharp(buffer).metadata()
  const filename = `${pick.id}.webp`
  await writeFile(path.join(outDir, filename), buffer)
  heroes.push({
    id: pick.id,
    src: `/blog/heroes/${filename}`,
    alt: pick.alt,
    width: meta.width,
    height: meta.height,
    credit: pick.credit,
    creditUrl: filePage(pick.url),
    license: pick.license,
    subject: pick.subject,
  })
  console.log(
    `${filename} ${meta.width}x${meta.height} ${Math.round(buffer.length / 1024)}KB q${quality} w${width}`,
  )
}

await writeFile(
  path.join(root, 'content/blog/heroes.json'),
  `${JSON.stringify(heroes, null, 2)}\n`,
)
