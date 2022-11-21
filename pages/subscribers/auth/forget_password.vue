<script setup>
	import { useAuthStore } from "~~/stores/authStore"
	const toast = useToast()

	const submitForgot = async (body, node) => {
		const authStore = useAuthStore()
		const { error } = await authStore.sendForgotPasswordLink({ ...body, userType: "subscriber" })
		// On errors
		if (error?.value?.response?.status === 400) {
			node.setErrors(error.value?.data)
		} else if (error?.value?.response?.status === 422) {
			toast.error(error.value?.data?.message)
		}
	}

	const { $i18n } = useNuxtApp()
	// Page Meta
	const title = $i18n.translate("Forgot password")
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
				<h5 class="card-title">{{ $translate("Forgot password") }}</h5>
				<FormKit type="form" :actions="false" @submit="submitForgot">
					<FormKit
						:label="$translate('Email')"
						type="email"
						name="email"
						id="email"
						:classes="{
							outer: 'mb-3',
							wrapper: {
								'w-full': true,
								'formkit-wrapper': false,
							},
							inner: 'mt-2',
						}"
						:placeholder="$translate('Email')"
						validation="required:trim|email"
						:validation-label="$translate('Email')"
					/>

					<div class="flex justify-between mt-8">
						<button class="btn-primary" type="submit">{{ $translate("Send") }}</button>
						<nuxt-link to="/subscribers/auth/login" class="btn">{{ $translate("login") }}</nuxt-link>
					</div>
				</FormKit>
			</div>
		</div>
	</div>
</template>
