export const CLASS_INFO = {
  front:      { label: 'Front View',       icon: '⬆️',  angle: '0°',   color: '#3b82f6', desc: 'Direct front of the vehicle' },
  frontleft:  { label: 'Front Left',       icon: '↖️',  angle: '315°', color: '#6366f1', desc: 'Front-left quarter view' },
  frontright: { label: 'Front Right',      icon: '↗️',  angle: '45°',  color: '#8b5cf6', desc: 'Front-right quarter view' },
  rear:       { label: 'Rear View',        icon: '⬇️',  angle: '180°', color: '#06b6d4', desc: 'Direct rear of the vehicle' },
  rearleft:   { label: 'Rear Left',        icon: '↙️',  angle: '225°', color: '#14b8a6', desc: 'Rear-left quarter view' },
  rearright:  { label: 'Rear Right',       icon: '↘️',  angle: '135°', color: '#a855f7', desc: 'Rear-right quarter view' },
  random:     { label: 'Close-up / Other', icon: '🔍',  angle: '—',    color: '#f59e0b', desc: 'Detail shot or unclassifiable' },
};

export const CAR_DIAGRAM_POSITIONS = {
  front:      { cx: 50, cy: 12 },
  frontleft:  { cx: 18, cy: 28 },
  frontright: { cx: 82, cy: 28 },
  rear:       { cx: 50, cy: 88 },
  rearleft:   { cx: 18, cy: 72 },
  rearright:  { cx: 82, cy: 72 },
};
