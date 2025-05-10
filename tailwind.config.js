/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    './index.html',
    './src/Components/**/*.{js,jsx}',
  ],
  theme: {
    extend: {
      screens: {
        'xs-max': { 'max': '320px' },
        'sm-max': { 'max': '640px' },
        'md-max': { 'max': '768px' },
        'lg-max': { 'max': '1024px' },
        'xl-max': { 'max': '1280px' },
        '2xl-max': { 'max': '1536px'}
      },
      fontFamily: {
        anton: ['Anton', 'sans-serif'],
        josefinSans: ['Josefin Sans', 'monospace']
      },
      colors: {
        'bg-primary-light': '#fbfbfb',
        'bg-secondary-light': '#e9e9e9',
        'bg-animate-link': '#8a2be2',
        'header-light': '#2f3035',
        'text-primary-light': '#242424',
        'text-secondary-light': '#535353',
        'border-light': '#242424',
        'nav-link-light': '#3457D5',
        'nav-link-hover-light': '#3457D5',
        'bg-primary-dark': '#080d13',
        'bg-secondary-dark': '#101720',
        'header-dark': '#fffafa',
        'text-primary-dark' : '#faf9f6',
        'text-secondary-dark': '#b9b9b9',
        'border-dark': '#faf9f6',
        'nav-link-dark': '#57bfe2',
        'nav-link-hover-dark': '#0188b4',
        'grey': '#242424',
      },
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeInRight: {
          '0%': { transform: 'translateX(100%)', filter: 'blur(10px)' },
          '100%': { transform: 'translateX(0)', filter: 'blur(0)' },
        },
        fadeOutRight: {
          '0%': { transform: 'translateX(0)', filter: 'blur(0)' },
          '100%': { transform: 'translateX(100%)', filter: 'blur(10px)' },
        },
        fadeInReduce: {
          '0%': { opacity: '0'},
          '100%': { opacity: '1' },
        },
        fadeOutReduce: {
          '0%': { opacity: '1' },
          '100%': { opacity: '0' }
        }
      },
      animation: {
        'fade-in': 'fade-in 500ms ease-out forwards',
        'fade-in-right': 'fadeInRight 150ms ease-out forwards',
        'fade-out-right': 'fadeOutRight 150ms ease-out forwards',
        'fade-in-reduce': 'fadeInReduce 150ms ease-out forwards',
        'fade-out-reduce': 'fadeOutReduce 150ms ease-out forwards'
      },
      boxShadow: {
        'nav-shadow-light': '0 2px 7px 0 theme(colors.text-primary-light)',
        'article-shadow-light': '4px 4px 8px theme(colors.text-primary-light)',
        'nav-shadow-dark': '0 2px 7px 0 theme(colors.text-secondary-dark)',
        'article-shadow-dark': '2px 2px 8px theme(colors.text-secondary-dark)'
      },
      gridTemplateAreas: {
        layout: [
          'header header',
          'sidebar content',
          'footer footer'
        ]
      }
    },
  },
  plugins: [],
}
