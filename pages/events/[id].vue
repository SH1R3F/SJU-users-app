<script setup>
	import { storeToRefs } from "pinia"
	import { useEventStore } from "~~/stores/eventStore"
	import { useAuthStore } from "~~/stores/authStore"
	const authStore = useAuthStore()

	const { dblocalize } = useLocalization()
	const route = useRoute()
	const eventStore = useEventStore()
	const { event, pivot, upcomingEvents } = storeToRefs(eventStore)

	// Format event date and time to show
	const { formattedDate, formattedTime } = useFormating()

	// Fetch Event
	await eventStore.fetchEvent(route.params.id)

	// Register to an event
	const enrollEvent = () => {
		eventStore.enrollEvent(route.params.id)
	}

	// Page meta
	const { $i18n } = useNuxtApp()
	const meta = ref({
		title: dblocalize(event.value, "name"),
		breadcrumb: [
			{
				link: "/",
				title: $i18n.translate("Home"),
			},
			{
				link: "/events",
				title: $i18n.translate("Events list"),
			},
		],
	})
	useHead({
		title: meta.value.title,
	})

	definePageMeta({
		key: (route) => route.fullPath,
		validate: async (route) => {
			return /^\d+$/.test(route.params.id)
		},
	})
</script>

<template>
	<div>
		<page-header :title="meta.title" :breadcrumb="meta.breadcrumb" :date="event.date_from" />

		<div class="page-content py-11 dark:bg-sjud-100">
			<div class="container">
				<div class="flex flex-col md:flex-row gap-6">
					<div class="md:w-8/12 text-gray-600">
						<div class="card">
							<h5 class="card-title">{{ $translate("Additional info") }}</h5>
							<div class="overflow-x-auto relative shadow-md sm:rounded-lg mb-8">
								<table class="w-full text-sm text-gray-500 dark:text-gray-400">
									<tbody class="text-center">
										<tr class="border-b border-gray-200 dark:border-gray-700">
											<td class="py-4 px-6">{{ $translate("Event name") }}</td>
											<td class="py-4 px-6">{{ dblocalize(event, "name") }}</td>
										</tr>
										<tr class="border-b border-gray-200 dark:border-gray-700">
											<td class="py-4 px-6 bg-gray-50 dark:bg-gray-800">
												{{ $translate("Event date") }}
											</td>
											<td class="py-4 px-6 bg-gray-50 dark:bg-gray-800">
												{{ formattedDate(event.date_from) }}
											</td>
										</tr>
										<tr class="border-b border-gray-200 dark:border-gray-700">
											<td class="py-4 px-6">{{ $translate("Event time") }}</td>
											<td class="py-4 px-6">
												{{
													`${formattedTime(event.time_from)} إلى ${formattedTime(
														event.time_to
													)}`
												}}
											</td>
										</tr>
									</tbody>
								</table>
							</div>
							<h5 class="card-title">{{ $translate("User info") }}</h5>
							<div class="overflow-x-auto relative shadow-md sm:rounded-lg">
								<table class="w-full text-sm text-gray-500 dark:text-gray-400">
									<tbody class="text-center">
										<tr class="border-b border-gray-200 dark:border-gray-700">
											<td class="py-4 px-6">{{ $translate("User name") }}</td>
											<td class="py-4 px-6 text-start">
												<div v-if="authStore.authenticated">
													{{ dblocalize(authStore.userData, "fullName") }}
												</div>
												<div v-else>
													<button class="btn-primary" data-modal-toggle="loginModal">
														{{ $translate("login") }}
													</button>
												</div>
											</td>
										</tr>
										<tr
											class="border-b border-gray-200 dark:border-gray-700"
											v-if="authStore.authenticated"
										>
											<td
												class="py-4 px-6 bg-gray-50 dark:bg-gray-800"
												colspan="2"
												v-if="!event.registered"
											>
												<FormKit
													type="form"
													:actions="false"
													form-class="flex flex-col sm:flex-row justify-between items-center"
													@submit="enrollEvent"
												>
													<FormKit
														type="checkbox"
														:label="$translate('TermsAgreement')"
														:validation-label="$translate('acceptance')"
														validation="required|accepted"
														:classes="{
															wrapper: {
																'formkit-wrapper': false,
																'w-full flex items-center': true,
															},
															inner: 'mx-3',
														}"
													/>
													<button type="submit" class="btn-primary">
														{{ $translate("Register") }}
													</button>
												</FormKit>
											</td>
											<td class="py-4 px-6 bg-sju-500 dark:bg-gray-800" colspan="2" v-else>
												<b class="text-sju-50">{{
													$translate("Already registered in event")
												}}</b>
												<nuxt-link
													class="mx-2 hover:underline transition-all"
													to="/volunteers/dashboard"
													>{{ $translate("Enrolled events") }}</nuxt-link
												>
											</td>
										</tr>
									</tbody>
								</table>
							</div>
						</div>
					</div>
					<div class="md:w-4/12">
						<h3 class="mb-3 text-sju-50">{{ $translate("Upcoming events") }}</h3>
						<event-preview v-for="event in upcomingEvents" :event="event" />
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
