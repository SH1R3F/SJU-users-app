/** @type {import('tailwindcss').Config} */
module.exports = {
	darkMode: "class",
	content: [
		`components/**/*.{vue,js}`,
		`layouts/**/*.vue`,
		`pages/**/*.vue`,
		`composables/**/*.{js,ts}`,
		`plugins/**/*.{js,ts}`,
		`App.{js,ts,vue}`,
		`app.{js,ts,vue}`,
		"./node_modules/flowbite/**/*.js",
	],
	theme: {
		screens: {
			xs: "768px",
			sm: "768px",
			md: "992px",
			lg: "1200px",
		},
		extend: {
			colors: {
				sju: {
					50: "#007C42",
					100: "#87c82f",
					// Dark mode colors
					200: "#28a745",
					300: "#60ca0f",
					400: "#97D12C",
					500: "#F5F5F5",
					600: "#3B3B3B",
				},
			},
			container: {
				center: true,
				padding: "1rem",
			},
		},
	},
	plugins: [require("flowbite/plugin")],
}
