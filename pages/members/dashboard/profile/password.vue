<script setup>
	import { useMemberStore } from "~~/stores/memberStore"

	const toast = useToast()
	const memberStore = useMemberStore()

	const updatePassword = async (body, node) => {
		const { error } = await memberStore.updatePassword(body)
		// On errors
		if (error?.value?.response?.status === 400) {
			node.setErrors(error.value?.data)
		} else if (error?.value?.response?.status === 422) {
			toast.error(error.value?.data?.message)
		}
	}

	const { $i18n } = useNuxtApp()
	// Page Meta
	const title = $i18n.translate("Edit profile")
	useHead({
		title,
	})

	definePageMeta({
		middleware: "member",
	})
</script>

<template>
	<div>
		<members-profile-nav active="password" />

		<div class="form">
			<div class="form-title font-semibold">{{ $translate("Change password") }}</div>
			<FormKit type="form" :actions="false" @submit="updatePassword">
				<!-- Current password -->
				<div class="flex flex-wrap mb-8">
					<label class="w-full sm:w-3/12">{{ $translate("Current password") }}</label>
					<FormKit
						:classes="{
							outer: 'w-full sm:w-9/12',
							wrapper: {
								'formkit-wrapper': false,
								'w-full': true,
							},
						}"
						type="password"
						:placeholder="$translate('Current password')"
						id="current_password"
						name="current_password"
						:validation-label="$translate('Current password')"
						validation="required:trim|length:6"
					/>
				</div>
				<!-- Current password -->

				<!-- New password -->
				<div class="flex flex-wrap mb-8">
					<label class="w-full sm:w-3/12">{{ $translate("New password") }}</label>
					<FormKit
						:classes="{
							outer: 'w-full sm:w-9/12',
							wrapper: {
								'formkit-wrapper': false,
								'w-full': true,
							},
						}"
						type="password"
						:placeholder="$translate('New password')"
						id="new_password"
						name="new_password"
						:validation-label="$translate('New password')"
						validation="required:trim|length:6"
					/>
				</div>
				<!-- New password -->

				<!-- Password confirmation -->
				<div class="flex flex-wrap mb-8">
					<label class="w-full sm:w-3/12">{{ $translate("Password confirmation") }}</label>
					<FormKit
						:classes="{
							outer: 'w-full sm:w-9/12',
							wrapper: {
								'formkit-wrapper': false,
								'w-full': true,
							},
						}"
						type="password"
						:placeholder="$translate('Password confirmation')"
						id="new_password_confirm"
						name="new_password_confirm"
						:validation-label="$translate('Password confirmation')"
						validation="required:trim|length:6|confirm"
					/>
				</div>
				<!-- Password confirmation -->

				<!-- Save my data -->
				<div class="text-end">
					<button type="submit" class="btn-primary">
						{{ $translate("Save") }}
					</button>
				</div>
			</FormKit>
		</div>
	</div>
</template>

<style>
	.formkit-label {
		font-weight: normal !important;
	}
</style>
