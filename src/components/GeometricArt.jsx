import React from 'react';

export default function GeometricArt() {
  return (
    <div className="relative w-full max-w-[500px] aspect-square flex items-center justify-center group mx-auto">
      <div className="absolute w-[100%] h-[100%] rounded-full border border-[var(--portfolio-green)]/20 animate-[spin_20s_linear_infinite] group-hover:border-[var(--portfolio-green)]/50 transition-colors duration-700">
        <div className="absolute -top-2 left-1/2 w-4 h-4 rounded-full bg-[var(--portfolio-green)]/80 shadow-[0_0_15px_var(--portfolio-green)]"></div>
        <div className="absolute -bottom-2 left-1/2 w-3 h-3 rounded-full bg-[var(--portfolio-white)]/60"></div>
      </div>
      
      <div className="absolute w-[80%] h-[80%] rounded-full border border-[var(--portfolio-grey)]/20 animate-[spin_15s_linear_infinite_reverse] group-hover:border-[var(--portfolio-white)]/40 transition-colors duration-500" style={{ transform: 'rotateX(60deg) rotateY(20deg)' }}>
        <div className="absolute top-1/2 -left-2 w-3 h-3 rounded-full bg-[var(--portfolio-green)]/60"></div>
        <div className="absolute top-1/2 -right-2 w-2 h-2 rounded-full bg-[var(--portfolio-white)]/80"></div>
      </div>
      
      <div className="absolute w-[60%] h-[60%] rounded-full border border-[var(--portfolio-green)]/30 animate-[spin_10s_linear_infinite] group-hover:border-[var(--portfolio-green)]/60 transition-colors duration-300" style={{ transform: 'rotateX(30deg) rotateY(60deg)' }}>
        <div className="absolute -top-1.5 left-1/4 w-3 h-3 rounded-full bg-[var(--portfolio-white)]/90 shadow-[0_0_10px_var(--portfolio-white)]"></div>
      </div>
      
      <div className="absolute w-[15%] h-[15%] rounded-full border border-[var(--portfolio-green)]/60 animate-[spin_8s_linear_infinite] group-hover:shadow-[0_0_30px_var(--portfolio-green)] transition-shadow duration-500 flex items-center justify-center backdrop-blur-md">
        <div className="w-2 h-2 bg-[var(--portfolio-green)] rounded-full animate-pulse shadow-[0_0_15px_var(--portfolio-green)]"></div>
      </div>

      <div className="absolute w-[120%] h-[1px] bg-gradient-to-r from-transparent via-[var(--portfolio-green)]/20 to-transparent rotate-12"></div>
      <div className="absolute w-[120%] h-[1px] bg-gradient-to-r from-transparent via-[var(--portfolio-white)]/10 to-transparent -rotate-12"></div>
    </div>
  );
}
