<template>
	<!-- Single post -->
	<div
		class="h-64 w-full flex flex-col justify-between overflow-hidden"
		:style="`background: linear-gradient(to bottom, transparent, rgba(0, 0, 0, 0.7)), url('${post.photos[0]}'); background-size: 100% 100%;`"
	>
		<div v-if="post.category">
			<!-- To be worked on upon categories pages creation -->
			<nuxt-link class="text-white bg-sju-50 text-xs py-2 px-3" :to="`/posts?category=${post.category.id}`"> {{ dblocalize(post.category, "title") }} </nuxt-link>
		</div>
		<div v-else></div>
		<div class="text-white px-2.5 pb-4">
			<nuxt-link :to="`/posts/${post.id}`" class="mb-1.5 block">{{ dblocalize(post, "title") }}</nuxt-link>
			<span class="text-xs">{{ post.post_date }}</span>
		</div>
	</div>
	<!-- Single post -->
</template>

<script setup>
	const { post } = defineProps(["post"])
	const { dblocalize } = useLocalization()
</script>
