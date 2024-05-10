import React, { FC } from 'react';

const Education: FC = () => {
  return (
    <div className="pt-16 border-t border-t-slate-200">
      <h2 className="text-2xl font-bold font-['Roboto Slab'] text-slate-700 mb-2 tracking-wide">Education</h2>

      <div className="mt-4 mb-8">
        <div className="flex justify-start items-baseline">
          <a
            target="_blank"
            rel="noreferrer"
            href="https://bsu.by/en/"
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
            BSU
          </a>

          <span className="text-base font-['Montserrat'] italic text-zinc-500">09.2015 - 08.2019</span>
        </div>

        <h3 className="text-xl text-slate-600 font-['Roboto Slab'] font-semibold mb-2">
          Faculty of Mechanics and Mathematics, Bachelor degree
        </h3>

        <p className="text-base text-slate-600 font-['Roboto Slab'] tracking-wide">
          <span className="font-normal italic">SPECIALTY </span> Mathematics and Information Technologies (Web-Programming and Internet Technologies)
        </p>

        <p className="text-base text-slate-600 font-['Roboto Slab'] tracking-wide">
          <span className="font-normal italic">QUALIFICATION</span> Mathematician. IT Specialist
        </p>
      </div>
    </div>
  );
};

export default Education;
