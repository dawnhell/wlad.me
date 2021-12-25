import Image from 'next/image'
import React, { ReactElement } from 'react';

import { tNextPageWithLayout } from './_app';
import Layout from '../components/layout';
import About from '../components/about';
import avatar from '../public/circle_me.jpg'

const Home: tNextPageWithLayout = () => (
  <div className="w-full">
    <div className="flex justify-between w-full mb-16">
      <div className="mr-8 flex flex-col justify-center">
        <h1 className="text-3xl font-bold font-['Roboto Slab'] text-slate-700 mb-2">
          Hey, I&apos;m Wlad
        </h1>

        <p className="text-xl font-['Roboto Slab'] text-slate-700">
          Front-End developer <i>and</i>
        </p>

        <p className="text-xl font-['Roboto Slab'] text-slate-700">
          coffee addict
        </p>

        <div className="w-1/4 h-px bg-slate-300 my-4" />

        <p className="text-lg font-['Roboto Slab'] text-slate-600 tracking-wide italic">
          Focused on results with exceptional quality.
          I create incredible UI interfaces with complicated behaviors
        </p>
      </div>

      <div className="flex flex-col justify-start">
        <Image
          className="rounded-full object-cover w-32 h-32"
          src={avatar}
          alt="That's me!"
          width={160}
          height={160}
        />
      </div>
    </div>

    <About />
  </div>
)

Home.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout>
      {page}
    </Layout>
  )
}

export default Home
