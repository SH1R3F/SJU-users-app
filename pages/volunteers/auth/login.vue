<script setup>
	import FaSolidUserEdit from "~icons/fa-solid/user-edit"
	import { useAuthStore } from "~~/stores/authStore"

	// CSRF Token
	onBeforeMount(async () => {
		const { useFetchCookies } = useApiFetch()
		await useFetchCookies()
	})

	const { $i18n } = useNuxtApp()
	const toast = useToast()
	const resend_verification = ref(null)

	const loginVolunteer = async (body, node) => {
		const authStore = useAuthStore()
		const { error } = await authStore.loginVolunteer(body)
		// On errors
		if (error?.value?.response?.status === 400) {
			node.setErrors(error.value?.data)
			if (error.value?.data?.resend) {
				resend_verification.value = error.value?.data?.resend
			}
		} else if (error?.value?.response?.status === 422) {
			toast.error(error.value?.data?.message)
		}
	}

	const resendVerification = async () => {
		const authStore = useAuthStore()
		await authStore.resendVerification(resend_verification.value)
	}

	// Page Meta
	const title = $i18n.translate("Login volunteers")
	useHead({
		title,
	})
	definePageMeta({
		middleware: "guest",
	})
</script>

<template>
	<div class="my-20">
		<div class="container">
			<div class="flex gap-8">
				<div class="w-full md:w-1/2">
					<div class="form">
						<h5 class="form-title">{{ title }}</h5>

						<FormKit type="form" :actions="false" @submit="loginVolunteer">
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
								}"
								:placeholder="$translate('Email')"
								validation="required:trim|email"
								:validation-label="$translate('Email')"
							/>

							<FormKit
								:label="$translate('Password')"
								type="password"
								name="password"
								id="password"
								:classes="{
									outer: 'mb-3',
									wrapper: {
										'w-full': true,
										'formkit-wrapper': false,
									},
								}"
								:placeholder="$translate('Password')"
								validation="required:trim|length:6"
								:validation-label="$translate('Password')"
							/>

							<template v-if="resend_verification">
								<span class="text-sju-50 text-sm cursor-pointer" @click="resendVerification">
									{{ $translate("Resend verification email") }}
								</span>
							</template>
							<template v-else>
								<nuxt-link
									to="/volunteers/auth/forget_password"
									class="text-sju-50 text-sm cursor-pointer"
								>
									{{ $translate("Forgot password") }}
								</nuxt-link>
							</template>

							<div class="text-end">
								<button type="submit" class="btn-primary">
									{{ $translate("Login") }}
								</button>
							</div>
						</FormKit>
					</div>
				</div>

				<div class="w-1/2 hidden md:flex items-center justify-center">
					<div class="text-center">
						<fa-solid-user-edit class="text-5xl mb-7 text-sju-100 m-auto" />

						<h4 class="text-sju-200 mb-2">{{ $translate("Register new volunteer") }}</h4>
						<p class="mb-4">{{ $translate("You can register as a new volunteer from this link") }}</p>
						<nuxt-link to="/volunteers/auth/register" class="text-sju-50">{{
							$translate("Click here to register")
						}}</nuxt-link>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
