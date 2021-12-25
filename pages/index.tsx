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

        <p className="text-xl font-['Roboto Slab'] text-neutral-600">
          Front-End developer <i>and</i>
        </p>

        <p className="text-xl font-['Roboto Slab'] text-neutral-600">
          coffee addict
        </p>

        <div className="w-1/4 h-px bg-slate-300 my-4" />

        <p>Focused on results with exceptional quality. I create incredible UI interfaces with complicated behaviors</p>
      </div>

      <div className="flex flex-col justify-center">
        <Image
          className="rounded-full object-cover w-28 h-28"
          src={avatar}
          alt="That's me!"
          width={140}
          height={140}
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
