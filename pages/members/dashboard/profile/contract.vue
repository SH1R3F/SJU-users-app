<script setup>
	import { storeToRefs } from "pinia"
	import { useAuthStore } from "~~/stores/authStore"
	import { useMemberStore } from "~~/stores/memberStore"

	const toast = useToast()
	const memberStore = useMemberStore()
	const authStore = useAuthStore()
	const { userData } = storeToRefs(authStore)

	// User only required to upload a job contract if his type is affilite member
	if (userData.value.subscription?.type !== 3) {
		useRouter().push("/members/dashboard/profile")
	}

	const updateContract = async (form, node) => {
		// Converting to FormData as we gotta upload a file
		const body = new FormData()
		body.append("image", form.image[0]?.file || "")

		const { error } = await memberStore.updateContract(body)
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
		middleware: "member",
	})
</script>

<template>
	<div>
		<members-profile-nav active="contract" />

		<div class="form">
			<FormKit type="form" :actions="false" @submit="updateContract" enctype="multipart/form-data">
				<!-- Rules and Picture -->
				<div class="flex flex-col md:flex-row justify-between mb-10">
					<div>
						<div class="form-title font-semibold">{{ $translate("Job contract") }}</div>
						<ul class="pl-7 rtl:pr-7 rtl:pl-0 list-disc mb-7">
							<li class="text-gray-600 text-sm mb-2">
								{{ $translate("Image must have a good quality") }}
							</li>
							<li class="text-gray-600 text-sm mb-2">
								{{ $translate("Only .Jpg, .Gif, .Png images are accepted") }}
							</li>
							<li class="text-gray-600 text-sm mb-2">
								{{ $translate("Image size must not exceed 2 MB") }}
							</li>
						</ul>
						<FormKit type="file" name="image" accept="image/*"></FormKit>
					</div>
					<img
						:src="userData?.job_contract || '/images/letter.png'"
						class="mx-auto md:mx-0 mt-10 md:mt-0 h-32 lg:h-40 object-cover object-center"
					/>
				</div>
				<!-- Rules and Picture -->

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
