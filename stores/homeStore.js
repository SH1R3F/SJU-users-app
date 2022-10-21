import { defineStore } from "pinia"

export const useHomeStore = defineStore("homeStore", {
	state: () => ({
		darkMode: useCookie("darkMode").value || false,
		mediacenter: [],
		studio: [],
		events: [],
		stats: [],
	}),
	actions: {
		// Fetch home objects
		async fetchHomeData() {
			const { useMyFetch } = useApiFetch()
			const { data } = await useMyFetch("/home", {
				key: "home-data",
			})
			if (!data.value) {
				throw createError({ statusCode: 404, statusMessage: "Post Not Found" })
			}
			const { mediacenter, studio, events, stats } = data.value

			this.mediacenter = mediacenter
			this.studio = studio
			this.events = events
			this.stats = stats
		},
		toggleDarkMode() {
			this.darkMode = !this.darkMode
			useCookie("darkMode").value = this.darkMode

			// Update body classes
			const locale = useCookie("locale").value || "ar"
			useHead({
				bodyAttrs: {
					class: `${locale == "ar" ? "rtl" : "ltr"} ${this.darkMode ? "dark" : ""} [&.dark]:bg-sjud-500`,
				},
			})
		},
	},
})
