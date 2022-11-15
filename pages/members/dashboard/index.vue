<script setup>
	import { storeToRefs } from "pinia"
	import { useAuthStore } from "~~/stores/authStore"
	import { useEventStore } from "~~/stores/eventStore"
	import { useSubscriberStore } from "~~/stores/subscriberStore"
	import CibZoom from "~icons/cib/zoom"
	import CiYoutube from "~icons/ci/youtube"
	import MdiCertificate from "~icons/mdi/certificate"
	import EpFailed from "~icons/ep/failed"

	const subscriberStore = useSubscriberStore()
	// Fetching user events
	const { upcomingEvents, enrolledEvents } = storeToRefs(subscriberStore)
	await subscriberStore.fetchEvents()

	const { dblocalize } = useLocalization()
	const { formattedDate } = useFormating()

	const { coursePrices } = useSiteConfig()

	const authStore = useAuthStore()

	const upcoming = computed(() => {
		return (dateFrom) => {
			const date = new Date(dateFrom)
			const today = new Date()
			return date >= today
		}
	})

	const eventStore = useEventStore()
	const getCertificate = async (id) => {
		await eventStore.getCertificate(id)
	}

	const { $i18n } = useNuxtApp()
	// Page Meta
	const title = $i18n.translate("Events")
	useHead({
		title,
	})

	definePageMeta({
		middleware: "subscriber",
	})
</script>

<template>
	<div>
		<div class="card">
			<div class="card-title font-semibold">{{ $translate("Upcoming events") }}</div>

			<div class="overflow-x-auto relative shadow-md sm:rounded-lg">
				<table class="w-full text-sm text-gray-500 dark:text-gray-400">
					<thead class="text-xs text-gray-700 uppercase dark:text-gray-400">
						<tr>
							<th scope="col" class="py-3 px-6">#</th>
							<th scope="col" class="py-3 px-6 bg-gray-50 dark:bg-gray-800">
								{{ $translate("Event name") }}
							</th>
							<th scope="col" class="py-3 px-6">{{ $translate("Event date") }}</th>
							<th scope="col" class="py-3 px-6 bg-gray-50 dark:bg-gray-800"></th>
						</tr>
					</thead>
					<tbody class="text-center">
						<template v-if="upcomingEvents?.length">
							<tr
								v-for="(event, i) in upcomingEvents"
								class="border-b border-gray-200 dark:border-gray-700"
							>
								<td class="py-4 px-6">{{ i + 1 }}</td>
								<td class="py-4 px-6 bg-gray-50 dark:bg-gray-800">
									<nuxt-link :to="`/events/${event.id}/register`">
										{{ dblocalize(event, "name") }}
									</nuxt-link>
								</td>
								<td class="py-4 px-6">{{ formattedDate(event.date_from) }}</td>
								<td class="py-3 px-6 bg-gray-50 dark:bg-gray-800">
									<div v-if="event.subscribers.includes(authStore.userData.id)">
										<b>{{ $translate("Registered") }}</b>
									</div>
									<div v-else>
										<nuxt-link :to="`/events/${event.id}/register`">
											<button class="btn-primary">
												{{ $translate("Register") }}
											</button>
										</nuxt-link>
									</div>
								</td>
							</tr>
						</template>
						<template v-else>
							<tr class="border-b border-gray-200 dark:border-gray-700">
								<td class="py-4 px-6" colspan="5">
									<b>{{ $translate("No data found to show") }}</b>
								</td>
							</tr>
						</template>
					</tbody>
				</table>
			</div>
		</div>
		<div class="card">
			<div class="card-title font-semibold">{{ $translate("Enrolled events") }}</div>

			<div class="overflow-x-auto relative shadow-md sm:rounded-lg">
				<table class="w-full text-sm text-gray-500 dark:text-gray-400">
					<thead class="text-xs text-gray-700 uppercase dark:text-gray-400">
						<tr>
							<th scope="col" class="py-3 px-6">#</th>
							<th scope="col" class="py-3 px-6 bg-gray-50 dark:bg-gray-800">
								{{ $translate("Event name") }}
							</th>
							<th scope="col" class="py-3 px-6">{{ $translate("Event date") }}</th>
							<th scope="col" class="py-3 px-6 bg-gray-50 dark:bg-gray-800">
								{{ $translate("Event type") }}
							</th>
							<th scope="col" class="py-3 px-6"></th>
						</tr>
					</thead>
					<tbody class="text-center">
						<template v-if="enrolledEvents?.length">
							<tr
								v-for="(event, i) in enrolledEvents"
								class="border-b border-gray-200 dark:border-gray-700"
							>
								<td class="py-4 px-6">{{ i + 1 }}</td>
								<td class="py-4 px-6 bg-gray-50 dark:bg-gray-800">
									<nuxt-link :to="`/events/${event.id}/register`">
										{{ dblocalize(event, "name") }}
									</nuxt-link>
								</td>
								<td class="py-4 px-6">{{ formattedDate(event.date_from) }}</td>
								<td class="py-4 px-6 bg-gray-50 dark:bg-gray-80">
									{{ coursePrices[event.price].label }}
								</td>
								<td class="py-4 px-6 flex gap-3 justify-center [&>div]:cursor-pointer">
									<!-- If event is upcoming show zoom link if exists -->
									<nuxt-link v-if="upcoming(event.date_from) && event.zoom" :to="event.zoom">
										<cib-zoom class="text-2xl text-blue-500" />
									</nuxt-link>
									<!-- Else if event has passed show youtube link if exists -->
									<nuxt-link
										v-else-if="!upcoming(event.date_from) && event.youtube"
										:to="event.youtube"
									>
										<ci-youtube class="text-2xl text-red-600" />
									</nuxt-link>

									<!-- if you have succeed course show certificate -->
									<div v-if="event.pivot.attendance" @click="getCertificate(event.id)">
										<mdi-certificate />
									</div>
									<!-- Didn't attend -->
									<div v-else :title="$translate(`You didn't attend the event`)">
										<ep-failed />
									</div>
								</td>
							</tr>
						</template>
						<template v-else>
							<tr class="border-b border-gray-200 dark:border-gray-700">
								<td class="py-4 px-6" colspan="5">
									<b>{{ $translate("No data found to show") }}</b>
								</td>
							</tr>
						</template>
					</tbody>
				</table>
			</div>
		</div>
	</div>
</template>
