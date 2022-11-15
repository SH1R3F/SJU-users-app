<script setup>
	import { useAuthStore } from "~~/stores/authStore"

	if (process.client) {
		const targetEl = document.getElementById("loginModal")
		const modal = new Modal(targetEl)
	}

	// Authentication
	const authStore = useAuthStore()
</script>

<template>
	<div>
		<!-- Header -->
		<div class="h-32 py-2">
			<div class="container">
				<div class="flex justify-between items-center px-2">
					<nuxt-link to="/">
						<img src="/images/logo.png" alt="هيئة الصحفيين السعوديين" class="h-28" />
					</nuxt-link>
					<!-- Login button, Modal trigger -->
					<div
						v-show="!authStore.authenticated"
						class="flex flex-col justify-center bg-sju-100 h-24 px-9 cursor-pointer"
						data-modal-toggle="loginModal"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="45.485"
							height="39.798"
							viewBox="0 0 45.485 39.798"
							class="mx-auto mb-1"
						>
							<g id="user_6_" data-name="user (6)" transform="translate(0 -0.008)">
								<path
									id="Path_3"
									data-name="Path 3"
									d="M94.808,18.959a9.476,9.476,0,1,1,9.476-9.475A9.486,9.486,0,0,1,94.808,18.959Zm0-16.109a6.633,6.633,0,1,0,6.633,6.633A6.64,6.64,0,0,0,94.808,2.851Zm0,0"
									transform="translate(-77.752)"
									fill="#fff"
								></path>
								<path
									id="Path_4"
									data-name="Path 4"
									d="M32.691,273.064H1.421A1.422,1.422,0,0,1,0,271.643V265.01a9.012,9.012,0,0,1,9-9H25.111a9.012,9.012,0,0,1,9,9v6.633A1.422,1.422,0,0,1,32.691,273.064ZM2.843,270.221H31.27V265.01a6.166,6.166,0,0,0-6.159-6.159H9a6.166,6.166,0,0,0-6.159,6.159Zm0,0"
									transform="translate(0 -233.258)"
									fill="#fff"
								></path>
								<path
									id="Path_5"
									data-name="Path 5"
									d="M316.2,189.518H300.089a1.421,1.421,0,1,1,0-2.843H316.2a1.421,1.421,0,1,1,0,2.843Zm0,0"
									transform="translate(-272.136 -170.085)"
									fill="#fff"
								></path>
								<path
									id="Path_6"
									data-name="Path 6"
									d="M396.093,119.312a1.422,1.422,0,0,1-1-2.428l6.576-6.576-6.576-6.576a1.422,1.422,0,1,1,2.011-2.011l7.581,7.58a1.422,1.422,0,0,1,0,2.011l-7.581,7.58A1.413,1.413,0,0,1,396.093,119.312Zm0,0"
									transform="translate(-359.611 -92.298)"
									fill="#fff"
								></path>
							</g>
						</svg>
						<span class="font-bold text-white">{{ $translate("login") }}</span>
					</div>
					<nuxt-link
						v-if="authStore.authenticated"
						:to="`/${authStore.userType}s/`"
						class="flex flex-col justify-center bg-sju-100 h-24 px-9 cursor-pointer"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="45.485"
							height="39.798"
							viewBox="0 0 45.485 39.798"
							class="mx-auto mb-1"
						>
							<g id="user_6_" data-name="user (6)" transform="translate(0 -0.008)">
								<path
									id="Path_3"
									data-name="Path 3"
									d="M94.808,18.959a9.476,9.476,0,1,1,9.476-9.475A9.486,9.486,0,0,1,94.808,18.959Zm0-16.109a6.633,6.633,0,1,0,6.633,6.633A6.64,6.64,0,0,0,94.808,2.851Zm0,0"
									transform="translate(-77.752)"
									fill="#fff"
								></path>
								<path
									id="Path_4"
									data-name="Path 4"
									d="M32.691,273.064H1.421A1.422,1.422,0,0,1,0,271.643V265.01a9.012,9.012,0,0,1,9-9H25.111a9.012,9.012,0,0,1,9,9v6.633A1.422,1.422,0,0,1,32.691,273.064ZM2.843,270.221H31.27V265.01a6.166,6.166,0,0,0-6.159-6.159H9a6.166,6.166,0,0,0-6.159,6.159Zm0,0"
									transform="translate(0 -233.258)"
									fill="#fff"
								></path>
							</g>
						</svg>
						<span class="font-bold text-white">{{ $translate("Profile") }}</span>
					</nuxt-link>

					<!-- Login button, Modal trigger -->
				</div>
			</div>
		</div>
		<!-- Header -->

		<!-- Modal -->
		<div
			id="loginModal"
			aria-hidden="true"
			class="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 w-full md:inset-0 h-modal md:h-full"
			tabindex="-1"
		>
			<div class="relative p-4 w-full max-w-2xl h-full md:h-auto">
				<!-- Modal content -->
				<div class="modal-box relative bg-white rounded-lg shadow dark:bg-sjud-100">
					<!-- Modal header -->
					<div class="flex justify-between items-start p-4 rounded-t border-b dark:border-sjud-500">
						<h3 class="text-xl font-medium text-gray-900 dark:text-gray-200">
							{{ $translate("Login to sju") }}
						</h3>
						<button
							type="button"
							class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 inline-flex items-center dark:hover:bg-sjud-200"
							data-modal-toggle="loginModal"
						>
							<svg
								aria-hidden="true"
								class="w-5 h-5"
								fill="currentColor"
								viewBox="0 0 20 20"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									fill-rule="evenodd"
									d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
									clip-rule="evenodd"
								></path>
							</svg>
							<span class="sr-only">{{ $translate("Close modal") }}</span>
						</button>
					</div>

					<!-- Modal body -->
					<div class="flex flex-col md:flex-row justify-center space-x-3 rtl:space-x-reverse px-3 py-7">
						<!-- Trainees -->
						<div class="flex-1 py-16 text-center border rounded-md dark:border-sjud-200 dark:text-gray-300">
							<div class="text-2xl pb-8">{{ $translate("Subscribers") }}</div>
							<nuxt-link
								class="block px-4 mb-2"
								to="/subscribers/auth/login"
								data-modal-toggle="loginModal"
							>
								<button
									class="bg-sju-200 text-white w-full py-2 m-0 rounded-md shadow-lg hover:shadow-xl hover:bg-sju-50 transition-all"
								>
									{{ $translate("Login") }}
								</button>
							</nuxt-link>
							<nuxt-link
								class="block px-4"
								to="/subscribers/auth/register"
								data-modal-toggle="loginModal"
							>
								<button
									class="bg-white text-sju-200 w-full py-2 m-0 rounded-md shadow-lg hover:shadow-xl dark:bg-sjud-200 transition-all"
									data-modal-toggle="loginModal"
								>
									{{ $translate("Register") }}
								</button>
							</nuxt-link>
						</div>

						<!-- Members -->
						<div
							class="flex-1 py-16 text-center border rounded-md dark:border-sjud-200 dark:text-gray-300 bg-sju-300 dark:bg-sju-50 transition-all"
						>
							<div class="text-2xl pb-8 text-white">{{ $translate("Members") }}</div>
							<nuxt-link class="block px-4 mb-2" to="/members/auth/login" data-modal-toggle="loginModal">
								<button
									class="bg-sju-200 text-white w-full py-2 m-0 rounded-md shadow-lg hover:shadow-xl hover:bg-sju-50 transition-all"
								>
									{{ $translate("Login") }}
								</button>
							</nuxt-link>
							<nuxt-link
								class="block px-4 transition-all"
								to="/members/auth/register"
								data-modal-toggle="loginModal"
							>
								<button
									class="bg-white text-sju-200 w-full py-2 m-0 rounded-md shadow-lg hover:shadow-xl transition-all"
								>
									{{ $translate("Register") }}
								</button>
							</nuxt-link>
						</div>

						<!-- Volunteers -->
						<div class="flex-1 py-16 text-center border rounded-md dark:border-sjud-200 dark:text-gray-300">
							<div class="text-2xl pb-8">{{ $translate("Volunteers") }}</div>
							<nuxt-link
								class="block px-4 mb-2"
								to="/volunteers/auth/login"
								data-modal-toggle="loginModal"
							>
								<button
									class="bg-sju-200 text-white w-full py-2 m-0 rounded-md shadow-lg hover:shadow-xl hover:bg-sju-50"
								>
									{{ $translate("Login") }}
								</button>
							</nuxt-link>
							<nuxt-link class="block px-4" to="/volunteers/auth/register" data-modal-toggle="loginModal">
								<button
									class="bg-white text-sju-200 w-full py-2 m-0 rounded-md shadow-lg hover:shadow-xl dark:bg-sjud-200"
								>
									{{ $translate("Register") }}
								</button>
							</nuxt-link>
						</div>
					</div>
					<!-- Modal Body -->

					<!-- Modal footer -->
					<div
						class="flex items-center justify-end p-3 rounded-b border-t border-gray-200 dark:border-sjud-500"
					>
						<button
							data-modal-toggle="loginModal"
							type="button"
							class="text-gray-500 bg-white hover:bg-gray-100 hover:shadow-md rounded-md border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 dark:bg-sjud-200 dark:text-gray-300 dark:border-sjud-500"
						>
							{{ $translate("Close") }}
						</button>
					</div>
				</div>
			</div>
		</div>
		<!-- Modal -->
	</div>
</template>
