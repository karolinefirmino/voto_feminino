/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        playfair: ['var(--font-playfair)'],
        changa: ['var(--font-changa)'],
        arsenal: ['var(--font-arsenal)'],
        karma: ['var(--font-karma)'],
      },
    },
  },
  plugins: [],
}