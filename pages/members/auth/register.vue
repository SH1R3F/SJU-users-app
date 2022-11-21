<script setup>
	import IcSharpCheck from "~icons/ic/sharp-check"
	import { getNode, createMessage } from "@formkit/core"
	import { useAuthStore } from "~~/stores/authStore"
	import { useHomeStore } from "~~/stores/homeStore"
	const toast = useToast()
	const { $i18n } = useNuxtApp()

	const { branches, genders, nationalities, membershipTypes } = useSiteConfig()
	const memberData = ref({})
	const step = ref("registration")
	const steps = reactive({
		registration: {
			label: "Registration",
		},
		contactInfo: {
			label: "Contact info",
		},
		membershipTypes: {
			label: "Membership types",
		},
		memberInfo: {
			label: "Member info",
		},
		loginInfo: {
			label: "Login info",
		},
		review: {
			label: "Review",
		},
	})
	const visitedSteps = ref([]) // track visited steps

	// our plugin and our template code will make use of 'steps'
	const stepPlugin = (node) => {
		// only runs for <FormKit type="group" />
		if (node.props.type == "group") {
			// build up our steps object
			steps[node.name] = steps[node.name] || {}

			// add the current group's reactive validity
			node.on("created", () => {
				steps[node.name].valid = toRef(node.context.state, "valid")
			})

			// Store or update the count of blocking validation messages.
			// FormKit emits the "count:blocking" event (with the count) each time
			// the count changes.
			node.on("count:blocking", ({ payload: count }) => {
				steps[node.name].blockingCount = count
			})

			// Store or update the count of backend error messages.
			node.on("count:errors", ({ payload: count }) => {
				steps[node.name].errorCount = count
			})

			watch(step, (newStep, oldStep) => {
				if (oldStep && !visitedSteps.value.includes(oldStep)) {
					visitedSteps.value.push(oldStep)
				}
				// Trigger showing validation on fields if a group has been visited
				visitedSteps.value.forEach((step) => {
					const node = getNode(step)

					// the node.walk() method walks through all the descendants of the current node
					// and executes the provided function.
					node.walk((n) => {
						n.store.set(
							createMessage({
								key: "submitted",
								value: true,
								visible: false,
							})
						)
					})
				})
			})
			return false
		}
	}
	const checkStepValidity = (key) => {
		return (steps[key].errorCount > 0 || steps[key].blockingCount > 0) && visitedSteps.value.includes(key)
	}

	const authStore = useAuthStore()
	const registerMember = async (body, node) => {
		node.clearErrors()
		// Show loading screen
		useHomeStore().loading = true
		const { error } = await authStore.registerMember(body)
		// Hide loading screen
		useHomeStore().loading = false

		if (error?.value?.response?.status == 400) {
			node.setErrors(error.value.data)
			toast.error($i18n.translate("Error in one or more fields"))
		} else if (error?.value) {
			toast.error($i18n.translate("Error in registration"))
		}
	}

	const setStep = (n) => {
		const keys = Object.keys(steps)
		const to = keys[keys.indexOf(step.value) + n]
		if (to) {
			step.value = to
		}
	}

	const dateChanged = (e) => {
		memberData.value.memberInfo[e.target.name] = e.target.value
	}

	// Page Meta
	const title = $i18n.translate("Register new member")
	useHead({
		title,
		script: [
			{
				// src: "https://cdn.jsdelivr.net/gh/abublihi/datepicker-hijri@v1.1/build/datepicker-hijri.js",
				src: "/libs/datepicker/js/datepicker-hijri.js",
			},
		],
	})
	definePageMeta({
		middleware: "guest",
	})
</script>

<template>
	<div class="my-20">
		<div class="container">
			<!-- Register Member Form -->
			<div class="members-form form">
				<FormKit
					type="form"
					#default="{ value }"
					:plugins="[stepPlugin]"
					@submit="registerMember"
					:actions="false"
					v-model="memberData"
				>
					<ul class="w-full border-b">
						<li
							v-for="(value, key) in steps"
							class="w-full text-center sm:w-auto sm:text-start cursor-pointer inline-block text-sju-50 text-sm px-5 py-3 hover:bg-gray-200 hover:text-sju-50 [&.active]:text-white [&.active]:bg-sju-50 transition dark:text-white dark:hover:bg-sjud-300"
							:class="{ active: step == key }"
							@click="step = key"
							:data-step-active="step == key"
							:data-step-valid="value.valid"
						>
							{{ $translate(value?.label) }}
							<span
								class="bg-red-600 text-white w-5 inline-block text-center rounded-full"
								v-if="checkStepValidity(key)"
							>
								{{ value.errorCount + value.blockingCount }}
							</span>
						</li>
					</ul>

					<div class="pt-10">
						<section v-show="step == 'registration'">
							<FormKit type="group" id="registration" name="registration">
								<h5 class="form-title">
									{{ $translate("Terms and policies") }}
								</h5>
								<ol class="mb-5 [&>li]:flex [&>li]:gap-2 [&>li]:my-2 [&>li]:text-sju-200">
									<li>
										<ic-sharp-check />
										{{ $translate("member_rule1") }}
									</li>

									<li>
										<ic-sharp-check />
										{{ $translate("member_rule2") }}
									</li>

									<li>
										<ic-sharp-check />
										{{ $translate("member_rule3") }}
									</li>

									<li>
										<ic-sharp-check />
										{{ $translate("member_rule4") }}
									</li>

									<li>
										<ic-sharp-check />
										{{ $translate("member_rule5") }}
									</li>

									<li>
										<ic-sharp-check />
										{{ $translate("member_rule6") }}
									</li>
								</ol>

								<FormKit
									type="checkbox"
									:label="$translate('TermsAgreement')"
									:validation-label="$translate('acceptance')"
									validation="required|accepted"
									name="terms_and_agreement"
									:classes="{
										wrapper: {
											'formkit-wrapper': false,
											'w-full flex items-center': true,
										},
										inner: 'mx-1',
										label: { 'text-lg mx-2': true, 'formkit-label': false },
									}"
								></FormKit>

								<hr class="my-10" />

								<!-- Registration -->
								<div v-if="memberData.registration.terms_and_agreement">
									<FormKit
										:label="$translate('ID or residence number')"
										type="number"
										name="national_id"
										id="national_id"
										:classes="{
											outer: 'mb-3',
											inner: 'w-full md:w-6/12 mt-2',
											wrapper: {
												'formkit-wrapper': false,
												'w-full flex flex-col md:flex-row items-center': true,
											},
											label: 'w-full md:w-2/12',
										}"
										:placeholder="$translate('National ID')"
										validation="required:trim|number|length:10,10"
										:validation-label="$translate('National ID')"
									></FormKit>
								</div>
							</FormKit>
						</section>

						<section v-show="step == 'contactInfo'">
							<FormKit id="contactInfo" type="group" name="contactInfo">
								<!-- Mobile -->
								<div class="flex flex-col md:flex-row items-center" data-family="text">
									<label for="mobile" class="formkit-label w-full md:w-2/12">
										{{ $translate("Mobile") }}
									</label>
									<div
										class="input-group [&>.formkit-outer]:mb-0 h-9 w-full md:w-6/12"
										style="border-radius: 5px; box-shadow: 0 0 0 1px #94929c"
									>
										<FormKit
											type="myTextInput"
											outer-class="w-full border border-y-0 m-0"
											id="mobile"
											name="mobile"
											:placeholder="$translate('Mobile')"
											validation="required:trim|number|matches:/^(5)\d{8}$/"
											:validation-label="$translate('Mobile')"
											:validation-messages="{
												matches: $translate('Please enter a valid phone number. eg: 501234567'),
											}"
										></FormKit>
										<span class="prepend">
											<FormKit
												type="mySelect"
												name="mobile_key"
												:options="[{ label: '+966', value: '966' }]"
												style="box-shadow: none"
											></FormKit>
										</span>
									</div>
								</div>
								<!-- Mobile -->
							</FormKit>
						</section>

						<section v-show="step == 'membershipTypes'">
							<FormKit id="membershipTypes" type="group" name="membershipTypes">
								<table class="w-full text-gray-500 dark:text-gray-400 mb-6">
									<thead class="text-xs text-gray-700 uppercase dark:text-gray-400">
										<tr class="md:text-lg">
											<th scope="col" class="py-3 px-6 text-start">
												{{ $translate("Choose the type that fits you") }}
											</th>
											<th scope="col" class="py-3 px-6 text-start">
												{{ $translate("Amount") }}
											</th>
										</tr>
									</thead>
									<tbody class="text-start">
										<tr class="border-b border-gray-200 dark:border-gray-700">
											<td class="py-4 px-6 bg-gray-50 dark:bg-gray-800">
												<!-- Fulltime member -->
												<FormKit
													outer-class="mb-3"
													type="myRadio"
													name="membership_type"
													:options="[
														{
															label: $translate('fulltime_member'),
															value: 1,
														},
													]"
													:validation-label="$translate('fulltime_member')"
													validation="required"
													:classes="{
														options: 'flex items-center',
														option: {
															'formkit-option': false,
														},
														wrapper: 'm-0',
														label: {
															'formkit-label': false,
															'md:text-2xl text-sju-200 font-bold': true,
														},
													}"
													:validation-messages="{
														required: $translate('You have to choose member type'),
													}"
												></FormKit>
												<!-- Fulltime member -->
											</td>
											<td class="py-4 px-6 bg-gray-50 dark:bg-gray-800">
												<span class="md:text-xl text-sju-50 font-bold"
													>250 {{ $translate("Riyal") }}&nbsp;
												</span>
												<span class="font-bold text-xs">{{ $translate("Annual") }}*</span>
											</td>
										</tr>
										<tr class="border-b border-gray-200 dark:border-gray-700">
											<td class="py-4 px-6 bg-gray-50 dark:bg-gray-800" colspan="2">
												<ul class="text-sm md:text-base list-decimal md:mx-7">
													<li>{{ $translate("fulltime_member_desc1") }}</li>
													<li>{{ $translate("fulltime_member_desc2") }}</li>
													<li>{{ $translate("fulltime_member_desc3") }}</li>
												</ul>
											</td>
										</tr>

										<tr class="border-b border-gray-200 dark:border-gray-700">
											<td class="py-4 px-6">
												<!-- Part-time member -->
												<FormKit
													outer-class="mb-3"
													type="myRadio"
													name="membership_type"
													:options="[
														{
															label: $translate('parttime_member'),
															value: 2,
														},
													]"
													:validation-label="$translate('parttime_member')"
													validation="required"
													:classes="{
														options: 'flex items-center',
														option: {
															'formkit-option': false,
														},
														wrapper: 'm-0',
														label: {
															'formkit-label': false,
															'md:text-2xl text-sju-200 font-bold': true,
														},
													}"
													:validation-messages="{
														required: $translate('You have to choose member type'),
													}"
												></FormKit>
												<!-- Part-time member -->
											</td>
											<td class="py-4 px-6">
												<span class="md:text-xl text-sju-50 font-bold"
													>200 {{ $translate("Riyal") }}&nbsp;
												</span>
												<span class="font-bold text-xs">{{ $translate("Annual") }}*</span>
											</td>
										</tr>
										<tr class="border-b border-gray-200 dark:border-gray-700">
											<td class="py-4 px-6" colspan="2">
												<ul class="text-sm md:text-base list-decimal md:mx-7">
													<li>{{ $translate("parttime_member_desc1") }}</li>
													<li>{{ $translate("parttime_member_desc2") }}</li>
												</ul>
											</td>
										</tr>

										<tr class="border-b border-gray-200 dark:border-gray-700">
											<td class="py-4 px-6 bg-gray-50 dark:bg-gray-800">
												<!-- Affiliate member -->
												<FormKit
													outer-class="mb-3"
													type="myRadio"
													name="membership_type"
													:options="[
														{
															label: $translate('affiliate_member'),
															value: 3,
														},
													]"
													:validation-label="$translate('affiliate_member')"
													validation="required"
													:classes="{
														options: 'flex items-center',
														option: {
															'formkit-option': false,
														},
														wrapper: 'm-0',
														label: {
															'formkit-label': false,
															'md:text-2xl text-sju-200 font-bold': true,
														},
													}"
													:validation-messages="{
														required: $translate('You have to choose member type'),
													}"
												>
												</FormKit>
												<!-- Affiliate member -->
											</td>
											<td class="py-4 px-6 bg-gray-50 dark:bg-gray-800">
												<span class="md:text-xl text-sju-50 font-bold"
													>150 {{ $translate("Riyal") }}&nbsp;
												</span>
												<span class="font-bold text-xs">{{ $translate("Annual") }}*</span>
											</td>
										</tr>
										<tr class="border-b border-gray-200 dark:border-gray-700">
											<td class="py-4 px-6 bg-gray-50 dark:bg-gray-800" colspan="2">
												<ul class="text-sm md:text-base list-decimal md:mx-7">
													<li>{{ $translate("affiliate_member_desc1") }}</li>
												</ul>
											</td>
										</tr>
									</tbody>
								</table>

								<FormKit
									:label="$translate('Membership branch')"
									type="select"
									name="branch"
									id="branch"
									:classes="{
										outer: 'mb-3',
										inner: 'w-full md:w-6/12 mt-2',
										wrapper: {
											'formkit-wrapper': false,
											'w-full flex flex-col md:flex-row items-center': true,
										},
										label: 'w-full md:w-2/12',
									}"
									:sections-schema="{
										selectIcon: { $el: null },
									}"
									:options="branches"
									:placeholder="$translate('Membership branch')"
									validation="required"
									:validation-label="$translate('Membership branch')"
								></FormKit>

								<FormKit
									v-if="memberData.membershipTypes.branch == 8"
									:label="$translate('Delivery method')"
									:help="
										$translate(
											'If you choose delivery, 30 riyals will be added to the invoice value.'
										)
									"
									type="select"
									name="delivery_method"
									id="delivery_method"
									:classes="{
										outer: 'mb-3',
										inner: 'w-full md:w-6/12 mt-2',
										wrapper: {
											'formkit-wrapper': false,
											'w-full flex flex-col md:flex-row items-center': true,
										},
										label: 'w-full md:w-2/12',
									}"
									:options="[
										{
											label: $translate('Receipt from the branch'),
											value: 1,
										},
										{
											label: $translate('Delivery'),
											value: 2,
										},
									]"
									:sections-schema="{
										selectIcon: { $el: null },
									}"
									:placeholder="$translate('Delivery method')"
									validation="required"
									:validation-label="$translate('Delivery method')"
								></FormKit>

								<FormKit
									v-if="
										memberData.membershipTypes.branch == 8 &&
										memberData.membershipTypes.delivery_method == 2
									"
									:label="$translate('Delivery Address')"
									type="text"
									name="delivery_address"
									id="delivery_address"
									:classes="{
										outer: 'mb-3',
										inner: 'w-full md:w-6/12 mt-2',
										wrapper: {
											'formkit-wrapper': false,
											'w-full flex flex-col md:flex-row items-center': true,
										},
										label: 'w-full md:w-2/12',
									}"
									:placeholder="$translate('Delivery Address')"
									validation="required:trim"
									:validation-label="$translate('Delivery Address')"
								></FormKit>
							</FormKit>
						</section>
						<section v-show="step == 'memberInfo'">
							<FormKit id="memberInfo" type="group" name="memberInfo">
								<div class="row-of-two mb-7">
									<div class="flex flex-col sm:flex-row items-center">
										<label class="font-bold w-full sm:w-6/12">
											{{ $translate("ID or residence number") }}
										</label>
										<div class="w-full md:w-auto sm:mx-20 text-2xl text-end sm:text-center">
											{{ memberData?.registration.national_id }}
										</div>
									</div>
									<div class="flex flex-col sm:flex-row items-center">
										<label class="font-bold w-full sm:w-6/12">{{ $translate("Mobile") }}</label>
										<div
											class="w-full md:w-auto sm:mx-20 text-2xl text-end sm:text-center"
											v-show="memberData?.contactInfo.mobile"
										>
											966{{ memberData?.contactInfo.mobile }}
										</div>
									</div>
								</div>

								<div class="row-of-two">
									<!-- National ID source -->
									<FormKit
										:label="$translate('ID source')"
										:classes="{
											wrapper: {
												'formkit-wrapper': false,
												'w-full': true,
											},
											outer: 'mb-3',
										}"
										type="text"
										:placeholder="$translate('ID source')"
										name="source"
										:validation-label="$translate('ID source')"
										validation="required:trim"
									></FormKit>
									<!-- National ID source -->

									<!-- National ID date -->
									<FormKit
										:label="`${$translate('ID date')} (${$translate('Hijri')})`"
										:classes="{
											wrapper: {
												'formkit-wrapper': false,
												'w-full': true,
											},
											outer: 'mb-3',
										}"
										:placeholder="$translate('ID date')"
										name="date"
										id="date"
										validation="required"
										:validation-label="$translate('ID date')"
										@change="dateChanged"
									></FormKit>
									<datepicker-hijri
										reference="date"
										placement="bottom"
										date-format="iYYYY/iMM/iDD"
										selected-date="1441/02/01"
									></datepicker-hijri>
									<!-- National ID date -->
								</div>

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

								<div class="row-of-two">
									<!-- Birth date (Milady) -->
									<FormKit
										:label="`${$translate('Birth date')} (${$translate('Milady')})`"
										:classes="{
											wrapper: {
												'formkit-wrapper': false,
												'w-full': true,
											},
											outer: 'mb-3',
											input: 'h-9 text-right',
										}"
										:placeholder="$translate('Birth date')"
										validation="required"
										type="date"
										name="birthday_meladi"
										:validation-label="$translate('Birth date')"
									></FormKit>
									<!-- Birth date (Milady) -->

									<!-- Birth date (Hijri) -->
									<FormKit
										:label="`${$translate('Birth date')} (${$translate('Hijri')})`"
										:classes="{
											wrapper: {
												'formkit-wrapper': false,
												'w-full': true,
											},
											outer: 'mb-3',
										}"
										:placeholder="$translate('Birth date')"
										name="birthday_hijri"
										id="birthday_hijri"
										validation="required"
										:validation-label="$translate('Birth date')"
										@change="dateChanged"
									></FormKit>
									<datepicker-hijri
										reference="birthday_hijri"
										placement="bottom"
										date-format="iYYYY/iMM/iDD"
									></datepicker-hijri>
									<!-- Birth date (Hijri) -->
								</div>

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

								<div class="row-of-two">
									<!-- Qualification -->
									<FormKit
										outer-class="mb-3"
										type="text"
										:label="$translate('Qualification')"
										name="qualification"
										id="qualification"
										:placeholder="$translate('Qualification')"
										validation="required:trim"
										:validation-label="$translate('Qualification')"
										:classes="{
											wrapper: {
												'formkit-wrapper': false,
												'w-full': true,
											},
											outer: 'mb-3',
										}"
									></FormKit>
									<!-- Qualification -->
									<!-- Major -->
									<FormKit
										outer-class="mb-3"
										type="text"
										:label="$translate('Major')"
										name="major"
										id="major"
										:placeholder="$translate('Major')"
										validation="required:trim"
										:validation-label="$translate('Major')"
										:classes="{
											wrapper: {
												'formkit-wrapper': false,
												'w-full': true,
											},
											outer: 'mb-3',
										}"
									></FormKit>
									<!-- Major -->
								</div>

								<div class="grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-4">
									<!-- Job title -->
									<FormKit
										:label="`${$translate('Job title')} (${$translate('Journalist')})`"
										type="text"
										:placeholder="$translate('Job title')"
										name="journalist_job_title"
										:validation-label="$translate('Job title')"
										validation="required:trim"
										:classes="{
											wrapper: {
												'formkit-wrapper': false,
												'w-full': true,
											},
											outer: 'mb-3',
										}"
									></FormKit>
									<!-- Job title -->

									<!-- Employer -->
									<FormKit
										:label="$translate('Employer')"
										type="text"
										:placeholder="$translate('Employer')"
										name="journalist_employer"
										:validation-label="$translate('Employer')"
										validation="required:trim"
										:classes="{
											wrapper: {
												'formkit-wrapper': false,
												'w-full': true,
											},
											outer: 'mb-3',
										}"
									></FormKit>
									<!-- Employer -->

									<!-- News paper type -->
									<FormKit
										:label="$translate('Newspaper type')"
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
										:options="[
											{
												label: $translate('Printed newspaper'),
												value: 1,
											},
											{
												label: $translate('E-newspaper'),
												value: 2,
											},
										]"
										name="newspaper_type"
										:validation-label="$translate('Newspaper type')"
										validation="required"
									></FormKit>
									<!-- News paper type -->
								</div>

								<div class="row-of-two">
									<!-- Job title -->
									<FormKit
										:label="`${$translate('Job title')} (${$translate('Non-Journalist')})`"
										type="text"
										:placeholder="$translate('Job title')"
										name="job_title"
										:validation-label="$translate('Job title')"
										validation="required:trim"
										:classes="{
											wrapper: {
												'formkit-wrapper': false,
												'w-full': true,
											},
											outer: 'mb-3',
										}"
									></FormKit>
									<!-- Job title -->

									<!-- Employer -->
									<FormKit
										:label="$translate('Employer')"
										type="text"
										:placeholder="$translate('Employer')"
										name="employer"
										:validation-label="$translate('Employer')"
										validation="required:trim"
										:classes="{
											wrapper: {
												'formkit-wrapper': false,
												'w-full': true,
											},
											outer: 'mb-3',
										}"
									></FormKit>
									<!-- Employer -->
								</div>

								<div class="row-of-two">
									<!-- Work phone -->
									<FormKit
										:label="$translate('Work phone')"
										type="text"
										:placeholder="$translate('Work phone')"
										name="worktel"
										:validation-label="$translate('Work phone')"
										validation="required:trim|number"
										:classes="{
											wrapper: {
												'formkit-wrapper': false,
												'w-full': true,
											},
											outer: 'mb-3',
										}"
									></FormKit>
									<!-- Work phone -->

									<!-- Ext -->
									<FormKit
										:label="$translate('Ext')"
										type="text"
										:placeholder="$translate('Ext')"
										name="worktel_ext"
										:validation-label="$translate('Ext')"
										validation="required:trim|number"
										:classes="{
											wrapper: {
												'formkit-wrapper': false,
												'w-full': true,
											},
											outer: 'mb-3',
										}"
									></FormKit>
									<!-- Ext -->
								</div>

								<div class="row-of-two">
									<!-- Fax -->
									<FormKit
										:label="$translate('Fax')"
										type="text"
										:placeholder="$translate('Fax')"
										name="fax"
										:validation-label="$translate('Fax')"
										validation="required:trim|number"
										:classes="{
											wrapper: {
												'formkit-wrapper': false,
												'w-full': true,
											},
											outer: 'mb-3',
										}"
									></FormKit>
									<!-- Fax -->

									<!-- Ext -->
									<FormKit
										:label="$translate('Ext')"
										type="text"
										:placeholder="$translate('Ext')"
										name="fax_ext"
										:validation-label="$translate('Ext')"
										validation="required:trim|number"
										:classes="{
											wrapper: {
												'formkit-wrapper': false,
												'w-full': true,
											},
											outer: 'mb-3',
										}"
									></FormKit>
									<!-- Ext -->
								</div>

								<div class="grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-4">
									<!-- Post box -->
									<FormKit
										:label="$translate('Post box')"
										type="text"
										:placeholder="$translate('Post box')"
										name="post_box"
										:validation-label="$translate('Post box')"
										validation="required:trim|number"
										:classes="{
											wrapper: {
												'formkit-wrapper': false,
												'w-full': true,
											},
											outer: 'mb-3',
										}"
									></FormKit>
									<!-- Post box -->

									<!-- Post code -->
									<FormKit
										:label="$translate('Post code')"
										type="text"
										:placeholder="$translate('Post code')"
										name="post_code"
										:validation-label="$translate('Post code')"
										validation="required:trim|number"
										:classes="{
											wrapper: {
												'formkit-wrapper': false,
												'w-full': true,
											},
											outer: 'mb-3',
										}"
									></FormKit>
									<!-- Post code -->

									<!-- City -->
									<FormKit
										:label="$translate('City')"
										type="text"
										:placeholder="$translate('City')"
										name="city"
										:validation-label="$translate('City')"
										validation="required:trim"
										:classes="{
											wrapper: {
												'formkit-wrapper': false,
												'w-full': true,
											},
											outer: 'mb-3',
										}"
									></FormKit>
									<!-- City -->
								</div>
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
							</FormKit>
						</section>

						<section v-show="step == 'loginInfo'">
							<FormKit id="loginInfo" type="group" name="loginInfo">
								<div class="flex flex-col sm:flex-row items-center w-full md:w-1/2 mb-7">
									<label class="font-bold w-full sm:w-6/12">
										{{ $translate("ID or residence number") }}
									</label>
									<div class="w-full md:w-auto sm:mx-20 text-2xl text-end sm:text-center">
										{{ memberData.registration.national_id }}
									</div>
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
							</FormKit>
						</section>

						<section v-show="step == 'review'">
							<FormKit id="review" type="group" name="review">
								<!-- ID and mobile -->
								<div class="row-of-two mb-7">
									<div class="flex flex-col sm:flex-row items-center">
										<label class="font-bold w-full sm:w-6/12">
											{{ $translate("ID or residence number") }}
										</label>
										<div class="w-full md:w-auto sm:mx-20 text-2xl text-end sm:text-center">
											{{ memberData.registration.national_id }}
										</div>
									</div>
									<div class="flex flex-col sm:flex-row items-center">
										<label class="font-bold w-full sm:w-6/12">{{ $translate("Mobile") }}</label>
										<div
											class="w-full md:w-auto sm:mx-20 text-2xl text-end sm:text-center"
											v-show="memberData.contactInfo.mobile"
										>
											966{{ memberData.contactInfo.mobile }}
										</div>
									</div>
								</div>
								<!-- ID and mobile -->

								<!-- Membership type and branch -->
								<div class="row-of-two mb-7">
									<div class="flex flex-col sm:flex-row items-center">
										<label class="font-bold w-full sm:w-6/12">
											{{ $translate("Membership type") }}
										</label>
										<div class="w-full md:w-auto sm:mx-auto text-2xl text-end sm:text-center">
											{{
												membershipTypes[memberData.membershipTypes?.membership_type]?.label ||
												""
											}}
										</div>
									</div>
									<div class="flex flex-col sm:flex-row items-center">
										<label class="font-bold w-full sm:w-6/12">{{ $translate("Branch") }}</label>
										<div class="w-full md:w-auto sm:mx-20 text-2xl text-end sm:text-center">
											{{
												branches.find((b) => b.__original == memberData.membershipTypes?.branch)
													?.label
											}}
										</div>
									</div>
								</div>
								<!-- Membership type and branch -->

								<!-- Name fields (Arabic) -->
								<div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2 md:gap-4 my-4">
									<div>
										<label>{{ `${$translate("fname")} (${$translate("In Arabic")})` }}</label>
										<h5>
											{{ memberData.memberInfo.fname_ar }}
										</h5>
									</div>

									<div>
										<label>{{ `${$translate("sname")} (${$translate("In Arabic")})` }}</label>
										<h5>
											{{ memberData.memberInfo.sname_ar }}
										</h5>
									</div>

									<div>
										<label>{{ `${$translate("tname")} (${$translate("In Arabic")})` }}</label>
										<h5>
											{{ memberData.memberInfo.tname_ar }}
										</h5>
									</div>

									<div>
										<label>{{ `${$translate("lname")} (${$translate("In Arabic")})` }}</label>
										<h5>
											{{ memberData.memberInfo.lname_ar }}
										</h5>
									</div>
								</div>
								<!-- Name fields -->

								<!-- Name fields (English) -->
								<div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2 md:gap-4 my-4">
									<div>
										<label>{{ `${$translate("fname")} (${$translate("In English")})` }}</label>
										<h5>
											{{ memberData.memberInfo.fname_en }}
										</h5>
									</div>

									<div>
										<label>{{ `${$translate("sname")} (${$translate("In English")})` }}</label>
										<h5>
											{{ memberData.memberInfo.sname_en }}
										</h5>
									</div>

									<div>
										<label>{{ `${$translate("tname")} (${$translate("In English")})` }}</label>
										<h5>
											{{ memberData.memberInfo.tname_en }}
										</h5>
									</div>

									<div>
										<label>{{ `${$translate("lname")} (${$translate("In English")})` }}</label>
										<h5>
											{{ memberData.memberInfo.lname_en }}
										</h5>
									</div>
								</div>
								<!-- Name fields -->

								<!-- Gender -->
								<div class="my-4">
									<label class="font-bold w-6/12 md:w-3/12">{{ $translate("Gender") }}</label>
									<h5 class="inline">
										{{
											genders.find((gender) => gender.__original == memberData.memberInfo.gender)
												?.label
										}}
									</h5>
								</div>
								<!-- Gender -->

								<!-- Birthday hijri and miladi -->
								<div class="row-of-two my-4">
									<div>
										<label class="font-bold w-6/12">
											{{ `${$translate("Birth date")} (${$translate("Hijri")})` }}
										</label>
										<h5 class="inline">
											{{ memberData.memberInfo.birthday_meladi }}
										</h5>
									</div>
									<div>
										<label class="font-bold w-6/12">
											{{ `${$translate("Birth date")} (${$translate("Milady")})` }}
										</label>
										<h5 class="inline">
											{{ memberData.memberInfo.birthday_meladi }}
										</h5>
									</div>
								</div>
								<!-- Birthday hijri and miladi -->

								<!-- Nationality -->
								<div class="my-4">
									<label class="font-bold w-6/12 md:w-3/12">{{ $translate("Nationality") }}</label>
									<h5 class="inline">
										{{
											nationalities.find((c) => c.value == memberData.memberInfo.nationality)
												.label
										}}
									</h5>
								</div>
								<!-- Nationality -->

								<!-- Qualification and Major -->
								<div class="row-of-two my-4">
									<div>
										<label class="font-bold w-6/12">
											{{ $translate("Qualification") }}
										</label>
										<h5 class="inline">
											{{ memberData.memberInfo.qualification }}
										</h5>
									</div>
									<div>
										<label class="font-bold w-6/12">
											{{ $translate("Major") }}
										</label>
										<h5 class="inline">
											{{ memberData.memberInfo.major }}
										</h5>
									</div>
								</div>
								<!-- Qualification and Major -->

								<!-- Job title and Employer -->
								<div class="row-of-two my-4">
									<div>
										<label class="font-bold w-6/12">
											{{ `${$translate("Job title")} (${$translate("Journalist")})` }}
										</label>
										<h5 class="inline">
											{{ memberData.memberInfo.journalist_job_title }}
										</h5>
									</div>
									<div>
										<label class="font-bold w-6/12">
											{{ $translate("Employer") }}
										</label>
										<h5 class="inline">
											{{ memberData.memberInfo.journalist_employer }}
										</h5>
									</div>
								</div>
								<!-- Job title and Employer -->

								<!-- Job title and Employer (Non journalist) -->
								<div class="row-of-two my-4">
									<div>
										<label class="font-bold w-6/12">
											{{ `${$translate("Job title")} (${$translate("Non-Journalist")})` }}
										</label>
										<h5 class="inline">
											{{ memberData.memberInfo.job_title }}
										</h5>
									</div>
									<div>
										<label class="font-bold w-6/12">
											{{ $translate("Employer") }}
										</label>
										<h5 class="inline">
											{{ memberData.memberInfo.employer }}
										</h5>
									</div>
								</div>
								<!-- Job title and Employer -->

								<!-- Work phone -->
								<div class="row-of-two my-4">
									<div>
										<label class="font-bold w-6/12">
											{{ $translate("Work phone") }}
										</label>
										<h5 class="inline">
											{{ memberData.memberInfo.worktel }}
										</h5>
									</div>
									<div>
										<label class="font-bold w-6/12">
											{{ $translate("Ext") }}
										</label>
										<h5 class="inline">
											{{ memberData.memberInfo.worktel_ext }}
										</h5>
									</div>
								</div>
								<!-- Work phone -->

								<!-- Fax -->
								<div class="row-of-two my-4">
									<div>
										<label class="font-bold w-6/12">
											{{ $translate("Fax") }}
										</label>
										<h5 class="inline">
											{{ memberData.memberInfo.fax }}
										</h5>
									</div>
									<div>
										<label class="font-bold w-6/12">
											{{ $translate("Ext") }}
										</label>
										<h5 class="inline">
											{{ memberData.memberInfo.fax_ext }}
										</h5>
									</div>
								</div>
								<!-- Fax -->

								<!-- Post address -->
								<div class="grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-4 my-4">
									<!-- Post box -->
									<div>
										<label class="font-bold w-6/12">
											{{ $translate("Post box") }}
										</label>
										<h5 class="inline">
											{{ memberData.memberInfo.post_box }}
										</h5>
									</div>
									<!-- Post box -->

									<!-- Post code -->
									<div>
										<label class="font-bold w-6/12">
											{{ $translate("Post code") }}
										</label>
										<h5 class="inline">
											{{ memberData.memberInfo.post_code }}
										</h5>
									</div>
									<!-- Post code -->

									<!-- City -->
									<div>
										<label class="font-bold w-6/12">
											{{ $translate("City") }}
										</label>
										<h5 class="inline">
											{{ memberData.memberInfo.city }}
										</h5>
									</div>
									<!-- City -->
								</div>
								<!-- Post address -->

								<!-- Email address -->
								<div class="my-4">
									<label class="font-bold w-6/12 md:w-3/12">{{ $translate("Email") }}</label>
									<h5 class="inline">
										{{ memberData.memberInfo.email }}
									</h5>
								</div>
								<!-- Email address -->

								<FormKit
									type="checkbox"
									:label="$translate('membership_agreement')"
									:validation-label="$translate('acceptance')"
									validation="required|accepted"
									name="terms_and_agreement"
									:classes="{
										wrapper: {
											'formkit-wrapper': false,
											'w-full flex items-center': true,
										},
										inner: 'mx-1',
										outer: 'my-4',
									}"
								></FormKit>
							</FormKit>
						</section>

						<!-- Steps Navigation -->
						<div class="flex justify-between items-center mt-10">
							<button class="btn" :disabled="step == 'registration'" @click.prevent="setStep(-1)">
								{{ $translate("Prev") }}
							</button>
							<button class="btn" v-if="step !== 'review'" @click.prevent="setStep(1)">
								{{ $translate("Next") }}
							</button>
							<!-- Submit button -->
							<button class="btn-primary" type="submit" v-if="step == 'review'">
								{{ $translate("Register") }}
							</button>
						</div>
					</div>
				</FormKit>
			</div>
		</div>
	</div>
</template>
