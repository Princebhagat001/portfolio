import { useEffect, useRef } from 'react'

function CustomCursor() {
  const cursorRef = useRef(null)

  useEffect(() => {
    const moveCursor = (event) => {
      if (cursorRef.current) {
        // Use transform translate3d instead of left/top for hardware acceleration
        cursorRef.current.style.transform = `translate3d(${event.clientX}px, ${event.clientY}px, 0) translate(-50%, -50%)`
      }
    }
    
    globalThis.addEventListener('pointermove', moveCursor, { passive: true })
    return () => globalThis.removeEventListener('pointermove', moveCursor)
  }, [])

  return (
    <div 
      ref={cursorRef}
      aria-hidden="true" 
      className="pointer-events-none fixed left-0 top-0 z-[99999] hidden h-6 w-6 rounded-full border border-white/60 bg-white/25 transition-[width,height] duration-150 md:block will-change-transform"
      style={{ transform: 'translate3d(-100px, -100px, 0) translate(-50%, -50%)' }} 
    />
  )
}

export default CustomCursor
