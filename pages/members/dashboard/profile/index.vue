<script setup>
	import { storeToRefs } from "pinia"
	import { useAuthStore } from "~~/stores/authStore"
	import { useMemberStore } from "~~/stores/memberStore"

	const { genders, nationalities } = useSiteConfig()

	const authStore = useAuthStore()
	const { userData } = storeToRefs(authStore)

	const profileData = ref({})
	const toast = useToast()
	const memberStore = useMemberStore()

	const updateMember = async (body, node) => {
		const { error } = await memberStore.updateMember(body)
		// On errors
		if (error?.value?.response?.status === 400) {
			node.setErrors(error.value?.data)
		} else if (error?.value?.response?.status === 422) {
			toast.error(error.value?.data?.message)
		}
	}

	const dateChanged = (e) => {
		profileData.value[e.target.name] = e.target.value
	}

	const { $i18n } = useNuxtApp()
	// Page Meta
	const title = $i18n.translate("Edit profile")
	useHead({
		title,
		script: [
			{
				src: "/libs/datepicker/js/datepicker-hijri.js",
			},
		],
	})

	definePageMeta({
		middleware: "member",
	})
</script>

<template>
	<div>
		<members-profile-nav active="info" />

		<div class="form">
			<div class="form-title font-semibold">{{ $translate("Edit profile") }}</div>
			<FormKit
				type="form"
				v-model="profileData"
				v-if="Object.keys(userData).length"
				:actions="false"
				@submit="updateMember"
			>
				<!-- National ID & mobile -->
				<div class="row-of-two mb-5">
					<div>
						<label class="w-6/12">{{ $translate("National ID") }}</label>
						<h5 class="text-sju-50 font-bold inline-block">{{ userData.national_id }}</h5>
					</div>
					<div>
						<label class="w-6/12">{{ $translate("Mobile") }}</label>
						<h5 class="text-sju-50 font-bold inline-block">{{ userData.mobile }}</h5>
					</div>
				</div>
				<!-- National ID & mobile -->

				<!-- ID source and date -->
				<div class="row-of-two">
					<FormKit
						:label="$translate('ID source')"
						type="text"
						name="source"
						:validation-label="$translate('ID source')"
						validation="required"
						:value="userData?.source"
					/>
					<FormKit
						:label="$translate('ID date')"
						type="text"
						name="date"
						id="date"
						:validation-label="$translate('ID date')"
						validation="required"
						:value="userData?.date"
						@change="dateChanged"
					/>
					<datepicker-hijri
						reference="date"
						placement="bottom"
						date-format="iYYYY/iMM/iDD"
						:selected-date="userData?.date"
					></datepicker-hijri>
				</div>
				<!-- ID source and date -->

				<!-- Full name fields -->
				<div class="flex flex-wrap gap-y-5 mb-8">
					<div class="w-6/12 sm:w-3/12">
						<label>{{ $translate("fname") }}</label>
						<h4 class="text-sju-50">{{ userData.fname_ar }}</h4>
					</div>
					<div class="w-6/12 sm:w-3/12">
						<label>{{ $translate("sname") }}</label>
						<h4 class="text-sju-50">{{ userData.sname_ar }}</h4>
					</div>
					<div class="w-6/12 sm:w-3/12">
						<label>{{ $translate("tname") }}</label>
						<h4 class="text-sju-50">{{ userData.tname_ar }}</h4>
					</div>
					<div class="w-6/12 sm:w-3/12">
						<label>{{ $translate("lname") }}</label>
						<h4 class="text-sju-50">{{ userData.lname_ar }}</h4>
					</div>
				</div>
				<!-- Full name fields -->

				<!-- Full name fields (In English) -->
				<div class="flex flex-wrap gap-y-5 mb-8">
					<div class="w-6/12 sm:w-3/12">
						<label>{{ `${$translate("fname")} (${$translate("In English")})` }}</label>
						<h4 class="text-sju-50">{{ userData.fname_en }}</h4>
					</div>
					<div class="w-6/12 sm:w-3/12">
						<label>{{ `${$translate("sname")} (${$translate("In English")})` }}</label>
						<h4 class="text-sju-50">{{ userData.sname_en }}</h4>
					</div>
					<div class="w-6/12 sm:w-3/12">
						<label>{{ `${$translate("tname")} (${$translate("In English")})` }}</label>
						<h4 class="text-sju-50">{{ userData.tname_en }}</h4>
					</div>
					<div class="w-6/12 sm:w-3/12">
						<label>{{ `${$translate("lname")} (${$translate("In English")})` }}</label>
						<h4 class="text-sju-50">{{ userData.lname_en }}</h4>
					</div>
				</div>
				<!-- Full name fields -->

				<!-- Gender -->
				<div class="flex flex-wrap mb-8">
					<label class="w-full sm:w-2/12">{{ $translate("Gender") }}</label>
					<div class="w-full sm:w-10/12">
						<h5 class="text-sju-50">{{ genders[userData?.gender].label }}</h5>
					</div>
				</div>
				<!-- Gender -->

				<!-- Date Hijri & Miladi -->
				<div class="row-of-two mb-5">
					<div>
						<label class="w-6/12">{{ `${$translate("Birth date")} (${$translate("Hijri")})` }}</label>
						<h5 class="text-sju-50 inline-block">{{ userData.birthday_hijri }}</h5>
					</div>
					<div>
						<label class="w-6/12">{{ `${$translate("Birth date")} (${$translate("Milady")})` }}</label>
						<h5 class="text-sju-50 inline-block">{{ userData.birthday_meladi }}</h5>
					</div>
				</div>
				<!-- Date Hijri & Miladi -->

				<!-- Nationality -->
				<div class="flex flex-wrap mb-8">
					<label class="w-full sm:w-2/12">{{ $translate("Nationality") }}</label>
					<div class="w-full sm:w-10/12">
						<h5 class="text-sju-50">
							{{ nationalities.find((c) => c.value === userData.nationality).label }}
						</h5>
					</div>
				</div>
				<!-- Nationality -->

				<!-- Qualification & Major -->
				<div class="row-of-two">
					<FormKit
						:label="$translate('Qualification')"
						type="text"
						name="qualification"
						:validation-label="$translate('Qualification')"
						validation="required"
						:value="userData?.qualification"
					/>
					<FormKit
						:label="$translate('Major')"
						type="text"
						name="major"
						:validation-label="$translate('Major')"
						validation="required"
						:value="userData?.major"
					/>
				</div>
				<!-- Qualification & Major -->

				<!-- Journalism data -->
				<div class="flex flex-wrap gap-y-5 mb-8">
					<div class="w-full sm:w-4/12 pr-5 rtl:pl-5 rtl:pr-0">
						<FormKit
							:label="`${$translate('Job title')} (${$translate('Journalist')})`"
							type="text"
							name="journalist_job_title"
							:validation-label="$translate('Job title')"
							validation="required"
							:value="userData?.journalist_job_title"
						/>
					</div>
					<div class="w-full sm:w-4/12 pr-5 rtl:pl-5 rtl:pr-0">
						<FormKit
							:label="$translate('Employer')"
							type="text"
							name="journalist_employer"
							:validation-label="$translate('Employer')"
							validation="required"
							:value="userData?.journalist_employer"
						/>
					</div>
					<div class="w-full sm:w-4/12 pr-5 rtl:pl-5 rtl:pr-0">
						<FormKit
							type="select"
							:classes="{
								outer: 'w-full',
							}"
							:sections-schema="{
								selectIcon: { $el: null },
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
							:label="$translate('Newspaper type')"
							:validation-label="$translate('Newspaper type')"
							validation="required"
							:value="userData?.newspaper_type"
						/>
					</div>
				</div>
				<!-- Journalism data -->

				<!-- Non-Journalism data -->
				<div class="row-of-two">
					<FormKit
						:label="`${$translate('Job title')} (${$translate('Non-Journalist')})`"
						type="text"
						name="job_title"
						:validation-label="$translate('Job title')"
						validation="required"
						:value="userData?.job_title"
					/>
					<FormKit
						:label="$translate('Employer')"
						type="text"
						name="employer"
						:validation-label="$translate('Employer')"
						validation="required"
						:value="userData?.employer"
					/>
				</div>
				<!-- Non-Journalism data -->

				<!-- Worktel -->
				<div class="row-of-two">
					<FormKit
						:label="$translate('Work phone')"
						type="text"
						name="worktel"
						:validation-label="$translate('Work phone')"
						validation="required"
						:value="userData?.worktel"
					/>
					<FormKit
						:label="$translate('Ext')"
						type="text"
						name="worktel_ext"
						:validation-label="$translate('Ext')"
						validation="required"
						:value="userData?.worktel_ext"
					/>
				</div>
				<!-- Worktel -->

				<!-- Fax -->
				<div class="row-of-two">
					<FormKit
						:label="$translate('Fax')"
						type="text"
						name="fax"
						:validation-label="$translate('Fax')"
						validation="required"
						:value="userData?.fax"
					/>
					<FormKit
						:label="$translate('Ext')"
						type="text"
						name="fax_ext"
						:validation-label="$translate('Ext')"
						validation="required"
						:value="userData?.fax_ext"
					/>
				</div>
				<!-- Fax -->

				<!-- Postal address -->
				<div class="flex flex-wrap gap-y-5 mb-8">
					<div class="w-full sm:w-4/12 pr-5 rtl:pl-5 rtl:pr-0">
						<FormKit
							:label="$translate('Post box')"
							type="text"
							name="post_box"
							:validation-label="$translate('Post box')"
							validation="required"
							:value="userData?.post_box"
						/>
					</div>
					<div class="w-full sm:w-4/12 pr-5 rtl:pl-5 rtl:pr-0">
						<FormKit
							:label="$translate('Post code')"
							type="text"
							name="post_code"
							:validation-label="$translate('Post code')"
							validation="required"
							:value="userData?.post_code"
						/>
					</div>
					<div class="w-full sm:w-4/12 pr-5 rtl:pl-5 rtl:pr-0">
						<FormKit
							:label="$translate('City')"
							type="text"
							name="city"
							:validation-label="$translate('City')"
							validation="required"
							:value="userData?.city"
						/>
					</div>
				</div>
				<!-- Postal address -->

				<!-- Email address -->
				<div class="flex flex-wrap mb-8">
					<label class="w-full sm:w-2/12">{{ $translate("Email") }}</label>
					<div class="w-full sm:w-10/12">
						<FormKit
							type="email"
							name="email"
							:validation-label="$translate('Email')"
							validation="required"
							:value="userData?.email"
						/>
					</div>
				</div>
				<!-- Email address -->

				<!-- Delivery method -->
				<div class="flex flex-wrap mb-8" v-if="userData?.branch === 8">
					<label class="w-full sm:w-2/12">{{ $translate("Delivery method") }}</label>
					<div class="w-full sm:w-10/12">
						<FormKit
							:help="$translate('If you choose delivery, 30 riyals will be added to the invoice value.')"
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
							:value="userData?.delivery_method"
						></FormKit>
					</div>
				</div>
				<!-- Delivery method -->

				<!-- Delivery Address -->
				<div class="flex flex-wrap mb-8" v-if="userData?.branch === 8 && profileData.delivery_method === 2">
					<label class="w-full sm:w-2/12">{{ $translate("Delivery method") }}</label>
					<div class="w-full sm:w-10/12">
						<FormKit
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
							:value="userData?.delivery_address"
						></FormKit>
					</div>
				</div>

				<!-- Delivery Address -->

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

<style>
	.formkit-label {
		font-weight: normal !important;
	}
</style>
