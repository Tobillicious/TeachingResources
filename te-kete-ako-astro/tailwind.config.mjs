/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#005B41', // Deep Forest Green
        'primary-dark': '#003D2B', // Darker Green for hover
        secondary: '#FFD700', // Gold/Amber
        accent: '#A020F0', // Purple
        text: '#1A202C', // Dark Gray
        'text-light': '#4A5568', // Medium Gray
        background: '#F8F7F4', // A warmer, papery off-white
        surface: '#FFFFFF',
        border: '#E2E8F0', // Light Gray
      },
      fontFamily: {
        heading: ['Playfair Display', 'serif'],
        body: ['Inter', '-apple-system', 'BlinkMacSystemFont', "Segoe UI", 'Roboto', "Helvetica Neue", 'Arial', "Noto Sans", 'sans-serif', "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"],
      },
      spacing: {
        '1': '0.25rem',
        '2': '0.5rem',
        '3': '0.75rem',
        '4': '1rem',
        '5': '1.25rem',
        '6': '1.5rem',
        '8': '2rem',
        '12': '3rem',
        '16': '4rem',
      },
      borderRadius: {
        'DEFAULT': '0.75rem',
      },
      boxShadow: {
        'sm': '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        'md': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        'lg': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
      },
      backgroundImage: {
        'dot-pattern': 'url("data:image/svg+xml,%3Csvg width=\'6\' height=\'6\' viewBox=\'0 0 6 6\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Ccircle cx=\'3\' cy=\'3\' r=\'0.5\' fill=\'%23e2e8f0\'%3E%3C/circle%3E%3C/svg%3E")',
      },
      fontSize: {
        'base': '1.125rem', // 18px
        'lg': '1.25rem',
        'xl': '1.5rem',
        '2xl': '1.75rem',
        '3xl': '2rem',
        '4xl': '2.5rem',
        '5xl': '3rem',
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
}