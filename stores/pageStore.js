import { defineStore } from "pinia"

export const usePageStore = defineStore("pageStore", {
	state: () => ({
		page: {},
	}),
	actions: {
		async fetchPage(slug) {
			const { useMyFetch } = useApiFetch()
			const { data } = await useMyFetch(`/pages/${slug}`, {
				key: "static-page",
			})
			if (!data.value) {
				throw createError({ statusCode: 404, statusMessage: "Page not found" })
			}
			this.page = data.value.page
		},
	},
})
