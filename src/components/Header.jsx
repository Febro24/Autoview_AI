import { useState, useEffect } from 'react';

export default function Header({ modelStatus }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <header className="relative z-10 border-b border-white/[0.04] backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-6 py-5 flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-accent-blue to-accent-purple flex items-center justify-center text-white font-bold text-base shadow-lg shadow-blue-500/20">
            AV
          </div>
          <div>
            <div className="text-[17px] font-semibold tracking-tight text-white/90">
              AutoView<span className="text-accent-blue">AI</span>
            </div>
            <div className="text-[10px] text-white/25 font-mono tracking-[0.15em] uppercase">
              Vehicle Angle Detection
            </div>
          </div>
        </div>

        {/* Status */}
        <div className={`flex items-center gap-2.5 px-4 py-2 rounded-full border transition-all duration-700 ${
          mounted ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'
        } ${
          modelStatus === 'ready'
            ? 'bg-green-500/[0.06] border-green-500/20'
            : modelStatus === 'loading'
            ? 'bg-blue-500/[0.06] border-blue-500/20'
            : 'bg-yellow-500/[0.06] border-yellow-500/20'
        }`}>
          <div className={`w-[7px] h-[7px] rounded-full animate-pulse-dot ${
            modelStatus === 'ready' ? 'bg-green-400 shadow-[0_0_8px_rgba(34,197,94,0.6)]'
            : modelStatus === 'loading' ? 'bg-blue-400 shadow-[0_0_8px_rgba(59,130,246,0.6)]'
            : 'bg-yellow-400 shadow-[0_0_8px_rgba(234,179,8,0.6)]'
          }`} />
          <span className={`text-[11px] font-mono tracking-wider ${
            modelStatus === 'ready' ? 'text-green-400'
            : modelStatus === 'loading' ? 'text-blue-400'
            : 'text-yellow-400'
          }`}>
            {modelStatus === 'ready' ? 'MODEL READY' 
             : modelStatus === 'loading' ? 'LOADING MODEL...'
             : 'DEMO MODE'}
          </span>
        </div>
      </div>
    </header>
  );
}
