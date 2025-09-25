import React from 'react';
import { useTheme } from '../hooks/useTheme';

export default function ThemeToggle() {
  const { isDark, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="flex items-center gap-2 px-3 py-1 bg-white bg-opacity-20 hover:bg-opacity-30 dark:bg-gray-800 dark:bg-opacity-50 dark:hover:bg-opacity-70 rounded-md transition-all duration-200 text-sm font-medium"
      title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
    >
      <span className="text-lg">
        {isDark ? '☀️' : '🌙'}
      </span>
      <span className="hidden sm:inline">
        {isDark ? 'Light' : 'Dark'}
      </span>
    </button>
  );
}