import { useAuthStore } from "~~/stores/authStore"

export default defineNuxtRouteMiddleware((to, from) => {
	// Check Authentication
	const authStore = useAuthStore()
	if (authStore.userType != "member") {
		return navigateTo("/members/auth/login")
	}
	let complete = true
	complete = complete && authStore.userData.avatar
	complete = complete && authStore.userData.national_image
	// This also is required when his subscription type is 3 !
	complete = complete && authStore.userData.employer_letter

	// Careful here. NEEDS REWORK. newspaper license only required from people having newspaper type electronic! [UNFINISHED WORK]
	complete = complete && authStore.userData.newspaper_license
	complete = complete && authStore.userData.experiences_and_fields?.fields?.length
	complete = complete && authStore.userData.experiences_and_fields?.experiences?.length
	complete = complete && authStore.userData.experiences_and_fields?.languages?.length

	if (!complete) {
		return navigateTo("/members/dashboard/profile/complete")
	}
})
