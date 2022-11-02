export default defineNuxtRouteMiddleware((to, from) => {
	// Check Authentication
	if (process.client) {
		const token = localStorage.getItem("accessToken")
		if (!!token) return navigateTo("/")
	}
})
