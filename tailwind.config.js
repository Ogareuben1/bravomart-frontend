/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brandSky: {
          light: '#7DD3FC',
          DEFAULT: '#38BDF8',
          dark: '#0284C7',
        },
        brandCream: {
          light: '#FFFBEB',
          DEFAULT: '#FEF3C7',
          dark: '#FDE68A',
        }
      }
    },
  },
  plugins: [],
}