
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
				background: 'var(--background)',
				foreground: 'var(--foreground)',
				primary: {
					DEFAULT: 'var(--primary)',
					foreground: 'var(--primary-foreground, #ffffff)',
				},
				secondary: {
					DEFAULT: 'var(--secondary)',
					foreground: 'var(--secondary-foreground, #ffffff)',
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'var(--muted)',
					foreground: 'var(--muted-foreground, #6b7280)'
				},
				accent: {
					DEFAULT: 'var(--accent)',
					foreground: 'var(--accent-foreground, #ffffff)'
				},
				popover: {
					DEFAULT: 'var(--card)',
					foreground: 'var(--foreground)'
				},
				card: {
					DEFAULT: 'var(--card)',
					foreground: 'var(--foreground)'
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
				// TimePay custom colors - theme aware
				timepay: {
					blue: 'var(--primary)',
					indigo: 'var(--accent)',
					teal: 'var(--primary)',
					green: 'var(--accent)',
					orange: '#f97316',
					dark: 'var(--foreground)',
					gray: 'var(--muted)',
					'gray-dark': 'var(--border)',
					'light-blue': 'var(--muted)', 
					'light-green': 'var(--muted)',
					purple: '#8B5CF6',
					pink: '#EC4899',
					yellow: '#FBBF24',
				},
				// Keep legacy PayGrow colors for backward compatibility
				paygrow: {
					blue: 'var(--primary)',
					green: 'var(--primary)',
					orange: '#f97316',
					dark: 'var(--foreground)',
					gray: 'var(--muted)',
					'gray-dark': 'var(--border)',
					purple: '#8B5CF6',
					teal: 'var(--primary)',
					pink: '#EC4899',
					yellow: '#FBBF24',
				},
				// Teal theme colors
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
				// Add card backgrounds with opacity variants
				'card-10': 'linear-gradient(to right, var(--card-with-opacity-10))',
				'card-20': 'linear-gradient(to right, var(--card-with-opacity-20))',
				'card-30': 'linear-gradient(to right, var(--card-with-opacity-30))',
				'card-40': 'linear-gradient(to right, var(--card-with-opacity-40))',
				'card-50': 'linear-gradient(to right, var(--card-with-opacity-50))',
				'card-60': 'linear-gradient(to right, var(--card-with-opacity-60))',
				'card-70': 'linear-gradient(to right, var(--card-with-opacity-70))',
				'card-80': 'linear-gradient(to right, var(--card-with-opacity-80))',
				'card-90': 'linear-gradient(to right, var(--card-with-opacity-90))',
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
	plugins: [
		require("tailwindcss-animate"),
		function({ addBase, addComponents, addUtilities, matchUtilities, theme }) {
			// Add support for CSS Variables with opacity modifiers
			matchUtilities(
				{
					'bg-primary': (value) => ({
						'background-color': value,
					}),
				},
				{ values: { '': 'var(--primary)', ...Object.fromEntries(Array.from({ length: 100 }, (_, i) => [i, `rgba(var(--primary-rgb), ${i / 100})`])) } }
			);
			
			matchUtilities(
				{
					'border-primary': (value) => ({
						'border-color': value,
					}),
				},
				{ values: { '': 'var(--primary)', ...Object.fromEntries(Array.from({ length: 100 }, (_, i) => [i, `rgba(var(--primary-rgb), ${i / 100})`])) } }
			);
			
			matchUtilities(
				{
					'text-primary': (value) => ({
						'color': value,
					}),
				},
				{ values: { '': 'var(--primary)', ...Object.fromEntries(Array.from({ length: 100 }, (_, i) => [i, `rgba(var(--primary-rgb), ${i / 100})`])) } }
			);
			
			// Add support for bg-card with opacity
			matchUtilities(
				{
					'bg-card': (value) => ({
						'background-color': value,
					}),
				},
				{ values: { '': 'var(--card)', ...Object.fromEntries(Array.from({ length: 100 }, (_, i) => [i, `rgba(var(--card-rgb), ${i / 100})`])) } }
			);
			
			// Add utility for secondary with opacity
			matchUtilities(
				{
					'bg-secondary': (value) => ({
						'background-color': value,
					}),
				},
				{ values: { '': 'var(--secondary)', ...Object.fromEntries(Array.from({ length: 100 }, (_, i) => [i, `rgba(var(--secondary-rgb), ${i / 100})`])) } }
			);
			
			matchUtilities(
				{
					'border-secondary': (value) => ({
						'border-color': value,
					}),
				},
				{ values: { '': 'var(--secondary)', ...Object.fromEntries(Array.from({ length: 100 }, (_, i) => [i, `rgba(var(--secondary-rgb), ${i / 100})`])) } }
			);
			
			// Add utility for accent with opacity
			matchUtilities(
				{
					'bg-accent': (value) => ({
						'background-color': value,
					}),
				},
				{ values: { '': 'var(--accent)', ...Object.fromEntries(Array.from({ length: 100 }, (_, i) => [i, `rgba(var(--accent-rgb), ${i / 100})`])) } }
			);
			
			matchUtilities(
				{
					'border-accent': (value) => ({
						'border-color': value,
					}),
				},
				{ values: { '': 'var(--accent)', ...Object.fromEntries(Array.from({ length: 100 }, (_, i) => [i, `rgba(var(--accent-rgb), ${i / 100})`])) } }
			);
		}
	],
} satisfies Config;
