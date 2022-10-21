<script setup>
	import { storeToRefs } from "pinia"
	import { usePostStore } from "~~/stores/postStore"

	const { dblocalize } = useLocalization()
	const route = useRoute()
	const postStore = usePostStore()
	const { post, relatedPosts } = storeToRefs(postStore)

	// Fetch Post
	await postStore.fetchPost(route.params.id)

	// Page meta
	const { $i18n } = useNuxtApp()
	const meta = ref({
		title: dblocalize(post.value, "title"),
		breadcrumb: [
			{
				link: "/",
				title: $i18n.translate("Home"),
			},
			{
				link: "/posts",
				title: $i18n.translate("Posts list"),
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
		<page-header :title="meta.title" :breadcrumb="meta.breadcrumb" :date="post.postDate" />

		<div class="page-content py-11 dark:bg-sjud-100">
			<div class="container">
				<div class="flex flex-col md:flex-row gap-6">
					<div class="md:w-8/12 text-center text-gray-600">
						<template v-if="post.photos">
							<img v-for="photo in post.photos" :src="photo" :alt="dblocalize(post, 'title')" class="my-1 max-w-full mx-auto" />
						</template>
						<div class="text-start border-b py-5 content" v-html="dblocalize(post, 'content')"></div>
					</div>
					<div class="md:w-4/12">
						<h3 class="mb-3 text-sju-50">{{ $translate("Related posts") }}</h3>
						<post-preview v-for="post in postStore.relatedPosts" :post="post" class="mb-5" />
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
