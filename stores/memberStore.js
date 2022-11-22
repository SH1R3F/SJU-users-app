import { defineStore } from "pinia"
import { useAuthStore } from "./authStore"

export const useMemberStore = defineStore("memberStore", {
	state: () => ({
		upcomingEvents: [],
		enrolledEvents: [],
		notifications: [],
	}),
	actions: {
		async fetchEvents() {
			const { useMyFetch } = useApiFetch()
			const { data, error, refresh } = await useMyFetch("/members/events", {
				key: "member-events",
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
		async fetchNotifications() {
			const { useMyFetch } = useApiFetch()
			const { data, error, refresh } = await useMyFetch("/members/notifications", {
				key: "member-notifications",
			})
			if (error?.value?.response?.status) {
				throw createError({
					statusCode: error?.value?.response?.status,
					statusMessage: error?.value?.response?.statusText,
				})
			}
			this.notifications = data.value.notifications
		},

		updateMember: async (body) => {
			const { useMyFetch } = useApiFetch()

			const { data, error } = await useMyFetch("/members/profile", {
				key: "update-member",
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

			const { data, error } = await useMyFetch("/members/profile/password", {
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
		updateExperiences: async (experiences, fields, languages) => {
			const { useMyFetch } = useApiFetch()

			const { data, error } = await useMyFetch("/members/profile/experiences", {
				key: "update-experiences",
				method: "POST",
				body: { experiences, fields, languages },
			})

			// On success
			if (data?.value) {
				const toast = useToast()
				toast.success(data?.value?.message)
			}

			return { error }
		},
		async updatePicture(form) {
			const { useMyFetch } = useApiFetch()

			const { data, error } = await useMyFetch("/members/profile/picture", {
				key: "update-picture",
				method: "POST",
				body: form,
			})

			// On success
			if (data?.value) {
				const toast = useToast()
				toast.success(data?.value?.message)
				useAuthStore().userData.avatar = data?.value?.image
			}

			return { error }
		},
		async updateID(form) {
			const { useMyFetch } = useApiFetch()
			const { data, error } = await useMyFetch("/members/profile/id", {
				key: "update-id",
				method: "POST",
				body: form,
			})

			// On success
			if (data?.value) {
				const toast = useToast()
				toast.success(data?.value?.message)
				useAuthStore().userData.national_image = data?.value?.image
			}

			return { error }
		},
		async updateStatement(form) {
			const { useMyFetch } = useApiFetch()
			const { data, error } = await useMyFetch("/members/profile/statement", {
				key: "update-statement",
				method: "POST",
				body: form,
			})

			// On success
			if (data?.value) {
				const toast = useToast()
				toast.success(data?.value?.message)
				useAuthStore().userData.employer_letter = data?.value?.image
			}

			return { error }
		},
		async updateContract(form) {
			const { useMyFetch } = useApiFetch()
			const { data, error } = await useMyFetch("/members/profile/contract", {
				key: "update-contract",
				method: "POST",
				body: form,
			})

			// On success
			if (data?.value) {
				const toast = useToast()
				toast.success(data?.value?.message)
				useAuthStore().userData.job_contract = data?.value?.image
			}

			return { error }
		},
		async updateLicense(form) {
			const { useMyFetch } = useApiFetch()
			const { data, error } = await useMyFetch("/members/profile/license", {
				key: "update-license",
				method: "POST",
				body: form,
			})

			// On success
			if (data?.value) {
				const toast = useToast()
				toast.success(data?.value?.message)
				useAuthStore().userData.newspaper_license = data?.value?.image
			}

			return { error }
		},
		async applyMembership() {
			const { useMyFetch } = useApiFetch()
			const { data, error } = await useMyFetch("/members/membership", {
				key: "request-membership",
				method: "POST",
			})

			// On success
			if (data?.value) {
				const toast = useToast()
				toast.success(data?.value?.message)
				useAuthStore().userData.approved = data?.value?.approved
			}

			return { error }
		},
		async prepareGateway(type) {
			const { useMyFetch } = useApiFetch()
			const { data, error } = await useMyFetch(`/members/membership/subscribe/${type}`, {
				key: "prepare-gateway",
				method: "POST",
			})

			// On error
			if (error?.value) {
				const toast = useToast()
				toast.error(error?.value?.data?.message)
			}

			return { data }
		},
	},
})
