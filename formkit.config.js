// formkit.config.ts
import { ar, en } from "@formkit/i18n"
import { myTextInput } from "./FormKit/inputs/myTextInput"
import { mySelect } from "./FormKit/inputs/mySelect"
import { myRadio } from "./FormKit/inputs/myRadio"

const config = {
	locales: { ar, en },
	locale: "ar",
	inputs: {
		mySelect,
		myTextInput,
		myRadio,
	},
}

export default config
