import React, { useState, useEffect } from "react";
import { ThemeContext } from "./ThemeContext";

export default function ThemeProvider({ children }) {
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem("theme");
    if (saved) return saved === "dark";
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  useEffect(() => {
    localStorage.setItem("theme", isDark ? "dark" : "light");

    const root = document.documentElement;
    root.classList.remove("light", "dark");
    root.classList.add(isDark ? "dark" : "light");
  }, [isDark]);

  const toggleTheme = () => setIsDark((prev) => !prev);
  const setTheme = (dark) => setIsDark(dark);

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}