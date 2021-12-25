import Head from 'next/head'
import React, { ReactElement } from 'react';

import Header from './Header';

interface ILayout {
  children: ReactElement
}

const Layout = ({ children }: ILayout) => (
  <>
    <Head>
      <title>Wlad.me</title>
      <meta name="description" content="Generated by create next app" />
      <link rel="icon" href="/favicon.ico" />
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
      <link
        href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,400;0,600;0,700;1,400;1,600;1,700&display=swap"
        rel="stylesheet"
      />

      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
      <link
        href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,400;0,600;0,700;1,400;1,600;1,700&family=Roboto+Slab:wght@400;500;600;700;800&display=swap"
        rel="stylesheet"
      />
    </Head>

    <div className="w-full py-16 px-12 sm:py-20 sm:px-16 bg-zinc-50">
      <div className="container mx-auto lg:max-w-screen-lg md:max-w-screen-md">
        <Header />

        <main className="flex flex-col items-center">{children}</main>
      </div>
    </div>
  </>
)

export default Layout
