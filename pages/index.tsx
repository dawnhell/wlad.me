import type { ReactElement } from 'react'
import Bio from '../components/Bio'
import Education from '../components/Education'
import Experience from '../components/Experience'
import Layout from '../components/Layout'
import type { tNextPageWithLayout } from './_app'

const Home: tNextPageWithLayout = () => (
  <div className="w-full">
    <Bio />

    <Experience />

    <Education />
  </div>
)

Home.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout
      title="Senior Frontend Engineer Portfolio | Wlad"
      description="Senior frontend engineer with 9+ years building React and TypeScript products. Creator of NextBento (Next.js SaaS boilerplate), LocalRank (app store ranking), and EventDash (product analytics). Fast, accessible UI and clean architecture."
    >
      {page}
    </Layout>
  )
}

export default Home
