import React, { useState, useEffect } from "react";
import { ThemeContext } from "./ThemeContext";
import { getTheme, generateCSSVariables } from "../styles/theme.js";

export default function ThemeProvider({ children }) {
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem("theme");
    if (saved) return saved === "dark";
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  const theme = getTheme(isDark);

  useEffect(() => {
    localStorage.setItem("theme", isDark ? "dark" : "light");

    const root = document.documentElement;
    root.classList.remove("light", "dark");
    root.classList.add(isDark ? "dark" : "light");

    const cssVars = generateCSSVariables(theme);
    Object.entries(cssVars).forEach(([property, value]) => {
      root.style.setProperty(property, value);
    });
  }, [isDark, theme]);

  const toggleTheme = () => setIsDark((prev) => !prev);
  const setTheme = (dark) => setIsDark(dark);

  return (
    <ThemeContext.Provider value={{ isDark, theme, toggleTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
