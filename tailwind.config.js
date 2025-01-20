/** @type {import('tailwindcss').Config} */
const colors = {
  // Primary Brand Color (Green)
  primary: {
    50: '#f0fdf4',
    100: '#dcfce7',
    200: '#bbf7d0',
    300: '#86efac',
    400: '#4ade80',
    500: '#22c55e',  // Main brand green
    600: '#16a34a',
    700: '#15803d',
    800: '#166534',
    900: '#14532d',
    950: '#052e16',
  },
  // Surface Colors
  surface: {
    dark: {
      primary: '#0a0a0a',    // Very dark black
      secondary: '#121212',   // Slightly lighter black
      tertiary: '#1a1a1a',   // Accent black
    },
    light: {
      primary: '#ffffff',     // Pure white
      secondary: '#f8fafc',   // Off white
      tertiary: '#f1f5f9',    // Light gray
    }
  },
  // Text Colors
  text: {
    dark: {
      primary: '#ffffff',
      secondary: '#94a3b8',
      tertiary: '#64748b',
    },
    light: {
      primary: '#0f172a',
      secondary: '#334155',
      tertiary: '#64748b',
    }
  },
  // Accent Colors
  accent: {
    teal: {
      50: '#f0fdfa',
      100: '#ccfbf1',
      500: '#14b8a6',
      600: '#0d9488',
      700: '#0f766e',
    },
    emerald: {
      50: '#ecfdf5',
      100: '#d1fae5',
      500: '#10b981',
      600: '#059669',
      700: '#047857',
    },
    amber: {
      500: '#f59e0b',
      600: '#d97706',
    },
    rose: {
      500: '#f43f5e',
      600: '#e11d48',
    }
  },
  // Status Colors
  success: {
    light: '#86efac',
    DEFAULT: '#22c55e',
    dark: '#15803d',
  },
  warning: {
    light: '#fde047',
    DEFAULT: '#f59e0b',
    dark: '#b45309',
  },
  error: {
    light: '#fca5a5',
    DEFAULT: '#ef4444',
    dark: '#b91c1c',
  },
  info: {
    light: '#93c5fd',
    DEFAULT: '#3b82f6',
    dark: '#1d4ed8',
  }
};

module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      colors,
      spacing: {
        'xs': '0.25rem',
        'sm': '0.5rem',
        'md': '1rem',
        'lg': '1.5rem',
        'xl': '2rem',
        '2xl': '4rem',
      },
      borderRadius: {
        'xs': '0.125rem',
        'sm': '0.25rem',
        'md': '0.375rem',
        'lg': '0.5rem',
        'xl': '0.75rem',
      },
      boxShadow: {
        'soft': '0 2px 4px rgba(0, 0, 0, 0.05)',
        'normal': '0 4px 6px rgba(0, 0, 0, 0.07)',
        'medium': '0 6px 8px rgba(0, 0, 0, 0.09)',
      }
    }
  },
  darkMode: 'class',
  plugins: [],
};
