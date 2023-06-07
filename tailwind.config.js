/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        'dark-main': '#0D1117', // Dark background color for the main areas
        'dark-bg': '#161B22', // Slightly lighter background color for cards and sections
        'dark-second': '#21262D', // Alternate dark background color for variety
        'dark-third': '#30363D', // Another alternate dark background color
        dark: '#3A4250', // Color for headings and separators
        'dark-border': '#5B6473', // Color for borders and dividers
        'dark-txt': '#C9D1D9', // Text color for regular text
        'dark-txt-secondary': '#AAB2BB', // Text color for secondary text
        'dark-primary': '#1F6FEB', // Primary color for buttons and highlights
        'dark-accent': '#58A6FF', // Accent color for links and other elements
        white: '#FFFFFF',
        black: '#000000',
        transparent: 'rgba(0, 0, 0, 0)',
        'dark-gray': '#242526',
        'light-gray': '#f9f9f9',
        'light-blue': '#2181e2',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/aspect-ratio'),
  ],
};
