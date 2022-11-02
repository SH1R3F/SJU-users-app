import { useAuthStore } from "~~/stores/authStore"

export default () => {
	const { $i18n } = useNuxtApp()

	const useMyFetch = async (url, options = {}) => {
		// CSRF token
		if (options.method === "POST") {
			let token = useCookie("XSRF-TOKEN")?.value
			if (!token) {
				await useFetchCookies()
				token = useCookie("XSRF-TOKEN").value
			}
		}

		const authStore = useAuthStore()
		return useFetch(url, {
			baseURL: "http://127.0.0.1:8000/api",
			headers: {
				"Accept-Language": $i18n.locale,
				Accept: "application/json",
				"Cache-Control": "no-cache",
				Authorization: `Bearer ${authStore.accessToken}`,
			},
			initialCache: false,
			credentials: "include",
			async onResponseError({ request, response, options }) {
				if (response.status === 403) {
					// UnAuthenticate User On Front and Redirect

					// Route to be redirected when unauthenticated error occurs
					// router.push("/volunteers/register")
					console.log("You are not authenticated")
					console.log(authStore.accessToken)
				}
			},
			...options,
		})
	}

	const useFetchCookies = async () => {
		await $fetch("http://127.0.0.1:8000/sanctum/csrf-cookie", {
			credentials: "include", // Allow browser to handle cookies
		})
	}

	return {
		useMyFetch,
	}
}
