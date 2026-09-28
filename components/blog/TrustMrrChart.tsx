import { trustMrrEmbedUrl, type BlogSource } from '../../lib/blog-format'

const CHROME = 12
const CARD_HEIGHT = 336

const TrustMrrChart = ({
  name,
  sources,
  size = 'full',
}: {
  name: string
  sources: BlogSource[]
  size?: 'full' | 'compact'
}) => {
  const src = trustMrrEmbedUrl(sources)
  if (!src) return null

  const scale = size === 'compact' ? 0.8 : 1

  return (
    <div
      className={size === 'compact' ? 'w-full max-w-lg overflow-hidden rounded-2xl' : 'w-full overflow-hidden rounded-2xl'}
      style={{ height: Math.round(CARD_HEIGHT * scale) }}
    >
      <iframe
        src={src}
        title={`${name} revenue over the last 30 days, verified by TrustMRR`}
        loading="lazy"
        className="block origin-top-left border-0 bg-white"
        style={{
          width: `calc(${100 / scale}% + ${CHROME * 2}px)`,
          height: CARD_HEIGHT + CHROME * 2,
          colorScheme: 'light',
          transform: `scale(${scale}) translate(${-CHROME}px, ${-CHROME}px)`,
        }}
      />
    </div>
  )
}

export default TrustMrrChart
