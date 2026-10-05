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
    details: 'Indie Product • SaaS',
    period: 'Sep 2026 - Present',
    company: FOUNDER_PRODUCTS.complience.name,
    companyUrl: FOUNDER_PRODUCTS.complience.url,
    logo: FOUNDER_PRODUCTS.complience.logo,
    description: (
      <>
        <span>
          Website accessibility checker for site owners and agencies. Paste a
          URL, get WCAG issues plus cookies that fire before Accept, send a
          client-ready PDF, then re-run it on a schedule.
        </span>
      </>
    ),
    technologies: [
      'Next.js 16, React 19',
      'Playwright, axe-core',
      'Supabase, Stripe, Resend',
      'WCAG 2.2, cookie evidence',
    ],
  },
  {
    title: 'Founder',
    details: 'Indie Product • SaaS',
    period: 'Jan 2026 - Present',
    company: FOUNDER_PRODUCTS.nextbento.name,
    companyUrl: FOUNDER_PRODUCTS.nextbento.url,
    logo: FOUNDER_PRODUCTS.nextbento.logo,
    description: (
      <>
        <span>
          Next.js 16 SaaS boilerplate for indie hackers. Auth, Stripe, emails,
          teams, dashboard, docs, SEO—clone, configure, ship. Ships with 9 AI
          skills for Cursor, Claude Code, and other AI-powered IDEs.
        </span>
      </>
    ),
    technologies: [
      'Next.js 16, React 19',
      'Supabase, Stripe, Resend',
      'shadcn/ui',
      'Programmatic SEO, schema markup',
    ],
  },
  {
    title: 'Founder',
    details: 'Indie Product • SaaS',
    period: 'Dec 2025 - Present',
    company: FOUNDER_PRODUCTS.eventdash.name,
    companyUrl: FOUNDER_PRODUCTS.eventdash.url,
    logo: FOUNDER_PRODUCTS.eventdash.logo,
    description: (
      <>
        <span>
          Cookieless product analytics for small teams. Lightweight tracker,
          HTML goal attributes, funnels, and Core Web Vitals—without the GA4
          complexity.
        </span>
      </>
    ),
    technologies: [
      'Next.js, React, TypeScript',
      'Privacy-first analytics, MCP',
      'Funnels, goals, custom events',
    ],
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
            key={`${company}-${period}`}
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
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {technologies.join(' · ')}
                </p>
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
                ) : (
                  <p className="text-sm text-muted-foreground">{company}</p>
                )}
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
