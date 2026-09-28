import type { ReactElement } from 'react'
import Bio from '../components/Bio'
import Education from '../components/Education'
import Experience from '../components/Experience'
import Layout from '../components/Layout'
import Products from '../components/Products'
import type { tNextPageWithLayout } from './_app'

const Home: tNextPageWithLayout = () => (
  <div className="w-full">
    <Bio />

    <Products />

    <Experience />

    <Education />
  </div>
)

Home.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout
      title="Senior UI Engineer Portfolio | Wlad"
      description="Senior UI engineer with 9+ years in React and TypeScript. Creator of Complience.app, NextBento, and EventDash. Building fast, accessible interfaces with clean architecture."
    >
      {page}
    </Layout>
  )
}

export default Home
