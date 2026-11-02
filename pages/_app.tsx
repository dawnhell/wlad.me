import { Analytics } from '@vercel/analytics/react'
import type { NextPage } from 'next'
import type { AppProps } from 'next/app'
import localFont from 'next/font/local'
import Head from 'next/head'
import { useRouter } from 'next/router'
import Script from 'next/script'
import type { ReactElement, ReactNode } from 'react'

import { ThemeProvider } from '@/components/ui/theme-provider'
import { Insights } from '../components/Insights'
import '../styles/globals.css'

const sourceSans = localFont({
  src: [
    { path: '../fonts/source-sans-3-latin-400.woff2', weight: '400', style: 'normal' },
    { path: '../fonts/source-sans-3-latin-500.woff2', weight: '500', style: 'normal' },
    { path: '../fonts/source-sans-3-latin-600.woff2', weight: '600', style: 'normal' },
  ],
  display: 'swap',
  variable: '--font-source-sans',
  adjustFontFallback: 'Arial',
})

const newsreader = localFont({
  src: [
    { path: '../fonts/newsreader-latin-300.woff2', weight: '300', style: 'normal' },
    { path: '../fonts/newsreader-latin-400.woff2', weight: '400', style: 'normal' },
    { path: '../fonts/newsreader-latin-500.woff2', weight: '500', style: 'normal' },
  ],
  display: 'swap',
  variable: '--font-newsreader',
  adjustFontFallback: 'Times New Roman',
})

export type tNextPageWithLayout<P = Record<string, never>> = NextPage<P> & {
  getLayout?: (page: ReactElement, pageProps: P) => ReactNode
}

export type tAppPropsWithLayout = AppProps & {
  Component: tNextPageWithLayout
}

function App({ Component, pageProps }: tAppPropsWithLayout) {
  const router = useRouter()
  const eventDashApiKey = process.env.NEXT_PUBLIC_EVENT_DASH_API_KEY
  const skipTracking =
    router.pathname.startsWith('/legal') ||
    router.pathname === '/share' ||
    router.pathname === '/beauty-purse-home'
  const getLayout = Component.getLayout || ((page: ReactElement) => page)

  const page = getLayout(
    <>
      <Component {...pageProps} />
      {skipTracking ? null : (
        <>
          <Analytics />
          <Insights />
        </>
      )}
    </>
    ,
    pageProps,
  )

  return (
    <div className={`${sourceSans.variable} ${newsreader.variable} site-fonts`}>
    <ThemeProvider
      attribute="class"
      defaultTheme="light"
      enableSystem
      enableColorScheme
      disableTransitionOnChange
    >
      {skipTracking ? null : (
        <>
          {eventDashApiKey ? (
            <Head>
              <link
                rel="preload"
                as="image"
                href={`https://www.eventda.sh/api/crawl?key=${eventDashApiKey}`}
              />
            </Head>
          ) : null}
          <Script
            src="https://www.eventda.sh/tracker.js"
            data-api-key={eventDashApiKey}
            strategy="afterInteractive"
          />

          <Script
            data-website-id="dfid_fQMjTXfUwmaw8EaSzOESl"
            data-domain="wlad.me"
            src="https://datafa.st/js/script.js"
            strategy="lazyOnload"
            onError={(e) => {
              console.warn('Datafast analytics script failed to load:', e)
            }}
            onLoad={() => {
              console.log('Datafast analytics script loaded successfully')
            }}
          />
        </>
      )}

      {page}
    </ThemeProvider>
    </div>
  )
}

export default App
