// Reusable motion variants with timings matching the supplied reference.
export const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
}

export const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.08,
    },
  },
}

export function viewportOnce() {
  return { once: true, margin: '-80px' }
}

// Map the shared variant values to CSS custom properties for the current
// CSS-based reveal components.
export function revealStyle(index = 0) {
  const { duration, ease } = fadeUp.visible.transition
  const { staggerChildren, delayChildren } = staggerContainer.visible.transition
  const easing = Array.isArray(ease) ? `cubic-bezier(${ease.join(', ')})` : 'ease-out'

  return {
    '--motion-duration': `${duration * 1000}ms`,
    '--motion-ease': easing,
    '--motion-delay': `${(delayChildren + index * staggerChildren) * 1000}ms`,
    '--motion-offset': `${fadeUp.hidden.y}px`,
  }
}
