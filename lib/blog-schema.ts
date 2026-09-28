import { PERSON_ID, type Crumb } from './blog-format'
import { SITE_URL } from './site'

export function absoluteUrl(path: string) {
  if (path.startsWith('http')) return path
  return `${SITE_URL}${path}`
}

export function breadcrumbSchema(crumbs: Crumb[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: crumbs.map((crumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: crumb.name,
      item: absoluteUrl(crumb.path),
    })),
  }
}

export function articleSchema({
  headline,
  description,
  path,
  date,
  image,
}: {
  headline: string
  description: string
  path: string
  date: string
  image?: string | null
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline,
    description,
    datePublished: date,
    dateModified: date,
    mainEntityOfPage: absoluteUrl(path),
    url: absoluteUrl(path),
    ...(image ? { image: [absoluteUrl(image)] } : {}),
    author: {
      '@type': 'Person',
      '@id': PERSON_ID,
      name: 'Wlad',
      url: SITE_URL,
    },
    publisher: {
      '@id': PERSON_ID,
    },
  }
}
