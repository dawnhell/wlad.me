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
          <h1 className="text-3xl text-center font-serif font-medium leading-tight md:text-4xl mb-2 sm:text-left">
            Hey, I&apos;m Wlad
          </h1>

          <p className="text-lg text-center leading-relaxed font-light text-foreground sm:text-left">
            Senior Frontend developer <i>and</i>
          </p>

          <p className="text-lg text-center leading-relaxed font-light text-foreground sm:text-left">
            a coffee addict
          </p>

          <div className="w-1/4 h-px bg-border my-6 sm:my-4 mx-auto sm:mx-0" />

          <p className="text-md text-center font-light text-muted-foreground tracking-wide italic sm:text-left">
            I create incredible UI interfaces with complicated behaviors
          </p>
        </div>

        <div className="relative w-52 h-52 mb-6 sm:mb-0 overflow-hidden rounded-full">
          <ShineBorder shineColor={['#A07CFE', '#FE8FB5', '#FFBE7B']} />

          <img
            className="object-cover w-full h-full"
            src="./circle_me.png"
            alt="That's me!"
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
