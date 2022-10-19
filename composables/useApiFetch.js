export default () => {
	const { $i18n } = useNuxtApp()

	const apiFetch = $fetch.create({
		baseURL: "http://127.0.0.1:8000/api",
		headers: {
			"Accept-Language": $i18n.locale,
		},
	})
	return {
		apiFetch,
	}
}
