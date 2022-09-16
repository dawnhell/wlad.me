import { useRouter } from 'next/router'
import React, { ReactElement } from 'react';

import { Layout } from '../../components';

export default function Post() {
  const router = useRouter()
  const slug = router.query.slug as string

  return (
    <div className="w-full">
      <h1>Post: {slug}</h1>
    </div>
  )
}

Post.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout withHeader={false}>
      {page}
    </Layout>
  )
}

