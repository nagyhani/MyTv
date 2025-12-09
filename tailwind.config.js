// tailwind.config.js
const { heroui } = require("@heroui/theme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",       // your app directory
    "./components/**/*.{js,ts,jsx,tsx}", // your components
    "./pages/**/*.{js,ts,jsx,tsx}",      // (optional) pages directory
    "node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}", // heroui components
  ],
  theme: {
    extend: {},
  },
  darkMode: "class",
  plugins: [heroui()],
};
