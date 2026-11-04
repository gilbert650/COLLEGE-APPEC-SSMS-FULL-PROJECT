/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        appec: {
          navy: '#0F172A',
          gold: '#D97706',
          bg: '#F8FAFC'
        }
      }
    },
  },
  plugins: [],
}