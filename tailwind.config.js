/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'orders': "url('./assets/orders.webp')",
        'menu': "url('./assets/menu.jpg')",
        'reports': "url('./assets/reports.jpg')",
        'closed': "url('./assets/closed.jpg')"
      }
    },
  },
  plugins: [],
}

