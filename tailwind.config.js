/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['"DM Sans"', 'sans-serif'],
        mono: ['"Space Mono"', 'monospace'],
      },
      colors: {
        dark: {
          900: '#0a0a0f',
          800: '#111118',
          700: '#18181f',
          600: '#1e1e28',
        },
        accent: {
          blue: '#3b82f6',
          purple: '#8b5cf6',
          green: '#22c55e',
        }
      },
      animation: {
        'glow': 'glow 2s ease-in-out infinite',
        'fade-up': 'fadeUp 0.6s ease-out',
        'fade-up-delay': 'fadeUp 0.6s ease-out 0.1s both',
        'spin-slow': 'spin 0.8s linear infinite',
      },
      keyframes: {
        glow: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(59,130,246,0.2)' },
          '50%': { boxShadow: '0 0 40px rgba(59,130,246,0.4)' },
        },
        fadeUp: {
          from: { opacity: '0', transform: 'translateY(20px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
};
