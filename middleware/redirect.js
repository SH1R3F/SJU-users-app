export default defineNuxtRouteMiddleware((to, from) => {
	if (to.name === "volunteers") {
		return navigateTo("/volunteers/dashboard")
	}
	if (to.name === "subscribers") {
		return navigateTo("/subscribers/dashboard")
	}
	if (to.name === "members") {
		return navigateTo("/members/dashboard")
	}
})
