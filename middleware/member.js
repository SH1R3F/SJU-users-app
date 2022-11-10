import { useAuthStore } from "~~/stores/authStore"

export default defineNuxtRouteMiddleware((to, from) => {
	// Check Authentication
	const authStore = useAuthStore()
	if (authStore.userType != "member") return navigateTo("/members/auth/login")
})
