import { defineStore } from "pinia"
import { useAuthStore } from "./authStore"

export const useVolunteerStore = defineStore("volunteerStore", {
	state: () => ({
		upcomingEvents: [],
		enrolledEvents: [],
	}),
	actions: {
		async fetchEvents() {
			const { useMyFetch } = useApiFetch()
			const { data, error, refresh } = await useMyFetch("/volunteers/events", {
				key: "volunteer-events",
			})
			if (error?.value?.response?.status) {
				throw createError({
					statusCode: error?.value?.response?.status,
					statusMessage: error?.value?.response?.statusText,
				})
			}
			this.upcomingEvents = data.value.upcomingEvents
			this.enrolledEvents = data.value.enrolledEvents
		},

		updateVolunteer: async (body) => {
			const { useMyFetch } = useApiFetch()

			const { data, error } = await useMyFetch("/volunteers/profile", {
				key: "update-volunteer",
				method: "POST",
				body,
			})

			// On success
			if (data?.value) {
				const toast = useToast()
				toast.success(data?.value?.message)
				useAuthStore().userData = data?.value?.user
			}

			return { error }
		},
		updatePassword: async (body) => {
			const { useMyFetch } = useApiFetch()

			const { data, error } = await useMyFetch("/volunteers/profile/password", {
				key: "update-password",
				method: "POST",
				body,
			})

			// On success
			if (data?.value) {
				const toast = useToast()
				toast.success(data?.value?.message)
			}

			return { error }
		},
	},
})
