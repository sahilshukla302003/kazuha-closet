/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './**/templates/**/*.html',
    './kazuhacloset/home/static/**/*.js',
    './kazuhacloset/static/**/*.js',
    './theme/templates/**/*.html',
    './theme/static_src/js/**/*.js', // More specific path for theme JS
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};