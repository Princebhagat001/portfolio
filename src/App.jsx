import { useState, useEffect } from 'react'
import CustomCursor from './components/CustomCursor'
import Contact from './sections/Contact'
import Education from './sections/Education'
import Certificates from './sections/Certificates'
import Footer from './sections/Footer'
import Hero from './sections/Hero'
import Skills from './sections/Skills'
import Experience from './sections/Experience'
import Projects from './sections/Projects'
import SocialRail from './components/SocialRail'
import NotFound from './components/NotFound'
import { getInvalidRoute } from './utilis/routeValidation'
import { qualityLevels } from './utilis/worldQuality'

const cosmicFrames = [
  [0, 1, 0, 0],
  [1, 1.05, 1, -1],
  [-1, 1.02, -1, 1],
  [0, 1, 0, 0],
]

function getCosmicTransform(elapsed) {
  const position = (elapsed % 60000) / 20000
  const segment = Math.min(2, Math.floor(position))
  const progress = position - segment
  const eased = (1 - Math.cos(progress * Math.PI)) / 2
  const values = cosmicFrames[segment].map((value, index) =>
    value + (cosmicFrames[segment + 1][index] - value) * eased,
  )
  return `rotate(${values[0]}deg) scale(${values[1]}) translate(${values[2]}%, ${values[3]}%)`
}

function App() {
  const [invalidRoute, setInvalidRoute] = useState(null)

  useEffect(() => {
    const checkHash = () => {
      setInvalidRoute(getInvalidRoute(window.location.pathname, window.location.hash))
    }

    checkHash()
    window.addEventListener('hashchange', checkHash)
    window.addEventListener('popstate', checkHash)
    return () => {
      window.removeEventListener('hashchange', checkHash)
      window.removeEventListener('popstate', checkHash)
    }
  }, [])

  useEffect(() => {
    const observedBackgroundSelector = '.abstract-field' // Observe every section, including the Hero, for data-in-view.
    const animatedBackgroundSelector = '.abstract-field:not(.hero-grid)' // Keep the Hero CSS-driven by excluding it from JS transforms.
    const observedBackgrounds = document.querySelectorAll(observedBackgroundSelector)
    const animatedBackgrounds = new Set(document.querySelectorAll(animatedBackgroundSelector))
    const visible = new Set()
    const quality = document.documentElement.dataset.galaxyQuality || 'low'
    const updatesPerSecond = qualityLevels[quality]?.updatesPerSecond ?? qualityLevels.low.updatesPerSecond
    const updateInterval = 1000 / updatesPerSecond
    const mobile = window.matchMedia('(max-width: 767px), (pointer: coarse)')
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    let frame
    let lastTime = 0
    let accumulatedTime = 0

    const stop = () => {
      if (frame !== undefined) window.cancelAnimationFrame(frame)
      frame = undefined
      lastTime = 0
      accumulatedTime = 0
    }

    const animate = (time) => {
      frame = undefined
      if (quality !== 'low' || mobile.matches || reducedMotion.matches || document.hidden || visible.size === 0) return

      if (lastTime) accumulatedTime += time - lastTime
      lastTime = time
      if (accumulatedTime >= updateInterval) {
        accumulatedTime %= updateInterval
        const transform = getCosmicTransform(time)
        visible.forEach((background) => background.style.setProperty('--cosmic-transform', transform))
      }
      frame = window.requestAnimationFrame(animate)
    }

    const update = () => {
      if (quality !== 'low' || mobile.matches || reducedMotion.matches || document.hidden || visible.size === 0) stop()
      else if (frame === undefined) frame = window.requestAnimationFrame(animate)
    }

    const observer = 'IntersectionObserver' in window && new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        entry.target.dataset.inView = String(entry.isIntersecting)
        if (!animatedBackgrounds.has(entry.target)) return
        if (entry.isIntersecting) visible.add(entry.target)
        else visible.delete(entry.target)
      })
      update()
    }, { rootMargin: '120px 0px' })

    if (observer) observedBackgrounds.forEach((background) => observer.observe(background))
    else observedBackgrounds.forEach((background) => {
      background.dataset.inView = 'true'
      if (animatedBackgrounds.has(background)) visible.add(background)
    })

    const onVisibilityChange = () => update()
    const onDeviceChange = () => update()
    document.addEventListener('visibilitychange', onVisibilityChange)
    if (reducedMotion.addEventListener) reducedMotion.addEventListener('change', onDeviceChange)
    else reducedMotion.addListener(onDeviceChange)
    if (mobile.addEventListener) mobile.addEventListener('change', onDeviceChange)
    else mobile.addListener(onDeviceChange)
    update()

    return () => {
      stop()
      observer?.disconnect()
      document.removeEventListener('visibilitychange', onVisibilityChange)
      if (reducedMotion.removeEventListener) reducedMotion.removeEventListener('change', onDeviceChange)
      else reducedMotion.removeListener(onDeviceChange)
      if (mobile.removeEventListener) mobile.removeEventListener('change', onDeviceChange)
      else mobile.removeListener(onDeviceChange)
    }
  }, [])

  if (invalidRoute) {
    return (
      <>
        <CustomCursor />
        <NotFound route={invalidRoute} onReturn={() => {
           window.history.replaceState(null, '', '/')
           setInvalidRoute(null)
        }} />
      </>
    )
  }

  return (
    <>
      <CustomCursor />
      <SocialRail />
      <main className="overflow-x-hidden">
        <Hero />
        <Skills />
        <Experience />
        <Projects />
        <Education />
        <Certificates />
        <Contact />
      </main>
      <Footer />
    </>
  )
}

export default App
