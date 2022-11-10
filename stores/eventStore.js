import { defineStore } from "pinia"
import { useAuthStore } from "~~/stores/authStore"

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
		questionnaire: {},
		questions: [],
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
			const {
				data = {},
				error,
				refresh,
			} = await useMyFetch(`/events/${id}`, {
				method: "POST",
				key: "event",
			})
			const toast = useToast()
			if (data?.value?.message) {
				toast.success(data?.value?.message)
				const router = useRouter()
				const authStore = useAuthStore()
				router.push(`/${authStore.userType}s/dashboard`)
			}
			if (error?.value?.response?.status === 422) {
				toast.error(error.value?.data?.message)
			}
		},

		async attendEvent(id) {
			const { useMyFetch } = useApiFetch()
			const {
				data = {},
				error,
				refresh,
			} = await useMyFetch(`/events/${id}/attend`, {
				method: "POST",
				key: "event",
			})
			const toast = useToast()
			if (data?.value?.message) {
				const toast = useToast()
				toast.success(data?.value?.message)
				const router = useRouter()
				const authStore = useAuthStore()
				router.push(`/${authStore.userType}s/dashboard`)
			}
			if (error?.value?.response?.status === 422) {
				toast.error(error.value?.data?.message)
			}
		},

		async getCertificate(eventId) {
			const { useMyFetch } = useApiFetch()
			const {
				data = {},
				error,
				refresh,
			} = await useMyFetch(`/events/${eventId}/certificate`, {
				key: "event-certificate",
			})
			const toast = useToast()
			const router = useRouter()
			const authStore = useAuthStore()

			if (data?.value) {
				const { type } = data.value
				if (type === "questionnaire") {
					router.push(`/${authStore.userType}s/dashboard/questionnaire/${eventId}/${data.value.id}`)
				} else if (type === "certificate") {
					window.location = data.value.certificate
				}
			}

			if (error?.value) {
				toast.error(error.value?.data?.message)
			}
		},

		async getQuestionnaire(eventId, questionnaireId) {
			const { useMyFetch } = useApiFetch()
			const {
				data = {},
				error,
				refresh,
			} = await useMyFetch(`/questionnaires/${eventId}/${questionnaireId}`, {
				key: "event-questionnaire",
			})
			const toast = useToast()
			if (data?.value) {
				this.questionnaire = data.value.questionnaire
				this.questions = data.value.questionnaire.questions
			}
			if (error.value?.data?.message) {
				toast.error(error.value?.data?.message)
			}
		},

		async submitQuestionnaire(eventId, questionnaireId, questionnaire) {
			const { useMyFetch } = useApiFetch()
			const {
				data = {},
				error,
				refresh,
			} = await useMyFetch(`/questionnaires/${eventId}/${questionnaireId}`, {
				key: "post-questionnaire",
				method: "POST",
				body: {
					questionnaire,
				},
			})
			const toast = useToast()
			if (data?.value?.message) {
				toast.success(data?.value?.message)
			}
			if (error.value?.data?.message) {
				console.log(process)
				toast.error(error.value?.data?.message)
			}
		},
	},
})
