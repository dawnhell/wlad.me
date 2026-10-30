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
  { name: 'For sale', path: '/blog/companies/for-sale' },
]

const ForSalePage: tNextPageWithLayout<{ companies: CompanyIndexCard[] }> = ({ companies }) => {
  return (
    <CompanyShelf
      crumbs={crumbs}
      title="For sale"
      lede="These notes say the listing is for sale. I'm not the broker, and I'm not checking the offer."
      note="Newest note first."
    >
      <CompanyRoll companies={companies} />
    </CompanyShelf>
  )
}

ForSalePage.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout
      title="For sale | Boring SaaS"
      description="Boring SaaS notes where the listing says the company is for sale."
      mainAlign="start"
      rss
      extraStructuredData={[breadcrumbSchema(crumbs)]}
    >
      {page}
    </Layout>
  )
}

export default ForSalePage

export async function getStaticProps() {
  const { getCompanies } = await import('../../../lib/blog')
  const { forSaleCards } = await import('../../../lib/company-index')
  return { props: { companies: forSaleCards(getCompanies()) } }
}
