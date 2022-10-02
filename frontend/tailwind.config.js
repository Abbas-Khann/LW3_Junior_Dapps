/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        lato: ["Rajdhani, sans-serif"]
      },'animation': {
        'text':'text 5s ease infinite',
    },
    'keyframes': {
        'text': {
            '0%, 100%': {
               'background-size':'100% 100%',
                'background-position': 'left center'
            },
            '50%': {
               'background-size':'200% 200%',
                'background-position': 'right center'
            },
          },
        }
    },
  },
  plugins: [],
}