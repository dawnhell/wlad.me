'use client'

import { ThumbsDown, ThumbsUp } from 'lucide-react'
import { motion, useReducedMotion } from 'motion/react'
import { useEffect, useState } from 'react'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

const STORAGE_KEY = 'boring-saas-votes'

type Vote = 'up' | 'down'

const BURST = [
  { x: -12, y: -14 },
  { x: -4, y: -18 },
  { x: 6, y: -16 },
  { x: 14, y: -10 },
  { x: 16, y: -2 },
]

const readVotes = (): Record<string, Vote> => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return {}
    const parsed: unknown = JSON.parse(raw)
    if (!parsed || typeof parsed !== 'object') return {}
    const votes: Record<string, Vote> = {}
    for (const [slug, value] of Object.entries(parsed)) {
      if (value === 'up' || value === 'down') votes[slug] = value
    }
    return votes
  } catch {
    return {}
  }
}

const writeVote = (slug: string, vote: Vote | null) => {
  try {
    const votes = readVotes()
    if (vote) votes[slug] = vote
    else delete votes[slug]
    localStorage.setItem(STORAGE_KEY, JSON.stringify(votes))
  } catch {
    // Private mode and quota errors leave the on-screen vote in place.
  }
}

const Burst = ({ tone }: { tone: Vote }) => (
  <span className="pointer-events-none absolute inset-0" aria-hidden>
    {BURST.map((dot, index) => (
      <motion.span
        key={index}
        className={cn(
          'absolute left-1/2 top-1/2 size-1 rounded-full',
          tone === 'up' ? 'bg-primary' : 'bg-destructive'
        )}
        initial={{ x: -2, y: -2, opacity: 0.9, scale: 1 }}
        animate={{ x: dot.x, y: dot.y, opacity: 0, scale: 0.4 }}
        transition={{ duration: 0.45, delay: index * 0.02, ease: [0.23, 1, 0.32, 1] }}
      />
    ))}
  </span>
)

const CompanyVote = ({ slug, name }: { slug: string; name: string }) => {
  const [vote, setVote] = useState<Vote | null>(null)
  const [pop, setPop] = useState<Vote | null>(null)
  const [popId, setPopId] = useState(0)
  const reduceMotion = useReducedMotion()

  useEffect(() => {
    const saved = readVotes()[slug] ?? null
    setVote(saved)
    setPop(null)
  }, [slug])

  const choose = (next: Vote) => {
    const selecting = vote !== next
    const value = selecting ? next : null
    setVote(value)
    setPop(selecting ? next : null)
    if (selecting) setPopId((id) => id + 1)
    writeVote(slug, value)
  }

  return (
    <div role="group" aria-label={`Rate ${name}`} className="inline-flex">
      <VoteButton
        side="up"
        label={`Like ${name}`}
        pressed={vote === 'up'}
        pop={pop === 'up'}
        popId={popId}
        reduceMotion={!!reduceMotion}
        onChoose={() => choose('up')}
        className="rounded-r-none"
      />
      <VoteButton
        side="down"
        label={`Dislike ${name}`}
        pressed={vote === 'down'}
        pop={pop === 'down'}
        popId={popId}
        reduceMotion={!!reduceMotion}
        onChoose={() => choose('down')}
        className="-ml-px rounded-l-none"
      />
    </div>
  )
}

const VoteButton = ({
  side,
  label,
  pressed,
  pop,
  popId,
  reduceMotion,
  onChoose,
  className,
}: {
  side: Vote
  label: string
  pressed: boolean
  pop: boolean
  popId: number
  reduceMotion: boolean
  onChoose: () => void
  className?: string
}) => {
  const Icon = side === 'up' ? ThumbsUp : ThumbsDown
  const animatePop = pop && !reduceMotion

  return (
    <Button
      type="button"
      variant="outline"
      size="icon"
      aria-pressed={pressed}
      aria-label={label}
      onClick={onChoose}
      className={cn(
        'relative text-muted-foreground',
        className,
        side === 'up' &&
          pressed &&
          'border-primary bg-[color-mix(in_oklch,var(--primary)_14%,transparent)] text-primary fine-hover:bg-[color-mix(in_oklch,var(--primary)_20%,transparent)] fine-hover:text-primary',
        side === 'down' &&
          pressed &&
          'border-destructive bg-[color-mix(in_oklch,var(--destructive)_14%,transparent)] text-destructive fine-hover:bg-[color-mix(in_oklch,var(--destructive)_20%,transparent)] fine-hover:text-destructive'
      )}
    >
      <motion.span
        key={animatePop ? popId : 'idle'}
        className="inline-flex"
        initial={animatePop ? { scale: 0.55 } : false}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', duration: 0.35, bounce: 0.45 }}
      >
        <Icon className={cn('size-4', pressed && 'fill-current')} strokeWidth={2} />
      </motion.span>
      {animatePop ? <Burst key={popId} tone={side} /> : null}
    </Button>
  )
}

export default CompanyVote
