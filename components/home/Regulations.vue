<template>
	<section class="py-20">
		<div class="container px-2">
			<div class="flex flex-col md:flex-row md:space-x-8 rtl:space-x-reverse">
				<div class="md:w-7/12">
					<!-- Section title -->
					<div class="flex justify-between items-center">
						<h2 class="text-sju-50 text-3xl py-4 mb-2">{{ $t("Regulations and events") }}</h2>
						<a href="#" class="text-sju-50 text-sm">{{ $t("More") }}</a>
					</div>
					<!-- Section title -->

					<!-- Regulations -->
					<div class="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
						<div class="bg-sju-500 py-9 px-4 text-center" v-for="i in 3">
							<svg xmlns="http://www.w3.org/2000/svg" width="84.001" height="83.183" viewBox="0 0 84.001 83.183" class="mx-auto">
								<g id="paper_1_" data-name="paper (1)" transform="translate(0 -2.493)">
									<path
										id="Path_7"
										data-name="Path 7"
										d="M83.309,12.686,73.392,3.229a2.012,2.012,0,0,0-1.5-.736H32.173a2.107,2.107,0,0,0-2.1,2.1v6.461l-14,2.4a2.074,2.074,0,0,0-1.682,2.392l.711,4.143c-4.551,1.531-9.223,3.11-13.733,4.73A2.083,2.083,0,0,0,.119,27.37l8.972,24.94a1.231,1.231,0,1,0,2.316-.833L2.568,26.906c4.249-1.521,8.65-3.01,12.95-4.458L19.746,47.1l4.865,28.388A2.084,2.084,0,0,0,27,77.173L40.18,74.912l10.3-1.765L34.991,78.713,22.779,83.1l-9.484-26.38a1.23,1.23,0,1,0-2.316.833L20.6,84.312a2.078,2.078,0,0,0,1.947,1.364,2.036,2.036,0,0,0,.7-.124l12.579-4.523L64.386,70.763l5.457-.935H81.9A2.109,2.109,0,0,0,84,67.719V14.072a1.77,1.77,0,0,0-.691-1.387Zm-3.26.291h-6.31c-.295,0-.985.007-1.16-.167a.693.693,0,0,1-.088-.424l-.014-6.631ZM81.54,67.366H32.53V43.386a1.23,1.23,0,0,0-2.461,0V67.719a2.109,2.109,0,0,0,2.1,2.109h23.1L39.764,72.486l-12.794,2.2-4.8-28L16.877,15.816l13.192-2.261V37.676a1.23,1.23,0,1,0,2.461,0V4.954H70.015l.016,7.436a2.93,2.93,0,0,0,.815,2.167,3.763,3.763,0,0,0,2.734.882H81.54Z"
										transform="translate(0)"
										fill="#85c72e"
									></path>
									<path
										id="Path_8"
										data-name="Path 8"
										d="M234.43,112.679a1.231,1.231,0,0,0,1.23,1.23h35.181a1.23,1.23,0,1,0,0-2.461H235.66A1.231,1.231,0,0,0,234.43,112.679Z"
										transform="translate(-195.969 -91.08)"
										fill="#85c72e"
									></path>
									<path
										id="Path_9"
										data-name="Path 9"
										d="M270.842,164.731H235.66a1.23,1.23,0,1,0,0,2.461h35.181a1.23,1.23,0,1,0,0-2.461Z"
										transform="translate(-195.969 -135.621)"
										fill="#85c72e"
									></path>
									<path
										id="Path_10"
										data-name="Path 10"
										d="M270.842,218.013H235.66a1.23,1.23,0,1,0,0,2.461h35.181a1.23,1.23,0,1,0,0-2.461Z"
										transform="translate(-195.969 -180.161)"
										fill="#85c72e"
									></path>
									<path
										id="Path_11"
										data-name="Path 11"
										d="M270.842,271.3H235.66a1.23,1.23,0,1,0,0,2.461h35.181a1.23,1.23,0,1,0,0-2.461Z"
										transform="translate(-195.969 -224.701)"
										fill="#85c72e"
									></path>
									<path
										id="Path_12"
										data-name="Path 12"
										d="M270.842,324.578H235.66a1.23,1.23,0,1,0,0,2.461h35.181a1.23,1.23,0,1,0,0-2.461Z"
										transform="translate(-195.969 -269.242)"
										fill="#85c72e"
									></path>
								</g>
							</svg>
							<!-- To be worked on upon creating pages -->
							<a href="#" class="text-sju-50 pt-3 font-bold block text-sm">{{ $t("The basic bylaw of the Saudi Journalists Association") }}</a>
							<span class="text-xs mt-2 text-sju-50" dir="auto">{{ $t("1.5 Miga bytes") }}</span>
						</div>
					</div>
					<!-- Regulations -->
				</div>

				<div class="md:w-5/12">
					<!-- Section title -->
					<div class="flex justify-between items-center">
						<h2 class="text-sju-50 text-3xl py-4 mb-2">{{ $t("Events") }}</h2>
						<a href="#" class="text-sju-50 text-sm">{{ $t("More") }}</a>
					</div>
					<!-- Section title -->

					<!-- Courses -->
					<div class="flex flex-col space-y-5">
						<!-- Single Event -->
						<div class="flex" v-for="event in events">
							<div class="bg-sju-50 text-white text-center flex-grow-0 py-5 px-10 w-28 flex justify-center items-center flex-col">
								<span class="font-bold text-4xl block">{{ new Date(event.date).getDay() }}</span>
								{{ $t(new Date(event.date).toLocaleString("default", { month: "long" })) }}
							</div>
							<h6 class="text-sju-50 bg-sju-500 flex-grow p-4 flex items-center">
								<!-- To be worked on upon events register page creation -->
								<a href="https://sju.org.sa/events/register/416">{{ dblocalize(event, "name") }}</a>
							</h6>
						</div>
						<!-- Single Event -->
					</div>
					<!-- Courses -->
				</div>
			</div>
		</div>
	</section>
</template>

<script setup>
	const { dblocalize } = useLocalization()

	const { events } = defineProps(["events"])
</script>
