// @ts-nocheck
import Icons from "unplugin-icons/vite"

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
	runtimeConfig: {
		// secret serverside variables
		public: {
			// Public clientside variables
		},
	},
	css: ["~/assets/fonts/droidkufi/droidarabickufi.css"],
	modules: ["@nuxtjs/tailwindcss"],
	plugins: [
		// Both server and client sides plugins
		"~/plugins/i18n.ts",
		// Client side plugins
		"~/plugins/flowbite.client.ts",
	],
	vite: {
		plugins: [
			Icons({
				autoInstall: true,
			}),
		],
	},
})
