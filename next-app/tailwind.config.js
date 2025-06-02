/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        serif: ['Playfair Display', 'serif'],
      },
      colors: {
        gold: {
          50: '#FBF8EA',
          100: '#F7F1D5',
          200: '#F0E4AC',
          300: '#E8D683',
          400: '#E1C95A',
          500: '#D4AF37',  // Main gold
          600: '#C19B22',
          700: '#9E7D1C',
          800: '#7B6015',
          900: '#58430F',
        },
        navy: {
          50: '#E4E5F1',
          100: '#C9CCE3',
          200: '#9399C8',
          300: '#5E66AC',
          400: '#3A4397',
          500: '#1A237E',  // Main navy
          600: '#151C65',
          700: '#10154C',
          800: '#0C0F33',
          900: '#080A1A',
        },
        burgundy: {
          50: '#F5E1E5',
          100: '#EBC3CB',
          200: '#D78797',
          300: '#C34B63',
          400: '#B02A45',
          500: '#800020',  // Main burgundy
          600: '#68001A',
          700: '#500015',
          800: '#38000F',
          900: '#20000A',
        },
      },
    },
  },
  plugins: [],
};