module.exports = {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: '#1f3b4d',
        primaryLight: '#2a4f66',
        accent: '#3498db',
        cardBg: '#f9fafb'
      },
      boxShadow: {
        soft: '0 18px 45px rgba(15, 23, 42, 0.18)'
      },
      borderRadius: {
        xl2: '1.25rem'
      }
    }
  },
  plugins: []
}
