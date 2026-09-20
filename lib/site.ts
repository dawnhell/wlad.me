export const SITE_URL = 'https://www.wlad.me'
export const FOUNDER_REF = 'wlad.me'

function withFounderRef(url: string): string {
  const parsed = new URL(url)
  parsed.searchParams.set('ref', FOUNDER_REF)
  return parsed.toString()
}

export const FOUNDER_PRODUCTS = {
  complience: {
    name: 'Complience.app',
    url: withFounderRef('https://www.complience.app'),
    logo: 'https://www.complience.app/favicon.ico',
  },
  nextbento: {
    name: 'NextBento',
    url: withFounderRef('https://www.nextbento.dev'),
    logo: 'https://www.nextbento.dev/favicon.ico',
  },
  eventdash: {
    name: 'EventDash',
    url: withFounderRef('https://www.eventda.sh'),
    logo: 'https://www.eventda.sh/favicon.ico',
  },
} as const
