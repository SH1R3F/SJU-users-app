<template>
	<section class="py-20 bg-sju-500">
		<div class="container">
			<h2 class="text-sju-50 text-3xl py-4 mb-2">{{ $t("Studio") }}</h2>

			<!-- Nav Pills -->
			<ul class="w-full flex">
				<li
					@click.prevnet="filter = 'all'"
					:class="{ active: filter == 'all' }"
					class="cursor-pointer flex-1 text-center text-gray-500 text-sm border-b py-4 border-l hover:bg-gray-200 hover:text-sju-50 [&.active]:text-sju-50 [&.active]:bg-gray-200 transition"
				>
					<a>{{ $t("All") }}</a>
				</li>
				<li
					@click.prevnet="filter = 'photo'"
					:class="{ active: filter == 'photo' }"
					class="cursor-pointer flex-1 text-center text-gray-500 text-sm border-b py-4 border-l hover:bg-gray-200 hover:text-sju-50 [&.active]:text-sju-50 [&.active]:bg-gray-200 transition"
				>
					<a>{{ $t("Photos") }}</a>
				</li>
				<li
					@click.prevnet="filter = 'video'"
					:class="{ active: filter == 'video' }"
					class="cursor-pointer flex-1 text-center text-gray-500 text-sm border-b py-4 hover:bg-gray-200 hover:text-sju-50 [&.active]:text-sju-50 [&.active]:bg-gray-200 transition"
				>
					<a>{{ $t("Videos") }}</a>
				</li>
			</ul>
			<!-- Nav Pills -->

			<!-- Posts -->
			<div class="grid grid-cols-1 md:grid-cols-3 mt-8 gap-6 md:gap-8">
				<div v-for="item in filteredItems">
					<!-- Single post -->
					<div
						v-if="item.type == 'photo'"
						class="h-64 w-full flex flex-col justify-start overflow-hidden"
						:style="`background: linear-gradient(to bottom, transparent, rgba(0, 0, 0, 0.7)), url('${item.file ? item.file : item.link}'); background-size: 100% 100%;`"
					>
						<div>
							<a class="text-white bg-sju-50 text-xs py-2 px-3"> {{ $t(item.type) }} </a>
						</div>
					</div>
					<div v-else>
						<iframe
							class="w-full"
							width="352"
							height="260"
							:src="item.file ? item.file : item.link"
							frameborder="0"
							allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
							allowfullscreen
						></iframe>
					</div>
					<!-- Single post -->
				</div>
			</div>
			<!-- Posts -->
		</div>
	</section>
</template>

<script setup>
	const filter = ref("all")
	const { items } = defineProps(["items"])

	const filteredItems = computed(() => {
		return items.filter((item) => {
			if (filter.value == "all") return true

			return item.type == filter.value
		})
	})
</script>
