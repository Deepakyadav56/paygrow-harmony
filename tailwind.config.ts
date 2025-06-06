import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				},
				// TimePay custom colors - Updated with teal theme
				timepay: {
					blue: '#14b8a6', // Updated to teal-500
					teal: '#0d9488', // Updated to teal-600
					green: '#0f766e', // Updated to teal-700
					orange: '#115e59', // Updated to teal-800
					dark: '#134e4a', // Updated to teal-900
					gray: '#f0fdfa', // Updated to teal-50
					'gray-dark': '#ccfbf1', // Updated to teal-100
					purple: '#5eead4', // Updated to teal-300
					indigo: '#2dd4bf', // Updated to teal-400
					pink: '#0d9488', // Updated to teal-600
					yellow: '#99f6e4', // Updated to teal-200
					'light-blue': '#f0fdfa', // Updated to teal-50
					'light-green': '#ccfbf1', // Updated to teal-100
				},
				// Adding full teal color palette
				teal: {
					'50': '#f0fdfa',
					'100': '#ccfbf1',
					'200': '#99f6e4',
					'300': '#5eead4',
					'400': '#2dd4bf',
					'500': '#14b8a6',
					'600': '#0d9488',
					'700': '#0f766e',
					'800': '#115e59',
					'900': '#134e4a',
					'950': '#042f2e',
				},
				// Adding the new fountain-blue color palette
				'fountain-blue': {
					'50': '#f0fbfb',
					'100': '#d8f3f5',
					'200': '#b6e7eb',
					'300': '#84d5dc',
					'400': '#46b7c4',
					'500': '#2f9dab',
					'600': '#2a7f90',
					'700': '#286776',
					'800': '#285662',
					'900': '#254854',
					'950': '#142f38',
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				},
				'fade-in': {
					'0%': { opacity: '0' },
					'100%': { opacity: '1' }
				},
				'bounce-slow': {
					'0%, 100%': { transform: 'translateY(0)' },
					'50%': { transform: 'translateY(-10px)' }
				},
				'pulse-slow': {
					'0%, 100%': { opacity: '1' },
					'50%': { opacity: '0.7' }
				},
				'shimmer': {
					'0%': { backgroundPosition: '-200% 0' },
					'100%': { backgroundPosition: '200% 0' }
				},
				'float': {
					'0%, 100%': { transform: 'translateY(0)' },
					'50%': { transform: 'translateY(-10px)' }
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'fade-in': 'fade-in 1s ease-out',
				'bounce-slow': 'bounce-slow 3s infinite ease-in-out',
				'pulse-slow': 'pulse-slow 3s infinite ease-in-out',
				'shimmer': 'shimmer 2s infinite linear',
				'float': 'float 4s infinite ease-in-out',
			},
			backdropBlur: {
				xs: '2px',
			},
			backgroundImage: {
				'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
				'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
				'gradient-shine': 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent)',
				// Adding teal gradients
				'teal-gradient': 'linear-gradient(to right, #14b8a6, #0d9488)',
				'teal-gradient-dark': 'linear-gradient(to right, #0f766e, #115e59)',
			},
			typography: {
				DEFAULT: {
					css: {
						maxWidth: '65ch',
						color: 'var(--foreground)',
						p: {
							marginTop: '1.25em',
							marginBottom: '1.25em',
						},
						a: {
							color: 'var(--primary)',
							textDecoration: 'underline',
							textUnderlineOffset: '2px',
							'&:hover': {
								color: 'var(--primary)',
								textDecoration: 'none',
							},
						},
					},
				},
			},
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
