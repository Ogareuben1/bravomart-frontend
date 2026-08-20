/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brandSky: {
          50: '#F0F9FF',
          100: '#E0F2FE',
          200: '#BAE6FD',
          300: '#7DD3FC',
          DEFAULT: '#38BDF8',
          500: '#0EA5E9',
          600: '#0284C7',
          700: '#0369A1',
          800: '#075985',
          900: '#0C4A6E',
        },
        brandCream: {
          50: '#FFFDF5',
          100: '#FEFCE8',
          200: '#FEF08A',
          300: '#FDE047',
          DEFAULT: '#F59E0B',
          dark: '#D97706',
          900: '#78350F',
        },
      },
    },
  },
  plugins: [],
}