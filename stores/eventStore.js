import { defineStore } from "pinia"

export const useEventStore = defineStore("eventStore", {
	state: () => ({
		events: [],
		type: "upcoming",
		pagination: {
			current_page: 1,
			perPage: 18,
		},
		event: {},
		upcomingEvents: [],
	}),
	getters: {
		getType: (state) => {
			return () => useRoute().query.type || state.type
		},
		getPagination: (state) => {
			return () => {
				const current_page = useRoute().query.page || 1
				const pagination = {
					...state.pagination,
					current_page,
				}
				return pagination
			}
		},
	},
	actions: {
		async fetchEvents() {
			this.pagination = {
				current_page: 1,
				perPage: 18,
			}
			const { useMyFetch } = useApiFetch()
			const { data, error, refresh } = await useMyFetch(
				`/events?page=${this.getPagination().current_page}&perPage=${
					this.pagination.perPage
				}&type=${this.getType()}`,
				{
					key: "events",
				}
			)
			if (error?.value?.response?.status) {
				throw createError({
					statusCode: error?.value?.response?.status,
					statusMessage: error?.value?.response?.statusText,
				})
			}
			this.events = data.value.data
			this.pagination = { ...this.pagination, ...data.value.meta }
		},

		async fetchEvent(id) {
			const { useMyFetch } = useApiFetch()
			const {
				data = {},
				error,
				refresh,
			} = await useMyFetch(`/events/${id}`, {
				key: "event",
			})
			if (error?.value?.response?.status) {
				throw createError({
					statusCode: error?.value?.response?.status,
					statusMessage: error?.value?.response?.statusText,
				})
			}
			this.event = data.value.event
			this.upcomingEvents = data.value.events
		},

		async enrollEvent(id) {
			const { useMyFetch } = useApiFetch()
			const { data = {}, refresh } = await useMyFetch(`/events/${id}`, {
				method: "POST",
				key: "event",
			})
			if (!data?.value) {
				throw createError({ statusCode: 404, statusMessage: "Event Not Found" })
			}
			if (data?.value?.message) {
				const toast = useToast()
				toast.success(data?.value?.message)
			}
		},
	},
})
