/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  safelist: [
    'h-[280px]',
    'sm:h-[320px]',
    'w-8/12',
    'w-10/12',
    'w-7/12',
    'sm:max-w-[80%]',
    'max-w-[85%]',
    'text-shadow:0_0_2px_#0ff,0_0_2px_#0ff',
    'text-shadow:0_0_3px_#0ff,0_0_3px_#0ff',
    'text-shadow:0_0_5px_#0ff,0_0_5px_#0ff',
  ],
  theme: {
    extend: {
      fontFamily: {
        orbitron: ['Orbitron', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
