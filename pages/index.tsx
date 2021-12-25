import React, { ReactElement } from 'react';

import { tNextPageWithLayout } from './_app';
import { Layout, Bio, Experience, Education } from '../components';

const Home: tNextPageWithLayout = () => (
  <div className="w-full">
    <Bio />

    <Experience />

    <Education />
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
