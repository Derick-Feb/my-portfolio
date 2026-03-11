import { useEffect, useRef } from 'react';
import gsap from 'gsap';

const HeroSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Cinematic reveal
      gsap.from('.brutalist-title span', {
        opacity: 0,
        y: 100,
        rotateX: -90,
        stagger: 0.1,
        duration: 1.5,
        ease: 'power4.out',
      });
      gsap.from('.hero-sub', {
        opacity: 0,
        x: -50,
        duration: 1,
        delay: 0.8,
        ease: 'power3.out',
      });
      gsap.from('.hero-cta', {
        opacity: 0,
        scale: 0.9,
        stagger: 0.2,
        duration: 0.8,
        delay: 1.2,
        ease: 'back.out(1.7)',
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleJump = (targetProgress: number) => {
    window.dispatchEvent(new CustomEvent('hudJump', { 
      detail: { progress: targetProgress } 
    }));
  };

  return (
    <section
      id="hero"
      className="section-room"
      ref={sectionRef}
      style={{
        background: `linear-gradient(135deg, #08090d 0%, #0d1020 50%, #0a0e1a 100%)`,
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingLeft: '12vw',
      }}
    >
      {/* ── Parallax Layers ── */}
      <div className="parallax-layer" data-parallax="0.1" style={{ background: 'radial-gradient(ellipse at 30% 60%, #1a2040 0%, #08090d 70%)' }} />
      <div className="parallax-layer" data-parallax="0.25" style={{ inset: 'auto 0 0', height: '60%', opacity: 0.35 }}>
        <div style={{ position: 'absolute', bottom: 0, width: '100%', height: '100%', background: 'linear-gradient(to top, #08090d, transparent)' }} />
      </div>

      <div className="fog-vignette" />

      {/* ── MAIN CONTENT ── */}
      <div
        ref={titleRef}
        style={{
          position: 'relative',
          zIndex: 10,
          textAlign: 'left',
          maxWidth: 900,
        }}
      >
        <h1 className="brutalist-title" style={{ 
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(4rem, 12vw, 11rem)',
          lineHeight: 0.82,
          color: 'var(--text-primary)',
          textTransform: 'uppercase',
          margin: '20px 0 40px',
          perspective: '1000px',
        }}>
          <span style={{ display: 'block' }}>BUGINGO</span>
          <span style={{ display: 'block', color: 'var(--naruto-orange)' }}>ERIC DERICK</span>
        </h1>

        <p className="hero-sub" style={{
          color: 'var(--text-secondary)',
          fontSize: 'clamp(1rem, 1.5vw, 1.25rem)',
          maxWidth: 550,
          marginBottom: '3.5rem',
          lineHeight: 1.6,
          letterSpacing: '0.02em',
        }}>
          Designing immersive digital worlds and high-performance interactive narratives with the modular precision of a ninja.
        </p>

        <div style={{ display: 'flex', gap: 24 }}>
          <button
            className="hero-cta rim-glow"
            onClick={() => handleJump(0.33)}
            style={{
              background: 'var(--naruto-orange)',
              color: 'var(--bg-void)',
              padding: '18px 48px',
              fontSize: '1.2rem',
              fontWeight: 800,
              border: 'none',
              borderRadius: 4,
              cursor: 'pointer',
              fontFamily: 'var(--font-display)',
              letterSpacing: '0.15em',
            }}
          >
            VIEW PROJECTS
          </button>
          <button
            className="hero-cta"
            onClick={() => handleJump(1.0)}
            style={{
              background: 'transparent',
              border: '2px solid rgba(232,125,43,0.4)',
              color: 'var(--text-primary)',
              padding: '18px 48px',
              fontSize: '1.2rem',
              borderRadius: 4,
              cursor: 'pointer',
              fontFamily: 'var(--font-display)',
              letterSpacing: '0.15em',
            }}
          >
            CONTACT ME
          </button>
        </div>

        {/* Interaction Hint */}
        <div className="hero-sub" style={{ 
          marginTop: '5rem', 
          opacity: 0.5, 
          display: 'flex', 
          alignItems: 'center', 
          gap: 16 
        }}>
          <div style={{ width: 60, height: 1, background: 'currentColor' }} />
          <span style={{ fontSize: '0.65rem', letterSpacing: '0.3em', textTransform: 'uppercase' }}>
            SCROLL OR USE ARROWS TO TRAVERSE
          </span>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
