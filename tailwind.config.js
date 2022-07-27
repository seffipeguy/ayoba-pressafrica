/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        'blue': {
          50: '#e2f7fe',
          100: '#b5e9fd',
          200: '#85dafc',
          300: '#55cbfa',
          400: '#32c0fa',
          500: '#13b4f9',
          600: '#0ea6ea',
          700: '#0692d7',
          800: '#0681c3',
          900: '#0061A1',
        },
        'orange': {
          50: '#fdf8e3',
          100: '#fbebb8',
          200: '#f9df8b',
          300: '#f8d45f',
          400: '#f6c943',
          500: '#f5c036',
          600: '#f4b331',
          700: '#f3a12d',
          800: '#f1922a',
          900: '#ee7625',
        },
      },
    },
  },
  plugins: [],
}
