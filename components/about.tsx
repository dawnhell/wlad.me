import React, { FC } from 'react';

const About: FC = () => {
  return (
    <div className="pt-16 border-t border-t-slate-200">
      <h2 className="text-2xl font-bold font-['Roboto Slab'] text-slate-700 mb-2 tracking-wide">Work Experience</h2>

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

        <h3 className="text-xl text-slate-600 font-['Roboto Slab'] font-semibold mb-4"><span className="font-normal italic">as</span> Frontend developer</h3>

        <p className="mb-4 text-base text-slate-600 font-['Roboto Slab'] tracking-wide italic">
          This is some description. Tailwind includes an expertly-crafted default color
          palette out-of-the-box that is a great starting point if you don’t
          have your own specific branding in mind.
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

        <h3 className="text-xl text-slate-600 font-['Roboto Slab'] font-semibold mb-4"><span className="font-normal italic">as</span> Frontend developer</h3>

        <p className="mb-4 text-base text-slate-600 font-['Roboto Slab'] tracking-wide italic">
          This is some description
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

        <h3 className="text-xl text-slate-600 font-['Roboto Slab'] font-semibold mb-4"><span className="font-normal italic">as</span> Summer Intern - Fullstack developer</h3>

        <p className="mb-4 text-base text-slate-600 font-['Roboto Slab'] tracking-wide italic">
          I&apos;ve created a simple blogging platform application based on Node/Angular.
          Source code: https://github.com/dawnhell/awesome-blog
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

        <h3 className="text-xl text-slate-600 font-['Roboto Slab'] font-semibold mb-4"><span className="font-normal italic">as</span> Frontend developer</h3>

        <p className="mb-4 text-base text-slate-600 font-['Roboto Slab'] tracking-wide italic">
          Worked on two projects with React/Redux and HTML/JS/CSS stacks.
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

        <h3 className="text-xl text-slate-600 font-['Roboto Slab'] font-semibold mb-4"><span className="font-normal italic">as</span> Summer intern - Frontend developer</h3>

        <p className="mb-4 text-base text-slate-600 font-['Roboto Slab'] tracking-wide italic">
          Worked on two projects with React/Redux and HTML/JS/CSS stacks.
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
