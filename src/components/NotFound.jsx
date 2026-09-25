import React, { useEffect, useState } from 'react';

function NotFound({ route, onReturn }) {
  const [text, setText] = useState('');
  const fullText = `> SYSTEM ERROR: 404\n> PATH NOT FOUND: /${route}\n> ACCESS DENIED.\n> PLEASE RETURN TO SECURE SECTOR.`;

  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      setText(fullText.slice(0, index));
      index++;
      if (index > fullText.length) clearInterval(timer);
    }, 30);
    return () => clearInterval(timer);
  }, [fullText]);

  return (
    <div className="fixed inset-0 z-[9999] bg-black flex flex-col items-center justify-center p-6 text-[var(--portfolio-green)] font-mono selection:bg-[var(--portfolio-green)] selection:text-black">
      <div className="w-full max-w-2xl">
        <div className="flex items-center gap-2 mb-4 opacity-50">
          <div className="w-3 h-3 rounded-full bg-[var(--portfolio-red)] animate-pulse"></div>
          <span className="text-xs tracking-[0.2em] uppercase">Security Breach Detected</span>
        </div>
        
        <h1 className="text-5xl sm:text-7xl font-bold text-white mb-8 tracking-tighter">
          40<span className="text-[var(--portfolio-red)]">4</span>
        </h1>
        
        <div className="min-h-[120px] mb-12 text-sm sm:text-base md:text-lg leading-relaxed whitespace-pre-wrap border-l-2 border-[var(--portfolio-green)] pl-4">
          {text}
          <span className="inline-block w-2.5 h-5 bg-[var(--portfolio-green)] ml-1 animate-pulse align-middle"></span>
        </div>

        <button 
          onClick={onReturn}
          className="group relative inline-flex items-center justify-center border border-[var(--portfolio-green)] bg-transparent px-8 py-4 text-sm font-bold uppercase tracking-[0.2em] text-[var(--portfolio-green)] transition-all hover:bg-[var(--portfolio-green)] hover:text-black"
        >
          <span className="absolute inset-0 w-full h-full bg-[var(--portfolio-green)]/20 blur-md opacity-0 group-hover:opacity-100 transition-opacity"></span>
          <span className="relative z-10 flex items-center gap-3">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
            Return to Safety
          </span>
        </button>
      </div>
      
      {/* Background glitch effect lines */}
      <div className="pointer-events-none absolute inset-0 opacity-10">
        <div className="absolute top-[20%] left-0 w-full h-[1px] bg-[var(--portfolio-green)]"></div>
        <div className="absolute top-[60%] left-0 w-full h-[1px] bg-[var(--portfolio-red)]"></div>
      </div>
    </div>
  );
}

export default NotFound;
