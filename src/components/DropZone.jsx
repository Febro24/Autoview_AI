import { useState, useRef, useCallback } from 'react';

export default function DropZone({ onFileSelect }) {
  const [dragActive, setDragActive] = useState(false);
  const fileRef = useRef(null);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    setDragActive(false);
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      onFileSelect(file);
    }
  }, [onFileSelect]);

  const handleChange = (e) => {
    const file = e.target.files[0];
    if (file) onFileSelect(file);
  };

  return (
    <>
      <div
        onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
        onDragLeave={() => setDragActive(false)}
        onDrop={handleDrop}
        onClick={() => fileRef.current?.click()}
        className={`relative rounded-3xl border-2 border-dashed cursor-pointer transition-all duration-500 overflow-hidden group
          ${dragActive
            ? 'border-accent-blue/50 bg-accent-blue/[0.03]'
            : 'border-white/[0.06] bg-gradient-to-b from-white/[0.015] to-white/[0.005] hover:border-white/[0.12] hover:bg-white/[0.02]'
          }`}
        style={{ padding: '80px 40px' }}
      >
        {/* Glow effect on hover */}
        <div className={`absolute inset-0 bg-gradient-to-br from-accent-blue/10 to-accent-purple/10 transition-opacity duration-500 ${
          dragActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-50'
        }`} />

        <div className="relative z-10 text-center">
          {/* Car icon */}
          <div className="text-6xl mb-6 transition-transform duration-300 group-hover:scale-110" style={{ filter: 'grayscale(0.2)' }}>
            🏎️
          </div>

          <h3 className="text-xl font-semibold text-white/80 mb-2 group-hover:text-white/95 transition-colors">
            Drop your car image here
          </h3>
          <p className="text-sm text-white/30 mb-7">
            or click to browse • JPG, PNG, WebP supported
          </p>

          <div className="inline-flex items-center gap-2 px-7 py-3 rounded-xl bg-gradient-to-r from-accent-blue to-indigo-500 text-white text-sm font-semibold shadow-lg shadow-blue-500/25 group-hover:shadow-blue-500/40 transition-shadow">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M17 8l-5-5-5 5M12 3v12"/>
            </svg>
            Select Image
          </div>
        </div>
      </div>

      <input
        ref={fileRef}
        type="file"
        accept="image/*"
        onChange={handleChange}
        className="hidden"
      />
    </>
  );
}
