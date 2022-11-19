<script setup>
	import { storeToRefs } from "pinia"
	import { useAuthStore } from "~~/stores/authStore"
	import { useMemberStore } from "~~/stores/memberStore"

	const toast = useToast()
	const authStore = useAuthStore()
	const { userData } = storeToRefs(authStore)

	const hasExperiences = computed(() => {
		return (
			userData.value.experiences_and_fields?.fields?.length &&
			userData.value.experiences_and_fields?.experiences?.length &&
			userData.value.experiences_and_fields?.languages?.length
		)
	})

	const progress = ref(50)
	progress.value += userData.value.avatar ? 10 : 0
	progress.value += userData.value.national_image ? 10 : 0
	progress.value += userData.value.employer_letter ? 10 : 0
	progress.value += userData.value.newspaper_license ? 10 : 0
	progress.value += hasExperiences.value ? 10 : 0

	const { $i18n } = useNuxtApp()
	// Page Meta
	const title = $i18n.translate("Complete profile info")
	useHead({
		title,
	})

	definePageMeta({
		middleware: "member",
	})
</script>

<template>
	<div>
		<div class="form">
			<div class="form-title font-semibold">{{ $translate("Complete profile info") }}</div>
			<p class="text-gray-500 mb-7">
				{{ $translate("To apply for membership, you must complete the required information") }}
			</p>

			<h5 class="mb-3">{{ $translate("Completion percentage") }}</h5>
			<div class="w-full bg-gray-200 rounded-full dark:bg-gray-700">
				<div
					class="text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full"
					:style="`width: ${progress}%`"
					:class="{
						'bg-sju-50': progress === 100,
						'bg-green-300': progress < 100,
					}"
				>
					{{ progress }}%
				</div>
			</div>

			<table class="w-full text-sm text-gray-500 dark:text-gray-400">
				<thead class="text-xs text-gray-700 uppercase dark:text-gray-400">
					<tr>
						<th scope="col" class="py-3 px-6">{{ $translate("Requirement") }}</th>
						<th scope="col" class="py-3 px-6"></th>
					</tr>
				</thead>
				<tbody class="text-center">
					<tr class="border-b border-gray-200 dark:border-gray-700">
						<td class="py-4 px-6">
							<span
								:class="{
									'line-through text-sju-50': userData.avatar,
								}"
							>
								{{ $translate("Profile picture") }}
							</span>
						</td>
						<td class="py-4 px-6">
							<nuxt-link
								to="/members/dashboard/profile/picture"
								class="btn-primary"
								v-if="!userData.avatar"
							>
								{{ $translate("Upload") }}
							</nuxt-link>
						</td>
					</tr>
					<tr class="border-b border-gray-200 dark:border-gray-700">
						<td class="py-4 px-6">
							<span
								:class="{
									'line-through text-sju-50': userData.national_image,
								}"
							>
								{{ $translate("ID image") }}
							</span>
						</td>
						<td class="py-4 px-6">
							<nuxt-link
								to="/members/dashboard/profile/identification"
								class="btn-primary"
								v-if="!userData.national_image"
							>
								{{ $translate("Upload") }}
							</nuxt-link>
						</td>
					</tr>
					<tr class="border-b border-gray-200 dark:border-gray-700">
						<td class="py-4 px-6">
							<span
								:class="{
									'line-through text-sju-50': userData.employer_letter,
								}"
							>
								{{ $translate("Job letter") }}
							</span>
						</td>
						<td class="py-4 px-6">
							<nuxt-link
								to="/members/dashboard/profile/statement"
								class="btn-primary"
								v-if="!userData.employer_letter"
							>
								{{ $translate("Upload") }}
							</nuxt-link>
						</td>
					</tr>
					<tr class="border-b border-gray-200 dark:border-gray-700">
						<td class="py-4 px-6">
							<span
								:class="{
									'line-through text-sju-50': userData.newspaper_license,
								}"
							>
								{{ $translate("Newspaper license") }}
							</span>
						</td>
						<td class="py-4 px-6">
							<nuxt-link
								to="/members/dashboard/profile/license"
								class="btn-primary"
								v-if="!userData.newspaper_license"
							>
								{{ $translate("Upload") }}
							</nuxt-link>
						</td>
					</tr>
					<tr class="border-b border-gray-200 dark:border-gray-700">
						<td class="py-4 px-6">
							<span
								:class="{
									'line-through text-sju-50': hasExperiences,
								}"
							>
								{{ $translate("Exp. & fields") }}
							</span>
						</td>
						<td class="py-4 px-6">
							<nuxt-link
								to="/members/dashboard/profile/experiences"
								class="btn-primary"
								v-if="!hasExperiences"
							>
								{{ $translate("Upload") }}
							</nuxt-link>
						</td>
					</tr>
				</tbody>
			</table>
		</div>
	</div>
</template>
