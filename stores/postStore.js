import { defineStore } from "pinia"

export const usePostStore = defineStore("postStore", {
	state: () => ({
		categories: [],
		posts: [],
		payload: {
			page: 0,
			perPage: 18,
			category: "all",
		},
		pagination: {
			start: 0,
			end: 1,
			pages: 1,
		},
	}),
	actions: {
		async fetchCategories() {
			const { apiFetch } = useApiFetch()
			const { categories } = await apiFetch("/blog/categories")
			this.categories = categories
		},
		async fetchPosts() {
			const { apiFetch } = useApiFetch()
			const { data, meta } = await apiFetch("/blog/posts?" + new URLSearchParams(this.payload))
			this.posts = data

			// Play around with pagination
			const pages = meta.last_page
			this.pagination.pages = pages

			if (pages < 11) {
				this.pagination.start = 0
				this.pagination.end = pages
			} else if (this.payload.page <= 6) {
				// Show first 11 pages
				this.pagination.start = 0
				this.pagination.end = 11
			} else if (this.payload.page > 6 && this.payload.page < this.pagination.pages - 6) {
				this.pagination.start = this.payload.page - 5
				this.pagination.end = this.payload.page + 5
			} else if (this.payload.page > 6 && this.payload.page >= this.pagination.pages - 6) {
				this.pagination.start = this.pagination.pages - 11
				this.pagination.end = this.pagination.pages
			}
		},

		paginateTo(page) {
			this.payload.page = page - 1
			// Refresh posts
			this.fetchPosts()
		},
	},
})
