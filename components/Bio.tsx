import React, { FC } from 'react';

const Bio: FC = () => (
  <div className="flex flex-col-reverse items-center w-full mb-16 sm:flex-row sm:justify-between sm:items-start">
    <div className="mr-0 flex flex-col justify-center sm:mr-8">
      <h1 className="text-3xl text-center font-bold font-['Roboto Slab'] text-slate-700 mb-2 sm:text-left">
        Hey, I&apos;m Wlad
      </h1>

      <p className="text-xl text-center font-['Roboto Slab'] text-slate-700 sm:text-left">
        Front-End developer <i>and</i>
      </p>

      <p className="text-xl text-center font-['Roboto Slab'] text-slate-700 sm:text-left">
        coffee addict
      </p>

      <div className="w-1/4 h-px bg-slate-300 my-6 sm:my-4 mx-auto sm:mx-0" />

      <p className="text-lg text-center font-['Roboto Slab'] text-slate-600 tracking-wide italic sm:text-left">
        Focused on results with exceptional quality.
        I create incredible UI interfaces with complicated behaviors
      </p>
    </div>

    <img
      className="object-cover rounded-full w-40 h-40 mb-6  sm:mb-0 drop-shadow-md"
      src="./circle_me.png"
      alt="That's me!"
    />
  </div>
);

export default Bio;
