import Image from 'next/image';
import React, { FC } from 'react';

import githubIcon from '../assets/github-icon.svg';
import linkedinIcon from '../assets/linkedin-icon.svg';

const Header: FC = () => {
  return (
    <div className="container mx-auto flex items-center justify-between">
      <a
        href="https://www.wlad.me"
        className={`
          logo-link
          font-sans
          text-3xl
          text-rose-700
          font-bold
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
        <a href="https://github.com" className="mr-4 w-8 h-8">
          <Image
            src={githubIcon}
            alt="Github icon"
            width={32}
            height={32}
          />
        </a>

        <a href="https://github.com" className="w-8 h-8">
          <Image
            src={linkedinIcon}
            alt="Linkedin icon"
            width={32}
            height={32}
          />
        </a>
      </div>


      <style jsx>{`
        @keyframes gradientKeyframes {
          0% {
            background-position: 0 0;
          }

          25% {
            background-position: 25% 25%;
          }

          75% {
            background-position: 75% 75%;
          }

          100% {
            background-position: 100% 100%;
          }
        }

        .logo-link {
          -webkit-text-fill-color: transparent;
          background-size: 300% 300%;
          animation: gradientKeyframes 20s linear infinite alternate;
        }
      `}
      </style>
    </div>
  );
};

export default Header;
