<template>
	<div>
		<div class="card">
			<div class="card-title font-semibold">{{ $translate("Upcoming events") }}</div>

			<div class="overflow-x-auto relative shadow-md sm:rounded-lg">
				<table class="w-full text-sm text-gray-500 dark:text-gray-400">
					<thead class="text-xs text-gray-700 uppercase dark:text-gray-400">
						<tr>
							<th scope="col" class="py-3 px-6">#</th>
							<th scope="col" class="py-3 px-6 bg-gray-50 dark:bg-gray-800">
								{{ $translate("Event name") }}
							</th>
							<th scope="col" class="py-3 px-6">{{ $translate("Event date") }}</th>
						</tr>
					</thead>
					<tbody class="text-center">
						<tr class="border-b border-gray-200 dark:border-gray-700">
							<td class="py-4 px-6">1</td>
							<td class="py-4 px-6 bg-gray-50 dark:bg-gray-800">تجربة اسم الفعالية</td>
							<td class="py-4 px-6">11 سبتمبر 2022</td>
						</tr>
						<tr class="border-b border-gray-200 dark:border-gray-700">
							<td class="py-4 px-6">2</td>
							<td class="py-4 px-6 bg-gray-50 dark:bg-gray-800">تجربة اسم الفعالية</td>
							<td class="py-4 px-6">11 سبتمبر 2022</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
		<div class="card">
			<div class="card-title font-semibold">{{ $translate("Enrolled events") }}</div>

			<div class="overflow-x-auto relative shadow-md sm:rounded-lg">
				<table class="w-full text-sm text-gray-500 dark:text-gray-400">
					<thead class="text-xs text-gray-700 uppercase dark:text-gray-400">
						<tr>
							<th scope="col" class="py-3 px-6">#</th>
							<th scope="col" class="py-3 px-6 bg-gray-50 dark:bg-gray-800">
								{{ $translate("Event name") }}
							</th>
							<th scope="col" class="py-3 px-6">{{ $translate("Event date") }}</th>
						</tr>
					</thead>
					<tbody class="text-center">
						<tr class="border-b border-gray-200 dark:border-gray-700">
							<td class="py-4 px-6">1</td>
							<td class="py-4 px-6 bg-gray-50 dark:bg-gray-800">تجربة اسم الفعالية</td>
							<td class="py-4 px-6">11 سبتمبر 2022</td>
						</tr>
						<tr class="border-b border-gray-200 dark:border-gray-700">
							<td class="py-4 px-6">2</td>
							<td class="py-4 px-6 bg-gray-50 dark:bg-gray-800">تجربة اسم الفعالية</td>
							<td class="py-4 px-6">11 سبتمبر 2022</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
	</div>
</template>
