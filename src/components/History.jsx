import { CLASS_INFO } from '@/lib/constants';

export default function History({ items }) {
  if (items.length <= 1) return null;

  return (
    <div className="mt-5 p-5 rounded-2xl bg-white/[0.02] border border-white/[0.06]">
      <div className="text-[11px] font-semibold text-white/25 tracking-[0.15em] font-mono mb-4">
        RECENT PREDICTIONS
      </div>
      <div className="flex gap-2.5 overflow-x-auto pb-1 scrollbar-thin">
        {items.slice(1).map((h, i) => (
          <div key={i} className="flex-shrink-0 w-16 text-center group">
            <div className="relative">
              <img
                src={h.preview}
                alt=""
                className="w-14 h-14 rounded-xl object-cover border border-white/[0.06] group-hover:border-white/[0.15] transition-all"
              />
              <div
                className="absolute -bottom-1 -right-1 w-5 h-5 rounded-md flex items-center justify-center text-[10px] border border-dark-900"
                style={{ background: CLASS_INFO[h.prediction]?.color || '#555' }}
              >
                {CLASS_INFO[h.prediction]?.icon}
              </div>
            </div>
            <div className="text-[9px] text-white/20 mt-2 font-mono truncate">
              {(h.confidence * 100).toFixed(0)}%
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
