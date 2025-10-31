import { Analytics } from '@vercel/analytics/react'
import type { NextPage } from 'next'
import type { AppProps } from 'next/app'
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
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      {page}
    </ThemeProvider>
  )
}

export default App
