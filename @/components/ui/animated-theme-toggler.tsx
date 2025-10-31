'use client'

import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'
import { useCallback, useEffect, useRef, useState } from 'react'

import { cn } from '@/lib/utils'

interface AnimatedThemeTogglerProps
  extends React.ComponentPropsWithoutRef<'button'> {
  duration?: number
}

export const AnimatedThemeToggler = ({
  className,
  duration = 400,
  ...props
}: AnimatedThemeTogglerProps) => {
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const buttonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    setMounted(true)
  }, [])

  const toggleTheme = useCallback(async () => {
    if (!buttonRef.current || !mounted) return

    const isDark = resolvedTheme === 'dark'
    const nextTheme = isDark ? 'light' : 'dark'

    // Check if View Transition API is supported
    const doc = document as Document & {
      startViewTransition?: (callback: () => void) => {
        ready: Promise<void>
        finished: Promise<void>
      }
    }

    // If View Transitions are not supported, just toggle the theme
    if (!doc.startViewTransition) {
      setTheme(nextTheme)
      return
    }

    // Start the view transition
    const transition = doc.startViewTransition(() => {
      setTheme(nextTheme)
    })

    // Wait for the transition to be ready
    await transition.ready

    // Get the button position for the circular reveal animation
    const { top, left, width, height } =
      buttonRef.current.getBoundingClientRect()
    const x = left + width / 2
    const y = top + height / 2
    const endRadius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y)
    )

    // Animate the circular reveal
    document.documentElement.animate(
      {
        clipPath: [
          `circle(0px at ${x}px ${y}px)`,
          `circle(${endRadius}px at ${x}px ${y}px)`,
        ],
      },
      {
        duration,
        easing: 'ease-in-out',
        pseudoElement: '::view-transition-new(root)',
      }
    )
  }, [mounted, resolvedTheme, setTheme, duration])

  // Don't render until mounted to avoid hydration mismatch
  if (!mounted) {
    return null
  }

  const isDark = resolvedTheme === 'dark'

  return (
    <button
      ref={buttonRef}
      onClick={toggleTheme}
      className={cn(
        'inline-flex items-center justify-center rounded-full text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background',
        'hover:bg-accent hover:text-accent-foreground',
        'h-10 w-10 p-0',
        className
      )}
      aria-label="Toggle theme"
      {...props}
    >
      {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
      <span className="sr-only">Toggle theme</span>
    </button>
  )
}
