import React from "react";
import { useTheme } from "../../hooks/useTheme";
import { FiSun, FiMoon } from "react-icons/fi";
import Button from "./Button";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <Button
      onClick={toggleTheme}
      variant="ghost"
      aria-label="Toggle theme"
    >
      {theme === "light" ? (
        <FiMoon className="w-5 h-5" />
      ) : (
        <FiSun className="w-5 h-5" />
      )}
      <span className="hidden sm:inline">
        {theme === "light" ? "Dark" : "Light"}
      </span>
    </Button>
  );
}