import { useEffect, useRef, useState, ReactNode } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import NarutoCharacter from './NarutoCharacter';
import { triggerPageFlip } from './HUD';

gsap.registerPlugin(ScrollTrigger);

interface Props {
  children: ReactNode;
}

const ParallaxWorld = ({ children }: Props) => {
  const wrapperRef     = useRef<HTMLDivElement>(null);
  const worldRef       = useRef<HTMLDivElement>(null);
  const [charState, setCharState] = useState<'idle' | 'running' | 'jumping'>('idle');
  const [charX, setCharX]         = useState(120);
  const [isMobile, setIsMobile]   = useState(window.innerWidth < 768);
  const idleTimerRef   = useRef<ReturnType<typeof setTimeout> | null>(null);
  const lastSectionRef = useRef<number>(-1);

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  useEffect(() => {
    if (isMobile) return;

    const world   = worldRef.current;
    const wrapper = wrapperRef.current;
    if (!world || !wrapper) return;

    const totalWidth  = () => world.scrollWidth - window.innerWidth;
    const numSections = world.querySelectorAll('.section-room').length || 4;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: wrapper,
        start: 'top top',
        end: () => `+=${totalWidth()}`,
        scrub: 1,
        pin: world,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          const tx = -self.progress * totalWidth();
          gsap.set(world, { x: tx });

          // Character X
          const targetX = 80 + (-tx) * 0.12;
          setCharX(Math.max(60, Math.min(targetX, window.innerWidth - 80)));

          // Run / idle
          if (Math.abs(self.getVelocity()) > 20) {
            setCharState('running');
            if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
            idleTimerRef.current = setTimeout(() => setCharState('idle'), 250);
          }

          // Parallax sub-layers
          const layers = world.querySelectorAll<HTMLElement>('[data-parallax]');
          layers.forEach(layer => {
            const speed = parseFloat(layer.dataset.parallax || '0');
            layer.style.transform = `translateX(${tx * speed}px)`;
          });

          // Section crossing → page flip
          const sectionIdx = Math.floor(self.progress * numSections);
          const clamped = Math.min(sectionIdx, numSections - 1);
          if (clamped !== lastSectionRef.current) {
            lastSectionRef.current = clamped;
            triggerPageFlip('section');
          }
        },
      });

      ScrollTrigger.refresh();
    }, wrapper);

    return () => ctx.revert();
  }, [isMobile]);

  if (isMobile) {
    return <div style={{ width: '100%' }}>{children}</div>;
  }

  return (
    <div ref={wrapperRef} style={{ height: '400vh' }}>
      <div
        ref={worldRef}
        style={{
          display: 'flex',
          alignItems: 'stretch',
          width: 'max-content',
          height: '100vh',
          position: 'relative',
          willChange: 'transform',
        }}
      >
        {children}

        {/* Naruto character */}
        <div style={{
          position: 'fixed',
          bottom: 80,
          left: charX,
          zIndex: 50,
          pointerEvents: 'none',
          transition: 'left 0.08s linear',
          filter: 'drop-shadow(0 0 10px rgba(232,125,43,0.55))',
        }}>
          <NarutoCharacter state={charState} />
        </div>
      </div>

      {/* Ground gradient */}
      <div style={{
        position: 'fixed',
        bottom: 0, left: 0, right: 0,
        height: 80,
        background: 'linear-gradient(to top, #0d0f17 0%, transparent 100%)',
        zIndex: 20,
        pointerEvents: 'none',
      }} />
    </div>
  );
};

export default ParallaxWorld;
