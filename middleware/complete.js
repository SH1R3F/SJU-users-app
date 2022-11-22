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
	complete = complete && authStore.userData.employer_letter

	// Newspaper license is required only for E-newspaper
	if (authStore.userData?.newspaper_type == 2) {
		complete = complete && authStore.userData.newspaper_license
	}

	// Affiliate members has to upload job contracts
	if (authStore.userData?.subscription?.type == 3) {
		complete = complete && authStore.userData.job_contract
	}

	complete = complete && authStore.userData.experiences_and_fields?.fields?.length
	complete = complete && authStore.userData.experiences_and_fields?.experiences?.length
	complete = complete && authStore.userData.experiences_and_fields?.languages?.length

	if (!complete) {
		return navigateTo("/members/dashboard/profile/complete")
	}
})
