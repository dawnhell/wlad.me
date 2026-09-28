import { FC } from 'react'

import { FOUNDER_PRODUCTS } from '../lib/site'
import CompanyMark from './CompanyMark'

const products = [
  FOUNDER_PRODUCTS.complience,
  FOUNDER_PRODUCTS.nextbento,
  FOUNDER_PRODUCTS.eventdash,
] as const

const Products: FC = () => {
  return (
    <section id="products" className="py-12">
      <h2 className="mb-8 scroll-mt-8 font-serif text-3xl font-normal text-balance md:text-4xl">
        Selected products
      </h2>

      <div className="grid gap-4 sm:grid-cols-3">
        {products.map((product) => (
          <a
            key={product.name}
            href={product.url}
            target="_blank"
            rel="noreferrer"
            className="cv-block flex min-w-0 items-start gap-3 rounded-lg p-1 fine-hover:bg-muted"
          >
            <CompanyMark src={product.logo} name={product.name} />
            <span className="flex min-w-0 flex-col gap-1">
              <span className="font-medium text-foreground">{product.name}</span>
              <span className="text-sm text-muted-foreground">
                {product.summary}
              </span>
            </span>
          </a>
        ))}
      </div>
    </section>
  )
}

export default Products
