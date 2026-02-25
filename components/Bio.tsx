import { ShineBorder } from '@/components/ui/shine-border'
import dayjs from 'dayjs'
import { FC } from 'react'

const Bio: FC = () => {
  const currentTime = dayjs()
  const startTime = dayjs('2017/07/01')
  const totalYears = currentTime.diff(startTime, 'years')
  const totalMonths = currentTime
    .subtract(totalYears, 'years')
    .diff(startTime, 'months')
  const totalDays = currentTime
    .subtract(totalYears, 'years')
    .subtract(totalMonths, 'months')
    .diff(startTime, 'days')

  return (
    <div className="w-full mb-12">
      <div className="flex flex-col-reverse items-center w-full mb-8 sm:flex-row sm:justify-between sm:items-start">
        <div className="mr-0 flex flex-col justify-center sm:mr-8">
          <h1 className="text-xl text-center font-serif font-medium leading-tight md:text-5xl mb-2 sm:text-left">
            Hey 👋🏻, I'm Wlad
          </h1>

          <h2 className="text-xl text-center font-serif font-light leading-tight md:text-2xl mb-2 sm:text-left">
            Senior Frontend Engineer
          </h2>

          <p className="text-lg text-center leading-relaxed font-light text-foreground sm:text-left">
            I build fast, accessible React and TypeScript products with complex
            UI and clean architecture. 
            <br />
            Creator of{' '}
            <a
              href="https://www.nextbento.dev"
              target="_blank"
              rel="noreferrer"
              className="underline underline-offset-4 decoration-primary text-foreground hover:text-primary focus:text-primary active:text-primary font-medium"
            >
              NextBento
            </a>{' '}
            (Next.js SaaS boilerplate) and{' '}
            <a
              href="https://www.apifast.dev"
              target="_blank"
              rel="noreferrer"
              className="underline underline-offset-4 decoration-primary text-foreground hover:text-primary focus:text-primary active:text-primary font-medium"
            >
              API Fast
            </a>{' '}
            (social media API).
          </p>

          {/* <p className="text-md text-center leading-relaxed font-light text-muted-foreground sm:text-left">
            {totalYears}+ years shipping for startups and enterprise teams. Open
            to full-time roles.
          </p> */}

          <div className="w-1/4 h-px bg-border my-6 sm:my-4 mx-auto sm:mx-0" />

          <p className="text-md text-center font-light text-muted-foreground tracking-wide italic sm:text-left">
            Coffee-powered, detail-obsessed, and obsessed with UX.
          </p>
        </div>

        <div className="relative w-52 h-52 mb-6 sm:mb-0 overflow-hidden rounded-full">
          <ShineBorder shineColor={['#A07CFE', '#FE8FB5', '#FFBE7B']} />

          <img
            className="object-cover w-full h-full "
            src="./circle_me.png"
            alt="Portrait of Wlad"
          />
        </div>
      </div>

      <div>
        <p className="text-md font-light leading-relaxed text-center italic text-foreground sm:text-left">
          Total Experience: <span className="font-semibold">{totalYears}</span>{' '}
          years, <span className="font-semibold">{totalMonths}</span> months and{' '}
          <span className="font-semibold">{totalDays}</span> days
        </p>
      </div>
    </div>
  )
}

export default Bio
