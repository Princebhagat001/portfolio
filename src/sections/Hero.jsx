import { useState } from 'react'
import Navbar from '../components/Navbar'
import ScrollIndicator from '../components/ScrollIndicator'
import { personal } from '../data/personal'

function Hero() {
  const [showAllFocusAreas, setShowAllFocusAreas] = useState(false)
  const focusAreas = showAllFocusAreas ? [...personal.focusAreas, 'CTF Player'] : personal.focusAreas

  return (
    <section id="home" className="hero-grid relative isolate flex min-h-screen flex-col overflow-hidden bg-black" aria-labelledby="hero-name">
      <Navbar />
      <div className="mx-auto grid w-full max-w-[1600px] flex-1 grid-rows-[1fr_auto_1fr] px-5 pt-16 sm:px-8 sm:pt-20 lg:px-16">
        <div className="pt-10 sm:pt-16">
          <p className="hero-intro max-w-52 text-[10px] font-medium uppercase leading-[1.9] tracking-[0.15em] text-[var(--portfolio-grey)]">
            {personal.title}<br />
            <span className="hero-status-signal">{personal.heroStatus}</span><br />
            {personal.location}
          </p>
        </div>

        <h1 id="hero-name" className="wordmark name-display relative z-10 text-center text-[clamp(5rem,17vw,18rem)] text-[var(--portfolio-white)]" aria-label={personal.fullName}>
          <span>{personal.heroDisplayName}</span>
        </h1>

        <div className="relative flex min-h-44 items-end justify-end pb-10 pt-12 sm:min-h-48 sm:pb-16">
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 sm:bottom-16"><ScrollIndicator /></div>
          <aside className="w-full max-w-60 justify-self-end border-l border-[var(--portfolio-green)] pl-4 sm:pl-5" aria-label="Professional focus">
            <p className="mb-4 text-[10px] font-medium uppercase tracking-[0.18em] text-[var(--portfolio-grey)]">What I Do</p>
            <ul className="space-y-1.5 text-sm leading-snug text-[var(--portfolio-white)]">
              {focusAreas.map((area) => <li key={area}>{area}</li>)}
            </ul>
            <button type="button" onClick={() => setShowAllFocusAreas(!showAllFocusAreas)} className="mt-5 inline-block text-[10px] uppercase tracking-[0.16em] text-[var(--portfolio-red)] transition-colors hover:text-[var(--portfolio-white)]">→ {showAllFocusAreas ? 'View less' : 'View more'}</button>
          </aside>
        </div>
      </div>
    </section>
  )
}

export default Hero
