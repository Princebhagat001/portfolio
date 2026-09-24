import { useEffect, useRef, useState } from 'react'
import { personal } from '../data/personal'

const navItems = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Blog', href: '#blog' },
  { label: 'Certifications', href: '#certifications' },
  { label: 'Contact', href: '#contact' },
]

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const mobileMenuRef = useRef(null)

  useEffect(() => {
    const closeOnOutsideClick = (event) => {
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target)) setIsMenuOpen(false)
    }
    const closeOnEscape = (event) => {
      if (event.key === 'Escape') setIsMenuOpen(false)
    }
    document.addEventListener('pointerdown', closeOnOutsideClick)
    document.addEventListener('keydown', closeOnEscape)
    return () => {
      document.removeEventListener('pointerdown', closeOnOutsideClick)
      document.removeEventListener('keydown', closeOnEscape)
    }
  }, [])

  return (
    <header className="site-header fixed inset-x-0 top-0 z-40 border-b border-white/10 bg-black/90 backdrop-blur-md">
      <nav className="mx-auto flex min-h-16 max-w-[1600px] items-center justify-between gap-4 px-5 sm:min-h-20 sm:px-8 lg:px-12" aria-label="Main navigation">
        <a href="#home" className="shrink-0 text-xl font-bold tracking-[0.1em] text-white transition-colors hover:text-white/80" aria-label={`${personal.fullName} home`}>
          <span className="text-[var(--portfolio-green)]">./</span>prince
        </a>

        <div className="hidden items-center justify-center gap-6 lg:flex" aria-label="Portfolio sections">
          {navItems.map((item) => (
            <a key={item.label} href={item.href} className="nav-link relative py-2 text-[12px] font-medium uppercase tracking-[0.15em] text-white/70 transition-colors hover:text-white focus-visible:text-white">
              {item.label}
            </a>
          ))}
        </div>

        <div className="hidden shrink-0 items-center gap-4 sm:flex">
          <a href={personal.resumePath} target="_blank" rel="noopener noreferrer" className="text-[10px] font-medium uppercase tracking-[0.16em] text-white/55 transition-colors hover:text-white">CV ↗</a>
          <a href="#contact" className="rounded-full border border-white/25 px-4 py-2 text-[10px] font-medium uppercase tracking-[0.14em] text-white transition-colors hover:border-white hover:bg-white hover:text-black">Let’s Talk</a>
        </div>

        <div ref={mobileMenuRef} className="relative sm:hidden">
          <button type="button" className="rounded-full border border-white/20 px-4 py-2 text-[10px] uppercase tracking-[0.16em] text-white transition-colors hover:border-white" aria-expanded={isMenuOpen} aria-controls="mobile-navigation" onClick={() => setIsMenuOpen(!isMenuOpen)}>Menu</button>
          {isMenuOpen && <div id="mobile-navigation" className="absolute right-0 top-full mt-2 w-48 rounded-2xl border border-white/15 bg-[#090909]/95 p-2 shadow-2xl backdrop-blur-md">
            {navItems.map((item) => (
              <a key={item.label} href={item.href} onClick={() => setIsMenuOpen(false)} className="block rounded-md px-3 py-2.5 text-[10px] uppercase tracking-[0.14em] text-white/70 transition-colors hover:bg-white hover:text-black">{item.label}</a>
            ))}
            <a href={personal.resumePath} target="_blank" rel="noopener noreferrer" onClick={() => setIsMenuOpen(false)} className="block rounded-md px-3 py-2.5 text-[10px] uppercase tracking-[0.14em] text-white/70 transition-colors hover:bg-white hover:text-black">CV ↗</a>
          </div>}
        </div>
      </nav>
    </header>
  )
}

export default Navbar
