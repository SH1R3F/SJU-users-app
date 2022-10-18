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
			const { apiFetch } = useApiFetch()
			const { posts, mediacenter, studio, events, stats } = await apiFetch("/home")
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
