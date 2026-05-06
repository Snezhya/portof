/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'hu-bg': '#000000',
        'hu-bg-light': '#120909',
        'hu-red': '#6b0f1a',
        'hu-glow': '#d9383a',
        'hu-gold': '#d4af37',
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
