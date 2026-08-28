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
      title="Senior UI Engineer Portfolio | Wlad"
      description="Senior UI engineer with 9+ years in React and TypeScript. Creator of NextBento, LocalRank, and EventDash. Fast, accessible UI and clean architecture."
    >
      {page}
    </Layout>
  )
}

export default Home
