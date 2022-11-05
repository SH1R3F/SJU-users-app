import { useAuthStore } from "~~/stores/authStore"

export default defineNuxtPlugin(async () => {
	try {
		const authStore = useAuthStore()
		return await authStore.initAuth()
	} catch (e) {
		console.log("Caught err2: ", e)
	}
})
