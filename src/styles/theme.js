// Theme Configuration for Jaro Kilo Foundation
export const themes = {
  light: {
    // Primary Red Colors
    primary: {
      50: '#fef2f2',   // Very light red
      100: '#fee2e2',  // Light red
      200: '#fecaca',  // Lighter red
      300: '#fca5a5',  // Light-medium red
      400: '#f87171',  // Medium red
      500: '#ef4444',  // Base red
      600: '#dc2626',  // Dark red (main brand)
      700: '#b91c1c',  // Darker red
      800: '#991b1b',  // Very dark red
      900: '#7f1d1d',  // Darkest red
    },
    
    // Secondary Orange Colors (complementary)
    secondary: {
      50: '#fff7ed',
      100: '#ffedd5',
      200: '#fed7aa',
      300: '#fdba74',
      400: '#fb923c',
      500: '#f97316',  // Base orange
      600: '#ea580c',
      700: '#c2410c',
      800: '#9a3412',
      900: '#7c2d12',
    },
    
    // Neutral Colors
    neutral: {
      50: '#fafafa',
      100: '#f5f5f5',
      200: '#e5e5e5',
      300: '#d4d4d4',
      400: '#a3a3a3',
      500: '#737373',
      600: '#525252',
      700: '#404040',
      800: '#262626',
      900: '#171717',
    },
    
    // Background Colors
    background: {
      primary: '#ffffff',
      secondary: '#fafafa',
      tertiary: '#f5f5f5',
      accent: '#fef2f2',
    },
    
    // Text Colors
    text: {
      primary: '#171717',
      secondary: '#404040',
      tertiary: '#737373',
      inverse: '#ffffff',
      accent: '#dc2626',
    },
    
    // Status Colors
    status: {
      success: '#16a34a',
      warning: '#f59e0b',
      error: '#dc2626',
      info: '#3b82f6',
    },
    
    // Component Specific
    card: {
      background: '#ffffff',
      border: '#e5e5e5',
      shadow: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
      shadowHover: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
    },
    
    button: {
      primary: {
        bg: '#dc2626',
        bgHover: '#b91c1c',
        text: '#ffffff',
        border: '#dc2626',
      },
      secondary: {
        bg: 'transparent',
        bgHover: '#fef2f2',
        text: '#dc2626',
        border: '#dc2626',
      },
      ghost: {
        bg: 'transparent',
        bgHover: '#fef2f2',
        text: '#dc2626',
        border: 'transparent',
      },
    },
    
    input: {
      bg: '#ffffff',
      border: '#d4d4d4',
      borderFocus: '#dc2626',
      text: '#171717',
      placeholder: '#737373',
    },
  },
  
  dark: {
    // Primary Red Colors (adjusted for dark theme)
    primary: {
      50: '#7f1d1d',   // Darkest red (inverted)
      100: '#991b1b',  // Very dark red
      200: '#b91c1c',  // Darker red
      300: '#dc2626',  // Dark red
      400: '#ef4444',  // Base red
      500: '#f87171',  // Medium red
      600: '#fca5a5',  // Light-medium red (main brand for dark)
      700: '#fecaca',  // Lighter red
      800: '#fee2e2',  // Light red
      900: '#fef2f2',  // Very light red
    },
    
    // Secondary Orange Colors
    secondary: {
      50: '#7c2d12',
      100: '#9a3412',
      200: '#c2410c',
      300: '#ea580c',
      400: '#f97316',
      500: '#fb923c',  // Base orange for dark
      600: '#fdba74',
      700: '#fed7aa',
      800: '#ffedd5',
      900: '#fff7ed',
    },
    
    // Neutral Colors (inverted)
    neutral: {
      50: '#171717',
      100: '#262626',
      200: '#404040',
      300: '#525252',
      400: '#737373',
      500: '#a3a3a3',
      600: '#d4d4d4',
      700: '#e5e5e5',
      800: '#f5f5f5',
      900: '#fafafa',
    },
    
    // Background Colors
    background: {
      primary: '#0f0f0f',
      secondary: '#171717',
      tertiary: '#262626',
      accent: '#7f1d1d',
    },
    
    // Text Colors
    text: {
      primary: '#fafafa',
      secondary: '#e5e5e5',
      tertiary: '#a3a3a3',
      inverse: '#171717',
      accent: '#fca5a5',
    },
    
    // Status Colors (adjusted for dark)
    status: {
      success: '#22c55e',
      warning: '#fbbf24',
      error: '#fca5a5',
      info: '#60a5fa',
    },
    
    // Component Specific
    card: {
      background: '#171717',
      border: '#404040',
      shadow: '0 1px 3px 0 rgb(0 0 0 / 0.3), 0 1px 2px -1px rgb(0 0 0 / 0.3)',
      shadowHover: '0 10px 15px -3px rgb(0 0 0 / 0.3), 0 4px 6px -4px rgb(0 0 0 / 0.3)',
    },
    
    button: {
      primary: {
        bg: '#fca5a5',
        bgHover: '#f87171',
        text: '#171717',
        border: '#fca5a5',
      },
      secondary: {
        bg: 'transparent',
        bgHover: '#7f1d1d',
        text: '#fca5a5',
        border: '#fca5a5',
      },
      ghost: {
        bg: 'transparent',
        bgHover: '#7f1d1d',
        text: '#fca5a5',
        border: 'transparent',
      },
    },
    
    input: {
      bg: '#262626',
      border: '#525252',
      borderFocus: '#fca5a5',
      text: '#fafafa',
      placeholder: '#a3a3a3',
    },
  },
};

// Theme utility functions
export const getTheme = (isDark = false) => {
  return isDark ? themes.dark : themes.light;
};

// CSS custom properties generator
export const generateCSSVariables = (theme) => {
  const cssVars = {};
  
  // Flatten theme object into CSS custom properties
  const flatten = (obj, prefix = '') => {
    Object.keys(obj).forEach(key => {
      const value = obj[key];
      const cssKey = prefix ? `${prefix}-${key}` : key;
      
      if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
        flatten(value, cssKey);
      } else {
        cssVars[`--${cssKey}`] = value;
      }
    });
  };
  
  flatten(theme);
  return cssVars;
};

// Tailwind CSS class generators
export const tw = {
  // Background classes
  bg: {
    primary: 'bg-red-600 dark:bg-red-400',
    primaryHover: 'hover:bg-red-700 dark:hover:bg-red-300',
    secondary: 'bg-orange-500 dark:bg-orange-400',
    secondaryHover: 'hover:bg-orange-600 dark:hover:bg-orange-300',
    card: 'bg-white dark:bg-gray-800',
    page: 'bg-gray-50 dark:bg-gray-900',
    accent: 'bg-red-50 dark:bg-red-900/20',
  },
  
  // Text classes
  text: {
    primary: 'text-gray-900 dark:text-gray-100',
    secondary: 'text-gray-700 dark:text-gray-300',
    tertiary: 'text-gray-500 dark:text-gray-400',
    accent: 'text-red-600 dark:text-red-400',
    inverse: 'text-white dark:text-gray-900',
  },
  
  // Border classes
  border: {
    default: 'border-gray-300 dark:border-gray-600',
    accent: 'border-red-600 dark:border-red-400',
    focus: 'focus:border-red-500 dark:focus:border-red-400',
  },
  
  // Button classes
  button: {
    primary: 'bg-red-600 hover:bg-red-700 dark:bg-red-500 dark:hover:bg-red-400 text-white dark:text-gray-900',
    secondary: 'border border-red-600 dark:border-red-400 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20',
    ghost: 'text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20',
  },
  
  // Gradient classes
  gradient: {
    primary: 'bg-gradient-to-r from-red-600 to-orange-500 dark:from-red-500 dark:to-orange-400',
    secondary: 'bg-gradient-to-r from-red-500 via-red-300 to-orange-100 dark:from-red-800 dark:via-red-600 dark:to-orange-800',
    hero: 'bg-gradient-to-r from-red-700 via-red-500 to-orange-400 dark:from-red-800 dark:via-red-600 dark:to-orange-600',
  },
};

export default themes;