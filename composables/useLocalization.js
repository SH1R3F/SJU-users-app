import { useI18n } from "vue-i18n"

export default () => {
	const i18n = useI18n()

	const dblocalize = (obj, col) => {
		const locale = i18n.locale.value

		if (locale === "en" && !obj[`${col}_${locale}`]) {
			return obj[`${col}_ar`]
		}

		return obj[`${col}_${locale}`]
	}

	return {
		dblocalize,
	}
}
