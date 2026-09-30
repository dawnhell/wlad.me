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

  const hidden = reduceMotion ? { opacity: 1 } : { opacity: 0, y: 8 }
  const visible = { opacity: 1, y: 0 }

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
    <div className="mb-4 w-full">
      <div className="flex w-full flex-col-reverse items-center gap-6 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex flex-col gap-3 sm:mr-8">
          <motion.h1
            {...enter(0)}
            className="text-balance text-center font-serif text-4xl font-normal leading-tight sm:text-left md:text-5xl"
          >
            Hey 👋🏻, I&apos;m Wlad
          </motion.h1>

          <motion.p
            {...enter(0.05)}
            className="text-balance text-center font-serif text-xl leading-tight text-foreground sm:text-left md:text-2xl"
          >
            Senior UI Engineer
          </motion.p>

          <motion.p
            {...enter(0.1)}
            className="text-center text-sm text-muted-foreground sm:text-left"
          >
            Warsaw, Poland
            <span aria-hidden="true"> · </span>
            Remote
            <span aria-hidden="true"> · </span>
            <a href="mailto:wlad@wlad.me" className="text-link">
              wlad@wlad.me
            </a>
          </motion.p>

          <motion.p
            {...enter(0.15)}
            className="text-pretty text-center text-lg font-light leading-relaxed text-foreground sm:text-left"
          >
            I build fast, accessible React and TypeScript products with complex
            UI and clean architecture.
          </motion.p>

          <motion.p
            {...enter(0.2)}
            className="text-center text-sm font-light text-foreground sm:text-left"
          >
            Total experience:{' '}
            <span className="font-semibold tabular-nums">{totalYears}</span>{' '}
            years,{' '}
            <span className="font-semibold tabular-nums">{totalMonths}</span>{' '}
            months and{' '}
            <span className="font-semibold tabular-nums">{totalDays}</span> days
          </motion.p>

          <motion.nav
            {...enter(0.25)}
            aria-label="CV sections"
            className="no-print flex flex-wrap justify-center gap-x-4 gap-y-2 text-sm sm:justify-start"
          >
            <a href="#products" className="text-link">
              Products
            </a>
            <a href="#experience" className="text-link">
              Experience
            </a>
            <a href="#education" className="text-link">
              Education
            </a>
          </motion.nav>
        </div>

        <motion.img
          {...enter(0.05)}
          className="img-outline size-52 shrink-0 rounded-full object-cover"
          src="/circle_me.webp"
          alt="Portrait of Wlad"
          width={624}
          height={588}
        />
      </div>
    </div>
  )
}

export default Bio
