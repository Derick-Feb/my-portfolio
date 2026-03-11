import { useEffect, useRef, useState, ReactNode } from 'react';
import gsap from 'gsap';
import { triggerPageFlip } from './HUD';
import NarutoCharacter from './NarutoCharacter';

interface Props {
  children: ReactNode;
}

const ParallaxWorld = ({ children }: Props) => {
  const worldRef = useRef<HTMLDivElement>(null);
  
  // Progress from 0 to 1
  const [progress, setProgress] = useState(0);
  const [flipped, setFlipped]   = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  
  const keysPressed = useRef<Set<string>>(new Set());
  const rafRef      = useRef<number | null>(null);
  const scrollTimer = useRef<number | null>(null);
  const lastSection = useRef<number>(0);

  // Constants
  const NUM_SECTIONS = 4;
  const MOVE_SPEED = 0.007; 

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      const valid = ['.', '>', ',', '<', 'ArrowRight', 'ArrowLeft'].includes(e.key);
      if (valid) {
        keysPressed.current.add(e.key);
        if (!rafRef.current) moveLoop();
      }
    };
    const onKeyUp = (e: KeyboardEvent) => {
      keysPressed.current.delete(e.key);
    };

    const moveLoop = () => {
      setProgress(prev => {
        let next = prev;
        const right = keysPressed.current.has('.') || keysPressed.current.has('>') || keysPressed.current.has('ArrowRight');
        const left  = keysPressed.current.has(',') || keysPressed.current.has('<') || keysPressed.current.has('ArrowLeft');

        if (right) {
          next = Math.min(1, prev + MOVE_SPEED);
          setFlipped(false);
          setIsRunning(true);
        } else if (left) {
          next = Math.max(0, prev - MOVE_SPEED);
          setFlipped(true);
          setIsRunning(true);
        } else {
          setIsRunning(false);
        }
        return next;
      });

      if (keysPressed.current.size > 0) {
        rafRef.current = requestAnimationFrame(moveLoop);
      } else {
        rafRef.current = null;
        setIsRunning(false);
      }
    };

    const onWheel = (e: WheelEvent) => {
      // STOP AGGRESSIVE BROWSER SCROLL
      if (e.cancelable) e.preventDefault();
      
      const sensitivity = 0.0007;
      const delta = e.deltaY * sensitivity;
      
      setProgress(prev => {
        const next = Math.max(0, Math.min(1, prev + delta));
        if (delta > 0) setFlipped(false);
        else if (delta < 0) setFlipped(true);
        
        if (Math.abs(delta) > 0.001) {
          setIsRunning(true);
          if (scrollTimer.current) window.clearTimeout(scrollTimer.current);
          scrollTimer.current = window.setTimeout(() => setIsRunning(false), 150);
        }
        return next;
      });
    };

    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('keyup', onKeyUp);
    window.addEventListener('wheel', onWheel as any, { passive: false });
    
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('keyup', onKeyUp);
      window.removeEventListener('wheel', onWheel as any);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      if (scrollTimer.current) window.clearTimeout(scrollTimer.current);
    };
  }, []);

  // Sync state to DOM
  useEffect(() => {
    const world = worldRef.current;
    if (!world) return;

    const totalWidth = world.scrollWidth - window.innerWidth;
    const tx = -progress * totalWidth;

    gsap.to(world, { x: tx, duration: 0.1, ease: 'none' });

    // Parallax
    const layers = world.querySelectorAll<HTMLElement>('[data-parallax]');
    layers.forEach(layer => {
      const speed = parseFloat(layer.dataset.parallax || '0');
      gsap.to(layer, { x: tx * speed, duration: 1, ease: 'power1.out' });
    });

    // Page flip & Navbar tracking
    const sec = Math.min(Math.floor(progress * (NUM_SECTIONS - 0.001)), NUM_SECTIONS - 1);
    if (sec !== lastSection.current) {
      lastSection.current = sec;
      triggerPageFlip('section');
      
      const sectionIds = ['hero', 'library', 'restobar', 'booth'];
      window.dispatchEvent(new CustomEvent('sectionChange', { 
        detail: { activeId: sectionIds[sec] } 
      }));
    }
  }, [progress]);

  // Fast Travel
  useEffect(() => {
    const handleJump = (e: any) => {
      const targetP = e.detail.progress;
      const obj = { p: progress };
      gsap.to(obj, {
        p: targetP,
        duration: 1.2,
        ease: 'power2.inOut',
        onUpdate: () => setProgress(obj.p)
      });
    };
    window.addEventListener('hudJump', handleJump as EventListener);
    return () => window.removeEventListener('hudJump', handleJump as EventListener);
  }, [progress]);

  return (
    <div className="world-container">
      {/* Naruto - FIXED OUTSIDE TRANSFORMED WORLD DIV */}
      <div style={{
        position: 'fixed',
        bottom: 120,
        left: '20%', 
        transform: 'translateX(-50%)',
        zIndex: 50,
        pointerEvents: 'none',
      }}>
        <NarutoCharacter state={isRunning ? 'running' : 'idle'} flipped={flipped} />
      </div>

      <div
        ref={worldRef}
        style={{
          display: 'flex',
          width: 'max-content',
          height: '100vh',
          willChange: 'transform',
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default ParallaxWorld;
