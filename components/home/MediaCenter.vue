<template>
	<section class="py-20 bg-sju-500">
		<!-- Container -->
		<div class="container">
			<div class="flex justify-between items-center">
				<h2 class="text-sju-50 text-3xl py-4 mb-2">{{ $t("Media center") }}</h2>
				<a href="#" class="text-sju-50 text-sm">{{ $t("More") }}</a>
			</div>

			<!-- Posts -->
			<div class="grid grid-cols-1 md:grid-cols-3 mt-3 gap-6 md:gap-8">
				<div v-for="post in posts">
					<!-- Single post -->
					<div
						class="h-64 w-full flex flex-col justify-between overflow-hidden"
						:style="`background: linear-gradient(to bottom, transparent, rgba(0, 0, 0, 0.7)), url('${post.photos[0]}'); background-size: 100% 100%;`"
					>
						<div v-if="post.category">
							<!-- To be worked on upon categories pages creation -->
							<a class="text-white bg-sju-50 text-xs py-2 px-3" href="https://sju.org.sa/main/news/?catid=0"> {{ dblocalize(post.category, "title") }} </a>
						</div>
						<div v-else></div>
						<div class="text-white px-2.5 pb-4">
							<!-- To be worked on having a link here for the post -->
							<h5 class="mb-1.5 text-xl">{{ dblocalize(post, "title") }}</h5>
							<span class="text-xs">{{ post.post_date }}</span>
						</div>
					</div>
					<!-- Single post -->
				</div>
			</div>
			<!-- Posts -->
		</div>
		<!-- Container -->
	</section>
</template>

<script setup>
	const props = defineProps(["posts"])
	const { dblocalize } = useLocalization()
</script>
