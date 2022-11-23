<script setup>
	import { useAuthStore } from "~~/stores/authStore"

	// CSRF Token
	onBeforeMount(async () => {
		const { useFetchCookies } = useApiFetch()
		await useFetchCookies()
	})

	const { $i18n } = useNuxtApp()
	const { genders, countries, nationalities, cities, branches, qualifications, howKnewUs, mobileCodes } =
		useSiteConfig()

	const volunteerData = ref({})

	// Register volunteer
	const authStore = useAuthStore()
	const createVolunteer = async (volunteer, node) => {
		// Converting to FormData as we gotta upload a file
		const body = new FormData()
		Object.keys(volunteer).forEach((key) => {
			let value = volunteer[key]
			body.append(key, value)
		})
		body.append("image", volunteer.image[0]?.file || "")

		const { error } = await authStore.registerVolunteer(body)
		// On errors
		if (error?.value?.response?.status === 400) {
			node.setErrors(error.value?.data)
		}
	}

	// Page Meta
	const title = $i18n.translate("Register new volunteer")
	useHead({
		title,
	})
	definePageMeta({
		middleware: "guest",
	})
</script>

<template>
	<div class="my-20">
		<div class="container">
			<!-- Register Subscriber Form -->
			<div class="form">
				<h5 class="form-title">
					{{ title }}
				</h5>

				<FormKit
					type="form"
					:actions="false"
					@submit="createVolunteer"
					v-model="volunteerData"
					enctype="multipart/form-data"
				>
					<FormKit
						type="file"
						name="image"
						:label="$translate('Profile picture')"
						accept="image/*"
						:classes="{
							input: 'block px-3 w-full',
							outer: 'mb-5',
							wrapper: {
								'formkit-wrapper': false,
							},
						}"
					></FormKit>

					<!-- Name fields (Arabic) -->
					<div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2 md:gap-4">
						<FormKit
							:label="`${$translate('fname')} (${$translate('In Arabic')})`"
							type="text"
							name="fname_ar"
							id="fname_ar"
							:classes="{
								wrapper: {
									'formkit-wrapper': false,
									'w-full': true,
								},
								outer: 'mb-3',
							}"
							:placeholder="$translate('fname')"
							validation="required:trim|length:3,50"
							:validation-label="$translate('fname')"
						></FormKit>
						<FormKit
							:label="`${$translate('sname')} (${$translate('In Arabic')})`"
							type="text"
							name="sname_ar"
							id="sname_ar"
							:classes="{
								wrapper: {
									'formkit-wrapper': false,
									'w-full': true,
								},
								outer: 'mb-3',
							}"
							:placeholder="$translate('sname')"
							validation="required:trim|length:3,50"
							:validation-label="$translate('sname')"
						></FormKit>
						<FormKit
							:label="`${$translate('tname')} (${$translate('In Arabic')})`"
							type="text"
							name="tname_ar"
							id="tname_ar"
							:classes="{
								wrapper: {
									'formkit-wrapper': false,
									'w-full': true,
								},
								outer: 'mb-3',
							}"
							:placeholder="$translate('tname')"
							validation="required:trim|length:3,50"
							:validation-label="$translate('tname')"
						></FormKit>
						<FormKit
							:label="`${$translate('lname')} (${$translate('In Arabic')})`"
							type="text"
							name="lname_ar"
							id="lname_ar"
							:classes="{
								wrapper: {
									'formkit-wrapper': false,
									'w-full': true,
								},
								outer: 'mb-3',
							}"
							:placeholder="$translate('lname')"
							validation="required:trim|length:3,50"
							:validation-label="$translate('lname')"
						></FormKit>
					</div>
					<!-- Name fields -->

					<!-- Name fields (English) -->
					<div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2 md:gap-4">
						<FormKit
							:classes="{
								wrapper: {
									'formkit-wrapper': false,
									'w-full': true,
								},
								outer: 'mb-3',
							}"
							type="text"
							:label="`${$translate('fname')} (${$translate('In English')})`"
							name="fname_en"
							id="fname_en"
							:placeholder="$translate('fname')"
							validation="required:trim|length:3,50"
							:validation-label="$translate('fname')"
						></FormKit>
						<FormKit
							:classes="{
								wrapper: {
									'formkit-wrapper': false,
									'w-full': true,
								},
								outer: 'mb-3',
							}"
							type="text"
							:label="`${$translate('sname')} (${$translate('In English')})`"
							name="sname_en"
							id="sname_en"
							:placeholder="$translate('sname')"
							validation="required:trim|length:3,50"
							:validation-label="$translate('sname')"
						></FormKit>
						<FormKit
							:classes="{
								wrapper: {
									'formkit-wrapper': false,
									'w-full': true,
								},
								outer: 'mb-3',
							}"
							type="text"
							:label="`${$translate('tname')} (${$translate('In English')})`"
							name="tname_en"
							id="tname_en"
							:placeholder="$translate('tname')"
							validation="required:trim|length:3,50"
							:validation-label="$translate('tname')"
						></FormKit>
						<FormKit
							:classes="{
								wrapper: {
									'formkit-wrapper': false,
									'w-full': true,
								},
								outer: 'mb-3',
							}"
							type="text"
							:label="`${$translate('lname')} (${$translate('In English')})`"
							name="lname_en"
							id="lname_en"
							:placeholder="$translate('lname')"
							validation="required:trim|length:3,50"
							:validation-label="$translate('lname')"
						></FormKit>
					</div>
					<!-- Name fields -->

					<!-- Gender -->
					<FormKit
						outer-class="mb-3"
						type="myRadio"
						name="gender"
						:label="$translate('Gender')"
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
					></FormKit>
					<!-- Gender -->

					<div
						class="grid grid-cols-1 gap-2 md:gap-4"
						:class="{
							'md:grid-cols-4': volunteerData.country === 0,
							'md:grid-cols-3': volunteerData.country !== 0,
						}"
					>
						<!-- Country -->
						<FormKit
							:label="$translate('Country')"
							type="select"
							:sections-schema="{
								selectIcon: { $el: null },
							}"
							:options="countries"
							name="country"
							:validation-label="$translate('Country')"
							validation="required"
							:classes="{
								outer: 'mb-3',
								wrapper: {
									'formkit-wrapper': false,
									'w-full': true,
								},
							}"
						></FormKit>
						<!-- Country -->

						<!-- City -->
						<FormKit
							v-if="volunteerData.country === 0"
							:label="$translate('City')"
							type="select"
							:sections-schema="{
								selectIcon: { $el: null },
							}"
							:options="cities"
							name="city"
							:validation-label="$translate('City')"
							validation="required"
							:classes="{
								outer: 'mb-3',
								wrapper: {
									'formkit-wrapper': false,
									'w-full': true,
								},
							}"
						></FormKit>
						<!-- City -->

						<!-- Nationality -->
						<FormKit
							:label="$translate('Nationality')"
							type="select"
							:sections-schema="{
								selectIcon: { $el: null },
							}"
							:classes="{
								outer: 'mb-3',
								wrapper: {
									'formkit-wrapper': false,
									'w-full': true,
								},
							}"
							:options="nationalities"
							name="nationality"
							:validation-label="$translate('Nationality')"
							validation="required"
						></FormKit>
						<!-- Nationality -->

						<!-- Qualification -->
						<FormKit
							:label="$translate('Qualification')"
							type="select"
							:sections-schema="{
								selectIcon: { $el: null },
							}"
							:classes="{
								outer: 'mb-3',
								wrapper: {
									'formkit-wrapper': false,
									'w-full': true,
								},
							}"
							:options="qualifications"
							name="qualification"
							:validation-label="$translate('Qualification')"
							validation="required"
						></FormKit>
						<!-- Qualification -->
					</div>

					<div class="grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-4">
						<!-- National id -->
						<FormKit
							:label="$translate('National ID')"
							:classes="{
								outer: 'mb-3',
								wrapper: {
									'formkit-wrapper': false,
									'w-full': true,
								},
							}"
							type="number"
							:placeholder="$translate('National ID')"
							name="national_id"
							:validation-label="$translate('National ID')"
							validation="required:trim|number|length:10"
						></FormKit>
						<!-- National id -->

						<!-- Marital status -->
						<FormKit
							:label="$translate('Martial status')"
							:classes="{
								outer: 'mb-3',
								wrapper: {
									'formkit-wrapper': false,
									'w-full': true,
								},
							}"
							type="text"
							:placeholder="$translate('Martial status')"
							name="marital_status"
							:validation-label="$translate('Martial status')"
							validation="required:trim"
						></FormKit>
						<!-- Marital status -->

						<!-- Adminstrative area -->
						<FormKit
							:label="$translate('Adminstrative area')"
							:classes="{
								outer: 'mb-3',
								wrapper: {
									'formkit-wrapper': false,
									'w-full': true,
								},
							}"
							type="text"
							:placeholder="$translate('Adminstrative area')"
							name="adminstrative_area"
							:validation-label="$translate('Adminstrative area')"
							validation="required:trim"
						></FormKit>
						<!-- Adminstrative area -->
					</div>

					<div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2 md:gap-4">
						<!-- Governorate -->
						<FormKit
							:label="$translate('Governorate')"
							:classes="{
								outer: 'mb-3',
								wrapper: {
									'formkit-wrapper': false,
									'w-full': true,
								},
							}"
							type="text"
							:placeholder="$translate('Governorate')"
							name="governorate"
							:validation-label="$translate('Governorate')"
							validation="required:trim"
						></FormKit>
						<!-- Governorate -->

						<!-- National address -->
						<FormKit
							:label="$translate('National address')"
							:classes="{
								outer: 'mb-3',
								wrapper: {
									'formkit-wrapper': false,
									'w-full': true,
								},
							}"
							type="text"
							:placeholder="$translate('National address')"
							name="national_address"
							id="national_address"
							:validation-label="$translate('National address')"
							validation="required:trim"
						></FormKit>
						<!-- National address -->

						<!-- Job title -->
						<FormKit
							:label="$translate('Job title')"
							:classes="{
								outer: 'mb-3',
								wrapper: {
									'formkit-wrapper': false,
									'w-full': true,
								},
							}"
							type="text"
							:placeholder="$translate('Job title')"
							name="job_title"
							:validation-label="$translate('Job title')"
							validation="required:trim"
						></FormKit>
						<!-- Job title -->

						<!-- Address -->
						<FormKit
							:label="$translate('Address')"
							:classes="{
								outer: 'mb-3',
								wrapper: {
									'formkit-wrapper': false,
									'w-full': true,
								},
							}"
							type="text"
							:placeholder="$translate('Address')"
							name="address"
							:validation-label="$translate('Address')"
							validation="required:trim"
						></FormKit>
						<!-- Address -->
					</div>

					<!-- Volunteering Fields -->
					<FormKit
						:classes="{
							outer: 'my-4',
							options: 'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4',
							option: {
								'formkit-option': false,
							},
							fieldset: { 'formkit-fieldset': false },
							wrapper: 'flex justify-between items-center p-2 border-l border-b',
						}"
						name="fields"
						type="checkbox"
						:label="$translate('Volunteering fields')"
						:options="[
							{
								label: $translate('Photography'),
								value: 1,
							},
							{
								label: $translate('Videography'),
								value: 2,
							},
							{
								label: $translate('Cinematography'),
								value: 3,
							},
							{
								label: $translate('Editing - Media Platforms - Documentation'),
								value: 4,
							},
							{
								label: $translate('Coverings'),
								value: 5,
							},
							{
								label: $translate('Presentation'),
								value: 6,
							},
							{
								label: $translate('Digital content industry'),
								value: 7,
							},
							{
								label: $translate('Montage'),
								value: 8,
							},
							{
								label: $translate('Social media'),
								value: 9,
							},
							{
								label: $translate('Media marketing'),
								value: 10,
							},
							{
								label: $translate('Editorial management'),
								value: 11,
							},
							{
								label: $translate('Field Editorial Leadership'),
								value: 12,
							},
							{
								label: $translate('Management of meetings and seminars'),
								value: 13,
							},
							{
								label: $translate('Media training'),
								value: 14,
							},
						]"
						:validation-label="$translate('Volunteering fields')"
						validation="required"
					></FormKit>
					<!-- Volunteering Fields -->

					<div class="row-of-two">
						<!-- Educational -->
						<FormKit
							:label="$translate('Educational level')"
							:classes="{
								wrapper: {
									'formkit-wrapper': false,
									'w-full': true,
								},
								outer: 'mb-3',
							}"
							type="text"
							:placeholder="$translate('Educational level')"
							name="education"
							:validation-label="$translate('Educational level')"
							validation="required:trim"
						></FormKit>
						<!-- Educational -->

						<!-- experiences -->
						<FormKit
							type="text"
							:placeholder="$translate('Volunteering experiences')"
							name="experiences"
							:label="$translate('Volunteering experiences')"
							:classes="{
								wrapper: {
									'formkit-wrapper': false,
									'w-full': true,
								},
								outer: 'mb-3',
							}"
							:validation-label="$translate('Volunteering experiences')"
							validation="required:trim"
						></FormKit>
						<!-- experiences -->
					</div>

					<div class="row-of-two">
						<!-- Branch -->
						<FormKit
							:label="$translate('Branch')"
							:classes="{
								outer: 'mb-3',
								wrapper: {
									'formkit-wrapper': false,
									'w-full': true,
								},
							}"
							type="select"
							:sections-schema="{
								selectIcon: { $el: null },
							}"
							:options="branches"
							name="branch"
							:validation-label="$translate('Branch')"
							validation="required"
						></FormKit>
						<!-- Branch -->

						<!-- HowKnew -->
						<FormKit
							:label="$translate('How do you know the authority?')"
							:classes="{
								outer: 'mb-3',
								wrapper: {
									'formkit-wrapper': false,
									'w-full': true,
								},
							}"
							type="select"
							:sections-schema="{
								selectIcon: { $el: null },
							}"
							:options="howKnewUs"
							name="hearabout"
							:validation-label="$translate('How do you know the authority?')"
							validation="required"
						></FormKit>
						<!-- HowKnew -->
					</div>

					<div class="row-of-two">
						<!-- Email -->
						<FormKit
							:label="$translate('Email')"
							:classes="{
								outer: 'mb-3',
								wrapper: {
									'formkit-wrapper': false,
									'w-full': true,
								},
							}"
							type="email"
							:placeholder="$translate('Email')"
							id="email"
							name="email"
							:validation-label="$translate('Email')"
							validation="required:trim|email"
						></FormKit>
						<!-- Email -->

						<!-- Mobile -->
						<div class="formkit-outer mb-3" data-family="text">
							<label for="mobile" class="formkit-label">{{ $translate("Mobile") }}</label>
							<div
								class="input-group [&>.formkit-outer]:mb-0 h-9"
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
								></FormKit>
								<span class="prepend">
									<FormKit
										type="mySelect"
										name="mobile_key"
										:options="mobileCodes"
										style="box-shadow: none"
									></FormKit>
								</span>
							</div>
						</div>
						<!-- Mobile -->
					</div>

					<div class="row-of-two">
						<!-- Password -->
						<FormKit
							:label="$translate('Password')"
							:classes="{
								outer: 'mb-3',
								wrapper: {
									'formkit-wrapper': false,
									'w-full': true,
								},
							}"
							type="password"
							:placeholder="$translate('Password')"
							id="password"
							name="password"
							:validation-label="$translate('Password')"
							validation="required:trim|length:6"
						></FormKit>
						<!-- Password -->

						<!-- Password Confirmation -->
						<FormKit
							:label="$translate('Password confirmation')"
							:classes="{
								outer: 'mb-3',
								wrapper: {
									'formkit-wrapper': false,
									'w-full': true,
								},
							}"
							type="password"
							:placeholder="$translate('Password confirmation')"
							id="password_confirm"
							name="password_confirm"
							:validation-label="$translate('Password confirmation')"
							validation="required:trim|confirm"
						></FormKit>
						<!-- Password Confirmation -->
					</div>

					<div class="mb-7">
						<FormKit
							type="checkbox"
							:label="$translate('TermsAcceptance')"
							:validation-label="$translate('acceptance')"
							validation="required|accepted"
							:classes="{
								wrapper: {
									'formkit-wrapper': false,
									'w-full flex items-center': true,
								},
								inner: 'mx-3',
							}"
						></FormKit>
					</div>

					<div class="text-end">
						<button type="submit" class="btn-primary">
							{{ $translate("Register") }}
						</button>
					</div>
				</FormKit>
			</div>
			<!-- Register Subscriber Form -->
		</div>
	</div>
</template>
