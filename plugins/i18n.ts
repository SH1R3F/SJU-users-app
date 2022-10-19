import ar from "~/locales/ar.json"
import en from "~/locales/en.json"

export default defineNuxtPlugin((nuxtApp) => {
	const i18nPlugin = {
		install(app, options) {
			// inject a globally available $translate() method
			app.config.globalProperties.$translate = (key) => {
				return options.messages[options.locale][key]
			}

			nuxtApp.provide("i18n", options)
		},
	}

	nuxtApp.vueApp.use(i18nPlugin, {
		locale: useCookie("locale").value || "ar",
		messages: {
			ar,
			en,
		},
		translate: function (key) {
			return this.messages[this.locale][key]
		},
	})
})
