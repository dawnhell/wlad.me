import { FC } from 'react'

import { FOUNDER_PRODUCTS } from '../lib/site'
import CompanyMark from './CompanyMark'

interface ExperienceItem {
  title: string
  details: string
  period: string
  company: string
  companyUrl?: string
  logo: string
  description: React.ReactNode
  technologies: string[]
}

interface ExperienceProps {
  experience: ExperienceItem[]
}

const FOUNDER_APPS = [
  {
    ...FOUNDER_PRODUCTS.gamezz,
    description:
      'Puzzles, arcade, racing, and platform. Open one in the tab. No account, and the score stays in the browser.',
    stack: 'TanStack Start, React 19, Tailwind CSS, shadcn/ui',
  },
  {
    ...FOUNDER_PRODUCTS.numby,
    description:
      'Drop a PDF statement or invoice, check the rows, then download Excel, CSV, or an e-invoice. The file is deleted when the conversion finishes.',
    stack: 'Next.js 16, React 19, Supabase, Resend, shadcn/ui',
  },
  {
    ...FOUNDER_PRODUCTS.complience,
    description:
      'Paste a URL, get WCAG issues plus cookies that fire before Accept, send a client-ready PDF, then re-run it on a schedule.',
    stack: 'Next.js 16, React 19, Playwright, axe-core, Supabase, Stripe, Resend',
  },
  {
    ...FOUNDER_PRODUCTS.nextbento,
    description:
      'Auth, Stripe, emails, teams, a dashboard, and docs. Clone it, configure it, and ship. It also comes with AI skills for Cursor and Claude Code.',
    stack: 'Next.js 16, React 19, Supabase, Stripe, Resend, shadcn/ui',
  },
  {
    ...FOUNDER_PRODUCTS.eventdash,
    description:
      'Cookieless analytics for small teams. A lightweight tracker, funnels, and Core Web Vitals.',
    stack: 'Next.js, React, TypeScript, MCP',
  },
] as const

const MY_EXPERIENCE: ExperienceItem[] = [
  {
    title: 'Senior UI Engineer',
    details: 'Full-Time • Remote • Warsaw, Poland',
    period: 'Apr 2026 - Present',
    company: 'constructor.com',
    companyUrl: 'https://constructor.com',
    logo: 'https://info.constructor.io/hubfs/constructor-favicon-2026.svg',
    description: (
      <>
        <span>
          Working on a team that enables prospects to experience the full demo
          flow of Constructor services.
        </span>
      </>
    ),
    technologies: [
      'Typescript, Javascript, ReactJS, Next.js, Shadcn/ui',
      'Cypress, Playwright',
    ],
  },
  {
    title: 'Senior Frontend Engineer',
    details: 'Full-Time • Remote • Warsaw, Poland',
    period: 'Aug 2025 - Aug 2026',
    company: 'nexos.ai',
    companyUrl: 'https://nexos.ai',
    logo: 'https://sb.nordcdn.com/m/75987b0fe19b755/original/nexos-favicon-32x32.png',
    description: (
      <>
        <span>
          Building the UI for an AI agent platform, focused on fast workflows,
          design consistency, and product polish.
        </span>

        <span>
          Maintaining marketing website, using Storyblok CMS/Astro/SolidJS, working closely with
          designers and marketing team. 
        </span>
      </>
    ),
    technologies: [
      'Typescript, ReactJS, react-router, TailwindCSS, Shadcn/UI',
      'Storyblok CMS, Astro, SolidJS',
      'Playwright, @testing-library',
      'PNPM workspaces',
    ],
  },
  {
    title: 'Founder',
    details: 'Indie products',
    period: 'Dec 2025 - Present',
    company: '',
    logo: '/favicon-32x32.png',
    description: (
      <ul className="flex flex-col gap-4">
        {FOUNDER_APPS.map((product) => (
          <li key={product.name} className="flex items-start gap-3">
            <CompanyMark src={product.logo} name={product.name} />
            <span className="flex min-w-0 flex-col gap-1">
              <a
                href={product.url}
                target="_blank"
                rel="noreferrer"
                className="text-link w-fit text-sm"
              >
                {product.name}
              </a>
              <span>{product.description}</span>
              <span>
                <span className="font-medium text-foreground">Tech stack:</span>{' '}
                {product.stack}
              </span>
            </span>
          </li>
        ))}
      </ul>
    ),
    technologies: [],
  },
  {
    title: 'Senior UI Engineer',
    details: 'Full-Time • Remote • Warsaw, Poland',
    period: 'Mar 2024 - Jun 2025',
    company: 'Salesloft',
    companyUrl: 'https://www.salesloft.com',
    logo: 'https://www.salesloft.com/favicon.ico',
    description: (
      <>
        <span>
          Built revenue team workflows on a product designed around sellers’
          daily motions.
        </span>

        <span>
          Built and shipped{' '}
          <a
            target="_blank"
            rel="noreferrer"
            href="https://chromewebstore.google.com/detail/salesloft-connect/ejgmneenioanldgngdomlfnbcbffmchf"
            className="text-link text-sm"
          >
            Salesloft Connect
          </a>{' '}
          Chrome Extension.
        </span>

        <span>
          Contributed to the Starlight design system (
          <a
            target="_blank"
            rel="noreferrer"
            href="https://salesloft.design/"
            className="text-link text-sm tracking-wide"
          >
            salesloft.design
          </a>
          ) and the core Salesloft web application.
        </span>
      </>
    ),
    technologies: [
      'Javascript, ReactJS, Chrome Extensions, background workers, content scripts',
      'Typescript',
      'styled-components',
      'Ruby, RoR',
      'Jest, Playwright, @testing-library',
      'Git submodules, PNPM workspaces, Monorepos',
    ],
  },
  {
    title: 'Staff Frontend developer',
    details: 'Full-Time • Remote • Warsaw, Poland',
    period: 'Jul 2022 - Feb 2024',
    company: 'ExpressVPN',
    companyUrl: 'https://www.expressvpn.com',
    logo: 'https://www.expressvpn.com/favicon.ico',
    description: (
      <>
        <span>
          Led a 5-person product team on the Subscriptions module, owning
          roadmap, delivery, and stakeholder communication end to end.
        </span>

        <span>
          Ran A/B experiments and migrated the module from a front-end monolith
          to a React/TypeScript micro-service.
        </span>
      </>
    ),
    technologies: [
      'Javascript, ReactJS',
      'Typescript',
      'NextJS, NX',
      'ChakraUI, TailwindCSS, Emotion',
      'LaunchDarkly',
      'Ruby, RoR, HUGO, Slim',
      'Jest, RSpec, VCR',
      'Git submodules, NPM packages, Monorepos',
    ],
  },
  {
    title: 'Senior Frontend developer',
    details: 'Full-Time • Remote • Warsaw, Poland',
    period: 'Mar 2019 - Aug 2024',
    company: 'Altoros',
    companyUrl: 'https://www.altoros.com',
    logo: 'https://www.altoros.com/assets/favicon.ico',
    description: (
      <>
        <span>
          Delivered AI, e-commerce, education, landing, and medical apps—joining
          midstream or starting from zero depending on the project.
        </span>

        <span>
          Built a language-learning product across web and mobile, shipping new
          features with FE/BE teams and owning a React Native app from scratch
          through long-term maintenance.
        </span>
      </>
    ),
    technologies: [
      'ReactJS, React-Native',
      'Typescript',
      'Redux, ReduxToolkit',
      'Styled-components, SASS',
      'i18n-js, i18next/formatjs',
      'Git submodules, NPM packages',
      'Webpack',
      'Jest, @testing-library',
    ],
  },
  {
    title: 'Frontend developer',
    details: 'Full-Time • Onsite',
    period: 'Sep 2018 - Mar 2019',
    company: 'Playgendary',
    companyUrl: 'https://pg.io',
    logo: 'https://pg.io/favicon.ico',
    description: (
      <>
        <span>
          Shipped BI system redesigns and delivered a 10× client-side
          performance boost. Built a clan system with leaderboards.
        </span>
      </>
    ),
    technologies: [
      'ReactJS',
      'NodeJS',
      'Vanilla JS',
      'Redux, Saga',
      'SASS',
      'Webpack',
    ],
  },
  {
    title: 'Summer intern - Frontend developer',
    details: 'Full-Time • Onsite',
    period: 'Jun 2018 - Aug 2018',
    company: 'EPAM',
    companyUrl: 'https://www.epam.com',
    logo: 'https://www.epam.com/favicon.ico',
    description: (
      <>
        <span>
          Built a simple blogging platform with NodeJS and Angular. Source code:
          <a
            target="_blank"
            rel="noreferrer"
            href="https://github.com/dawnhell/awesome-blog"
            className="text-link text-sm"
          >
            @dawnhell/awesome-blog
          </a>
        </span>
      </>
    ),
    technologies: [
      'Angular 6',
      'NodeJS, Express',
      'MongoDB',
      'Passport.js, Poet.js, ngx-markdown-editor',
    ],
  },
  {
    title: 'Frontend developer',
    details: 'Full-Time • Onsite',
    period: 'Sep 2017 - Feb 2018',
    company: 'HiQo Solutions, Inc.',
    companyUrl: 'https://www.hiqo-solutions.com',
    logo: 'https://www.hiqo-solutions.com/assets/FAVICON_32x32.svg',
    description: (
      <>
        <span>
          Built e-commerce and medical UIs with React/Redux on Ruby stacks.
        </span>
      </>
    ),
    technologies: [
      'ReactJS',
      'Redux, Saga',
      'Vanilla JS',
      'HTML/CSS/SASS',
      'i18next',
      'Webpack',
    ],
  },
  {
    title: 'Summer intern - Frontend developer',
    details: 'Full-Time • Onsite',
    period: 'Jun 2017 - Aug 2017',
    company: 'HiQo Solutions, Inc.',
    companyUrl: 'https://www.hiqo-solutions.com',
    logo: 'https://www.hiqo-solutions.com/assets/FAVICON_32x32.svg',
    description: (
      <>
        <span>
          Learned HTML/CSS/JS foundations, built tooling with Gulp/Webpack, and
          shipped small projects and plugins.
        </span>
      </>
    ),
    technologies: [
      'HTML, JS, CSS',
      'Gulp, Webpack',
      'ReactJS',
      'Redux, Saga',
      'Vanilla JS',
    ],
  },
]

const ExperienceItem: FC<ExperienceProps> = ({ experience }) => {
  return (
    <div className="flex flex-col">
      {experience.map(
        (
          {
            title,
            details,
            period,
            company,
            companyUrl,
            logo,
            description,
            technologies,
          },
          idx
        ) => (
          <article
            key={`${title}-${period}`}
            className="cv-role grid grid-cols-[2rem_minmax(0,1fr)] gap-x-4 pb-8 last:pb-0"
          >
            <div className="relative flex justify-center">
              <CompanyMark src={logo} name={company} />
              {idx < experience.length - 1 ? (
                <span className="absolute top-8 bottom-0 w-px bg-border" />
              ) : null}
            </div>

            <div className="flex min-w-0 flex-col gap-3 font-light md:flex-row md:items-start">
              <div className="flex min-w-0 flex-col gap-2 md:w-2/3">
                <h3 className="text-xl text-balance">{title}</h3>
                <p className="text-sm text-muted-foreground">{details}</p>
                <div className="flex flex-col gap-2 text-sm leading-relaxed text-muted-foreground">
                  {description}
                </div>
                {technologies.length > 0 ? (
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {technologies.join(' · ')}
                  </p>
                ) : null}
              </div>

              <div className="text-left md:w-1/3 md:text-right">
                <p className="mb-1 text-sm font-medium tabular-nums">{period}</p>
                {companyUrl ? (
                  <a
                    href={companyUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-link text-sm"
                  >
                    {company}
                  </a>
                ) : company ? (
                  <p className="text-sm text-muted-foreground">{company}</p>
                ) : null}
              </div>
            </div>
          </article>
        )
      )}
    </div>
  )
}

const Experience: FC = () => (
  <section id="experience" className="py-12">
    <h2 className="mb-8 scroll-mt-8 font-serif text-3xl font-normal text-balance md:text-4xl">
      Experience
    </h2>

    <ExperienceItem experience={MY_EXPERIENCE} />
  </section>
)

export default Experience
