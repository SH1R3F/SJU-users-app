<script setup>
	const { mobileCodes } = useSiteConfig()

	const props = defineProps({
		context: Object,
	})

	function handleInput(e) {
		props.context.node.input(e.target.value)
	}
</script>

<template>
	<div class="input-group w-full">
		<input type="number" :value="props.context._value" @input="handleInput" />
		<span class="prepend">
			<select name="mobile_code" id="mobileCode" class="border-0 w-full" dir="ltr">
				<option v-for="code in mobileCodes" :value="code.value">{{ code.label }}</option>
			</select>
		</span>
	</div>
</template>
