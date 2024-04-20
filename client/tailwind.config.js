/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
      'sm': "440px", //=> media (min-width: 440px)
      'md': "547px", //=> desktop (min-width: 547px)
      'lg': "768px", //=> mobile (min-width: 768px)
      'xl': "1024px", //=> desktop (min-width: 1024px)
      '2xl': "1280px", //=> desktop (min-width: 1280px)
      '3xl': "1440px", //=> desktop (min-width: 1440px)
      '4xl': "1600px", //=> desktop (min-width: 1600px)
    },},
  },
  plugins: [],
}
