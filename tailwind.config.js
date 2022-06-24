module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        "lobster": ["Lobster", "cursive"],
        "lobster-two": ["Lobster Two", "cursive"],
      },
      transitionProperty: {
        'width': 'width'
      },
    },
  },
  plugins: [],
}
