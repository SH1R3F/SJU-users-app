<script setup>
	import { storeToRefs } from "pinia"
	import { usePostStore } from "~/stores/postStore"
	const { dblocalize } = useLocalization()
	const router = useRouter()
	const route = useRoute()

	const postStore = usePostStore()
	const { posts, categories, getCategory, getPagination } = storeToRefs(postStore)

	// Fetch Categories
	await postStore.fetchCategories()
	// Fetch Posts
	await postStore.fetchPosts()

	const setCategory = (id) => {
		router.push({
			path: route.fullPath,
			query: {
				category: id,
				page: 1,
			},
		})
	}

	const setPage = (page) => {
		router.push({
			path: route.fullPath,
			query: {
				page,
				category: route.query.category,
			},
		})
	}

	watch(
		() => route.query,
		async () => {
			postStore.category = route.query.category
			postStore.pagination.current_page = route.query.page
			await postStore.fetchPosts()
		}
	)

	// Page meta
	const { $i18n } = useNuxtApp()
	const meta = ref({
		title: $i18n.translate("Posts list"),
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
	<div>
		<page-header :title="meta.title" :breadcrumb="meta.breadcrumb" />

		<div class="page-content py-11 dark:bg-sjud-100">
			<div class="container">
				<!-- Nav Pills -->
				<ul class="w-full border-b">
					<li
						class="cursor-pointer inline-block text-sju-50 text-sm px-5 py-3 hover:bg-gray-200 hover:text-sju-50 [&.active]:text-white [&.active]:bg-sju-50 transition dark:text-white dark:hover:bg-sjud-300"
						:class="{ active: getCategory() == 'all' }"
						@click="setCategory('all')"
					>
						{{ $translate("All") }}
					</li>
					<li
						v-for="category in categories"
						class="cursor-pointer inline-block text-sju-50 text-sm px-5 py-3 hover:bg-gray-200 hover:text-sju-50 [&.active]:text-white [&.active]:bg-sju-50 transition dark:text-white dark:hover:bg-sjud-300"
						:class="{ active: getCategory() == category.id }"
						@click="setCategory(category.id)"
					>
						{{ dblocalize(category, "title") }}
					</li>
				</ul>
				<!-- Nav Pills -->

				<!-- Posts -->
				<div class="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 my-10" v-if="posts">
					<div v-for="post in posts">
						<post-preview :post="post" />
					</div>
					<!-- Posts -->
				</div>

				<div class="my-5 p-5 bg-sju-50 rounded-sm text-white" v-else>
					{{ $translate("No posts found") }}
				</div>

				<simple-pagination :pagination="getPagination()" @paginate="setPage" v-if="getPagination().last_page" />
			</div>
		</div>
	</div>
</template>
