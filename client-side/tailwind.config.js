/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    fontFamily: {
      fontbase: ['Work Sans', 'sans-serif'],
    },

    extend: {
      colors: {
        primarycolor: '#F1F0EE',
        secondarycolor: '#002333',
      },
    },
  },

  plugins: [],
};
