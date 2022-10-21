export default () => {
	const { $i18n } = useNuxtApp()

	const useMyFetch = (url, options = {}) => {
		return useFetch(url, {
			baseURL: "http://127.0.0.1:8000/api",
			headers: {
				"Accept-Language": $i18n.locale,
			},
			initialCache: false,
			...options,
		})
	}

	return {
		useMyFetch,
	}
}
