import { useState, useEffect, useRef } from 'react';
import useGraphicsQuality from '../hooks/useGraphicsQuality';

const POINTER_SCALES = [25, 20, -15, -5, 10, 15, 5];

export default function GeometricArt() {
  const containerRef = useRef(null);
  const frameRef = useRef(0);
  const rippleIdRef = useRef(0);
  const [motionReady, setMotionReady] = useState(false);
  const [shapeIndex, setShapeIndex] = useState(0);
  const [ripples, setRipples] = useState([]);
  const { quality, settings, reducedMotion } = useGraphicsQuality();

  useEffect(() => {
    const timer = globalThis.window.setTimeout(() => setMotionReady(true), 2000);
    return () => globalThis.window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    const browserWindow = globalThis.window;
    const root = containerRef.current;
    if (!root) return;

    let pointerX = 0;
    let pointerY = 0;
    let isVisible = false;
    let isInViewport = false;
    let tracksPointer = false;
    let lastUpdateAt = 0;
    let bounds = root.getBoundingClientRect();
    let throttleTimer = 0;

    // Keep high-frequency input out of React's render cycle and write at most once per frame.
    const scheduleUpdate = () => {
      if (!motionReady || frameRef.current || throttleTimer || !isVisible) return;
      frameRef.current = browserWindow.requestAnimationFrame((timestamp) => {
        frameRef.current = 0;
        const interval = 1000 / settings.fps;
        const elapsed = timestamp - lastUpdateAt;
        if (lastUpdateAt && elapsed < interval) {
          throttleTimer = browserWindow.setTimeout(() => {
            throttleTimer = 0;
            scheduleUpdate();
          }, interval - elapsed);
          return;
        }
        lastUpdateAt = timestamp;
        POINTER_SCALES.forEach((scale) => {
          const movement = reducedMotion ? 0 : settings.pointerStrength;
          root.style.setProperty(`--pointer-x-${scale}`, `${pointerX * scale * movement}px`);
          root.style.setProperty(`--pointer-y-${scale}`, `${pointerY * scale * movement}px`);
        });
      });
    };

    const handlePointerMove = (e) => {
      if (reducedMotion || !bounds.width || !bounds.height) return;
      pointerX = (e.clientX - bounds.left) / bounds.width - 0.5;
      pointerY = (e.clientY - bounds.top) / bounds.height - 0.5;
      scheduleUpdate();
    };

    const handleResize = () => {
      bounds = root.getBoundingClientRect();
      const nextInViewport = bounds.bottom > 0
        && bounds.top < browserWindow.innerHeight
        && bounds.right > 0
        && bounds.left < browserWindow.innerWidth;
      if (nextInViewport !== isInViewport) {
        isInViewport = nextInViewport;
        syncVisibility();
      }
      scheduleUpdate();
    };

    const syncVisibility = () => {
      const nextVisible = isInViewport && !browserWindow.document.hidden;
      if (nextVisible === isVisible) return;
      isVisible = nextVisible;
      root.dataset.visible = String(isVisible);
      if (isVisible) {
        scheduleUpdate();
      } else {
        if (frameRef.current) browserWindow.cancelAnimationFrame(frameRef.current);
        frameRef.current = 0;
        if (throttleTimer) browserWindow.clearTimeout(throttleTimer);
        throttleTimer = 0;
      }
    };

    const finePointer = browserWindow.matchMedia('(pointer: fine)');
    const syncPointerTracking = () => {
      const shouldTrackPointer = finePointer.matches && !reducedMotion;
      if (shouldTrackPointer === tracksPointer) return;
      tracksPointer = shouldTrackPointer;
      pointerX = 0;
      pointerY = 0;
      if (tracksPointer) {
        root.addEventListener('pointermove', handlePointerMove, { passive: true });
      } else {
        root.removeEventListener('pointermove', handlePointerMove);
      }
      scheduleUpdate();
    };
    syncPointerTracking();
    finePointer.addEventListener?.('change', syncPointerTracking);
    if (!finePointer.addEventListener) finePointer.addListener?.(syncPointerTracking);
    browserWindow.addEventListener('resize', handleResize, { passive: true });
    browserWindow.document.addEventListener('visibilitychange', syncVisibility);

    let observer;
    if (typeof globalThis.IntersectionObserver === 'function') {
      observer = new globalThis.IntersectionObserver(([entry]) => {
        isInViewport = entry.isIntersecting;
        syncVisibility();
      });
      observer.observe(root);
    } else {
      isInViewport = true;
      syncVisibility();
    }
    scheduleUpdate();

    return () => {
      if (tracksPointer) {
        root.removeEventListener('pointermove', handlePointerMove);
      }
      finePointer.removeEventListener?.('change', syncPointerTracking);
      if (!finePointer.removeEventListener) finePointer.removeListener?.(syncPointerTracking);
      browserWindow.document.removeEventListener('visibilitychange', syncVisibility);
      observer?.disconnect();
      browserWindow.removeEventListener('resize', handleResize);
      if (frameRef.current) browserWindow.cancelAnimationFrame(frameRef.current);
      if (throttleTimer) browserWindow.clearTimeout(throttleTimer);
    };
  }, [settings, reducedMotion, motionReady]);

  const handleClick = (event) => {
    const browserWindow = globalThis.window;
    if (browserWindow.matchMedia('(pointer: coarse)').matches) return;

    setShapeIndex((current) => (current + 1) % 4);
    if (!reducedMotion) {
      const bounds = containerRef.current.getBoundingClientRect();
      setRipples((current) => [...current, {
        id: ++rippleIdRef.current,
        x: event.clientX - bounds.left,
        y: event.clientY - bounds.top,
      }]);
    }
  };

  return (
    <div 
      ref={containerRef}
      className="geometric-art relative w-full max-w-[500px] aspect-square flex items-center justify-center group mx-auto mix-blend-screen z-[0] cursor-pointer animate-[art-color-shift_12s_linear_infinite]"
      data-quality={quality}
      data-reduced-motion={reducedMotion}
      data-motion-ready={motionReady}
      onClick={handleClick}
    >
      {ripples.map((ripple) => (
        <div
          key={ripple.id}
          className="geometric-art-click-burst"
          style={{ left: ripple.x, top: ripple.y }}
          onAnimationEnd={(event) => {
            if (event.target === event.currentTarget) {
              setRipples((current) => current.filter(({ id }) => id !== ripple.id));
            }
          }}
          aria-hidden="true"
        >
          <span className="geometric-art-click-flash" />
          <span className="geometric-art-click-ring" />
        </div>
      ))}
      <div 
        className="geometric-art-entrance absolute w-full h-full flex items-center justify-center"
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
      
      {/* Click-reactive center shape and ring pulse */}
      <div className="geometric-art-center absolute w-[18%] h-[18%] z-10" data-shape={shapeIndex}>
        <div
          className="geometric-art-core w-full h-full border group-hover:shadow-[0_0_40px_currentColor] flex items-center justify-center backdrop-blur-sm"
          style={{ transform: 'translate(var(--pointer-x-5, 0px), var(--pointer-y-5, 0px))' }}
        >
          <div className="geometric-art-core-dot w-3 h-3 bg-current rounded-full shadow-[0_0_20px_currentColor]"></div>
        </div>
      </div>

      {/* Axis Lines */}
      <div className="absolute w-[120%] h-[1px] art-gradient-line rotate-12 pointer-events-none"></div>
      <div className="absolute w-[120%] h-[1px] bg-gradient-to-r from-transparent via-[var(--portfolio-white)]/10 to-transparent -rotate-12 pointer-events-none"></div>
      </div>
    </div>
  );
}
