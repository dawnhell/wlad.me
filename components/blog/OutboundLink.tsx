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
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="inline-flex items-center gap-1 font-medium text-foreground transition-colors duration-150 [transition-timing-function:var(--ease-out)] fine-hover:text-primary"
    >
      <span className="underline decoration-primary underline-offset-4">{children}</span>
      <ExternalLink aria-hidden className="size-3.5 shrink-0" />
      <span className="sr-only"> (opens in a new tab)</span>
    </a>
  )
}

export default OutboundLink
