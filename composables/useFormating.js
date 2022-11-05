export default () => {
	const { $i18n } = useNuxtApp()

	return {
		formattedDate: (date) => {
			const itemDate = new Date(date)
			const day = itemDate.toLocaleDateString($i18n.locale, { weekday: "long" })
			return `${day} ${itemDate.toLocaleDateString("ar-US")}`
		},

		formattedTime: (timeString) => {
			const [hourString, minute] = timeString.split(":")
			const hour = +hourString % 24
			return (hour % 12 || 12) + ":" + minute + (hour < 12 ? " صباحًا" : " مساءً")
		},
	}
}
