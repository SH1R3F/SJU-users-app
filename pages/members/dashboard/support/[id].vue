<script setup>
	import { storeToRefs } from "pinia"
	import { useSupportStore } from "~~/stores/supportStore"
	import { useAuthStore } from "~~/stores/authStore"
	const authStore = useAuthStore()

	const message = ref({})

	// Fetch chat messages
	const supportStore = useSupportStore()
	const { chat, getMessages } = storeToRefs(supportStore)
	const id = useRoute().params.id
	supportStore.fetchChat(id)

	// Send message
	const sendMessage = async (msg, node) => {
		// Converting to FormData as we gotta upload a file
		const body = new FormData()
		Object.keys(msg).forEach((key) => {
			let value = msg[key] || ""
			body.append(key, value)
		})
		body.append("image", msg.image[0]?.file || "")

		const { error } = await supportStore.sendMessage(id, body)
		// On errors
		if (error?.value?.response?.status == 400) {
			node.setErrors(error.value?.data)
		} else if (error?.value?.response?.status == 422) {
			toast.error(error.value?.data?.message)
		} else if (!error?.value) {
			message.value = {}
		}
	}
	const { $i18n } = useNuxtApp()
	// Page Meta
	const title = $i18n.translate("Technical support")
	useHead({
		title,
	})
	definePageMeta({
		middleware: "member",
	})
</script>

<template>
	<div>
		<div class="card bg-zinc-50" style="padding-bottom: 30px">
			<h5 class="card-title mb-0">{{ chat.title }}</h5>
			<div class="chat">
				<div class="w-full px-5 flex flex-col justify-between max-h-[70vh] overflow-hidden">
					<div class="messages flex flex-col mt-5 overflow-x-auto mb-3">
						<div
							v-for="msgGroup in getMessages"
							class="flex mb-4"
							:class="{
								'justify-end': msgGroup[0].sender == 1,
								'justify-start': msgGroup == 2,
							}"
						>
							<img
								:src="
									msgGroup[0].sender == 1
										? '/images/support.png'
										: authStore.userData.avatar || '/images/user.png'
								"
								v-if="msgGroup[0].sender == 2"
								class="object-cover h-8 w-8 rounded-full"
							/>

							<div>
								<div
									class="mt-1"
									:class="{
										'bubble-other': msgGroup[0].sender == 1,
										'bubble-me': msgGroup[0].sender == 2,
									}"
									v-for="msg in msgGroup"
								>
									<span v-if="msg.message">{{ msg.message }}</span>
									<nuxt-link v-if="msg.attachment" :to="msg.attachment" target="_blank">
										<img :src="msg.attachment" class="max-w-xs" />
									</nuxt-link>
								</div>
							</div>

							<img
								:src="
									msgGroup[0].sender == 1
										? '/images/support.png'
										: authStore.userData.avatar || '/images/user.png'
								"
								v-if="msgGroup[0].sender == 1"
								class="object-cover h-8 w-8 rounded-full"
							/>
						</div>
					</div>
					<FormKit
						type="form"
						enctype="multipart/form-data"
						form-class="flex items-center"
						v-model="message"
						:actions="false"
						@submit="sendMessage"
					>
						<FormKit
							:classes="{
								wrapper: {
									'formkit-wrapper': false,
									'w-full': true,
								},
								outer: 'w-full',
							}"
							type="textarea"
							rows="1"
							:placeholder="$translate('Message')"
							name="body"
							:validation-label="$translate('Message')"
							validation="trim"
						/>
						<label
							class="mr-1 cursor-pointer rounded"
							:class="{
								'text-sju-50': message?.image?.length,
							}"
							style="padding: 3px"
							for="attachment"
						>
							<FormKit type="file" name="image" id="attachment" accept="image/*" outer-class="hidden" />
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="17px"
								height="17px"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								stroke-width="2"
								stroke-linecap="round"
								stroke-linejoin="round"
								class="feather feather-upload"
							>
								<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
								<polyline points="17 8 12 3 7 8"></polyline>
								<line x1="12" y1="3" x2="12" y2="15"></line>
							</svg>
						</label>
						<button type="submit" class="btn-primary">
							{{ $translate("Send") }}
						</button>
					</FormKit>
				</div>
			</div>
		</div>
	</div>
</template>

<style>
	.formkit-outer {
		margin-bottom: 1px;
	}
	[data-type="textarea"] textarea {
		min-height: auto;
	}
</style>
