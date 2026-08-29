import Link from 'next/link'
import type { ReactNode } from 'react'

import {
  APP_DISPLAY_NAME,
  LAST_UPDATED,
  LEGAL_BASE_PATH,
  PRIVACY_PATH,
  TERMS_PATH,
} from '../../lib/legal/my-beauty-purse'

type LegalNavId = 'support' | 'privacy' | 'terms'

interface LegalDocumentProps {
  title: string
  eyebrow?: string
  children: ReactNode
  current: LegalNavId
}

const navItems: { id: LegalNavId; href: string; label: string }[] = [
  { id: 'support', href: LEGAL_BASE_PATH, label: 'Support' },
  { id: 'privacy', href: PRIVACY_PATH, label: 'Privacy Policy' },
  { id: 'terms', href: TERMS_PATH, label: 'Terms of Use' },
]

const LegalDocument = ({
  title,
  eyebrow = APP_DISPLAY_NAME,
  children,
  current,
}: LegalDocumentProps) => {
  return (
    <article className="w-full max-w-prose text-left">
      <p className="text-sm font-medium tracking-wide uppercase text-muted-foreground mb-2">
        {eyebrow}
      </p>
      <h1 className="text-3xl font-serif font-medium leading-tight mb-3 sm:text-4xl">
        {title}
      </h1>
      <p className="text-sm text-muted-foreground mb-8">
        Last updated: {LAST_UPDATED}
      </p>

      <nav
        aria-label="Legal pages"
        className="flex flex-wrap gap-x-4 gap-y-2 mb-10 pb-6 border-b border-border text-sm"
      >
        {navItems.map((item) => {
          const isCurrent = item.id === current
          return (
            <Link
              key={item.id}
              href={item.href}
              aria-current={isCurrent ? 'page' : undefined}
              className={
                isCurrent
                  ? 'font-medium text-foreground'
                  : 'underline underline-offset-4 decoration-primary text-foreground hover:text-primary'
              }
            >
              {item.label}
            </Link>
          )
        })}
      </nav>

      <div className="legal-prose space-y-4 text-base font-light leading-relaxed text-foreground [&_h2]:text-xl [&_h2]:font-serif [&_h2]:font-medium [&_h2]:mt-10 [&_h2]:mb-3 [&_h2]:text-foreground [&_p]:text-foreground [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-2 [&_ol]:list-decimal [&_ol]:pl-5 [&_ol]:space-y-2 [&_a]:underline [&_a]:underline-offset-4 [&_a]:decoration-primary [&_a]:hover:text-primary [&_strong]:font-medium">
        {children}
      </div>
    </article>
  )
}

export default LegalDocument
