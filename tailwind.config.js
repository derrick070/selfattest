/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class', // Enable class-based dark mode
  theme: {
    fontFamily: {
      sans: ['Poppins', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
    },
    extend: {
      animation: {
        'fadeIn': 'fadeIn 0.5s ease-in-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
      fontFamily: {
        'cursive': ['Brush Script MT', 'cursive'],
      },
    },
  },
  plugins: [],
}
