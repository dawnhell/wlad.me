import { Analytics } from '@vercel/analytics/react'
import type { NextPage } from 'next'
import type { AppProps } from 'next/app'
import type { ReactElement, ReactNode } from 'react'
import ReactGA from 'react-ga'

import { Insights } from '../components/Insights'
import '../styles/globals.css'

export type tNextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode
}

export type tAppPropsWithLayout = AppProps & {
  Component: tNextPageWithLayout
}

process.env.NEXT_PUBLIC_GA_ID &&
  ReactGA.initialize(process.env.NEXT_PUBLIC_GA_ID)

function App({ Component, pageProps }: tAppPropsWithLayout) {
  const getLayout = Component.getLayout || ((page: ReactElement) => page)

  return getLayout(
    <>
      <Component {...pageProps} />
      <Analytics />
      <Insights />
    </>
  )
}

export default App
