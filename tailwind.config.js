/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        black: {
          DEFAULT: '#1d1d1b',
          60: '#5b5a57',
          30: '#b8b6b2'
        },
        white: '#fbf8f3',
        'pure-white': '#ffffff',
        'iris-purple': {
          DEFAULT: '#5a33ee',
          60: '#876AEF',
          30: '#CBBDF1'
        },
        'pumpkin-orange': {
          DEFAULT: '#fd5304',
          60: '#fc8146',
          30: '#fbc6ab'
        },
        'lime-green': {
          DEFAULT: '#c0f03e',
          60: '#D0F270',
          30: '#E9F5BD'
        }
      },
      animation: {
        wave: 'wave 15s ease-in-out infinite',
        'wave-slow': 'wave 18s ease-in-out infinite',
        'wave-slower': 'wave 21s ease-in-out infinite',
        'wave-float': 'waveFloat 3s ease-in-out infinite',
        'wave-bob': 'waveBob 4s ease-in-out infinite',
        'wave-ripple': 'waveRipple 5s ease-in-out infinite',
        'wave-ripple-1': 'waveRipple 4s linear infinite',
        'wave-ripple-2': 'waveRipple 4s linear infinite 1s',
        'wave-ripple-3': 'waveRipple 4s linear infinite 2s',
        'slide-left': 'slideLeft 500ms ease-in-out',
        'slide-right': 'slideRight 500ms ease-in-out',
        'slide-up': 'slideUp 500ms ease-in-out',
        'slide-down': 'slideDown 500ms ease-in-out'
      },
      keyframes: {
        wave: {
          '0%': { transform: 'translateX(0)' },
          '50%': { transform: 'translateX(-25%)' },
          '100%': { transform: 'translateX(0)' }
        },
        waveFloat: {
          '0%, 100%': {
            transform: 'translateY(0) scaleY(1)',
            'transform-origin': 'bottom'
          },
          '50%': {
            transform: 'translateY(-5px) scaleY(0.95)',
            'transform-origin': 'bottom'
          }
        },
        waveBob: {
          '0%, 100%': {
            transform: 'translateX(0) translateY(0)'
          },
          '50%': {
            transform: 'translateX(-25px) translateY(5px)'
          }
        },
        waveRipple2d: {
          '0%, 100%': {
            transform: 'translateX(0) scaleY(1)'
          },
          '50%': {
            transform: 'translateX(25px) scaleY(1.05)'
          }
        },
        waveRipple: {
          '0%': {
            transform: 'scale(0)',
            opacity: '0'
          },
          '10%': {
            transform: 'scale(0.1)',
            opacity: '1'
          },
          '100%': {
            transform: 'scale(3)',
            opacity: '0'
          }
        },
        slideLeft: {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(0)' }
        },
        slideRight: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(0)' }
        },
        slideUp: {
          '0%': { transform: 'translateY(100%)' },
          '100%': { transform: 'translateY(0)' }
        },
        slideDown: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(0)' }
        }
      }
    }
  },
  plugins: []
}
