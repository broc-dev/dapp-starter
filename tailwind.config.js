/** @type {import('tailwindcss/tailwind-config').TailwindConfig} */
module.exports = {
	content: ['./src/**/*.{js,ts,jsx,tsx}'],
	darkMode: 'class',
	theme: {
		fontFamily: {
			serif: ['Cormorant Garamond', 'serif'],
			mono: ['interstate-mono', 'monospace'],
			redac: ['Redaction Regular', 'serif'],
			pixel: ['Timmy', 'serif'],
			header: ['Micro', 'sans-serif'],
		},
		extend: {
			colors: {
				black: '#000',
				white: '#fff',
				// zinc: {
				// 	50: '#f9fafb',
				// 	100: '#f4f5f7',
				// 	200: '#e5e7eb',
				// 	300: '#d2d6dc',
				// 	400: '#9fa6b2',
				// 	500: '#6b7280',
				// 	600: '#4b5563',
				// 	700: '#374151',
				// 	800: '#252f3f',
				// 	900: '#161e2e',
				// },
				gray: {
					1: '#111111',
					2: '#222222',
					3: '#171717',
				},
				murkyblack: '#0a100d',
				deepsea: '#132217',
				aqua: '#335b54',
				kelp: '#657c60',
				grass: '#b0ae70',
				foam: '#ffe7bc',
				mint: '#2d8e7c',
				yellow: '#FFe987',
			},
		},
	},
	plugins: [],
}
