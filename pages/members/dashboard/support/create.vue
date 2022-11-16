<script setup>
	import { useSupportStore } from "~~/stores/supportStore"

	const supportStore = useSupportStore()
	const createTicket = async (ticket, node) => {
		// Converting to FormData as we gotta upload a file
		const body = new FormData()
		Object.keys(ticket).forEach((key) => {
			let value = ticket[key]
			body.append(key, value)
		})
		body.append("image", ticket.image[0]?.file || "")

		const { error } = await supportStore.submitTicket(body)
		// On errors
		if (error?.value?.response?.status === 400) {
			node.setErrors(error.value?.data)
		} else if (error?.value?.response?.status === 422) {
			toast.error(error.value?.data?.message)
		}
	}

	const { $i18n } = useNuxtApp()
	// Page Meta
	const title = `${$i18n.translate("Technical support")} - ${$i18n.translate("New ticket")}`
	useHead({
		title,
	})

	definePageMeta({
		middleware: "member",
	})
</script>

<template>
	<div>
		<div class="card">
			<h5 class="card-title">{{ title }}</h5>

			<FormKit type="form" :actions="false" @submit="createTicket" enctype="multipart/form-data">
				<FormKit
					:label="$translate('Ticket title')"
					:classes="{
						wrapper: {
							'formkit-wrapper': false,
							'w-full': true,
						},
						outer: 'mb-3',
					}"
					type="text"
					:placeholder="$translate('Ticket title')"
					name="title"
					:validation-label="$translate('Ticket title')"
					validation="required:trim"
				/>

				<FormKit
					:label="$translate('Description')"
					:classes="{
						wrapper: {
							'formkit-wrapper': false,
							'w-full': true,
						},
						outer: 'mb-3',
					}"
					type="textarea"
					rows="20"
					:placeholder="$translate('Description')"
					name="description"
					:validation-label="$translate('Description')"
					validation="required:trim"
				/>

				<FormKit
					type="file"
					name="image"
					:label="$translate('Attach image')"
					accept="image/*"
					:classes="{
						input: 'block px-3 w-full',
						outer: 'mb-5',
						wrapper: {
							'formkit-wrapper': false,
						},
					}"
				/>
				<div class="text-end">
					<button class="btn-primary" type="submit">{{ $translate("Create") }}</button>
				</div>
			</FormKit>
		</div>
	</div>
</template>
