<template>
	<div>
		<layout-loading v-show="loading" />
		<form-loading v-show="useHomeStore().loading" />
		<NuxtLoadingIndicator />
		<layout-minibar />
		<layout-header />
		<layout-navbar />
		<slot />
		<layout-footer />
	</div>
</template>

<style>
	body {
		font-family: "Droid Arabic Kufi", sans-serif !important;
	}
</style>

<script setup>
	import { useHomeStore } from "~/stores/homeStore"
	import { useAuthStore } from "~/stores/authStore"

	const { $i18n } = useNuxtApp()

	const loading = ref(true)
	if (process.client) {
		loading.value = false
	}

	const route = useRoute()
	const toast = useToast()
	if (route.query?.verified == 1) {
		toast.success($i18n.translate("Email has been verified successfully"))
	}

	// Page Meta
	const locale = $i18n.locale
	const darkmode = useHomeStore().darkMode
	useHead({
		titleTemplate: (title) =>
			title
				? `${title} - ${$i18n.translate("Saudi journalists association")}`
				: $i18n.translate("Saudi journalists association"),
		meta: [
			{
				name: "keywords",
				content: $i18n.translate("Saudi journalists association"),
			},
			{
				name: "description",
				content: $i18n.translate("Saudi journalists association"),
			},
		],
		htmlAttrs: {
			dir: locale == "ar" ? "rtl" : "ltr",
			lang: locale,
		},
		bodyAttrs: {
			class: `${locale == "ar" ? "rtl" : "ltr"} ${darkmode ? "dark" : ""} [&.dark]:bg-sjud-500`,
		},
		meta: [
			{
				name: "author",
				content: "sju.org.sa",
			},
		],
		link: [
			{
				rel: "shortcut icon",
				href: "/icons/favicon.ico",
				type: "image/x-icon",
			},
			{
				rel: "apple-touch-icon",
				href: "/icons/favicon.ico",
			},
		],
	})
</script>
