<script setup>
	import { storeToRefs } from "pinia"
	import { usePageStore } from "~/stores/pageStore"

	const { dblocalize } = useLocalization()
	const pageStore = usePageStore()

	// Fetch page
	const route = useRoute()
	await pageStore.fetchPage(route.params.slug)
	const { page } = storeToRefs(pageStore)

	// Page meta
	const { $i18n } = useNuxtApp()
	const meta = ref({
		title: dblocalize(page.value, "title"),
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
		validate: async (route) => {
			return false
			// return /^\d+$/.test(route.params.id)
		},
	})
</script>

<template>
	<div>
		<page-header :title="meta.title" :breadcrumb="meta.breadcrumb" />

		<div class="page-content py-11 dark:bg-sjud-100">
			<div class="container">
				<div class="text-start border-b py-5 content" v-html="dblocalize(page, 'content')"></div>
			</div>
		</div>
	</div>
</template>
