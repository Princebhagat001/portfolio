import { useEffect, useRef } from 'react'

function CustomCursor() {
  const cursorRef = useRef(null)

  useEffect(() => {
    const finePointer = window.matchMedia('(pointer: fine) and (min-width: 768px)')
    if (!finePointer.matches) return

    let frame = 0
    let pointerX = 0
    let pointerY = 0
    const moveCursor = (event) => {
      pointerX = event.clientX
      pointerY = event.clientY
      if (frame) return
      frame = window.requestAnimationFrame(() => {
        frame = 0
        if (cursorRef.current) {
          cursorRef.current.style.transform = `translate3d(${pointerX}px, ${pointerY}px, 0) translate(-50%, -50%)`
        }
      })
    }

    window.addEventListener('pointermove', moveCursor, { passive: true })
    return () => {
      window.removeEventListener('pointermove', moveCursor)
      if (frame) window.cancelAnimationFrame(frame)
    }
  }, [])

  return (
    <div 
      ref={cursorRef}
      aria-hidden="true" 
      className="pointer-events-none fixed left-0 top-0 z-[99999] hidden h-6 w-6 rounded-full border border-white/60 bg-white/25 md:block will-change-transform"
      style={{ transform: 'translate3d(-100px, -100px, 0) translate(-50%, -50%)' }} 
    />
  )
}

export default CustomCursor
