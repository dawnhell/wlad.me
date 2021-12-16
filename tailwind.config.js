module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],

  theme: {
    extend: {
      keyframes: {
        gradientKeyframes: {
          '0%': {
            backgroundPosition: '0% 0%',
          },
          '25%': {
            backgroundPosition: '50% 50%',
          },
          '75%': {
            backgroundPosition: '50% 50%',
          },
          '100%': {
            backgroundPosition: '100% 100%',
          },
        },
        wiggle: {
          '0%, 100%': { transform: 'rotate(0)' },
          '25%': { transform: 'rotate(3deg)' },
          '75%': { transform: 'rotate(-3deg)' },
        }
      },

      animation: {
        gradient: 'gradientKeyframes 5s ease infinite',
        wiggle: 'wiggle 1s ease-in-out infinite',
      }
    },
  },

  plugins: [],
}
