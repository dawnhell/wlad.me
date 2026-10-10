import { useId, type ComponentProps } from 'react'

import { cn } from '@/lib/utils'

interface GrainMeshProps extends ComponentProps<'div'> {
  variant?: 'landing' | 'beauty'
  animate?: boolean
}

export const GrainMesh = ({
  variant = 'landing',
  animate = true,
  className,
  ...props
}: GrainMeshProps) => {
  const filterId = `grain-${useId().replace(/:/g, '')}`

  return (
    <div
      aria-hidden="true"
      className={cn(
        'grain-mesh no-print pointer-events-none absolute inset-0 overflow-hidden',
        variant === 'landing' ? 'grain-mesh-landing' : 'grain-mesh-beauty',
        animate && 'grain-mesh-animate',
        className
      )}
      {...props}
    >
      <div className="grain-mesh-blobs" />
      <svg
        className="grain-mesh-noise"
        xmlns="http://www.w3.org/2000/svg"
      >
        <filter id={filterId}>
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.8"
            numOctaves="4"
            stitchTiles="stitch"
          />
          <feColorMatrix type="saturate" values="0" />
          <feComponentTransfer>
            <feFuncR type="linear" slope="0.45" />
            <feFuncG type="linear" slope="0.45" />
            <feFuncB type="linear" slope="0.45" />
          </feComponentTransfer>
        </filter>
        <rect width="100%" height="100%" filter={`url(#${filterId})`} />
      </svg>
    </div>
  )
}
