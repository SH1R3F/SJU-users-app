<template>
	<!-- Page Header -->
	<div class="bg-sju-50 text-white py-8">
		<div class="container">
			<nav aria-label="breadcrumb">
				<ul class="breadcrumb py-3 px-4 mb-4">
					<li class="inline-block pl-2 rtl:pl-0 rtl:pr-2 before:content-['/'] first:before:content-[''] before:pr-2 rtl:before:pr-0 rtl:before:pl-2" v-for="page in breadcrumb">
						<nuxt-link :to="page.link">{{ page.title }}</nuxt-link>
					</li>
				</ul>
			</nav>
			<h3>{{ title }}</h3>
			<slot />
		</div>
	</div>
	<!-- Page Header -->
</template>

<script setup>
	const { title, breadcrumb } = defineProps({
		title: String,
		breadcrumb: Array,
	})
</script>
