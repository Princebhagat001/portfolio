import { useEffect, useRef } from 'react'

export default function GlobalBackground() {
  const backgroundRef = useRef(null)

  useEffect(() => {
    const background = backgroundRef.current
    const sections = document.querySelectorAll('#skills, #experience, #projects, #education, #certificates, #contact, #closing')
    if (!background || !('IntersectionObserver' in window)) {
      background?.setAttribute('data-in-view', 'true')
      return undefined
    }

    const visibleSections = new Set()
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(({ target, isIntersecting }) => {
        if (isIntersecting) visibleSections.add(target)
        else visibleSections.delete(target)
      })
      background.dataset.inView = String(visibleSections.size > 0)
    }, { rootMargin: '120px 0px' })

    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  return <div ref={backgroundRef} className="abstract-field shared-galaxy-field pointer-events-none fixed inset-0 z-0" aria-hidden="true" />
}
