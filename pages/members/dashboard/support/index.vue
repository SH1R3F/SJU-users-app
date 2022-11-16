<script setup>
	import { storeToRefs } from "pinia"
	import { useSupportStore } from "~~/stores/supportStore"

	// Fetch tickets
	const supportStore = useSupportStore()
	const { tickets } = storeToRefs(supportStore)
	await supportStore.fetchTickets()

	const { ticketStatus } = useSiteConfig()
	const { formattedDate } = useFormating()
	const { $i18n } = useNuxtApp()
	// Page Meta
	const title = $i18n.translate("Technical support")
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
			<h5 class="card-title">{{ $translate("Technical support") }}</h5>

			<div class="overflow-x-auto relative shadow-md sm:rounded-lg mb-3">
				<table class="w-full text-sm text-gray-500 dark:text-gray-400">
					<thead class="text-xs text-gray-700 uppercase dark:text-gray-400">
						<tr>
							<th scope="col" class="py-3 px-6">#</th>
							<th scope="col" class="py-3 px-6 bg-gray-50 dark:bg-gray-800">
								{{ $translate("Ticket title") }}
							</th>
							<th scope="col" class="py-3 px-6">{{ $translate("Creation date") }}</th>
							<th scope="col" class="py-3 px-6 bg-gray-50 dark:bg-gray-800">
								{{ $translate("Last update date") }}
							</th>
							<th scope="col" class="py-3 px-6">{{ $translate("Status") }}</th>
						</tr>
					</thead>
					<tbody class="text-center">
						<template v-if="tickets?.length">
							<tr v-for="(ticket, i) in tickets" class="border-b border-gray-200 dark:border-gray-700">
								<td class="py-4 px-6">{{ i + 1 }}</td>
								<td class="py-4 px-6 bg-gray-50 dark:bg-gray-800">
									<nuxt-link :to="`/members/dashboard/support/${ticket.id}`" class="text-sju-50">
										{{ ticket.title }}
									</nuxt-link>
								</td>
								<td class="py-4 px-6">{{ formattedDate(ticket.created_at) }}</td>
								<td class="py-4 px-6 bg-gray-50 dark:bg-gray-80">
									{{ formattedDate(ticket.updated_at) }}
								</td>
								<td class="py-4 px-6">
									{{ ticketStatus[ticket.status].label }}
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
			<div class="text-end">
				<nuxt-link to="/members/dashboard/support/create" class="btn-primary inline-block text-sm"
					>+ {{ $translate("New ticket") }}</nuxt-link
				>
			</div>
		</div>
	</div>
</template>
