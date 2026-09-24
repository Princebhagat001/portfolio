function ScrollIndicator({ targetId = 'closing' }) {
  return (
    <a href={`#${targetId}`} className="group inline-flex flex-col items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-white/55 transition-colors hover:text-white" aria-label={`Scroll to ${targetId} section`}>
      <span>Scroll</span>
      <span aria-hidden="true" className="text-base leading-none transition-transform duration-300 group-hover:translate-y-1">↓</span>
    </a>
  )
}

export default ScrollIndicator
