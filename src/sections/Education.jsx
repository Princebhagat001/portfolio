import { useState, useEffect, useRef } from 'react'
import { education } from '../data/education'

function Education() {
  const [openInstitution, setOpenInstitution] = useState(null)
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
      { threshold: 0.15 }
    );
    
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    
    return () => observer.disconnect();
  }, []);

  return (
    <section id="education" ref={sectionRef} className="relative overflow-hidden border-t border-white/10 bg-[var(--portfolio-black)] py-20 sm:py-28" aria-labelledby="education-heading">
      <div className="mx-auto max-w-5xl px-5 sm:px-8 lg:px-12">
        <header 
          className="mx-auto max-w-3xl text-center transition-all duration-1000 ease-out"
          style={{ opacity: isVisible ? 1 : 0, transform: isVisible ? 'translateY(0)' : 'translateY(30px)' }}
        >
          <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[var(--portfolio-green)]">Education</p>
          <h2 id="education-heading" className="mt-5 font-display text-[clamp(2.5rem,6vw,5rem)] font-bold leading-[0.94] tracking-[-0.06em] text-[var(--portfolio-white)]">Building a foundation in cybersecurity.</h2>
        </header>

        <ol className="education-timeline mx-auto mt-14 max-w-4xl space-y-5 sm:mt-20">
          {education.map((item, index) => (
            <li 
              key={item.institution} 
              className={`education-card ${item.current ? 'education-card-current' : ''} ${openInstitution === item.institution ? 'education-card-open' : ''} ${isVisible ? 'animate-[slideUpFade_0.8s_ease-out_forwards]' : 'opacity-0'}`}
              style={{ animationDelay: `${200 + (index * 150)}ms` }}
            >
              <span className="education-marker" aria-hidden="true" />
              <button type="button" className="education-summary" aria-expanded={openInstitution === item.institution} onClick={() => setOpenInstitution(openInstitution === item.institution ? null : item.institution)}>
                <span className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
                  <span>
                    <span className="font-display block text-2xl font-bold tracking-[-0.04em] text-[var(--portfolio-white)] sm:text-3xl">{item.institution}</span>
                    <span className="education-location"><span className="education-location-icon" aria-hidden="true" />{item.location}</span>
                    <span className={`mt-4 block text-left text-base font-semibold ${item.current ? 'text-[var(--portfolio-green)]' : 'text-[var(--portfolio-white)]'}`}>{item.program}</span>
                  </span>
                  <span className="flex items-center gap-3"><span className="education-period" aria-label={`Study period: ${item.period}`}>{item.period}</span><span className="education-toggle" aria-hidden="true">+</span></span>
                </span>
              </button>
              {openInstitution === item.institution && <p className="education-extra">{item.details}</p>}
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

export default Education
