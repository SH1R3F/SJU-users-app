<script setup>
	import { storeToRefs } from "pinia"
	import { useAuthStore } from "~~/stores/authStore"

	const authStore = useAuthStore()
	const { userData } = storeToRefs(authStore)

	const { active } = defineProps(["active"])
</script>

<template>
	<!-- Nav Pills -->
	<ul class="w-full border-b mb-1 shadow-sm">
		<nuxt-link
			to="/members/dashboard/profile"
			class="cursor-pointer inline-block text-sju-50 text-sm px-4 py-3 hover:bg-gray-200 hover:text-sju-50 [&.active]:text-white [&.active]:bg-sju-50 transition dark:text-white dark:hover:bg-sjud-300"
			:class="{ active: active === 'info' }"
		>
			{{ $translate("Info") }}
		</nuxt-link>
		<nuxt-link
			to="/members/dashboard/profile/experiences"
			class="cursor-pointer inline-block text-sju-50 text-sm px-4 py-3 hover:bg-gray-200 hover:text-sju-50 [&.active]:text-white [&.active]:bg-sju-50 transition dark:text-white dark:hover:bg-sjud-300"
			:class="{ active: active === 'experiences' }"
		>
			{{ $translate("Exp. & fields") }}
		</nuxt-link>
		<nuxt-link
			to="/members/dashboard/profile/picture"
			class="cursor-pointer inline-block text-sju-50 text-sm px-4 py-3 hover:bg-gray-200 hover:text-sju-50 [&.active]:text-white [&.active]:bg-sju-50 transition dark:text-white dark:hover:bg-sjud-300"
			:class="{ active: active === 'picture' }"
		>
			{{ $translate("Profile picture") }}
		</nuxt-link>
		<nuxt-link
			to="/members/dashboard/profile/password"
			class="cursor-pointer inline-block text-sju-50 text-sm px-4 py-3 hover:bg-gray-200 hover:text-sju-50 [&.active]:text-white [&.active]:bg-sju-50 transition dark:text-white dark:hover:bg-sjud-300"
			:class="{ active: active === 'password' }"
		>
			{{ $translate("Password") }}
		</nuxt-link>
		<nuxt-link
			to="/members/dashboard/profile/identification"
			class="cursor-pointer inline-block text-sju-50 text-sm px-4 py-3 hover:bg-gray-200 hover:text-sju-50 [&.active]:text-white [&.active]:bg-sju-50 transition dark:text-white dark:hover:bg-sjud-300"
			:class="{ active: active === 'identification' }"
		>
			{{ $translate("ID image") }}
		</nuxt-link>
		<nuxt-link
			v-if="userData.subscription?.type === 3"
			to="/members/dashboard/profile/statement"
			class="cursor-pointer inline-block text-sju-50 text-sm px-4 py-3 hover:bg-gray-200 hover:text-sju-50 [&.active]:text-white [&.active]:bg-sju-50 transition dark:text-white dark:hover:bg-sjud-300"
			:class="{ active: active === 'statement' }"
		>
			{{ $translate("Job letter") }}
		</nuxt-link>
		<nuxt-link
			v-if="userData.newspaper_type === 2"
			to="/members/dashboard/profile/license"
			class="cursor-pointer inline-block text-sju-50 text-sm px-4 py-3 hover:bg-gray-200 hover:text-sju-50 [&.active]:text-white [&.active]:bg-sju-50 transition dark:text-white dark:hover:bg-sjud-300"
			:class="{ active: active === 'license' }"
		>
			{{ $translate("Newspaper license") }}
		</nuxt-link>
	</ul>
	<!-- Nav Pills -->
</template>
