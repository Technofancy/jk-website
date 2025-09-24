/* eslint-env node */
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: "#b91c1c", // dark red
          light: "#ef4444",   // lighter red
        },
      },
    },
  },
  plugins: [],
};
