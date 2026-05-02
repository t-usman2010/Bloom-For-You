export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        blush: '#f7cbd1',
        rose: '#e6b9a9',
        plum: '#3a1f2b',
        cream: '#f9f4ef',
        'deep-floral': '#120b13',
        petal: '#f3b9c9',
      },
      fontFamily: {
        display: ['"Playfair Display"', 'serif'],
        body: ['Lato', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        glow: '0 0 40px rgba(230, 185, 169, 0.25)',
        soft: '0 20px 60px rgba(10, 6, 12, 0.5)',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
      },
      animation: {
        float: 'float 8s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
