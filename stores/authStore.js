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
			const user = localStorage.getItem("userData") || "{}"
			const type = localStorage.getItem("userType") || null
			const token = localStorage.getItem("accessToken") || null
			this.userData = JSON.parse(user)
			this.userType = type
			this.accessToken = token
			if (token) {
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

		async loginVolunteer(volunteer) {
			const { useMyFetch } = useApiFetch()

			return await useMyFetch("/volunteers/login", {
				key: "login-volunteer",
				method: "POST",
				body: volunteer,
			})
		},

		async logout() {
			const { useMyFetch } = useApiFetch()

			// Logout on backend
			const res = await useMyFetch("/auth/logout", {
				key: "logout",
				method: "POST",
			})

			// Logout on frontend
			localStorage.removeItem("userData")
			localStorage.removeItem("userType")
			localStorage.removeItem("accessToken")
			this.userData = {}
			this.userType = null
			this.accessToken = null
			this.authenticated = false
		},
	},
})
