/** @type {import('tailwindcss').Config} */
export default {
    darkMode: ['class'],
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
  	extend: {
  		colors: {
  			background: 'hsl(var(--background))',
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			tertiary: '#001824',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			}
  		},
  		fontFamily: {
  			mono: [
  				'JetBrains Mono',
  				'monospace'
  			]
  		},
  		boxShadow: {
  			glow: '0 0 20px rgba(0, 230, 230, 0.2)',
  			'glow-lg': '0 0 30px rgba(0, 230, 230, 0.3)',
  			'glow-xl': '0 0 40px rgba(0, 230, 230, 0.4)',
  			'glow-red': '0 0 20px rgba(239, 68, 68, 0.2)',
  			'glow-blue': '0 0 20px rgba(59, 130, 246, 0.2)'
  		},
  		animation: {
  			'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
  			'medical-pulse': 'medical-pulse 1.5s ease-in-out infinite'
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		}
  	}
  },
  plugins: [
    function ({ addUtilities }) {
      const newUtilities = {
        '.scrollbar-hide': {
          '-ms-overflow-style': 'none',
          'scrollbar-width': 'none',
          '&::-webkit-scrollbar': {
            display: 'none',
          },
        },
        '.shadow-glow': {
          'box-shadow': '0 0 15px rgba(0, 230, 230, 0.3)',
        },
      };
      addUtilities(newUtilities);
    },
      require("tailwindcss-animate")
],
};