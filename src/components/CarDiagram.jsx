import { CLASS_INFO, CAR_DIAGRAM_POSITIONS } from '@/lib/constants';

export default function CarDiagram({ prediction }) {
  if (!prediction || prediction.class === 'random') return null;

  return (
    <div className="bg-white/[0.02] rounded-2xl border border-white/[0.06] p-6 mb-5 relative overflow-hidden">
      {/* Background grid */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)',
        backgroundSize: '24px 24px',
      }} />

      <div className="text-[11px] font-semibold text-white/25 tracking-[0.15em] font-mono mb-5 relative">
        DETECTED ANGLE
      </div>

      <div className="relative" style={{ paddingBottom: '65%' }}>
        {/* Car body silhouette */}
        <svg
          viewBox="0 0 200 130"
          className="absolute"
          style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '45%', opacity: 0.12 }}
        >
          {/* Car top-down shape */}
          <path
            d="M60,10 Q100,0 140,10 Q155,15 160,35 L165,55 Q165,70 160,90 L155,105 Q100,120 45,105 L40,90 Q35,70 35,55 L40,35 Q45,15 60,10 Z"
            fill="none"
            stroke="white"
            strokeWidth="2"
          />
          {/* Windshield */}
          <path d="M65,28 Q100,20 135,28 L130,45 Q100,40 70,45 Z" fill="none" stroke="white" strokeWidth="1.5" opacity="0.5" />
          {/* Rear window */}
          <path d="M70,85 Q100,80 130,85 L135,100 Q100,108 65,100 Z" fill="none" stroke="white" strokeWidth="1.5" opacity="0.5" />
          {/* Side mirrors */}
          <ellipse cx="30" cy="42" rx="5" ry="3" fill="none" stroke="white" strokeWidth="1" opacity="0.4" />
          <ellipse cx="170" cy="42" rx="5" ry="3" fill="none" stroke="white" strokeWidth="1" opacity="0.4" />
          {/* Headlights */}
          <rect x="55" y="8" width="20" height="6" rx="3" fill="none" stroke="white" strokeWidth="1" opacity="0.3" />
          <rect x="125" y="8" width="20" height="6" rx="3" fill="none" stroke="white" strokeWidth="1" opacity="0.3" />
          {/* Taillights */}
          <rect x="55" y="108" width="15" height="5" rx="2" fill="none" stroke="white" strokeWidth="1" opacity="0.3" />
          <rect x="130" y="108" width="15" height="5" rx="2" fill="none" stroke="white" strokeWidth="1" opacity="0.3" />
        </svg>

        {/* Angle indicators */}
        {Object.entries(CAR_DIAGRAM_POSITIONS).map(([cls, pos]) => {
          const isActive = cls === prediction.class;
          const info = CLASS_INFO[cls];

          return (
            <div
              key={cls}
              className="absolute transition-all duration-700 ease-out flex items-center justify-center"
              style={{
                left: `${pos.cx}%`,
                top: `${pos.cy}%`,
                transform: 'translate(-50%, -50%)',
                width: isActive ? 52 : 30,
                height: isActive ? 52 : 30,
                borderRadius: '50%',
                background: isActive
                  ? `linear-gradient(135deg, ${info.color}, ${info.color}88)`
                  : 'rgba(255,255,255,0.03)',
                border: isActive
                  ? '2px solid rgba(255,255,255,0.25)'
                  : '1px solid rgba(255,255,255,0.06)',
                boxShadow: isActive ? `0 0 30px ${info.color}44` : 'none',
                animation: isActive ? 'glow 2s ease-in-out infinite' : 'none',
                zIndex: isActive ? 10 : 1,
              }}
            >
              {isActive ? (
                <span className="text-lg">{info.icon}</span>
              ) : (
                <span className="text-[8px] text-white/15">●</span>
              )}
            </div>
          );
        })}

        {/* Active label */}
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 text-center">
          <div className="text-xs font-mono text-white/20 tracking-wider">
            {CLASS_INFO[prediction.class]?.angle}
          </div>
        </div>
      </div>
    </div>
  );
}
