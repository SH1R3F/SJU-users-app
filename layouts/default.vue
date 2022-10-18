<template>
	<div>
		<client-only>
			<layout-loading v-if="loading" />
		</client-only>
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
		font-family: "Droid Arabic Kufi", sans-serif;
	}
</style>

<script setup>
	import { useI18n } from "vue-i18n"
	import { useHomeStore } from "~/stores/homeStore"
	const loading = ref(true)

	if (process.client) {
		loading.value = false
	}

	const locale = useCookie("locale").value || "ar"
	const darkmode = useHomeStore().darkMode

	useHead({
		title: useI18n().t("Saudi journalists association"),
		titleTemplate: `%s - ${useI18n().t("Saudi journalists association")}`,
		meta: [
			{
				name: "keywords",
				content: useI18n().t("Saudi journalists association"),
			},
			{
				name: "description",
				content: useI18n().t("Saudi journalists association"),
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
