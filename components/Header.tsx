import Image from 'next/image';
import React, { FC } from 'react';
import ReactGA from 'react-ga';

import githubIcon from '../assets/github-icon.svg';
import linkedinIcon from '../assets/linkedin-icon.svg';
import emailIcon from '../assets/email-icon.svg';

const Header: FC = () => {
  const onMailToClick = () => {
    ReactGA.event({
      category: 'User',
      action: 'Click on MailTo link'
    })
  }

  return (
    <div className="mx-auto flex flex-col items-center justify-between mb-10 sm:mb-16 sm:flex-row">
      <a
        href="https://www.wlad.me"
        className={`
        logo-link
        text-3xl
        text-rose-700
        font-bold
        font-['Roboto Slab']
        bg-clip-text
        bg-gradient-to-br
        from-sky-900
        via-purple-400
        to-pink-600
        mb-6
        sm:mb-0
    `}
      >
        WLAD.ME
      </a>

      <div className="flex items-center justify-between w-full sm:w-max">
        {/*<a href="/posts" className="simple-link font-bold mr-6 text-slate-600 text-lg tracking-wide">POSTS</a>*/}

        <a target="_blank" rel="noreferrer" href="./Wlad.me_CV.pdf" className="simple-link font-bold mr-6 text-slate-600 text-lg tracking-wide">RESUME</a>

        <div className="socials flex items-center justify-center">
          <a href="https://github.com/dawnhell" className="mr-2 w-7 h-7 transition duration-300 opacity-70 hover:scale-125 hover:opacity-100">
            <Image
              src={githubIcon}
              alt="Github icon"
              width={32}
              height={32}
            />
          </a>

          <a href="https://www.linkedin.com/in/wlad-me" className="mr-2 w-6 h-6 transition duration-300 opacity-70 hover:scale-125 hover:opacity-100">
            <Image
              src={linkedinIcon}
              alt="Linkedin icon"
              width={32}
              height={32}
            />
          </a>

          <a onClick={onMailToClick} href="mailto:wlad@wlad.me" className="w-8 h-8 transition duration-300 opacity-70 hover:scale-125 hover:opacity-100">
            <Image
              src={emailIcon}
              alt="Mail icon"
              width={32}
              height={32}
            />
          </a>
        </div>
      </div>
    </div>
  );
}

export default Header;
