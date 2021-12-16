import Image from 'next/image'
import { ReactElement } from 'react';

import { tNextPageWithLayout } from './_app';
import Layout from '../components/layout';
import avatar from '../public/circle_me.jpg'

const Home: tNextPageWithLayout = () => (
    <div className="flex justify-center">
      <Image
        className="rounded-full object-cover"
        src={avatar}
        alt="That's me!"
        width={120}
        height={120}
      />

      <h1 className="">
        Hey there!
      </h1>

      <p className="">
        My name is <strong>Uladzislau Klachkou</strong>
      </p>

      <div>

      </div>
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
