export default () => {
	const { $i18n } = useNuxtApp()

	const dblocalize = (obj, col) => {
		const locale = $i18n.locale

		if (locale === "en" && !obj[`${col}_${locale}`]) {
			return obj[`${col}_ar`]
		}

		return obj[`${col}_${locale}`]
	}

	return {
		dblocalize,
	}
}
