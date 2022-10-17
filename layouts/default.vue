<template>
	<div>
		<layout-loading v-if="loading" />
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

<script>
	import { useI18n } from "vue-i18n"

	export default {
		data() {
			return {
				loading: true,
			}
		},
		mounted() {
			this.loading = false
		},
		setup() {
			const locale = useCookie("locale").value || "ar"
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
					class: locale == "ar" ? "rtl" : "ltr",
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
		},
	}
</script>
