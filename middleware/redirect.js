export default defineNuxtRouteMiddleware((to, from) => {
	if (to.name === "volunteers") {
		return navigateTo("/volunteers/dashboard")
	}
})
