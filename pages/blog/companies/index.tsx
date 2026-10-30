import type { ReactElement } from 'react'

import CompanyDirectory from '../../../components/blog/CompanyDirectory'
import CompanyShelf from '../../../components/blog/CompanyShelf'
import Layout from '../../../components/Layout'
import type { EvidenceGroup } from '../../../lib/company-index'
import type { Crumb } from '../../../lib/blog-format'
import { breadcrumbSchema } from '../../../lib/blog-schema'
import type { tNextPageWithLayout } from '../../_app'

const crumbs: Crumb[] = [
  { name: 'Home', path: '/' },
  { name: 'Blog', path: '/blog' },
  { name: 'Companies', path: '/blog/companies' },
]

const lede =
  "The line under a name is what they sell. Stripe-verified means the listing is connected to Stripe. Self-reported means the company said it. The last section is Creem, Paddle, and the rest."

const CompaniesPage: tNextPageWithLayout<{ groups: EvidenceGroup[] }> = ({ groups }) => {
  return (
    <CompanyShelf crumbs={crumbs} title="The companies" lede={lede}>
      <CompanyDirectory groups={groups} />
    </CompanyShelf>
  )
}

CompaniesPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout
      title="The companies | Boring SaaS"
      description="Company notes from Boring SaaS. The line under a name is what they sell. Every number has a date and a label."
      mainAlign="start"
      rss
      extraStructuredData={[breadcrumbSchema(crumbs)]}
    >
      {page}
    </Layout>
  )
}

export default CompaniesPage

export async function getStaticProps() {
  const { getCompanies } = await import('../../../lib/blog')
  const { companyCards, evidenceGroups } = await import('../../../lib/company-index')
  return {
    props: {
      groups: evidenceGroups(companyCards(getCompanies())),
    },
  }
}
