import { useAuthStore } from "~~/stores/authStore"
import { useHomeStore } from "~~/stores/homeStore"

export default () => {
	const { $i18n } = useNuxtApp()
	const toast = useToast()
	const config = useRuntimeConfig()

	const useMyFetch = async (url, options = {}) => {
		useHomeStore().loading = true
		const authStore = useAuthStore()
		const fetched = await useFetch(url, {
			baseURL: config.public.baseURL,
			headers: {
				"Accept-Language": $i18n.locale,
				Accept: "application/json",
				"Cache-Control": "no-cache",
				Authorization: `Bearer ${authStore.accessToken}`,
			},
			initialCache: false,
			credentials: "include",
			async onResponseError({ request, response, options }) {
				if (response.status == 403) {
					// Ask him to refresh the page!
					toast.error($i18n.translate("Error occured. Refresh the page and if problem resists contact us!"))
				}
			},
			...options,
		})
		useHomeStore().loading = false
		return fetched
	}

	const useFetchCookies = async () => {
		await $fetch(`${config.public.homeBase}/sanctum/csrf-cookie`, {
			credentials: "include", // Allow browser to handle cookies
		})
	}

	return {
		useMyFetch,
		useFetchCookies,
	}
}
