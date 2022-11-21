<script setup>
	import { useAuthStore } from "~~/stores/authStore"

	const toast = useToast()
	const submitReset = async (body, node) => {
		const route = useRoute()
		if (route.query.token && route.query.email) {
			const authStore = useAuthStore()
			const { error } = await authStore.resetPassword({ ...body, ...route.query, userType: "member" })
			// On errors
			if (error?.value?.response?.status === 400) {
				node.setErrors(error.value?.data)
			} else if (error?.value?.response?.status === 422) {
				toast.error(error.value?.data?.message)
			}
		}
	}

	const { $i18n } = useNuxtApp()
	// Page Meta
	const title = $i18n.translate("Reset password")
	useHead({
		title,
	})

	definePageMeta({
		middleware: "guest",
	})
</script>

<template>
	<div>
		<div class="container my-20">
			<div class="card">
				<h5 class="card-title">{{ $translate("Reset password") }}</h5>
				<FormKit type="form" :actions="false" @submit="submitReset">
					<FormKit
						:label="$translate('New password')"
						type="password"
						name="new_password"
						id="password"
						:classes="{
							outer: 'mb-3',
							wrapper: {
								'w-full': true,
								'formkit-wrapper': false,
							},
							inner: 'mt-2',
						}"
						:placeholder="$translate('New password')"
						validation="required:trim|length:6"
						:validation-label="$translate('New password')"
					/>

					<FormKit
						:label="$translate('Password confirmation')"
						type="password"
						name="new_password_confirm"
						id="confirm_password"
						:classes="{
							outer: 'mb-3',
							wrapper: {
								'w-full': true,
								'formkit-wrapper': false,
							},
							inner: 'mt-2',
						}"
						:placeholder="$translate('Password confirmation')"
						validation="required:trim|confirm"
						:validation-label="$translate('Password confirmation')"
					/>

					<div class="flex justify-between mt-8">
						<button class="btn-primary" type="submit">{{ $translate("Save") }}</button>
						<nuxt-link to="/members/auth/login" class="btn">{{ $translate("login") }}</nuxt-link>
					</div>
				</FormKit>
			</div>
		</div>
	</div>
</template>
