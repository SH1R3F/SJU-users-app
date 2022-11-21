<script setup>
	import { storeToRefs } from "pinia"
	import { useMemberStore } from "~~/stores/memberStore"

	const memberStore = useMemberStore()
	// Fetching user notifications
	const { notifications } = storeToRefs(memberStore)
	await memberStore.fetchNotifications()

	const { formattedDate } = useFormating()

	const { $i18n } = useNuxtApp()
	// Page Meta
	const title = $i18n.translate("Notifications")
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
			<div class="card-title font-semibold">{{ $translate("Notifications") }}</div>

			<div class="overflow-x-auto relative shadow-md sm:rounded-lg">
				<table class="w-full text-sm text-gray-500 dark:text-gray-400">
					<thead class="text-xs text-gray-700 uppercase dark:text-gray-400">
						<tr>
							<th scope="col" class="py-3 px-6">#</th>
							<th scope="col" class="py-3 px-6 bg-gray-50 dark:bg-gray-800">
								{{ $translate("Request type") }}
							</th>
							<th scope="col" class="py-3 px-6">
								{{ $translate("Status") }}
							</th>
							<th scope="col" class="py-3 px-6 bg-gray-50 dark:bg-gray-800">
								{{ $translate("Request date") }}
							</th>
						</tr>
					</thead>
					<tbody class="text-center">
						<template v-if="notifications?.length">
							<tr
								v-for="(notification, i) in notifications"
								class="border-b border-gray-200 dark:border-gray-700"
							>
								<td class="py-4 px-6">{{ i + 1 }}</td>
								<td class="py-4 px-6 bg-gray-50 dark:bg-gray-800">
									{{ notification.title }}
								</td>
								<td class="py-3 px-6">
									{{ notification.note }}
								</td>
								<td class="py-4 px-6 bg-gray-50 dark:bg-gray-800">
									{{ formattedDate(notification.created_at) }}
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
