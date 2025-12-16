import type { Config } from 'tailwindcss'

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'brand-purple': {
          400: '#9333EA',
          500: '#7C3AED',
          600: '#6D28D9',
        },
        'winter-blue': {
          50: '#E3F2FD',
          100: '#BBDEFB',
          200: '#90CAF9',
          300: '#64B5F6',
          400: '#42A5F5',
          500: '#2196F3',
          600: '#1E88E5',
          700: '#1976D2',
          800: '#1565C0',
          900: '#0D47A1',
        },
        'snow': {
          50: '#FFFFFF',
          100: '#FAFAFA',
          200: '#F5F5F5',
          300: '#ECEFF1',
        },
        'ice': {
          200: '#CFD8DC',
          300: '#B0BEC5',
          400: '#90A4AE',
          500: '#78909C',
          600: '#607D8B',
        },
        'festive-gold': {
          100: '#FFF9C4',
          200: '#FFF176',
          300: '#FFD54F',
          400: '#FFC107',
          500: '#FF8F00',
        },
        'festive-red': {
          100: '#FFCDD2',
          200: '#EF5350',
          300: '#E53935',
          400: '#C62828',
        },
        'festive-green': {
          100: '#C8E6C9',
          200: '#66BB6A',
          300: '#43A047',
          400: '#2E7D32',
        },
      },
    },
  },
} satisfies Config

