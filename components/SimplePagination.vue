<script setup>
	const {
		pagination: { last_page, current_page },
	} = defineProps(["pagination"])

	const start = ref(null)
	const end = ref(null)
	const currentPage = ref(parseInt(current_page))

	if (last_page < 11) {
		start.value = 0
		end.value = last_page
	} else if (currentPage.value <= 6) {
		// Show first 11 last_page
		start.value = 0
		end.value = 11
	} else if (currentPage.value > 6 && currentPage.value < last_page - 6) {
		start.value = currentPage.value - 5
		end.value = currentPage.value + 5
	} else if (currentPage.value > 6 && currentPage.value >= last_page - 6) {
		start.value = last_page - 11
		end.value = last_page
	}
</script>

<template>
	<!-- Pagination -->
	<div class="bg-sju-500 py-5 p-7 rounded-sm flex justify-end">
		<ul>
			<li
				v-for="page in end - start"
				:class="{ active: currentPage == start + page }"
				class="inline-block bg-white text-sju-50 py-1 px-2.5 mx-0.5 border transition hover:bg-sju-500 [&.active]:bg-sju-50 [&.active]:text-white cursor-pointer"
				@click="currentPage !== start + page ? $emit('paginate', start + page) : null"
			>
				{{ start + page }}
			</li>
		</ul>
	</div>
	<!-- Pagination -->
</template>
