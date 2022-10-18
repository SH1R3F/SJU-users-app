// @ts-nocheck
import Icons from "unplugin-icons/vite"

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
	runtimeConfig: {
		// secret serverside variables
		public: {
			baseURL: "http://127.0.0.1:8000/api/",
			baseUrl: "http://127.0.0.1:8000/api/",
		},
	},
	css: ["~/assets/fonts/droidkufi/droidarabickufi.css"],
	modules: [
		"@nuxtjs/tailwindcss",
		[
			"@pinia/nuxt",
			{
				autoImports: ["defineStore"],
			},
		],
	],
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
