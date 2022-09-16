import Link from 'next/link'
import React, { ReactElement } from 'react';

import { Layout } from '../../components';

export default function Posts() {
  return (
    <div className="w-full">
      <h1>Posts</h1>
      <ul>
        <li>
          <Link href='/posts/javascript-promises'>
            <a>JavaScript Promises</a>
          </Link>
        </li>
        <li>
          <Link href='/posts/some-shit'>
            <a>Some Shit</a>
          </Link>
        </li>
      </ul>
    </div>
  )
}

Posts.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout>
      {page}
    </Layout>
  )
}
