import { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface Project {
  title: string;
  subtitle: string;
  tags: string[];
  desc: string;
  details: string;
  link: string;
  github: string;
  color: string;
}

const PROJECTS: Project[] = [
  {
    title: 'E-Commerce Platform',
    subtitle: 'Full-Stack Web App',
    tags: ['React', 'Node.js', 'PostgreSQL', 'Stripe'],
    desc: 'A modern e-commerce solution with real-time inventory and seamless checkout.',
    details: `Built with a React frontend, Node.js/Express backend, and PostgreSQL database. Features include real-time inventory management, Stripe payment integration, JWT authentication, and an admin dashboard with analytics. Deployed on AWS with a CI/CD pipeline via GitHub Actions.`,
    link: '#',
    github: 'https://github.com/Derick-Feb/',
    color: '#e87d2b',
  },
  {
    title: 'Task Management App',
    subtitle: 'Collaborative Tool',
    tags: ['TypeScript', 'Next.js', 'Prisma', 'WebSocket'],
    desc: 'Collaborative project management with real-time updates and team features.',
    details: `Real-time collaborative task board built with Next.js App Router and Prisma ORM. Features WebSocket-powered live updates, drag-and-drop Kanban boards, team roles & permissions, and email notifications via Resend.`,
    link: '#',
    github: 'https://github.com/Derick-Feb/',
    color: '#4a80e8',
  },
  {
    title: 'Analytics Dashboard',
    subtitle: 'Data Visualization',
    tags: ['React', 'D3.js', 'Python', 'FastAPI'],
    desc: 'Data visualization platform with interactive charts and customizable reporting.',
    details: `Custom analytics dashboard with interactive D3.js charts, configurable date ranges, CSV/PDF exports, and a Python FastAPI backend that processes large datasets. Includes role-based access control and embeddable widgets.`,
    link: '#',
    github: 'https://github.com/Derick-Feb/',
    color: '#2bc5b4',
  },
  {
    title: 'Social Media App',
    subtitle: 'Mobile Application',
    tags: ['React Native', 'Firebase', 'Redux', 'Expo'],
    desc: 'Feature-rich social platform with real-time messaging and content sharing.',
    details: `Cross-platform mobile app built with React Native and Expo. Features real-time chat via Firebase Firestore, image/video uploads, story features, push notifications, and an algorithmic feed. Published on App Store and Play Store.`,
    link: '#',
    github: 'https://github.com/Derick-Feb/',
    color: '#8a4ae8',
  },
];

const BOOK_COLORS = ['#8b4513', '#2c5f8a', '#2a6b3a', '#6b2a6b'];

const ProjectModal = ({ project, onClose }: { project: Project; onClose: () => void }) => {
  const overlayRef = useRef<HTMLDivElement>(null);

  const handleBgClick = (e: React.MouseEvent) => {
    if (e.target === overlayRef.current) onClose();
  };

  return createPortal(
    <div className="modal-overlay" ref={overlayRef} onClick={handleBgClick}>
      <div
        className="modal-content"
        style={{ padding: '0', overflow: 'hidden' }}
      >
        {/* Modal Header */}
        <div style={{ background: project.color, padding: '20px 24px 16px', position: 'relative' }}>
          <button
            onClick={onClose}
            style={{
              position: 'absolute',
              top: 12, right: 12,
              background: 'rgba(0,0,0,0.3)',
              border: 'none',
              color: 'white',
              width: 24, height: 24,
              borderRadius: '50%',
              cursor: 'pointer',
              fontSize: '0.9rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            ×
          </button>
          <span style={{ fontSize: '0.55rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.7)', fontFamily: 'var(--font-body)' }}>
            {project.subtitle}
          </span>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.8rem', color: 'white', marginTop: 2 }}>
            {project.title}
          </h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 8 }}>
            {project.tags.map(t => (
              <span key={t} style={{ padding: '3px 8px', background: 'rgba(0,0,0,0.3)', borderRadius: 2, fontSize: '0.6rem', color: 'rgba(255,255,255,0.85)', letterSpacing: '0.05em', fontFamily: 'var(--font-body)' }}>
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* Modal Body */}
        <div style={{ padding: '20px 24px 24px', background: 'var(--bg-surface)' }}>
          <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: 20, fontSize: '0.8rem' }}>
            {project.details}
          </p>
          <div style={{ display: 'flex', gap: 10 }}>
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="rim-glow-subtle"
              style={{
                padding: '8px 18px',
                background: 'var(--naruto-orange)',
                color: '#08090d',
                textDecoration: 'none',
                fontFamily: 'var(--font-display)',
                fontSize: '0.85rem',
                letterSpacing: '0.08em',
                borderRadius: 2,
                transition: 'transform 0.2s',
              }}
              onMouseOver={e => (e.currentTarget.style.transform = 'translateY(-2px)')}
              onMouseOut={e => (e.currentTarget.style.transform = '')}
            >
              VIEW CODE
            </a>
            <a
              href={project.link}
              style={{
                padding: '8px 18px',
                border: '1px solid rgba(232,125,43,0.3)',
                color: 'var(--text-primary)',
                textDecoration: 'none',
                fontFamily: 'var(--font-display)',
                fontSize: '0.85rem',
                letterSpacing: '0.08em',
                borderRadius: 2,
                transition: 'border-color 0.2s',
              }}
              onMouseOver={e => (e.currentTarget.style.borderColor = 'var(--naruto-orange)')}
              onMouseOut={e => (e.currentTarget.style.borderColor = 'rgba(232,125,43,0.3)')}
            >
              LIVE DEMO
            </a>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
};

const LibrarySection = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  // shelf heights for staggered appearance
  const rows = [0, 1, 2, 3];

  return (
    <section
      id="library"
      className="section-room"
      ref={sectionRef}
      style={{
        background: 'linear-gradient(180deg, #0a0c16 0%, #0d1020 50%, #08090d 100%)',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        overflow: 'hidden',
        padding: '80px 6vw 40px',
      }}
    >
      {/* Sky layer */}
      <div className="parallax-layer layer-sky" data-parallax="0.15"
        style={{ background: 'radial-gradient(ellipse at 70% 30%, #1a1830 0%, #08090d 70%)' }} />

      {/* Tall background bookcase structure */}
      <div className="parallax-layer layer-far" data-parallax="0.2"
        style={{ bottom: 0, top: 0, opacity: 0.4, display: 'flex', alignItems: 'stretch', gap: 4, padding: '0 2vw' }}>
        {Array.from({ length: 20 }, (_, i) => (
          <div key={i} style={{
            flex: 1,
            background: `rgba(${20 + i % 5 * 3}, ${18 + i % 3 * 2}, ${30 + i % 4 * 2}, 0.8)`,
            borderRight: '1px solid rgba(50,45,70,0.3)',
          }} />
        ))}
      </div>

      {/* Mid shelves */}
      <div className="parallax-layer layer-mid" data-parallax="0.4"
        style={{ bottom: 0, top: 0, opacity: 0.6, pointerEvents: 'none' }}>
        {[20, 40, 60, 80].map((pct, i) => (
          <div key={i} style={{
            position: 'absolute',
            top: `${pct}%`,
            left: 0, right: 0,
            height: '2px',
            background: 'linear-gradient(to right, transparent, rgba(60,50,80,0.6) 10%, rgba(60,50,80,0.6) 90%, transparent)',
          }} />
        ))}
      </div>

      {/* Vignette */}
      <div className="fog-vignette" style={{ zIndex: 8 }} />

      {/* Main content */}
      <div style={{ position: 'relative', zIndex: 10, maxWidth: 800, width: '100%', margin: '0 auto' }}>
        <span className="section-eyebrow" style={{ fontSize: '0.55rem', letterSpacing: '0.3em' }}>THE LIBRARY</span>
        <h2 className="section-title" style={{ marginBottom: '1.5rem', fontSize: 'clamp(2rem, 5vw, 4.5rem)' }}>
          ARCHIVED<br />
          <span style={{ color: 'var(--naruto-orange)' }}>PROJECTS</span>
        </h2>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem', fontSize: '0.75rem' }}>
          Each volume holds a case study. Select a book to open it.
        </p>

        {/* Bookshelf grid */}
        <div style={{ display: 'flex', gap: '2vw', flexWrap: 'wrap', alignItems: 'flex-end' }}>
          {PROJECTS.map((project, i) => (
            <div
              key={project.title}
              style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', cursor: 'pointer' }}
              onClick={() => setSelectedProject(project)}
            >
              {/* Book spine */}
              <div
                className="book-spine rim-glow-subtle"
                style={{
                  width: 45 + i * 8,
                  height: 140 + (i % 3) * 30,
                  background: `linear-gradient(to right, ${BOOK_COLORS[i]} 0%, ${BOOK_COLORS[i]}cc 30%, ${BOOK_COLORS[i]}aa 100%)`,
                  borderRadius: '1px 4px 4px 1px',
                  position: 'relative',
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-end',
                  padding: 8,
                  writingMode: 'vertical-rl',
                  textOrientation: 'mixed',
                }}
              >
                {/* Spine pages effect */}
                <div style={{
                  position: 'absolute',
                  left: 0, top: 0, bottom: 0,
                  width: 6,
                  background: 'rgba(255,255,255,0.15)',
                  borderRight: '1px solid rgba(255,255,255,0.1)',
                }} />
                {/* Title text on spine */}
                <span style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '0.7rem',
                  letterSpacing: '0.15em',
                  color: 'rgba(255,255,255,0.9)',
                  transform: 'rotate(180deg)',
                  textTransform: 'uppercase',
                }}>
                  {project.title}
                </span>
                {/* Volume tag */}
                <div style={{
                  position: 'absolute',
                  top: 12, right: 6,
                  background: 'rgba(0,0,0,0.4)',
                  padding: '2px 4px',
                  transform: 'rotate(180deg)',
                  fontSize: '0.55rem',
                  color: 'rgba(255,255,255,0.6)',
                  letterSpacing: '0.1em',
                }}>
                  VOL.{String(i + 1).padStart(2, '0')}
                </div>
              </div>
              {/* Shelf plank below each book */}
              <div style={{
                width: '120%',
                height: 8,
                background: 'linear-gradient(to bottom, #3a2a1a, #2a1a0a)',
                borderRadius: 1,
                boxShadow: '0 4px 12px rgba(0,0,0,0.5)',
              }} />
            </div>
          ))}

          {/* Decorative filler books */}
          {[50, 40, 65, 35, 55].map((h, i) => (
            <div key={`filler-${i}`} style={{
              width: 20 + i * 5,
              height: h + 100,
              background: `rgba(${30 + i * 8}, ${25 + i * 5}, ${45 + i * 6}, 0.8)`,
              borderRadius: '2px 4px 4px 2px',
              alignSelf: 'flex-end',
              opacity: 0.6,
            }} />
          ))}
        </div>

        {/* Floating instruction */}
        <div style={{
          marginTop: '2rem',
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          color: 'var(--text-dim)',
        }}>
          <span style={{ fontSize: '0.7rem', letterSpacing: '0.15em', textTransform: 'uppercase' }}>
            ↑ SELECT A VOLUME TO OPEN
          </span>
        </div>
      </div>

      {/* Floor */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0,
        height: 80,
        background: 'linear-gradient(to top, #08090d 0%, transparent 100%)',
        zIndex: 6,
      }} />

      {selectedProject && (
        <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
      )}
    </section>
  );
};

export default LibrarySection;
