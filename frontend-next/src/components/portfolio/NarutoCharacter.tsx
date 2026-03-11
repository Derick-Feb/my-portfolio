import { useRef } from 'react';

type CharState = 'idle' | 'running' | 'jumping';

interface Props {
  state?: CharState;
  flipped?: boolean;
  style?: React.CSSProperties;
}

const NarutoCharacter = ({ state = 'idle', flipped = false, style }: Props) => {
  return (
    <div
      className={`naruto-character-container ${state} ${flipped ? 'flipped' : ''}`}
      style={{
        width: 80,
        height: 120,
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        filter: 'drop-shadow(0 0 15px rgba(232,125,43,0.4))',
        ...style,
      }}
    >
      <svg
        width="100"
        height="120"
        viewBox="0 0 100 120"
        className="naruto-svg"
      >
        {/* Shadow */}
        <ellipse cx="50" cy="115" rx="20" ry="4" fill="rgba(0,0,0,0.6)" />

        {/* --- LEGS --- */}
        <g className="leg-right">
          <path d="M52,75 L55,100 L62,112" stroke="#1c1a25" strokeWidth="8" strokeLinecap="round" fill="none" />
          <path d="M52,75 L55,100 L62,112" stroke="#e87d2b" strokeWidth="6" strokeLinecap="round" fill="none" />
          <path d="M60,112 L68,115" stroke="#252b42" strokeWidth="6" strokeLinecap="round" />
        </g>
        <g className="leg-left">
          <path d="M48,75 L45,100 L38,112" stroke="#1c1a25" strokeWidth="8" strokeLinecap="round" fill="none" />
          <path d="M48,75 L45,100 L38,112" stroke="#e87d2b" strokeWidth="6" strokeLinecap="round" fill="none" />
          <path d="M40,112 L32,115" stroke="#252b42" strokeWidth="6" strokeLinecap="round" />
        </g>

        {/* --- ARMS --- */}
        <g className="arm-right">
          <path d="M58,45 L70,65" stroke="#1c1a25" strokeWidth="8" strokeLinecap="round" fill="none" />
          <path d="M58,45 L70,65" stroke="#e87d2b" strokeWidth="6" strokeLinecap="round" fill="none" />
          <circle cx="70" cy="65" r="3.5" fill="#f5c298" />
        </g>

        {/* --- BODY --- */}
        <g className="torso">
          <rect x="35" y="42" width="30" height="38" rx="5" fill="#e87d2b" />
          <path d="M35,72 L65,72 L65,80 L35,80 Z" fill="#1c1a25" /> 
          <path d="M35,42 Q50,38 65,42 L65,50 Q50,46 35,50 Z" fill="#f5f5f5" /> 
          <line x1="50" y1="50" x2="50" y2="72" stroke="#1c1a25" strokeWidth="2" />
        </g>

        {/* --- ARMS --- */}
        <g className="arm-left">
          <path d="M42,45 L30,65" stroke="#1c1a25" strokeWidth="8" strokeLinecap="round" fill="none" />
          <path d="M42,45 L30,65" stroke="#e87d2b" strokeWidth="6" strokeLinecap="round" fill="none" />
          <circle cx="30" cy="65" r="3.5" fill="#f5c298" />
        </g>

        {/* --- HEAD --- */}
        <g className="head-group">
          <rect x="46" y="38" width="8" height="6" fill="#f5c298" />
          <path d="M38,20 Q38,40 50,40 Q62,40 62,20 Q62,10 50,10 Q38,10 38,20 Z" fill="#f5c298" />
          <g className="eyes">
            <ellipse cx="44" cy="24" rx="2" ry="2.5" fill="#1c1a25" />
            <ellipse cx="56" cy="24" rx="2" ry="2.5" fill="#1c1a25" />
          </g>
          <g fill="#f7d348">
            <path d="M38,15 L30,10 L40,8 L35,1 L46,8 L54,1 L51,9 L64,10 L55,15 Z" />
          </g>
          <path d="M38,16 L62,16 L62,22 L38,22 Z" fill="#1a4a8a" />
          <rect x="45" y="17" width="10" height="4" rx="1" fill="#ced4da" />
        </g>
      </svg>

      <style>{`
        .naruto-character-container.flipped { transform: scaleX(-1); }
        @keyframes bounce { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-5px); } }
        .idle .naruto-svg { animation: bounce 2s ease-in-out infinite; }
        .running .torso, .running .head-group { animation: bounce 0.35s ease-in-out infinite; }
        
        @keyframes runLF { 0%, 100% { d: path("M48,75 L45,100 L38,112"); } 50% { d: path("M48,75 L60,90 L50,112"); } }
        @keyframes runRF { 0%, 100% { d: path("M52,75 L55,100 L62,112"); } 50% { d: path("M52,75 L40,90 L45,112"); } }
        .running .leg-left path:first-child { animation: runLF 0.35s ease-in-out infinite; }
        .running .leg-right path:first-child { animation: runRF 0.35s ease-in-out infinite; }
        .running .leg-left path:last-child { animation: runLF 0.35s ease-in-out infinite; }
        .running .leg-right path:last-child { animation: runRF 0.35s ease-in-out infinite; }
      `}</style>
    </div>
  );
};

export default NarutoCharacter;
