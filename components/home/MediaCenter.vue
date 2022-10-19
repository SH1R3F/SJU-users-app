<template>
	<section class="py-20 bg-sju-500 dark:bg-sjud-100">
		<!-- Container -->
		<div class="container">
			<div class="flex justify-between items-center">
				<h2 class="text-sju-50 text-3xl py-4 mb-2">{{ $translate("Media center") }}</h2>
				<a href="#" class="text-sju-50 text-sm">{{ $translate("More") }}</a>
			</div>

			<!-- Posts -->
			<div class="grid grid-cols-1 md:grid-cols-3 mt-3 gap-6 md:gap-8">
				<div v-for="post in posts">
					<post-preview :post="post" />
				</div>
			</div>
			<!-- Posts -->
		</div>
		<!-- Container -->
	</section>
</template>

<script setup>
	const props = defineProps(["posts"])
</script>
