import { useEffect, useState } from 'react'

function CustomCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 })

  useEffect(() => {
    const moveCursor = (event) => setPosition({ x: event.clientX, y: event.clientY })
    globalThis.addEventListener('pointermove', moveCursor)
    return () => globalThis.removeEventListener('pointermove', moveCursor)
  }, [])

  return <div aria-hidden="true" className="pointer-events-none fixed z-50 hidden h-6 w-6 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/35 mix-blend-difference transition-transform duration-150 md:block" style={{ left: position.x, top: position.y }} />
}

export default CustomCursor
