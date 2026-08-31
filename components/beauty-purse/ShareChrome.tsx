import Head from 'next/head'
import type { ReactNode } from 'react'

import {
  APP_DISPLAY_NAME,
  LEGAL_BASE_PATH,
  PRIVACY_PATH,
  SHARE_ORIGIN,
  TERMS_PATH,
} from '../../lib/legal/my-beauty-purse'
import styles from './ShareChrome.module.css'

interface ShareChromeProps {
  title: string
  description?: string
  children: ReactNode
  noindex?: boolean
  canonical?: string
}

const ShareChrome = ({
  title,
  description = 'A shared list from Beauty Purse.',
  children,
  noindex = true,
  canonical = SHARE_ORIGIN,
}: ShareChromeProps) => {
  const fullTitle = `${title} · ${APP_DISPLAY_NAME}`

  return (
    <>
      <Head>
        <title>{fullTitle}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content={description} />
        <meta name="theme-color" content="#E8A0BF" />
        {noindex ? <meta name="robots" content="noindex, nofollow" /> : null}
        <link rel="canonical" href={canonical} />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@600&family=Nunito:wght@600;700&display=swap"
          rel="stylesheet"
        />
        <style>{`
          html, body, #__next { margin: 0; min-height: 100%; background: #fff5f8; }
        `}</style>
      </Head>
      <div className={styles.page}>
        <header className={styles.top}>
          <span className={styles.wordmark}>{APP_DISPLAY_NAME}</span>
        </header>
        <article className={styles.sheet}>{children}</article>
        <footer className={styles.foot}>
          Shared from {APP_DISPLAY_NAME}
          {' · '}
          <a href={`https://wlad.me${LEGAL_BASE_PATH}`}>Support</a>
          {' · '}
          <a href={`https://wlad.me${PRIVACY_PATH}`}>Privacy</a>
          {' · '}
          <a href={`https://wlad.me${TERMS_PATH}`}>Terms</a>
        </footer>
      </div>
    </>
  )
}

export default ShareChrome
export { styles as shareStyles }
