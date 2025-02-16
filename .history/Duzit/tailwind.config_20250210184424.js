/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/*.{html,js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        balsamiq: ["Balsamiq Sans", "cursive"],
        gochiHand: ["Gochi Hand", "cursive"],
      },
    },
  },
  plugins: [],
};
