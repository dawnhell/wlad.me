import type { ReactElement, ReactNode } from 'react'
import type { NextPage } from 'next'
import type { AppProps } from 'next/app'

import '../styles/globals.css'

export type tNextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode
}

export type tAppPropsWithLayout = AppProps & {
  Component: tNextPageWithLayout
}

function App({ Component, pageProps }: tAppPropsWithLayout) {
  const getLayout = Component.getLayout || ((page: ReactElement) => page)

  return getLayout(<Component {...pageProps} />)
}

export default App
