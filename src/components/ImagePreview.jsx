import { CLASS_INFO } from '@/lib/constants';

export default function ImagePreview({ preview, prediction, loading, onReset, onUploadAnother }) {
  return (
    <div className="animate-fade-up">
      {/* Image container */}
      <div className="rounded-2xl overflow-hidden relative bg-dark-900 border border-white/[0.06] transition-shadow duration-500"
        style={{ boxShadow: prediction ? '0 8px 40px rgba(59,130,246,0.08)' : 'none' }}>
        
        <img
          src={preview}
          alt="Uploaded car"
          className="w-full object-contain block"
          style={{ maxHeight: 440 }}
        />

        {/* Loading overlay */}
        {loading && (
          <div className="absolute inset-0 bg-black/60 backdrop-blur-md flex flex-col items-center justify-center gap-5">
            <div className="relative">
              <div className="w-14 h-14 border-[3px] border-accent-blue/20 border-t-accent-blue rounded-full animate-spin-slow" />
              <div className="absolute inset-0 w-14 h-14 border-[3px] border-transparent border-b-accent-purple/40 rounded-full animate-spin-slow" style={{ animationDirection: 'reverse', animationDuration: '1.2s' }} />
            </div>
            <div className="text-xs text-white/40 font-mono tracking-[0.15em] uppercase">
              Analyzing view angle...
            </div>
          </div>
        )}

        {/* Prediction badge */}
        {prediction && (
          <div className="absolute top-4 left-4 px-4 py-2.5 rounded-xl bg-black/70 backdrop-blur-lg border border-accent-blue/25 animate-fade-up flex items-center gap-2.5">
            <span className="text-xl">{CLASS_INFO[prediction.class]?.icon}</span>
            <div>
              <div className="text-sm font-semibold text-accent-blue">
                {CLASS_INFO[prediction.class]?.label}
              </div>
              <div className="text-[10px] font-mono text-white/40">
                {(prediction.confidence * 100).toFixed(1)}% confidence
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Action buttons */}
      <div className="flex gap-3 mt-4">
        <button
          onClick={onReset}
          className="flex-1 py-3 px-4 rounded-xl bg-white/[0.03] border border-white/[0.08] text-white/40 text-sm font-medium hover:bg-white/[0.06] hover:text-white/70 transition-all"
        >
          ↻ New Image
        </button>
        <button
          onClick={onUploadAnother}
          className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-accent-blue to-indigo-500 text-white text-sm font-semibold shadow-lg shadow-blue-500/20 hover:shadow-blue-500/35 transition-all"
        >
          ⬆ Upload Another
        </button>
      </div>
    </div>
  );
}
