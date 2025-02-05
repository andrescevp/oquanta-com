/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        black: {
          DEFAULT: '#1d1d1b',
          60: '#5b5a57',
          30: '#b8b6b2',
        },
        white: '#fbf8f3',
        "pure-white": '#ffffff',
        'iris-purple': {
          DEFAULT: '#5a33ee',
          60: '#876AEF',
          30: '#CBBDF1',
        },
        'pumpkin-orange': {
          DEFAULT: '#fd5304',
          60: '#fc8146',
          30: '#fbc6ab',
        },
        'lime-green': {
          DEFAULT: '#c0f03e',
          60: '#D0F270',
          30: '#E9F5BD',
        },
      },
    },
  },
  plugins: [],
};