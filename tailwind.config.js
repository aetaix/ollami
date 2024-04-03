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
      green: {
        50: "#edfcf5",
        100: "#d3f8e5",
        200: "#aceed0",
        300: "#75e0b7",
        DEFAULT: "#4acd9e",
        500: "#1aaf7f",
        600: "#0e8d67",
        700: "#0b7155",
        800: "#0b5a44",
        900: "#0a4a39",
        950: "#042a21",
      },

      blue: "#1C71F2",
      red: "#fb5b5b",
    },
    extend: {},
  },
  plugins: [require("@tailwindcss/typography")],
};
