import { ShineBorder } from '@/components/ui/shine-border'
import dayjs from 'dayjs'
import { motion, useReducedMotion } from 'motion/react'
import { FC } from 'react'

const ease = [0.23, 1, 0.32, 1] as const

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
  const reduceMotion = useReducedMotion()

  const hidden = reduceMotion
    ? { opacity: 1 }
    : { opacity: 0, y: 12, filter: 'blur(4px)' }
  const visible = reduceMotion
    ? { opacity: 1 }
    : { opacity: 1, y: 0, filter: 'blur(0px)' }

  const enter = (delay: number) => ({
    initial: hidden,
    animate: visible,
    transition: {
      duration: reduceMotion ? 0 : 0.3,
      ease,
      delay: reduceMotion ? 0 : delay,
    },
  })

  return (
    <div className="w-full mb-12">
      <div className="flex flex-col-reverse items-center w-full mb-8 sm:flex-row sm:justify-between sm:items-start">
        <div className="mr-0 flex flex-col justify-center sm:mr-8">
          <motion.h1
            {...enter(0)}
            className="text-xl text-center font-serif font-medium leading-tight md:text-5xl mb-2 sm:text-left"
          >
            Hey 👋🏻, I'm Wlad
          </motion.h1>

          <motion.h2
            {...enter(0.1)}
            className="text-xl text-center font-serif font-light leading-tight md:text-2xl mb-2 sm:text-left"
          >
            Senior UI Engineer
          </motion.h2>

          <motion.p
            {...enter(0.2)}
            className="text-lg text-center leading-relaxed font-light text-foreground sm:text-left"
          >
            I build fast, accessible React and TypeScript products with complex
            UI and clean architecture.
            <br />
            Creator of{' '}
            <a
              href="https://www.nextbento.dev"
              target="_blank"
              rel="noreferrer"
              className="text-link"
            >
              NextBento
            </a>{' '}
            (Next.js SaaS boilerplate) and{' '}
            <a
              href="https://www.eventda.sh"
              target="_blank"
              rel="noreferrer"
              className="text-link"
            >
              EventDash
            </a>{' '}
            (product analytics).
          </motion.p>

          <motion.div
            {...enter(0.3)}
            className="w-1/4 h-px bg-border my-6 sm:my-4 mx-auto sm:mx-0"
          />

          <motion.p
            {...enter(0.4)}
            className="text-md text-center font-light text-muted-foreground tracking-wide italic sm:text-left"
          >
            Coffee-powered, detail-driven, and obsessed with UX.
          </motion.p>
        </div>

        <motion.div
          {...enter(0.1)}
          className="relative w-52 h-52 mb-6 sm:mb-0 overflow-hidden rounded-full"
        >
          <ShineBorder shineColor={['#A07CFE', '#FE8FB5', '#FFBE7B']} />

          <img
            className="img-outline object-cover w-full h-full rounded-full"
            src="./circle_me.png"
            alt="Portrait of Wlad"
          />
        </motion.div>
      </div>

      <motion.p
        {...enter(0.5)}
        className="text-md font-light leading-relaxed text-center italic text-foreground sm:text-left"
      >
        Total Experience:{' '}
        <span className="font-semibold tabular-nums">{totalYears}</span> years,{' '}
        <span className="font-semibold tabular-nums">{totalMonths}</span> months
        and <span className="font-semibold tabular-nums">{totalDays}</span> days
      </motion.p>
    </div>
  )
}

export default Bio
