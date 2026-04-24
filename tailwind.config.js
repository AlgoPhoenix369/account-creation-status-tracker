/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  safelist: [
    'bg-red-900', 'bg-orange-600', 'bg-amber-500', 'bg-yellow-400', 
    'bg-lime-400', 'bg-green-600', 'bg-cyan-500', 'bg-blue-600', 
    'bg-purple-600', 'text-white', 'text-black'
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
