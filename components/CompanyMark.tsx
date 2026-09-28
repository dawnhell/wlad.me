import { useEffect, useRef, useState } from 'react'

interface CompanyMarkProps {
  src: string
  name: string
}

const CompanyMark = ({ src, name }: CompanyMarkProps) => {
  const [failed, setFailed] = useState(false)
  const imageRef = useRef<HTMLImageElement>(null)
  const initial = name.replace(/[^A-Za-z0-9]/g, '').slice(0, 1).toUpperCase()

  useEffect(() => {
    const image = imageRef.current
    if (image?.complete && image.naturalWidth === 0) setFailed(true)
  }, [src])

  return (
    <span className="relative z-10 flex size-8 shrink-0 items-center justify-center rounded-lg bg-card p-1 shadow-[var(--shadow-border)]">
      {failed ? (
        <span className="text-xs font-medium text-foreground" aria-hidden>
          {initial}
        </span>
      ) : (
        <img
          ref={imageRef}
          src={src}
          alt=""
          width={20}
          height={20}
          className="size-5 rounded-sm object-contain"
          onError={() => setFailed(true)}
          onLoad={(event) => {
            if (event.currentTarget.naturalWidth === 0) setFailed(true)
          }}
        />
      )}
    </span>
  )
}

export default CompanyMark
