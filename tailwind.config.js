/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Sky Blue Spectrum
        brandSky: {
          50: '#F0F9FF',   // Very light tint for card backgrounds
          100: '#E0F2FE',  // Light hover states
          200: '#BAE6FD',  // Light borders
          300: '#7DD3FC',  // Soft sky blue
          DEFAULT: '#38BDF8', // Primary Sky Blue
          500: '#0EA5E9',  // Medium sky blue
          600: '#0284C7',  // Vibrant deep sky blue (Buttons/Headers)
          700: '#0369A1',  // Dark blue
          800: '#075985',  // Deep navy sky
          900: '#0C4A6E',  // Darkest tone
        },
        // Deep Cream Spectrum
        brandCream: {
          50: '#FFFDF5',   // Off-white cream tint
          100: '#FEFCE8',  // Light cream background
          200: '#FEF08A',  // Soft warm cream
          300: '#FDE047',  // Accent gold-cream
          DEFAULT: '#F59E0B', // Rich Deep Cream / Warm Amber
          dark: '#D97706',    // Deep roasted cream
          900: '#78350F',    // Dark cream brown
        },
        // Pure White Accent Alias
        brandWhite: '#FFFFFF',
      }
    },
  },
  plugins: [],
}