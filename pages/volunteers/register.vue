<script setup>
	import { useAuthStore } from "~~/stores/authStore"

	const { $i18n } = useNuxtApp()
	const { countries, cities, branches, qualifications, howKnewUs, mobileCodes } = useSiteConfig()

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
		body.append("image", volunteer.image[0]?.file)

		const { data, error } = await authStore.registerVolunteer(body)

		// On errors
		if (error?.value?.response?.status === 400) {
			node.setErrors(error.value?.data)
		}

		// On success
		if (data?.value) {
			authStore.authenticated = true
			authStore.userData = data.value.userData
			authStore.userType = "volunteer"
			authStore.accessToken = data.value.accessToken

			// Save to Local Storage
			localStorage.setItem("userData", JSON.stringify(data.value.userData))
			localStorage.setItem("userType", "volunteer")
			localStorage.setItem("accessToken", data.value.accessToken)

			// Redirect to user dashboard
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
					/>

					<!-- Name fields (Arabic) -->
					<div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2 md:gap-4">
						<FormKit
							:label="`${$translate('fname')} (${$translate('In Arabic')})`"
							type="text"
							name="fname_ar"
							id="fname_ar"
							outer-class="mb-3"
							:placeholder="$translate('fname')"
							validation="required:trim|length:3,50"
							:validation-label="$translate('fname')"
						/>
						<FormKit
							:label="`${$translate('sname')} (${$translate('In Arabic')})`"
							type="text"
							name="sname_ar"
							id="sname_ar"
							outer-class="mb-3"
							:placeholder="$translate('sname')"
							validation="required:trim|length:3,50"
							:validation-label="$translate('sname')"
						/>
						<FormKit
							:label="`${$translate('tname')} (${$translate('In Arabic')})`"
							type="text"
							name="tname_ar"
							id="tname_ar"
							outer-class="mb-3"
							:placeholder="$translate('tname')"
							validation="required:trim|length:3,50"
							:validation-label="$translate('tname')"
						/>
						<FormKit
							:label="`${$translate('lname')} (${$translate('In Arabic')})`"
							type="text"
							name="lname_ar"
							id="lname_ar"
							outer-class="mb-3"
							:placeholder="$translate('lname')"
							validation="required:trim|length:3,50"
							:validation-label="$translate('lname')"
						/>
					</div>
					<!-- Name fields -->

					<!-- Name fields (English) -->
					<div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2 md:gap-4">
						<FormKit
							outer-class="mb-3"
							type="text"
							:label="`${$translate('fname')} (${$translate('In English')})`"
							name="fname_en"
							id="fname_en"
							:placeholder="$translate('fname')"
							validation="required:trim|length:3,50"
							:validation-label="$translate('fname')"
						/>
						<FormKit
							outer-class="mb-3"
							type="text"
							:label="`${$translate('sname')} (${$translate('In English')})`"
							name="sname_en"
							id="sname_en"
							:placeholder="$translate('sname')"
							validation="required:trim|length:3,50"
							:validation-label="$translate('sname')"
						/>
						<FormKit
							outer-class="mb-3"
							type="text"
							:label="`${$translate('tname')} (${$translate('In English')})`"
							name="tname_en"
							id="tname_en"
							:placeholder="$translate('tname')"
							validation="required:trim|length:3,50"
							:validation-label="$translate('tname')"
						/>
						<FormKit
							outer-class="mb-3"
							type="text"
							:label="`${$translate('lname')} (${$translate('In English')})`"
							name="lname_en"
							id="lname_en"
							:placeholder="$translate('lname')"
							validation="required:trim|length:3,50"
							:validation-label="$translate('lname')"
						/>
					</div>
					<!-- Name fields -->

					<!-- Gender -->
					<FormKit
						outer-class="mb-3"
						type="myRadio"
						name="gender"
						:label="$translate('Gender')"
						:options="[
							{
								label: $translate('Male'),
								value: 0,
							},
							{
								label: $translate('Female'),
								value: 1,
							},
						]"
						:validation-label="$translate('Gender')"
						validation="required"
						:classes="{
							options: 'flex items-center',
							option: {
								'formkit-option': false,
							},
							inner: 'm-3',
						}"
					/>
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
							outer-class="mb-3"
						/>
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
							outer-class="mb-3"
						/>
						<!-- City -->

						<!-- Nationality -->
						<FormKit
							:label="$translate('Nationality')"
							type="select"
							:sections-schema="{
								selectIcon: { $el: null },
							}"
							outer-class="mb-3"
							:options="countries"
							name="nationality"
							:validation-label="$translate('Nationality')"
							validation="required"
						/>
						<!-- Nationality -->

						<!-- Qualification -->
						<FormKit
							:label="$translate('Qualification')"
							type="select"
							:sections-schema="{
								selectIcon: { $el: null },
							}"
							outer-class="mb-3"
							:options="qualifications"
							name="qualification"
							:validation-label="$translate('Qualification')"
							validation="required"
						/>
						<!-- Qualification -->
					</div>

					<div class="grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-4">
						<!-- National id -->
						<FormKit
							:label="$translate('National ID')"
							outer-class="mb-3"
							type="number"
							:placeholder="$translate('National ID')"
							name="national_id"
							:validation-label="$translate('National ID')"
							validation="required:trim|number|length:10"
						/>
						<!-- National id -->

						<!-- Marital status -->
						<FormKit
							:label="$translate('Martial status')"
							outer-class="mb-3"
							type="text"
							:placeholder="$translate('Martial status')"
							name="marital_status"
							:validation-label="$translate('Martial status')"
							validation="required:trim"
						/>
						<!-- Marital status -->

						<!-- Adminstrative area -->
						<FormKit
							:label="$translate('Adminstrative area')"
							outer-class="mb-3"
							type="text"
							:placeholder="$translate('Adminstrative area')"
							name="adminstrative_area"
							:validation-label="$translate('Adminstrative area')"
							validation="required:trim"
						/>
						<!-- Adminstrative area -->
					</div>

					<div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2 md:gap-4">
						<!-- Governorate -->
						<FormKit
							:label="$translate('Governorate')"
							outer-class="mb-3"
							type="text"
							:placeholder="$translate('Governorate')"
							name="governorate"
							:validation-label="$translate('Governorate')"
							validation="required:trim"
						/>
						<!-- Governorate -->

						<!-- National address -->
						<FormKit
							:label="$translate('National address')"
							outer-class="mb-3"
							type="text"
							:placeholder="$translate('National address')"
							name="national_address"
							id="national_address"
							:validation-label="$translate('National address')"
							validation="required:trim"
						/>
						<!-- National address -->

						<!-- Job title -->
						<FormKit
							:label="$translate('Job title')"
							outer-class="mb-3"
							type="text"
							:placeholder="$translate('Job title')"
							name="job_title"
							:validation-label="$translate('Job title')"
							validation="required:trim"
						/>
						<!-- Job title -->

						<!-- Address -->
						<FormKit
							:label="$translate('Address')"
							outer-class="mb-3"
							type="text"
							:placeholder="$translate('Address')"
							name="address"
							:validation-label="$translate('Address')"
							validation="required:trim"
						/>
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
					/>
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
						/>
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
						/>
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
						/>
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
						/>
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
						/>
						<!-- Email -->

						<!-- Mobile -->
						<div class="formkit-outer mb-3" data-family="text" data-type="email">
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
								/>
								<span class="prepend">
									<FormKit
										type="mySelect"
										name="mobile_key"
										:options="mobileCodes"
										style="box-shadow: none"
									/>
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
						/>
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
						/>
						<!-- Password Confirmation -->
					</div>

					<div class="mb-7">
						<!-- To be replaced with google captcha! -->
						<!-- <label for="userPassword">رمز التحقق</label>
						<input
							type="password"
							name="password"
							class="form-control"
							id="userPassword"
							placeholder="رمز التحقق"
							required
							autocompleted=""
						/> -->
					</div>

					<div class="mb-7">
						<FormKit
							type="checkbox"
							:label="$translate('TermsAcceptance')"
							:validation-label="$translate('acceptance')"
							validation="required"
							:classes="{
								wrapper: {
									'formkit-wrapper': false,
									'w-full flex items-center': true,
								},
								inner: 'mx-3',
							}"
						/>
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

<style>
	[data-type="checkbox"] .formkit-input,
	[data-type="radio"] .formkit-input {
		left: auto;
	}
</style>
