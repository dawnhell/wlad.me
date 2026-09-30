import Head from 'next/head'
import { useRouter } from 'next/router'
import { ReactElement } from 'react'

import { PERSON_ID } from '../lib/blog-format'
import { SITE_URL } from '../lib/site'
import Header from './Header'

const PERSON_DESCRIPTION =
  'Senior UI engineer with 9+ years in React and TypeScript. Creator of Complience.app, NextBento, and EventDash. Building fast, accessible interfaces with clean architecture.'

interface ILayout {
  children: ReactElement
  withHeader?: boolean
  title?: string
  description?: string
  image?: string
  mainAlign?: 'center' | 'start'
  ogType?: 'website' | 'article'
  publishedTime?: string
  rss?: boolean
  extraStructuredData?: object[]
}

const Layout = ({
  children,
  withHeader = true,
  title = 'Senior UI Engineer Portfolio | Wlad',
  description = 'Senior UI engineer with 9+ years in React and TypeScript. Creator of Complience.app, NextBento, and EventDash. Building fast, accessible interfaces with clean architecture.',
  image = '/circle_me.jpg',
  mainAlign = 'center',
  ogType = 'website',
  publishedTime,
  rss = false,
  extraStructuredData = [],
}: ILayout) => {
  const router = useRouter()
  const canonicalPath = router.asPath.split('?')[0] || '/'
  const canonicalUrl = `${SITE_URL}${canonicalPath}`
  const fullTitle = title
  const fullImage = `${SITE_URL}${image}`
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': PERSON_ID,
    name: 'Wlad',
    url: SITE_URL,
    image: `${SITE_URL}/circle_me.jpg`,
    jobTitle: 'Senior UI Engineer',
    description: PERSON_DESCRIPTION,
    email: 'mailto:wlad@wlad.me',
    sameAs: [
      'https://github.com/dawnhell/',
      'https://x.com/dawnhell_',
      'https://www.linkedin.com/in/wlad-me/',
    ],
    knowsAbout: [
      'React',
      'TypeScript',
      'UI Engineering',
      'Design Systems',
      'Frontend Architecture',
      'Next.js',
      'Performance Optimization',
      'Accessibility',
      'SaaS Development',
      'REST API',
    ],
  }

  return (
    <>
      <Head>
        {/* Primary Meta Tags */}
        <title>{fullTitle}</title>
        <meta name="title" content={fullTitle} />
        <meta name="description" content={description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="theme-color"
          content="#fafafa"
          media="(prefers-color-scheme: light)"
        />
        <meta
          name="theme-color"
          content="#121212"
          media="(prefers-color-scheme: dark)"
        />
        <meta name="author" content="Wlad" />

        {/* Canonical URL */}
        <link rel="canonical" href={canonicalUrl} />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content={ogType} />
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
        {publishedTime ? (
          <meta property="article:published_time" content={publishedTime} />
        ) : null}
        {rss ? (
          <link
            rel="alternate"
            type="application/rss+xml"
            title="Boring SaaS"
            href="/blog/rss.xml"
          />
        ) : null}

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

        {/* Structured Data */}
        {[structuredData, ...extraStructuredData].map((data) => (
          <script
            key={JSON.stringify(data).slice(0, 80)}
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(data).replace(/</g, '\\u003c'),
            }}
          />
        ))}
      </Head>

      <div className="w-full bg-background px-6 py-10 sm:px-10 sm:py-16">
        <a
          href="#main"
          className="no-print sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-background focus:px-3 focus:py-2 focus:text-foreground focus:ring-2 focus:ring-ring"
        >
          Skip to content
        </a>
        <div className="container mx-auto md:max-w-screen-md lg:max-w-screen-lg">
          {withHeader ? <Header /> : null}

          <main
            id="main"
            className={
              mainAlign === 'start'
                ? 'flex flex-col items-start'
                : 'flex flex-col items-center'
            }
          >
            {children}
          </main>
        </div>
      </div>
    </>
  )
}

export default Layout
