<script setup>
	import { storeToRefs } from "pinia"
	import { useAuthStore } from "~~/stores/authStore"
	const authStore = useAuthStore()
	const { userData } = storeToRefs(authStore)

	const { dblocalize } = useLocalization()
</script>

<template>
	<div>
		<div class="dashboard my-16">
			<div class="container">
				<div class="flex gap-5 flex-col sm:flex-row">
					<div class="w-full sm:w-3/12">
						<img
							:src="userData?.avatar"
							class="rounded-full mx-auto mb-5 h-40 w-40 lg:h-52 lg:w-52 object-cover object-top shadow-lg"
						/>
						<h6 class="text-sju-50 text-center font-bold">{{ dblocalize(userData, "fullName") }}</h6>
						<ul class="mt-4">
							<nuxt-link
								to="/volunteers/dashboard"
								class="block p-2 hover:bg-sju-500 transition-all [&.router-link-exact-active]:text-sju-50 [&.router-link-exact-active]:font-bold [&.router-link-exact-active]:bg-sju-500 dark:[&.router-link-exact-active]:bg-sjud-200 dark:hover:bg-sjud-200 dark:text-sjud-400"
							>
								{{ $translate("Events") }}
							</nuxt-link>
							<nuxt-link
								to="/volunteers/dashboard/profile"
								class="block p-2 hover:bg-sju-500 transition-all [&.router-link-exact-active]:text-sju-50 [&.router-link-exact-active]:font-bold [&.router-link-exact-active]:bg-sju-500 dark:[&.router-link-exact-active]:bg-sjud-200 dark:hover:bg-sjud-200 dark:text-sjud-400"
							>
								{{ $translate("Profile") }}
							</nuxt-link>
							<nuxt-link
								class="block p-2 hover:bg-sju-500 transition-all [&.router-link-exact-active]:text-sju-50 [&.router-link-exact-active]:font-bold [&.router-link-exact-active]:bg-sju-500 dark:[&.router-link-exact-active]:bg-sjud-200 dark:hover:bg-sjud-200 dark:text-sjud-400"
							>
								{{ $translate("Technical support") }}
							</nuxt-link>
							<a
								class="cursor-pointer block p-2 hover:bg-sju-500 transition-all [&.router-link-exact-active]:text-sju-50 [&.router-link-exact-active]:font-bold [&.router-link-exact-active]:bg-sju-500 dark:[&.router-link-exact-active]:bg-sjud-200 dark:hover:bg-sjud-200 dark:text-sjud-400"
								@click.prevent="authStore.logout()"
							>
								{{ $translate("logout") }}
							</a>
						</ul>
					</div>
					<div class="w-full sm:w-9/12">
						<NuxtChild />
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
