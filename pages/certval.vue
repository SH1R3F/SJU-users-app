<script setup>
	import { useEventStore } from "~~/stores/eventStore"

	const toast = useToast()

	const submitValidate = async (body, node) => {
		const eventStore = useEventStore()
		const { error } = await eventStore.validateCertificate(body.code)
		// On errors
		if (error?.value?.response?.status == 400) {
			node.setErrors(error.value?.data)
		} else if (error?.value?.response?.status == 422) {
			toast.error(error.value?.data?.message)
		}
	}

	const { $i18n } = useNuxtApp()
	// Page Meta
	const title = $i18n.translate("Validate certificate")
	useHead({
		title,
	})
</script>

<template>
	<div>
		<div class="container my-20">
			<div class="card">
				<h5 class="card-title">{{ $translate("Validate certificate") }}</h5>
				<p class="mb-5">{{ $translate("Please enter the code written on the certificate") }}</p>
				<FormKit type="form" :actions="false" @submit="submitValidate">
					<FormKit
						:label="$translate('Code')"
						type="text"
						name="code"
						id="code"
						:classes="{
							outer: 'mb-3',
							wrapper: {
								'w-full': true,
								'formkit-wrapper': false,
							},
							inner: 'mt-2',
						}"
						:placeholder="$translate('Code')"
						validation="required:trim"
						:validation-label="$translate('Code')"
					/>

					<div class="text-end mt-8">
						<button class="btn-primary" type="submit">{{ $translate("Validate") }}</button>
					</div>
				</FormKit>
			</div>
		</div>
	</div>
</template>
