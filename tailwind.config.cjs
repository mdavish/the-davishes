/** @type {import('tailwindcss').Config} */

const { ComponentsContentPath } = require("@yext/search-ui-react");

module.exports = {
  content: [
    "./src/**/*.{ts,tsx}",
    "./lib/**/*.{js,jsx}",
    ComponentsContentPath,
  ],
  theme: {
    extend: {
      // Add the lobster fonts from Google Fonts
      fontFamily: {
        lobster: ["Lobster", "cursive"],
        lobsterTwo: ["Lobster Two", "cursive"],
      },
      // Extend the theme with rich, dark, luscious jungle green
      // Darker than the default green, but not quite black
      colors: {
        primary: "var(--primary-color, #2563eb)",
        "primary-light": "var(--primary-color-light, #dbeafe)",
        "primary-dark": "var(--primary-color-dark, #1e40af)",
        neutral: "var(--neutral-color, #4b5563)",
        "neutral-light": "var(--neutral-color-light, #9ca3af)",
        "neutral-dark": "var(--neutral-color-dark, #1f2937)",
        green: {
          100: "#f0fff4",
          200: "#c6f6d5",
          300: "#9ae6b4",
          400: "#68d391",
          500: "#48bb78",
          600: "#38a169",
          700: "#2f855a",
          800: "#276749",
          900: "#22543d",
          1000: "#1c4530",
          1100: "#1a3e2b",
        },
        // An elegant off-white, taupe color, with a touch of yellow. Not too grey
        // Warm and inviting, but not too bright
        // #e7ded0 is the main color, but I've added a few more shades
        beige: {
          100: "#f7f4f0",
          200: "#f0e9e0",
          300: "#e7ded0",
          400: "#d9cbb9",
          500: "#cbb8a2",
          600: "#bca58b",
          700: "#a99274",
          800: "#8f7d5d",
          900: "#7a6a4c",
        },
      },
      borderRadius: {
        cta: "var(--cta-border-radius, 1rem)",
      },
      keyframes: {
        rotate: {
          "100%": { transform: "rotate(360deg)" },
        },
        dash: {
          "0%": { transform: "rotate(0deg)", "stroke-dashoffset": 204 },
          "50%": { transform: "rotate(45deg)", "stroke-dashoffset": 52 },
          "100%": { transform: "rotate(360deg)", "stroke-dashoffset": 204 },
        },
      },
    },
  },
  plugins: [require("@tailwindcss/typography"), require("@tailwindcss/forms")],
};
