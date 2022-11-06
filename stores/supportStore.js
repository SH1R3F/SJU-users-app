import { defineStore } from "pinia"

export const useSupportStore = defineStore("supportStore", {
	state: () => ({
		tickets: [],
		chat: {
			title: "",
			messages: [],
		},
	}),
	getters: {
		getMessages: (state) => {
			const chatLog = []
			let msgGroup = []
			let sender = 1
			const messages = state.chat.messages

			messages?.forEach((msg) => {
				if (msg.sender !== sender) {
					sender = msg.sender
					if (msgGroup.length) chatLog.push(msgGroup)
					msgGroup = []
				}
				msgGroup.push(msg)
			})
			if (msgGroup.length) chatLog.push(msgGroup)
			return chatLog
		},
	},
	actions: {
		async fetchTickets() {
			const { useMyFetch } = useApiFetch()
			const { data, error, refresh } = await useMyFetch("/support", {
				key: "fetch-tickets",
			})
			if (error?.value?.response?.status) {
				throw createError({
					statusCode: error?.value?.response?.status,
					statusMessage: error?.value?.response?.statusText,
				})
			}
			this.tickets = data.value.tickets
		},

		async submitTicket(body) {
			const { useMyFetch } = useApiFetch()
			const { data, error } = await useMyFetch("/support", {
				key: "create-ticket",
				method: "POST",
				body,
			})
			// On success
			if (data?.value) {
				const toast = useToast()
				toast.success(data?.value?.message)
				// Redirect to ticket itself
			}
			return { error }
		},

		async fetchChat(id) {
			const { useMyFetch } = useApiFetch()
			const { data, error, refresh } = await useMyFetch(`/support/${id}`, {
				key: "fetch-ticket",
			})
			if (error?.value?.response?.status) {
				throw createError({
					statusCode: error?.value?.response?.status,
					statusMessage: error?.value?.response?.statusText,
				})
			}
			this.chat.messages = data.value.messages
			this.chat.title = data.value.title
		},

		async sendMessage(id, body) {
			const { useMyFetch } = useApiFetch()
			const { data, error } = await useMyFetch(`/support/${id}`, {
				key: "create-ticket",
				method: "POST",
				body,
			})
			// On success
			if (data?.value) {
				const toast = useToast()
				// Update chat log
				await this.fetchChat(id)
			}
			return { error }
		},
	},
})
