import Head from 'next/head'
import { useRouter } from 'next/router'
import { ReactElement } from 'react'

import Header from './Header'

interface ILayout {
  children: ReactElement
  withHeader?: boolean
  title?: string
  description?: string
  image?: string
}

const Layout = ({
  children,
  withHeader = true,
  title = 'Wlad.me - Senior Frontend Developer & Coffee Addict',
  description = 'Senior Frontend Engineer with 8+ years of experience creating incredible UI interfaces with complicated behaviors. Specializing in React, TypeScript, and modern web technologies.',
  image = '/circle_me.png',
}: ILayout) => {
  const router = useRouter()
  const canonicalUrl = `https://wlad.me${router.asPath}`
  const fullTitle = title
  const fullImage = `https://wlad.me${image}`

  return (
    <>
      <Head>
        {/* Primary Meta Tags */}
        <title>{fullTitle}</title>
        <meta name="title" content={fullTitle} />
        <meta name="description" content={description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        {/* Canonical URL */}
        <link rel="canonical" href={canonicalUrl} />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:title" content={fullTitle} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={fullImage} />
        <meta property="og:site_name" content="Wlad.me" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content={canonicalUrl} />
        <meta name="twitter:title" content={fullTitle} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={fullImage} />

        {/* Favicons */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link
          rel="icon"
          href="/favicon-16x16.png"
          sizes="16x16"
          type="image/png"
        />
        <link
          rel="icon"
          href="/favicon-32x32.png"
          sizes="32x32"
          type="image/png"
        />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
      </Head>

      <div className="w-full py-16 px-12 sm:py-20 sm:px-16 bg-background">
        <div className="container mx-auto lg:max-w-screen-lg md:max-w-screen-md">
          {withHeader ? <Header /> : null}

          <main className="flex flex-col items-center">{children}</main>
        </div>
      </div>
    </>
  )
}

export default Layout
