// @ts-nocheck
import Icons from "unplugin-icons/vite"

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
	css: ["~/assets/fonts/droidkufi/droidarabickufi.css", "@formkit/themes/genesis"],
	modules: [
		"@nuxtjs/tailwindcss",
		[
			"@pinia/nuxt",
			{
				autoImports: ["defineStore"],
			},
		],
		"@formkit/nuxt",
	],
	plugins: ["~/plugins/flowbite.client.ts", "~/plugins/i18n.ts"],
	vite: {
		plugins: [
			Icons({
				autoInstall: true,
			}),
		],
	},
	runtimeConfig: {
		// secret serverside variables
		public: {
			baseURL: "http://127.0.0.1:8000/api/",
			apiBase: "http://127.0.0.1:8000/api/",
		},
	},
})
