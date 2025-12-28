import { Analytics } from '@vercel/analytics/react'
import type { NextPage } from 'next'
import type { AppProps } from 'next/app'
import Script from 'next/script'
import type { ReactElement, ReactNode } from 'react'

import { ThemeProvider } from '@/components/ui/theme-provider'
import { Insights } from '../components/Insights'
import '../styles/globals.css'

export type tNextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode
}

export type tAppPropsWithLayout = AppProps & {
  Component: tNextPageWithLayout
}

function App({ Component, pageProps }: tAppPropsWithLayout) {
  const getLayout = Component.getLayout || ((page: ReactElement) => page)

  const page = getLayout(
    <>
      <Component {...pageProps} />
      <Analytics />
      <Insights />
    </>
  )

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="light"
      enableSystem
      disableTransitionOnChange
    >
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

      {page}
    </ThemeProvider>
  )
}

export default App
