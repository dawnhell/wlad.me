import { FC } from 'react'

const Education: FC = () => {
  return (
    <section id="education" className="py-12">
      <h2 className="mb-8 scroll-mt-8 font-serif text-3xl font-normal text-balance md:text-4xl">
        Education
      </h2>

      <article className="cv-role grid grid-cols-[2rem_minmax(0,1fr)] gap-x-4">
        <div className="relative flex justify-center">
          <span
            aria-hidden="true"
            className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-card p-1 text-xs font-medium shadow-[var(--shadow-border)]"
          >
            B
          </span>
        </div>

        <div className="flex min-w-0 flex-col gap-3 font-light md:flex-row md:items-start">
          <div className="flex min-w-0 flex-col gap-2 md:w-2/3">
            <h3 className="text-xl text-balance">Bachelor degree</h3>
            <p className="text-sm text-muted-foreground">
              Faculty of Mechanics and Mathematics
            </p>
            <div className="flex flex-col gap-2 text-sm leading-relaxed text-muted-foreground">
              <span>
                SPECIALTY
                <br />
                Mathematics and Information Technologies (Web-Programming and
                Internet Technologies)
              </span>
              <span>
                QUALIFICATION
                <br />
                Mathematician. IT Specialist
              </span>
            </div>
          </div>

          <div className="text-left md:w-1/3 md:text-right">
            <p className="mb-1 text-sm font-medium tabular-nums">
              Sep 2015 - Aug 2019
            </p>
            <p className="text-sm text-muted-foreground">
              Belarusian State University
            </p>
          </div>
        </div>
      </article>
    </section>
  )
}

export default Education
