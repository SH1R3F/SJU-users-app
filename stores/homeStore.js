import { defineStore } from "pinia"

export const useHomeStore = defineStore("homeStore", {
	state: () => ({
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
	},
})
