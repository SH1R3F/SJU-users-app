<template>
	<div>
		<!-- Page Header -->
		<div class="bg-sju-50 text-white py-8">
			<div class="container">
				<nav aria-label="breadcrumb">
					<ul class="breadcrumb py-3 px-4 mb-4">
						<li class="breadcrumb-item"><a href="https://sju.org.sa/">الرئيسية</a></li>
					</ul>
				</nav>
				<h3>قائمة الأخبار</h3>
			</div>
		</div>
		<!-- Page Header -->

		<div class="page-content py-11 bg-sju-500 dark:bg-sjud-100">
			<div class="container">
				<!-- Nav Pills -->
				<ul class="w-full grid grid-cols-3 sm:grid-cols-6 md:grid-cols-9">
					<li
						class="cursor-pointer flex-1 text-center text-sju-50 text-sm border-b py-4 border-l hover:bg-gray-200 hover:text-sju-50 [&.active]:text-white [&.active]:bg-sju-50 transition dark:text-white dark:border-sjud-300 dark:hover:bg-sjud-300"
					>
						<a>{{ $translate("All") }}</a>
					</li>
				</ul>
				<!-- Nav Pills -->
			</div>
		</div>
	</div>
</template>
