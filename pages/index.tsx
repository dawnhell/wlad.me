import Image from 'next/image'
import { ReactElement } from 'react';

import { tNextPageWithLayout } from './_app';
import Layout from '../components/layout';
import avatar from '../public/circle_me.jpg'

const Home: tNextPageWithLayout = () => (
  <div className="flex justify-between w-full">
    <div className="mr-8">
      <h1 className="text-3xl font-bold font-['Roboto Slab'] text-slate-700 mb-4">
        Hey, I&apos;m Wlad
      </h1>

      <p className="text-xl font-['Roboto Slab'] text-neutral-600 mb-2">
        🖥️ Front-End developer <i>and</i>
      </p>

      <p className="text-xl font-['Roboto Slab'] text-neutral-600">
        ☕ coffee addict
      </p>
    </div>

    <Image
      className="rounded-full object-cover"
      src={avatar}
      alt="That's me!"
      width={120}
      height={120}
    />
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
