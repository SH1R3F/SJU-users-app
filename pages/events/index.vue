<script setup>
	import { storeToRefs } from "pinia"
	import { useEventStore } from "~/stores/eventStore"
	const { dblocalize } = useLocalization()
	const router = useRouter()
	const route = useRoute()

	const eventStore = useEventStore()
	const { events, getType, getPagination } = storeToRefs(eventStore)
	// Fetch Events
	await eventStore.fetchEvents()

	const setType = (type) => {
		router.push({
			path: route.fullPath,
			query: {
				type,
				page: 1,
			},
		})
	}

	const setPage = (page) => {
		router.push({
			path: route.fullPath,
			query: {
				page,
				type: route.query.type,
			},
		})
	}

	watch(
		() => route.query,
		async () => {
			eventStore.type = route.query.type
			eventStore.pagination.current_page = route.query.page
			await eventStore.fetchEvents()
		}
	)

	// Page meta
	const { $i18n } = useNuxtApp()
	const meta = ref({
		title: $i18n.translate("Events list"),
		breadcrumb: [
			{
				link: "/",
				title: $i18n.translate("Home"),
			},
		],
	})
	useHead({
		title: meta.value.title,
	})

	definePageMeta({
		key: (route) => route.fullPath,
	})
</script>

<template>
	<div key="something">
		<page-header :title="meta.title" :breadcrumb="meta.breadcrumb" />

		<div class="page-content py-11 dark:bg-sjud-100">
			<div class="container">
				<!-- Nav Pills -->
				<ul class="w-full border-b">
					<li
						class="cursor-pointer inline-block text-sju-50 text-sm px-5 py-3 hover:bg-gray-200 hover:text-sju-50 [&.active]:text-white [&.active]:bg-sju-50 transition dark:text-white dark:hover:bg-sjud-300"
						@click="setType('upcoming')"
						:class="{ active: getType() === 'upcoming' }"
					>
						{{ $translate("Upcoming events") }}
					</li>

					<li
						class="cursor-pointer inline-block text-sju-50 text-sm px-5 py-3 hover:bg-gray-200 hover:text-sju-50 [&.active]:text-white [&.active]:bg-sju-50 transition dark:text-white dark:hover:bg-sjud-300"
						@click="setType('done')"
						:class="{ active: getType() === 'done' }"
					>
						{{ $translate("Events done") }}
					</li>
				</ul>
				<!-- Nav Pills -->

				<div class="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 my-10" v-if="events?.length">
					<!-- Posts -->
					<event-preview v-for="event in events" :event="event" />
					<!-- Posts -->
				</div>

				<div class="my-5 p-5 bg-sju-50 rounded-sm text-white" v-else>
					{{ $translate("No events found") }}
				</div>

				<simple-pagination :pagination="getPagination()" @paginate="setPage" v-if="getPagination().last_page" />
			</div>
		</div>
	</div>
</template>
