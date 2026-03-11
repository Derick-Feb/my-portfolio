import { useEffect, useRef, useState } from 'react';

const TESTIMONIALS = [
  {
    quote: "Derick's attention to detail and ability to translate complex requirements into elegant solutions is truly impressive. He delivered the project ahead of schedule with zero bugs.",
    name: 'Sarah Müller',
    role: 'Product Lead, TechFlow GmbH',
    npcColor: '#1a2535',
  },
  {
    quote: "Working with Derick felt like having a senior engineer on the team. His code is clean, documented, and his communication throughout the project was excellent.",
    name: 'Kwame Asante',
    role: 'CTO, AfriTech Solutions',
    npcColor: '#1e1a30',
  },
  {
    quote: "He built our gaming platform from scratch with lightning speed. The animations and UX he crafted blew our investors away. Highly recommend.",
    name: 'Yuki Tanaka',
    role: 'Founder, NeonPlay Studios',
    npcColor: '#1a2820',
  },
];

const NPCSilhouette = ({ color, active }: { color: string; active: boolean }) => (
  <svg width="50" height="90" viewBox="0 0 50 90" fill="none"
    style={{ opacity: active ? 0.85 : 0.45, transition: 'opacity 0.4s' }}>
    <circle cx="25" cy="12" r="10" fill={color} />
    <path d="M14 22 Q25 18 36 22 L38 60 H12 Z" fill={color} />
    <path d="M14 28 Q6 45 8 58" stroke={color} strokeWidth="6" strokeLinecap="round" fill="none" />
    <path d="M36 28 Q44 45 42 58" stroke={color} strokeWidth="6" strokeLinecap="round" fill="none" />
    <path d="M18 60 Q15 75 14 88" stroke={color} strokeWidth="7" strokeLinecap="round" fill="none" />
    <path d="M32 60 Q35 75 36 88" stroke={color} strokeWidth="7" strokeLinecap="round" fill="none" />
    {active && <circle cx="25" cy="45" r="30" fill="rgba(232,125,43,0.04)" />}
  </svg>
);

const RestoBarSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [visibleNPCs, setVisibleNPCs] = useState<Set<number>>(new Set());

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const npcEls = section.querySelectorAll<HTMLElement>('[data-npc-index]');
    const observers: IntersectionObserver[] = [];
    npcEls.forEach((el) => {
      const idx = parseInt(el.dataset.npcIndex || '0', 10);
      const obs = new IntersectionObserver(
        ([entry]) => {
          setVisibleNPCs(prev => {
            const next = new Set(prev);
            entry.isIntersecting ? next.add(idx) : next.delete(idx);
            return next;
          });
        },
        { threshold: 0.4 }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach(o => o.disconnect());
  }, []);

  return (
    <section
      id="restobar"
      className="section-room"
      ref={sectionRef}
      style={{
        background: 'linear-gradient(160deg, #08090d 0%, #100e18 40%, #0a0d0a 100%)',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        overflow: 'hidden',
        padding: '80px 6vw 40px',
      }}
    >
      <div className="parallax-layer layer-sky" data-parallax="0.12"
        style={{ background: 'radial-gradient(ellipse at 50% 80%, #0e1215, #08090d 60%)' }} />

      <div className="parallax-layer layer-far" data-parallax="0.22"
        style={{ bottom: 0, top: 0, opacity: 0.45 }}>
        <svg viewBox="0 0 1200 700" width="100%" height="100%" preserveAspectRatio="xMidYMax slice">
          <rect width="1200" height="700" fill="#0e0c12" />
          {Array.from({ length: 15 }, (_, row) =>
            Array.from({ length: 20 }, (_, col) => (
              <rect key={`${row}-${col}`} x={col * 62 + (row % 2) * 31} y={row * 28}
                width="58" height="24" fill="none"
                stroke="rgba(40,35,55,0.6)" strokeWidth="1" />
            ))
          )}
          <rect x="0" y="500" width="1200" height="200" fill="#120f1a" />
          <rect x="0" y="498" width="1200" height="6" fill="#24203a" />
          {[200, 600, 1000].map((x, i) => (
            <g key={i}>
              <line x1={x} y1="0" x2={x} y2="150" stroke="rgba(60,55,80,0.4)" strokeWidth="1" />
              <ellipse cx={x} cy="155" rx="20" ry="10" fill="#1a1530" stroke="rgba(80,70,100,0.5)" strokeWidth="1" />
              <path d={`M${x - 20} 165 L${x - 80} 400 L${x + 80} 400 L${x + 20} 165 Z`}
                fill="rgba(255,200,80,0.03)" />
            </g>
          ))}
        </svg>
      </div>

      <div className="parallax-layer layer-near" data-parallax="0.7"
        style={{ bottom: 0, top: 'auto', height: '30%', opacity: 0.5 }}>
        <svg viewBox="0 0 1200 200" width="100%" height="100%" preserveAspectRatio="xMinYMax slice">
          {[80, 350, 620, 890].map((x, i) => (
            <g key={i}>
              <rect x={x} y="80" width="160" height="8" rx="4" fill="#1a1525" />
              <line x1={x + 20} y1="88" x2={x + 20} y2="160" stroke="#1a1525" strokeWidth="6" />
              <line x1={x + 140} y1="88" x2={x + 140} y2="160" stroke="#1a1525" strokeWidth="6" />
            </g>
          ))}
        </svg>
      </div>

      <div style={{ position: 'absolute', inset: 0, zIndex: 6, pointerEvents: 'none' }}>
        <div style={{ position: 'absolute', top: '20%', left: '10%', width: 300, height: 300,
          background: 'radial-gradient(circle, rgba(180,30,30,0.06), transparent 70%)', borderRadius: '50%' }} />
        <div style={{ position: 'absolute', top: '30%', right: '15%', width: 250, height: 250,
          background: 'radial-gradient(circle, rgba(50,30,120,0.08), transparent 70%)', borderRadius: '50%' }} />
      </div>

      <div className="fog-vignette" style={{ zIndex: 8 }} />

      <div style={{ position: 'relative', zIndex: 10, maxWidth: 1000, width: '100%', margin: '0 auto' }}>
        <span className="section-eyebrow">THE RESTO-BAR</span>
        <h2 className="section-title" style={{ marginBottom: '3rem', fontSize: 'clamp(2rem, 6vw, 7rem)' }}>
          WHAT THEY<br />
          <span style={{ color: 'var(--naruto-orange)' }}>SAY</span>
        </h2>

        <div style={{ display: 'flex', gap: '4vw', alignItems: 'flex-end', flexWrap: 'wrap' }}>
          {TESTIMONIALS.map((t, i) => (
            <div key={i} data-npc-index={i}
              style={{ position: 'relative', display: 'flex', flexDirection: 'column',
                alignItems: 'flex-start', flex: '1 1 260px', minWidth: 220 }}>
              <div className={`dialogue-bubble${visibleNPCs.has(i) ? ' visible' : ''}`}
                style={{ position: 'relative', marginBottom: 24, transitionDelay: `${i * 0.15}s` }}>
                <span style={{ fontFamily: 'Georgia, serif', fontSize: '3rem', color: 'var(--naruto-orange)',
                  lineHeight: 0.5, display: 'block', marginBottom: 8, opacity: 0.6 }}>"</span>
                <p style={{ color: 'var(--text-primary)', fontSize: '0.85rem', lineHeight: 1.7, fontStyle: 'italic' }}>
                  {t.quote}
                </p>
                <div style={{ marginTop: 12, borderTop: '1px solid rgba(232,125,43,0.15)', paddingTop: 10 }}>
                  <span style={{ display: 'block', color: 'var(--naruto-orange)', fontFamily: 'var(--font-display)',
                    fontSize: '0.9rem', letterSpacing: '0.06em' }}>{t.name}</span>
                  <span style={{ fontSize: '0.7rem', color: 'var(--text-dim)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                    {t.role}
                  </span>
                </div>
              </div>
              <NPCSilhouette color={t.npcColor} active={visibleNPCs.has(i)} />
              <div style={{ width: 50, height: 4, background: 'radial-gradient(ellipse, rgba(0,0,0,0.4), transparent 70%)', borderRadius: '50%' }} />
            </div>
          ))}
        </div>
      </div>

      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 80,
        background: 'linear-gradient(to top, #08090d, transparent 100%)', zIndex: 9 }} />
    </section>
  );
};

export default RestoBarSection;
