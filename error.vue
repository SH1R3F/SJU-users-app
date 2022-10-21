<template>
	<nuxt-layout>
		<template v-if="statusCode == 404">
			<section class="flex items-center h-full p-16 dark:bg-gray-900 dark:text-gray-100 py-16">
				<div class="container flex flex-col items-center justify-center px-5 mx-auto my-8">
					<div class="max-w-md text-center">
						<h2 class="mb-8 font-extrabold text-9xl dark:text-gray-600">
							<span class="sr-only">{{ $translate("Error") }}</span
							>404
						</h2>
						<p class="text-2xl font-semibold md:text-3xl">{{ $translate("Sorry, we couldn't find this page.") }}</p>
						<p class="mt-4 mb-8 dark:text-gray-400">{{ $translate("But dont worry, you can find plenty of other things on our homepage.") }}</p>
						<button @click="clearError({ redirect: '/' })" class="btn-primary px-8 py-3 font-semibold rounded">{{ $translate("Back to homepage") }}</button>
					</div>
				</div>
			</section>
		</template>
		<template v-else>
			<div class="container py-20">
				<h1>Error with {{ statusCode }}</h1>
			</div>
		</template>
	</nuxt-layout>
</template>

<script setup>
	const { error } = defineProps({
		error: Object,
	})

	const { statusCode } = error

	setPageLayout("default")
</script>
