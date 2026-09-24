import React, { useState, useEffect, useRef } from 'react';

export default function GeometricArt() {
  const containerRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [scrollY, setScrollY] = useState(0);

  const [flares, setFlares] = useState([]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      setMousePos({ x, y });
    };

    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleClick = (e) => {
    const id = Date.now();
    // We want the flare to originate where the mouse clicked relative to the screen
    setFlares(prev => [...prev, { id, x: e.clientX, y: e.clientY }]);
    setTimeout(() => {
      setFlares(prev => prev.filter(f => f.id !== id));
    }, 1000);
  };

  return (
    <div 
      className="relative w-full max-w-[500px] aspect-square flex items-center justify-center group mx-auto mix-blend-screen z-[0] cursor-pointer"
      onClick={handleClick}
    >
      {/* Flare Container fixed to screen so flares don't get clipped by parallax containers */}
      {flares.length > 0 && (
        <div className="fixed inset-0 pointer-events-none z-[9999] overflow-hidden">
          {flares.map(flare => (
            <div 
              key={flare.id} 
              className="absolute rounded-full mix-blend-screen pointer-events-none"
              style={{
                left: flare.x,
                top: flare.y,
                transform: 'translate(-50%, -50%)',
                width: '150px',
                height: '150px',
                background: 'radial-gradient(circle, rgba(105,173,63,0.8) 0%, rgba(105,173,63,0.1) 40%, transparent 70%)',
                animation: 'nova-burst 1s ease-out forwards'
              }}
            >
               <div className="absolute inset-0 m-auto w-10 h-10 bg-white rounded-full blur-md animate-[nova-flash_1s_ease-out_forwards]"></div>
               <div className="absolute inset-0 m-auto w-full h-full border border-[var(--portfolio-green)] rounded-full animate-[nova-ring_1s_ease-out_forwards]"></div>
            </div>
          ))}
        </div>
      )}

      <div 
        ref={containerRef}
        className="absolute w-full h-full flex items-center justify-center animate-[slideInLeftItem_1s_ease-out_forwards] opacity-0"
        style={{
          transform: `translateY(${scrollY * 0.6}px) rotate(${scrollY * 0.05}deg)`,
          transition: 'transform 0.1s ease-out'
        }}
      >
        {/* Outermost Faint Dashed Ring */}
      <div 
        className="absolute w-[115%] h-[115%] rounded-full border border-dashed border-[var(--portfolio-grey)]/10 transition-transform duration-100 ease-out"
        style={{ transform: `rotateX(45deg) rotateY(-10deg) translate(${mousePos.x * 25}px, ${mousePos.y * 25}px)` }}
      >
        <div className="absolute w-full h-full animate-[spin_40s_linear_infinite]"></div>
      </div>

      {/* Outer Orbit */}
      <div 
        className="absolute w-[100%] h-[100%] rounded-full border border-[var(--portfolio-green)]/10 transition-transform duration-100 ease-out"
        style={{ transform: `rotateX(40deg) rotateY(15deg) translate(${mousePos.x * 20}px, ${mousePos.y * 20}px)` }}
      >
        <div className="absolute w-full h-full animate-[spin_25s_linear_infinite]">
          <div className="absolute -top-2 left-1/2 w-4 h-4 rounded-full bg-[var(--portfolio-green)]/80 shadow-[0_0_15px_var(--portfolio-green)]"></div>
          <div className="absolute -bottom-2 left-1/2 w-3 h-3 rounded-full bg-[var(--portfolio-white)]/60"></div>
        </div>
      </div>
      
      {/* Scanning Radar Layer */}
      <div 
        className="absolute w-[85%] h-[85%] rounded-full border border-[var(--portfolio-grey)]/20 transition-transform duration-100 ease-out" 
        style={{ transform: `rotateX(60deg) rotateY(20deg) translate(${mousePos.x * -15}px, ${mousePos.y * -15}px)` }}
      >
        <div 
          className="absolute inset-0 rounded-full animate-[radar-scan_4s_linear_infinite]"
          style={{ background: 'conic-gradient(from 0deg, transparent 70%, rgba(105,173,63,0.3) 100%)' }}
        ></div>
        <div className="absolute w-full h-full animate-[spin_15s_linear_infinite_reverse]">
          <div className="absolute top-1/2 -left-2 w-3 h-3 rounded-full bg-[var(--portfolio-green)]/60"></div>
          <div className="absolute top-1/2 -right-2 w-2 h-2 rounded-full bg-[var(--portfolio-white)]/80 shadow-[0_0_10px_white]"></div>
        </div>
      </div>

      {/* Fast Dashed Middle Ring */}
      <div 
        className="absolute w-[72%] h-[72%] rounded-full border-2 border-dashed border-[var(--portfolio-green)]/15 transition-transform duration-100 ease-out" 
        style={{ transform: `rotateX(20deg) rotateY(-30deg) translate(${mousePos.x * -5}px, ${mousePos.y * -5}px)` }}
      >
        <div className="absolute w-full h-full animate-[spin_8s_linear_infinite]">
           <div className="absolute top-0 right-1/4 w-2 h-2 rounded-full bg-[var(--portfolio-green)]/50"></div>
        </div>
      </div>
      
      {/* Inner Orbit */}
      <div 
        className="absolute w-[60%] h-[60%] rounded-full border border-[var(--portfolio-green)]/20 transition-transform duration-100 ease-out" 
        style={{ transform: `rotateX(30deg) rotateY(60deg) translate(${mousePos.x * 10}px, ${mousePos.y * 10}px)` }}
      >
        <div className="absolute w-full h-full animate-[spin_10s_linear_infinite]">
          <div className="absolute -top-1.5 left-1/4 w-3 h-3 rounded-full bg-[var(--portfolio-white)]/90 shadow-[0_0_10px_var(--portfolio-white)]"></div>
        </div>
      </div>

      {/* Deep Inner Delicate Ring */}
      <div 
        className="absolute w-[40%] h-[40%] rounded-full border border-[var(--portfolio-grey)]/15 transition-transform duration-100 ease-out" 
        style={{ transform: `rotateX(50deg) rotateY(-10deg) translate(${mousePos.x * 15}px, ${mousePos.y * 15}px)` }}
      >
        <div className="absolute w-full h-full animate-[spin_12s_linear_infinite_reverse]">
          <div className="absolute bottom-0 left-1/2 w-1.5 h-1.5 rounded-full bg-[var(--portfolio-white)]/50"></div>
        </div>
      </div>
      
      {/* Central Morphing Polygon */}
      <div 
        className="absolute w-[18%] h-[18%] border border-[var(--portfolio-green)]/80 bg-[var(--portfolio-green)]/10 animate-[morph-polygon_12s_linear_infinite] group-hover:shadow-[0_0_40px_var(--portfolio-green)] transition-all duration-500 flex items-center justify-center backdrop-blur-sm z-10"
        style={{ transform: `translate(${mousePos.x * 5}px, ${mousePos.y * 5}px)` }}
      >
        <div className="w-3 h-3 bg-[var(--portfolio-green)] rounded-full animate-pulse shadow-[0_0_20px_var(--portfolio-green)]"></div>
      </div>

      {/* Axis Lines */}
      <div className="absolute w-[120%] h-[1px] bg-gradient-to-r from-transparent via-[var(--portfolio-green)]/15 to-transparent rotate-12 pointer-events-none"></div>
      <div className="absolute w-[120%] h-[1px] bg-gradient-to-r from-transparent via-[var(--portfolio-white)]/10 to-transparent -rotate-12 pointer-events-none"></div>
      </div>
    </div>
  );
}
