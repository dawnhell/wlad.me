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
      description="Senior frontend engineer with 8+ years building complex React and TypeScript products. Focused on fast, accessible UI and clean architecture for teams that ship."
    >
      {page}
    </Layout>
  )
}

export default Home
