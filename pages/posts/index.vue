<template>
	<div>
		<!-- Page Header -->
		<div class="bg-sju-50 text-white py-8">
			<div class="container">
				<nav aria-label="breadcrumb">
					<ul class="breadcrumb py-3 px-4 mb-4">
						<li class="breadcrumb-item"><a href="https://sju.org.sa/">الرئيسية</a></li>
					</ul>
				</nav>
				<h3>قائمة الأخبار</h3>
			</div>
		</div>
		<!-- Page Header -->

		<div class="page-content py-11 dark:bg-sjud-100">
			<div class="container">
				<!-- Nav Pills -->
				<ul class="w-full border-b">
					<li
						class="cursor-pointer inline-block text-sju-50 text-sm px-5 py-3 hover:bg-gray-200 hover:text-sju-50 [&.active]:text-white [&.active]:bg-sju-50 transition dark:text-white dark:hover:bg-sjud-300"
						:class="{ active: postStore.payload.category == 'all' }"
					>
						{{ $translate("All") }}
					</li>
					<li
						v-for="category in postStore.categories"
						class="cursor-pointer inline-block text-sju-50 text-sm px-5 py-3 hover:bg-gray-200 hover:text-sju-50 [&.active]:text-white [&.active]:bg-sju-50 transition dark:text-white dark:hover:bg-sjud-300"
						:class="{ active: postStore.payload.category == category.id }"
					>
						{{ dblocalize(category, "title") }}
					</li>
				</ul>
				<!-- Nav Pills -->

				<!-- Posts -->
				<div class="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 my-10">
					<div v-for="post in postStore.posts">
						<post-preview :post="post" />
					</div>
					<!-- Posts -->
				</div>

				<!-- Pagination -->
				<div class="bg-sju-500 py-5 p-7 rounded-sm flex justify-end">
					<ul>
						<li
							v-for="page in postStore.pagination.end - postStore.pagination.start"
							:class="{ active: postStore.payload.page + 1 == postStore.pagination.start + page }"
							class="inline-block bg-white text-sju-50 py-1 px-2.5 mx-0.5 border transition hover:bg-sju-500 [&.active]:bg-sju-50 [&.active]:text-white cursor-pointer"
							@click="postStore.paginateTo(postStore.pagination.start + page)"
						>
							<!-- i stopped here -->
							{{ postStore.pagination.start + page }}
						</li>
					</ul>
				</div>
				<!-- Pagination -->
			</div>
		</div>
	</div>
</template>

<script setup>
	import { usePostStore } from "~~/stores/postStore"

	const { dblocalize } = useLocalization()

	const postStore = usePostStore()
	postStore.fetchCategories()
	postStore.fetchPosts()
</script>
