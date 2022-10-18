<template>
	<!-- Mini bar -->
	<div class="bg-sju-50 py-1">
		<div class="container">
			<ul class="flex justify-end items-center text-white text-sm">
				<li class="mx-1 hover:text-sju-100 transition">
					<a href="#">
						<gg-facebook />
					</a>
				</li>
				<li class="mx-1 hover:text-sju-100 transition">
					<a href="https://twitter.com/sju_ksa" target="_blank">
						<mdi-twitter />
					</a>
				</li>
				<li class="mx-1 hover:text-sju-100 transition">
					<a href="#">
						<mdi-linkedin />
					</a>
				</li>
				<li class="mx-2">
					<span class="flex items-center cursor-pointer" data-dropdown-toggle="dropdown" id="dropperdown">
						{{ $i18n.locale === "ar" ? "العربية" : "English" }}
						<svg class="mx-2 w-4 h-4" aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
						</svg>
					</span>
					<ul id="dropdown" class="hidden z-10 text-black w-44 bg-white rounded-md shadow">
						<li
							@click="changeLocale('ar')"
							class="cursor-pointer py-1 px-3 hover:bg-sju-100 hover:text-white [&.active]:bg-sju-100 [&.active]:text-white"
							:class="{ active: $i18n.locale === 'ar' }"
						>
							<a>العربية</a>
						</li>
						<li
							@click="changeLocale('en')"
							class="cursor-pointer py-1 px-3 hover:bg-sju-100 hover:text-white [&.active]:bg-sju-100 [&.active]:text-white"
							:class="{ active: $i18n.locale === 'en' }"
						>
							<a>English</a>
						</li>
					</ul>
				</li>
			</ul>
		</div>
	</div>
	<!-- Mini bar -->
</template>

<script setup>
	import GgFacebook from "~icons/gg/facebook"
	import MdiTwitter from "~icons/mdi/twitter"
	import MdiLinkedin from "~icons/mdi/linkedin"

	const changeLocale = (locale) => {
		// Change locale cookie & reload
		const localeCookie = useCookie("locale")
		localeCookie.value = locale
		window.location.reload(true)
	}
</script>
