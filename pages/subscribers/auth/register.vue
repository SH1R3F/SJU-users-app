<script setup>
	import { useAuthStore } from "~~/stores/authStore"

	// CSRF Token
	onBeforeMount(async () => {
		const { useFetchCookies } = useApiFetch()
		await useFetchCookies()
	})

	const { $i18n } = useNuxtApp()
	const { genders, countries, cities, nationalities, qualifications, howKnewUs, mobileCodes } = useSiteConfig()

	const subscriberData = ref({})

	// Register subscriber
	const authStore = useAuthStore()
	const createSubscriber = async (subscriber, node) => {
		// Converting to FormData as we gotta upload a file
		const body = new FormData()
		Object.keys(subscriber).forEach((key) => {
			let value = subscriber[key]
			body.append(key, value)
		})
		body.append("image", subscriber.image[0]?.file || "")

		const { error } = await authStore.registerSubscriber(body)
		// On errors
		if (error?.value?.response?.status === 400) {
			node.setErrors(error.value?.data)
		}
	}

	// Page Meta
	const title = $i18n.translate("Register new subscriber")
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
					@submit="createSubscriber"
					v-model="subscriberData"
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
								'w-full': true,
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
							'md:grid-cols-4': subscriberData.country === 0,
							'md:grid-cols-3': subscriberData.country !== 0,
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
								wrapper: {
									'formkit-wrapper': false,
									'w-full': true,
								},
								outer: 'mb-3',
							}"
						></FormKit>
						<!-- Country -->

						<!-- City -->
						<FormKit
							v-if="subscriberData.country === 0"
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
								wrapper: {
									'formkit-wrapper': false,
									'w-full': true,
								},
								outer: 'mb-3',
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
								wrapper: {
									'formkit-wrapper': false,
									'w-full': true,
								},
								outer: 'mb-3',
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
								wrapper: {
									'formkit-wrapper': false,
									'w-full': true,
								},
								outer: 'mb-3',
							}"
							:options="qualifications"
							name="qualification"
							:validation-label="$translate('Qualification')"
							validation="required"
						></FormKit>
						<!-- Qualification -->
					</div>

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
