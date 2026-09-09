import About from './sections/About'
import CustomCursor from './components/CustomCursor'
import Contact from './sections/Contact'
import Education from './sections/Education'
import Footer from './sections/Footer'
import Hero from './sections/Hero'
import SocialRail from './components/SocialRail'

function App() {
  return (
    <>
      <CustomCursor />
      <SocialRail />
      <main>
        <Hero />
        <About />
        <Education />
        <Contact />
      </main>
      <Footer />
    </>
  )
}

export default App
