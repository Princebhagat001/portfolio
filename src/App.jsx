import { useState, useEffect } from 'react'
import GlobalBackground from './components/GlobalBackground'
import CustomCursor from './components/CustomCursor'
import Contact from './sections/Contact'
import Education from './sections/Education'
import Certificates from './sections/Certificates'
import Footer from './sections/Footer'
import Hero from './sections/Hero'
import Navbar from './components/Navbar'
import Skills from './sections/Skills'
import Experience from './sections/Experience'
import Projects from './sections/Projects'
import SocialRail from './components/SocialRail'
import NotFound from './components/NotFound'
import { getInvalidRoute } from './utilis/routeValidation'
import './global-bg.css'

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
    const backgrounds = document.querySelectorAll('.abstract-field:not(.shared-galaxy-field)')
    if (!('IntersectionObserver' in window)) return undefined

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(({ target, isIntersecting }) => {
        target.dataset.inView = String(isIntersecting)
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
      <GlobalBackground />
      <div className="site-content">
        <CustomCursor />
        <SocialRail />
        <Navbar />
        <main>
          <Hero />
          <div className="relative z-10">
            <Skills />
            <Experience />
            <Projects />
            <Education />
            <Certificates />
            <Contact />
          </div>
        </main>
        <Footer />
      </div>
    </>
  )
}

export default App
