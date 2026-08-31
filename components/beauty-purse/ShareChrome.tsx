import Head from 'next/head'
import type { ReactNode } from 'react'

import { APP_DISPLAY_NAME, SHARE_ORIGIN } from '../../lib/legal/my-beauty-purse'

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
      </Head>
      <div className="bp-share">
        <style jsx global>{`
          html,
          body {
            margin: 0;
            background: #fffbfc;
            color-scheme: light;
          }
          .bp-share {
            min-height: 100vh;
            font-family: ui-rounded, 'SF Pro Display', system-ui, sans-serif;
            background: linear-gradient(180deg, #e8a0bf 0%, #fff5f8 280px, #fffbfc 100%);
            color: #3e1c2e;
          }
          .bp-share main {
            max-width: 640px;
            margin: 0 auto;
            padding: 48px 24px 80px;
          }
          .bp-share .brand-mark {
            font-family: Palatino, 'Times New Roman', serif;
            font-size: 20px;
            letter-spacing: 0.04em;
            color: #c4608a;
          }
          .bp-share h1 {
            font-family: Palatino, serif;
            font-size: 42px;
            font-weight: 600;
            margin: 8px 0 28px;
          }
          .bp-share .eyebrow {
            text-transform: uppercase;
            letter-spacing: 0.14em;
            font-size: 11px;
            color: #c4608a;
          }
          .bp-share .item {
            padding: 18px 0;
            border-bottom: 1px solid rgba(196, 96, 138, 0.18);
          }
          .bp-share h2 {
            margin: 0 0 4px;
            font-size: 20px;
          }
          .bp-share .brand {
            color: #7a4e60;
            font-size: 14px;
          }
          .bp-share a {
            color: #c4608a;
          }
          .bp-share .muted {
            color: #7a4e60;
            line-height: 1.5;
          }
        `}</style>
        <main>
          <div className="brand-mark">{APP_DISPLAY_NAME}</div>
          {children}
        </main>
      </div>
    </>
  )
}

export default ShareChrome
