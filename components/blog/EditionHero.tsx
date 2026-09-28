import Image from 'next/image'

import type { Hero } from '../../lib/blog-format'
import OutboundLink from './OutboundLink'

const EditionHero = ({ hero }: { hero: Hero }) => {
  return (
    <figure className="w-full">
      <div className="relative h-52 overflow-hidden rounded-2xl sm:h-72">
        <Image
          src={hero.src}
          alt={hero.alt}
          fill
          priority
          sizes="(min-width: 768px) 768px, 100vw"
          className="img-outline object-cover"
        />
      </div>
      <figcaption className="mt-2 text-xs text-muted-foreground">
        Photo by <OutboundLink href={hero.creditUrl}>{hero.credit}</OutboundLink>
        <span aria-hidden> · </span>
        {hero.license}
      </figcaption>
    </figure>
  )
}

export default EditionHero
