/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['FT Regola Neue', 'Inter', 'sans-serif'],
        'display': ['FT Regola Neue', 'Inter', 'sans-serif'],
        'adora': ['FT Regola Neue', 'Inter', 'serif'],
      },
      colors: {
        primary: {
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#22c55e',
          600: '#16a34a',
          700: '#15803d',
          800: '#166534',
          900: '#14532d',
        },
        green: {
          light: '#e8f5e9',
          DEFAULT: '#4caf50',
          dark: '#2e7d32',
        },
        beige: {
          light: '#faf8f5',
          DEFAULT: '#f5f3f0',
        },
        'soft-grey': {
          light: '#f8f9fa',
          DEFAULT: '#f5f6f7',
          dark: '#eef0f2',
        },
        'soft-green': {
          light: '#f0f9f4',
          DEFAULT: '#ecfdf5',
          dark: '#d1fae5',
        },
      },
      maxWidth: {
        'container': '1035px',
        'content': '1400px',
      },
      spacing: {
        'section': '6rem',
        'section-lg': '8rem',
      },
    },
    container: {
      center: true,
      padding: {
        DEFAULT: '1.5rem',
        sm: '2rem',
        lg: '3rem',
        xl: '4rem',
        '2xl': '5rem',
      },
    },
  },
  plugins: [],
}

