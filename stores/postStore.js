import { defineStore } from "pinia"

export const usePostStore = defineStore("postStore", {
	state: () => ({
		categories: [],
		category: "all",
		posts: [],
		post: {},
		relatedPosts: [],

		pagination: {
			current_page: 1,
			perPage: 18,
		},
	}),
	getters: {
		getCategory: (state) => {
			return () => useRoute().query.category || state.category
		},
		getPagination: (state) => {
			return () => {
				state.pagination.current_page = useRoute().query.page || 1
				return state.pagination
			}
		},
	},
	actions: {
		// Fetch all categories
		async fetchCategories() {
			const { useMyFetch } = useApiFetch()
			const {
				data: {
					value: { categories },
				},
			} = await useMyFetch("/blog/categories", {
				key: "categories",
			})
			this.categories = categories
		},

		// Fetch all posts
		async fetchPosts() {
			this.pagination = {
				current_page: 1,
				perPage: 18,
			}
			const { useMyFetch } = useApiFetch()
			const { data, refresh } = await useMyFetch(`/blog/posts?page=${this.pagination.current_page}&perPage=${this.pagination.perPage}&category=${this.getCategory()}`, {
				key: "posts",
			})
			if (!data.value) {
				throw createError({ statusCode: 404, statusMessage: "Post Not Found" })
			}

			this.posts = data.value.data
			this.pagination = { ...this.pagination, ...data.value.meta }
		},

		async fetchPost(id) {
			const { useMyFetch } = useApiFetch()
			const { data = {}, refresh } = await useMyFetch(`/blog/posts/${id}`, {
				key: "post",
			})
			if (!data.value) {
				throw createError({ statusCode: 404, statusMessage: "Post Not Found" })
			}
			this.post = data.value.post
			this.relatedPosts = data.value.posts
		},
	},
})
