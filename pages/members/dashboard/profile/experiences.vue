<script setup>
	import { storeToRefs } from "pinia"
	import { useAuthStore } from "~~/stores/authStore"
	import { useMemberStore } from "~~/stores/memberStore"

	const toast = useToast()
	const memberStore = useMemberStore()
	const authStore = useAuthStore()
	const { userData } = storeToRefs(authStore)
	const { levels } = useSiteConfig()

	const updateExperiences = async (body, node) => {
		const { error } = await memberStore.updateExperiences(experiences.value, fields.value, languages.value)
		// On errors
		if (error?.value?.response?.status === 400) {
			node.setErrors(error.value?.data)
		} else if (error?.value?.response?.status === 422) {
			toast.error(error.value?.data?.message)
		}
	}

	const experiences = ref(userData.value.experiences_and_fields.experiences)
	const addExperience = () => {
		if (
			experiences.value.length === 0 ||
			(experiences.value[experiences.value.length - 1]?.name != "" &&
				experiences.value[experiences.value.length - 1]?.years != null)
		) {
			experiences.value.push({
				name: "",
				years: null,
			})
		}
	}

	const removeExperience = (i) => {
		if (experiences.value.length > 1) {
			experiences.value.splice(i, 1)
		}
	}

	const fields = ref(userData.value.experiences_and_fields.fields)
	const addField = () => {
		if (fields.value[fields.value.length - 1]?.name != "") {
			fields.value.push({
				name: "",
			})
		}
	}

	const removeField = (i) => {
		if (fields.value.length > 1) {
			fields.value.splice(i, 1)
		}
	}

	const languages = ref(userData.value.experiences_and_fields.languages)
	const addLanguage = () => {
		if (
			languages.value.length === 0 ||
			(languages.value[languages.value.length - 1]?.name != "" &&
				languages.value[languages.value.length - 1]?.level != null)
		) {
			languages.value.push({
				name: "",
				level: null,
			})
		}
	}

	const removeLanguage = (i) => {
		if (languages.value.length > 1) {
			languages.value.splice(i, 1)
		}
	}

	const { $i18n } = useNuxtApp()
	// Page Meta
	const title = $i18n.translate("Edit profile")
	useHead({
		title,
	})

	definePageMeta({
		middleware: "member",
	})
</script>

<template>
	<div>
		<members-profile-nav active="experiences" />

		<div class="form">
			<div class="form-title font-semibold">{{ $translate("Experiences") }}</div>
			<FormKit type="form" :actions="false" @submit="updateExperiences">
				<table class="w-full text-sm text-gray-500 dark:text-gray-400">
					<thead class="text-xs text-gray-700 uppercase dark:text-gray-400">
						<tr>
							<th scope="col" class="py-3 px-6 bg-gray-50 dark:bg-gray-800">
								{{ $translate("Experiences") }}
							</th>
							<th scope="col" class="py-3 px-6 bg-gray-50 dark:bg-gray-800">{{ $translate("Years") }}</th>
							<th scope="col" class="py-3 px-6 bg-gray-50 dark:bg-gray-800"></th>
						</tr>
					</thead>
					<tbody class="text-start">
						<tr
							class="border-b border-gray-200 dark:border-gray-700"
							v-for="(experience, i) in experiences"
						>
							<td class="py-2 px-6">
								<FormKit
									type="text"
									:placeholder="$translate('Experiences')"
									:validation-label="$translate('Experiences')"
									validation="required:trim"
									:classes="{
										outer: {
											'formkit-outer': false,
											'w-full': true,
										},
										wrapper: {
											'formkit-wrapper': false,
											'w-full': true,
										},
									}"
									v-model="experience.name"
								></FormKit>
							</td>
							<td class="py-2 px-6">
								<FormKit
									type="text"
									:placeholder="$translate('Years')"
									:validation-label="$translate('Years')"
									validation="required"
									:classes="{
										outer: {
											'formkit-outer': false,
										},
										wrapper: {
											'formkit-wrapper': false,
											'max-w-[100px] mx-auto': true,
										},
									}"
									v-model="experience.years"
								></FormKit>
							</td>
							<td class="py-2 px-6 font-bold cursor-pointer" @click="removeExperience(i)">X</td>
						</tr>
					</tbody>
				</table>
				<div class="text-end">
					<button class="btn" @click.prevent="addExperience">
						{{ $translate("Add") }}
					</button>
				</div>

				<!-- Fields -->
				<div class="form-title font-semibold">{{ $translate("Fields you want to contribute to") }}</div>
				<table class="w-full text-sm text-gray-500 dark:text-gray-400">
					<thead class="text-xs text-gray-700 uppercase dark:text-gray-400">
						<tr>
							<th scope="col" class="py-3 px-6 bg-gray-50 dark:bg-gray-800">
								{{ $translate("Fields") }}
							</th>
							<th scope="col" class="py-3 px-6 bg-gray-50 dark:bg-gray-800"></th>
						</tr>
					</thead>
					<tbody class="text-start">
						<tr class="border-b border-gray-200 dark:border-gray-700" v-for="(field, i) in fields">
							<td class="py-2 px-6">
								<FormKit
									type="text"
									:placeholder="$translate('Experiences')"
									:validation-label="$translate('Experiences')"
									validation="required:trim"
									:classes="{
										outer: {
											'formkit-outer': false,
											'w-full': true,
										},
										wrapper: {
											'formkit-wrapper': false,
											'w-full': true,
										},
									}"
									v-model="field.name"
								></FormKit>
							</td>
							<td class="py-2 px-6 font-bold cursor-pointer" @click="removeField(i)">X</td>
						</tr>
					</tbody>
				</table>
				<div class="text-end">
					<button class="btn" @click.prevent="addField">
						{{ $translate("Add") }}
					</button>
				</div>
				<!-- Fields -->

				<!-- Languages -->
				<div class="form-title font-semibold">{{ $translate("Languages you good at") }}</div>
				<table class="w-full text-sm text-gray-500 dark:text-gray-400">
					<thead class="text-xs text-gray-700 uppercase dark:text-gray-400">
						<tr>
							<th scope="col" class="py-3 px-6 bg-gray-50 dark:bg-gray-800">
								{{ $translate("Languages") }}
							</th>
							<th scope="col" class="py-3 px-6 bg-gray-50 dark:bg-gray-800">{{ $translate("Level") }}</th>
							<th scope="col" class="py-3 px-6 bg-gray-50 dark:bg-gray-800"></th>
						</tr>
					</thead>
					<tbody class="text-start">
						<tr class="border-b border-gray-200 dark:border-gray-700" v-for="(language, i) in languages">
							<td class="py-2 px-6">
								<FormKit
									type="text"
									:placeholder="$translate('Experiences')"
									:validation-label="$translate('Experiences')"
									validation="required:trim"
									:classes="{
										outer: {
											'formkit-outer': false,
											'w-full': true,
										},
										wrapper: {
											'formkit-wrapper': false,
											'w-full': true,
										},
									}"
									v-model="language.name"
								></FormKit>
							</td>
							<td class="py-2 px-6">
								<FormKit
									type="select"
									:classes="{
										outer: {
											'formkit-outer': false,
										},
										wrapper: {
											'formkit-wrapper': false,
											'max-w-[100px] mx-auto': true,
										},
									}"
									:sections-schema="{
										selectIcon: { $el: null },
									}"
									:options="levels"
									name="level"
									:validation-label="$translate('Years')"
									validation="required"
									v-model="language.level"
								/>
							</td>
							<td class="py-2 px-6 font-bold cursor-pointer" @click="removeLanguage(i)">X</td>
						</tr>
					</tbody>
				</table>
				<div class="text-end">
					<button class="btn" @click.prevent="addLanguage">
						{{ $translate("Add") }}
					</button>
				</div>
				<!-- Languages -->

				<!-- Save my data -->
				<div class="text-end mt-10">
					<button type="submit" class="btn-primary">
						{{ $translate("Save") }}
					</button>
				</div>
			</FormKit>
		</div>
	</div>
</template>

<style>
	.formkit-label {
		font-weight: normal !important;
	}
</style>
