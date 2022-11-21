<script setup>
	import { useAuthStore } from "~~/stores/authStore"
	import { useHomeStore } from "~~/stores/homeStore"

	const route = useRoute()
	const router = useRouter()
	const { $i18n } = useNuxtApp()
	const toast = useToast()

	const mobile = route.query.mobile
	const pattern = /^(5)\d{8}$/
	// Validate mobile
	if (!pattern.test(mobile)) {
		router.push("/members/auth/login")
		toast.error($i18n.translate("Mobile provided is not correct"))
	}

	const resendVerification = async () => {
		useHomeStore().loading = true
		const authStore = useAuthStore()
		const { error } = await authStore.resendMobileVerification(mobile)
		if (error.value) {
			toast.error(error.value.data?.message)
		}
		useHomeStore().loading = false
	}

	const verify = async (body, node) => {
		useHomeStore().loading = true
		const authStore = useAuthStore()
		const { error } = await authStore.verifyMobile(mobile, body.code)
		if (error.value) {
			toast.error(error.value.data?.message)
		}
		useHomeStore().loading = false
	}

	// Page Meta
	const title = $i18n.translate("Mobile verification")
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
				<h5 class="card-title">{{ $translate("Mobile verification") }}</h5>

				<!-- Mobile -->
				<div class="my-4">
					<label class="font-bold">{{ $translate("Mobile") }}</label>
					<h5 class="font-bold inline mx-10 text-sju-200 underline">966{{ mobile }}</h5>
				</div>
				<!-- Mobile -->

				<FormKit type="form" :actions="false" @submit="verify">
					<FormKit
						:label="$translate('Verification code')"
						type="text"
						name="code"
						id="code"
						:classes="{
							outer: 'mb-3',
							inner: 'mt-2',
						}"
						:placeholder="$translate('Verification code')"
						validation="required:trim|number|length:4,4"
						:validation-label="$translate('Verification code')"
					/>
					<span class="text-sju-50 text-sm cursor-pointer" @click="resendVerification">
						{{ $translate("Resend verification code") }}
					</span>

					<div class="flex justify-between mt-8">
						<button class="btn-primary" type="submit">{{ $translate("Send") }}</button>
						<nuxt-link to="/members/auth/login" class="btn">{{ $translate("login") }}</nuxt-link>
					</div>
				</FormKit>
			</div>
		</div>
	</div>
</template>
