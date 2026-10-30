import type { ReactElement } from 'react'

import CompanyRoll from '../../../components/blog/CompanyRoll'
import CompanyShelf from '../../../components/blog/CompanyShelf'
import Layout from '../../../components/Layout'
import type { CompanyIndexCard } from '../../../lib/company-index'
import type { Crumb } from '../../../lib/blog-format'
import { breadcrumbSchema } from '../../../lib/blog-schema'
import type { tNextPageWithLayout } from '../../_app'

const crumbs: Crumb[] = [
  { name: 'Home', path: '/' },
  { name: 'Blog', path: '/blog' },
  { name: 'Companies', path: '/blog/companies' },
  { name: 'Noted again', path: '/blog/companies/again' },
]

const AgainPage: tNextPageWithLayout<{ companies: CompanyIndexCard[] }> = ({ companies }) => {
  return (
    <CompanyShelf
      crumbs={crumbs}
      title="Noted again"
      lede="I wrote these down more than once. The older number stays on the company page."
      note="Newest note first."
    >
      <CompanyRoll companies={companies} showCount />
    </CompanyShelf>
  )
}

AgainPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout
      title="Noted again | Boring SaaS"
      description="Companies I noted more than once. The older number stays on the page."
      mainAlign="start"
      rss
      extraStructuredData={[breadcrumbSchema(crumbs)]}
    >
      {page}
    </Layout>
  )
}

export default AgainPage

export async function getStaticProps() {
  const { getCompanies } = await import('../../../lib/blog')
  const { againCards } = await import('../../../lib/company-index')
  return { props: { companies: againCards(getCompanies()) } }
}
