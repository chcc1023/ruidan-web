module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        blue: {
          50: '#f0f6ff',
          600: '#1d4ed8',
        }
      },
      animation: {
        'pulse': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'fadeInOut': 'fadeInOut 10s infinite',
        'fadeInOutDelay': 'fadeInOutDelay 10s infinite',
      },
      keyframes: {
        pulse: {
          '0%, 100%': { opacity: '0.2' },
          '50%': { opacity: '0.15' },
        },
        fadeInOut: {
          '0%, 45%, 100%': { opacity: '1' },
          '50%, 95%': { opacity: '0' },
        },
        fadeInOutDelay: {
          '0%, 45%': { opacity: '0' },
          '50%, 95%': { opacity: '1' },
          '100%': { opacity: '0' },
        },
      },
    },
  },
  plugins: [],
} 