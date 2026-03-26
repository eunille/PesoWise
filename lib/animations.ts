/**
 * Animation utilities and variants for PesoWise landing page
 * Provides reusable animation configurations and helpers for smooth,
 * accessible micro-interactions throughout the application.
 *
 * Key principles:
 * - All animations use GPU-accelerated properties (transform, opacity)
 * - Respects prefers-reduced-motion user preference
 * - Consistent timing and easing functions for professional feel
 * - Staggering creates visual rhythm and guides user attention
 */

/**
 * Check if user prefers reduced motion
 * Returns true if user has set prefers-reduced-motion: reduce
 * Used to disable animations for accessibility
 */
export function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return false
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

/**
 * Standard easing functions for smooth, premium feel
 * Based on Material Design easing specifications
 */
export const EASE = {
  easeOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
  easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
  easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
  sharp: 'cubic-bezier(0.4, 0, 0.6, 1)',
} as const

/**
 * Standard animation durations (in milliseconds)
 * Keep animations in 0.3s-0.6s range for snappy, responsive feel
 */
export const DURATION = {
  fast: 0.3,
  normal: 0.5,
  slow: 0.6,
} as const

/**
 * Animation variants for CSS-based animations
 * These classes should be used with the corresponding @keyframes in globals.css
 *
 * Usage in components:
 * <div className="animate-fade-in-up"></div>
 */
export const ANIMATION_CLASSES = {
  fadeInUp: 'animate-fade-in-up',
  fadeIn: 'animate-fade-in',
  slideInLeft: 'animate-slide-in-left',
  slideInRight: 'animate-slide-in-right',
  scaleIn: 'animate-scale-in',
  shimmer: 'animate-shimmer',
} as const

/**
 * Helper to get animation class with reduced motion support
 * Returns empty string if user prefers reduced motion
 *
 * @param animationClass - The animation class to apply
 * @returns Animation class or empty string
 *
 * Usage:
 * <div className={getAnimationClass(ANIMATION_CLASSES.fadeInUp)}></div>
 */
export function getAnimationClass(animationClass: string): string {
  return prefersReducedMotion() ? '' : animationClass
}

/**
 * Get animation delay in milliseconds for staggered animations
 * Prevents animations when user prefers reduced motion
 *
 * @param index - Index in staggered sequence
 * @param delayMs - Delay per item in milliseconds (default 100ms)
 * @returns Animation delay in milliseconds or 0
 *
 * Usage:
 * <div style={{ animationDelay: `${getAnimationDelay(index)}ms` }}></div>
 */
export function getAnimationDelay(index: number, delayMs: number = 100): number {
  return prefersReducedMotion() ? 0 : index * delayMs
}

/**
 * Helper to build inline animation styles with reduced motion support
 *
 * @param animationName - CSS animation name (e.g., 'fadeInUp')
 * @param duration - Duration in seconds (default 0.5s)
 * @param delay - Delay in milliseconds (default 0)
 * @param iterationCount - Number of iterations (default 1)
 * @returns CSS animation string or 'none'
 *
 * Usage:
 * <div style={{ animation: getAnimationStyle('fadeInUp', 0.5, 100) }}></div>
 */
export function getAnimationStyle(
  animationName: string,
  duration: number = 0.5,
  delay: number = 0,
  iterationCount: string | number = 1
): string {
  if (prefersReducedMotion()) {
    return 'none'
  }
  return `${animationName} ${duration}s ${EASE.easeOut} ${delay}ms ${iterationCount}`
}

/**
 * Configuration for scroll-triggered reveal animations
 * Used with Intersection Observer for elements that animate when scrolled into view
 */
export const SCROLL_REVEAL_CONFIG = {
  threshold: 0.2,
  rootMargin: '0px 0px -50px 0px',
} as const

/**
 * Stagger configuration for sequential animations
 * Creates visual rhythm when multiple elements animate in sequence
 */
export const STAGGER_CONFIG = {
  container: {
    baseDelay: 50, // ms - delay before first child
    childDelay: 100, // ms - delay between each child
  },
} as const

/**
 * Hover transition utility for smooth interactive feedback
 * Apply to interactive elements for responsive feel
 *
 * Usage in component:
 * className={`transition-smooth hover:shadow-lg hover:-translate-y-1`}
 */
export const TRANSITION_SMOOTH = 'transition-all duration-300'

/**
 * Focus ring styling utility for keyboard navigation
 * Provides accessible focus states with smooth animation
 */
export const FOCUS_RING = 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2'

/**
 * Pre-built animation style objects for component composition
 * These can be assigned directly to element style props
 */
export const ANIMATION_STYLES = {
  fadeInUp: {
    animation: 'fadeInUp 0.6s ease-out forwards',
  },
  fadeIn: {
    animation: 'fadeIn 0.5s ease-out forwards',
  },
  slideInLeft: {
    animation: 'slideInLeft 0.6s ease-out forwards',
  },
  slideInRight: {
    animation: 'slideInRight 0.6s ease-out forwards',
  },
  scaleIn: {
    animation: 'scaleIn 0.5s ease-out forwards',
  },
} as const

/**
 * Helper to create staggered animation style for list items
 * Applies sequential delays to create visual rhythm
 *
 * @param index - Index in the list
 * @param baseAnimation - Base animation name (e.g., 'fadeInUp')
 * @param delayBetweenItems - Delay between items in milliseconds
 * @returns Style object with animation and delay
 *
 * Usage in map:
 * {items.map((item, idx) => (
 *   <div style={getStaggeredAnimationStyle(idx, 'fadeInUp', 100)}>
 *     {item}
 *   </div>
 * ))}
 */
export function getStaggeredAnimationStyle(
  index: number,
  baseAnimation: string,
  delayBetweenItems: number = 100
): React.CSSProperties {
  if (prefersReducedMotion()) {
    return {}
  }
  const delay = index * delayBetweenItems
  return {
    animation: `${baseAnimation} 0.6s ease-out forwards`,
    animationDelay: `${delay}ms`,
  }
}

/**
 * Intersection Observer options for scroll-triggered animations
 * Fine-tuned for landing page elements
 */
export const INTERSECTION_OPTIONS = {
  // Trigger when element is 20% visible in viewport
  threshold: 0.2,
  // Start animations before elements fully reach viewport
  rootMargin: '0px 0px -50px 0px',
} as const
