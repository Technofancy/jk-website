/* eslint-env node */
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  // Keep darkMode available but do not implement dynamic switching per constraints
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        // Semantic palette for consistent usage across the app
        primary: {
          50: "var(--color-primary-50)",
          100: "var(--color-primary-100)",
          200: "var(--color-primary-200)",
          300: "var(--color-primary-300)",
          400: "var(--color-primary-400)",
          500: "var(--color-primary-500)",
          600: "var(--color-primary-600)", // main brand color
          700: "var(--color-primary-700)",
          800: "var(--color-primary-800)",
          900: "var(--color-primary-900)",
        },
        secondary: {
          50: "var(--color-secondary-50)",
          100: "var(--color-secondary-100)",
          200: "var(--color-secondary-200)",
          300: "var(--color-secondary-300)",
          400: "var(--color-secondary-400)",
          500: "var(--color-secondary-500)",
          600: "var(--color-secondary-600)",
          700: "var(--color-secondary-700)",
          800: "var(--color-secondary-800)",
          900: "var(--color-secondary-900)",
        },
        accent: {
          50: "var(--color-accent-50)",
          100: "var(--color-accent-100)",
          200: "var(--color-accent-200)",
          300: "var(--color-accent-300)",
          400: "var(--color-accent-400)",
          500: "var(--color-accent-500)",
          600: "var(--color-accent-600)",
          700: "var(--color-accent-700)",
          800: "var(--color-accent-800)",
          900: "var(--color-accent-900)",
        },
        surface: {
          DEFAULT: "var(--color-surface-default)",
          50: "var(--color-surface-50)",
          100: "var(--color-surface-100)",
          200: "var(--color-surface-200)",
          800: "var(--color-surface-800)",
          900: "var(--color-surface-900)",
        },
        text: {
          DEFAULT: "var(--color-text-default)", // gray-900
          inverted: "var(--color-text-inverted)",
          muted: "var(--color-text-muted)", // gray-500
        },
        muted: {
          DEFAULT: "var(--color-muted-default)", // gray-500
          100: "var(--color-muted-100)",
          200: "var(--color-muted-200)",
        },
      },
      animation: {
        fadeIn: "fadeIn 0.5s ease-in-out",
        slideIn: "slideIn 0.3s ease-out",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideIn: {
          "0%": { transform: "translateY(-10px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
      },
    },
  },
  plugins: [],
};
