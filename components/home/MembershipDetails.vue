<template>
	<section class="py-20 bg-gradient-to-r from-sju-50 to-sju-400 sm:px-4 text-white">
		<div class="container px-2">
			<h2 class="text-4xl mb-10">{{ $translate("Authority membership") }}</h2>

			<div class="flex flex-col md:flex-row gap-12 md:gap-8">
				<!-- Intro -->
				<div class="w-full md:w-5/12">
					<p class="font-bold mb-4">{{ $translate("membership_desc") }}</p>
					<a href="https://sju.org.sa/members/register">
						<button class="border border-white py-3 px-8 transition hover:bg-white hover:text-sju-50">{{ $translate("membership_btn") }}</button>
					</a>
				</div>
				<!-- Intro -->

				<div class="w-full md:w-7/12">
					<!-- Application rules -->
					<h4 class="mb-4">{{ $translate("membership_conditions") }}</h4>
					<ol class="list-decimal pr-6" id="accordion-collapse" data-accordion="collapse">
						<li class="mb-4">
							<div class="flex justify-between cursor-pointer" id="accordion-collapse-heading-1">
								<div
									style="color: #fff; background: none"
									class="font-bold transition"
									data-accordion-target="#accordion-collapse-body-1"
									aria-expanded="true"
									aria-controls="accordion-collapse-body-1"
								>
									{{ $translate("fulltime_member") }}
								</div>
								<i class="fas fa-caret-down"></i>
							</div>
							<ol class="list-decimal pt-3 pb-4 overflow-hidden transition px-9 hidden" id="accordion-collapse-body-1" aria-labelledby="accordion-collapse-heading-1">
								<li>{{ $translate("fulltime_member_desc1") }}</li>
								<li>{{ $translate("fulltime_member_desc2") }}</li>
								<li>{{ $translate("fulltime_member_desc3") }}</li>
							</ol>
						</li>
						<li class="mb-4">
							<div class="flex justify-between cursor-pointer" id="accordion-collapse-heading-2">
								<div style="color: #fff; background: none" class="font-bold transition" data-accordion-target="#accordion-collapse-body-2" aria-controls="accordion-collapse-body-2">
									{{ $translate("parttime_member") }}
								</div>
								<i class="fas fa-caret-up"></i>
							</div>
							<ol class="list-decimal pt-3 pb-4 overflow-hidden transition px-9 hidden" id="accordion-collapse-body-2" aria-labelledby="accordion-collapse-heading-2">
								<li>{{ $translate("parttime_member_desc1") }}</li>
								<li>{{ $translate("parttime_member_desc2") }}</li>
							</ol>
						</li>
						<li class="mb-4">
							<div class="flex justify-between cursor-pointer" id="accordion-collapse-heading-3">
								<div style="color: #fff; background: none" class="font-bold transition" data-accordion-target="#accordion-collapse-body-3" aria-controls="accordion-collapse-body-3">
									{{ $translate("affiliate_member") }}
								</div>
								<i class="fas fa-caret-down"></i>
							</div>
							<ol class="list-decimal pt-3 pb-4 overflow-hidden transition px-9 hidden" id="accordion-collapse-body-3" aria-labelledby="accordion-collapse-heading-3">
								<li>{{ $translate("affiliate_member_desc1") }}</li>
							</ol>
						</li>
					</ol>

					<!-- Application rules -->
				</div>
			</div>
		</div>
	</section>
</template>
