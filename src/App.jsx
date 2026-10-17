import { useState, useEffect } from 'react'
import About from './sections/About'
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
import { getInvalidRoute } from './utils/routeValidation'

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
    const backgrounds = document.querySelectorAll('.abstract-field')
    if (!('IntersectionObserver' in window)) {
      backgrounds.forEach((background) => {
        background.dataset.inView = 'true'
      })
      return
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        entry.target.dataset.inView = String(entry.isIntersecting)
      })
    }, { rootMargin: '120px 0px' })

    backgrounds.forEach((background) => observer.observe(background))
    return () => observer.disconnect()
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
        <About />
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
