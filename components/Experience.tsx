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
    logo: 'https://www.epam.com/etc/designs/epam-core/favicon/favicon-32x32.png',
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
