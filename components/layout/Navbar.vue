<template>
	<!-- Navbar -->
	<nav class="bg-gradient-to-r from-sju-50 to-sju-400 sm:px-4 py-1">
		<div class="container flex flex-wrap justify-end items-center mx-auto">
			<button
				data-collapse-toggle="navbar-default"
				type="button"
				class="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg lg:hidden"
				aria-controls="navbar-default"
				aria-expanded="false"
			>
				<span class="sr-only">Open main menu</span>
				<svg class="w-6 h-6 text-white" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
					<path
						fill-rule="evenodd"
						d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
						clip-rule="evenodd"
					></path>
				</svg>
			</button>
			<div class="hidden w-full lg:block" id="navbar-default">
				<ul class="flex flex-col justify-between overflow-hidden p-4 lg:flex-row lg:space-x-8 rtl:space-x-reverse lg:mt-0 lg:text-sm lg:font-medium lg:border-0">
					<li v-for="menu in menus" :key="menu.id">
						<nuxt-link :to="menu.link" class="block py-2 pr-4 pl-3 text-white lg:p-0 hover:text-sju-400" :target="menu.open_in_same_page ? '_self' : '_blank'">
							{{ dblocalize(menu, "title") }}
						</nuxt-link>
					</li>
				</ul>
			</div>
		</div>
	</nav>
	<!-- Navbar -->
</template>

<script setup>
	const { useMyFetch } = useApiFetch()
	const { data } = await useMyFetch("/menus", {
		key: "menus",
	})
	if (!data.value) {
		throw createError({ statusCode: 404, statusMessage: "Post Not Found" })
	}
	const { menus } = data.value

	const { dblocalize } = useLocalization()
</script>
