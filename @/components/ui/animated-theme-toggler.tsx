'use client'

import { Moon, Sun } from 'lucide-react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { useTheme } from 'next-themes'
import { useCallback, useEffect, useRef, useState } from 'react'

import { cn } from '@/lib/utils'

interface AnimatedThemeTogglerProps
  extends React.ComponentPropsWithoutRef<'button'> {
  duration?: number
}

export const AnimatedThemeToggler = ({
  className,
  duration = 300,
  ...props
}: AnimatedThemeTogglerProps) => {
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const reduceMotion = useReducedMotion()

  useEffect(() => {
    setMounted(true)
  }, [])

  const toggleTheme = useCallback(async () => {
    if (!buttonRef.current || !mounted) return

    const isDark = resolvedTheme === 'dark'
    const nextTheme = isDark ? 'light' : 'dark'

    const doc = document as Document & {
      startViewTransition?: (callback: () => void) => {
        ready: Promise<void>
        finished: Promise<void>
      }
    }

    if (!doc.startViewTransition || reduceMotion) {
      setTheme(nextTheme)
      return
    }

    const transition = doc.startViewTransition(() => {
      setTheme(nextTheme)
    })

    await transition.ready

    const { top, left, width, height } =
      buttonRef.current.getBoundingClientRect()
    const x = left + width / 2
    const y = top + height / 2
    const endRadius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y)
    )

    document.documentElement.animate(
      {
        clipPath: [
          `circle(0px at ${x}px ${y}px)`,
          `circle(${endRadius}px at ${x}px ${y}px)`,
        ],
      },
      {
        duration,
        easing: 'cubic-bezier(0.77, 0, 0.175, 1)',
        pseudoElement: '::view-transition-new(root)',
      }
    )
  }, [mounted, reduceMotion, resolvedTheme, setTheme, duration])

  const iconClassName = 'h-5 w-5'
  const isDark = resolvedTheme === 'dark'

  return (
    <button
      ref={buttonRef}
      onClick={toggleTheme}
      className={cn(
        'inline-flex items-center justify-center rounded-full text-sm font-medium',
        'transition-[color,background-color,scale] duration-150 ease-out-strong',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
        'disabled:opacity-50 disabled:pointer-events-none ring-offset-background',
        'fine-hover:bg-accent fine-hover:text-accent-foreground',
        'active:scale-[0.96]',
        'h-10 w-10 p-0',
        className
      )}
      aria-label="Toggle theme"
      {...props}
    >
      {!mounted ? (
        <span className={iconClassName} aria-hidden />
      ) : reduceMotion ? (
        isDark ? (
          <Sun className={iconClassName} strokeWidth={2} />
        ) : (
          <Moon className={iconClassName} strokeWidth={2} />
        )
      ) : (
        <AnimatePresence initial={false} mode="popLayout">
          <motion.span
            key={isDark ? 'sun' : 'moon'}
            initial={{ opacity: 0, scale: 0.25, filter: 'blur(4px)' }}
            animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
            exit={{ opacity: 0, scale: 0.25, filter: 'blur(4px)' }}
            transition={{ type: 'spring', duration: 0.3, bounce: 0 }}
            className="inline-flex"
          >
            {isDark ? (
              <Sun className={iconClassName} strokeWidth={2} />
            ) : (
              <Moon className={iconClassName} strokeWidth={2} />
            )}
          </motion.span>
        </AnimatePresence>
      )}
      <span className="sr-only">Toggle theme</span>
    </button>
  )
}
