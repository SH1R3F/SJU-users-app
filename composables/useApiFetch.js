import { useI18n } from "vue-i18n"

export default (context) => {
	const { locale } = useI18n()

	const apiFetch = $fetch.create({
		baseURL: "http://127.0.0.1:8000/api",
		headers: {
			"Accept-Language": locale.value,
		},
	})
	return {
		apiFetch,
	}
}
