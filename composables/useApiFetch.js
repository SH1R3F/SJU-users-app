export default () => {
	const { $i18n } = useNuxtApp()
	const token = useCookie("XSRF-TOKEN").value

	const useMyFetch = async (url, options = {}) => {
		// CSRF token
		if (options.method === "POST") {
			let token = useCookie("XSRF-TOKEN")?.value
			if (!token) {
				await useFetchCookies()
				token = useCookie("XSRF-TOKEN").value
			}
		}

		return useFetch(url, {
			baseURL: "http://127.0.0.1:8000/api",
			headers: {
				"Accept-Language": $i18n.locale,
				Accept: "application/json",
				"Cache-Control": "no-cache",
			},
			initialCache: false,
			credentials: "include",
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
