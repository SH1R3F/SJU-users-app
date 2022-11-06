<script setup>
	const { event } = defineProps(["event"])
	const { dblocalize } = useLocalization()
</script>

<template>
	<div class="flex mb-4">
		<div
			class="bg-sju-50 text-white text-center flex-grow-0 py-5 px-10 w-28 flex justify-center items-center flex-col"
		>
			<span class="font-bold text-4xl block">{{ new Date(event.date).getDate() }}</span>
			{{ $translate(new Date(event.date).toLocaleString("default", { month: "long" })) }}
		</div>
		<h6 class="text-sju-50 bg-sju-500 flex-grow p-4 flex items-center dark:bg-sjud-100">
			<!-- To be worked on upon events register page creation -->
			<nuxt-link :to="`/events/${event.id}/register`">{{ dblocalize(event, "name") }}</nuxt-link>
		</h6>
	</div>
</template>
