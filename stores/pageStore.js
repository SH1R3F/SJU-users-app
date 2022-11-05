import { defineStore } from "pinia"

export const usePageStore = defineStore("pageStore", {
	state: () => ({
		page: {},
	}),
	actions: {
		async fetchPage(slug) {
			const { useMyFetch } = useApiFetch()
			const { data, error } = await useMyFetch(`/pages/${slug}`, {
				key: "static-page",
			})
			if (error?.value?.response?.status) {
				throw createError({
					statusCode: error?.value?.response?.status,
					statusMessage: error?.value?.response?.statusText,
				})
			}
			this.page = data.value.page
		},
	},
})
