import React, { useState, useEffect, useRef } from 'react'

function Experience() {
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
      { threshold: 0.2 }
    );
    
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    
    return () => observer.disconnect();
  }, []);

  return (
    <section id="experience" ref={sectionRef} className="abstract-field isolate relative py-16 sm:py-24 bg-black border-t border-white/5">
      <div className="relative z-10 mx-auto max-w-[1200px] px-6 sm:px-12 lg:px-16">
        
        {/* Section Header */}
        <div className="text-center mb-16 sm:mb-20">
          <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-[var(--portfolio-green)] mb-4">
            Journey
          </p>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight">
            Experi<span className="text-[var(--portfolio-green)]">ence</span>
          </h2>
        </div>
        
        {/* Experience Timeline / Cards */}
        <div className="max-w-3xl mx-auto">
          <div 
            className="group relative p-6 sm:p-8 rounded-3xl border border-white/10 bg-[#090909] transition-all duration-500 hover:bg-white/[0.04] hover:border-[var(--portfolio-green)]/30 hover:shadow-[0_10px_40px_-15px_rgba(105,173,63,0.3)] hover:-translate-y-1.5"
            style={{ 
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
              transitionDelay: '100ms'
            }}
          >
            <div className="flex flex-col sm:flex-row gap-6 items-start relative z-10">
              
              {/* Logo / Badge */}
              <div className="flex-shrink-0 w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-black border border-[var(--portfolio-green)]/40 flex items-center justify-center p-1.5 group-hover:scale-110 transition-transform duration-500 group-hover:shadow-[0_0_20px_rgba(105,173,63,0.2)]">
                <div className="w-full h-full rounded-full border border-dashed border-[var(--portfolio-green)]/70 flex flex-col items-center justify-center bg-[var(--portfolio-green)]/5 group-hover:rotate-12 transition-transform duration-700">
                  <span className="text-[6px] text-white/70 font-semibold uppercase tracking-widest mb-0.5">Herald</span>
                  <span className="text-[11px] text-[var(--portfolio-green)] font-black uppercase tracking-tighter leading-none">Ethical</span>
                  <span className="text-[9px] text-white font-bold uppercase tracking-widest leading-none mt-0.5">HCK</span>
                </div>
              </div>
              
              {/* Details */}
              <div className="flex-1 w-full">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-3 gap-3 sm:gap-0">
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold text-white group-hover:text-[var(--portfolio-green)] transition-colors duration-300">
                      Community Member
                    </h3>
                    <p className="text-white/70 font-medium text-sm mt-1 tracking-wide">
                      EthicalHCK Community
                    </p>
                  </div>
                  <div className="inline-flex items-center px-3.5 py-1.5 rounded-full bg-[var(--portfolio-green)]/10 border border-[var(--portfolio-green)]/20 text-[var(--portfolio-green)] text-[10px] font-bold tracking-[0.15em] uppercase whitespace-nowrap self-start">
                    Jan 2026 - Present
                  </div>
                </div>
                
                <p className="text-white/50 text-sm sm:text-[15px] leading-relaxed mt-4 group-hover:text-white/80 transition-colors duration-300 font-light">
                  Contributing to a cybersecurity-focused community while learning, collaborating, and engaging in security-related activities.
                </p>
              </div>
              
            </div>
            
            {/* Interactive Glow Effect background */}
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-[var(--portfolio-green)]/0 to-[var(--portfolio-green)]/0 group-hover:from-[var(--portfolio-green)]/5 group-hover:to-transparent pointer-events-none transition-all duration-700"></div>
          </div>
        </div>
        
      </div>
    </section>
  )
}

export default Experience
