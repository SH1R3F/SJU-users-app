<template>
	<div>
		<!-- Container -->
		<div class="container">
			<!-- News Slider -->
			<div id="default-carousel" class="relative my-16" data-carousel="slide">
				<!-- Carousel wrapper -->
				<div class="relative h-[27rem] md:h-96 overflow-hidden rounded-md">
					<!-- item 1 -->
					<div
						v-for="(post, i) in posts"
						:id="`carousel-item-${i + 1}`"
						class="duration-700 linear absolute inset-0 transition-all transform translate-x-0 bg-sju-50"
						:data-carousel-item="i == 0 ? 'active' : ''"
					>
						<div class="flex flex-col md:flex-row-reverse">
							<div class="md:w-2/3 order-lg-last">
								<img
									class="object-cover h-56 md:h-96 w-full"
									:src="post.photos[0] || '/images/noimage.jpg'"
									onerror="this.src='/images/noimage.jpg'"
									:alt="dblocalize(post, 'title')"
								/>
							</div>
							<div class="md:w-1/3 flex items-center px-5 py-5">
								<div class="text-white pr-3 rtl:pr-0 rtl:pl-3 overflow-hidden">
									<h3 class="mb-2 text-xl md:text-2xl">{{ dblocalize(post, "title") }}</h3>
									<p class="my-4"></p>
									<nuxt-link
										class="bg-sju-50 text-xs py-2 px-3 text-sju-400 mt-3"
										:to="`/posts/${post.id}`"
										>{{ $translate("Details") }}</nuxt-link
									>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<!-- News Slider -->
		</div>
		<!-- Container -->

		<!-- About Section -->
		<section class="mt-20 px-2 my-16">
			<!-- Container -->
			<div class="container">
				<div class="flex flex-col-reverse md:flex-row">
					<div class="md:w-1/2 pr-5 rtl:pr-0 rtl:pl-5">
						<h2 class="text-sju-50 text-4xl py-4 mb-2">{{ $translate("about_authority") }}</h2>
						<p class="text-gray-500 leading-7 text-justify mb-3 pr-5 rtl:pr-0 rtl:pl-5">
							{{ $translate("about_authority_description") }}
						</p>
						<nuxt-link to="/pages/about-us">
							<button
								class="py-3 px-5 bg-sju-50 text-white hover:bg-white hover:border hover:border-sju-50 hover:text-sju-50 transition"
							>
								{{ $translate("Read more") }}
							</button>
						</nuxt-link>
					</div>

					<div class="md:w-1/2">
						<img
							src="/images/about-organization.jpg"
							class="w-full object-fit"
							:alt="$translate('about_authority')"
						/>
					</div>
				</div>
			</div>
			<!-- Container -->
		</section>
		<!-- About Section -->

		<!-- Media Center Section -->
		<home-media-center :posts="homeStore.mediacenter" />
		<!-- Media Center Section -->

		<!-- Studio Section -->
		<!-- <home-studio :items="homeStore.studio" /> -->
		<!-- Studio Section -->

		<!-- Regulations Section -->
		<home-regulations :events="homeStore.events" />
		<!-- Regulations Section -->

		<!-- Membership Details -->
		<home-membership-details />
		<!-- Membership Details -->

		<!-- Statistics -->
		<home-stats :stats="homeStore.stats" v-if="homeStore.stats" />
		<!-- Statistics -->

		<!-- Follow Us Section -->
		<home-follow-us />
		<!-- Follow Us Section -->
	</div>
</template>

<script setup>
	import { useHomeStore } from "~/stores/homeStore"
	const homeStore = useHomeStore()
	homeStore.fetchHomeData()

	const { dblocalize } = useLocalization()
	// Fetch last 6 posts
	const { useMyFetch } = useApiFetch()
	const { data, error } = await useMyFetch("/home", {
		key: "home-posts",
	})
	if (error?.value?.response?.status) {
		throw createError({
			statusCode: error?.value?.response?.status,
			statusMessage: error?.value?.response?.statusText,
		})
	}

	const posts = data.value?.posts
	// Slider configuration
	if (process.client) {
		if (document.getElementById("default-carousel")) {
			const items = [
				{
					position: 0,
					el: document.getElementById("carousel-item-1"),
				},
				{
					position: 1,
					el: document.getElementById("carousel-item-2"),
				},
				{
					position: 2,
					el: document.getElementById("carousel-item-3"),
				},
				{
					position: 3,
					el: document.getElementById("carousel-item-4"),
				},
				{
					position: 4,
					el: document.getElementById("carousel-item-5"),
				},
				{
					position: 5,
					el: document.getElementById("carousel-item-6"),
				},
			]
			const carousel = new Carousel(items, {
				interval: 6000,
			})
			setTimeout(() => carousel.cycle(), 6000)
		}
	}
</script>

<style scoped>
	.twitter-green {
		fill: #007d41;
	}
</style>
