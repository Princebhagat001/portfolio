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

function App() {
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
