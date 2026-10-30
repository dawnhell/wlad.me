import type { ReactNode } from 'react'

import type { Crumb } from '../../lib/blog-format'
import Breadcrumbs from './Breadcrumbs'

const CompanyShelf = ({
  crumbs,
  title,
  lede,
  note,
  children,
}: {
  crumbs: Crumb[]
  title: string
  lede: string
  note?: string
  children: ReactNode
}) => {
  return (
    <div className="flex w-full flex-col gap-8">
      <Breadcrumbs crumbs={crumbs} />
      <header className="flex max-w-[65ch] flex-col gap-3">
        <h1 className="font-serif text-3xl font-normal text-balance md:text-4xl">{title}</h1>
        <p className="leading-relaxed text-muted-foreground">{lede}</p>
        {note ? <p className="text-sm text-muted-foreground">{note}</p> : null}
      </header>
      {children}
    </div>
  )
}

export default CompanyShelf
