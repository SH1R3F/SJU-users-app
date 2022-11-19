<script setup>
	import { storeToRefs } from "pinia"
	import { useAuthStore } from "~~/stores/authStore"
	import { useMemberStore } from "~~/stores/memberStore"

	const { $i18n } = useNuxtApp()
	const authStore = useAuthStore()

	await authStore.initAuth()

	const { userData } = storeToRefs(authStore)

	const memberStore = useMemberStore()

	const { membershipTypes } = useSiteConfig()

	const refusalReason = () => {
		const toast = useToast()
		toast.error(
			userData.value.refusal_reason === "unsatisfy"
				? $i18n.translate("Unsatisfied conditions")
				: userData.value.refusal_reason
		)
	}

	// Payment status if he's redirected from payment !
	const route = useRoute()
	const toast = useToast()
	if (route.query?.payment == "success") {
		toast.success($i18n.translate("Successful payment"))
	} else if (route.query?.payment == "pending") {
		toast.warning($i18n.translate("Payment is pending"))
	} else if (route.query?.payment == "refused") {
		toast.error($i18n.translate("Payment refused"))
	}

	// Page Meta
	const title = $i18n.translate("Membership")
	useHead({
		title,
	})

	definePageMeta({
		middleware: ["member", "complete"],
	})
</script>

<template>
	<div class="form">
		<div class="form-title font-semibold">{{ $translate("Authority membership") }}</div>

		<div class="overflow-x-auto relative shadow-md sm:rounded-lg">
			<table class="w-full text-sm text-gray-500 dark:text-gray-400">
				<thead class="text-xs text-gray-700 uppercase dark:text-gray-400 border-b">
					<tr>
						<th scope="col" class="py-3 px-6">{{ $translate("Membership type") }}</th>
						<th scope="col" class="py-3 px-6">{{ $translate("Subscription start") }}</th>
						<th scope="col" class="py-3 px-6">{{ $translate("Subscription end") }}</th>
						<th scope="col" class="py-3 px-6">{{ $translate("Status") }}</th>
					</tr>
				</thead>
				<tbody class="text-center">
					<tr class="border-b border-gray-200 dark:border-gray-700">
						<td class="py-4 px-6">
							{{ membershipTypes.find((c) => c.value === userData.subscription.type).label }}
						</td>
						<td class="py-4 px-6">
							{{ userData.subscription.start_date || "#" }}
						</td>
						<td class="py-4 px-6">
							{{ userData.subscription.end_date || "#" }}
						</td>
						<td class="py-4 px-6">
							<!-- MEMBERSHIP STATUS -->
							<template v-if="userData.approved === -2">
								<span class="underline cursor-pointer" @click="refusalReason">
									{{ $translate("Refused") }}
								</span>
								&nbsp;
								<button class="btn" @click="memberStore.applyMembership()">
									{{ $translate("Resend") }}
								</button>
							</template>
							<template v-else-if="userData.approved === null && !userData.membership_number">
								<button class="btn-primary" @click="memberStore.applyMembership()">
									{{ $translate("Request membership") }}
								</button>
							</template>
							<template v-else-if="userData.active === -1 && userData.approved === 0">
								{{ $translate("Waiting branch approval") }}
							</template>
							<template v-else-if="userData.active === -1 && userData.approved === 1">
								{{ $translate("Waiting admin approval") }}
							</template>
							<template v-else-if="userData.active === 1 && userData.approved === 1">
								<!-- Member is active. Now we go through payment checks  -->
								<template v-if="userData.subscription.status === 1">
									<template v-if="new Date(userData.subscription.end_date) < new Date()">
										<!-- Subscription Ended! -->
										{{ $translate("Subscription ended") }}
									</template>
									<template v-else>
										<!-- Subscription Active! -->
										{{ $translate("Paid") }}
									</template>
								</template>
								<template v-else>
									{{ $translate("Waiting to pay") }}
								</template>
							</template>
							<!-- MEMBERSHIP STATUS -->
						</td>
					</tr>
				</tbody>
			</table>
		</div>
		<div
			class="bg-green-100 border-t-4 border-green-500 rounded-b text-green-900 px-4 py-5 shadow-md"
			role="alert"
			v-if="
				userData.active === 1 &&
				userData.approved === 1 &&
				(userData.subscription.status !== 1 || new Date(userData.subscription.end_date) < new Date())
			"
		>
			<div class="flex">
				<div class="p-2">
					<svg
						class="fill-current h-6 w-6 text-green-500 mr-4"
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 20 20"
					>
						<path
							d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z"
						/>
					</svg>
				</div>
				<div class="w-full flex justify-between items-center">
					<div>
						<h5 class="font-bold">{{ $translate("Complete payment process") }}</h5>
						<p class="text-sm">
							{{ $translate("Subscribing to membership") }}:
							{{ membershipTypes.find((c) => c.value === userData.subscription.type).label }}
						</p>
					</div>
					<nuxt-link to="/members/dashboard/membership/pay" class="btn-primary">
						{{ $translate("Pay") }}
					</nuxt-link>
				</div>
			</div>
		</div>

		<template
			v-if="
				userData.active === 1 &&
				userData.approved === 1 &&
				userData.subscription.status === 1 &&
				new Date(userData.subscription.end_date) > new Date()
			"
		>
			<hr class="my-10" />

			<!-- Membership Card -->
			<h5 class="form-title">{{ $translate("Membership card") }}</h5>

			<div class="m-4">
				<div class="membership-cart">
					<div style="position: relative">
						<div class="cart-header">
							<p
								class="m-0"
								style="
									font-weight: bolder;
									color: #fff;
									font-size: 1.8em;
									font-family: 'Markazi Text', serif !important;
								"
							>
								هيئــة الصحفيين السعوديـين
							</p>
							<p class="m-0" style="color: #fff; font-size: 1em; font-family: 'Cairo', sans-serif">
								SAUDI JOURNALISTS ASSOCIATION
							</p>
						</div>
						<div class="cart-header-logo">
							<img style="height: 100px" src="https://sju.org.sa/assets/themes/main/images/logo.png" />
						</div>
						<div class="membership-id">
							<p class="m-0" style="font-size: 1em; font-weight: bolder; color: #fff">
								بطاقة عضوية &nbsp;&nbsp;&nbsp;&nbsp; Membership ID
							</p>
						</div>
						<div class="membership-body">
							<img
								style="
									height: 205px;
									border: 1px solid #d9d8d8;
									width: 200px;
									object-fit: cover;
									border-radius: 3px;
									margin-bottom: 5px;
									margin: auto;
								"
								:src="userData?.avatar || '/images/user.png'"
							/>
							<p class="m-1" style="font-size: 1.25em; font-weight: bolder; color: #000">
								{{ userData.fullName }}
							</p>
							<p
								class="m-1"
								style="
									font-family: acumin-pro, sans-serif;
									font-weight: 600;
									color: #000;
									text-transform: capitalize;
									font-size: 18px;
								"
							>
								{{ userData.fullName_en }}
							</p>
							<p
								class="m-1 membership-number"
								style="
									font-size: 1em;
									font-weight: bolder;
									color: #000;
									direction: ltr;
									margin: 21px 0 !important;
								"
							>
								ID Number &nbsp;&nbsp;
								{{ userData.membership_number }}
								&nbsp;&nbsp; رقم العضوية
							</p>
							<p
								class="m-0"
								style="
									font-weight: bolder;
									color: #000;
									background: #95c049;
									display: block;
									width: 100%;
									direction: ltr;
									color: #fff;
									font-size: 1em;
									padding: 3px 0;
								"
							>
								Expiry data &nbsp;&nbsp;&nbsp;&nbsp;
								{{ userData.subscription.end_date }} &nbsp;&nbsp;&nbsp;&nbsp; صلاحية البطاقة
							</p>
						</div>
						<div id="watermark" class="hidden">
							<p>مسودة</p>
						</div>
					</div>
				</div>
			</div>
			<!-- Membership Card -->
		</template>
	</div>
</template>

<style>
	.membership-cart {
		position: relative;
		font-size: 14px;
		margin: auto;
		border: 2px #ccc solid;
		height: 580px;
		width: 380px;
		border-radius: 5px;
		overflow: hidden;
		padding: 0;
	}

	.membership-cart .cart-header {
		position: absolute;
		width: 75%;
		background: #088245;
		height: 120px;
		text-align: center;
		display: flex;
		flex-direction: column;
		justify-content: center;
		top: 0;
		right: 0;
	}

	.membership-cart .cart-header-logo {
		position: absolute;
		top: 1em;
		left: 10px;
	}

	.membership-cart .membership-id {
		position: inherit;
		top: 124px;
		left: 0px;
		background-color: #95c049;
		height: 35px;
		width: 100%;
		margin: auto;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.membership-cart .membership-body {
		position: inherit;
		top: 10em;
		left: 0px;
		height: 350px;
		width: 100%;
		margin: auto;
		padding: 10px 0;
		text-align: center;
	}
	.membership-cart .membership-number::before,
	.membership-cart .membership-number::after {
		content: "";
		display: inline-block;
		height: 20px;
		background: #9fc65b;
		width: 2px;
		margin: 0px 20px -4px 0;
	}

	.membership-cart .membership-number::after {
		margin: 0px 0 -4px 20px;
	}

	@media (max-width: 500px) {
		.membership-cart {
			font-size: 10px;
			width: auto;
		}
		.membership-cart .cart-header {
			width: 19em;
		}
		.membership-cart .cart-header-logo {
			transform: scale(0.8);
			top: 18px;
			left: 2px;
		}
		.membership-cart .membership-body {
			top: 14em;
		}
	}
</style>
