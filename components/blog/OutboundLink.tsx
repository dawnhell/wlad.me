import { ExternalLink } from 'lucide-react'
import type { ReactNode } from 'react'

const OutboundLink = ({
  href,
  children,
}: {
  href: string
  children: ReactNode
}) => {
  return (
    <a href={href} target="_blank" rel="noreferrer" className="text-link">
      {children}
      <ExternalLink aria-hidden className="ml-1 inline size-3.5 align-text-bottom" />
      <span className="sr-only"> (opens in a new tab)</span>
    </a>
  )
}

export default OutboundLink
