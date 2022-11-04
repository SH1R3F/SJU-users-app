import { useAuthStore } from "~~/stores/authStore"

export default defineNuxtPlugin(async () => {
	const authStore = useAuthStore()
	return await authStore.initAuth()
})
