/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'hu-bg': '#050505',
        'hu-bg-light': '#0a0a0a',
        'hu-red': '#4f46e5',
        'hu-glow': '#818cf8',
        'hu-gold': '#f3f4f6',
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
        fira: ['Fira Code', 'monospace'],
      }
    },
  },
  plugins: [],
}
