/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,svelte,ts}"],
  darkMode: "class",
  theme: {
    container: {
      center: true,
      padding: "1rem",
    },
    colors: {
      transparent: "transparent",
      white: "#fff",
      black: {
        DEFAULT: "#000",
        50: "#f7f8f8",
        100: "#f1f2f3",
        200: "#d9dcde",
        300: "#b7bdc2",
        400: "#9099a0",
        500: "#54555F",
        600: "#3E3F4B",
        700: "#343541",
        800: "#20232E",
        900: "#141723",
      },
      purple: "#A15BFC",
      green: "#4ACD9E",
      blue:"#1C71F2",
      red: "#fb5b5b",
    },
    extend: {},
  },
  plugins: [require("@tailwindcss/typography")],
};
