import { useState, useEffect, useRef } from 'react'
import certifications from '../data/certifications'

function Certificates() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    
    return () => observer.disconnect();
  }, []);

  return (
    <section id="certificates" ref={sectionRef} className="abstract-field isolate relative overflow-hidden border-t border-white/10 bg-[var(--portfolio-black)] py-16 sm:py-24">
      <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
        <header 
          className="flex flex-col md:flex-row md:items-center justify-between gap-10 transition-all duration-1000 ease-out"
          style={{ opacity: isVisible ? 1 : 0, transform: isVisible ? 'translateY(0)' : 'translateY(30px)' }}
        >
          <div className="max-w-2xl">
            <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-[var(--portfolio-green)] mb-4">Certificates</p>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight">
              Always learning. <span className="text-[var(--portfolio-green)]">Always building.</span>
            </h2>
            <p className="mt-6 text-lg text-[var(--portfolio-grey)] leading-relaxed max-w-xl">
              A collection of courses and hands-on learning across development, design, and the web.
            </p>
          </div>
          
          <div className="group/badge flex items-center gap-4 border border-white/10 rounded-2xl p-5 bg-white/5 backdrop-blur-sm shrink-0 transition-all duration-300 hover:border-[var(--portfolio-green)]/40 hover:bg-white/10 hover:-translate-y-1 hover:shadow-[0_10px_30px_-15px_rgba(105,173,63,0.2)]">
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--portfolio-green)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-all duration-300 group-hover/badge:scale-110 group-hover/badge:drop-shadow-[0_0_8px_var(--portfolio-green)]">
              <path d="M12 15l-3.5 2 1-4.5L6 9l4.5-.5L12 4.5 13.5 8.5 18 9l-3.5 3.5 1 4.5L12 15z"/>
              <path d="M12 15v6"/>
              <path d="M9 19l3 2 3-2"/>
            </svg>
            <div>
              <div className="font-display text-4xl font-bold text-white leading-none">{certifications.length < 10 ? `0${certifications.length}` : certifications.length}</div>
              <div className="text-xs text-[var(--portfolio-grey)] mt-1 transition-colors duration-300 group-hover/badge:text-white/80">certificates earned</div>
            </div>
          </div>
        </header>

        <div className="mt-16 sm:mt-24 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {certifications.map((cert, index) => (
            <div 
              key={cert.id} 
              className={`group flex flex-col justify-between rounded-2xl border border-white/10 bg-[#0a0a0a] p-5 transition-colors duration-300 transform-gpu will-change-transform hover:border-[var(--portfolio-green)]/50 hover:bg-[#111] ${isVisible ? 'animate-[slideUpFade_0.8s_ease-out_forwards]' : 'opacity-0'}`}
              style={{ animationDelay: `${200 + (index * 100)}ms` }}
            >
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl bg-[#0a0a0a] flex flex-col justify-center items-center text-center border border-white/5">
                {cert.image ? (
                  <img src={cert.image} alt={`${cert.title} Certificate`} loading="lazy" decoding="async" className="w-full h-full object-cover rounded-lg shadow-sm pointer-events-none" />
                ) : (
                  <div className="flex items-center justify-center w-full h-full text-gray-400 text-sm">No Image Provided</div>
                )}
                
                {/* View Certificate Button overlay */}
                <div className="absolute bottom-3 right-3 opacity-0 transform translate-y-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
                  <a href={cert.verifyLink} target="_blank" rel="noopener noreferrer" title={`View full image for ${cert.title}`} aria-label={`View full certificate image for ${cert.title}`} className="flex items-center gap-2 bg-[#1a1a1a] text-white text-xs px-3 py-2 rounded-md font-semibold hover:bg-black transition-colors shadow-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
                      <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3" />
                    </svg>
                    View certificate
                  </a>
                </div>
              </div>

              <div className="pt-6 flex flex-col flex-grow">
                <div className="flex items-center justify-between text-xs font-semibold mb-3">
                  <span className={
                    cert.category === 'Design' ? 'text-blue-400' : 
                    cert.category === 'Development' ? 'text-blue-300' : 
                    cert.category === 'Databases' ? 'text-cyan-400' : 'text-[var(--portfolio-green)]'
                  }>{cert.category}</span>
                  <span className="text-[var(--portfolio-grey)]">{cert.date}</span>
                </div>
                
                <h3 className="text-xl font-bold text-white font-display mb-6 line-clamp-2">{cert.title}</h3>
                
                <div className="mt-auto">
                  <div className="flex items-center gap-2 text-sm text-[var(--portfolio-grey)] font-medium mb-5">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                    </svg>
                    {cert.issuer}
                  </div>
                  
                  <div className="h-px w-full bg-white/10 mb-4" aria-hidden="true" />
                  
                  <a 
                    href={cert.verifyLink} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    title={`Verify ${cert.title} by ${cert.issuer}`}
                    aria-label={`Verify ${cert.title} by ${cert.issuer}`}
                    className="flex items-center justify-between text-sm font-semibold text-white group/link hover:text-[var(--portfolio-green)] transition-colors"
                  >
                    Verify certificate
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false" className="transform transition-transform group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5">
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                      <polyline points="15 3 21 3 21 9"></polyline>
                      <line x1="10" y1="14" x2="21" y2="3"></line>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Certificates
