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

const validSections = ['home', 'about', 'skills', 'experience', 'projects', 'education', 'certificates', 'contact', 'closing', '']

function App() {
  const [invalidRoute, setInvalidRoute] = useState(null)

  useEffect(() => {
    const checkHash = () => {
      const pathname = window.location.pathname
      const hash = window.location.hash.replace('#', '')
      
      // If path is completely different (e.g., /admin)
      if (pathname !== '/' && pathname !== '/index.html') {
         setInvalidRoute(pathname.replace('/', ''))
         return
      }
      
      // If it's a hash link that doesn't exist
      if (hash && !validSections.includes(hash)) {
        setInvalidRoute(hash)
      } else {
        setInvalidRoute(null)
      }
    }

    checkHash()
    window.addEventListener('hashchange', checkHash)
    return () => window.removeEventListener('hashchange', checkHash)
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
