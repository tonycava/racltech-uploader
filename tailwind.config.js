/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			animationDelay: {
				'1s': '1s',
				'2s': '2s',
				'3s': '3s',
				'n-3s': '-3s',
			},
			animation: {
				'spin-slow': 'spin 6s linear infinite',
			},
			colors: {
				primary: 'var(--color-primary)',
				secondary: 'var(--color-secondary)',
			}
		}
	},
	plugins: [
		require('tailwindcss-animation-delay'),
	],
	mode: 'jit',
};