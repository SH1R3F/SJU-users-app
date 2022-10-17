<template>
	<nuxt-layout>
		<template v-if="statusCode == 404">
			<section class="flex items-center h-full p-16 dark:bg-gray-900 dark:text-gray-100 py-16">
				<div class="container flex flex-col items-center justify-center px-5 mx-auto my-8">
					<div class="max-w-md text-center">
						<h2 class="mb-8 font-extrabold text-9xl dark:text-gray-600">
							<span class="sr-only">{{ $t("Error") }}</span
							>404
						</h2>
						<p class="text-2xl font-semibold md:text-3xl">{{ $t("Sorry, we couldn't find this page.") }}</p>
						<p class="mt-4 mb-8 dark:text-gray-400">{{ $t("But dont worry, you can find plenty of other things on our homepage.") }}</p>
						<nuxt-link :to="{ name: 'index' }" class="btn-primary px-8 py-3 font-semibold rounded dark:bg-violet-400 dark:text-gray-900">{{ $t("Back to homepage") }}</nuxt-link>
					</div>
				</div>
			</section>
		</template>
		<template v-else>
			<h1>Error with {{ statusCode }}</h1>
		</template>
	</nuxt-layout>
</template>

<script setup>
	const props = defineProps({
		error: Object,
	})

	const { statusCode } = props.error
</script>
