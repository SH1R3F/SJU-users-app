export default () => {
	const { $i18n } = useNuxtApp()

	const dblocalize = (obj, col) => {
		const locale = $i18n.locale
		if (!obj) return false

		// If locale is english and doesn't Exist.. resolve arabic locale
		if (locale === "en" && !obj[`${col}_${locale}`]) {
			return resolveAr(obj, col)
		}

		// if locale is arabic and col doesnt exist. return the column as entered
		if (locale === "ar") {
			return resolveAr(obj, col)
		}

		return obj[`${col}_${locale}`]
	}

	const resolveAr = (obj, col) => {
		// if locale is arabic and ar col doesn't exist. return default col
		if (!obj.hasOwnProperty(`${col}_ar`)) {
			return obj[col]
		}

		// Return the arabic version of it.
		return obj[`${col}_ar`]
	}

	return {
		dblocalize,
	}
}
