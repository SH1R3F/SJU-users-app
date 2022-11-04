<script setup>
	import { storeToRefs } from "pinia"
	import { useAuthStore } from "~~/stores/authStore"
	import { useVolunteerStore } from "~~/stores/volunteerStore"

	const { genders, countries, cities, qualifications, mobileCodes } = useSiteConfig()

	const authStore = useAuthStore()
	const { userData } = storeToRefs(authStore)
	const { dblocalize } = useLocalization()

	const profileData = ref({})
	const toast = useToast()
	const volunteerStore = useVolunteerStore()

	const updateVolunteer = async (body, node) => {
		const { error } = await volunteerStore.updateVolunteer(body)
		// On errors
		if (error?.value?.response?.status === 400) {
			node.setErrors(error.value?.data)
		} else if (error?.value?.response?.status === 422) {
			toast.error(error.value?.data?.message)
		}
	}

	const updatePassword = async (body, node) => {
		const { error } = await volunteerStore.updatePassword(body)
		// On errors
		if (error?.value?.response?.status === 400) {
			node.setErrors(error.value?.data)
		} else if (error?.value?.response?.status === 422) {
			toast.error(error.value?.data?.message)
		}
	}

	const { $i18n } = useNuxtApp()
	// Page Meta
	const title = $i18n.translate("Edit profile")
	useHead({
		title,
	})

	definePageMeta({
		middleware: "volunteer",
	})
</script>

<template>
	<div>
		<div class="form">
			<div class="form-title font-semibold">{{ $translate("Edit profile") }}</div>
			<FormKit
				type="form"
				v-model="profileData"
				v-if="Object.keys(userData).length"
				:actions="false"
				@submit="updateVolunteer"
			>
				<!-- Full name fields -->
				<div class="flex flex-wrap gap-y-5 mb-8">
					<div class="w-6/12 sm:w-3/12">
						<label>الاسم الأول</label>
						<h4 class="text-sju-50">{{ dblocalize(userData, "fname") }}</h4>
					</div>
					<div class="w-6/12 sm:w-3/12">
						<label>اسم الأب</label>
						<h4 class="text-sju-50">{{ dblocalize(userData, "sname") }}</h4>
					</div>
					<div class="w-6/12 sm:w-3/12">
						<label>اسم الجد</label>
						<h4 class="text-sju-50">{{ dblocalize(userData, "tname") }}</h4>
					</div>
					<div class="w-6/12 sm:w-3/12">
						<label>اسم العائلة</label>
						<h4 class="text-sju-50">{{ dblocalize(userData, "lname") }}</h4>
					</div>
				</div>
				<!-- Full name fields -->

				<!-- Gender -->
				<div class="flex flex-wrap mb-8" v-if="false">
					<label class="w-full sm:w-2/12">{{ $translate("Gender") }}</label>
					<div class="w-full sm:w-10/12">
						<h5 class="text-sju-50">{{ genders[userData?.gender].label }}</h5>
					</div>
				</div>
				<div class="flex flex-wrap mb-8" v-else>
					<label class="w-full sm:w-2/12">{{ $translate("Gender") }}</label>
					<FormKit
						outer-class="mb-3 w-full sm:w-10/12"
						type="myRadio"
						name="gender"
						:options="genders"
						:validation-label="$translate('Gender')"
						validation="required"
						:classes="{
							options: 'flex items-center',
							option: {
								'formkit-option': false,
							},
							inner: 'm-3',
						}"
						:value="userData?.gender"
					/>
				</div>
				<!-- Gender -->

				<!-- Country -->
				<div class="flex flex-wrap mb-8">
					<label class="w-full sm:w-2/12">{{ $translate("Country") }}</label>
					<FormKit
						type="select"
						:classes="{
							outer: 'w-full sm:w-10/12',
							wrapper: {
								'formkit-wrapper': false,
								'w-full': true,
							},
						}"
						:sections-schema="{
							selectIcon: { $el: null },
						}"
						:options="countries"
						name="country"
						:validation-label="$translate('Country')"
						validation="required"
						:value="userData?.country || 0"
					/>
				</div>
				<!-- Country -->

				<!-- City -->
				<div class="flex flex-wrap mb-8" v-if="profileData.country === 0">
					<label class="w-full sm:w-2/12">{{ $translate("City") }}</label>
					<FormKit
						type="select"
						:classes="{
							outer: 'w-full sm:w-10/12',
							wrapper: {
								'formkit-wrapper': false,
								'w-full': true,
							},
						}"
						:sections-schema="{
							selectIcon: { $el: null },
						}"
						:options="cities"
						name="city"
						:validation-label="$translate('City')"
						validation="required"
						:value="userData?.city || 0"
					/>
				</div>
				<!-- City -->

				<!-- Nationality -->
				<div class="flex flex-wrap mb-8">
					<label class="w-full sm:w-2/12">{{ $translate("Nationality") }}</label>
					<div class="w-full sm:w-10/12">
						<h5 class="text-sju-50">{{ countries[userData?.nationality].label }}</h5>
					</div>
				</div>
				<!-- Nationality -->

				<!-- Email address -->
				<div class="flex flex-wrap mb-8">
					<label class="w-full sm:w-2/12">{{ $translate("Email") }}</label>
					<div class="w-full sm:w-10/12">
						<h5 class="text-sju-50">{{ userData?.email }}</h5>
					</div>
				</div>
				<!-- Email address -->

				<!-- Academic Qualification -->
				<div class="flex flex-wrap mb-8">
					<label class="w-full sm:w-2/12">{{ $translate("Qualification") }}</label>
					<FormKit
						type="select"
						:classes="{
							outer: 'w-full sm:w-10/12',
							wrapper: {
								'formkit-wrapper': false,
								'w-full': true,
							},
						}"
						:sections-schema="{
							selectIcon: { $el: null },
						}"
						:options="qualifications"
						name="qualification"
						:validation-label="$translate('Qualification')"
						validation="required"
						:value="userData?.qualification || 0"
					/>
				</div>
				<!-- Academic Qualification -->

				<!-- Mobile number -->
				<div class="formkit-outer flex flex-wrap mb-8" data-family="text">
					<label for="mobile" class="w-full sm:w-2/12">{{ $translate("Mobile") }}</label>
					<div
						class="input-group [&>.formkit-outer]:mb-0 h-9 w-full sm:w-10/12"
						style="border-radius: 5px; box-shadow: 0 0 0 1px #94929c"
					>
						<FormKit
							type="myTextInput"
							outer-class="w-full border border-y-0 m-0"
							id="mobile"
							name="mobile"
							:placeholder="$translate('Mobile')"
							validation="required:trim|number"
							:validation-label="$translate('Mobile')"
							:value="userData?.mobile || ''"
						/>
						<span class="prepend">
							<FormKit
								type="mySelect"
								name="mobile_key"
								:options="mobileCodes"
								style="box-shadow: none"
								:value="userData?.mobile_key || 0"
							/>
						</span>
					</div>
				</div>
				<!-- Mobile number -->

				<!-- Save my data -->
				<div class="text-end">
					<button type="submit" class="btn-primary">
						{{ $translate("Save") }}
					</button>
				</div>
			</FormKit>
		</div>

		<div class="form">
			<div class="form-title font-semibold">{{ $translate("Change password") }}</div>
			<FormKit type="form" :actions="false" @submit="updatePassword">
				<!-- Current password -->
				<div class="flex flex-wrap mb-8">
					<label class="w-full sm:w-3/12">{{ $translate("Current password") }}</label>
					<FormKit
						:classes="{
							outer: 'w-full sm:w-9/12',
							wrapper: {
								'formkit-wrapper': false,
								'w-full': true,
							},
						}"
						type="password"
						:placeholder="$translate('Current password')"
						id="current_password"
						name="current_password"
						:validation-label="$translate('Current password')"
						validation="required:trim|length:6"
					/>
				</div>
				<!-- Current password -->

				<!-- New password -->
				<div class="flex flex-wrap mb-8">
					<label class="w-full sm:w-3/12">{{ $translate("New password") }}</label>
					<FormKit
						:classes="{
							outer: 'w-full sm:w-9/12',
							wrapper: {
								'formkit-wrapper': false,
								'w-full': true,
							},
						}"
						type="password"
						:placeholder="$translate('New password')"
						id="new_password"
						name="new_password"
						:validation-label="$translate('New password')"
						validation="required:trim|length:6"
					/>
				</div>
				<!-- New password -->

				<!-- Password confirmation -->
				<div class="flex flex-wrap mb-8">
					<label class="w-full sm:w-3/12">{{ $translate("Password confirmation") }}</label>
					<FormKit
						:classes="{
							outer: 'w-full sm:w-9/12',
							wrapper: {
								'formkit-wrapper': false,
								'w-full': true,
							},
						}"
						type="password"
						:placeholder="$translate('Password confirmation')"
						id="new_password_confirm"
						name="new_password_confirm"
						:validation-label="$translate('Password confirmation')"
						validation="required:trim|length:6|confirm"
					/>
				</div>
				<!-- Password confirmation -->

				<!-- Save my data -->
				<div class="text-end">
					<button type="submit" class="btn-primary">
						{{ $translate("Save") }}
					</button>
				</div>
			</FormKit>
		</div>
	</div>
</template>
