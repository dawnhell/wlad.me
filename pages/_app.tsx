import { Analytics } from '@vercel/analytics/react'
import type { NextPage } from 'next'
import type { AppProps } from 'next/app'
import { Newsreader, Source_Sans_3 } from 'next/font/google'
import { useRouter } from 'next/router'
import Script from 'next/script'
import type { ReactElement, ReactNode } from 'react'

import { ThemeProvider } from '@/components/ui/theme-provider'
import { Insights } from '../components/Insights'
import '../styles/globals.css'

const sourceSans = Source_Sans_3({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  display: 'swap',
  variable: '--font-source-sans',
})

const newsreader = Newsreader({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  display: 'swap',
  variable: '--font-newsreader',
})

export type tNextPageWithLayout<P = Record<string, never>> = NextPage<P> & {
  getLayout?: (page: ReactElement, pageProps: P) => ReactNode
}

export type tAppPropsWithLayout = AppProps & {
  Component: tNextPageWithLayout
}

function App({ Component, pageProps }: tAppPropsWithLayout) {
  const router = useRouter()
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
          <Script
            src="https://www.eventda.sh/tracker.js"
            data-api-key={process.env.NEXT_PUBLIC_EVENT_DASH_API_KEY}
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
