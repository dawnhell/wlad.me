import { FC } from 'react'

const Education: FC = () => {
  return (
    <div className="container">
      <div className="mx-auto max-w-7xl">
        <h2 className="mb-12 font-serif text-4xl font-medium leading-tight md:text-6xl">
          Education
        </h2>

        <div className="space-y-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-start font-light">
            <div className="md:w-2/3">
              <div className="mb-2 flex items-center gap-3">
                <h3 className="text-xl">Bachelor degree</h3>
              </div>

              <p className="text-muted-foreground mb-3 text-sm">
                Faculty of Mechanics and Mathematics
              </p>

              <p className="text-muted-foreground text-sm leading-relaxed flex flex-col gap-y-2">
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
              </p>
            </div>

            <div className="text-right md:w-1/3 md:text-right">
              <p className="mb-1 text-sm font-medium">Sep 2015 - Aug 2019</p>
              <p className="text-muted-foreground text-sm">
                Belarusian State University
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Education
