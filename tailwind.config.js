/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        // Modern, tech-inspired fonts
        'heading': ['"Orbitron"', 'sans-serif'],
        'body': ['"Exo 2"', 'sans-serif'],
        'mono': ['"JetBrains Mono"', 'monospace'],
      },
      colors: {
        // Cyberpunk/Developer color palette
        'cyber-black': '#0A0A0F',
        'cyber-dark': '#12121B',
        'cyber-gray': '#1A1A27',
        'cyber-light': '#242438',
        
        // Primary colors - Electric blue with purple accents
        'neon-blue': {
          100: '#E6F0FF',
          200: '#B3D7FF',
          300: '#80BDFF',
          400: '#4DA4FF',
          500: '#1A8BFF', // Base
          600: '#0070E6',
          700: '#0056B3',
          800: '#003B80',
          900: '#00214D',
        },
        
        'cyber-purple': {
          100: '#F2E6FF',
          200: '#D9B8FF',
          300: '#C08AFF',
          400: '#A75CFF',
          500: '#8E2EFF', // Base
          600: '#7511EB',
          700: '#5C0DB8',
          800: '#430985',
          900: '#2A0552',
        },
        
        // Accent colors
        'matrix-green': '#00FF8C',
        'cyber-yellow': '#FFE838',
        'neon-pink': '#FF2A78',
        'error-red': '#FF3E3E',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        glow: {
          'from': { boxShadow: '0 0 5px -5px rgba(26, 139, 255, 0.5)' },
          'to': { boxShadow: '0 0 20px 0px rgba(26, 139, 255, 0.8)' }
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' }
        }
      },
      backgroundImage: {
        'cyber-gradient': 'linear-gradient(135deg, #1A8BFF 0%, #8E2EFF 100%)',
        'dark-gradient': 'linear-gradient(135deg, #12121B 0%, #1A1A27 100%)',
        'card-gradient': 'linear-gradient(145deg, #1A1A27 0%, #242438 100%)',
      }
    },
  },
  plugins: [],
}