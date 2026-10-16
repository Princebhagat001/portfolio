import React, { useState, useEffect, useRef } from 'react';

export default function GeometricArt() {
  const containerRef = useRef(null);
  const artRef = useRef(null);
  const frameRef = useRef(0);

  const [flares, setFlares] = useState([]);

  useEffect(() => {
    const root = containerRef.current;
    const art = artRef.current;
    if (!root || !art) return;

    let pointerX = 0;
    let pointerY = 0;
    let latestScrollY = window.scrollY;
    let isVisible = false;

    // Keep high-frequency input out of React's render cycle and write at most once per frame.
    const scheduleUpdate = () => {
      if (frameRef.current) return;
      frameRef.current = window.requestAnimationFrame(() => {
        frameRef.current = 0;
        [25, 20, -15, -5, 10, 15, 5].forEach((scale) => {
          root.style.setProperty(`--pointer-x-${scale}`, `${pointerX * scale}px`);
          root.style.setProperty(`--pointer-y-${scale}`, `${pointerY * scale}px`);
        });
        art.style.transform = `translateY(${latestScrollY * 0.6}px) rotate(${latestScrollY * 0.05}deg)`;
      });
    };

    const handlePointerMove = (e) => {
      const rect = root.getBoundingClientRect();
      if (!rect.width || !rect.height) return;
      pointerX = (e.clientX - rect.left) / rect.width - 0.5;
      pointerY = (e.clientY - rect.top) / rect.height - 0.5;
      scheduleUpdate();
    };

    const handleScroll = () => {
      if (!isVisible) return;
      latestScrollY = window.scrollY;
      scheduleUpdate();
    };

    root.addEventListener('pointermove', handlePointerMove, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true });

    let observer;
    if ('IntersectionObserver' in window) {
      observer = new IntersectionObserver(([entry]) => {
        isVisible = entry.isIntersecting;
        root.dataset.visible = String(isVisible);
        if (isVisible) {
          latestScrollY = window.scrollY;
          scheduleUpdate();
        }
      });
      observer.observe(root);
    } else {
      isVisible = true;
      root.dataset.visible = 'true';
    }
    scheduleUpdate();

    return () => {
      root.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('scroll', handleScroll);
      observer?.disconnect();
      if (frameRef.current) window.cancelAnimationFrame(frameRef.current);
    };
  }, []);

  const handleClick = (e) => {
    // Taps on phones should interact with the page without spawning a flare.
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const id = Date.now();
    // We want the flare to originate where the mouse clicked relative to the screen
    setFlares(prev => [...prev, { id, x: e.clientX, y: e.clientY }]);
    setTimeout(() => {
      setFlares(prev => prev.filter(f => f.id !== id));
    }, 1000);
  };

  return (
    <div 
      ref={containerRef}
      className="geometric-art relative w-full max-w-[500px] aspect-square flex items-center justify-center group mx-auto mix-blend-screen z-[0] cursor-pointer animate-[art-color-shift_12s_linear_infinite]"
      onClick={handleClick}
    >
      {/* Flare Container fixed to screen so flares don't get clipped by parallax containers */}
      {flares.length > 0 && (
        <div className="fixed inset-0 pointer-events-none z-[9999] overflow-hidden">
          {flares.map(flare => (
            <div 
              key={flare.id} 
              className="absolute rounded-full mix-blend-screen pointer-events-none animate-[art-color-shift_12s_linear_infinite]"
              style={{
                left: flare.x,
                top: flare.y,
                transform: 'translate(-50%, -50%)',
                width: '150px',
                height: '150px',
                background: 'radial-gradient(circle, color-mix(in srgb, currentColor 80%, transparent) 0%, color-mix(in srgb, currentColor 10%, transparent) 40%, transparent 70%)',
                animation: 'nova-burst 1s ease-out forwards'
              }}
            >
               <div className="absolute inset-0 m-auto w-10 h-10 bg-white rounded-full blur-md animate-[nova-flash_1s_ease-out_forwards]"></div>
               <div className="absolute inset-0 m-auto w-full h-full border border-current rounded-full animate-[nova-ring_1s_ease-out_forwards]"></div>
            </div>
          ))}
        </div>
      )}

      <div 
        ref={artRef}
        className="absolute w-full h-full flex items-center justify-center animate-[slideInLeftItem_1s_ease-out_forwards] opacity-0"
        style={{
          transform: 'translateY(0) rotate(0deg)',
          transition: 'transform 0.1s ease-out'
        }}
      >
        {/* Outermost Faint Dashed Ring */}
      <div 
        className="absolute w-[115%] h-[115%] rounded-full border border-dashed border-[var(--portfolio-grey)]/10 transition-transform duration-100 ease-out"
        style={{ transform: 'rotateX(45deg) rotateY(-10deg) translate(var(--pointer-x-25, 0px), var(--pointer-y-25, 0px))' }}
      >
        <div className="absolute w-full h-full animate-[spin_40s_linear_infinite]"></div>
      </div>

      {/* Outer Orbit */}
      <div 
        className="absolute w-[100%] h-[100%] rounded-full border art-border-10 transition-transform duration-100 ease-out"
        style={{ transform: 'rotateX(40deg) rotateY(15deg) translate(var(--pointer-x-20, 0px), var(--pointer-y-20, 0px))' }}
      >
        <div className="absolute w-full h-full animate-[spin_25s_linear_infinite]">
          <div className="absolute -top-2 left-1/2 w-4 h-4 rounded-full art-bg-80 art-shadow-15"></div>
          <div className="absolute -bottom-2 left-1/2 w-3 h-3 rounded-full bg-[var(--portfolio-white)]/60"></div>
        </div>
      </div>
      
      {/* Scanning Radar Layer */}
      <div 
        className="absolute w-[85%] h-[85%] rounded-full border border-[var(--portfolio-grey)]/20 transition-transform duration-100 ease-out" 
        style={{ transform: 'rotateX(60deg) rotateY(20deg) translate(var(--pointer-x--15, 0px), var(--pointer-y--15, 0px))' }}
      >
        <div 
          className="absolute inset-0 rounded-full animate-[radar-scan_4s_linear_infinite]"
          style={{ background: 'conic-gradient(from 0deg, transparent 70%, color-mix(in srgb, currentColor 30%, transparent) 100%)' }}
        ></div>
        <div className="absolute w-full h-full animate-[spin_15s_linear_infinite_reverse]">
          <div className="absolute top-1/2 -left-2 w-3 h-3 rounded-full art-bg-60"></div>
          <div className="absolute top-1/2 -right-2 w-2 h-2 rounded-full bg-[var(--portfolio-white)]/80 shadow-[0_0_10px_white]"></div>
        </div>
      </div>

      {/* Fast Dashed Middle Ring */}
      <div 
        className="absolute w-[72%] h-[72%] rounded-full border-2 border-dashed art-border-15 transition-transform duration-100 ease-out" 
        style={{ transform: 'rotateX(20deg) rotateY(-30deg) translate(var(--pointer-x--5, 0px), var(--pointer-y--5, 0px))' }}
      >
        <div className="absolute w-full h-full animate-[spin_8s_linear_infinite]">
           <div className="absolute top-0 right-1/4 w-2 h-2 rounded-full art-bg-50"></div>
        </div>
      </div>
      
      {/* Inner Orbit */}
      <div 
        className="absolute w-[60%] h-[60%] rounded-full border art-border-20 transition-transform duration-100 ease-out" 
        style={{ transform: 'rotateX(30deg) rotateY(60deg) translate(var(--pointer-x-10, 0px), var(--pointer-y-10, 0px))' }}
      >
        <div className="absolute w-full h-full animate-[spin_10s_linear_infinite]">
          <div className="absolute -top-1.5 left-1/4 w-3 h-3 rounded-full bg-[var(--portfolio-white)]/90 shadow-[0_0_10px_var(--portfolio-white)]"></div>
        </div>
      </div>

      {/* Deep Inner Delicate Ring */}
      <div 
        className="absolute w-[40%] h-[40%] rounded-full border border-[var(--portfolio-grey)]/15 transition-transform duration-100 ease-out" 
        style={{ transform: 'rotateX(50deg) rotateY(-10deg) translate(var(--pointer-x-15, 0px), var(--pointer-y-15, 0px))' }}
      >
        <div className="absolute w-full h-full animate-[spin_12s_linear_infinite_reverse]">
          <div className="absolute bottom-0 left-1/2 w-1.5 h-1.5 rounded-full bg-[var(--portfolio-white)]/50"></div>
        </div>
      </div>
      
      {/* Central Morphing Polygon */}
      <div 
        className="absolute w-[18%] h-[18%] border animate-[morph-polygon_12s_linear_infinite] group-hover:shadow-[0_0_40px_currentColor] transition-all duration-500 flex items-center justify-center backdrop-blur-sm z-10"
        style={{ transform: 'translate(var(--pointer-x-5, 0px), var(--pointer-y-5, 0px))' }}
      >
        <div className="w-3 h-3 bg-current rounded-full animate-pulse shadow-[0_0_20px_currentColor]"></div>
      </div>

      {/* Axis Lines */}
      <div className="absolute w-[120%] h-[1px] art-gradient-line rotate-12 pointer-events-none"></div>
      <div className="absolute w-[120%] h-[1px] bg-gradient-to-r from-transparent via-[var(--portfolio-white)]/10 to-transparent -rotate-12 pointer-events-none"></div>
      </div>
    </div>
  );
}
