const FEATURES = [
  {
    icon: '⚡',
    title: 'Edge-Ready',
    desc: 'TFLite model converted to TF.js — runs entirely in your browser, no server needed',
  },
  {
    icon: '🎯',
    title: '7 View Classes',
    desc: 'Front, rear, 4 quarter angles, plus close-up/damage shot detection',
  },
  {
    icon: '📊',
    title: '0.77 F1 Score',
    desc: 'EfficientNetB2 trained on 3,900+ images with model-assisted label cleaning',
  },
];

export default function FeatureCards() {
  return (
    <div className="max-w-7xl mx-auto px-6 mt-12">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {FEATURES.map((card, i) => (
          <div
            key={i}
            className="p-7 rounded-2xl bg-white/[0.015] border border-white/[0.04] hover:border-white/[0.08] hover:bg-white/[0.025] transition-all duration-300 group animate-fade-up"
            style={{ animationDelay: `${400 + i * 100}ms`, animationFillMode: 'both' }}
          >
            <div className="text-3xl mb-4 group-hover:scale-110 transition-transform origin-left">
              {card.icon}
            </div>
            <div className="text-[15px] font-semibold text-white/75 mb-2 group-hover:text-white/90 transition-colors">
              {card.title}
            </div>
            <div className="text-[13px] text-white/25 leading-relaxed group-hover:text-white/35 transition-colors">
              {card.desc}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
