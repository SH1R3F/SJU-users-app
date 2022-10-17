import { createI18n } from "vue-i18n"
import ar from "../locales/ar.json"
import en from "../locales/en.json"

export default defineNuxtPlugin(({ vueApp }) => {
	const cookie = useCookie("locale")

	const i18n = createI18n({
		legacy: false,
		globalInjection: true,
		locale: cookie.value || "ar",
		messages: {
			en,
			ar,
		},
	})
	vueApp.use(i18n)
})
