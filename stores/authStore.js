import { defineStore } from "pinia"

export const useAuthStore = defineStore("authStore", {
	state: () => ({
		authenticated: false,
		userData: {}, //JSON.parse(localStorage.getItem("userData")), // I stopped here. Where would we save user data for refresh?
		userType: null,
		accessToken: null,
	}),

	// getters: {
	//   accessToken(state) {
	//     if (process.client)
	//   }
	// },

	actions: {
		initAuth() {
			const user = localStorage.getItem("userData") || {}
			const type = localStorage.getItem("userType") || null
			const token = localStorage.getItem("accessToken") || null
			this.userData = user
			this.userType = type
			this.accessToken = token

			if (user) {
				this.authenticated = true
			}
		},

		async registerVolunteer(volunteer) {
			const { useMyFetch } = useApiFetch()

			return await useMyFetch("/volunteers/register", {
				key: "register-volunteer",
				method: "POST",
				body: volunteer,
			})
		},
	},
})
