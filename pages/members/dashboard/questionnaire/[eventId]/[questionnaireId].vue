<script setup>
	import { storeToRefs } from "pinia"
	import { useEventStore } from "~~/stores/eventStore"
	const { dblocalize } = useLocalization()

	const eventStore = useEventStore()
	const route = useRoute()
	const { eventId, questionnaireId } = route.params

	// Fetch the questionnaire data
	await eventStore.getQuestionnaire(eventId, questionnaireId)
	const { questionnaire, questions } = storeToRefs(eventStore)

	const steps = questions.value.map((q) => `question-${q.id}`)
	const step = ref(steps[0])

	const questionnaireData = ref({})

	const submitQuestion = async (i, question) => {
		console.log(questionnaireData, i, question)
		if (steps[i + 1]) {
			step.value = steps[i + 1]
		} else {
			// Submit form
			await eventStore.submitQuestionnaire(eventId, questionnaireId, questionnaireData.value)
		}
	}

	definePageMeta({
		middleware: "member",
	})
</script>

<template>
	<div>
		<div
			class="bg-blue-50 border-l-4 rtl:border-l-0 rtl:border-r-4 border-blue-400 text-blue-600 p-4 mb-3"
			role="alert"
			v-if="questionnaire.id"
		>
			<p>{{ $translate("Fill the survey first") }}.</p>
		</div>

		<div class="card" v-if="questionnaire.id">
			<h4 class="card-title">{{ dblocalize(questionnaire, "name") }}</h4>
			<FormKit type="form" :actions="false" v-model="questionnaireData">
				<!-- Single Question -->
				<section v-for="(question, i) in questions" v-show="step == `question-${question.id}`">
					<FormKit type="group" :id="`question-${question.id}`" :name="`question-${question.id}`">
						<h5 class="mb-2">{{ question.question }}</h5>
						<div v-if="question.type == 1">
							<FormKit
								type="radio"
								:options="[
									{
										value: 1,
										label: question.answer1,
									},
									{
										value: 2,
										label: question.answer2,
									},
									{
										value: 3,
										label: question.answer3,
									},
									{
										value: 4,
										label: question.answer4,
									},
								]"
								:classes="{
									fieldset: {
										'formkit-fieldset': false,
										'w-full': true,
									},
									wrapper: `border-2 border-gray-200 p-2`,
									inner: 'mx-3',
								}"
								validation="required"
							></FormKit>
						</div>
						<div v-else>
							<FormKit
								type="textarea"
								validation="required"
								:classes="{
									wrapper: {
										'formkit-wrapper': false,
										'w-full': true,
									},
								}"
							></FormKit>
						</div>
					</FormKit>
					<div class="text-end">
						<button class="btn-primary" @click.prevent="submitQuestion(i, question)">
							{{ $translate("Next") }}
						</button>
					</div>
				</section>
			</FormKit>
		</div>
		<div class="card text-center" v-else>
			<nuxt-link class="btn-primary" to="/volunteers/dashboard">{{ $translate("Back to events") }}</nuxt-link>
		</div>
	</div>
</template>
