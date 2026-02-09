import { FC } from 'react'

interface ExperienceItem {
  title: string
  details: string
  period: string
  company: string
  logo: string
  description: React.ReactNode
  technologies: string[]
}

interface ExperienceProps {
  experience: ExperienceItem[]
}

const MY_EXPERIENCE: ExperienceItem[] = [
  {
    title: 'Senior Frontend Engineer',
    details: 'Full-Time • Remote • Warsaw, Poland',
    period: 'Aug 2025 - Present',
    company: 'nexos.ai',
    logo: 'https://sb.nordcdn.com/m/75987b0fe19b755/original/nexos-favicon-32x32.png',
    description: (
      <>
        <span>
          Building the UI for an AI agent platform, focused on fast workflows,
          design consistency, and product polish.
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
    title: 'Senior UI Engineer',
    details: 'Full-Time • Remote • Warsaw, Poland',
    period: 'Mar 2024 - Jun 2025',
    company: 'Salesloft',
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
            className={`
              text-sm
              underline underline-offset-4 decoration-primary
              text-foreground hover:text-primary focus:text-primary active:text-primary font-medium
            `}
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
            className={`
              tracking-wide
              text-sm
              underline underline-offset-4 decoration-primary
              text-foreground hover:text-primary focus:text-primary active:text-primary font-medium
            `}
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
    logo: 'data:image/jpeg;base64,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',
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
    logo: 'data:image/png;base64,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',
    description: (
      <>
        <span>
          Built a simple blogging platform with NodeJS and Angular. Source code:
          <a
            target="_blank"
            rel="noreferrer"
            href="https://github.com/dawnhell/awesome-blog"
            className={`
              text-sm
              underline underline-offset-4 decoration-primary
              text-foreground hover:text-primary focus:text-primary active:text-primary font-medium
            `}
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
    <div className="space-y-8">
      {experience.map(
        (
          { title, details, period, company, logo, description, technologies },
          idx
        ) => (
          <div
            key={idx}
            className="border-border border-b pb-6 last:border-b-0"
          >
            <div className="flex flex-col gap-4 md:flex-row md:items-start font-light">
              <div className="md:w-2/3">
                <div className="mb-2 flex items-center gap-3">
                  <img
                    src={logo}
                    alt={`${company} logo`}
                    className="h-5 object-contain"
                  />

                  <h3 className="text-xl">{title}</h3>
                </div>

                <p className="text-muted-foreground mb-3 text-sm">{details}</p>

                <p className="text-muted-foreground text-sm leading-relaxed flex flex-col gap-y-2 mb-3">
                  {description}
                </p>

                <p className="text-muted-foreground text-sm leading-relaxed gap-y-2">
                  <span>Technologies:</span>
                </p>

                <ul className="list-disc list-inside pl-4 text-muted-foreground text-sm leading-relaxed">
                  {technologies.map((technology) => (
                    <li key={technology}>{technology}</li>
                  ))}
                </ul>
              </div>

              <div className="text-right md:w-1/3 md:text-right">
                <p className="mb-1 text-sm font-medium">{period}</p>
                <p className="text-muted-foreground text-sm">{company}</p>
              </div>
            </div>
          </div>
        )
      )}
    </div>
  )
}

const Experience: FC = () => (
  <div className="py-16">
    <div className="container">
      <div className="mx-auto max-w-7xl">
        <h2 className="mb-12 font-serif text-4xl font-medium leading-tight md:text-6xl">
          Work Experience
        </h2>

        <ExperienceItem experience={MY_EXPERIENCE} />
      </div>
    </div>
  </div>
)

export default Experience
