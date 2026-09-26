import React, { useState, useEffect, useRef } from 'react';

function Projects() {
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
    
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="projects" ref={sectionRef} className="abstract-field isolate relative overflow-hidden border-t border-white/10 bg-[var(--portfolio-black)] py-16 sm:py-24">
      <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
        
        {/* Header */}
        <header 
          className="mb-16 sm:mb-20 transition-all duration-1000 ease-out"
          style={{ opacity: isVisible ? 1 : 0, transform: isVisible ? 'translateY(0)' : 'translateY(30px)' }}
        >
          <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-[var(--portfolio-green)] mb-4">Activity & Projects</p>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight">
            Public work, <span className="text-[var(--portfolio-green)]">mapped in motion.</span>
          </h2>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 xl:gap-8">
          
          {/* Left/Main Column: Activity & Stats (Spans 2 columns on Desktop) */}
          <div className="lg:col-span-2 flex flex-col gap-6 xl:gap-8">
            
            {/* 1. GitHub Live Heatmap */}
            <div 
              className="rounded-2xl border border-white/10 bg-[#0a0a0a] p-6 sm:p-8 backdrop-blur-sm group hover:border-[var(--portfolio-green)]/30 transition-all duration-700 ease-out delay-100"
              style={{ opacity: isVisible ? 1 : 0, transform: isVisible ? 'translateY(0)' : 'translateY(30px)' }}
            >
              <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                <h3 className="font-display text-xl font-bold text-white flex items-center gap-3">
                  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                  GitHub Contributions
                </h3>
                <a href="https://github.com/Princebhagat001" target="_blank" rel="noopener noreferrer" className="text-xs font-mono tracking-wider text-[var(--portfolio-grey)] hover:text-[var(--portfolio-green)] transition-colors flex items-center gap-2 group-hover:translate-x-1 duration-300">
                  github.com/Princebhagat001 <span aria-hidden="true">↗</span>
                </a>
              </div>
              <div className="overflow-x-auto pb-2 custom-scrollbar bg-[#0d1117] p-5 rounded-xl border border-white/5 shadow-inner">
                <div className="min-w-[650px]">
                  <img 
                    src="https://ghchart.rshah.org/26a641/Princebhagat001" 
                    alt="Live heatmap graph displaying Prince Bhagat's daily open-source code contributions and activity on GitHub" 
                    title="GitHub Contribution Heatmap"
                    className="w-full h-auto brightness-90 contrast-125 hover:brightness-110 transition-all duration-500" 
                    loading="lazy" 
                  />
                </div>
              </div>
            </div>

            {/* 2. CTF Platform Cards (Side by side on medium+ screens) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 xl:gap-8">
              
              {/* TryHackMe Profile */}
              <div 
                className="rounded-2xl border border-white/5 bg-gradient-to-br from-[#1a0e0e] to-[#0a0a0a] p-6 relative overflow-hidden group hover:border-[#C0392B]/40 hover:shadow-[0_0_30px_rgba(192,57,43,0.1)] transition-all duration-700 ease-out delay-200 flex flex-col h-full"
                style={{ opacity: isVisible ? 1 : 0, transform: isVisible ? 'translateY(0)' : 'translateY(30px)' }}
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#C0392B]/10 blur-3xl rounded-full translate-x-1/2 -translate-y-1/2 group-hover:bg-[#C0392B]/20 transition-colors duration-700"></div>
                <div className="flex items-center justify-between gap-4 mb-6 relative z-10">
                  <h3 className="font-display text-lg font-bold text-white flex items-center gap-3">
                    <img src="https://tryhackme.com/favicon.ico" alt="TryHackMe Platform Logo" title="TryHackMe" className="w-5 h-5 grayscale group-hover:grayscale-0 transition-all duration-500" loading="lazy" />
                    TryHackMe
                  </h3>
                  <a href="https://tryhackme.com/p/Princebhagat001?tab=yearly-activity" target="_blank" rel="noopener noreferrer" title="View Prince Bhagat's TryHackMe Stats" aria-label="Navigate to Prince Bhagat's TryHackMe profile and yearly activity" className="text-[10px] font-semibold uppercase tracking-wider text-[#C0392B] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    View ↗
                  </a>
                </div>
                <div className="mt-auto relative z-10 w-full flex flex-col items-center justify-center bg-black/30 border border-white/5 p-5 rounded-xl text-center group-hover:bg-black/50 transition-colors duration-500">
                   <p className="text-sm font-bold text-white mb-2">Hacker Profile</p>
                   <p className="text-xs text-[var(--portfolio-grey)] mb-5">View official real-time statistics and room completions.</p>
                   <a href="https://tryhackme.com/p/Princebhagat001?tab=yearly-activity" target="_blank" rel="noopener noreferrer" title="Launch TryHackMe Profile" aria-label="Launch TryHackMe Profile" className="inline-flex w-full items-center justify-center rounded border border-[#C0392B]/30 bg-[#C0392B]/10 px-4 py-2.5 text-[11px] font-bold uppercase tracking-widest text-[#C0392B] transition-all hover:bg-[#C0392B] hover:text-white hover:shadow-[0_0_15px_rgba(192,57,43,0.4)]">
                     Launch THM
                   </a>
                </div>
              </div>

              {/* HackTheBox Profile */}
              <div 
                className="rounded-2xl border border-white/5 bg-gradient-to-br from-[#111913] to-[#0a0a0a] p-6 relative overflow-hidden group hover:border-[var(--portfolio-green)]/40 hover:shadow-[0_0_30px_rgba(38,166,65,0.1)] transition-all duration-700 ease-out delay-300 flex flex-col h-full"
                style={{ opacity: isVisible ? 1 : 0, transform: isVisible ? 'translateY(0)' : 'translateY(30px)' }}
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--portfolio-green)]/10 blur-3xl rounded-full translate-x-1/2 -translate-y-1/2 group-hover:bg-[var(--portfolio-green)]/20 transition-colors duration-700"></div>
                <div className="flex items-center justify-between gap-4 mb-6 relative z-10">
                  <h3 className="font-display text-lg font-bold text-white flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor" className="text-[var(--portfolio-grey)] group-hover:text-[var(--portfolio-green)] transition-colors duration-500" aria-hidden="true" focusable="false"><path d="M11.96.223L.548 6.549v10.902L11.96 23.777l11.412-6.326V6.549L11.96.223zm-.08 21.054l-9.15-5.074V7.653l9.15-5.074 9.23 5.118v8.506l-9.23 5.074zM6.55 12c0-2.955 2.395-5.35 5.35-5.35s5.35 2.395 5.35 5.35-2.395 5.35-5.35 5.35-5.35-2.395-5.35-5.35z"/></svg>
                    HackTheBox
                  </h3>
                  <a href="https://profile.hackthebox.com/profile/01a084b8-b4ec-7359-823b-f83409acd968" target="_blank" rel="noopener noreferrer" title="View Prince Bhagat's HackTheBox Profile" aria-label="Navigate to Prince Bhagat's HackTheBox profile" className="text-[10px] font-semibold uppercase tracking-wider text-[var(--portfolio-green)] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    View ↗
                  </a>
                </div>
                <div className="mt-auto relative z-10 w-full flex flex-col items-center justify-center bg-black/30 border border-white/5 p-5 rounded-xl text-center group-hover:bg-black/50 transition-colors duration-500">
                   <p className="text-sm font-bold text-white mb-2">Hacker Profile</p>
                   <p className="text-xs text-[var(--portfolio-grey)] mb-5">View official real-time statistics, machine owns, and CTF ranks.</p>
                   <a href="https://profile.hackthebox.com/profile/01a084b8-b4ec-7359-823b-f83409acd968" target="_blank" rel="noopener noreferrer" title="Launch HackTheBox Profile" aria-label="Launch HackTheBox Profile" className="inline-flex w-full items-center justify-center rounded border border-[var(--portfolio-green)]/30 bg-[var(--portfolio-green)]/10 px-4 py-2.5 text-[11px] font-bold uppercase tracking-widest text-[var(--portfolio-green)] transition-all hover:bg-[var(--portfolio-green)] hover:text-black hover:shadow-[0_0_15px_rgba(38,166,65,0.4)]">
                     Launch HTB
                   </a>
                </div>
              </div>

            </div>
          </div>

          {/* Right Column: Featured Projects (Spans 1 column on Desktop) */}
          <div 
            className="lg:col-span-1 flex flex-col gap-4 transition-all duration-1000 ease-out delay-400"
            style={{ opacity: isVisible ? 1 : 0, transform: isVisible ? 'translateY(0)' : 'translateY(30px)' }}
          >
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-display text-xl font-bold text-white">Featured Projects</h3>
              <span className="h-[1px] flex-grow bg-white/10 ml-6" aria-hidden="true"></span>
            </div>
            
            <div className="flex flex-col gap-4">
              {/* Library Management System */}
              <a href="https://github.com/Princebhagat001/Library-Management-System" target="_blank" rel="noopener noreferrer" title="View Library Management System repository on GitHub" aria-label="View Library Management System repository on GitHub" className="flex flex-col justify-between rounded-xl border border-white/10 bg-[#0a0a0a] p-5 hover:border-[var(--portfolio-green)]/50 hover:bg-white/[0.02] hover:-translate-y-1 transition-all duration-300 group">
                <div>
                  <div className="flex justify-between items-start mb-3">
                    <h4 className="font-bold text-white group-hover:text-[var(--portfolio-green)] transition-colors duration-300">Library Management System</h4>
                    <svg className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-[var(--portfolio-green)] shrink-0 ml-2" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
                  </div>
                  <p className="text-sm text-[var(--portfolio-grey)] mb-5 leading-relaxed">A robust system for managing library books, users, and borrowing records.</p>
                </div>
                <div className="text-[11px] font-mono text-[var(--portfolio-grey)] flex gap-4 mt-auto">
                  <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-yellow-400 shadow-[0_0_5px_rgba(250,204,21,0.5)]" aria-hidden="true"></span>JavaScript</span>
                </div>
              </a>

              {/* Caesar Cipher */}
              <a href="https://github.com/Princebhagat001/caesar-cipher" target="_blank" rel="noopener noreferrer" title="View Caesar Cipher repository on GitHub" aria-label="View Caesar Cipher repository on GitHub" className="flex flex-col justify-between rounded-xl border border-white/10 bg-[#0a0a0a] p-5 hover:border-[var(--portfolio-green)]/50 hover:bg-white/[0.02] hover:-translate-y-1 transition-all duration-300 group">
                <div>
                  <div className="flex justify-between items-start mb-3">
                    <h4 className="font-bold text-white group-hover:text-[var(--portfolio-green)] transition-colors duration-300">Caesar Cipher</h4>
                    <svg className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-[var(--portfolio-green)] shrink-0 ml-2" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
                  </div>
                  <p className="text-sm text-[var(--portfolio-grey)] mb-5 leading-relaxed">A cryptographic tool built to encrypt and decrypt messages using classical shift ciphers.</p>
                </div>
                <div className="text-[11px] font-mono text-[var(--portfolio-grey)] flex gap-4 mt-auto">
                  <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_5px_rgba(59,130,246,0.5)]" aria-hidden="true"></span>Python</span>
                </div>
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

export default Projects;
