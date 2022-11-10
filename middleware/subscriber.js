import { useAuthStore } from "~~/stores/authStore"

export default defineNuxtRouteMiddleware((to, from) => {
	// Check Authentication
	const authStore = useAuthStore()
	if (authStore.userType != "subscriber") return navigateTo("/subscribers/auth/login")
})
