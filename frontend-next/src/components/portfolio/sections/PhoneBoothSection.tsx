import { useState, useRef } from 'react';
import { createPortal } from 'react-dom';

const PhoneBoothSection = () => {
  const [boothEntered, setBoothEntered] = useState(false);
  const [formOpen, setFormOpen] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [sent, setSent] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Contact form:', form);
    setSent(true);
    setTimeout(() => { setSent(false); setFormOpen(false); setBoothEntered(false); }, 3000);
  };

  const enterBooth = () => {
    setBoothEntered(true);
    setTimeout(() => setFormOpen(true), 600);
  };

  const SOCIALS = [
    { name: 'GitHub',   link: 'https://github.com/Derick-Feb/', icon: '⌥' },
    { name: 'LinkedIn', link: 'https://www.linkedin.com/in/bugingo-eric-derick-1764a332a/', icon: '⊕' },
    { name: 'X / Twitter', link: 'https://x.com/dede001001', icon: '✕' },
  ];

  return (
    <section
      id="booth"
      className="section-room"
      ref={sectionRef}
      style={{
        background: 'linear-gradient(160deg, #080a0a 0%, #0a0c0c 60%, #05080a 100%)',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
        padding: '80px 6vw 40px',
      }}
    >
      {/* Sky */}
      <div
        className="parallax-layer layer-sky"
        data-parallax="0.1"
        style={{ background: 'radial-gradient(ellipse at 50% 30%, #0a0c10, #050608 70%)' }}
      />

      {/* Far: foggy field */}
      <div className="parallax-layer layer-far" data-parallax="0.2" style={{ bottom: 0, top: 'auto', height: '50%', opacity: 0.4 }}>
        <svg viewBox="0 0 1200 400" width="100%" height="100%" preserveAspectRatio="xMidYMax slice">
          <rect width="1200" height="400" fill="#0a0c10" />
          {/* Horizontal fog bands */}
          {[100, 180, 260, 340].map((y, i) => (
            <rect key={i} x="0" y={y} width="1200" height="30" fill={`rgba(15,20,25,${0.3 + i * 0.1})`} />
          ))}
          {/* Dead trees */}
          {[100, 300, 500, 700, 900, 1100].map((x, i) => (
            <g key={i} opacity="0.5">
              <line x1={x} y1="400" x2={x} y2={200 - i * 10} stroke="#0f1318" strokeWidth={3 + i % 2} />
              <line x1={x} y1={280 - i * 5} x2={x - 30 - i * 5} y2={240 - i * 8} stroke="#0f1318" strokeWidth="2" />
              <line x1={x} y1={270 - i * 5} x2={x + 25 + i * 4} y2={235 - i * 6} stroke="#0f1318" strokeWidth="2" />
            </g>
          ))}
        </svg>
      </div>

      {/* Near: ground mist */}
      <div
        className="parallax-layer layer-near"
        data-parallax="0.6"
        style={{ bottom: 0, top: 'auto', height: '40%', opacity: 0.7 }}
      >
        <svg viewBox="0 0 1200 260" width="100%" height="100%" preserveAspectRatio="xMidYMax slice">
          <defs>
            <filter id="blur-mist"><feGaussianBlur stdDeviation="15" /></filter>
          </defs>
          <ellipse cx="600" cy="220" rx="700" ry="80" fill="rgba(10,14,18,0.6)" filter="url(#blur-mist)" />
          <ellipse cx="200" cy="240" rx="400" ry="60" fill="rgba(10,14,18,0.5)" filter="url(#blur-mist)" />
          <ellipse cx="1000" cy="230" rx="350" ry="55" fill="rgba(10,14,18,0.5)" filter="url(#blur-mist)" />
          <rect x="0" y="240" width="1200" height="60" fill="#06080a" />
        </svg>
      </div>

      <div className="fog-vignette" style={{ zIndex: 8 }} />

      {/* ── MAIN CONTENT ── */}
      <div style={{ position: 'relative', zIndex: 10, textAlign: 'center', maxWidth: 900, width: '100%' }}>
        <span className="section-eyebrow">THE PHONE BOOTH</span>
        <h2 className="section-title" style={{ marginBottom: '1rem', fontSize: 'clamp(2rem, 6vw, 7rem)' }}>
          MAKE<br />
          <span style={{ color: 'var(--naruto-orange)' }}>CONTACT</span>
        </h2>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '3rem', fontSize: '0.9rem', maxWidth: 400, margin: '0 auto 3rem' }}>
          Step inside the booth and pick up the receiver to transmit a message.
        </p>

        {/* Phone booth SVG */}
        <div
          onClick={!boothEntered ? enterBooth : undefined}
          className={boothEntered ? '' : 'rim-glow-subtle'}
          style={{
            display: 'inline-block',
            cursor: boothEntered ? 'default' : 'pointer',
            margin: '0 auto 2rem',
            transition: 'transform 0.3s',
            transform: boothEntered ? 'scale(1.05)' : 'scale(1)',
          }}
          title={boothEntered ? '' : 'Click to enter the booth'}
        >
          <svg width="120" height="220" viewBox="0 0 120 220" fill="none" xmlns="http://www.w3.org/2000/svg"
            className={boothEntered ? 'phone-booth-glow' : ''}
          >
            {/* Booth body */}
            <rect x="10" y="20" width="100" height="180" rx="4" fill="#1a0808" stroke="#cc2020" strokeWidth="2" />
            {/* Red top */}
            <rect x="5" y="10" width="110" height="20" rx="3" fill="#cc2020" />
            <rect x="0" y="8" width="120" height="8" rx="2" fill="#aa1515" />
            {/* Glass panels */}
            <rect x="15" y="30" width="38" height="70" rx="2" fill="rgba(20,40,40,0.7)" stroke="rgba(200,30,30,0.5)" strokeWidth="1" />
            <rect x="67" y="30" width="38" height="70" rx="2" fill="rgba(20,40,40,0.7)" stroke="rgba(200,30,30,0.5)" strokeWidth="1" />
            <rect x="15" y="110" width="38" height="60" rx="2" fill="rgba(20,40,40,0.7)" stroke="rgba(200,30,30,0.5)" strokeWidth="1" />
            <rect x="67" y="110" width="38" height="60" rx="2" fill="rgba(20,40,40,0.7)" stroke="rgba(200,30,30,0.5)" strokeWidth="1" />
            {/* Center column */}
            <rect x="56" y="25" width="8" height="165" fill="#881010" />
            {/* Phone on wall */}
            <rect x="45" y="60" width="30" height="50" rx="3" fill="#0a0a0a" stroke="rgba(200,30,30,0.4)" strokeWidth="1" />
            <rect x="48" y="65" width="24" height="18" rx="1" fill="#1a1a1a" />
            {/* Receiver */}
            <path d="M50 85 Q45 95 48 105" stroke="#333" strokeWidth="3" strokeLinecap="round" fill="none" />
            {/* Red glow from inside */}
            {boothEntered && (
              <>
                <rect x="11" y="21" width="98" height="178" rx="3" fill="rgba(200,30,30,0.08)" />
                <ellipse cx="60" cy="180" rx="50" ry="20" fill="rgba(200,30,30,0.15)" />
              </>
            )}
            {/* TELEPHONE text on top */}
            <text x="60" y="17" textAnchor="middle" fill="rgba(255,255,255,0.6)" fontSize="6" fontFamily="var(--font-display)" letterSpacing="1">
              TELEPHONE
            </text>
            {/* Instruction when not entered */}
            {!boothEntered && (
              <text x="60" y="215" textAnchor="middle" fill="rgba(200,30,30,0.7)" fontSize="6" fontFamily="var(--font-body)">
                CLICK TO ENTER
              </text>
            )}
          </svg>
        </div>

        {/* Contact info below booth */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '3rem', flexWrap: 'wrap', marginTop: '2rem' }}>
          {[
            { label: 'EMAIL', value: 'bugingoderer@gmail.com', href: 'mailto:bugingoderer@gmail.com' },
            { label: 'PHONE', value: '+250 781 296 448', href: 'tel:+250781296448' },
            { label: 'LOCATION', value: 'Nyabihu, Rwanda', href: '#' },
          ].map(({ label, value, href }) => (
            <div key={label} style={{ textAlign: 'center' }}>
              <span style={{ display: 'block', fontSize: '0.6rem', letterSpacing: '0.2em', color: 'var(--naruto-orange)', marginBottom: 6, fontFamily: 'var(--font-body)', textTransform: 'uppercase' }}>
                {label}
              </span>
              <a href={href} style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '0.85rem', transition: 'color 0.2s' }}
                onMouseOver={e => (e.currentTarget.style.color = 'var(--naruto-orange)')}
                onMouseOut={e => (e.currentTarget.style.color = 'var(--text-secondary)')}
              >
                {value}
              </a>
            </div>
          ))}
        </div>

        {/* Social links */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: 12, marginTop: '2rem' }}>
          {SOCIALS.map(({ name, link }) => (
            <a
              key={name}
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="rim-glow-subtle"
              style={{
                padding: '8px 20px',
                border: '1px solid rgba(232,125,43,0.25)',
                color: 'var(--text-secondary)',
                textDecoration: 'none',
                fontSize: '0.72rem',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                transition: 'border-color 0.2s, color 0.2s',
                borderRadius: 2,
                fontFamily: 'var(--font-body)',
              }}
              onMouseOver={e => { e.currentTarget.style.borderColor = 'var(--naruto-orange)'; e.currentTarget.style.color = 'var(--naruto-orange)'; }}
              onMouseOut={e => { e.currentTarget.style.borderColor = 'rgba(232,125,43,0.25)'; e.currentTarget.style.color = 'var(--text-secondary)'; }}
            >
              {name}
            </a>
          ))}
        </div>
      </div>

      {/* Floor */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0,
        height: 80,
        background: 'linear-gradient(to top, #06080a 0%, transparent 100%)',
        zIndex: 9,
      }} />

      {/* Holographic form modal */}
      {formOpen && createPortal(
        <div className="modal-overlay" onClick={e => { if (e.target === e.currentTarget) { setFormOpen(false); setBoothEntered(false); } }}>
          <div className="hologram-form" style={{ width: '100%', maxWidth: 520, padding: '0' }}>
            {/* Header */}
            <div style={{
              padding: '28px 32px 20px',
              borderBottom: '1px solid rgba(232,125,43,0.15)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
              <div>
                <span style={{ fontSize: '0.6rem', letterSpacing: '0.2em', color: 'var(--naruto-orange)', textTransform: 'uppercase', display: 'block', marginBottom: 4 }}>
                  ◈ SECURE TRANSMISSION
                </span>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.8rem', color: 'var(--text-primary)', letterSpacing: '0.05em' }}>
                  SEND MESSAGE
                </h3>
              </div>
              <button
                onClick={() => { setFormOpen(false); setBoothEntered(false); }}
                style={{ background: 'none', border: '1px solid rgba(232,125,43,0.3)', color: 'var(--naruto-orange)', width: 32, height: 32, cursor: 'pointer', borderRadius: 2, fontSize: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              >×</button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} style={{ padding: '24px 32px 32px', display: 'flex', flexDirection: 'column', gap: 16 }}>
              {sent ? (
                <div style={{ textAlign: 'center', padding: '2rem 0' }}>
                  <div style={{ fontSize: '3rem', marginBottom: 12 }}>⚡</div>
                  <span style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', color: 'var(--naruto-orange)', letterSpacing: '0.1em' }}>
                    MESSAGE TRANSMITTED
                  </span>
                  <p style={{ color: 'var(--text-secondary)', marginTop: 8, fontSize: '0.85rem' }}>Dattebayo! I'll respond soon.</p>
                </div>
              ) : (
                <>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.65rem', letterSpacing: '0.15em', color: 'var(--naruto-orange)', marginBottom: 8, textTransform: 'uppercase' }}>
                      IDENTIFIER (Name)
                    </label>
                    <input
                      className="hologram-input"
                      type="text"
                      placeholder="Your name"
                      value={form.name}
                      onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                      required
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.65rem', letterSpacing: '0.15em', color: 'var(--naruto-orange)', marginBottom: 8, textTransform: 'uppercase' }}>
                      CHANNEL (Email)
                    </label>
                    <input
                      className="hologram-input"
                      type="email"
                      placeholder="your@email.com"
                      value={form.email}
                      onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                      required
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.65rem', letterSpacing: '0.15em', color: 'var(--naruto-orange)', marginBottom: 8, textTransform: 'uppercase' }}>
                      MESSAGE
                    </label>
                    <textarea
                      className="hologram-input"
                      rows={4}
                      placeholder="Tell me about your project..."
                      value={form.message}
                      onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                      required
                      style={{ resize: 'none' }}
                    />
                  </div>
                  <button type="submit" className="hologram-btn" style={{ marginTop: 8 }}>
                    TRANSMIT MESSAGE ⚡
                  </button>
                </>
              )}
            </form>
          </div>
        </div>,
        document.body
      )}
    </section>
  );
};

export default PhoneBoothSection;
