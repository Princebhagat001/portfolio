import React, { useState, useEffect, useRef, useCallback } from 'react'

const skillsData = [
  { name: 'Linux', percentage: 25, tags: ['Beginner'] },
  { name: 'Python', percentage: 40, tags: ['Intermediate', 'Scripting & Automation'] },
  { name: 'Wireshark', percentage: 25, tags: ['Beginner'] },
  { name: 'Nmap', percentage: 30, tags: ['Beginner'] },
  { name: 'Burp Suite', percentage: 25, tags: ['Beginner'] },
  { name: 'Git & GitHub', percentage: 40, tags: ['Intermediate', 'Version Control'] },
  { name: 'AWS EC2', percentage: 25, tags: ['Beginner', 'Cloud Service'] }
]

function SkillCard({ skill, index, isVisible }) {
  const [currentPercentage, setCurrentPercentage] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragDirection, setDragDirection] = useState('none');
  const [isSnappingBack, setIsSnappingBack] = useState(false);
  
  const barRef = useRef(null);
  const prevPercentRef = useRef(0);
  const snapTimeoutRef = useRef(null);

  // Animate initial percentage when it comes into view, unless we are dragging
  useEffect(() => {
    if (!isDragging && !isSnappingBack) {
      setCurrentPercentage(isVisible ? skill.percentage : 0);
      prevPercentRef.current = isVisible ? skill.percentage : 0;
    }
  }, [isVisible, skill.percentage, isDragging, isSnappingBack]);

  const updatePercentageFromEvent = useCallback((e) => {
    if (!barRef.current) return;
    const rect = barRef.current.getBoundingClientRect();
    const clientX = e.clientX ?? (e.touches && e.touches[0].clientX);
    if (clientX === undefined) return;
    
    let x = clientX - rect.left;
    const newPercentage = Math.min(Math.max(Math.round((x / rect.width) * 100), 0), 100);
    
    if (newPercentage > prevPercentRef.current) {
      setDragDirection('increasing');
    } else if (newPercentage < prevPercentRef.current) {
      setDragDirection('decreasing');
    }
    
    prevPercentRef.current = newPercentage;
    setCurrentPercentage(newPercentage);
  }, []);

  const handlePointerDown = (e) => {
    setIsDragging(true);
    setIsSnappingBack(false);
    if (snapTimeoutRef.current) clearTimeout(snapTimeoutRef.current);
    e.target.setPointerCapture(e.pointerId);
    updatePercentageFromEvent(e);
  };

  const handlePointerMove = (e) => {
    if (isDragging) {
      updatePercentageFromEvent(e);
    }
  };

  const handlePointerUp = (e) => {
    setIsDragging(false);
    e.target.releasePointerCapture(e.pointerId);
    
    if (currentPercentage !== skill.percentage) {
      setIsSnappingBack(true);
      setCurrentPercentage(skill.percentage);
      prevPercentRef.current = skill.percentage;
      
      snapTimeoutRef.current = setTimeout(() => {
        setIsSnappingBack(false);
        setDragDirection('none');
      }, 1000);
    } else {
      setDragDirection('none');
    }
  };

  const showSparkle = isDragging && dragDirection === 'increasing';
  const showHacked = (isDragging && dragDirection === 'decreasing') || isSnappingBack;

  return (
    <div 
      className="flex flex-col group p-4 sm:p-5 -mx-4 sm:-mx-5 rounded-2xl transition-all duration-300 hover:bg-white/[0.02] hover:-translate-y-1 hover:shadow-[0_10px_30px_-15px_rgba(105,173,63,0.1)]"
      style={{ 
        transitionDelay: isVisible ? `${index * 100}ms` : '0ms',
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(20px)'
      }}
    >
      {/* Title & Percentage */}
      <div className="flex justify-between items-end mb-3">
        <span className="text-white/90 font-medium text-lg tracking-wide group-hover:text-[var(--portfolio-green)] transition-colors duration-300">{skill.name}</span>
        <span className={`font-mono text-sm font-bold transition-colors duration-300 ${isDragging ? 'text-[var(--portfolio-green)] scale-110' : 'text-white/60 group-hover:text-white'}`}>
          {currentPercentage}%
        </span>
      </div>
      
      {/* Progress Bar (Interactive) */}
      <div 
        ref={barRef}
        role="slider"
        aria-valuemin="0"
        aria-valuemax="100"
        aria-valuenow={currentPercentage}
        aria-label={`Skill level for ${skill.name}`}
        tabIndex="0"
        className="w-full h-2.5 bg-white/5 rounded-full mb-4 border border-white/10 shadow-inner relative cursor-ew-resize overflow-visible"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
      >
        {/* Background track to hide overflow from shimmer */}
        <div className="absolute inset-0 rounded-full overflow-hidden pointer-events-none"></div>

        <div 
          className={`h-full bg-[var(--portfolio-green)] rounded-full relative ${isDragging && !isSnappingBack ? 'transition-none brightness-125' : 'transition-all duration-1000 ease-out group-hover:shadow-[0_0_10px_var(--portfolio-green)]'} overflow-hidden`}
          style={{ width: `${currentPercentage}%` }}
        >
          <div className="absolute inset-0 bg-white/20 w-full animate-[shimmer_2s_infinite] -translate-x-full" style={{ backgroundImage: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)' }}></div>
        </div>

        {/* Sparkle tip when increasing */}
        {showSparkle && (
          <div 
            className="absolute top-1/2 -translate-y-1/2 flex items-center justify-center z-20 pointer-events-none"
            style={{ left: `calc(${currentPercentage}% - 2px)` }}
          >
            {/* Core glowing dot */}
            <div className="w-2.5 h-2.5 bg-white rounded-full shadow-[0_0_15px_5px_rgba(255,255,255,0.9),0_0_30px_12px_var(--portfolio-green)] animate-[pulse_0.2s_ease-in-out_infinite_alternate]"></div>
            
            {/* Rotating light rays */}
            <div className="absolute w-10 h-[1.5px] bg-gradient-to-r from-transparent via-white to-transparent animate-[spin_1s_linear_infinite]"></div>
            <div className="absolute w-[1.5px] h-10 bg-gradient-to-b from-transparent via-white to-transparent animate-[spin_1.5s_linear_infinite_reverse]"></div>
            
            {/* Popping sparkles */}
            <div className="absolute -top-4 -right-3 w-1 h-1 bg-white rounded-full animate-ping" style={{ animationDuration: '0.4s' }}></div>
            <div className="absolute bottom-4 -right-5 w-1.5 h-1.5 bg-white rounded-full animate-ping" style={{ animationDuration: '0.6s' }}></div>
            <div className="absolute -top-3 left-4 w-1 h-1 bg-white rounded-full animate-ping" style={{ animationDuration: '0.5s' }}></div>
            <div className="absolute bottom-3 left-3 w-0.5 h-0.5 bg-white rounded-full animate-ping" style={{ animationDuration: '0.3s' }}></div>
          </div>
        )}

        {/* Hacked swarm tip when decreasing or snapping back */}
        {showHacked && (
          <div 
            className={`absolute top-1/2 -translate-y-1/2 z-20 pointer-events-none w-20 h-20 -translate-x-10 ${isSnappingBack ? 'transition-all duration-1000 ease-out' : 'transition-none'}`}
            style={{ left: `${currentPercentage}%` }}
          >
            {Array.from({ length: 8 }).map((_, i) => {
              const colors = ['var(--portfolio-green)', '#ff2a2a'];
              const color = colors[Math.floor(Math.random() * colors.length)];
              return (
                <span 
                  key={i} 
                  className="absolute font-mono text-[10px] font-black animate-[ping_1s_ease-out_infinite]"
                  style={{
                    color: color,
                    left: `${10 + Math.random() * 80}%`,
                    top: `${10 + Math.random() * 80}%`,
                    animationDuration: `${0.3 + Math.random() * 0.5}s`,
                    animationDelay: `${Math.random() * 0.4}s`,
                    textShadow: `0 0 5px ${color}, 0 0 10px ${color}`
                  }}
                >
                  {Math.random() > 0.5 ? '1' : '0'}
                </span>
              );
            })}
          </div>
        )}
      </div>
      
      {/* Tags */}
      <div className="flex flex-wrap gap-2 pointer-events-none">
        {skill.tags.map((tag, tagIndex) => (
          <span 
            key={tagIndex} 
            className="inline-block px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.12em] rounded-md bg-[var(--portfolio-green)]/5 text-[var(--portfolio-green)]/80 border border-[var(--portfolio-green)]/20 transition-all duration-300 group-hover:bg-[var(--portfolio-green)]/15 group-hover:text-[var(--portfolio-green)] group-hover:border-[var(--portfolio-green)]/40"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}

function Skills() {
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
    <section id="skills" ref={sectionRef} className="abstract-field isolate relative py-16 sm:py-24 bg-[#090909] border-t border-white/5">
      <div className="relative z-10 mx-auto max-w-[1200px] px-6 sm:px-12 lg:px-16">
        
        {/* Section Header */}
        <div className="text-center mb-16 sm:mb-20">
          <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-[var(--portfolio-green)] mb-4">
            Skills
          </p>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight">
            Technical <span className="text-[var(--portfolio-green)]">Capabilities</span>
          </h2>
        </div>
        
        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-6 sm:gap-y-8">
          {skillsData.map((skill, index) => (
            <SkillCard key={index} skill={skill} index={index} isVisible={isVisible} />
          ))}
        </div>
        
      </div>
    </section>
  )
}

export default Skills
