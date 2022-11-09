import React, { FC } from 'react';

const Experience: FC = () => (
  <div className="py-16 border-t border-t-slate-200">
    <h2 className="text-2xl font-bold font-['Roboto Slab'] text-slate-700 mb-2 tracking-wide">Work Experience</h2>

    <div className="mt-4 mb-8">
      <div className="flex justify-start items-baseline">
        <a
          target="_blank"
          rel="noreferrer"
          href="https://www.altoros.com/"
          className={`
            simple-link
            mr-4
            tracking-wide
            text-xl
            text-zinc-600
            font-['Roboto Slab']
            font-bold
          `}
          style={{
            animationDuration: `${Math.round(Math.random() * 10) + 10}s`,
            animationDelay: `${Math.round(Math.random() * 10)}s`
          }}
        >
          ExpressVPN
        </a>

        <span className="text-base font-['Montserrat'] italic text-zinc-500">06.2022 - Present</span>
      </div>

      <h3 className="text-xl text-slate-600 font-['Roboto Slab'] font-semibold mb-4"><span className="font-normal italic">as</span> Senior Frontend developer</h3>

      <p className="mb-4 text-base text-slate-600 font-['Roboto Slab'] tracking-wide italic">
        Involved in development of the main ExpressVPN products
      </p>

      <div>
        <h4 className="text-lg text-slate-600 font-['Roboto Slab'] font-semibold mb-2">Technologies</h4>

        <ul className="list-disc list-inside pl-4">
          <li className="text-base text-slate-700 font-['Roboto Slab'] tracking-wide">Javascript, ReactJS</li>
          <li className="text-base text-slate-700 font-['Roboto Slab'] tracking-wide">Typescript</li>
          <li className="text-base text-slate-700 font-['Roboto Slab'] tracking-wide">HUGO, Slim</li>
          <li className="text-base text-slate-700 font-['Roboto Slab'] tracking-wide">Ruby, RoR</li>
          <li className="text-base text-slate-700 font-['Roboto Slab'] tracking-wide">Jest/RSpec/VCR</li>
          <li className="text-base text-slate-700 font-['Roboto Slab'] tracking-wide">Git submodules/NPM packages/Monorepos</li>
        </ul>
      </div>

      <div className="w-1/2 h-px bg-slate-200 mt-8" />
    </div>

    <div className="mt-4 mb-8">
      <div className="flex justify-start items-baseline">
        <a
          target="_blank"
          rel="noreferrer"
          href="https://www.altoros.com/"
          className={`
            simple-link
            mr-4
            tracking-wide
            text-xl
            text-zinc-600
            font-['Roboto Slab']
            font-bold
            uppercase
          `}
          style={{
            animationDuration: `${Math.round(Math.random() * 10) + 10}s`,
            animationDelay: `${Math.round(Math.random() * 10)}s`
          }}
        >
          Altoros
        </a>

        <span className="text-base font-['Montserrat'] italic text-zinc-500">03.2019 - Present</span>
      </div>

      <h3 className="text-xl text-slate-600 font-['Roboto Slab'] font-semibold mb-4"><span className="font-normal italic">as</span> Frontend developer</h3>

      <p className="mb-4 text-base text-slate-600 font-['Roboto Slab'] tracking-wide italic">
        Working on a large variety of projects in different fields: AI recognition systems,
        e-commerce modules, educational applications, landing pages and medical apps.
        Joined projects in the middle of development, as well as started them from scratch
      </p>

      <div>
        <h4 className="text-lg text-slate-600 font-['Roboto Slab'] font-semibold mb-2">Technologies</h4>

        <ul className="list-disc list-inside pl-4">
          <li className="text-base text-slate-700 font-['Roboto Slab'] tracking-wide">ReactJS, React-Native</li>
          <li className="text-base text-slate-700 font-['Roboto Slab'] tracking-wide">Typescript</li>
          <li className="text-base text-slate-700 font-['Roboto Slab'] tracking-wide">Redux/ReduxToolkit</li>
          <li className="text-base text-slate-700 font-['Roboto Slab'] tracking-wide">Styled-components/SASS</li>
          <li className="text-base text-slate-700 font-['Roboto Slab'] tracking-wide">i18n-js/i18next/formatjs</li>
          <li className="text-base text-slate-700 font-['Roboto Slab'] tracking-wide">Git submodules/NPM packages</li>
          <li className="text-base text-slate-700 font-['Roboto Slab'] tracking-wide">Webpack</li>
          <li className="text-base text-slate-700 font-['Roboto Slab'] tracking-wide">Jest/Testing library</li>
        </ul>
      </div>

      <div className="w-1/2 h-px bg-slate-200 mt-8" />
    </div>

    <div className="mt-4 mb-8">
      <div className="flex justify-start items-baseline">
        <a
          target="_blank"
          rel="noreferrer"
          href="https://playgendary.com/en/"
          className={`
            simple-link
            mr-4
            tracking-wide
            text-xl
            text-zinc-600
            font-['Roboto Slab']
            font-bold
            uppercase
          `}
          style={{
            animationDuration: `${Math.round(Math.random() * 10) + 10}s`,
            animationDelay: `${Math.round(Math.random() * 10)}s`
          }}
        >
          Playgendary
        </a>

        <span className="text-base font-['Montserrat'] italic text-zinc-500">09.2018 - 02.2019</span>
      </div>

      <h3 className="text-xl text-slate-600 font-['Roboto Slab'] font-semibold mb-4"><span className="font-normal italic">as</span> Frontend developer</h3>

      <p className="mb-4 text-base text-slate-600 font-['Roboto Slab'] tracking-wide italic">
        Implemented new features and redesigns in company&apos;s BI system.
        Improved client side performance x10 times.
        Designed and implemented game clan&apos;s system with leader boards
      </p>

      <div>
        <h4 className="text-lg text-slate-600 font-['Roboto Slab'] font-semibold mb-2">Technologies</h4>

        <ul className="list-disc list-inside pl-4">
          <li className="text-base text-slate-700 font-['Roboto Slab'] tracking-wide">ReactJS</li>
          <li className="text-base text-slate-700 font-['Roboto Slab'] tracking-wide">NodeJS</li>
          <li className="text-base text-slate-700 font-['Roboto Slab'] tracking-wide">Vanilla JS</li>
          <li className="text-base text-slate-700 font-['Roboto Slab'] tracking-wide">Redux/Saga</li>
          <li className="text-base text-slate-700 font-['Roboto Slab'] tracking-wide">SASS</li>
          <li className="text-base text-slate-700 font-['Roboto Slab'] tracking-wide">Webpack</li>
        </ul>
      </div>

      <div className="w-1/2 h-px bg-slate-200 mt-8" />
    </div>

    <div className="mt-4 mb-8">
      <div className="flex justify-start items-baseline">
        <a
          target="_blank"
          rel="noreferrer"
          href="https://www.epam.com/"
          className={`
            simple-link
            mr-4
            tracking-wide
            text-xl
            text-zinc-600
            font-['Roboto Slab']
            font-bold
            uppercase
          `}
          style={{
            animationDuration: `${Math.round(Math.random() * 10) + 10}s`,
            animationDelay: `${Math.round(Math.random() * 10)}s`
          }}
        >
          EPAM
        </a>

        <span className="text-base font-['Montserrat'] italic text-zinc-500">07.2018 - 08.2018</span>
      </div>

      <h3 className="text-xl text-slate-600 font-['Roboto Slab'] font-semibold mb-4"><span className="font-normal italic">as</span> Summer Intern - Fullstack developer</h3>

      <p className="mb-4 text-base text-slate-600 font-['Roboto Slab'] tracking-wide italic">
        I&apos;ve created a simple blogging platform application based on <span className="font-semibold">NodeJS/Angular</span>.
        Source code:{' '}
        <a
          target="_blank"
          rel="noreferrer"
          href="https://github.com/dawnhell/awesome-blog"
          className="simple-link font-semibold"
          style={{
            animationDuration: `${Math.round(Math.random() * 10) + 10}s`,
            animationDelay: `${Math.round(Math.random() * 10)}s`
          }}
        >
          @dawnhell/awesome-blog
        </a>
      </p>

      <div>
        <h4 className="text-lg text-slate-600 font-['Roboto Slab'] font-semibold mb-2">Technologies</h4>

        <ul className="list-disc list-inside pl-4">
          <li className="text-base text-slate-700 font-['Roboto Slab'] tracking-wide">Angular 6</li>
          <li className="text-base text-slate-700 font-['Roboto Slab'] tracking-wide">NodeJS/Express</li>
          <li className="text-base text-slate-700 font-['Roboto Slab'] tracking-wide">MongoDB</li>
          <li className="text-base text-slate-700 font-['Roboto Slab'] tracking-wide">Passport.js/Poet.js/ngx-markdown-editor</li>
        </ul>
      </div>

      <div className="w-1/2 h-px bg-slate-200 mt-8" />
    </div>

    <div className="mt-4 mb-8">
      <div className="flex justify-start items-baseline">
        <a
          target="_blank"
          rel="noreferrer"
          href="https://www.hiqo-solutions.com/"
          className={`
            simple-link
            mr-4
            tracking-wide
            text-xl
            text-zinc-600
            font-['Roboto Slab']
            font-bold
            uppercase
          `}
          style={{
            animationDuration: `${Math.round(Math.random() * 10) + 10}s`,
            animationDelay: `${Math.round(Math.random() * 10)}s`
          }}
        >
          HiQo Solutions, Inc.
        </a>

        <span className="text-base font-['Montserrat'] italic text-zinc-500">09.2017 - 02.2018</span>
      </div>

      <h3 className="text-xl text-slate-600 font-['Roboto Slab'] font-semibold mb-4"><span className="font-normal italic">as</span> Frontend developer</h3>

      <p className="mb-4 text-base text-slate-600 font-['Roboto Slab'] tracking-wide italic">
        Worked on e-commerce and medical projects with <span className="font-semibold">React/Redux</span> and <span className="font-semibold">Ruby</span> stacks.
      </p>

      <div>
        <h4 className="text-lg text-slate-600 font-['Roboto Slab'] font-semibold mb-2">Technologies</h4>

        <ul className="list-disc list-inside pl-4">
          <li className="text-base text-slate-700 font-['Roboto Slab'] tracking-wide">ReactJS</li>
          <li className="text-base text-slate-700 font-['Roboto Slab'] tracking-wide">Redux/Saga</li>
          <li className="text-base text-slate-700 font-['Roboto Slab'] tracking-wide">Vanilla JS</li>
          <li className="text-base text-slate-700 font-['Roboto Slab'] tracking-wide">HTML/CSS/SASS</li>
          <li className="text-base text-slate-700 font-['Roboto Slab'] tracking-wide">i18next</li>
          <li className="text-base text-slate-700 font-['Roboto Slab'] tracking-wide">Webpack</li>
        </ul>
      </div>

      <div className="w-1/2 h-px bg-slate-200 mt-8" />
    </div>

    <div className="mt-4">
      <div className="flex justify-start items-baseline">
        <a
          target="_blank"
          rel="noreferrer"
          href="https://www.hiqo-solutions.com/"
          className={`
            simple-link
            mr-4
            tracking-wide
            text-xl
            text-zinc-600
            font-['Roboto Slab']
            font-bold
            uppercase
          `}
          style={{
            animationDuration: `${Math.round(Math.random() * 10) + 10}s`,
            animationDelay: `${Math.round(Math.random() * 10)}s`
          }}
        >
          HiQo Solutions, Inc.
        </a>

        <span className="text-base font-['Montserrat'] italic text-zinc-500">06.2017 - 08.2017</span>
      </div>

      <h3 className="text-xl text-slate-600 font-['Roboto Slab'] font-semibold mb-4"><span className="font-normal italic">as</span> Summer intern - Frontend developer</h3>

      <p className="mb-4 text-base text-slate-600 font-['Roboto Slab'] tracking-wide italic">
        Summer internship where I&apos;ve studied the basics of <span className="font-semibold">HTML/JS/CSS</span>,
        learned building tools such as <span className="font-semibold">Gulp</span> and <span className="font-semibold">Webpack</span>.
        Made several pet projects and plugins
      </p>

      <div>
        <h4 className="text-lg text-slate-600 font-['Roboto Slab'] font-semibold mb-2">Technologies</h4>

        <ul className="list-disc list-inside pl-4">
          <li className="text-base text-slate-700 font-['Roboto Slab'] tracking-wide">HTML/JS/CSS</li>
          <li className="text-base text-slate-700 font-['Roboto Slab'] tracking-wide">ReactJS</li>
          <li className="text-base text-slate-700 font-['Roboto Slab'] tracking-wide">Redux/Saga</li>
          <li className="text-base text-slate-700 font-['Roboto Slab'] tracking-wide">SASS</li>
          <li className="text-base text-slate-700 font-['Roboto Slab'] tracking-wide">Webpack</li>
        </ul>
      </div>
    </div>
  </div>
);

export default Experience;
