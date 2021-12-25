import Image from 'next/image';
import React, { FC } from 'react';

import githubIcon from '../assets/github-icon.svg';
import linkedinIcon from '../assets/linkedin-icon.svg';
import emailIcon from '../assets/email-icon.svg';

const Header: FC = () => {
  return (
    <div className="mx-auto flex items-center justify-between mb-16">
      <a
        href="https://www.wlad.me"
        className={`
          logo-link
          font-sans
          text-3xl
          text-rose-700
          font-bold
          font-['Roboto Slab']
          bg-clip-text
          bg-gradient-to-br
          from-sky-900
          via-purple-400
          to-pink-600
      `}
      >
        WLAD.ME
      </a>

      <div className="socials flex items-center justify-center">
        <a href="https://github.com/dawnhell" className="mr-3 w-7 h-7 transition duration-300 opacity-70 hover:scale-125 hover:opacity-100">
          <Image
            src={githubIcon}
            alt="Github icon"
            width={32}
            height={32}
          />
        </a>

        <a href="https://www.linkedin.com/in/wlad-me" className="mr-3 w-6 h-6 transition duration-300 opacity-70 hover:scale-125 hover:opacity-100">
          <Image
            src={linkedinIcon}
            alt="Linkedin icon"
            width={32}
            height={32}
          />
        </a>

        <a href="mailto:uladzislau.klachkou.work@gmail.com" className="w-8 h-8 transition duration-300 opacity-70 hover:scale-125 hover:opacity-100">
          <Image
            src={emailIcon}
            alt="Mail icon"
            width={32}
            height={32}
          />
        </a>
      </div>
    </div>
  );
};

export default Header;
