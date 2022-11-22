import { defineStore } from "pinia"

export const useAuthStore = defineStore("authStore", {
	state: () => ({
		authenticated: false,
		userData: {},
		userType: null,
		accessToken: null,
	}),

	actions: {
		async initAuth() {
			const config = useRuntimeConfig()
			try {
				const token = useCookie("access-token").value || null
				if (token) {
					// Check Token and Fetch User Data From Backend to Set to Store
					this.accessToken = token
					// Lets try fetch user with $fetch
					const res = await $fetch("/auth/user", {
						baseURL: config.public.baseURL,
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
			} catch (e) {
				useCookie("access-token").value = null
			}
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
				// Redirect to login page.. Because he first needs to verify email!
				const toast = useToast()
				const { $i18n } = useNuxtApp()
				toast.success(data?.value.message)
				toast.success($i18n.translate("Please verify your email"))
				router.push("/volunteers/auth/login")
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

		async registerSubscriber(subscriber) {
			const { useMyFetch } = useApiFetch()
			const router = useRouter()
			const redirectTo = `/subscribers/`

			const { data, error } = await useMyFetch("/subscribers/register", {
				key: "register-subscriber",
				method: "POST",
				body: subscriber,
			})

			// On success
			if (data?.value) {
				// Redirect to login page.. Because he first needs to verify email!
				const toast = useToast()
				const { $i18n } = useNuxtApp()
				toast.success(data?.value.message)
				toast.success($i18n.translate("Please verify your email"))
				router.push("/subscribers/auth/login")
			}

			return { error }
		},

		async loginSubscriber(subscriber) {
			const { useMyFetch } = useApiFetch()
			const router = useRouter()
			const redirectTo = `/subscribers/`

			const { data, error } = await useMyFetch("/subscribers/login", {
				key: "login-subscriber",
				method: "POST",
				body: subscriber,
			})

			// On success
			if (data?.value) {
				this.authenticated = true
				this.userData = data.value.userData
				this.userType = "subscriber"
				this.accessToken = data.value.accessToken

				// Save to cookie
				useCookie("access-token").value = data.value.accessToken

				// Redirect to dashboard
				router.push(redirectTo)
			}

			return { error }
		},

		async registerMember(member) {
			const { useMyFetch } = useApiFetch()
			const router = useRouter()
			const redirectTo = `/members/`

			const { data, error } = await useMyFetch("/members/register", {
				key: "register-member",
				method: "POST",
				body: member,
			})

			// On success
			if (data?.value) {
				// Redirect to login page.. Because he first needs to verify email!
				const toast = useToast()
				const { $i18n } = useNuxtApp()
				toast.success(data?.value.message)
				toast.success($i18n.translate("Please verify your mobile"))
				router.push(`/members/auth/verify?mobile=${member.contactInfo.mobile}`)
			}

			return { error }
		},

		async loginMember(member) {
			const { useMyFetch } = useApiFetch()
			const router = useRouter()
			const redirectTo = `/members/`

			const { data, error } = await useMyFetch("/members/login", {
				key: "login-member",
				method: "POST",
				body: member,
			})

			// On success
			if (data?.value) {
				this.authenticated = true
				this.userData = data.value.userData
				this.userType = "member"
				this.accessToken = data.value.accessToken

				// Save to cookie
				useCookie("access-token").value = data.value.accessToken

				// Redirect to dashboard
				router.push(redirectTo)
			}

			return { error }
		},

		async resendVerification(resend_url) {
			if (resend_url) {
				const { useMyFetch } = useApiFetch()
				const { data, error } = await useMyFetch(resend_url, {
					key: "resend-verification",
					method: "POST",
				})

				// On success
				if (data?.value) {
					const toast = useToast()
					toast.success(data?.value.message)
				}

				return { error }
			}
		},

		async resendMobileVerification(mobile) {
			const { useMyFetch } = useApiFetch()
			const { data, error } = await useMyFetch(`/members/resend/${mobile}`, {
				key: "resend-mobile-verification",
				method: "POST",
			})

			// On success
			if (data?.value) {
				const toast = useToast()
				toast.success(data?.value.message)
			}

			return { error }
		},

		async verifyMobile(mobile, code) {
			const { useMyFetch } = useApiFetch()
			const { data, error } = await useMyFetch(`/members/verify/${mobile}/${code}`, {
				key: "verify-mobile",
				method: "POST",
			})
			const toast = useToast()
			const router = useRouter()

			// On success
			if (data?.value) {
				toast.success(data?.value.message)
				// Redirect to login
				router.push("/members/auth/login")
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

		/**
		 * Forgot password methods
		 */
		async sendForgotPasswordLink(body) {
			const { useMyFetch } = useApiFetch()
			const { data, error } = await useMyFetch(`/forgot-password/${body.userType}`, {
				key: "forgot-password",
				method: "POST",
				body,
			})

			// On success
			if (data?.value) {
				const toast = useToast()
				toast.success(data?.value.message)
			}

			return { error }
		},
		async resetPassword(body) {
			const { useMyFetch } = useApiFetch()
			const { data, error } = await useMyFetch(`/reset-password/${body.userType}`, {
				key: "forgot-password",
				method: "POST",
				body,
			})

			// On success
			if (data?.value) {
				const toast = useToast()
				const router = useRouter()
				toast.success(data?.value.message)
				router.push(`/${body.userType}s/auth/login`)
			}

			return { error }
		},
	},
})
