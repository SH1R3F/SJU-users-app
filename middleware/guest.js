import { useAuthStore } from "~~/stores/authStore"

export default defineNuxtRouteMiddleware((to, from) => {
	// Check Authentication
	const authStore = useAuthStore()
	if (authStore.authenticated) {
		switch (authStore.userType) {
			case "volunteer":
				return navigateTo("/volunteers")
				break
			case "subscriber":
				return navigateTo("/subscribers")
				break
			case "member":
				return navigateTo("/members")
				break
		}
	}
})
