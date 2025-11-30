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
        <span>nexos.ai is a platform for creating and managing AI agents.</span>
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
          Salesloft helps revenue teams take the right actions to close every
          deal with the only platform built around the sellers’ workflow.
        </span>

        <span>
          Actively participated in the development of{' '}
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
          Chrome Extension
        </span>

        <span>
          As a part of the Salesloft world - I took part in developing Starlight
          Design system(
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
          ) and main Salesloft web application.
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
          Was involved in the development of the main ExpressVPN products. I’ve
          been leading a product team of 5 which worked on the Subscriptions
          module. Maintained the full cycle of feature development, such as
          ideation and planning sessions, assigning the tasks, communication
          with stakeholders and shipping production-ready code.
        </span>

        <span>
          Developed and implemented A/B experiments on the Subscription module.
          Migrated from front-end monolith into React/TS stack as a
          micro-service.
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
          Worked on a large variety of projects in different fields: AI
          recognition systems, e-commerce modules, educational applications,
          landing pages and medical apps. Joined projects in the middle of
          development, as well as started them from scratch.
        </span>

        <span>
          One of the last projects was language learning application, where I’ve
          developed both on Web and Mobile. Was working together with FE and BE
          engineers, implemented new features and improvements. Developed from
          scratch and then maintained Mobile application on RN. Implemented
          tools for customer’s feedback collection and support.
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
    logo: 'https://pg.io/favicon.ico',
    description: (
      <>
        <span>
          Implemented new features and redesigns in company's BI system.
          Improved client side performance x10 times. Designed and implemented
          game clan's system with leader boards
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
          I've created a simple blogging platform application based on
          NodeJS/Angular. Source code:
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
          Worked on e-commerce and medical projects with React/Redux and Ruby
          stacks.
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
          Summer internship where I've studied the basics of HTML/JS/CSS,
          learned building tools such as Gulp and Webpack. Made several pet
          projects and plugins
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
