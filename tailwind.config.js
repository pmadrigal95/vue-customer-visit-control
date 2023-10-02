/** @type {import('tailwindcss').Config} */


import theme from './config/theme.js';

module.exports = {
  purge: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}',
    'node_modules/flowbite-vue/**/*.{js,jsx,ts,tsx}',
    'node_modules/flowbite/**/*.{js,jsx,ts,tsx}'
  ],
  darkMode: false, // or 'media' or 'class'
  content: [],
  theme: {
    extend: {
      colors: {
        ...theme.light,
        ...theme.brand,
        ...theme.neutrals,
        ...theme.status,
      },
      fontFamily: {
        'montserrat': ['Montserrat', 'sans-serif'],
      },
    },
  },
  plugins: [
    require('flowbite/plugin')
  ],
}

