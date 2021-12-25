import React, { FC } from 'react';

const About: FC = () => {
  return (
    <div className="pt-16 border-t border-t-slate-200">
      <h2 className="text-2xl font-bold font-['Roboto Slab'] text-neutral-600 mb-2 tracking-wide">Work Experience</h2>

      <div className="mt-4 mb-8">
        <div className="flex justify-start items-baseline">
          <a
            target="_blank"
            rel="noreferrer"
            href="https://www.altoros.com/"
            className={`
              company-link
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

        <h3>Frontend developer</h3>

        <p>
          This is some description
        </p>

        <div>
          <h4>Technologies</h4>

          <ul>
            <li>ReactJS, React-Native</li>
            <li>Typescript</li>
            <li>Redux/ReduxToolkit</li>
            <li>Styled-components/SASS</li>
            <li>i18n-js/i18next/formatjs</li>
            <li>Git submodules/NPM packages</li>
            <li>Webpack</li>
            <li>Jest/Testing library</li>
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
              company-link
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

        <h3>Frontend developer</h3>

        <p>
          This is some description
        </p>

        <div>
          <h4>Technologies</h4>

          <ul>
            <li>ReactJS</li>
            <li>NodeJS</li>
            <li>Vanilla JS</li>
            <li>Redux/Saga</li>
            <li>SASS</li>
            <li>Webpack</li>
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
              company-link
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

        <h3>Summer Intern - Fullstack developer</h3>

        <p>
          I&apos;ve created a simple blogging platform application based on Node/Angular.
          Source code: https://github.com/dawnhell/awesome-blog
        </p>

        <div>
          <h4>Technologies</h4>

          <ul>
            <li>Angular 6</li>
            <li>NodeJS/Express</li>
            <li>MongoDB</li>
            <li>Passport.js/Poet.js/ngx-markdown-editor</li>
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
              company-link
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

        <h3>Frontend developer</h3>

        <p>
          Worked on two projects with React/Redux and HTML/JS/CSS stacks.
        </p>

        <div>
          <h4>Technologies</h4>

          <ul>
            <li>ReactJS</li>
            <li>Redux/Saga</li>
            <li>Vanilla JS</li>
            <li>HTML/CSS/SASS</li>
            <li>i18next</li>
            <li>Webpack</li>
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
              company-link
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

        <h3>Summer intern - Frontend developer</h3>

        <p>
          Worked on two projects with React/Redux and HTML/JS/CSS stacks.
        </p>

        <div>
          <h4>Technologies</h4>

          <ul>
            <li>HTML/JS/CSS</li>
            <li>ReactJS</li>
            <li>Redux/Saga</li>
            <li>SASS</li>
            <li>Webpack</li>
          </ul>
        </div>

        <div className="w-1/2 h-px bg-slate-200 mt-8" />
      </div>

      <style jsx>{`
        @keyframes gradientKeyframesX {
          0% {
            background-position-x: 0;
          }

          25% {
            background-position-x: 25%;
          }

          75% {
            background-position-x: 75%;
          }

          100% {
            background-position-x: 100%;
          }
        }
          
        .company-link {
          background-image: linear-gradient(to right, #fde047BB, #bef264BB, #f0abfcBB, #fb7185BB);
          background-repeat: no-repeat;
          background-size: 300% 6px;
          background-position-y: 18px;
          transition: background-size 0.3s ease-out, background-position 0.3s ease-out;
          animation: gradientKeyframesX 20s linear infinite alternate;
        }
          
        .company-link:hover {
          background-size: 300% 26px;
          background-position: 0 2px;
        }
      `}
      </style>
    </div>
  );
};

export default About;
