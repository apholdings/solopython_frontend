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
      fontFamily: {
        'circular-book': ['CircularStd-Book', 'sans-serif'],
        'circular-book-italic': ['CircularStd-BookItalic', 'sans-serif'],
        'circular-medium': ['CircularStd-Medium', 'sans-serif'],
        'circular-medium-italic': ['CircularStd-MediumItalic', 'sans-serif'],
        'circular-bold': ['CircularStd-Bold', 'sans-serif'],
        'circular-bold-italic': ['CircularStd-BoldItalic', 'sans-serif'],
        'circular-light': ['CircularStd-Light', 'sans-serif'],
        'circular-light-italic': ['CircularStd-LightItalic', 'sans-serif'],
        'circular-black': ['CircularStd-Black', 'sans-serif'],
        'circular-black-italic': ['CircularStd-BlackItalic', 'sans-serif'],
      },
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
        'light-black': '#181a1e',
        transparent: 'rgba(0, 0, 0, 0)',
        'dark-gray': '#242526',
        // 'light-gray': '#f9f9f9',
        'light-blue': '#2181e2',
        'navbar-gray': '#6a728d',
        'light-gray': '#f8fafe',
        blue: {
          50: '#E5F2FF',
          100: '#C7E2FF',
          200: '#94C8FF',
          300: '#5CABFF',
          400: '#2990FF',
          500: '#0072EF',
          600: '#005EC2',
          700: '#00458F',
          800: '#002F61',
          900: '#00162E',
          950: '#000C19',
        },
      },
      borderRadius: {
        none: '0',
        sm: '0.225rem',
        DEFAULT: '0.25rem',
        md: '0.375rem',
        lg: '0.5rem',
        xl: '0.75rem',
        '2xl': '1rem',
        '3xl': '1.5rem',
        full: '9999px',
        // Add your custom rounded values here
        neubrutalism: '0.25rem', // Custom rounded value for neubrutalism
      },
      // fontSize: {
      //   xs: '0.75rem', // 12px
      //   sm: '0.875rem', // 14px
      //   base: '1rem', // 16px
      //   lg: '1.125rem', // 18px
      //   xl: '1.25rem', // 20px
      //   '2xl': '1.5rem', // 24px
      //   '3xl': '1.875rem', // 30px
      //   '4xl': '2.25rem', // 36px
      //   '5xl': '3rem', // 48px
      //   '6xl': '3.75rem', // 60px
      //   '7xl': '4.5rem', // 72px
      //   '8xl': '6rem', // 96px
      //   '9xl': '8rem', // 128px
      // },
    },
    boxShadow: {
      DEFAULT: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
      '2sm': '0 25px 50px 3px rgba(0, 0, 0, 0.05), 0 1px 2px 0 rgba(0, 0, 0, 0.04)',
      sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
      md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
      xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
      '2xl': '0 0px 40px 0px rgba(0, 0, 0, 0.1)',
      '3xl': '0 35px 60px -15px rgba(0, 0, 0, 0.3)',
      button: '0 0px 10px 1px rgba(0, 0, 0, 0.2), 0 0px 2px 0px rgba(0, 0, 0, 0.05)',
      fb: '0 2px 2px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      ethmenu: '0 0px 5px 1px rgba(0, 0, 0, 0.1), 0 0px 2px 0px rgba(0, 0, 0, 0.05)',
      search: '0 0px 1px 1px rgba(0, 0, 0, 0.2), 0 0px 1px 0px rgba(0, 0, 0, 0.05)',
      card: '0 0px 10px 1px rgba(0, 0, 0, 0.06), 0 0px 2px 0px rgba(0, 0, 0, 0.05)',
      'box-shadow': 'rgba(0, 0, 0, 0.1) 0px 20px 25px -5px, rgba(0, 0, 0, 0.04) 0px 10px 10px -5px',
      featured: '0 0px 50px 1px rgba(0, 0, 0, 0.1), 0 0px 2px 0px rgba(0, 0, 0, 0.05)',
      navbar: '0px 5px 8.5px -4px rgba(120, 120, 120, 0.3)',
      inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
      none: 'none',
      'neubrutalism-xs': '1px 1px 0px 0 rgba(0, 0, 0, 0.03)',
      'neubrutalism-sm': '2px 2px 0px 0 rgba(0, 0, 0, 0.03)',
      'neubrutalism-md': '4px 4px 0px 0 rgba(0, 0, 0, 0.03)',
      'neubrutalism-lg': '5px 5px 0px 0 rgba(0, 0, 0, 0.03)',
      'neubrutalism-xl': '6px 6px 0px 0 rgba(0, 0, 0, 0.03)',
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/aspect-ratio'),
  ],
};
