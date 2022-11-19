<script setup>
	import { storeToRefs } from "pinia"
	import { useAuthStore } from "~~/stores/authStore"
	import { useMemberStore } from "~~/stores/memberStore"

	const { $i18n } = useNuxtApp()
	const authStore = useAuthStore()
	await authStore.initAuth()
	const { userData } = storeToRefs(authStore)

	if (
		userData.value.active !== 1 ||
		userData.value.approved !== 1 ||
		(userData.value.subscription.status === 1 && new Date(userData.value.subscription.end_date) > new Date())
	) {
		// Redirect him back to membership management
		useRouter().push("/members/dashboard/membership")
	}

	const memberStore = useMemberStore()
	const { membershipTypes } = useSiteConfig()
	const config = useRuntimeConfig()

	const today = computed(() => {
		return new Date().toISOString().split("T")[0]
	})
	const amount = computed(() => {
		let extra = 0
		if (userData.value.branch === 8 && userData.value.delivery_method === 2) {
			extra = 30
		}
		return membershipTypes.find((c) => c.value === userData.value.subscription.type).price + extra
	})

	const payment_gateway = ref(false)
	const paytype = ref(null)

	const endpoint = config.public.baseURL + "members/membership/payment/response"

	const paymentGatway = async (body, node) => {
		// Perform an api request to get the payment request ID
		const { data } = await memberStore.prepareGateway(body.card)
		console.log(data.value.id)
		payment_gateway.value = data.value.id
		paytype.value = body.card

		useHead({
			script: [
				{
					children: "var wpwlOptions = { style:'plain', locale: 'ar', brandDetection: true }",
				},
				{
					src: `https://test.oppwa.com/v1/paymentWidgets.js?checkoutId=${data.value.id}`,
					body: true,
				},
			],
		})
	}

	// Page Meta
	const title = $i18n.translate("Subscribing to membership")
	useHead({
		title,
	})

	definePageMeta({
		middleware: ["member", "complete"],
	})
</script>

<template>
	<div class="form">
		<h6 class="form-title font-semibold">{{ $translate("Subscribing to membership") }}</h6>

		<div class="w-full md:w-1/2">
			<div class="flex justify-between mb-2">
				<span class="text-sm md:text-base font-semibold">{{ $translate("Membership type") }}:</span>
				<span class="text-sm md:text-base font-semibold text-sju-50">
					{{ membershipTypes.find((c) => c.value === userData.subscription.type).label }}
				</span>
			</div>

			<!-- Subscription Start -->
			<div class="flex justify-between mb-2">
				<span class="text-sm md:text-base font-semibold">{{ $translate("Subscription start") }}:</span>
				<span class="text-sm md:text-base font-semibold"> {{ today }}</span>
			</div>

			<!-- Subscription End -->
			<div class="flex justify-between mb-2">
				<span class="text-sm md:text-base font-semibold">{{ $translate("Subscription end") }}:</span>
				<span class="text-sm md:text-base font-semibold"> {{ `${new Date().getFullYear()}-12-31` }}</span>
			</div>

			<!-- Amount -->
			<div class="flex justify-between mb-2">
				<span class="text-sm md:text-base font-semibold">{{ $translate("Amount") }}:</span>
				<span class="text-sm md:text-base font-semibold text-sju-50">
					{{ `${amount} ${$translate("Riyal")}` }}</span
				>
			</div>
		</div>

		<!-- Choose Gateway Form -->
		<div v-if="payment_gateway === false">
			<FormKit type="form" :actions="false" @submit="paymentGatway">
				<div class="w-full md:w-1/2">
					<!-- Card type -->
					<FormKit
						outer-class="mb-2"
						type="myRadio"
						name="card"
						:label="$translate('Card type')"
						:options="[
							{
								label: 'MADA',
								value: 2,
							},
							{
								label: 'VISA',
								value: 1,
							},
						]"
						:validation-label="$translate('Card type')"
						validation="required"
						:classes="{
							options: 'flex items-center',
							option: {
								'formkit-option': false,
							},
							inner: 'm-3',
						}"
					>
						<template #label="context">
							<img
								src="/images/pay-mada.png"
								alt="MADA"
								width="60"
								v-if="context.option.label === 'MADA'"
							/>
							<img
								src="/images/pay-mastercard.png"
								alt="MASTERCARD"
								width="40"
								v-if="context.option.label === 'VISA'"
							/>
							<img
								src="/images/pay-visa.png"
								alt="VISA"
								width="40"
								v-if="context.option.label === 'VISA'"
							/>
						</template>
					</FormKit>
					<!-- Card type -->
				</div>

				<hr class="my-5" />

				<!-- Terms and policies -->
				<h6 class="form-title font-semibold">{{ $translate("Terms and policies") }}</h6>
				<ul class="list-decimal pl-10 rtl:pl-0 rtl:pr-10">
					<li class="mb-1">{{ $translate("payment_condition1") }}</li>
					<li class="mb-1">{{ $translate("payment_condition2") }}</li>
					<li class="mb-1">{{ $translate("payment_condition3") }}</li>
				</ul>
				<!-- Terms and policies -->

				<hr class="my-5" />

				<!-- Payment details -->
				<h6 class="form-title font-semibold">{{ $translate("Payment details") }}</h6>
				<ul class="list-decimal pl-10 rtl:pl-0 rtl:pr-10 mb-5">
					<li class="mb-1">
						{{
							`${membershipTypes.find((c) => c.value === userData.subscription.type).price} ${$translate(
								"Riyal"
							)} ${$translate("for membership")}: ${
								membershipTypes.find((c) => c.value === userData.subscription.type).label
							}`
						}}
					</li>
					<li class="mb-1" v-if="userData.branch === 8 && userData.delivery_method === 2">
						{{ `30 ${$translate("Riyal")} ${$translate("card delivery fees")}` }}
					</li>
				</ul>
				<!-- Payment details -->

				<FormKit
					type="checkbox"
					:label="$translate('TermsAgreement')"
					:validation-label="$translate('acceptance')"
					validation="required|accepted"
					:classes="{
						wrapper: {
							'formkit-wrapper': false,
							'w-full flex items-center': true,
						},
						inner: 'mx-3',
						label: {
							'formkit-label': false,
							'font-semibold text-sm text-sju-50': true,
						},
					}"
				/>
				<div class="text-end">
					<button type="submit" class="btn-primary">
						<!-- I STOPPED HERE -->
						{{ $translate("Complete payment") }}
					</button>
				</div>
			</FormKit>
		</div>
		<!-- Choose Gateway Form -->

		<!-- Payment Gateway -->
		<div v-else class="my-5 shadow-lg border py-10">
			<form
				:action="endpoint"
				class="paymentWidgets"
				:data-brands="paytype === 2 ? 'MADA' : 'VISA MASTER'"
			></form>
		</div>
		<!-- Payment Gateway -->
	</div>
</template>

<style>
	.wpwl-control {
		direction: ltr !important;
	}
	.wpwl-button {
		background: green !important;
	}
</style>
