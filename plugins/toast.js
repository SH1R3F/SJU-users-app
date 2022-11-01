import Toast from "vue-toastification/dist/index.mjs"
import "vue-toastification/dist/index.css"

export default defineNuxtPlugin(({ vueApp }) => {
	const options = {
		// You can set your default options here
		position: "top-center",
	}
	vueApp.use(Toast, options)
})
