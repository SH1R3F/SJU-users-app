import { defineStore } from "pinia"

export const useAuthStore = defineStore("authStore", {
	state: () => ({
		authenticated: false,
		userData: {},
		userType: null,
		accessToken: null,
	}),

	// getters: {
	//   accessToken(state) {
	//     if (process.client)
	//   }
	// },

	actions: {
		async initAuth() {
			const token = useCookie("access-token").value || null
			if (token) {
				// Check Token and Fetch User Data From Backend to Set to Store
				this.accessToken = token
				// Lets try fetch user with $fetch
				const res = await $fetch("/auth/user", {
					baseURL: "http://127.0.0.1:8000/api",
					headers: {
						Authorization: `Bearer ${token}`,
					},
				})

				if (res) {
					this.userData = res.user
					this.userType = res.type
					this.authenticated = true
				}
			}
			return true
		},

		async registerVolunteer(volunteer) {
			const { useMyFetch } = useApiFetch()
			const router = useRouter()
			const redirectTo = `/volunteers/`

			const { data, error } = await useMyFetch("/volunteers/register", {
				key: "register-volunteer",
				method: "POST",
				body: volunteer,
			})

			// On success
			if (data?.value) {
				this.authenticated = true
				this.userData = data.value.userData
				this.userType = "volunteer"
				this.accessToken = data.value.accessToken

				// Save to cookie
				useCookie("access-token").value = data.value.accessToken

				// Redirect to dashboard
				router.push(redirectTo)
			}

			return { error }
		},

		async loginVolunteer(volunteer) {
			const { useMyFetch } = useApiFetch()
			const router = useRouter()
			const redirectTo = `/volunteers/`

			const { data, error } = await useMyFetch("/volunteers/login", {
				key: "login-volunteer",
				method: "POST",
				body: volunteer,
			})

			// On success
			if (data?.value) {
				this.authenticated = true
				this.userData = data.value.userData
				this.userType = "volunteer"
				this.accessToken = data.value.accessToken

				// Save to cookie
				useCookie("access-token").value = data.value.accessToken

				// Redirect to dashboard
				router.push(redirectTo)
			}

			return { error }
		},

		async logout() {
			const { useMyFetch } = useApiFetch()
			const router = useRouter()
			const redirectTo = this.userType ? `/${this.userType}s/auth/login` : "/"

			// Logout on backend
			const res = await useMyFetch("/auth/logout", {
				key: "logout",
				method: "POST",
			})

			// Delete from cookie
			useCookie("access-token").value = null

			this.userData = {}
			this.userType = null
			this.accessToken = null
			this.authenticated = false

			router.push(redirectTo)
		},
	},
})
