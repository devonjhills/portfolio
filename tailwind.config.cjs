/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Minty green accent with monochrome design
        primary: {
          25: '#fafffe',
          50: '#f0fdf8',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#22c55e',
          600: '#16a34a',
          700: '#15803d',
          800: '#166534',
          900: '#14532d',
          950: '#0f2a1a',
        },
        neutral: {
          25: '#fdfdfd',
          50: '#fdfdfd',
          75: '#fafafa',
          100: '#f8f8f8',
          150: '#f4f4f4',
          200: '#f0f0f0',
          300: '#e6e6e6',
          400: '#cccccc',
          500: '#999999',
          600: '#666666',
          700: '#333333',
          800: '#1a1a1a',
          850: '#111111',
          900: '#0a0a0a',
          925: '#050505',
          950: '#000000',
        },
        // Modern alternating section colors with matrix-inspired dark mode
        section: {
          'light-1': '#ffffff',
          'light-2': '#fdfdfe',
          'light-3': '#fafbfa', 
          'light-4': '#f5f7f5',
          'light-5': '#f0f3f0',
          'dark-1': '#000000',
          'dark-2': '#050505',
          'dark-3': '#0a0a0a',
          'dark-4': '#0f0f0f',
          'dark-5': '#111111',
        },
      },
      boxShadow: {
        subtle: '0 2px 4px 0 rgba(0, 0, 0, 0.05)',
        soft: '0 4px 12px 0 rgba(0, 0, 0, 0.08)',
        medium: '0 8px 25px -5px rgba(0, 0, 0, 0.1), 0 4px 10px -4px rgba(0, 0, 0, 0.1)',
        elevated: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        deep: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
      },
      fontFamily: {
        serif: ['Lora', 'Georgia', 'Times New Roman', 'serif'],
        sans: [
          'Inter',
          'system-ui',
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'Roboto',
          'sans-serif',
        ],
        heading: ['Lora', 'Georgia', 'Times New Roman', 'serif'],
        mono: [
          'Fira Code',
          'SF Mono',
          'Monaco',
          'Inconsolata',
          'Roboto Mono',
          'Source Code Pro',
          'Menlo',
          'Consolas',
          'monospace',
        ],
        terminal: [
          'Fira Code',
          'SF Mono',
          'Monaco',
          'Consolas',
          'Liberation Mono',
          'Courier New',
          'monospace',
        ],
      },
      animation: {
        'fade-in-up': 'fadeInUp 0.6s ease-out',
        'fade-in': 'fadeIn 0.6s ease-out',
        'slide-in': 'slideIn 0.6s ease-out',
        'slide-up': 'slideUp 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        float: 'float 3s ease-in-out infinite',
        'pulse-soft': 'pulse-soft 2s ease-in-out infinite',
        'diagonal-flow': 'diagonalFlow 1.2s cubic-bezier(0.16, 1, 0.3, 1)',
        'section-enter': 'sectionEnter 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        'terminal-cursor': 'terminalCursor 1s infinite',
        'scan-line': 'scanLine 2s linear infinite',
      },
      keyframes: {
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideIn: {
          '0%': { opacity: '0', transform: 'translateX(-20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(40px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'pulse-soft': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.7' },
        },
        diagonalFlow: {
          '0%': {
            opacity: '0',
            transform: 'translateY(30px) scale(0.95)',
          },
          '60%': {
            opacity: '0.8',
            transform: 'translateY(-5px) scale(1.02)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0) scale(1)',
          },
        },
        sectionEnter: {
          '0%': {
            opacity: '0',
            transform: 'translateY(60px)',
            filter: 'blur(4px)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)',
            filter: 'blur(0px)',
          },
        },
        terminalCursor: {
          '0%, 50%': { opacity: '1' },
          '51%, 100%': { opacity: '0' },
        },
        scanLine: {
          '0%': {
            transform: 'translateY(-100%)',
            opacity: '0',
          },
          '50%': {
            opacity: '0.3',
          },
          '100%': {
            transform: 'translateY(100%)',
            opacity: '0',
          },
        },
      },
    },
  },
  plugins: [],
};
