import { CLASS_INFO } from '@/lib/constants';

export default function ConfidenceChart({ scores }) {
  if (!scores) return null;

  const sorted = Object.entries(scores).sort((a, b) => b[1] - a[1]);

  return (
    <div className="bg-white/[0.02] rounded-2xl border border-white/[0.06] p-6">
      <div className="text-[11px] font-semibold text-white/25 tracking-[0.15em] font-mono mb-5">
        CONFIDENCE BREAKDOWN
      </div>

      <div className="space-y-3.5">
        {sorted.map(([cls, score], i) => {
          const isTop = i === 0;
          const info = CLASS_INFO[cls];

          return (
            <div
              key={cls}
              className="flex items-center gap-3 animate-fade-up"
              style={{ animationDelay: `${i * 50}ms` }}
            >
              {/* Icon */}
              <div
                className="w-9 h-9 rounded-lg flex items-center justify-center text-sm flex-shrink-0 border transition-all"
                style={{
                  background: isTop
                    ? `linear-gradient(135deg, ${info.color}, ${info.color}88)`
                    : 'rgba(255,255,255,0.03)',
                  borderColor: isTop ? `${info.color}44` : 'rgba(255,255,255,0.06)',
                  boxShadow: isTop ? `0 4px 15px ${info.color}22` : 'none',
                }}
              >
                {info.icon}
              </div>

              {/* Label + bar */}
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-center mb-1.5">
                  <span className={`text-[13px] ${isTop ? 'font-semibold text-white/85' : 'text-white/35'}`}>
                    {info.label}
                  </span>
                  <span className={`text-xs font-mono ${isTop ? 'text-accent-blue' : 'text-white/20'}`}>
                    {(score * 100).toFixed(1)}%
                  </span>
                </div>

                {/* Progress bar */}
                <div className="h-[5px] rounded-full bg-white/[0.04] overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-1000 ease-out"
                    style={{
                      width: `${Math.max(score * 100, 1)}%`,
                      background: isTop
                        ? `linear-gradient(90deg, ${info.color}, ${info.color}88)`
                        : 'rgba(255,255,255,0.08)',
                    }}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
