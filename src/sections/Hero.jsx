import { useState } from 'react'
import Navbar from '../components/Navbar'
import ScrollIndicator from '../components/ScrollIndicator'
import GeometricArt from '../components/GeometricArt'
import GlitchText from '../components/GlitchText'
import { personal } from '../data/personal'

function Hero() {
  return (
    <section 
      id="home" 
      className="hero-grid relative isolate flex min-h-screen flex-col bg-black" 
      aria-labelledby="hero-name"
    >
      <Navbar />

      <div className="mx-auto flex w-full max-w-[1600px] flex-1 flex-col justify-center px-6 pt-24 sm:px-12 lg:flex-row lg:items-center lg:px-16 lg:pt-0 ">
        
        <div className="flex-1 w-full flex flex-col items-start justify-center relative z-10 lg:pl-16 xl:pl-[140px] lg:pr-10 order-1 lg:mt-10 ">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.25em] text-[var(--portfolio-green)]">
            Hello, I'm
          </p>
          
          <h1 id="hero-name" className="font-display font-bold text-[clamp(2.4rem,6.5vw,4.5rem)] text-white leading-[1.05] mb-4 tracking-tighter" aria-label="PRINCE BHAGAT">
            PRINCE BHAGAT
          </h1>
          
          <h2 className="text-xl sm:text-2xl font-medium text-white/90 mb-6 font-mono tracking-wide flex items-center gap-3">
            <GlitchText text="Cyber Security Researcher" className="inline-block" />
          </h2>
          
          <div className="flex items-center gap-2 text-[var(--portfolio-grey)] text-xs uppercase tracking-[0.1em] font-medium mb-8">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
            <span>{personal.location}</span>
          </div>
          
          <p className="max-w-[480px] text-white/60 leading-[1.8] mb-10 text-sm font-light">
            An Aspiring Cybersecurity Professional.
            <br />
            Learning, building, and exploring how technology can be secured in an ever-changing digital world.
          </p>
          
          <div className="flex flex-wrap items-center gap-5">
            <a href="#certifications" className="inline-flex items-center justify-center rounded-full border border-[var(--portfolio-green)] bg-[var(--portfolio-green)]/10 px-7 py-3.5 text-[11px] font-bold uppercase tracking-[0.18em] text-[var(--portfolio-green)] transition-all hover:bg-[var(--portfolio-green)] hover:text-black">
              View Certificates <span className="ml-2 text-lg leading-none">↗</span>
            </a>
            <a href="#contact" className="inline-flex items-center justify-center rounded-full border border-white/20 bg-transparent px-7 py-3.5 text-[11px] font-bold uppercase tracking-[0.18em] text-white transition-all hover:border-white hover:bg-white hover:text-black">
              Contact Me
            </a>
            <a href={personal.resumePath} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center px-4 py-3.5 text-[11px] font-bold uppercase tracking-[0.18em] text-white/60 transition-colors hover:text-white">
              Resume <svg className="ml-2 w-3.5 h-3.5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
            </a>
          </div>
        </div>

        <div className="flex-1 w-full flex items-center justify-center lg:justify-end mt-16 lg:mt-0 order-2 ">
          <GeometricArt />
        </div>

      </div>
      
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 sm:bottom-12 ">
        <ScrollIndicator />
      </div>
    </section>
  )
}

export default Hero
