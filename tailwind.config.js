/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',

    // Or if using `src` directory:
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  // darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        // primary: '#1E90FF',
        blue: {
          100: '#d9e2f6',
          200: '#b3c6f3',
          300: '#7299f2',
          400: '#3e71e3',
          500: '#1a52c8',
          600: '#033299',
          700: '#022578',
          800: '#0a2c8a',
          900: '#000d2c',
        },
        cyan: {
          100: '#d1e8eb',
          200: '#8fd6e2',
          300: '#5bc9dc',
          400: '#00bed6',
          500: '#00a8c4',
          600: '#0087a1',
          700: '#00677b',
          800: '#003742',
          900: '#001a20',
        },
        purple: {
          100: '#f9d2f4',
          200: '#f597ef',
          300: '#f569ec',
          400: '#eb1ae3',
          500: '#d000c7',
          600: '#b000a7',
          700: '#7c0077',
          800: '#4f004a',
          900: '#2e002c',
        },
        green: {
          100: '#cbf7db',
          200: '#76f3aa',
          300: '#31ec8c',
          400: '#00dc5a',
          500: '#00c542',
          600: '#00a631',
          700: '#007618',
          800: '#003a0d',
          900: '#002407',
        },
        red: {
          100: '#fad6d7',
          200: '#fda4a6',
          300: '#fa7075',
          400: '#fe323f',
          500: '#f90000',
          600: '#cb0000',
          700: '#940000',
          800: '#5d0000',
          900: '#2f0002',
        },
      },
    },
  },
  plugins: [],
}
